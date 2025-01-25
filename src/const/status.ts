export const status = [
  'chula_student',
  'general_student',
  'alumni',
  'general_public',
] as const;

export const statusMap = {
  chula_student: 'นิสิตปัจจุบัน',
  alumni: 'นิสิตเก่า',
  general_student: 'นักศึกษา',
  general_public: 'บุคคลทั่วไป',
};
