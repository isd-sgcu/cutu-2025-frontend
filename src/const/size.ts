export const sizeJersey = ['S', 'M', 'L', 'XL', '2XL'] as const;

export type SizeJersey = (typeof sizeJersey)[number];