
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Activity, ActivityFormData, ActivityStatus } from '@/lib/types';
import { sampleActivities } from '@/lib/data';
import { Layout } from '@/components/Layout';
import { ActivityList } from '@/components/ActivityList';
import { ActivityForm } from '@/components/ActivityForm';
import { ActivityFilter } from '@/components/ActivityFilter';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [activities, setActivities] = useState<Activity[]>(sampleActivities);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(sampleActivities);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Activity | undefined>(undefined);
  const [filters, setFilters] = useState<{ status?: ActivityStatus; date?: Date | null }>({});
  
  const { toast } = useToast();

  // Apply filters whenever activities or filters change
  useEffect(() => {
    let result = [...activities];
    
    if (filters.status) {
      result = result.filter(activity => activity.status === filters.status);
    }
    
    if (filters.date) {
      result = result.filter(activity => {
        const activityDate = new Date(activity.date);
        const filterDate = new Date(filters.date!);
        return (
          activityDate.getDate() === filterDate.getDate() &&
          activityDate.getMonth() === filterDate.getMonth() &&
          activityDate.getFullYear() === filterDate.getFullYear()
        );
      });
    }
    
    setFilteredActivities(result);
  }, [activities, filters]);

  const handleFilterChange = (newFilters: { status?: ActivityStatus; date?: Date | null }) => {
    setFilters(newFilters);
  };

  const handleAddActivity = () => {
    setCurrentActivity(undefined);
    setIsFormOpen(true);
  };

  const handleEditActivity = (activity: Activity) => {
    setCurrentActivity(activity);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: ActivityFormData) => {
    if (currentActivity) {
      // Edit existing activity
      const updatedActivities = activities.map(activity => 
        activity.id === currentActivity.id ? { ...activity, ...data } : activity
      );
      setActivities(updatedActivities);
      toast({
        title: "Activity updated",
        description: `"${data.title}" has been updated successfully.`,
      });
    } else {
      // Add new activity
      const newActivity: Activity = {
        id: Date.now().toString(),
        ...data,
      };
      setActivities([newActivity, ...activities]);
      toast({
        title: "Activity added",
        description: `"${data.title}" has been added successfully.`,
      });
    }
    setIsFormOpen(false);
  };

  const handleDeleteActivity = (id: string) => {
    const activityToDelete = activities.find(activity => activity.id === id);
    const updatedActivities = activities.filter(activity => activity.id !== id);
    setActivities(updatedActivities);
    toast({
      title: "Activity deleted",
      description: activityToDelete ? `"${activityToDelete.title}" has been deleted.` : "Activity has been deleted.",
      variant: "destructive",
    });
  };

  const handleToggleStatus = (id: string) => {
    const updatedActivities = activities.map(activity => {
      if (activity.id === id) {
        const newStatus: ActivityStatus = activity.status === 'pending' ? 'completed' : 'pending';
        return { ...activity, status: newStatus };
      }
      return activity;
    });
    setActivities(updatedActivities);
    
    const updatedActivity = updatedActivities.find(activity => activity.id === id);
    if (updatedActivity) {
      toast({
        title: `Activity ${updatedActivity.status === 'completed' ? 'completed' : 'marked as pending'}`,
        description: `"${updatedActivity.title}" has been ${updatedActivity.status === 'completed' ? 'marked as completed' : 'moved back to pending'}.`,
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold">Your Activities</h2>
          <Button onClick={handleAddActivity}>
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
        </div>
        
        <ActivityFilter onFilterChange={handleFilterChange} />
        
        <ActivityList
          activities={filteredActivities}
          onEdit={handleEditActivity}
          onDelete={handleDeleteActivity}
          onToggleStatus={handleToggleStatus}
        />

        <ActivityForm
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          activity={currentActivity}
        />
      </div>
    </Layout>
  );
};

export default Index;
