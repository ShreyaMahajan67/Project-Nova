export const tasks = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finish the quarterly project proposal",
    category: "work",
    priority: "high",
    completed: false,
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Morning meditation",
    description: "15 minutes of mindfulness",
    category: "self-care",
    priority: "medium",
    completed: true,
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

export const moods = [
  {
    id: "1",
    rating: 8,
    energy: 7,
    note: "Feeling productive today",
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

export const habits = [
  {
    id: "1",
    name: "Morning Reading",
    category: "study",
    streak: 7,
    completed: true,
    lastCompleted: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Exercise",
    category: "self-care",
    streak: 14,
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

export const events = [
  {
    id: "1",
    title: "Team Meeting",
    description: "Weekly sync with the team",
    category: "work",
    date: new Date().toISOString().split("T")[0],
    startTime: "10:00",
    endTime: "11:00",
    createdAt: new Date().toISOString(),
  },
];