const aboutController = (req, res) =>
  res.json({ about: "ABOUT", id: Math.floor(Math.random() * 9999) });

module.exports = aboutController;
