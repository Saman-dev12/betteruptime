declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
      };
      user?: {
        id: string;
        clerkId: string;
        email: string;
        firstName?: string;
        lastName?: string;
        imageUrl?: string;
        username?: string;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  }
}
