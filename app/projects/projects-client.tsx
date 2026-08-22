'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState, useTransition } from 'react';

const PROJECTS = [
  {
    id: 1,
    title: 'Edge Service',
    desc: 'Fast auth',
    category: 'Elysia and Redis',
    stars: 210,
    date: '2023-06-01'
  },
  {
    id: 2,
    title: 'Another Project',
    desc: 'Some description',
    category: 'React',
    stars: 150,
    date: '2023-07-01'
  },
  {
    id: 3,
    title: 'Third Project',
    desc: 'Another description',
    category: 'Next.js',
    stars: 300,
    date: '2023-05-15'
  },
  {
    id: 4,
    title: 'Fourth Project',
    desc: 'Yet another description',
    category: 'TypeScript',
    stars: 100,
    date: '2023-08-01'
  }
];

export function ProjectsClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');

  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'newest';
  const categories = useMemo(
    () => ['all', ...Array.from(new Set(PROJECTS.map((project) => project.category)))],
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentQuery = searchParams.get('query') || '';

      if (currentQuery === searchQuery) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());

      if (searchQuery) {
        params.set('query', searchQuery);
      } else {
        params.delete('query');
      }

      startTransition(() => {
        const queryString = params.toString();

        router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [router, pathname, searchParams, searchQuery]);

  const filteredProjects = useMemo(() => {
    const urlQuery = searchParams.get('query') || '';

    return PROJECTS.filter((project) => {
      const matchesQuery =
        project.title.toLocaleLowerCase().includes(urlQuery.toLocaleLowerCase()) ||
        project.desc.toLocaleLowerCase().includes(urlQuery.toLocaleLowerCase());

      const matchesCategory = category === 'all' || project.category === category;

      return matchesQuery && matchesCategory;
    }).sort((a, b) => {
      if (sort === 'popular') {
        return b.stars - a.stars;
      }

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [sort, category, searchParams]);

  const updateParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      const queryString = params.toString();

      router.replace(queryString ? `${pathname}?${queryString}` : pathname);
    });
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-8 text-zinc-100 sm:px-8 lg:px-12">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 border-b border-zinc-800 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-teal-300">
              Project library
            </p>
            <h1 className="text-3xl font-black text-white sm:text-4xl">Проекты</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
              Найдите проект по названию или описанию, отфильтруйте по технологии и отсортируйте
              подборку по новизне или популярности.
            </p>
          </div>

          <div className="rounded-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300">
            <span className="font-semibold text-white">{filteredProjects.length}</span> из{' '}
            {PROJECTS.length} проектов
          </div>
        </header>

        <div className="grid gap-4 rounded-md border border-zinc-800 bg-zinc-900/70 p-4 md:grid-cols-[minmax(0,1fr)_220px]">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-zinc-300">Поиск</span>
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Название или описание"
              className="h-11 rounded-md border border-zinc-700 bg-zinc-950 px-3 text-sm text-white outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-zinc-300">Сортировка</span>
            <select
              value={sort}
              onChange={(event) => updateParams('sort', event.target.value)}
              className="h-11 rounded-md border border-zinc-700 bg-zinc-950 px-3 text-sm text-white outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20">
              <option value="newest">Сначала новые</option>
              <option value="popular">По популярности</option>
            </select>
          </label>

          <div className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm font-medium text-zinc-300">Категория</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => {
                const isActive = item === category;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => updateParams('category', item)}
                    className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'border-teal-400 bg-teal-400 text-zinc-950'
                        : 'border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-zinc-500 hover:text-white'
                    }`}>
                    {item === 'all' ? 'Все' : item}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <p
          aria-live="polite"
          className={`h-5 text-sm text-teal-300 transition-opacity ${
            isPending ? 'opacity-100' : 'opacity-0'
          }`}>
          Обновляем список...
        </p>

        {filteredProjects.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="flex min-h-56 flex-col justify-between rounded-md border border-zinc-800 bg-zinc-900 p-5 transition hover:-translate-y-1 hover:border-teal-500/60">
                <div>
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className="rounded-md bg-zinc-800 px-2.5 py-1 text-xs font-semibold text-teal-200">
                      {project.category}
                    </span>
                    <span className="text-sm font-semibold text-amber-300">
                      {project.stars} stars
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white">{project.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{project.desc}</p>
                </div>

                <footer className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4 text-sm text-zinc-500">
                  <time dateTime={project.date}>
                    {new Intl.DateTimeFormat('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    }).format(new Date(project.date))}
                  </time>
                  <button
                    type="button"
                    className="font-semibold text-teal-300 transition hover:text-teal-200">
                    Открыть
                  </button>
                </footer>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-zinc-700 bg-zinc-900/50 px-6 py-12 text-center">
            <h2 className="text-xl font-bold text-white">Ничего не найдено</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-400">
              Попробуйте изменить запрос, выбрать другую категорию или сбросить фильтры.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                updateParams('category', null);
              }}
              className="mt-6 rounded-md bg-teal-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-teal-300">
              Сбросить фильтры
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
