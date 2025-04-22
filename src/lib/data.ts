
import { Activity } from './types';

export const sampleActivities: Activity[] = [
  {
    id: '1',
    title: 'Morning Jog',
    description: 'Go for a 30-minute jog in the park',
    date: new Date(2025, 3, 25, 7, 0),
    status: 'pending',
  },
  {
    id: '2',
    title: 'Team Meeting',
    description: 'Weekly team sync to discuss project progress',
    date: new Date(2025, 3, 25, 10, 0),
    status: 'pending',
  },
  {
    id: '3',
    title: 'Grocery Shopping',
    description: 'Buy fruits, vegetables and other essentials',
    date: new Date(2025, 3, 24, 18, 0),
    status: 'completed',
  },
  {
    id: '4',
    title: 'Read Book',
    description: 'Continue reading "Atomic Habits"',
    date: new Date(2025, 3, 23, 20, 0),
    status: 'completed',
  },
];
