import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Smile } from 'lucide-react';

interface AddMoodModalProps {
  trigger?: React.ReactNode;
  onAddMood?: (mood: any) => void;
}

const AddMoodModal = ({ trigger, onAddMood }: AddMoodModalProps) => {
  const [open, setOpen] = useState(false);
  const [mood, setMood] = useState([7]);
  const [energy, setEnergy] = useState([7]);
  const [notes, setNotes] = useState('');

  const moodEmojis = ['😢', '😟', '😐', '🙂', '😊', '😄', '🤗', '😁', '🥰', '🌟'];
  const energyLabels = ['Exhausted', 'Very Low', 'Low', 'Below Average', 'Average', 'Above Average', 'Good', 'High', 'Very High', 'Energized'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMood = {
      id: Math.random().toString(36).substr(2, 9),
      mood: mood[0],
      energy: energy[0],
      notes,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    onAddMood?.(newMood);
    setOpen(false);
    // Reset form
    setMood([7]);
    setEnergy([7]);
    setNotes('');
  };

  const defaultTrigger = (
    <Button>
      <Plus className="w-4 h-4 mr-2" />
      Log Mood
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smile className="w-5 h-5" />
            Log Your Mood
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="text-center">
              <Label className="text-base font-medium">How are you feeling?</Label>
              <div className="mt-2 text-4xl">
                {moodEmojis[mood[0] - 1]}
              </div>
              <div className="mt-2">
                <Slider
                  value={mood}
                  onValueChange={setMood}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {mood[0]}/10
              </div>
            </div>

            <div className="text-center">
              <Label className="text-base font-medium">Energy Level</Label>
              <div className="mt-2">
                <Slider
                  value={energy}
                  onValueChange={setEnergy}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {energyLabels[energy[0] - 1]} ({energy[0]}/10)
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What's on your mind? Any thoughts about your day..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Save Mood
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMoodModal;