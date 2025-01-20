import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DateInputProps {
  value: Date;
  setValue: (date: Date) => void;
}

export default function DateInput({ value, setValue }: DateInputProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex w-full cursor-pointer items-center justify-start gap-2 rounded border border-dark-gray px-3 py-2 text-left text-base shadow-sm focus-visible:ring-0">
          <CalendarIcon size={20} className="text-dark-gray" />
          {value ? (
            format(value, 'dd/MM/yyyy')
          ) : (
            <span className="text-placeholder-gray">เลือกวันเกิด</span>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={setValue as (date: Date | undefined) => void}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
