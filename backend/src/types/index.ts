export type UserRole = 'admin' | 'member';

export interface JWTPayload {
  userId: string;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        role: UserRole;
      };
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGODB_URI: string;
      JWT_SECRET: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}
