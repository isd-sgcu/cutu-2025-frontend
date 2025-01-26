import { getImageURL } from '@/utils/image';
import Image from 'next/image';
import Link from 'next/link';

export default function Contact() {
  return (
    <section id="contacts" className="p-4">
      <div className="text-sm">
        <Link href={'/register'} className="cursor-pointer">
          <p className="underline">ข้อตกลงและเงื่อนไข</p>
          <p className="mb-9 underline">นโยบายคุ้มครองข้อมูลส่วนบุคคล</p>
        </Link>
        <p className="mb-2 text-lg font-semibold">ติดต่อเรา</p>
        <div className="grid grid-flow-row grid-cols-3">
          <Link
            href={'https://www.facebook.com/CUTUFootball/?locale=th_TH'}
            className="mb-2 flex flex-row"
          >
            <Image
              src={getImageURL('/homepage/Facebook.svg')}
              width={16}
              height={16}
              alt="facebook"
              className="mr-2"
            />
            <p>Chula BAKA</p>
          </Link>
          <Link
            href={'https://www.instagram.com/chulabaka/'}
            className="mb-2 flex flex-row"
          >
            <Image
              src={getImageURL('/homepage/Instagram.svg')}
              width={16}
              height={16}
              alt="instagram"
              className="mr-2"
            />
            <p>chulabaka</p>
          </Link>
          <Link href={'https://x.com/chulabaka'} className="mb-2 flex flex-row">
            <Image
              src={getImageURL('/homepage/X.svg')}
              width={16}
              height={16}
              alt="x"
              className="mr-2"
            />
            <p>@chulabaka</p>
          </Link>
          <Link
            href={'https://www.tiktok.com/@chulabakaofficial'}
            className="mb-2 flex flex-row"
          >
            <Image
              src={getImageURL('/homepage/tiktok.svg')}
              width={16}
              height={16}
              alt="tiktok"
              className="mr-2"
            />
            <p>Chula BAKA</p>
          </Link>
          <Link
            href={'https://www.youtube.com/@ChulaBakaOfficial'}
            className="mb-2 flex flex-row"
          >
            <Image
              src={getImageURL('/homepage/youtube.svg')}
              width={16}
              height={16}
              alt="youtube"
              className="mr-2"
            />
            <p>Chula BAKA</p>
          </Link>
        </div>

        <div className="mt-6 flex flex-row items-center">
          <Image
            src={getImageURL('/homepage/Logo.svg')}
            width={21}
            height={30}
            alt="logo"
            className="mr-2"
          />
          <p>ฟุตบอลประเพณีธรรมศาสตร์-จุฬาฯ ครั้งที่ 75</p>
        </div>
      </div>
    </section>
  );
}
