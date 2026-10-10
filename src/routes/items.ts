import { Router } from "express";
import Item from "../models/Item.js";
import type { AuthRequest } from "../types/index.js";

const router = Router();

router.get("/", async (req: AuthRequest, res) => {
  const items = await Item.find({ userId: req.userId }).sort({ createdAt: -1 });
  return res.json(items);
});

router.get("/:id", async (req: AuthRequest, res) => {
  const item = await Item.findOne({ _id: req.params.id, userId: req.userId });

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  return res.json(item);
});

router.post("/", async (req: AuthRequest, res) => {
  const { title, description, location, type, isClaimed } = req.body;

  if (!title || !description || !location || !type) {
    return res.status(400).json({ message: "Title, description, location, and type are required" });
  }

  const item = await Item.create({
    title,
    description,
    location,
    type,
    isClaimed: Boolean(isClaimed),
    userId: req.userId,
  });

  return res.status(201).json(item);
});

router.put("/:id", async (req: AuthRequest, res) => {
  const item = await Item.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { ...req.body, userId: req.userId },
    { new: true, runValidators: true },
  );

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  return res.json(item);
});

router.delete("/:id", async (req: AuthRequest, res) => {
  const item = await Item.findOneAndDelete({ _id: req.params.id, userId: req.userId });

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  return res.json({ message: "Item deleted", item });
});

export default router;
