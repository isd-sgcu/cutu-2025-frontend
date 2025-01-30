export const educations = ['studying', 'graduated', 'notSpecified'] as const;
export type Education = (typeof educations)[number];

export const educationsMap = {
  studying: 'กำลังศึกษา',
  graduated: 'จบการศึกษา',
  notSpecified: 'ไม่ประสงค์เเจ้ง',
};

export const educationsMapReverse: { [key: string]: Education } = {
  กำลังศึกษา: 'studying',
  จบการศึกษา: 'graduated',
  ไม่ประสงค์เเจ้ง: 'notSpecified',
};
