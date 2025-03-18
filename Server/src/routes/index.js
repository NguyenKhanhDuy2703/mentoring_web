const auth = require("./auth");
const home = require("./systems/home")
function routes (app){
   app.use("/api/auth", auth);
   app.use("/api/home", home);

}
module.exports = routes; 