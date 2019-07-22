const express = require("express");
const router = express.Router();

router.delete("/task/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      res.status(404).send();
    }
    res.status(200).send(task);
    console.log(res.send());
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.patch("/task/:id", async (req, res) => {
  const updates = Object.keys(req.body);

  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid Updates!" });
  }
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.post("/task", async (req, res, next) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.send(e);
  }
  // task
  //   .save()
  //   .then(task => {
  //     res.status(201).send(task);
  //   })
  //   .catch(err => {
  //     res.status(400).send(err);
  //   });
});

router.get("/task", async (req, res, next) => {
  try {
    const task = await Task.find();
    res.send(task);
  } catch (e) {
    res.send(e);
  }

  // Task.find({})
  //   .then(tasks => {
  //     res.send(tasks);
  //   })
  //   .catch(err => {
  //     res.status(400).send(err);
  //   });
});
router.get("/task/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const task = await Task.findById(id);
    res.send(task);
  } catch (e) {
    res.send(e);
  }
  // Task.findById(id)
  //   .then(tasks => {
  //     if (!tasks) {
  //       return res.status(404).send();
  //     }
  //     res.status(200).send(tasks);
  //   })
  //   .catch(err => {
  //     res.status(500).send(err);
  //   });
});
module.exports = router;
