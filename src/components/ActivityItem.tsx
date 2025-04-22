
import { format } from 'date-fns';
import { Check, Pencil, Trash2 } from 'lucide-react';
import { Activity } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ActivityItemProps {
  activity: Activity;
  onEdit: (activity: Activity) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export const ActivityItem = ({ 
  activity, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}: ActivityItemProps) => {
  const { id, title, description, date, status } = activity;
  
  return (
    <Card className={`w-full hover:shadow-md transition-shadow hover-scale ${status === 'completed' ? 'activity-card-completed' : 'activity-card-pending'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <Badge 
            variant={status === 'completed' ? 'secondary' : 'default'}
            className={status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}
          >
            {status === 'completed' ? 'Completed' : 'Pending'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-muted-foreground text-sm mb-2">{description}</p>
        <p className="text-xs text-muted-foreground">
          {format(date, 'PPP, p')}
        </p>
      </CardContent>
      <CardFooter className="border-t pt-3 flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onToggleStatus(id)}
          title={status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
        >
          <Check className={`h-4 w-4 ${status === 'completed' ? 'text-green-600' : 'text-muted-foreground'}`} />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onEdit(activity)}
          title="Edit activity"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onDelete(id)}
          title="Delete activity"
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
