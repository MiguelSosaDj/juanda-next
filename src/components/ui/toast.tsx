import { Toaster } from 'react-hot-toast';

export default function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#1f2937',
          color: '#fff',
        },
        success: {
          style: {
            border: '1px solid #059669',
          },
        },
        error: {
          style: {
            border: '1px solid #dc2626',
          },
        },
      }}
    />
  );
}