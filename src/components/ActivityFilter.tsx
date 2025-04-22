
import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ActivityStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ActivityFilterProps {
  onFilterChange: (filters: { status?: ActivityStatus; date?: Date | null }) => void;
}

export const ActivityFilter = ({ onFilterChange }: ActivityFilterProps) => {
  const [selectedStatus, setSelectedStatus] = useState<ActivityStatus | 'all'>('all');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleStatusChange = (value: string) => {
    const status = value as ActivityStatus | 'all';
    setSelectedStatus(status);
    onFilterChange({ 
      status: status === 'all' ? undefined : status, 
      date: selectedDate 
    });
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onFilterChange({ 
      status: selectedStatus === 'all' ? undefined : selectedStatus, 
      date 
    });
  };

  const clearFilters = () => {
    setSelectedStatus('all');
    setSelectedDate(null);
    onFilterChange({});
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filter:</span>
      </div>

      <div className="flex flex-1 flex-col sm:flex-row gap-2">
        <Select value={selectedStatus} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-[240px] justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : <span>Filter by date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateChange}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        {(selectedStatus !== 'all' || selectedDate) && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full sm:w-auto"
            onClick={clearFilters}
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
};
