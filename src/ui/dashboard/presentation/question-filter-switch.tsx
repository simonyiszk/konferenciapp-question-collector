import { QuestionState } from '@prisma/client';

import { cn } from '@/lib/utils';

interface QuestionFilterSwitchProps {
  options: { label: string; value: QuestionState }[];
  currentOption: QuestionState;
  onOptionChange: (option: QuestionState) => void;
}

export function QuestionFilterSwitch({
  options,
  onOptionChange,
  currentOption,
}: QuestionFilterSwitchProps) {
  return (
    <div className="w-fit space-x-2 rounded-lg bg-slate-50 p-1 shadow-md shadow-slate-500/10">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onOptionChange(option.value)}
          className={cn(
            'hover:bg-primary-100 active:bg-primary-200 rounded-md px-4 py-2',
            {
              'bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white':
                currentOption === option.value,
            },
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
