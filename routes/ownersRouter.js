const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
const isAdmin = require('../middlewares/isAdmin');
const isLoggedIn = require('../middlewares/isLoggedIn');
const bcrypt = require('bcrypt');

const isLoggedInAndAdmin = [isLoggedIn, isAdmin];

// 🔹 Development-only route for creating first owner
if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    try {
      let owners = await ownerModel.find();
      if (owners.length > 0) {
        return res
          .status(500)
          .send("You don't have the permission to create an owner.");
      }

      let { fullname, email, password } = req.body;

      // 🔑 Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      let createdOwner = await ownerModel.create({
        fullname,
        email,
        password: hashedPassword,
      });

      res.status(201).send(createdOwner);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error creating owner");
    }
  });
}

// 🔹 Admin page route
router.get("/admin", isLoggedInAndAdmin, async (req, res) => {
  let success = req.flash("success");
  res.render("createproducts", { success });
});

module.exports = router;
