let getHomePage = (req, res) => {
  return res.send("Helloworld");
};
module.exports = {
  getHomePage: getHomePage,
};
