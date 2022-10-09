const Boom = require("@hapi/boom");
const Setting = require("../settings_model");
const moment = require("moment-timezone");
const { absencek } = require("./home_schema");
moment.tz.setDefault("Asia/Jakarta");
moment.locale("id");

async function routes(fastify, opts) {
  fastify.get(
    "/absencek",
    { schema: absencek, preHandler: fastify.basicAuth },
    async (req, reply) => {
      try {
        const user = req.user;
        const timeNow = Number(moment().format("HHmm"));

        const setting = await Setting.findById("634141b8c361dbccf31b97ce").lean();
        if (!setting) {
          return reply.failed("Setting tidak ditemukan", 400);
        }

        let absen = {
          masuk: false,
          pulang: false,
        };
        
        if (user.isAbsen == false) {
          if (timeNow <= Number(setting.jamDatang)) {
            return reply.success("Belum saatnya absen yaa", absen);

          } else if (timeNow - 1 <= Number(setting.jamDatang) + Number(setting.keterlambatan) -1 ){
            absen.masuk = true;

            return reply.success("Sudah saatnya absen!", absen);

          } else if (timeNow >= Number(setting.jamDatang) + Number(setting.keterlambatan) ){
            absen.masuk = true;

            return reply.success("Kamu telat !!!", absen);

          }
          
        } else {
          if (timeNow >= Number(setting.jamPulang)) {
            absen.pulang = true;

            return reply.success("Saatnya absen pulang!", absen);

          }
          return reply.success("Semangat kerjanya !!", absen);
          
        }
        
      } catch (e) {
        throw Boom.boomify(e);

      }
    }
  );
}

module.exports = routes;
