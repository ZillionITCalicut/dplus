import Link from 'next/link';
import QRCode from 'qrcode.react';
import React from 'react';
import copy from 'clipboard-copy';

const Location = ({ data }) => {
  console.log(data);
  const locationData = data[0];
  const { gmapUrl } = locationData;
  console.log(gmapUrl);

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(gmapUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyToClipboard = () => {
    copy(gmapUrl);
    // You can show a notification or perform any other action to indicate that the content has been copied
    alert('Copied to clipboard!');
  };

  return (
    <div>
      <div className="container">
        {gmapUrl && (
          <div className='mt-4 mb-5'>
            <div className="mt-2">
              <Link href={gmapUrl} target="_blank" rel="noopener noreferrer">
                <QRCode value={gmapUrl} />
              </Link>
            </div>
            <div className="row">
              <div className="d-flex align-items-center">
                <div className="btn d-flex align-items-center" >
                  <div className='fs-3 ms-3' onClick={handleWhatsAppShare}>
                    <i className="fa-brands fa-whatsapp"></i>
                  </div>
                  <div className='fs-3 ms-3' onClick={handleCopyToClipboard}>
                    <i className="fa-solid fa-copy"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Location;
