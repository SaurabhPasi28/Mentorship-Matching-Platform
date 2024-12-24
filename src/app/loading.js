'use client';

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="loader mb-4"></div>
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>

      <style jsx>{`
        .loader {
          width: 50px;
          height: 50px;
          border: 6px solid #e5e7eb; /* Gray-200 */
          border-top: 6px solid #3b82f6; /* Blue-500 */
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
