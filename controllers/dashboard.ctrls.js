const db = require("../models");

const index = (req, res) => {
  db.Dashboard.find({}, (error, dashboards) => {
    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({
      dashboards,
      requestedAt: new Date().toLocaleString(),
    });
  });
};

const seed = (req, res) => {
  db.Dashboard.create(req.body, (err, createdDashboard) => {
    if (err) return res.status(404).json({ error: err.message });
    return res.status(200).json(createdDashboard);
  });
};

module.exports = { index, seed };
