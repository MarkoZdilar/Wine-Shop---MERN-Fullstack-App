import express from "express";
import User from "../models/User.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "Korisnik nije pronađen." });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/current", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Korisnik nije pronađen." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Korisnik nije pronađen." });
    }
    res.json({ message: "Korisnik obrisan." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/pass/:id", authenticateToken, async (req, res) => {
  const userId = req.params.id;
  const { oldPassword, newPassword } = req.body;

  console.log("USER ID /pass/", userId);
  console.log("USER old Pass", oldPassword);
  console.log("USER new Pass", newPassword);

  const user = await User.findOne({ userId });

  if (!user) {
    return res.status(400).send("Korisnik nije pronađen.");
  }

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    if (!isMatch) {
      return res.status(400).send("Netočna lozinka.");
    }
  });
});
export default router;
