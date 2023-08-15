import { useState } from 'react';
import { fetchModelById } from '../../utils/airtable';
import Layout from '../../components/Layout';

export default function ModelPage({ model }) {
  const [lightboxImage, setLightboxImage] = useState(null);

  const openLightbox = (imageUrl) => {
    setLightboxImage(imageUrl);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

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
          {/* ... rest of the details for the model, like Age, Country, Price, etc. */}
          <div className="flex space-x-2">
            <a href={model.fields.skyprivate_link} className="text-blue-500 underline">
              Skyprivate Link
            </a>
            <a href={model.fields.livejasmin_link} className="text-blue-500 underline">
              LiveJasmin Link
            </a>
            {/* ... other links */}
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

export async function getServerSideProps(context) {
  console.log("Fetching model with ID:", context.params.id); // Debugging log
  const model = await fetchModelById(context.params.id);

  if (!model) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      model,
    },
  };
}
