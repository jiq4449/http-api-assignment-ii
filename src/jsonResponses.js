const users = {};

const respond = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getUsers = (request, response) => respond(request, response, 200, users);

const getUsersMeta = (request, response) => respondMeta(request, response, 200);

const addUser = (request, response, body) => {
  // check to make sure we have both fields
  // We might want more validation than just checking if they exist
  // This could easily be abused with invalid types (such as booleans, numbers, etc)
  // If either are missing, send back an error message as a 400 badRequest
  if (!body.name || !body.age) {
    return respond(request, response, 400, { id: 'missingParams', message: 'Name and age are both required.' });
  }

  let responseCode = 204; // Default response code of 204 (No Content)

  if (!users[body.name]) {
    responseCode = 201; // Created
  }

  users[body.name] = { name: body.name, age: body.age };

  if (responseCode === 201) {
    return respond(request, response, responseCode, { message: 'Created Successfully' });
  }

  return respondMeta(request, response, responseCode);
};

const notFound = (request, response) => {
  const object = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respond(request, response, 404, object);
};

const notFoundMeta = (request, response) => {
  respondMeta(request, response, 404);
};

module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  notFound,
  notFoundMeta,
};
