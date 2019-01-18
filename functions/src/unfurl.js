'use strict';

const unfurl = require('unfurl.js');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method not allowed',
    };
  }
  const params = event.queryStringParameters || {};
  const url = params.url;
  if (!url) {
    return {
      statusCode: 401,
      body: 'Invalid URL supplied',
    };
  }
  try {
    const data = await unfurl(url);
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Success', data }),
    };
  } catch (e) {
    console.log('ooooops');
    console.error(e);
    // throw e;
    return { statusCode: 500, body: 'error' };
  }
};
