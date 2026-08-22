'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const menuItems = [
  {
    id: 0,
    title: 'Главная',
    href: '/'
  },
  {
    id: 1,
    title: 'Dashboard',
    href: '/dashboard'
  },
  {
    id: 2,
    title: 'Настройки',
    href: '/dashboard/settings'
  }
];

export default function Sidebar() {
  const { push, replace } = useRouter();
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-blue-50 p-6 border-r border-blue-100 flex flex-col">
      <div className="mb-8 text-xs font-bold text-blue-500 uppercase tracking-widest font-sans">
        Dashboard Layout
      </div>

      <nav className="flex flex-col gap-4">
        <span className="font-bold text-sm text-zinc-400">Навигация</span>

        {menuItems.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              href={link.href}
              key={link.id}
              className={`transition-colors ${isActive ? 'text-red-600 font-semibold' : 'hover:text-blue-600 text-zinc-700'}`}>
              {link.title}
            </Link>
          );
        })}

        <div className="flex flex-col gap-2">
          <button onClick={() => push('/')} className="hover: text-blue-600 transition-colors">
            Test main push
          </button>
          <button
            onClick={() => replace('/shop')}
            className="hover: text-blue-600 transition-colors">
            Replace
          </button>
        </div>
      </nav>
    </aside>
  );
}
