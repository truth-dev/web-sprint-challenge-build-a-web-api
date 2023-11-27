// Write your "projects" router here!
const express = require("express");

const router = express.Router();
const Projects = require("./projects-model");
const { isValid, verification } = require("./projects-middleware");

const message = "Undefined error ";

router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Projects.get(id)
    .then((Projects) => {
      if (Projects) {
        res.status(200).json(Projects);
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message });
    });
});

router.post("/", isValid, verification, (req, res) => {
  const newProject = req.body;
  Projects.insert(newProject)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message });
    });
});

router.put("/:id", isValid, verification, async (req, res) => {
  try {
    const updatedProject = await Projects.update(req.params.id, req.body);
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: err.message, message });
  }
});

router.delete("/:id", isValid, (req, res) => {
  Projects.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `Project ${req.params.id} has been removed` });
      } else {
        res
          .status(404)
          .json({
            message: `Project with id ${req.params.id} couldn't be found or removed`,
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message });
    });
});

router.get("/:id/actions", async (req, res) => {
  try {
    const actions = await Projects.getProjectActions(req.params.id);
    if (!actions || actions.length === 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(actions);
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
