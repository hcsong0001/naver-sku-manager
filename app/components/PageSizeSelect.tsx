import { PAGE_SIZE_OPTIONS, type CommonPageSize } from '@/src/utils/pagination';

type PageSizeSelectProps = {
  value: CommonPageSize;
  onChange: (value: CommonPageSize) => void;
  className?: string;
};

export default function PageSizeSelect({ value, onChange, className }: PageSizeSelectProps) {
  return (
    <label className={className ?? 'tms-toolbar flex items-center gap-2'}>
      페이지당 표시
      <select
        value={String(value)}
        onChange={(event) => {
          const nextValue = event.target.value;
          onChange(nextValue === 'ALL' ? 'ALL' : Number(nextValue) as Exclude<CommonPageSize, 'ALL'>);
        }}
        className="tms-control rounded-lg border border-[#333] bg-[#121214] text-sm outline-none transition focus:border-indigo-400"
      >
        {PAGE_SIZE_OPTIONS.map((option) => (
          <option key={option.label} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
