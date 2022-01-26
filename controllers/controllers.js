exports.getWelcome = (req, res) => {
  console.log("in controller");
  res.status(200).send({ msg: "Welcome" });
};
