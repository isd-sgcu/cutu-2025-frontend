'use client';

import { useState } from 'react';
import Policy from './_components/policy';
import Progress from './_components/progress';

export default function Page() {
  const [termAndCondition, setTermAndCondition] = useState(false);

  return (
    <div className="p-6">
      <Progress step={1} className="mx-auto" />
      <Policy
        topic="ข้อตกลงและเงื่อนไข"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.Lorem ipsum dolor sit amet, "
        condition="ข้าพเจ้ายอมรับข้อตกลงและเงื่อนไข"
        isAccepted={termAndCondition}
        SetIsAccepted={setTermAndCondition}
      />
    </div>
  );
}
