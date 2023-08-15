import Link from 'next/link';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function HomePage({ initialModels = [], initialOffset }) {
  const [models, setModels] = useState(initialModels);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [offset, setOffset] = useState(initialOffset);

  const fetchData = async (loadMore = false) => {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
    let query = [];
    if (minPrice) query.push(`minPrice=${minPrice}`);
    if (maxPrice) query.push(`maxPrice=${maxPrice}`);
    if (keyword) query.push(`keyword=${encodeURIComponent(keyword)}`);
    if (loadMore) query.push(`offset=${offset}`);
    const response = await fetch(`${baseUrl}/api/models?${query.join('&')}`);
    const data = await response.json();
    if (loadMore) {
      setModels(prevModels => [...prevModels, ...data.records]);
    } else {
      setModels(data.records || []);
    }
    setOffset(data.offset || null);
  };

  const handleFilter = () => {
    fetchData();
  };

  const handleLoadMore = () => {
    fetchData(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4 flex space-x-2">
          <input 
            type="number" 
            placeholder="Min Price" 
            className="p-2 border rounded" 
            onChange={e => setMinPrice(parseFloat(e.target.value).toFixed(2))}
          />
          <input 
            type="number" 
            placeholder="Max Price" 
            className="p-2 border rounded" 
            onChange={e => setMaxPrice(parseFloat(e.target.value).toFixed(2))}
          />
          <input
            type="text"
            placeholder="Keyword Search" 
            className="p-2 border rounded"
            onChange={e => setKeyword(e.target.value)}
          />
          <button 
            className="p-2 bg-blue-500 text-white rounded" 
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {models.map(model => (
            <Link key={model.id} href={`/model/${model.id}`}>
              <div className="cursor-pointer border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img src={model.fields.thumb_image[0].url} alt={model.fields.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl truncate">{model.fields.name}</h2>
                  <p className="text-gray-600 mt-2">${parseFloat(model.fields.price).toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {offset && (
          <div className="flex justify-center mt-4">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700" 
              onClick={handleLoadMore}
            > 
              Load More
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/models`);
  const data = await response.json();
  return {
    props: {
      initialModels: data.records || [],
      initialOffset: data.offset || null,
    },
  };
}
