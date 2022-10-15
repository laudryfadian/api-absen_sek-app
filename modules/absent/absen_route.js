const Boom = require("@hapi/boom");
const { absen, absenByUser, absenToday, approve, izin } = require("./absen_schema");
const Absen = require("./absen_model");
const User = require("../user/user_model");
const Izin = require("./izin_model");

const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Jakarta");
moment.locale("id");

async function routes (fastify, opts) {
  fastify.post(
    "/absen",
    { schema: absen, preHandler: fastify.basicAuth },
    async (req, reply) => {
      try {
        const { id, ket, foto, lat, long } = req.body;

        const cekUser = await User.findById(id).lean();
        if (!cekUser) {
          return reply.failed("User tidak ditemukan", 400);
        }

        const timeNow = moment().format("HH:mm");
        const dateNow = moment().format("dddd, DD MMMM YYYY");

        const result = { status: "Successfull absen" };

        switch (ket) {
          case "masuk":
            if (cekUser.isAbsen == true) {
              return reply.failed("Kamu sudah absen!", 400);
            }

            const cekPulang = await Absen.findOne({
              idUser: id,
              tanggal: dateNow,
              ket: "pulang",
            }).lean();
            if (cekPulang) {
              return reply.failed("Kamu sudah absen hari ini!", 400);
            }

            await User.findOneAndUpdate({ _id: id }, { isAbsen: true });

            await Absen.create({
              idUser: id,
              ket: ket,
              jam: timeNow,
              tanggal: dateNow,
              foto: foto,
              lat: lat,
              long: long,
            });

            return reply.success("Berhasil absen masuk", result);

            break;

          case "pulang":
            if (cekUser.isAbsen == false) {
              return reply.failed("Kamu belum absen!", 400);
            }

            const cekMasuk = await Absen.findOne({
              idUser: id,
              tanggal: dateNow,
              ket: "masuk",
            }).lean();

            await User.findOneAndUpdate({ _id: id }, { isAbsen: false });

            await Absen.create({
              idUser: id,
              ket: ket,
              jam: timeNow,
              tanggal: dateNow,
              foto: foto,
              lat: lat,
              long: long,
            });

            return reply.success("Berhasil absen pulang!", result);

            break;
        
          default:
            return reply.failed("Terjadi kesalahan", 400);

          break;
        }
        
      } catch (e) {
        throw Boom.boomify(e);

      }
    }
  );

  fastify.get(
    "/absen/:idUser",
    { schema: absenByUser, preHandler: fastify.basicAuth },
    async (req, reply) => {
      try {
        const userCek = await User.findById(req.params.idUser).lean();
        if (!userCek) {
          return reply.failed("User tidak ditemukan", 400);
        }

        const list = await Absen.find({idUser: userCek._id}).lean();

        return reply.success("Berhasil menampilkan data", list.reverse());
        
      } catch (e) {
        throw Boom.boomify(e);

      }
    }
  );

  fastify.get(
    "/absen/hariini",
    { schema: absenToday, preHandler: fastify.basicAuth },
    async (req, reply) => {
      try {
        const dateNow = moment().format("dddd, DD MMMM YYYY");

        const result = await Absen.find({tanggal: dateNow}).lean().populate({
          path: "idUser",
          select: "nama"
        });
        if (!result) {
          return reply.success("Belum ada yang absen", null);
        }

        return reply.success("Berhasil menampilkan absensi", result.reverse());
        
      } catch (e) {
        throw Boom.boomify(e);

      }
    }
  );

  fastify.put(
    "/absen/approve",
    { schema: approve, preHandler: fastify.basicAuth },
    async (req, reply) => {
      try {
        const { idAbsen, approve } = req.body;
        const superUser = req.user.superUser;

        if (!superUser) {
          return reply.failed("Kamu bukan super user!", 400);
        }

        await Absen.findByIdAndUpdate({_id: idAbsen}, {approve: approve});

        const result = { statusApprove: approve };

        return reply.success("Berhasil approve absensi", result)
        
      } catch (e) {
        throw Boom.boomify(e);

      }
    }
  );

  fastify.post(
    "/absen/izin",
    { schema: izin, preHandler: fastify.basicAuth },
    async (req, reply) => {
      try {
        const { idUser, alasan, lat, long } = req.body;

        const timeNow = moment().format("HH:mm");
        const dateNow = moment().format("dddd, DD MMMM YYYY");

        const cek = await Izin.findOne({idUser: idUser, tanggal: dateNow}).lean().populate({
          path: "idUser",
          select: "nama",
        });
        if (cek) {
          return reply.failed("Kamu sudah izin hari ini", 400);
        }

        const izin = await Izin.create({
          idUser: idUser,
          alasan: alasan,
          jam: timeNow,
          tanggal: dateNow,
          lat: lat,
          long: long,
        });

        return reply.success("Berhasil izin", izin);
        
      } catch (e) {
        throw Boom.boomify(e);

      }
    }
  );
}

module.exports = routes;