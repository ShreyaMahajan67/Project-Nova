import React, { useState } from 'react';
import { Calendar, TrendingUp, Heart, Edit3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';

const Mood = () => {
  const [currentMood, setCurrentMood] = useState(4);
  const [energyLevel, setEnergyLevel] = useState(3);
  const [journalEntry, setJournalEntry] = useState('');

  const moodEmojis = ['😭', '😞', '😐', '🙂', '😊', '😄', '🤩'];
  const moodLabels = ['Terrible', 'Bad', 'Okay', 'Good', 'Great', 'Amazing', 'Fantastic'];

  const mockHabits = [
    { name: 'Morning Meditation', completed: true },
    { name: 'Drink 8 glasses of water', completed: false },
    { name: 'Exercise for 30 minutes', completed: true },
    { name: 'Read for 20 minutes', completed: false },
    { name: 'Practice gratitude', completed: true },
  ];

  const mockMoodHistory = [
    { date: 'Mon', mood: 5 },
    { date: 'Tue', mood: 4 },
    { date: 'Wed', mood: 6 },
    { date: 'Thu', mood: 3 },
    { date: 'Fri', mood: 5 },
    { date: 'Sat', mood: 6 },
    { date: 'Sun', mood: 4 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mood & Wellness</h1>
          <p className="text-muted-foreground mt-1">Track your emotional well-being</p>
        </div>
        <Button variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          View History
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Mood */}
        <Card className="glass-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">How are you feeling?</h2>
          </div>
          
          <div className="text-center mb-6">
            <span className="text-6xl mb-4 block">{moodEmojis[currentMood]}</span>
            <p className="text-lg font-medium">{moodLabels[currentMood]}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Mood Level</label>
              <Slider
                value={[currentMood]}
                onValueChange={(value) => setCurrentMood(value[0])}
                max={6}
                min={0}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Energy Level</label>
              <Slider
                value={[energyLevel]}
                onValueChange={(value) => setEnergyLevel(value[0])}
                max={5}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Drained</span>
                <span>Energized</span>
              </div>
            </div>

            <Button className="w-full">
              Save Today's Mood
            </Button>
          </div>
        </Card>

        {/* Daily Habits */}
        <Card className="glass-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Daily Wellness Habits</h2>
          </div>

          <div className="space-y-3 mb-6">
            {mockHabits.map((habit, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <input 
                  type="checkbox" 
                  checked={habit.completed}
                  className="w-4 h-4 rounded"
                />
                <span className={`font-medium ${habit.completed ? 'line-through opacity-70' : ''}`}>
                  {habit.name}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center p-4 category-mint rounded-lg">
            <p className="text-sm text-accent-foreground/80">Completion Rate</p>
            <p className="text-2xl font-bold text-accent-foreground">60%</p>
          </div>
        </Card>
      </div>

      {/* Mood Trends */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">This Week's Mood</h3>
        <div className="flex items-end justify-between gap-4 h-32 mb-4">
          {mockMoodHistory.map((day, index) => (
            <div key={index} className="flex flex-col items-center gap-2 flex-1">
              <div 
                className="bg-primary rounded-t w-full transition-all duration-300"
                style={{ height: `${(day.mood / 6) * 100}%` }}
              />
              <span className="text-xs text-muted-foreground">{day.date}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Average mood this week: {moodLabels[4]} 😊
        </p>
      </Card>

      {/* Journal Entry */}
      <Card className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Edit3 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Daily Reflection</h3>
        </div>
        <Textarea
          placeholder="How was your day? What are you grateful for? Any thoughts or feelings you'd like to record..."
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          className="mb-4 min-h-24"
        />
        <Button>Save Entry</Button>
      </Card>
    </div>
  );
};

export default Mood;