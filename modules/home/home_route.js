const Boom = require("@hapi/boom");
const Setting = require("../settings_model");
const Absen = require("../absent/absen_model");
const { absencek } = require("./home_schema");
const moment = require("moment-timezone");
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

          const dateNow = moment().format("dddd, DD MMMM YYYY");

          const cek = await Absen.find({idUser: user._id, tanggal: dateNow}).lean();

          if (cek.length == 2) {
            return reply.success("Selamat beristirahat", absen);
            
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
