import React from 'react';
import { User, Bell, Palette, Shield, HelpCircle, LogOut } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  const settingsGroups = [
    {
      title: 'Account',
      icon: User,
      items: [
        { label: 'Edit Profile', description: 'Update your personal information' },
        { label: 'Study Goals', description: 'Set your academic targets' },
        { label: 'Privacy Settings', description: 'Control your data and visibility' },
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Task Reminders', description: 'Get notified about upcoming tasks', toggle: true },
        { label: 'Mood Check-ins', description: 'Daily wellness reminders', toggle: true },
        { label: 'Habit Streaks', description: 'Celebrate your achievements', toggle: true },
        { label: 'Email Updates', description: 'Weekly progress summaries', toggle: false },
      ]
    },
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        { 
          label: 'Dark Mode', 
          description: 'Switch between light and dark themes',
          toggle: true,
          value: theme === 'dark',
          onToggle: toggleTheme
        },
        { label: 'Color Preferences', description: 'Customize your theme colors' },
        { label: 'Font Size', description: 'Adjust text size for better readability' },
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        { label: 'Data Export', description: 'Download your personal data' },
        { label: 'Account Deletion', description: 'Permanently delete your account' },
        { label: 'Privacy Policy', description: 'Review our privacy practices' },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your preferences and account</p>
      </div>

      {/* Profile Summary */}
      <Card className="glass-card p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent-lilac rounded-full flex items-center justify-center">
            <span className="text-2xl text-white">A</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Alex Johnson</h2>
            <p className="text-muted-foreground">alex.johnson@student.edu</p>
            <p className="text-sm text-muted-foreground mt-1">
              Member since January 2024 • 45 days streak
            </p>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </div>
      </Card>

      {/* Settings Groups */}
      <div className="space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <Card key={groupIndex} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <group.icon className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">{group.title}</h3>
            </div>
            
            <div className="space-y-4">
              {group.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between py-3 border-b border-border/50 last:border-b-0">
                  <div className="flex-1">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  
                  {item.toggle ? (
                    <Switch 
                      checked={item.value ?? true}
                      onCheckedChange={item.onToggle}
                    />
                  ) : (
                    <Button variant="ghost" size="sm">
                      Configure
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Support & Help */}
      <Card className="glass-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Support & Help</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="text-left">
              <p className="font-medium">Help Center</p>
              <p className="text-sm text-muted-foreground">Find answers to common questions</p>
            </div>
          </Button>
          
          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="text-left">
              <p className="font-medium">Contact Support</p>
              <p className="text-sm text-muted-foreground">Get help from our team</p>
            </div>
          </Button>
          
          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="text-left">
              <p className="font-medium">Send Feedback</p>
              <p className="text-sm text-muted-foreground">Help us improve the app</p>
            </div>
          </Button>
          
          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="text-left">
              <p className="font-medium">Terms of Service</p>
              <p className="text-sm text-muted-foreground">Review our terms and conditions</p>
            </div>
          </Button>
        </div>
      </Card>

      {/* Sign Out */}
      <Card className="glass-card p-6">
        <Button variant="destructive" className="w-full">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </Card>
    </div>
  );
};

export default Settings;