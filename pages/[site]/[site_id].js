import axios from 'axios';
import React from 'react';

export default function ModelPage({ model, site }) {
  const [lightboxImage, setLightboxImage] = React.useState(null);

  function openLightbox(imageUrl) {
    setLightboxImage(imageUrl);
  }

  function closeLightbox() {
    setLightboxImage(null);
  }

  return (
    <div>
      <h1>{model.fields.name} on {site}</h1>
      
      <img 
        src={model.fields.profile_image[0].url} 
        alt={model.fields.name}
        onClick={() => openLightbox(model.fields.profile_image[0].url)} 
      />
      
      <p>{model.fields.bio}</p>
      <p>{model.fields.tags}</p>
      
      {/* Lightbox */}
      {lightboxImage && (
        <div>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <img src={lightboxImage} alt={model.fields.name} style={{
              maxWidth: '80%',
              maxHeight: '80%'
            }}/>
            <button 
              onClick={closeLightbox} 
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                background: 'white',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
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

