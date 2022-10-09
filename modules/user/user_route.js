const Boom = require("@hapi/boom");
const { jwtsign, createHash } = require("../../helpers/crypto");
const User = require("./user_model");
const { user, login, getUserById } = require("./user_schema");

async function routes(fastify, opts) {
  fastify.post(
    "/register",
    { schema: user, preHandler: fastify.basicAuth },
    async (req, reply) => {
      try {
        const { email, nohp, password, nama, posisi, gaji } = req.body;

        const emailCheck = await User.findOne({email}).lean();
        if (emailCheck) {
          return reply.failed("Email sudah terdaftar", 400);
        };

        const nohpCheck = await User.findOne({nohp}).lean();
        if (nohpCheck) {
          return reply.failed("Nomor hp sudah terdaftar", 400);
        };

        const encrypt = createHash(password);

        await User.create({
          nama: nama,
          email: email,
          password: encrypt,
          nohp: nohp,
          posisi: posisi,
          gaji: gaji
        });

        return reply.success("Berhasil melakukan registrasi", {email: email});

      } catch (e) {
        throw Boom.boomify(e);

      }
    }
  );

  fastify.post(
    "/login",
    { schema: login, preHandler: fastify.basicAuth },
    async (req, reply) => {
      try {
        const { email, password } = req.body;

        const login = await User.findOne({email: email, password: createHash(password)}).lean();

        if (!login) {
          return reply.failed("Email atau password salah", 401);
        }

        const token = jwtsign(email);

        return reply.success("Berhasil login", {token: token});

      } catch (e) {
        throw Boom.boomify(e);

      }
    }
  );

  fastify.get(
    "/user/:idUser",
    { schema: getUserById, preHandler: fastify.basicAuth },
    async (req, reply) => {
      try {
        const user = await User.findById(req.params.idUser).lean();
        if (!user) {
          return reply.failed("User tidak ditemukan", 400);
        }

        return reply.success("Berhasil menampilkan user", user);

      } catch (e) {
        throw Boom.boomify(e);

      }
    }
  );
}

module.exports = routes;