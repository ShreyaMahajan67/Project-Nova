import React, { useState } from 'react';
import { BookOpen, Search, Bookmark, Play, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Library = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Content', color: 'bg-secondary' },
    { id: 'mindfulness', name: 'Mindfulness', color: 'category-mint' },
    { id: 'focus', name: 'Focus', color: 'category-peach' },
    { id: 'emotional', name: 'Emotional Health', color: 'category-lilac' },
  ];

  const mockContent = [
    {
      id: 1,
      title: 'Morning Meditation Guide',
      description: 'Start your day with mindfulness and clarity',
      category: 'mindfulness',
      type: 'audio',
      duration: '10 min',
      difficulty: 'Beginner',
      saved: true
    },
    {
      id: 2,
      title: 'Focus Techniques for Students',
      description: 'Proven methods to improve concentration while studying',
      category: 'focus',
      type: 'article',
      duration: '5 min read',
      difficulty: 'Intermediate',
      saved: false
    },
    {
      id: 3,
      title: 'Managing Study Stress',
      description: 'Healthy ways to cope with academic pressure',
      category: 'emotional',
      type: 'video',
      duration: '15 min',
      difficulty: 'Beginner',
      saved: true
    },
    {
      id: 4,
      title: 'Deep Breathing Exercise',
      description: 'Quick anxiety relief technique for busy students',
      category: 'mindfulness',
      type: 'audio',
      duration: '8 min',
      difficulty: 'Beginner',
      saved: false
    },
    {
      id: 5,
      title: 'Building Emotional Resilience',
      description: 'Strengthen your ability to bounce back from challenges',
      category: 'emotional',
      type: 'article',
      duration: '12 min read',
      difficulty: 'Advanced',
      saved: true
    },
    {
      id: 6,
      title: 'Pomodoro Technique Mastery',
      description: 'Advanced time management for maximum productivity',
      category: 'focus',
      type: 'video',
      duration: '20 min',
      difficulty: 'Intermediate',
      saved: false
    }
  ];

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'mindfulness': return 'category-mint';
      case 'focus': return 'category-peach';
      case 'emotional': return 'category-lilac';
      default: return 'bg-secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'audio': return '🎧';
      case 'article': return '📖';
      default: return '📄';
    }
  };

  const filteredContent = activeCategory === 'all' 
    ? mockContent 
    : mockContent.filter(item => item.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Wellness Library</h1>
          <p className="text-muted-foreground mt-1">Resources for your mental health journey</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search content..." className="pl-10 w-64" />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
            className="animate-smooth"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Featured Content */}
      <Card className="glass-card p-6 bg-gradient-to-br from-accent-mint/20 to-accent-lilac/20">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Featured This Week</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">🌟 Mindful Study Sessions</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Learn how to combine mindfulness with your study routine for better focus and retention.
            </p>
            <Button size="sm">Start Learning</Button>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🎯 Exam Stress Workshop</h3>
            <p className="text-sm text-muted-foreground mb-3">
              A comprehensive guide to managing anxiety during exam periods.
            </p>
            <Button size="sm" variant="outline">Learn More</Button>
          </div>
        </div>
      </Card>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((item) => (
          <Card key={item.id} className="glass-card p-6 group hover:shadow-lg animate-smooth">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2 rounded-lg ${getCategoryClass(item.category)}`}>
                <span className="text-lg">{getTypeIcon(item.type)}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 animate-smooth"
              >
                <Bookmark className={`w-4 h-4 ${item.saved ? 'fill-current' : ''}`} />
              </Button>
            </div>

            <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {item.description}
            </p>

            <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {item.duration}
              </div>
              <span className="px-2 py-1 bg-secondary/50 rounded">
                {item.difficulty}
              </span>
            </div>

            <Button className="w-full">
              <Play className="w-4 h-4 mr-2" />
              {item.type === 'article' ? 'Read' : 'Play'}
            </Button>
          </Card>
        ))}
      </div>

      {/* Saved Content */}
      <Card className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bookmark className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Your Saved Content</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockContent
            .filter(item => item.saved)
            .map(item => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                <span className="text-lg">{getTypeIcon(item.type)}</span>
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.duration}</p>
                </div>
                <Button size="sm" variant="ghost">
                  <Play className="w-3 h-3" />
                </Button>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default Library;