import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Heart, 
  Target, 
  BookOpen,
  User,
  Settings,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: Heart, label: 'Mood', path: '/mood' },
    { icon: Target, label: 'Habits', path: '/habits' },
    { icon: BookOpen, label: 'Library', path: '/library' },
  ];

  return (
    <aside className="hidden lg:block w-64 min-h-screen glass-card border-r">
      <div className="p-6">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent-lilac bg-clip-text text-transparent">
            Project Nova
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Balance & Growth</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg animate-smooth ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-foreground hover:bg-secondary/50'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="space-y-2 border-t border-border/50 pt-6">
          <NavLink
            to="/profile"
            className="flex items-center gap-3 px-3 py-2 rounded-lg animate-smooth text-foreground hover:bg-secondary/50"
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Profile</span>
          </NavLink>
          <NavLink
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg animate-smooth text-foreground hover:bg-secondary/50"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </NavLink>
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-full justify-start gap-3 px-3 py-2 h-auto font-medium"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;