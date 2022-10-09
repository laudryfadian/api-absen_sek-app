const { responses } = require("../common_schema");

module.exports = {
  user: {
    tags: ["User"],
    summary: "registrasi user baru",
    description: "registrasi user baru yang belum pernah daftar di aplikasi",
    body: {
      type: "object",
      properties: {
        nama: { type: "string" },
        email: { type: "string" },
        nohp: { type: "string" },
        password: { type: "string" },
        posisi: { type: "string" },
        gaji: { type: "number" },
      },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          ...responses.success200.properties,
          data: {
            type: "object",
            properties: {
              email: { type: "string" },
            },
          },
        },
      },
      401: responses.error401,
    },
  },
  login: {
    tags: ["User"],
    summary: "login user",
    description: "login user pada aplikasi absen sek",
    body: {
      type: "object",
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          ...responses.success200.properties,
          data: {
            type: "object",
            properties: {
              token: { type: "string" },
            },
          },
        },
      },
      401: responses.error401,
    },
  },
  getUserById: {
    tags: ["User"],
    summary: "ambil data 1 user",
    description: "mengambil data user dengan idUser",
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          ...responses.success200.properties,
          data: {
            type: "object",
            properties: {
              _id: { type: "string" },
              nama: { type: "string" },
              email: { type: "string" },
              nohp: { type: "string" },
              password: { type: "string" },
              posisi: { type: "string" },
              gaji: { type: "number" },
            },
          },
        },
      },
      401: responses.error401,
    },
  },
};
