'use client';
// import ConditionContext from '@/components/congratulation/ConditionContext';
import NotificationContext from './NotificationContext';
// import NotiBg from '@public/congrats/Noti.png';
import { useState } from 'react';

const NotificationPopup = () => {
  const [showCondition, setShowCondition] = useState(false);
  const handleOnClickShowCondition = () => {
    setShowCondition(true);
  };
  return (
    <div
      // style={{
      //   backgroundImage: `url(${NotiBg.src})`,
      //   backgroundSize: '100% 100%',
      // }}
      className={`w-full ${showCondition ? 'aspect-[390/640]' : 'aspect-[333/535]'} flex flex-col items-center bg-center bg-no-repeat py-[16%]`}
    >
      {showCondition ? (
        // <ConditionContext />
        <div></div>
      ) : (
        <NotificationContext
          onClickShowCondition={handleOnClickShowCondition}
        />
      )}
    </div>
  );
};

export default NotificationPopup;
