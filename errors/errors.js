exports.fourOhFour = (req, res) => {
  res.status(404).send({ msg: "That's not an endpoint you 'nana!" });
};
