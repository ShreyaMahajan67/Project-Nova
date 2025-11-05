import { Request, Response } from "express";
import { moods } from "../data/mockData";

export const getMoods = (req: Request, res: Response) => {
  res.json(moods);
};

export const createMood = (req: Request, res: Response) => {
  const newMood = {
    ...req.body,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  
  moods.push(newMood);
  res.status(201).json(newMood);
};

export const getLatestMood = (req: Request, res: Response) => {
  if (moods.length === 0) {
    return res.status(404).json({ error: "No moods found" });
  }
  
  const latest = moods[moods.length - 1];
  res.json(latest);
};