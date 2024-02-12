import express from "express";
import Producer from "../models/Producer.js";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const producers = await Producer.find();
    res.json(producers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/add-producer", async (req, res) => {
  try {
    const newProducer = new Producer(req.body);
    await newProducer.save();
    res.status(201).json(newProducer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const producerId = req.params.id;

  // Ima li proizvoda na sebi
  const products = await Product.find({ producer: producerId });
  if (products.length > 0) {
    return res
      .status(400)
      .json({ message: "Postoje proizvodi povezani s ovim proizvođačem." });
  }

  // Ako nema povezanih proizvoda, obriši
  try {
    const deletedProducer = await Producer.findByIdAndDelete(producerId);
    if (!deletedProducer) {
      return res.status(404).json({ message: "Proizvođač nije pronađen." });
    }
    res.status(200).json({ message: "Proizvođač uspješno obrisan." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/by-producer/:producerId", async (req, res) => {
  try {
    const { producerId } = req.params;
    const products = await Product.find({ producer: producerId }).exec();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Greška na serveru." });
  }
});

export default router;
