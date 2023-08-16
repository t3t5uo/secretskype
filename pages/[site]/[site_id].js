// pages/[site]/[site_id].js
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';

export default function ModelPage({ model, site }) {
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
    return model.fields[siteField] && siteField !== `${site}_id`;
  });

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-cover bg-center h-64" style={{ backgroundImage: `url(${model.fields.background_image[0].url})` }}>
          <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
            <img 
              src={model.fields.profile_image[0].url} 
              alt={model.fields.name} 
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg cursor-pointer" 
              onClick={() => openLightbox(model.fields.profile_image[0].url)} 
            />
          </div>
        </div>
        <div className="p-4 md:p-8 lg:p-12 space-y-4 md:space-y-8 lg:space-y-12 bg-white rounded-lg shadow-md mt-4 mx-4 md:mx-8 lg:mx-12">
          <h1 className="text-2xl font-semibold">{model.fields.name}</h1>
          
          <p className="text-gray-600">{model.fields.bio}</p>
          <p className="text-gray-600">{model.fields.tags}</p>
          
          {/* Other Sites Section */}
          {otherSites.length > 0 && (
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
        )}  
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
  const { site, site_id } = context.params;
  
  const airtableAPIKey = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN;
  const airtableBaseID = 'appDPUfeGYoo28O5A';
  const airtableTableName = 'Models';
  
  const config = {
    headers: {
      Authorization: `Bearer ${airtableAPIKey}`,
    }
  };
  
  const formula = `{${site}_id}='${site_id}'`;
  const url = `https://api.airtable.com/v0/${airtableBaseID}/${airtableTableName}?filterByFormula=${formula}`;
  
  try {
    const response = await axios.get(url, config);
    const model = response.data.records[0];
  
    if (!model) {
      return { notFound: true };
    }
  
    return {
      props: {
        model,
        site
      }
    };
    
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}
