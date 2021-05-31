const fetch = require('node-fetch');

exports.handler = async function (event) {
  const body = JSON.parse(event.body);
  const genre = JSON.stringify(body.genre);
  const pageState = JSON.stringify(body.pageState);
  const url = process.env.ASTRA_GRAPHQL_ENDPOINT;
  const token = process.env.ASTRA_DB_TOKEN;
  const query = `
    query getMoviesByGenre {
      movies_by_genre (
        value:  { genre: ${genre} },
        orderBy: [year_DESC],
        options: { pageSize: 6, pageState: ${pageState} }
      ) {
        values {
          title,
          year,
          duration,
          synopsis,
          thumbnail
        }
        pageState
      }
    }
  `

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "x-cassandra-token": token,
    },
    body: JSON.stringify({ query })
  })

  try {
    const responseBody = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(responseBody)
    }
  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}
