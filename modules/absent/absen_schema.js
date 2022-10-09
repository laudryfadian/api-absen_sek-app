const { responses } = require("../common_schema");

module.exports = {
  absen: {
    tags: ["Absen"],
    summary: "absensi",
    description: "melakukan absensi",
    body: {
      type: "object",
      properties: {
        id: { type: "string" },
        ket: { type: "string" },
        foto: { type: "string" },
        latlong: { type: "string" },
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
              status: { type: "string" },
            },
          },
        },
      },
      401: responses.error401,
    },
  },
  absenByUser: {
    tags: ["Absen"],
    summary: "list absensi user",
    description: "melihat list absensi user berdasarkan id user",
    params: {
      type: "object",
      properties: { idUser: { type: "string" } },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          ...responses.success200.properties,
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                _id: { type: "string" },
                idUser: { type: "string" },
                ket: { type: "string" },
                jam: { type: "string" },
                tanggal: { type: "string" },
                foto: { type: "string" },
                latlong: { type: "string" },
                approve: { type: "string" },
              },
            },
          },
        },
      },
      401: responses.error401,
    },
  },
  absenToday: {
    tags: ["Absen"],
    summary: "list absensi hari ini",
    description: "melihat list absensi user berdasarkan hari ini",
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          ...responses.success200.properties,
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                _id: { type: "string" },
                idUser: {
                  type: "object",
                  properties: {
                    _id: { type: "string" },
                    nama: { type: "string" },
                  },
                },
                ket: { type: "string" },
                jam: { type: "string" },
                tanggal: { type: "string" },
                foto: { type: "string" },
                latlong: { type: "string" },
                approve: { type: "string" },
              },
            },
          },
        },
      },
      401: responses.error401,
    },
  },
  approve: {
    tags: ["Absen"],
    summary: "approve absensi",
    description: "melakukan approve absensi [pending, approved, not approved]",
    body: {
      type: "object",
      properties: {
        idAbsen: { type: "string" },
        approve: { type: "string" },
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
              statusApprove: { type: "string" },
            },
          },
        },
      },
      401: responses.error401,
    },
  },
  izin: {
    tags: ["Absen"],
    summary: "izin",
    description: "izin tidak masuk hari ini",
    body: {
      type: "object",
      properties: {
        idUser: { type: "string" },
        alasan: { type: "string" },
        latlong: { type: "string" },
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
              _id: { type: "string" },
              idUser: { type: "string" },
              alasan: { type: "string" },
              jam: { type: "string" },
              tanggal: { type: "string" },
              latlong: { type: "string" },
            },
          },
        },
      },
      401: responses.error401,
    },
  }
};
