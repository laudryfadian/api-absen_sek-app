const { responses } = require("../common_schema");

module.exports = {
  absencek: {
    tags: ["Home"],
    summary: "cek absen",
    description: "mengecek waktu absen / belom",
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          ...responses.success200.properties,
          data: {
            type: "object",
            properties: {
              masuk: { type: "boolean" },
              pulang: { type: "boolean" },
            },
          },
        },
      },
      401: responses.error401,
    }
  },
};
