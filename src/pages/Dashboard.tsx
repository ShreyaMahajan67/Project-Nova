import React, { useState, useEffect } from 'react';
import { Plus, Calendar, TrendingUp, Heart, Target, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import AddTaskModal from '@/components/modals/AddTaskModal';
import AddMoodModal from '@/components/modals/AddMoodModal';
import { tasksApi, habitsApi, moodsApi } from '@/services/api';
import { Task, Habit, Mood } from '@/types';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [latestMood, setLatestMood] = useState<Mood | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [tasksData, habitsData, moodData] = await Promise.all([
        tasksApi.getTasks(),
        habitsApi.getHabits(),
        moodsApi.getLatestMood(),
      ]);
      setTasks(tasksData);
      setHabits(habitsData);
      setLatestMood(moodData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const createdTask = await tasksApi.createTask(newTask);
      setTasks([...tasks, createdTask]);
      toast({
        title: "Success",
        description: "Task added successfully",
      });
    } catch (error) {
      console.error('Error adding task:', error);
      toast({
        title: "Error",
        description: "Failed to add task",
        variant: "destructive",
      });
    }
  };

  const toggleTask = async (taskId: string) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      const updatedTask = await tasksApi.updateTask(taskId, {
        completed: !task.completed
      });

      setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    }
  };

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'study': return 'category-peach';
      case 'self-care': return 'category-mint';
      case 'hobbies': return 'category-lilac';
      default: return 'bg-secondary';
    }
  };

  const getMoodEmoji = (mood?: number) => {
    if (!mood) return '😊';
    const emojis = ['😢', '😟', '😐', '🙂', '😊', '😄', '🤗', '😁', '🥰', '🌟'];
    return emojis[mood - 1] || '😊';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Good morning, Alex! 🌸</h1>
          <p className="text-muted-foreground mt-1">Let's make today amazing</p>
        </div>
        <div className="flex items-center gap-2">
          <AddMoodModal onAddMood={loadData} />
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
            {tasks.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No tasks yet. Add one to get started!</p>
            ) : (
              tasks.map((task) => (
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
              ))
            )}
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
              <span className="text-3xl mb-2 block">{getMoodEmoji(latestMood?.mood)}</span>
              <p className="text-sm text-muted-foreground">
                {latestMood ? 'Feeling Good' : 'Not logged yet'}
              </p>
            </div>
          </Card>

          {/* Habits Progress */}
          <Card className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-primary" />
              <h3 className="font-semibold">Habit Streaks</h3>
            </div>
            <div className="space-y-3">
              {habits.slice(0, 3).map((habit) => (
                <div key={habit.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{habit.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {habit.streak} days
                    </span>
                  </div>
                  <Progress 
                    value={Math.min((habit.streak / 30) * 100, 100)} 
                    className="h-2" 
                  />
                </div>
              ))}
              {habits.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-2">No habits tracked yet</p>
              )}
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
                <p className="text-2xl font-bold text-primary">
                  {tasks.filter(t => t.completed).length}
                </p>
                <p className="text-xs text-muted-foreground">Tasks Complete</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent-mint">
                  {habits.reduce((sum, h) => sum + h.streak, 0)}
                </p>
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