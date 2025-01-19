import Progress from '../progress';
import Top from '../top';
import { getImageURL } from '@/utils/image';

interface LayoutProps {
  children?: React.ReactNode;
  step: number;
  onBack: () => void;
  bgPath: string;
  backMsg: string;
}

export default function RegisterLayout({
  children,
  step,
  onBack,
  bgPath,
  backMsg,
}: LayoutProps) {
  return (
    <div className="min-h-screen w-full">
      <Top
        backgroundPath={getImageURL(bgPath)}
        back={backMsg}
        header="ลงทะเบียน"
        onBack={onBack}
      />
      <div className="flex flex-col items-center p-6">
        <Progress step={step} />
        {children}
      </div>
    </div>
  );
}
