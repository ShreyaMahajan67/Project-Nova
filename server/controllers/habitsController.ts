import { Request, Response } from "express";
import { habits } from "../data/mockData";

export const getHabits = (req: Request, res: Response) => {
  const { category } = req.query;
  
  if (category && category !== "all") {
    const filtered = habits.filter(habit => habit.category === category);
    return res.json(filtered);
  }
  
  res.json(habits);
};

export const createHabit = (req: Request, res: Response) => {
  const newHabit = {
    ...req.body,
    id: Date.now().toString(),
    streak: 0,
    createdAt: new Date().toISOString(),
  };
  
  habits.push(newHabit);
  res.status(201).json(newHabit);
};

export const toggleHabit = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = habits.findIndex(habit => habit.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: "Habit not found" });
  }
  
  const habit = habits[index];
  habit.completed = !habit.completed;
  
  if (habit.completed) {
    habit.streak += 1;
    habit.lastCompleted = new Date().toISOString();
  }
  
  res.json(habit);
};

export const deleteHabit = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = habits.findIndex(habit => habit.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: "Habit not found" });
  }
  
  habits.splice(index, 1);
  res.status(204).send();
};