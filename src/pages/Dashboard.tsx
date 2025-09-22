import React from 'react';
import { Plus, Calendar, TrendingUp, Heart, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const mockTasks = [
    { id: 1, title: 'Complete Math Assignment', category: 'study', time: '2:00 PM', completed: false },
    { id: 2, title: 'Meditation Session', category: 'self-care', time: '6:00 PM', completed: true },
    { id: 3, title: 'Guitar Practice', category: 'hobbies', time: '7:30 PM', completed: false },
  ];

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
        <Button className="self-start sm:self-auto">
          <Plus className="w-4 h-4 mr-2" />
          Quick Add
        </Button>
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
            {mockTasks.map((task) => (
              <div 
                key={task.id} 
                className={`p-3 rounded-lg flex items-center justify-between ${getCategoryClass(task.category)}`}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    className="w-4 h-4 rounded"
                  />
                  <div>
                    <p className={`font-medium ${task.completed ? 'line-through opacity-70' : ''}`}>
                      {task.title}
                    </p>
                    <p className="text-sm opacity-80">{task.time}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full bg-black/10 ${
                  task.category === 'study' ? 'text-orange-800' :
                  task.category === 'self-care' ? 'text-green-800' :
                  'text-purple-800'
                }`}>
                  {task.category}
                </span>
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
      <Button className="floating-button">
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default Dashboard;