const moment = require("moment-timezone");

module.exports = (fastify) => {
  fastify.decorateReply("failed", function (message, code) {
    this.code(code).send({
      status: false,
      statusCode: code,
      timestamp: moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss"),
      message,
      data: null,
    });
  });
  fastify.decorateReply("success", function (message, data, code = 200) {
    this.code(code).send({
      status: true,
      statusCode: code,
      timestamp: moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss"),
      message,
      data,
    });
  });
};