export const educations = ['studying', 'graduated'] as const;
export type Education = (typeof educations)[number];

export const educationsMap: { [key: string]: Education } = {
  กำลังศึกษา: 'studying',
  จบการศึกษา: 'graduated',
};
