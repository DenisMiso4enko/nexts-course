// параметры маршрута в next js передаются через пропсы

interface UserPagePros {
  // ключ id должен совпасть с названием папки
  params: Promise<{ id: string }>;

}


export default async function UserPage({ params }: UserPagePros) {
  const { id } = await params;

  return (
    <div>Id: {id}</div>
  );
}