'use client';

interface DashboardErrorInterface {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: DashboardErrorInterface) {
  return (
    <div className="text-blackt">
      <h2>Произошла ошибка на странице Dashboard</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Попробовать снова</button>
    </div>
  );
}
