  import axios from 'axios';

  const AIRTABLE_ENDPOINT = `https://api.airtable.com/v0/appDPUfeGYoo28O5A/models`;
  const HEADERS = {
    Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };

  export default async (req, res) => {
    const { offset, minPrice, maxPrice, keyword, slug, minAge, maxAge, gender, location } = req.query;
    const filter = [];

    if (minPrice) {
      filter.push(`AND({price} >= ${minPrice}, NOT({price} = BLANK()))`);
    }

    if (maxPrice) {
      filter.push(`AND({price} <= ${maxPrice}, NOT({price} = BLANK()))`);
    }

    if (minAge) {
      filter.push(`AND({age} >= ${minAge}, NOT({age} = BLANK()))`);
    }
    
    if (maxAge) {
      filter.push(`AND({age} <= ${maxAge}, NOT({age} = BLANK()))`);
    }

    if (keyword) {
      const keywordFilter = `(
        SEARCH("${keyword.toLowerCase()}", LOWER({keyword}))
      )`;
      filter.push(`(${keywordFilter})`);
    }

    if (gender === 'Male') {
      filter.push(`{sex} = 'Male'`);
    } else if (gender === 'Female') {
      filter.push(`{sex} = 'Female'`);
    } else if (gender === 'Trans') {
      filter.push(`{sex} = 'Transgender/TS'`);
    } else if (gender === 'FemaleTrans') {
      filter.push(`OR({sex} = 'Female', {sex} = 'Transgender/TS')`);      
    } 
    // else {
    //   filter.push("OR({sex} = 'Female', {sex} = 'Transgender/TS')");
    // }

    if (location) {
      filter.push(`AND({secretskype_location} = "${location}")`);
    }

    if (slug) {
      filter.push(`AND({slug} = "${slug}")`);
    }

    const filterString = `AND(${filter.join(',')})`;
    console.log(filterString);

    try {
      const response = await axios.get(AIRTABLE_ENDPOINT, {
        headers: HEADERS,
        params: {
          offset: offset,
          filterByFormula: filterString,
          view: `viwFlMnrZzZVweyqe`,
          pageSize: 50,
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
