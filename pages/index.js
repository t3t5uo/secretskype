import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';

export default function HomePage({ initialModels = [], initialOffset }) {
  const [models, setModels] = useState(initialModels);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minAge, setMinAge] = useState(null);
  const [maxAge, setMaxAge] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [offset, setOffset] = useState(initialOffset);
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");

  const fetchData = async (loadMore = false) => {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
    let query = [];
    if (minPrice) query.push(`minPrice=${minPrice}`);
    if (maxPrice) query.push(`maxPrice=${maxPrice}`);
    if (minAge) query.push(`minAge=${minAge}`);
    if (maxAge) query.push(`maxAge=${maxAge}`);
    if (keyword) query.push(`keyword=${encodeURIComponent(keyword)}`);
    if (gender) query.push(`gender=${gender}`);
    if (location) query.push(`location=${encodeURIComponent(location)}`);

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
        <form
  className="mb-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  onSubmit={(e) => {
    e.preventDefault(); // Prevents the page from reloading
    handleFilter();     // Calls your filter function
  }}
>
  {/* Price Input Fields */}
  <div className="flex flex-row space-x-2">
    <input 
      type="number"
      placeholder="Min Price"
      className="p-2 border rounded w-1/2"
      onChange={e => setMinPrice(parseFloat(e.target.value).toFixed(2))}
    />
    <input 
      type="number"
      placeholder="Max Price"
      className="p-2 border rounded w-1/2"
      onChange={e => setMaxPrice(parseFloat(e.target.value).toFixed(2))}
    />
  </div>
  
  {/* Age Input Fields */}
  <div className="flex flex-row space-x-2">
    <input 
      type="number"
      placeholder="Min Age"
      className="p-2 border rounded w-1/2"
      onChange={e => setMinAge(parseFloat(e.target.value).toFixed(2))}
    />
    <input 
      type="number"
      placeholder="Max Age"
      className="p-2 border rounded w-1/2"
      onChange={e => setMaxAge(parseFloat(e.target.value).toFixed(2))}
    />
  </div>
  
  {/* Keyword and Gender Selection */}
  <div className="flex flex-col space-y-2 md:space-y-0 md:space-x-2 md:flex-row">
    <input
      type="text"
      placeholder="Keyword"
      className="p-2 border rounded w-full"
      onChange={e => setKeyword(e.target.value)}
    />
    <select 
      className="p-2 border rounded w-full"
      value={gender}
      onChange={e => setGender(e.target.value)}
    >
      <option value="">Gender</option>
      <option value="Female">Female</option>
      <option value="FemaleTrans">Female + Trans</option>
      <option value="Trans">Trans</option>
      <option value="Male">Male</option>
    </select>
  </div>

  {/* Location Selection and Filter Button */}
  <div className="flex flex-col space-y-2 md:space-y-0 md:space-x-2 md:flex-row">
    <select 
      className="p-2 border rounded w-full"
      value={location}
      onChange={e => setLocation(e.target.value)}
    >
      <option value="">Location</option>
      <option value="Asia">Asia</option>
      <option value="Colombia">Colombia</option>
      <option value="Romania">Romania</option>
      <option value="Russia">Russia</option>
      <option value="UK">UK</option>
      <option value="USA + Canada">USA + Canada</option>
    </select>
    <button 
      type="submit"
      className="p-2 bg-blue-500 text-white rounded w-full md:w-auto"
    >
      Filter
    </button>
  </div>
</form>


        {/* Models Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {models.map(model => (
            <Link key={model.id} href={`/model/${model.fields.slug}`}>
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

        {/* Load More Button */}
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
