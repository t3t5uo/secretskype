import Layout from '../../components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

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

  const tagsArray = model.fields.tags ? model.fields.tags.split(', ') : [];
  const skypeButtonText = model.fields.price ? `$${model.fields.price}/min | Skype Profile` : 'Skype Profile';

  const otherSites = [
    { idField: 'livejasmin_id', name: 'LiveJasmin', color: 'bg-red-500' },
    { idField: 'streamate_id', name: 'Streamate', color: 'bg-blue-500' },
    { idField: 'camsoda_id', name: 'CamSoda', color: 'bg-pink-500' },
    { idField: 'chaturbate_id', name: 'Chaturbate', color: 'bg-white text-black' },
    { idField: 'myfreecams_id', name: 'MyFreeCams', color: 'bg-green-500' },
    { idField: 'xcams_id', name: 'XCams', color: 'bg-blue-500' },
    { idField: 'camsdotcom_id', name: 'Cams.com', color: 'bg-pink-500' },
    { idField: 'bongacams_id', name: 'BongaCams', color: 'bg-red-500' },
    { idField: 'stripchat_id', name: 'Stripchat', color: 'bg-pink-500' },
    { idField: 'flirt4free_id', name: 'Flirt4Free', color: 'bg-blue-500' },
  ];

  const visibleSites = otherSites.filter(site => model.fields[site.idField]);

  return (
    <Layout>
     <Head>
        <title>SecretSkype - {model.fields.name}</title>
        <meta 
          name="description" 
          content="${model.fields.slug} has a secret skype."
        />
        <link rel="canonical" href={`https://secretskype.com/model/${model.fields.slug}`} />
        <meta charSet="UTF-8" />
        <html lang="en" />
      </Head>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[90vh] bg-cover bg-center" style={{ backgroundImage: `url(${model.fields.background_image[0].url})` }}>
          <div className="absolute inset-0 bg-black opacity-40"></div>

          {/* Profile Picture and Information */}
          <div className="absolute inset-0 bottom-0 left-0 right-0 text-center p-10 flex flex-col justify-center items-center">
            <img src={model.fields.profile_image[0].url} alt={`${model.fields.name}'s Profile`} onClick={() => openLightbox(model.fields.profile_image[0].url)} className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full mx-auto mb-8 cursor-pointer" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">{model.fields.name}</h1>
            <p className="text-xl md:text-lg text-white mb-5">{model.fields.country_emoji} {model.fields.country} | {model.fields.age}</p>

            {/* Skype Button */}
            <a href={model.fields.skyprivate_url} className="mb-6 inline-block mx-2 px-8 py-3 text-lg text-white bg-blue-600 rounded-full">{skypeButtonText}</a>

            {/* Other Cams Section */}
            {visibleSites.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg md:text-xl text-white mb-4">Live Cams</h3>
                {visibleSites.map((site, index) => (
                  <a key={index} href={model.fields[site.idField.replace('_id', '_link')]} className={`${site.color} inline-block mx-2 px-5 py-2 text-white rounded-full`}>{site.name}</a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* White Background Section */}
        <div className="bg-white mt-5 p-10 max-w-3xl mx-auto rounded-lg">
          {/* Tags */}
          <div className="flex flex-wrap justify-center mt-3">
            {tagsArray.map((tag, index) => (
              <span key={index} className="m-1 px-3 py-1 text-sm bg-gray-200 rounded-full">{tag}</span>
            ))}
          </div>

          {/* Bio */}
          <p className="text-gray-600 mt-10 break-words overflow-hidden">{model.fields.bio}</p>
        </div>
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
