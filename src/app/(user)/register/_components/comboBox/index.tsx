// TODO: enable ts-check
// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client';

import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface ComboBoxProps {
  value: string;
  setValue: (value: string) => void;
  choices: string[];
  placeholder: string;
  emptyText: string;
  searchText: string;
}

export default function ComboBox({
  value,
  setValue,
  choices,
  placeholder,
  emptyText,
  searchText,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-h-10 w-full justify-between rounded-sm border border-dark-gray px-3 text-black hover:bg-white hover:text-black focus:border-2 focus:border-dark-pink focus:text-black focus:outline-none focus:ring-0 font-normal"
        >
          <div className="overflow-hidden text-ellipsis">
            {value ? (
              choices.find(choice => choice === value)
            ) : (
              <div className="text-dark-gray">{placeholder}</div>
            )}
          </div>
          <ChevronDown className="size-5 text-black opacity-50" size={5} />
        </Button>
      </PopoverTrigger>
      {/* TODO: adjust popover content to be width fulll */}
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={searchText} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {choices.map(choice => (
                <CommandItem
                  key={choice}
                  value={choice}
                  onSelect={currentValue => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <div
                    className={cn('flex w-full items-center justify-between', {
                      'bg-background p-0': value === choice,
                    })}
                  >
                    {choice}
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === choice ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
