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

const create = (req, res) => {
  db.Dashboard.create(req.body, (err, createdDashboard) => {
    if (err) return res.status(404).json({ error: err.message });
    return res.status(200).json(createdDashboard);
  });
};

const destroy = (req, res) => {
  db.Dashboard.findByIdAndDelete(req.params.id, (error, deletedDashboard) => {
    if (!deletedDashboard)
      return res.status(400).json({ error: "Dashboard not found" });
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({
      message: `Dashboard ${deletedDashboard.name} was successfully deleted`,
    });
  });
};

const update = (req, res) => {
  db.Dashboard.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true },
    (err, updatedDashboard) => {
      if (err) return res.status(400).json({ error: err.message });
      return res.status(200).json(updatedDashboard);
    }
  );
};

module.exports = { index, create, destroy, update };
