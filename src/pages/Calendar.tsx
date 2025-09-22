import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'week' | 'month'>('week');

  const mockEvents = [
    { id: 1, title: 'Math Quiz', category: 'study', time: '10:00 AM', date: '2024-01-15' },
    { id: 2, title: 'Yoga Class', category: 'self-care', time: '6:00 PM', date: '2024-01-15' },
    { id: 3, title: 'Guitar Practice', category: 'hobbies', time: '7:30 PM', date: '2024-01-16' },
    { id: 4, title: 'Study Session', category: 'study', time: '2:00 PM', date: '2024-01-17' },
  ];

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'study': return 'category-peach border-l-4 border-orange-400';
      case 'self-care': return 'category-mint border-l-4 border-green-400';
      case 'hobbies': return 'category-lilac border-l-4 border-purple-400';
      default: return 'bg-secondary';
    }
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground mt-1">Plan your balanced schedule</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-secondary rounded-lg p-1">
            <Button
              variant={view === 'week' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('week')}
              className="text-xs"
            >
              Week
            </Button>
            <Button
              variant={view === 'month' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('month')}
              className="text-xs"
            >
              Month
            </Button>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <Card className="glass-card p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigateWeek('prev')}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <h2 className="text-xl font-semibold">
            {view === 'week' ? formatMonth(currentDate) : formatMonth(currentDate)}
          </h2>
          
          <Button variant="ghost" size="sm" onClick={() => navigateWeek('next')}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Week View */}
      {view === 'week' && (
        <Card className="glass-card p-6">
          <div className="grid grid-cols-7 gap-4">
            {getWeekDays().map((day, index) => (
              <div key={index} className="text-center">
                <div className="mb-3">
                  <p className="text-sm text-muted-foreground">
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p className={`text-lg font-semibold ${
                    day.toDateString() === new Date().toDateString() 
                      ? 'text-primary' 
                      : 'text-foreground'
                  }`}>
                    {day.getDate()}
                  </p>
                </div>
                
                <div className="space-y-2">
                  {mockEvents
                    .filter(event => {
                      const eventDate = new Date(event.date);
                      return eventDate.toDateString() === day.toDateString();
                    })
                    .map(event => (
                      <div
                        key={event.id}
                        className={`p-2 rounded text-xs ${getCategoryClass(event.category)}`}
                      >
                        <p className="font-medium truncate">{event.title}</p>
                        <p className="opacity-80">{event.time}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Upcoming Events */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {mockEvents.map(event => (
            <div
              key={event.id}
              className={`p-4 rounded-lg ${getCategoryClass(event.category)}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm opacity-80">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    })} at {event.time}
                  </p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-black/10 capitalize">
                  {event.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Calendar;