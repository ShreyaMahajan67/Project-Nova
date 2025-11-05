import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import AddEventModal from '@/components/modals/AddEventModal';
import { tasksApi, analyticsApi, eventsApi } from '@/services/api';
import { Event, TimeAnalytics, Task } from '@/types';
import { useToast } from '@/hooks/use-toast';
import AddTaskModal from '@/components/modals/AddTaskModal';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  const [events, setEvents] = useState<Event[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [timeSpent, setTimeSpent] = useState<TimeAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [eventsData, analyticsData] = await Promise.all([
        eventsApi.getEvents(),
        analyticsApi.getTimeSummary(),
      ]);
      setEvents(eventsData);
      setTimeSpent(analyticsData);
    } catch (error) {
      console.error('Error loading calendar data:', error);
      toast({
        title: "Error",
        description: "Failed to load calendar data",
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

  const navigate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (view === 'week') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (view === 'month') {
      newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading calendar...</p>
      </div>
    );
  }

  const maxTimeSpent = Math.max(...timeSpent.map(t => t.totalMinutes), 1);

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
              variant={view === 'day' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('day')}
              className="text-xs"
            >
              Day
            </Button>
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
          <AddTaskModal 
                      trigger={
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Quick Add
                        </Button>
                      }
                      onAddTask={addTask}
                    />
        </div>
      </div>

      {/* Navigation */}
      <Card className="glass-card p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate('prev')}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <h2 className="text-xl font-semibold">
            {view === 'day' ? currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) :
             view === 'week' ? formatMonth(currentDate) : 
             formatMonth(currentDate)}
          </h2>
          
          <Button variant="ghost" size="sm" onClick={() => navigate('next')}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Day View */}
      {view === 'day' && (
        <Card className="glass-card p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
            <div className="space-y-3">
              {events
                .filter(event => {
                  const eventDate = new Date(event.date);
                  return eventDate.toDateString() === currentDate.toDateString();
                })
                .map(event => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg ${getCategoryClass(event.category)}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm opacity-80">{event.startTime} - {event.endTime}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-black/10 capitalize">
                        {event.category}
                      </span>
                    </div>
                  </div>
                ))}
              {events.filter(event => new Date(event.date).toDateString() === currentDate.toDateString()).length === 0 && (
                <p className="text-muted-foreground text-center py-8">No events scheduled for this day</p>
              )}
            </div>
          </div>
        </Card>
      )}

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
                  {events
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
                        <p className="opacity-80">{event.startTime}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Month View */}
      {view === 'month' && (
        <Card className="glass-card p-6">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {getMonthDays().map((day, index) => {
              const dayEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.toDateString() === day.toDateString();
              });
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              const isToday = day.toDateString() === new Date().toDateString();
              
              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border rounded ${
                    isCurrentMonth ? 'bg-card' : 'bg-muted/50'
                  } ${isToday ? 'ring-2 ring-primary' : ''}`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'
                  } ${isToday ? 'text-primary' : ''}`}>
                    {day.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map(event => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded truncate ${getCategoryClass(event.category)}`}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Time Tracking Summary */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Time Summary
        </h3>
        <div className="space-y-4">
          {timeSpent.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No time data available yet</p>
          ) : (
            timeSpent.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{item.category.replace('-', ' ')}</span>
                  <span>{Math.round(item.totalMinutes / 60)}h {item.totalMinutes % 60}m</span>
                </div>
                <Progress 
                  value={(item.totalMinutes / maxTimeSpent) * 100} 
                  className="h-2" 
                />
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Upcoming Events */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {events
            .filter(event => new Date(event.date) >= new Date())
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5)
            .map(event => (
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
                      })} at {event.startTime}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-black/10 capitalize">
                    {event.category}
                  </span>
                </div>
              </div>
            ))}
          {events.filter(event => new Date(event.date) >= new Date()).length === 0 && (
            <p className="text-muted-foreground text-center py-4">No upcoming events</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Calendar;