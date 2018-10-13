const express = require("express");
const router = express.Router();

const userController = require("./controller");
const authMiddleware = require("../auth/auth");
const db = require("mongoose");

const ObjectIdCast = db.Types.ObjectId;

// router.get("/:page", (req, res) => {
//   userController
//     .getAllUsers(req.params.page || 1,req.query.limit,req.query.direction, req.query.filter)
//     .then(users => res.send(users))
//     .catch(err => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

router.post("/", (req, res) => {
  userController
    .createUser(req.body)
    .then(id => res.send(id))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

router.get("/:id", (req, res) => {
  userController
    .getOneUser(req.params.id)
    .then(user => res.send(user))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

router.use("/:id/*", authMiddleware.authorize, (req, res, next) => {
  if (req.session.userInfo.id != req.params.id) {
    res.status(401).send("Unauthorized!");
  } else next();
});

router.delete("/:id", (req, res) => {
  if (req.session.id !== req.params.id) {
    return res.status(401).send("Unauthorized!");
    }
  userController
    .deleteUser(req.params.id)
    .then(id => res.send(id))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});
router.put("/:id/data", (req, res) => {
  userController
    .updateUsername(req.params.id, req.body.dataBefore)
    .then(id => res.send(id))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});
router.put("/", async (req, res) => {
  userController
    .update(req.body)
    .then(id => {
      res.send(id);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get("/",(req,res)=>{
  userController
  .getUsers()
  .then(data => res.send(data))
  .catch(err=>{
    console.error(err);
    res.status(500).send(err);
  })
})


module.exports = router;
