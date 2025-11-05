import React, { useState, useEffect } from 'react';
import { Target, Plus, Trophy, Calendar, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { habitsApi } from '@/services/api';
import { Habit } from '@/types';
import { useToast } from '@/hooks/use-toast';

const Habits = () => {
  const [filter, setFilter] = useState('all');
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadHabits();
  }, [filter]);

  const loadHabits = async () => {
    try {
      setLoading(true);
      const habitsData = await habitsApi.getHabits(filter);
      setHabits(habitsData);
    } catch (error) {
      console.error('Error loading habits:', error);
      toast({
        title: "Error",
        description: "Failed to load habits",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleHabit = async (habitId: string) => {
    try {
      const updatedHabit = await habitsApi.toggleHabit(habitId);
      setHabits(habits.map(h => h.id === habitId ? updatedHabit : h));
      toast({
        title: "Success",
        description: "Habit updated successfully",
      });
    } catch (error) {
      console.error('Error toggling habit:', error);
      toast({
        title: "Error",
        description: "Failed to update habit",
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

  const getDaysOfWeek = () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const totalStreaks = habits.reduce((sum, h) => sum + h.streak, 0);
  const bestStreak = Math.max(...habits.map(h => h.streak), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading habits...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Habits & Streaks</h1>
          <p className="text-muted-foreground mt-1">Build consistency, one day at a time</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter habits" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Habits</SelectItem>
              <SelectItem value="study">Study</SelectItem>
              <SelectItem value="self-care">Self-Care</SelectItem>
              <SelectItem value="hobbies">Hobbies</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={()=>{}}>
            <Plus className="w-4 h-4 mr-2" />
            New Habit
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card p-6 text-center">
          <Trophy className="w-8 h-8 text-primary mx-auto mb-3" />
          <p className="text-2xl font-bold">{totalStreaks}</p>
          <p className="text-sm text-muted-foreground">Total Streaks</p>
        </Card>
        
        <Card className="glass-card p-6 text-center">
          <Target className="w-8 h-8 text-accent-mint mx-auto mb-3" />
          <p className="text-2xl font-bold">{habits.length}</p>
          <p className="text-sm text-muted-foreground">Active Habits</p>
        </Card>
        
        <Card className="glass-card p-6 text-center">
          <Calendar className="w-8 h-8 text-accent-lilac mx-auto mb-3" />
          <p className="text-2xl font-bold">{bestStreak}</p>
          <p className="text-sm text-muted-foreground">Best Streak</p>
        </Card>
      </div>

      {/* Habits List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Habits</h2>
          <span className="text-sm text-muted-foreground">
            {habits.length} habit{habits.length !== 1 ? 's' : ''}
          </span>
        </div>
        {habits.length === 0 ? (
          <Card className="glass-card p-12 text-center">
            <p className="text-muted-foreground">No habits found. Create your first habit to get started!</p>
          </Card>
        ) : (
          habits.map((habit) => (
            <Card key={habit.id} className="glass-card p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Habit Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold">{habit.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{habit.category}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryClass(habit.category)}`}>
                      {habit.category}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center mt-4">
                    <div>
                      <p className="text-xl font-bold text-primary">{habit.streak}</p>
                      <p className="text-xs text-muted-foreground">Current Streak</p>
                    </div>
                    <div>
                      <Button 
                        onClick={() => toggleHabit(habit.id)}
                        variant={habit.completed ? "default" : "outline"}
                        size="sm"
                      >
                        {habit.completed ? 'Completed Today' : 'Mark Complete'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Habits;