
import { ActivityItem } from './ActivityItem';
import { Activity } from '@/lib/types';

interface ActivityListProps {
  activities: Activity[];
  onEdit: (activity: Activity) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export const ActivityList = ({ 
  activities, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}: ActivityListProps) => {
  if (activities.length === 0) {
    return (
      <div className="w-full text-center p-8 bg-muted/20 rounded-lg">
        <p className="text-muted-foreground">No activities found. Add a new activity to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};
