const Boom = require("@hapi/boom");
const JWT = require("jsonwebtoken");
const User = require("../modules/user/user_model");

module.exports = (fastify) => {
  fastify.register(require("@fastify/basic-auth"), {
    validate: async function (username, password, req, reply, done) {
      try {
        if (["/login", "/register"].includes(req.url)) {
          if (username != process.env.BASICUSR ||
              password != process.env.BASICPASS
            ) {
            return reply.failed("Unautorized", 401);

          }
            
          } else {
            const user = await User.findOne({email: username}, "-updatedAt -createdAt -__v").lean();
            if (!user) {
              return reply.failed("Unautorized", 401);
            }

            const token = JWT.verify(password, process.env.JWTSECRET);
            if (!token) {
              return reply.failed("Unautorized", 401);
            }

            req.user = user;

        }
      } catch (e) {
        throw Boom.boomify(e);

      }
    }
  })
}