// add middlewares here related to projects

const Project = require("./projects-model");

function isValid(req, res, next) {
  const { id } = req.params;
  Project.get(id)
    .then((item) => {
      if (!item) {
        res
          .status(404)
          .json({
            message: "The project with the specified ID does not exist",
          });
      } else {
        req.project = item;
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Server error", error: err.message });
    });
}

function verification(req, res, next) {
  const { name, description, completed } = req.body;

  if (
    name !== undefined &&
    description !== undefined &&
    completed !== undefined
  ) {
    next();
  } else {
    res
      .status(400)
      .json({
        message: "Missing required fields: name, description, and/or completed",
      });
  }
}

module.exports = {
  isValid,
  verification,
};
