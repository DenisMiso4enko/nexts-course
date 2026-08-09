// параметры маршрута в next js передаются через пропсы
// [[]] двойные скобки должны быть что бы отлавливать Route даже если будет один сегмент

interface ShopPagePros {
  // динамический slug будет массивом строк
  params: Promise<{ slug: String[] }>;
}

export default async function ShopPage({ params }: ShopPagePros) {
  const { slug } = await params;

  const currentSlug = slug || '';

  const [category, brand, model] = currentSlug;

  return (
    <div>
      <h3>DEBUG: {JSON.stringify(slug)}</h3>
      <h1>Brand {brand || 'All Brand'}</h1>
      <nav>
        <span>Shop</span>

        {Array.isArray(currentSlug) && currentSlug.map((segment, index) => (
          <div key={index}>{segment}</div>
        ))}
      </nav>
      <p>Category: {category}</p>
      <p>Model: {model}</p>
    </div>
  );
}
