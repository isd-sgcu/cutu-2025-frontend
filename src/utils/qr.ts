import axios from 'axios';
import { apiClient } from './axios';
import { parseRFC3339Date } from './date';

export interface ScanQRResp {
  age: 'string';
  chronicDisease: 'string';
  drugAllergy: 'string';
  education: 'studying';
  email: 'string';
  faculty: 'string';
  foodLimitation: 'string';
  graduatedYear: 'string';
  id: 'string';
  imageUrl: 'string';
  invitationCode: 'string';
  lastEntered: 'string';
  name: 'string';
  phone: 'string';
  role: 'member';
  sizeJersey: 'string';
  status: 'chula_student';
  uid: 'string';
  university: 'string';
}

export interface ScanQRResult {
  modalType: 'confirm' | 'invalid' | 'already';
  userInfo?: string;
  time?: string;
}

export interface ScanQRError {
  error: string;
  message: string;
}

export async function scanQR(
  userId: string,
  accessToken: string,
): Promise<ScanQRResult> {
  try {
    const resp = await apiClient.post<ScanQRResp>(
      `/users/qr/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return { modalType: 'confirm', userInfo: resp.data.name };
  } catch (err: unknown) {
    if (axios.isAxiosError<ScanQRError>(err)) {
      switch (err.response?.status) {
        case 400:
          const dateTime = parseRFC3339Date(err.response.data.message);
          const dateString =
            dateTime.toLocaleString('th-TH', {
              hour: 'numeric',
              minute: 'numeric',
            }) + ' น.';

          return {
            modalType: 'already',
            time: dateString,
          };
        default:
          return { modalType: 'invalid' };
      }
    }
    return { modalType: 'invalid' };
  }
}
