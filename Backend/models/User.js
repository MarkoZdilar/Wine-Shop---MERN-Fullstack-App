import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Administrator", "Korisnik"],
    default: "Korisnik",
  },
});

// Hashiranje lozinke, bcrypt sam odradi (Trenutno samo kod registracije)
// Poziva se PRIJE nego se korisnik spremi u bazu - pre save, trigerra je poziv "save"
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    console.log("Šifrica", this.password);
    return next();
  }

  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

export default mongoose.model("User", userSchema);
