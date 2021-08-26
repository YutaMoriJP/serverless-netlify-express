exports.handler = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: "connected",
      name: event.queryStringParameters.name,
      id: Math.floor(Math.random() * 999),
    }),
  };
};
