import { Suspense } from 'react';

import { ProjectsClient } from './projects-client';

export default function ProjectsPage() {
  return (
    <Suspense fallback={<p className="text-sm text-teal-300">Загрузка...</p>}>
      <ProjectsClient />
    </Suspense>
  );
}
