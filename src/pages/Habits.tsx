import React, { useState } from 'react';
import { Target, Plus, Trophy, Calendar, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Habits = () => {
  const [filter, setFilter] = useState('all');
  const mockHabits = [
    {
      id: 1,
      name: 'Morning Exercise',
      description: '30 minutes of physical activity',
      streak: 12,
      bestStreak: 18,
      completionRate: 85,
      category: 'self-care',
      weekProgress: [true, true, false, true, true, true, false]
    },
    {
      id: 2,
      name: 'Reading',
      description: 'Read for 20 minutes daily',
      streak: 5,
      bestStreak: 14,
      completionRate: 70,
      category: 'hobbies',
      weekProgress: [true, false, true, true, true, false, true]
    },
    {
      id: 3,
      name: 'Study Session',
      description: 'Focused study time',
      streak: 8,
      bestStreak: 22,
      completionRate: 92,
      category: 'study',
      weekProgress: [true, true, true, true, false, true, true]
    },
    {
      id: 4,
      name: 'Meditation',
      description: '10 minutes mindfulness',
      streak: 15,
      bestStreak: 28,
      completionRate: 88,
      category: 'self-care',
      weekProgress: [true, true, true, false, true, true, true]
    }
  ];

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'study': return 'category-peach';
      case 'self-care': return 'category-mint';
      case 'hobbies': return 'category-lilac';
      default: return 'bg-secondary';
    }
  };

  const getDaysOfWeek = () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const filteredHabits = filter === 'all' 
    ? mockHabits 
    : mockHabits.filter(habit => habit.category.toLowerCase() === filter.toLowerCase());

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
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Habit
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card p-6 text-center">
          <Trophy className="w-8 h-8 text-primary mx-auto mb-3" />
          <p className="text-2xl font-bold">40</p>
          <p className="text-sm text-muted-foreground">Total Streaks</p>
        </Card>
        
        <Card className="glass-card p-6 text-center">
          <Target className="w-8 h-8 text-accent-mint mx-auto mb-3" />
          <p className="text-2xl font-bold">84%</p>
          <p className="text-sm text-muted-foreground">Overall Rate</p>
        </Card>
        
        <Card className="glass-card p-6 text-center">
          <Calendar className="w-8 h-8 text-accent-lilac mx-auto mb-3" />
          <p className="text-2xl font-bold">28</p>
          <p className="text-sm text-muted-foreground">Best Streak</p>
        </Card>
      </div>

      {/* Habits List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Habits</h2>
          <span className="text-sm text-muted-foreground">
            {filteredHabits.length} of {mockHabits.length} habits
          </span>
        </div>
        {filteredHabits.map((habit) => (
          <Card key={habit.id} className="glass-card p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              {/* Habit Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{habit.name}</h3>
                    <p className="text-sm text-muted-foreground">{habit.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryClass(habit.category)}`}>
                    {habit.category}
                  </span>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Completion Rate</span>
                    <span className="text-sm text-muted-foreground">{habit.completionRate}%</span>
                  </div>
                  <Progress value={habit.completionRate} className="h-2" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-xl font-bold text-primary">{habit.streak}</p>
                    <p className="text-xs text-muted-foreground">Current Streak</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-accent-lilac">{habit.bestStreak}</p>
                    <p className="text-xs text-muted-foreground">Best Streak</p>
                  </div>
                </div>
              </div>

              {/* Week Progress */}
              <div className="lg:w-64">
                <h4 className="text-sm font-medium mb-3 text-center">This Week</h4>
                <div className="flex gap-2 justify-center">
                  {habit.weekProgress.map((completed, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mb-1 ${
                        completed 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {completed ? '✓' : '○'}
                      </div>
                      <p className="text-xs text-muted-foreground">{getDaysOfWeek()[index]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Weekly Summary */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Weekly Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="category-mint p-4 rounded-lg">
            <p className="text-2xl font-bold text-accent-foreground">23</p>
            <p className="text-sm text-accent-foreground/80">Habits Completed</p>
          </div>
          <div className="category-lilac p-4 rounded-lg">
            <p className="text-2xl font-bold text-accent-foreground">6</p>
            <p className="text-sm text-accent-foreground/80">Perfect Days</p>
          </div>
          <div className="category-peach p-4 rounded-lg">
            <p className="text-2xl font-bold text-accent-foreground">82%</p>
            <p className="text-sm text-accent-foreground/80">Success Rate</p>
          </div>
          <div className="bg-secondary p-4 rounded-lg">
            <p className="text-2xl font-bold text-foreground">+3</p>
            <p className="text-sm text-muted-foreground">Streak Increase</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Habits;