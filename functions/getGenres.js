const fetch = require('node-fetch');

exports.handler = async function (event) {
  const limit = JSON.parse(event.body);
  const url = process.env.ASTRA_GRAPHQL_ENDPOINT;
  const token = process.env.ASTRA_DB_TOKEN;
  const query = `
    query getAllGenres {
      reference_list (
        value: { label: "genre" },
        options: { limit: ${JSON.stringify(limit)} }
      ) {
        values {
          value
        }
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
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}