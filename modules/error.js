'use strict';

function handleError(request, response) {
  response.status(500).send('Invalid Server Route');
}

module.exports = handleError;
