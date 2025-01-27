export const roles = ['member', 'staff', 'admin'] as const;

export type Role = (typeof roles)[number];
