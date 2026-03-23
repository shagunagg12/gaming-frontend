import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { IoQrCodeOutline } from 'react-icons/io5';

const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState<string>('Change QR');

  return (
    <div className="flex flex-col items-start gap-y-2">
      <div className="md:mt-4 mt-2 p-2 bg-white rounded-md">
        <QRCodeSVG value={text} size={160} />
      </div>
      <button onClick={() => setText("QR Changed")} type="button" className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
      <IoQrCodeOutline className='mr-2' />
{text}
</button>
    </div>
  );
};

export default QRCodeGenerator;
