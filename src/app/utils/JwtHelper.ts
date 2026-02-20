import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

const generateToken = (
  payload: JwtPayload,
  secretKey: string,
  expiresIn: string,
) => {
  const token = jwt.sign(payload, secretKey, {
    expiresIn,
  } as SignOptions);

  return token;
};

const verifyToken = (token: string, secretKey: string): JwtPayload => {
  return jwt.verify(token, secretKey) as JwtPayload;
};

export const JWTHelper = {
  generateToken,
  verifyToken,
};
