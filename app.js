//config
const { app, swagger, cors } = require("./config");
const { port, logger: log, trustProxy } = app;
const logger = require("pino")(log);
const cron = require("node-cron");
const { absenSchedule } = require("./helpers/scheduler");

//init
const fastify = require("fastify")({ logger, trustProxy });

fastify.register(require("@fastify/swagger"), swagger);
fastify.register(require("@fastify/cors"), cors);
require("./core/responses")(fastify);
require("./core/auth")(fastify);
require("./core/logging")(fastify, logger);
require("./core/database")();

// Register routes
fastify.get("/", async () => ({ hello: "Absen Sek World!" }));
fastify.register(require("./modules/user/user_route"));
fastify.register(require("./modules/home/home_route"));
fastify.register(require("./modules/absent/absen_route"));

const start = async () => {
  try {
    //scheduler every 23:59
    cron.schedule('59 23 * * *', async () => {
      try {
        const result = await absenSchedule();
        console.log(result);
      } catch (err) {
        throw Boom.boomify(err);
      }
    },{
      scheduled: true,
      timezone: "Asia/Jakarta"
    });

    await fastify.listen({port: port, host: "0.0.0.0"});
    console.log(`API started at port ${port}`);

  } catch (e) {
    fastify.log.error(e);
    process.exit(1);

  }
};

start();