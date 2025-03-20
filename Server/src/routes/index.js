const auth = require("./auth");
const home = require("./systems/home")
const forum = require("./forumRoute")
const {authenticateLogin } = require("../services/authentication")
function routes (app){
   app.use("/api/auth", auth);
   app.use("/api/home", home);
   app.use("/api/forum",authenticateLogin ,forum);

}
module.exports = routes; 