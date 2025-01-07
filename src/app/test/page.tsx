"use client";

import { useLiff } from "@/context/line";

export default function Page() {
  const liff = useLiff();
  console.log(liff);

  return <div>test</div>;
}
