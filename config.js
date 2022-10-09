require("dotenv").config();
const version = require("./package.json").version;

module.exports = {
  app: {
    port: process.env.PORT || 4000,
    logger: {
      level: "warn",
      base: null,
      customLevels: {
        lv: 45
      },
    },
    trustProxy: "127.0.0.1"
  },
  cors: {
    origin: true,
    methods: ["OPTIONS", "GET", "PUT", "PATCH", "POST", "DELETE"],
    maxAge: 90,
  },
  db: {
    connectionUri: process.env.DB_URI,
    options: {
      useUnifiedTopology: true,
    },
  },
  swagger: {
    routePrefix: "/docs",
    exposeRoute: true,
    swagger: {
      info: {
        title: "ABSEN SEK APP-API",
        description:
          "Daftar semua endpoint API aplikasi mobile Absen Sek",
        version,
      },
      host: `localhost:${process.env.PORT}`,
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      securityDefinitions: {
        basicAuth: {
          description:
            "Menggunakan basic auth",
          type: "basic",
        },
      },
      security: [{ basicAuth: [] }],
    },
  },
  secret: {
    hash: process.env.SHASH,
  },
}