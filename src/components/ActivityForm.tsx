
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon, Check, Clock, X } from 'lucide-react';
//import { CalendarIcon, Clock, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Activity, ActivityFormData, ActivityStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

interface ActivityFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ActivityFormData) => void;
  activity?: Activity;
}

export const ActivityForm = ({ 
  open, 
  onClose, 
  onSubmit, 
  activity 
}: ActivityFormProps) => {
  const form = useForm<ActivityFormData>({
    defaultValues: {
      title: '',
      description: '',
      date: new Date(),
      status: 'pending' as ActivityStatus,
    },
  });

  // Reset form with activity data if provided for editing
  useEffect(() => {
    if (activity) {
      form.reset({
        title: activity.title,
        description: activity.description,
        date: activity.date,
        status: activity.status,
      });
    } else {
      form.reset({
        title: '',
        description: '',
        date: new Date(),
        status: 'pending',
      });
    }
  }, [activity, form]);

  const handleSubmit = (data: ActivityFormData) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{activity ? 'Edit Activity' : 'Add New Activity'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: 'Title is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter activity title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your activity" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              rules={{ required: 'Date is required' }}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP, p")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormLabel>Date and Time</FormLabel>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full sm:w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                if (date) {
                                  // Preserve the time when changing date
                                  const currentDate = field.value || new Date();
                                  date.setHours(currentDate.getHours());
                                  date.setMinutes(currentDate.getMinutes());
                                  field.onChange(date);
                                }
                              }}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                      </PopoverContent>
                    </Popover>

                    <div className="flex items-center gap-2">
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 opacity-50" />
                          <Input
                            type="time"
                            className="w-full sm:w-[140px]"
                            value={field.value ? format(field.value, "HH:mm") : ""}
                            onChange={(e) => {
                              const timeValue = e.target.value;
                              if (timeValue) {
                                const [hours, minutes] = timeValue.split(':');
                                const newDate = new Date(field.value || new Date());
                                newDate.setHours(parseInt(hours, 10));
                                newDate.setMinutes(parseInt(minutes, 10));
                                field.onChange(newDate);
                              }
                            }}
                          />
                        </div>
                      </FormControl>                        
                    </div>
                  </div>
                   <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="status"
              rules={{ required: 'Status is required' }}
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="pending" checked={field.value === 'pending'} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Pending</FormLabel>
                      </FormItem>
                      
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="completed" checked={field.value === 'completed'} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Completed</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="flex justify-end gap-2 pt-4">
              <Button variant="outline" type="button" onClick={onClose}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit">
                <Check className="h-4 w-4 mr-2" />
                {activity ? 'Update' : 'Add'} Activity
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
