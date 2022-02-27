const baidangRouter = require("./baidang");
const homeRouter = require("./HomeRouter");
function route(app) {
  app.use("/baidang", baidangRouter);
  app.get("/", homeRouter);
}

module.exports = route;
