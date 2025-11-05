import { Request, Response } from "express";
import { events } from "../data/mockData";

export const getEvents = (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;
  
  if (startDate && endDate) {
    const filtered = events.filter(
      event => event.date >= startDate && event.date <= endDate
    );
    return res.json(filtered);
  }
  
  res.json(events);
};

export const createEvent = (req: Request, res: Response) => {
  const newEvent = {
    ...req.body,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  
  events.push(newEvent);
  res.status(201).json(newEvent);
};

export const deleteEvent = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = events.findIndex(event => event.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: "Event not found" });
  }
  
  events.splice(index, 1);
  res.status(204).send();
};