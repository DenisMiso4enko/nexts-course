import { CARS } from '@/app/constants';
import NotFound from '@/app/not-found';
import CloseModal from '@/app/@modal/(.)photo/[id]/CloseModal';

interface PhotoModalPros {
  params: Promise<{ id: string }>;
}

export default async function PhotoModal({ params }: PhotoModalPros) {
  const { id } = await params;

  const car = CARS.find(car => car.id === id);

  if (!car) {
    return NotFound();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-zinc-950 p-12 rounded-4xl border border-zinc-800 max-w-lg w-full shadow-2xl">
        <span className="text-blue-500 text-[10px] font-bold uppercase tracking-widest block mb-2">
          Intercepted
        </span>
        <h2 className="text-5xl font-black text-white uppercase italic mb-6">{car.name}</h2>
        <p className="text-zinc-500 mb-8">
          Этот контент перехвачен. Вы видите его в модалке, но в адресной строке путь /photo/{id}.
        </p>
        <CloseModal />
      </div>
    </div>
  );
}
