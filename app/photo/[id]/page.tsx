import { CARS } from '@/app/constants';
import NotFound from '@/app/not-found';

interface PhotoPagePros {
  params: Promise<{ id: string }>;
}

export default async function PhotoSinglePage({ params }: PhotoPagePros) {
  const { id } = await params;

  const car = CARS.find(car => car.id === id);

  if (!car) {
    return NotFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      <h1 className="text-5xl">View page</h1>
      <p className="mt-5">You are watching photo with id: {car.id}</p>
      <p className="mt-5">Car {car.name}</p>
    </div>
  );
}
