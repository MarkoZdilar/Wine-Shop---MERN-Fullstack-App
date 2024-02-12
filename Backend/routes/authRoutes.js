import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Korisnik s tim e-mailom već postoji.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).send("Korisnik uspješno registriran.");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

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

      // Lozinka se podudara, stvori i potpiši sa našim secret tokenom
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      res.send("Prijava uspješna.");
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/user-role", authenticateToken, (req, res) => {
  res.json({ role: req.user.role });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true }); //U odgovoru uključi setCookie sa datumom u prošlosti (preglednik ga automatski briše)
  res.send("Odjava uspješna.");
});

export default router;
