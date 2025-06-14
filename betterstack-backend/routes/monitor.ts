import { Router } from "express";
import type { Request, Response } from "express";
import { clerkAuthMiddleware } from "../middleware/auth-middleware";
import prisma from "../utils/prisma"; 
import {monitorQueue} from "../utils/monitorQueue"

const router = Router();

router.get("/get-all",clerkAuthMiddleware,async(req:Request,res:Response)=>{
	 try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const monitors = await prisma.monitor.findMany({
      where: { userId: userId },
    });

    res.status(200).json({ monitors });
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
  { every: frequency * 60_000 },  
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
