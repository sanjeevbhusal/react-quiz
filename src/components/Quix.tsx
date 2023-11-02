import questions from '../data/questions';
import type { OptionColorType, Option as OptionType } from './Option';
import Option from './Option';

interface Quiz {
  question: string;
  options: OptionType[];
  onSelect?: (option: OptionType) => void;
  correctOption: OptionType;
  selectedOption: OptionType | null;
  displayResult?: boolean;
}

function Quiz({
  question,
  options,
  onSelect,
  correctOption,
  selectedOption,
  displayResult = false,
}: Quiz) {
  // if selectedOption is present, then it means, we are trying to show the result

  return (
    <div>
      <h1 className="text-lg font-semibold">{question}</h1>
      <div className="mt-4 gap-2 flex flex-col">
        {options.map((option, index) => {
          let optionColorType: OptionColorType = 'neutral';

          if (selectedOption === option) {
            optionColorType = 'selected';
          }

          if (displayResult) {
            // if it not the correct answer but user clicked on this, we just display it as red.
            if (option !== correctOption && selectedOption === option) {
              optionColorType = 'incorrect';
              // if it is the correct answer, it should be displayed as green.
            } else if (option === correctOption) {
              optionColorType = 'correct';
            }
          }

          return (
            <div className="flex gap-6 items-center">
              <p className="text-lg">{index + 1}</p>
              <div className="grow">
                <Option
                  key={option.id}
                  option={option}
                  onSelect={onSelect}
                  type={optionColorType}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Quiz;
