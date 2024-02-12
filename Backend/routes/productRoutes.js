import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/add-product", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("producer");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate("producer");

    if (!product) {
      // Ako proizvod s tim ID-jem nije pronađen, vrati
      res.status(404).json({ message: "Proizvod nije pronađen." });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Proizvod nije pronađen." });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      res.status(404).json({ message: "Proizvod nije pronađen." });
    } else {
      res.status(200).json({ message: "Proizvod uspješno obrisan." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
