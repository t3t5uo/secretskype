import axios from 'axios';

const AIRTABLE_ENDPOINT = `https://api.airtable.com/v0/appDPUfeGYoo28O5A/models`;
const HEADERS = {
  Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
};

export default async (req, res) => {
  const { offset, minPrice, maxPrice, keyword, slug } = req.query;
  const filter = [];

  if (minPrice) {
    filter.push(`AND({price} >= ${minPrice}, NOT({price} = BLANK()))`);
  }

  if (maxPrice) {
    filter.push(`AND({price} <= ${maxPrice}, NOT({price} = BLANK()))`);
  }

  if (keyword) {
    const keywordFilter = `(
      SEARCH("${keyword}", LOWER({keyword}))
    )`;
    filter.push(`(${keywordFilter})`);
  }

  if (slug) {
    filter.push(`AND({slug} = "${slug}")`);
  }

  const filterString = `AND(${filter.join(',')})`;

  try {
    const response = await axios.get(AIRTABLE_ENDPOINT, {
      headers: HEADERS,
      params: {
        offset: offset,
        filterByFormula: filterString,
      },
    });

    if (response.status === 200) {
      res.json({
        records: response.data.records,
        offset: response.data.offset,
      });
    } else {
      res.status(response.status).json({
        error: "Error fetching data from Airtable",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
