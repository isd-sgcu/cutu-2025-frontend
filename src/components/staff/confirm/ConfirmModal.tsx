import ConfirmPopup from '../confirm/ConfirmPopup';

interface ConfirmModalProps {
  isOpen: boolean;
  userinfo: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, userinfo }) => {
  const modalClasses = `fixed inset-0 z-50 overflow-y-auto justify-center flex  bg-gray-500 bg-opacity-75 transition-all ease-in-out duration-300 ${
    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`;

  return (
    <div className={`${modalClasses}`}>
      <div
        className={`flex h-full w-[calc(100vh*(72/156)*(9/10))] items-center shadow-lg`}
      >
        <ConfirmPopup userinfo={userinfo} />
      </div>
    </div>
  );
};

export default ConfirmModal;
