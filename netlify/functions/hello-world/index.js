// Hello World API

exports.handler = async (event, context) => {

  console.log({event}, {context});

  const {body, httpMethod, queryStringParameters} = event;

  let name = "World";

  // if method GET
  if (httpMethod === "GET") {
    name = (queryStringParameters || {}).name || "World";
  }
  if (httpMethod === "POST") {
    name = (JSON.parse(body) || {}).name || "World";
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello ${name}!`,
    }),
  };

};
