const thinky = require("thinky");

const db = thinky({
  db: "firstAuthApi"
});

let User = require("./user")(db);

module.exports = {
  User: User
};
