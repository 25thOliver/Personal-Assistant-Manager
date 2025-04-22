
export type ActivityStatus = 'pending' | 'completed';

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: Date;
  status: ActivityStatus;
}

export type ActivityFormData = Omit<Activity, 'id'>;
