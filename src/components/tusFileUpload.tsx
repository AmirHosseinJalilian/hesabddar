'use client';

import React, { useState } from 'react';
import * as tus from 'tus-js-client';

interface FileUploadProps {
  endpoint: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ endpoint }) => {
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const onUpload = () => {
    if (!file) {
      alert('Please choose a file');
      return;
    }

    const upload = new tus.Upload(file, {
      endpoint,
      addRequestId: true,
      retryDelays: [0, 1000, 3000, 5000],
      metadata: {
        filename: file.name,
        filetype: file.type,
        ownerType: 'recipe',
        ownerId: '1',
      },
      onError: (error: Error) => {
        console.error('Failed because:', error);
      },
      onProgress: (bytesUploaded: number, bytesTotal: number) => {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log(`${percentage}%`);
      },
      onSuccess: () => {
        console.log(upload);
        console.log('Upload finished:', upload.url);
        const urlParts = upload?.url?.split('/');
        const objectKey = urlParts?.[urlParts.length - 1];
        console.log('Object Key:', objectKey);
        // open url in new tab
        window.open(upload.url || '', '_blank');
      },
    });

    upload.start();
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <button type="button" onClick={onUpload}>
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
