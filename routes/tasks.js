const express = require("express");
const router = express.Router();
const { tasks } = require("../data");
//GET ALL
router.get("/", (req, res) => {

  if (req.query?.completed !== undefined) {
    const completed = req.query?.completed === 'true';
    const filteredTasks = tasks.filter((t) => t.completed === completed);
    res.json(filteredTasks);
    return;
  }

  res.json(tasks);
});

router.post("/", (req, res) => {
  if (req.body.description) {
    const task = {
      task_id: tasks[tasks.length - 1].task_id + 1,
      description: req.body.description,
      completed: false,
    };
    tasks.push(task);
    res.json(task);
  } else {
    res.json({ error: "Insufficient Data while adding" });
  }
});

router.patch("/:id", (req, res, next) => {
  const task = tasks.find((task, i) => {
    if (task.task_id === +req.params.id) {
      for (const key in req.body) {
        if (key === "task_id") {
          continue;
        }

        if (req.body[key] !== undefined) {
          tasks[i][key] = req.body[key];
        }
      }
      return true;
    }
  });
  if (task) res.json(task);
  else next();
});

router.delete("/:id", (req, res, next) => {
  const task = tasks.find((task, i) => {
    if (task.task_id === +req.params.id) {
      tasks.splice(i, 1);
      return true;
    }
  });
  if (task) res.json(task);
  else next();
});

router.use((req, res) => {
  res.status(404);
  res.json({ error: "Resource not found" });
});

module.exports = router;
