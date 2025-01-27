export const educations = ['studying', 'graduated'] as const;
export type Education = (typeof educations)[number];

export const educationsMap = {
  studying: 'กำลังศึกษา',
  graduated: 'จบการศึกษา',
};

export const educationsMapReverse: { [key: string]: Education } = {
  กำลังศึกษา: 'studying',
  จบการศึกษา: 'graduated',
};
