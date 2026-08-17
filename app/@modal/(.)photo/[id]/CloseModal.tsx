'use client';
import { useRouter } from 'next/navigation';

export default function CloseModal() {
  const route = useRouter();

  const handleCloseModal = () => route.back();

  return <button onClick={handleCloseModal} className="text-white text-xl cursor-pointer">Close Modal</button>;
}