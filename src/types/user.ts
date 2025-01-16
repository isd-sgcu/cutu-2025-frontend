export type User = {
  fullname: string;
  email: string;
  tel: string;
  birthdate: Date;
  size: string;
  foodAllegy: string;
  disease: string;
  drugAllegy: string;
  idCardImg: File | null;
  isConfirmCorrectInfo: boolean;
  isAcceptTermAndCondition: boolean;
  isAcceptPDPA: boolean;
  study: string;
  university: string;
  status: string;
  graduatedYear: number;
  graduatedFaculty: string;
};
