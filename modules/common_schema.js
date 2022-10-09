exports.responses = {
  success200: {
    properties: {
      status: { type: "boolean", example: true },
      statusCode: { type: "number", example: 200 },
      timestamp: { type: "string", format: "date-time" },
      message: { type: "string", example: "Successfull response." },
    },
  },
  error400: {
    description: "Error due to malformed user input",
    type: "object",
    properties: {
      status: { type: "boolean", example: false },
      statusCode: { type: "number", example: 400 },
      timestamp: { type: "string", format: "date-time" },
      message: { type: "string", example: "You are forbidden to access this." },
      result: { type: "null" },
    },
  },
  error401: {
    description: "Error due to unauthenticated user",
    type: "object",
    properties: {
      status: { type: "boolean", example: false },
      statusCode: { type: "number", example: 401 },
      timestamp: { type: "string", format: "date-time" },
      message: { type: "string", example: "You are forbidden to access this." },
      result: { type: "null" },
    },
  },
};