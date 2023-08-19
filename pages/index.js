import Link from 'next/link';
import { useState } from 'react';
import Footer from '../components/Footer';
// import { useRouter } from 'next/router';
import Head from 'next/head';


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
  const resetFilters = () => {
    setMinPrice(null);
    setMaxPrice(null);
    setMinAge(null);
    setMaxAge(null);
    setKeyword("");
    setGender("");
    setLocation("");
    fetchData();
  };

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
    setIsOpen(false);
  };

  const handleLoadMore = () => {
    fetchData(true);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFilter();
    console.log("Form submitted");
  };

  return (
    // <Layout>
      <>

      <Head>
        <title>SecretSkype</title>
        <meta 
          name="description" 
          content="Cam girls you can all on Skype at the best prices."
        />
      </Head>
        
      <div className="bg-white text-blue-600 p-4 flex justify-between items-center border-b border-gray-200">
        <span className="w-1/4"></span>

        <Link href="/">
          <div className="text-lg font-semibold w-1/2 text-center no-underline">
            SecretSkype
          </div>
        </Link>

        <button
          onClick={toggleMenu}
          className="w-1/4 flex justify-end items-center px-3 py-2 text-gray-600"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="mt-16 px-6">
            <form
                onSubmit={(e) => {
                e.preventDefault(); // Prevents the page from reloading
                handleFilter();     // Calls your filter function
                }}
                className="space-y-4"
            >
                <input
                type="text"
                placeholder="Keyword"
                className="p-2 border rounded w-full"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                />

                <div className="flex justify-between">
                <input
                  type="number"
                  placeholder="Min Age"
                  className="p-2 border rounded w-1/2 mr-2"
                  value={minAge === null ? '' : minAge}
                  onChange={e => setMinAge(parseInt(e.target.value) || null)}
                />
                <input
                  type="number"
                  placeholder="Max Age"
                  className="p-2 border rounded w-1/2 ml-2"
                  value={maxAge === null ? '' : maxAge}
                  onChange={e => setMaxAge(parseInt(e.target.value) || null)}
                />
                </div>

                <div className="flex justify-between">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Min Price"
                  className="p-2 border rounded w-1/2 mr-2"
                  value={minPrice === null ? '' : minPrice}
                  onChange={e => setMinPrice(parseFloat(e.target.value) || null)}
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Max Price"
                  className="p-2 border rounded w-1/2 ml-2"
                  value={maxPrice === null ? '' : maxPrice}
                  onChange={e => setMaxPrice(parseFloat(e.target.value) || null)}
                />
                </div>

                <select
                className="p-2 border rounded w-full"
                value={gender}
                onChange={e => setGender(e.target.value)}
                >
                <option value="" disabled>Gender</option>
                <option value="Female">Female</option>
                <option value="FemaleTrans">Female + Trans</option>
                <option value="Trans">Trans</option>
                <option value="Male">Male</option>
                </select>

                <select
                className="p-2 border rounded w-full"
                value={location}
                onChange={e => setLocation(e.target.value)}
                >
                <option value="" disabled>Location</option>
                <option value="Asia">Asia</option>
                <option value="Colombia">Colombia</option>
                <option value="Romania">Romania</option>
                <option value="Russia">Russia</option>
                <option value="UK">UK</option>
                <option value="USA + Canada">USA + Canada</option>
                </select>

                <button
                type="submit"
                className="p-2 w-full bg-blue-500 text-white rounded"
                >
                Search
                </button>
                <button
                  type="button"
                  className="p-2 w-full bg-gray-300 text-black rounded"
                  onClick={resetFilters}
                >
                  Clear
                </button>
            </form>
        </div>
      </div>



      {/* Models Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 m-1 auto-cols-min">
        {models.length === 0 ? (
          <p className="col-span-full text-center py-10 text-gray-500">
            Sorry, no results for your search.
          </p>
        ) : (
          models.map(model => (
            <Link key={model.id} href={`/model/${model.fields.slug}`}>
              <div className="relative cursor-pointer border overflow-hidden hover:shadow-xl transition-shadow duration-300 aspect-w-16 aspect-h-9">
                {/* Image */}
                <img src={model.fields.thumb_image[0].url} alt={model.fields.name} className="w-full h-auto object-cover aspect-content" />

                {/* Overlayed Details */}
                <div className="absolute bottom-0 left-0 w-full p-2 flex justify-between items-center bg-gradient-to-t from-black/40 to-transparent">
                  <h2 className="text-sm truncate text-white">{model.fields.name}</h2>
                  {model.fields.price ? (
                    <span className="text-xs text-white">
                      ${parseFloat(model.fields.price).toFixed(2)}
                    </span>
                  ) : null}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

        {offset && (
          <div className="flex justify-center mt-4">
            <button 
              className="px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-500"
              onClick={handleLoadMore}
            >
              More
            </button>
          </div>
        )}

        <Footer/>
        
</>

      
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
