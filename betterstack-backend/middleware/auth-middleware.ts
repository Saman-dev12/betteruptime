import { getAuth } from '@clerk/express';
import type { Request, Response, NextFunction } from 'express';
import prisma from "../utils/prisma"

export async function clerkAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, sessionId } = getAuth(req);

    if (!userId || !sessionId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.auth = { userId };

    const user = await prisma.user.findUnique({where:{clerkId:userId}})

    req.user = user;

    next();
  } catch (error) {
    console.error('Clerk Auth Error:', error);
    return res.status(401).json({ message: 'Authentication failed' });
  }
}
