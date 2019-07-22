const express = require("express");

const router = express.Router();

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);

  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid Updates!" });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).send("kareem");
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users", async (req, res, next) => {
  const user = new User(req.body);
  // user
  //   .save()
  //   .then(user => {
  //     res.status(201).send(user);
  //   })
  //   .catch(err => {
  //     res.status(400).send(err);
  //   });
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch {
    res.status(500).send();
  }

  // User.find({})
  //   .then(users => {
  //     res.send(users);
  //   })
  //   .catch(err => {
  //     res.status(400).send(err);
  //   });
});
router.get("/users/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send();
    } else {
      res.send(user);
    }
  } catch (e) {
    res.status(400).send(e);
  }

  // User.findById(id)
  //   .then(users => {
  //     if (!users) {
  //       return res.status(404).send();
  //     }
  //     res.send(users);
  //   })
  //   .catch(err => {
  //     res.status(500).send(err);
  //   });
});

router.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).send();
    }
    res.status(200).send(user);
    console.log(res.send());
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});
module.exports = router;
