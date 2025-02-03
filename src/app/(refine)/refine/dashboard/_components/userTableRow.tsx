import dayjs from 'dayjs';
import { User } from '../../libs/interface';

export const UserTableRow = ({ user, onClick }: { user: User, onClick: () => void }) => {
  const statusStyles = {
    chula_student: 'bg-blue-600',
    alumni: 'bg-pink-600',
    general_student: 'bg-gray-600',
  };
  const style = statusStyles[user.status as keyof typeof statusStyles];

  return (
      <tr className="cursor-pointer transition-colors hover:bg-gray-50" onClick={onClick}>
        <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900">
          {user.uid}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900">
          {user.name}
        </td>
        <td className="hidden whitespace-nowrap px-4 py-4 text-sm text-gray-500 sm:table-cell">
          {user.email}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
          <span
            className={`text-xs inline-flex items-center rounded-full px-3 py-1 font-medium text-white ${style}`}
          >
            {
              {
                chula_student: 'นิสิตปัจจุบัน',
                alumni: 'ศิษย์เก่า',
                general_student: 'บุคคลทั่วไป',
              }[user.status]
            }
          </span>
        </td>
        <td className="hidden whitespace-nowrap px-4 py-4 text-sm text-gray-500 sm:table-cell">
          {user.faculty}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
          {user.sizeJersey}
        </td>
        <td className="hidden whitespace-nowrap px-4 py-4 text-sm text-gray-500 sm:table-cell">
          {dayjs(user.lastEntered).isValid()
            ? dayjs(user.lastEntered).format('DD/MM HH:mm')
            : 'ยังไม่เข้างาน'}
        </td>
      </tr>
  );
};
