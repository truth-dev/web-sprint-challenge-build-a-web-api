// add middlewares here related to actions

const Actions = require("./actions-model");

async function valActData(req, res, next) {
  try {
    const action = await Actions.get(req.params.id);
    if (!action) {
      res.status(404).json({
        message: "Action not found with the provided ID",
      });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function wasValid(req, res, next) {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || notes === undefined) {
    res.status(400).json({
      message: "Missing required fields: project_id, description, and/or notes",
    });
  } else {
    next();
  }
}

module.exports = {
  valActData,
  wasValid,
};
