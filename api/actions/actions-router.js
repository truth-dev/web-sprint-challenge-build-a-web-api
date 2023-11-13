// Write your "actions" router here!
const express = require("express");

const router = express.Router();
const Actions = require("./actions-model");

router.get("/api/actions", (req, res) => {
  Actions.get()
    .then((act) => {
      res.status(200).json(act);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "retrieving error!" });
    });
});
router.get("/api/actions/:id", (req, res) => {
  res.status(200).json(req.action);
});
router.post("/api/actions", async (req, res) => {
  try {
    const newAct = await Actions.insert(req.body);
    res.status(200).json(newAct);
  } catch (err) {
    res.status(500).json({ message: "cant find action post" });
  }
});
router.put("/api/actions/:id", async (req, res) => {
  try {
    const update = await Actions.update(req.params.id, req.body);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ err, message: "cant find what your looking for" });
  }
});
router.delete("/api/actions/:id", (req, res) => {
Actions.remove(req.params.id)
.then((cnt) => {
    if(cnt > 0) {
        res.status(200).json({message: `Action ${req.params.id} was deleted. `})
    }else{
        res.status(404).json({message:`Action${req.params.id}could not be found`})
    }
})
});


module.exports = router;
