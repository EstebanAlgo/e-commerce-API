declare namespace Express {
  interface Request {
    uid?: number;
    role?: string;
    name?: string;
    lastName?: string;
    email?: string;
    iat?: number;
    exp?: number;
    rawBody?: string;
  }
}

