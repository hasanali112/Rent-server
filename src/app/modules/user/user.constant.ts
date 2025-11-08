export const UserRole = {
  ADMIN: 'ADMIN',
  DOCTOR: 'DOCTOR',
  PATIENT: 'PATIENT',
  HOST: 'HOST',
  CUSTOMER: 'CUSTOMER',
} as const;

export const userStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  BLOCKED: 'BLOCKED',
} as const;
