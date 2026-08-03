import { notFound } from 'next/navigation';

export default function SettingsPage() {
  const data = null;

  if (!data) {
    return notFound()
  }
  return (
    <div className="p-4 bg-zinc-50 border-2 border-zinc-500 rounded-md">
      <h1 className="text-xl text-black font-bold">Настройки профиля</h1>
    </div>
  );
}
