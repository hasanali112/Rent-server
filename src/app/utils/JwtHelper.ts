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

export const JWTHelper = {
  generateToken,
};
