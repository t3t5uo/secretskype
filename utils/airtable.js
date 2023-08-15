import axios from 'axios';

const AIRTABLE_ENDPOINT = `https://api.airtable.com/v0/appDPUfeGYoo28O5A/models`;
const HEADERS = {
  Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
};

// export const fetchModels = async (offset = null, minPrice = null, maxPrice = null) => {
//   try {
//     let url = AIRTABLE_ENDPOINT;
//     const queryParams = [];
//     if (offset) queryParams.push(`offset=${offset}`);
//     if (minPrice !== null) queryParams.push(`minPrice=${minPrice}`);
//     if (maxPrice !== null) queryParams.push(`maxPrice=${maxPrice}`);
//     if (queryParams.length) url += `?${queryParams.join('&')}`;

//     const response = await axios.get(url, { headers: HEADERS });
//     return {
//       records: response.data.records || [],
//       offset: response.data.offset,
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return { records: [], offset: null };
//   }
// };


export const fetchModelById = async (id) => {
  try {
    const url = `${AIRTABLE_ENDPOINT}/${id}`;
    const response = await axios.get(url, { headers: HEADERS });
    console.log("Response from Airtable:", response.data); // Debugging log
    return response.data;
  } catch (error) {
    console.error("Error fetching model by ID:", error);
    return null;
  }
};
