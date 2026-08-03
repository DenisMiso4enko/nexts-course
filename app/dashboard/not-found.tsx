import Link from 'next/link';

export default function DashboardNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 font-sans">
      <h1 className="text-6xl font-bold text-zinc-900">404</h1>
      <p className="text-zinc-500">Страница дашборда не найдена</p>
      <Link
        href="/dashboard"
        className="mt-2 text-sm text-blue-500 hover:text-blue-600 transition-colors">
        В дашборд
      </Link>
    </div>
  );
}
