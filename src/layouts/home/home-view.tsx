'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomeView() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen custom-radial-gradient w-full sm:w-2/3 md:w-3/5 lg:w-2/5 gap-8 px-4 md:px-6 rounded-lg">
      <Image
        src="/assets/image/youapp-full.png"
        width={200}
        height={100}
        priority={true}
        style={{ width: 'auto', height: 'auto' }}
        alt="Logo"
      />

      <div className="flex flex-row items-center gap-4">
        <button
          className="border border-white hover:opacity-85 py-2 px-8 rounded text-sm"
          onClick={() => router.push('/auth/register')}
        >
          Register
        </button>
        <button
          className="bg-gradient-to-r from-[#62CCCD] hover:from-[#62CCCD]/85 to-[#4599DB] hover:to-[#4599DB]/85 py-2 px-8 rounded text-sm"
          onClick={() => router.push('/auth/login')}
        >
          Login
        </button>
      </div>
    </div>
  );
}
