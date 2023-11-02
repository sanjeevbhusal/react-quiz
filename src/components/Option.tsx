export interface Option {
  id: number;
  value: string;
}

export type OptionColorType = 'neutral' | 'selected' | 'correct' | 'incorrect';

function Option({
  option,
  onSelect = () => {},
  type,
}: {
  option: Option;
  onSelect?: (option: Option) => void;
  type: OptionColorType;
}) {
  return (
    <p
      className={`border border-black p-2 rounded-md cursor-pointer ${
        type === 'neutral'
          ? 'bg-gray-100'
          : type === 'selected'
          ? 'bg-blue-500'
          : type === 'correct'
          ? 'bg-green-500'
          : type === 'incorrect'
          ? 'bg-red-500'
          : ''
      }`}
      onClick={() => onSelect(option)}
    >
      {option.value}
    </p>
  );
}

export default Option;
