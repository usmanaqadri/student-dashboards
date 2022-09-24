const db = require("../models");

const seed = (req, res) => {
  db.Dashboard.create(req.body, (err, createdDashboard) => {
    if (err) return res.status(404).json({ error: err.message });
    return res.status(200).json(createdDashboard);
  });
};

module.exports = { seed };
