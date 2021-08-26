const userController = (req, res) =>
  res.json({
    user: "Dio Brando - THE WORLD",
    id: Math.floor(Math.random() * 9999),
  });

module.exports = userController;
