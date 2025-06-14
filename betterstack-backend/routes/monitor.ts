import { Router } from "express";
import type { Request, Response } from "express";
import { clerkAuthMiddleware } from "../middleware/auth-middleware";
import prisma from "../utils/prisma"; 
import {monitorQueue} from "../utils/monitorQueue"
import {formatFrequency,formatTimeAgo} from "../utils/helpers"
const router = Router();

router.get("/get-all",clerkAuthMiddleware,async(req:Request,res:Response)=>{
  console.log("enter")
	 try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const monitors = await prisma.monitor.findMany({
      where: { userId: userId },
       include: {
        results: {
          orderBy: { checkedAt: "desc" },
          take: 1,
        },
      },
    });

     const formatted = monitors.map((monitor) => {
      const latest = monitor.results[0];

      return {
        id: monitor.id,
        name: monitor.name,
        url: monitor.url,
        status: latest?.isUp ? "up" : "down",
        responseTime: latest?.responseTime ?? 0,
        lastChecked: latest?.checkedAt
          ? formatTimeAgo(latest.checkedAt)
          : "N/A",
        frequency: formatFrequency(monitor.frequency),
      };
    });

    res.status(200).json({ monitors:formatted });
  } catch (e) {
    console.error("Failed to fetch monitors:", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
})


router.get("/get-one/:id", clerkAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const monitor = await prisma.monitor.findFirst({
      where: {
        id: id,
        userId: userId, 
      },
    });

    if (!monitor) {
      return res.status(404).json({ message: "Monitor not found" });
    }

    res.status(200).json({ monitor });
  } catch (e) {
    console.error("Failed to fetch monitor:", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get("/summary/:id", clerkAuthMiddleware, async (req: Request, res: Response) => {
  
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

     try {
    const monitor = await prisma.monitor.findFirst({
      where: { id: id, userId },
    });

    if (!monitor) {
      return res.status(404).json({ error: 'Monitor not found' });
    }

    const logs = await prisma.result.findMany({
      where: { monitorId:id },
      orderBy: { checkedAt: 'desc' },
      take: 50,
    });

    const now = new Date();
    const cutoff24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const cutoff7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const cutoff30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [last24h, last7d, last30d] = await Promise.all([
      prisma.result.findMany({
        where: { monitorId:id , checkedAt: { gte: cutoff24h } },
      }),
      prisma.result.findMany({
        where: { monitorId:id , checkedAt: { gte: cutoff7d } },
      }),
      prisma.result.findMany({
        where: { monitorId:id , checkedAt: { gte: cutoff30d } },
      }),
    ]);

    const calcUptime = (results) => {
      if (results.length === 0) return 0;
      const upCount = results.filter(r => r.isUp).length;
      return parseFloat(((upCount / results.length) * 100).toFixed(2));
    };

    const responseTimeData = logs.map((r) => ({
      time: r.checkedAt.toISOString().slice(11, 16),
      responseTime: r.responseTime,
    }));

    const uptimeData = logs.map((r) => ({
      time: r.checkedAt.toISOString().slice(11, 16),
      uptime: r.isUp ? 100 : 0,
    }));

    const response = {
      monitor: {
        id: monitor.id,
        name: monitor.name,
        url: monitor.url,
        status: logs[0]?.isUp ? 'up' : 'down',
        responseTime: logs[0]?.responseTime || 0,
        lastChecked: logs[0]?.checkedAt.toISOString() || '',
        frequency: `${monitor.frequency} minutes`,
        enabled: true,
        uptime24h: calcUptime(last24h),
        uptime7d: calcUptime(last7d),
        uptime30d: calcUptime(last30d),
        createdAt: monitor.createdAt.toISOString().split('T')[0],
      },
      logs: logs.map(r => ({
        id: r.id,
        timestamp: r.checkedAt.toISOString().replace('T', ' ').slice(0, 19),
        status: r.status,
        statusText: r.statusText,
        responseTime: r.responseTime,
        isUp: r.isUp,
      })),
      responseTimeData,
      uptimeData,
    };

    return res.json(response);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }

    
});


router.delete("/delete/:id", clerkAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const monitor = await prisma.monitor.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!monitor) {
      return res.status(404).json({ message: "Monitor not found" });
    }


    await monitorQueue.removeJobScheduler(`monitor-${id}`);


    await prisma.monitor.delete({
      where: { id: id },
    });

    res.status(200).json({ message: "Monitor deleted and job removed" });

  } catch (e) {
    console.error("Failed to delete monitor:", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.post("/add",clerkAuthMiddleware,async (req: Request, res: Response) => {
  const { name, url, frequency } = req.body;

  if (!name || !url || !frequency) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const monitor = await prisma.monitor.create({
      data: {
        name,
        url,
        frequency: Number(frequency),
        user: {
          connect: {
            clerkId: req.auth.userId,
          },
        },
      },
    });

    await monitorQueue.upsertJobScheduler(
  `monitor-${monitor.id}`,         
  { every: frequency * 1_000 },  
  {
    name: 'check-monitor',
    data: { id: monitor.id, url: monitor.url },
    opts: { removeOnComplete: true, removeOnFail: true },
  }
);



    res.status(201).json({ monitor });
  } catch (e) {
    console.error("Failed to create monitor:", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




export default router;
