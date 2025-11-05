import { Request, Response } from "express";
import { tasks } from "../data/mockData";

export const getTasks = (req: Request, res: Response) => {
  const { category } = req.query;
  
  if (category && category !== "all") {
    const filtered = tasks.filter(task => task.category === category);
    return res.json(filtered);
  }
  
  res.json(tasks);
};

export const createTask = (req: Request, res: Response) => {
  const newTask = {
    ...req.body,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const updateTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = tasks.findIndex(task => task.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  
  tasks[index] = { ...tasks[index], ...req.body };
  res.json(tasks[index]);
};

export const deleteTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = tasks.findIndex(task => task.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  
  tasks.splice(index, 1);
  res.status(204).send();
};