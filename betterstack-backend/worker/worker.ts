
import { Worker  } from 'bullmq';
import axios from 'axios';
import { PrismaClient } from '../generated/prisma';
import {Redis} from 'ioredis';

const connection = new Redis({
  host: '127.0.0.1',
  port: 6379,
  maxRetriesPerRequest: null, 
}); 
const prisma = new PrismaClient();


const worker = new Worker(
  'monitor-check',
  async job => {
    if (job.name !== 'check-monitor') return;
    
    const monitor = job.data; // { id, url }
    console.log(job.data)
    const start = Date.now();
    let responseTime = 0;
    let status = 0;
    let statusText = '';
    let isUp = false;
    let error: string | null = null;
    try {
      const res = await axios.get(monitor.url, { timeout: 10000 }); // 10s timeout
      responseTime = Date.now() - start;
      status = res.status;
      statusText = res.statusText;
      isUp = res.status >= 200 && res.status < 300;
    } catch (err: any) {
      responseTime = Date.now() - start;
      error = err.message;
      status = 0;
      statusText = 'Network Error';
      isUp = false;
    }

    await prisma.result.create({
      data: {
        monitorId: monitor.id,
        status,
        statusText,
        responseTime,
        isUp,
        error,
      },
    });

    console.log(`[✓] Checked ${monitor.url}: ${status} - ${statusText}`);
  },
  { connection }
);

worker.on('completed', job => {
  console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed:`, err.message);
});
