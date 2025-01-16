import Link from 'next/link';

interface NotificationContextProps {
  onClickShowCondition: () => void;
}
const NotificationContext: React.FC<NotificationContextProps> = ({
  onClickShowCondition,
}) => {
  return (
    <>
      {/* <Image
        src={Divider}
        alt="divider"
        className="h-4 w-full bg-cover px-[15%]"
      /> */}
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <div className="aspect-square w-[40%]">
          {/* <Icon
            icon="mdi:sms-failed"
            className="w-full h-full text-project-fuchsia"
          /> */}
        </div>
        <span className="font-athiti mt-8 text-center text-xl font-medium">
          ยังไม่ถึงเงื่อนไขที่กำหนด
          <br />
          ในการรับรางวัลนะ!
        </span>
        <div className="mt-4 flex w-full flex-col items-center gap-5 px-[15%]">
          <button
            className="border-project-fuchsia flex h-12 w-full items-center justify-center rounded-lg border bg-white"
            onClick={onClickShowCondition}
          >
            <span className="font-athiti text-project-fuchsia text-xl font-medium">
              ดูเงื่อนไขการรับรางวัล
            </span>
          </button>
          <Link
            className="bg-project-light-gray flex h-12 w-full items-center justify-center rounded-lg"
            href="/firstdate/home"
          >
            <span className="font-athiti text-xl font-medium text-white">
              กลับไปเดินทางต่อ
            </span>
          </Link>
        </div>
      </div>
      {/* <Image
        src={Divider}
        alt="divider"
        className="h-4 w-full bg-cover px-[15%]"
      /> */}
    </>
  );
};

export default NotificationContext;
