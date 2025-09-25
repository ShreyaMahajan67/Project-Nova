import React, { useState } from 'react';
import { Plus, Calendar, TrendingUp, Heart, Target, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import AddTaskModal from '@/components/modals/AddTaskModal';
import AddMoodModal from '@/components/modals/AddMoodModal';

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete math homework', category: 'study', completed: false, priority: 'high' },
    { id: 2, title: 'Morning meditation', category: 'self-care', completed: true, priority: 'medium' },
    { id: 3, title: 'Guitar practice session', category: 'hobbies', completed: false, priority: 'low' },
    { id: 4, title: 'Read for 30 minutes', category: 'study', completed: false, priority: 'medium' },
  ]);

  const addTask = (newTask: any) => {
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const mockHabits = [
    { name: 'Daily Exercise', streak: 7, target: 7 },
    { name: 'Read 30 minutes', streak: 5, target: 7 },
    { name: 'Meditation', streak: 12, target: 14 },
  ];

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'study': return 'category-peach';
      case 'self-care': return 'category-mint';
      case 'hobbies': return 'category-lilac';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Good morning, Alex! 🌸</h1>
          <p className="text-muted-foreground mt-1">Let's make today amazing</p>
        </div>
        <div className="flex items-center gap-2">
          <AddTaskModal 
            trigger={
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Quick Add
              </Button>
            }
            onAddTask={addTask}
          />
          <AddMoodModal />
        </div>
      </div>

      {/* Daily Quote */}
      <Card className="glass-card p-6 bg-gradient-to-br from-accent-lilac/20 to-accent-peach/20">
        <div className="text-center">
          <p className="text-lg italic text-foreground/90 mb-2">
            "Progress, not perfection, is the goal."
          </p>
          <p className="text-sm text-muted-foreground">— Daily Inspiration</p>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <Card className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Today's Tasks</h2>
          </div>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className={`p-4 rounded-lg ${getCategoryClass(task.category)} ${
                  task.completed ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                    />
                    <div className={`w-2 h-2 rounded-full ${
                      task.priority === 'high' ? 'bg-red-400' :
                      task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`} />
                    <div>
                      <h4 className={`font-medium ${task.completed ? 'line-through' : ''}`}>
                        {task.title}
                      </h4>
                      <p className="text-sm opacity-80 capitalize">{task.category}</p>
                    </div>
                  </div>
                  <CheckCircle className={`w-5 h-5 ${
                    task.completed ? 'text-green-400' : 'text-muted-foreground'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-4">
          {/* Mood */}
          <Card className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4 text-primary" />
              <h3 className="font-semibold">Today's Mood</h3>
            </div>
            <div className="text-center">
              <span className="text-3xl mb-2 block">😊</span>
              <p className="text-sm text-muted-foreground">Feeling Good</p>
            </div>
          </Card>

          {/* Habits Progress */}
          <Card className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-primary" />
              <h3 className="font-semibold">Habit Streaks</h3>
            </div>
            <div className="space-y-3">
              {mockHabits.map((habit, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{habit.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {habit.streak}/{habit.target}
                    </span>
                  </div>
                  <Progress 
                    value={(habit.streak / habit.target) * 100} 
                    className="h-2" 
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Weekly Overview */}
          <Card className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h3 className="font-semibold">This Week</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">85%</p>
                <p className="text-xs text-muted-foreground">Tasks Complete</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent-mint">12</p>
                <p className="text-xs text-muted-foreground">Habit Streaks</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Floating Action Button */}
      <AddTaskModal 
        trigger={
          <button className="floating-button">
            <Plus className="w-6 h-6" />
          </button>
        }
        onAddTask={addTask}
      />
    </div>
  );
};

export default Dashboard;