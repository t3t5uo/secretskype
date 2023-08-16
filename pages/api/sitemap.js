import axios from 'axios';

console.log(`hi inside`);

const AIRTABLE_ENDPOINT = 'https://api.airtable.com/v0/appDPUfeGYoo28O5A/Models';
const HEADERS = {
  Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
};

const siteIDs = [
    'livejasmin_id',
    'streamate_id',
    'camsoda_id',
    'chaturbate_id',
    'myfreecams_id',
    'xcams_id',
    'camsdotcom_id',
    'bongacams_id',
    'stripchat_id', 
    'flirt4free_id'
];

async function fetchRecordsForSite(siteID) {
  console.log(`hi inside function`);

  try {
    const response = await axios.get(AIRTABLE_ENDPOINT, {
      headers: HEADERS,
      params: {
        filterByFormula: `NOT({${siteID}} = BLANK())`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Error fetching data from Airtable");
    }

    return response.data.records.map(record => record.fields[siteID]);

  } catch (error) {
    console.error(error);
    return [];
  }
}

async function fetchModelSlugs() {
    let allRecords = [];
    let offset = null;
  
    try {
      do {
        const params = {
          fields: ['slug'],
          pageSize: 100
        };
        
        if (offset) {
          params.offset = offset;
        }
  
        const response = await axios.get(AIRTABLE_ENDPOINT, {
          headers: HEADERS,
          params: params
        });
  
        if (response.status !== 200) {
          throw new Error("Error fetching data from Airtable");
        }
  
        const records = response.data.records.map(record => record.fields.slug);
        allRecords = [...allRecords, ...records];
        
        offset = response.data.offset;
  
      } while (offset);
  
      return allRecords;
  
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  

export default async (req, res) => {
  try {
    const urls = [];
    const protocolAndHost = req.headers.host.includes('localhost') ? 'http://localhost:3000' : 'https://secretskype.com';

    for (const siteID of siteIDs) {
      const idsForSite = await fetchRecordsForSite(siteID);
      const site = siteID.split('_')[0];
      for (const id of idsForSite) {
        urls.push(`${protocolAndHost}/${site}/${id}`);
      }
    }
    
    const modelSlugs = await fetchModelSlugs();
    for (const slug of modelSlugs) {
      urls.push(`${protocolAndHost}/model/${slug}`);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls.map(url => `
          <url>
            <loc>${url}</loc>
          </url>
        `).join('')}
      </urlset> 
    `;

    res.setHeader('Content-Type', 'text/xml');
    res.write(xml);
    res.end();

  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
