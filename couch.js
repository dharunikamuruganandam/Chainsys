const nano = require("nano")(
  "https://ruler:ruler@192.168.57.254:5984"
);

const db = nano.db.use("dharu_chainsys");

module.exports = db;