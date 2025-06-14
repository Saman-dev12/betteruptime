import { Queue } from 'bullmq';
import { connection } from './redis';

export const monitorQueue = new Queue('monitor-check', {
  connection,
});


