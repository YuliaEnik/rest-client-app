import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Page not found
        </h2>
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-lime-300  rounded-lg hover:bg-lime-500"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
