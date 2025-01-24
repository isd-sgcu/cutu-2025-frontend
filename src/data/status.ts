export const status = [
  'cu_student',
  'alumni',
  'student',
  'general_public',
] as const;

export const statusMap = {
  cu_student: 'นิสิตปัจจุบัน',
  alumni: 'นิสิตเก่า',
  student: 'นักศึกษา',
  general_public: 'บุคคลทั่วไป',
};
