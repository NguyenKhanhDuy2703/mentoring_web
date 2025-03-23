const auth = require("./auth");
const home = require("./systems/home")
const forum = require("./forumRoute")
function routes (app  ){
   app.use("/api/auth", auth);
   app.use("/api/home", home);
   app.use("/api/forum" ,forum);

}
module.exports = routes; 