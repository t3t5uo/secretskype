import Layout from '../../components/Layout';
import { useState } from 'react';

export default function ModelPage({ model }) {
  const [lightboxImage, setLightboxImage] = useState(null);

  const openLightbox = (url) => {
    setLightboxImage(url);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  if (!model) {
    return <div>Model not found</div>;
  }

  const siteFields = [
    'livejasmin_id', 'streamate_id', 'camsoda_id',
    'chaturbate_id', 'myfreecams_id', 'xcams_id',
    'camsdotcom_id', 'bongacams_id', 'stripchat_id',
    'flirt4free_id'
  ];

  const otherSites = siteFields.filter(siteField => {
    return model.fields[siteField];
  });

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-cover bg-center h-64" style={{ backgroundImage: `url(${model.fields.background_image[0].url})` }}>
          <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
            <img src={model.fields.profile_image[0].url} alt={model.fields.name} className="w-32 h-32 rounded-full border-4 border-white shadow-lg cursor-pointer" onClick={() => openLightbox(model.fields.profile_image[0].url)} />
          </div>
        </div>
        <div className="p-4 md:p-8 lg:p-12 space-y-4 md:space-y-8 lg:space-y-12 bg-white rounded-lg shadow-md mt-4 mx-4 md:mx-8 lg:mx-12">
          <h1 className="text-2xl font-semibold">{model.fields.name}</h1>
          
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="space-y-2 md:space-y-4">
              <p className="text-gray-600">Age: {model.fields.age}</p>
              <p className="text-gray-600">Country: {model.fields.country}</p>
              <p className="text-gray-600">Online Since: {new Date(model.fields.online_date).toLocaleDateString()}</p>
              <p className="text-gray-600">Sex: {model.fields.sex}</p>
              {model.fields.twitter && (
                <p className="text-gray-600">Twitter: <a href={model.fields.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline"> @{model.fields.twitter}</a></p>
              )}
              <p className="text-gray-600">Star Rating: {model.fields.star_rating}</p>
              <p className="text-gray-600">Languages: {model.fields.languages}</p>
            </div>
            
            {model.fields.skyprivate_link && (
              <a href={model.fields.skyprivate_link} target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 md:mt-0">
                View SkyPrivate Profile
              </a>
            )}
          </div>

          {/* Other Sites Section */}
          <div className="flex space-x-2">
            {otherSites.map((siteField, index) => (
              <a 
                key={index}
                href={model.fields[`${siteField.replace('_id', '')}_link`]} 
                className="text-blue-500 underline"
              >
                {siteField.replace('_id', '')}
              </a>
            ))}
          </div>

          <p className="text-gray-600">{model.fields.bio}</p>
          <p className="text-gray-600">{model.fields.tags}</p>
        </div>
        
        {/* Lightbox */}
        {lightboxImage && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="max-w-screen-lg mx-auto">
              <img src={lightboxImage} alt={model.fields.name} className="max-h-screen" />
              <button onClick={closeLightbox} className="absolute top-2 right-2 text-white">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;

  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/models?slug=${slug}`);
  const data = await response.json();

  if (data.records.length === 0) {
    return { notFound: true };
  }

  const model = data.records[0];

  return {
    props: {
      model,
    },
  };
}
