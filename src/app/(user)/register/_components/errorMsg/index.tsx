import React from 'react';

interface ErrorMsgProps {
  message: string | undefined;
}

export default function ErrorMsg({ message }: ErrorMsgProps) {
  return (
    <>
      {message && (
        <p className="absolute right-0 text-right text-sm text-red-500">
          {message}
        </p>
      )}
    </>
  );
}
