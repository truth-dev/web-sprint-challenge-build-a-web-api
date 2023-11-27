// Write your "actions" router here!
const express = require("express");

const router = express.Router();
const Actions = require("./actions-model");
const { valActData, wasValid } = require("./actions-middlware");

router.get("/",  async (req, res) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/:id', valActData, async (req, res) => {
    try {
        const action = await Actions.get(req.params.id);
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: 'Action not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.post("/",  wasValid, async (req, res) => {
    const { notes, description, completed, project_id } = req.body;
    if (
        notes === null ||
        description === null ||
        completed === null ||
        project_id === null
      ) {
        return res.status(400).json({ message: "Missing required field(s)" });
      }
  try {
    const newAct = await Actions.insert({notes, description,completed,project_id});
    res.status(201).json(newAct);
  } catch (err) {
    
    res.status(500).json({ message: "cant find action post" });
  }
});
router.put("/:id", wasValid, async (req, res) => {
  const { notes, description, completed, project_id } = req.body;
  if (
    notes === undefined ||
    description === undefined ||
    completed === undefined ||
    project_id === undefined
  ) {
    return res.status(400).json({ message: "Missing required field(s)" });
  }

  try {
    const action = await Actions.get(req.params.id);
    if (!action) {
      return res.status(404).json({ message: "Action not found" });
    }
    const updatedAction = await Actions.update(req.params.id, req.body);
    res.status(200).json(updatedAction);
  } catch (err) {
    
    res.status(500).json({ message: "Error updating action" });
  }
});
router.delete("/:id", valActData, async (req, res) => {
  try {
    const action = await Actions.get(req.params.id);
    if (!action) {
      return res.status(404).json({ message: "Action not found" });
    }
    await Actions.remove(req.params.id);
    res
      .status(200)
      .json({ message: `Action with ID ${req.params.id} deleted` });
  } catch (err) {
    res.status(500).json({ message: "Error deleting action" });
  }
});

module.exports = router;
