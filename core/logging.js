const _omit = require("lodash/omit");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Jakarta");
moment.locale("id");

module.exports = (fastify, log) => {
  fastify.addHook("onResponse", (req, reply, done) => {
    const logging = {
      user: req.user ? req.user.nama : "no auth",
      mtd: req.raw.method,
      url: req.raw.url,
      resCode: reply.statusCode,
      "user-agent": req.headers["user-agent"],
      auth: req.headers["authorization"],
      ip: req.ip,
      hostname: req.hostname,
      complete: req.raw.complete,
      aborted: req.raw.aborted,
      params: req.params,
      query: req.query,
      body: _omit(req.body, "password"),
      rt: reply.getResponseTime(),
      time: moment().format("dddd, DD MMMM YYYY HH:mm:ss"),
    };
    
    req.log.lv(logging);
    done();
  });
}