import { ReactNode, useState } from 'react';
import './index.css';
import type { Option } from './components/Option';
import questions from './data/questions';
import Quiz from './components/Quix';

// { questionId: userAnswer }

type UserAnswer = {
  // key will be quizId and value will be one of the Option in that quiz.
  [key: number]: Option;
};

function App() {
  const [selectedOption, setSelectedOption] = useState<null | Option>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer>({});

  function handleSelect(answer: any) {
    setSelectedOption(answer);
  }

  function incrementQuestion() {
    if (selectedOption) {
      const questionId = questions[questionIndex].id;
      setUserAnswers({
        ...userAnswers,
        [questionId]: selectedOption,
      });
    }

    setQuestionIndex(questionIndex + 1);
    setSelectedOption(null);
  }

  const question = questions[questionIndex];

  let content: ReactNode;

  if (question) {
    content = (
      <div>
        <Quiz
          question={question.question}
          options={question.options}
          correctOption={
            question.options.find(
              (option) => option.id === question.correctAnswerId
            ) as Option
          }
          onSelect={handleSelect}
          selectedOption={selectedOption}
        />
        <button
          className={`border border-black px-4 py-2 mt-4 ml-auto block ${
            !selectedOption ? 'cursor-not-allowed' : ''
          }`}
          onClick={incrementQuestion}
          disabled={!selectedOption}
        >
          Next
        </button>
      </div>
    );
  } else {
    const totalQuestions = questions.length;
    const { correctAnswers, incorrectAnswers } = getAnswerInsights(
      questions,
      userAnswers
    );

    content = (
      <div className="flex flex-col gap-8">
        <div className="flex justify-between text-neutral-700 text-sm">
          <p>Total questions: {totalQuestions}</p>
          <p>Correct Answer : {correctAnswers}</p>
          <p>Incorrect Answer: {incorrectAnswers}</p>
        </div>
        {questions.map((question) => {
          const userSelectedOption = userAnswers[question.id];
          return (
            <div>
              <Quiz
                question={question.question}
                options={question.options}
                correctOption={
                  question.options.find(
                    (option) => option.id === question.correctAnswerId
                  ) as Option
                }
                selectedOption={selectedOption || userSelectedOption}
                displayResult={true}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 flex-col justify-center">{content}</div>
  );
}

type QuestionType = typeof questions;

function getAnswerInsights(questions: QuestionType, answer: UserAnswer) {
  console.log(questions, answer);
  let correctAnswers = 0,
    incorrectAnswers = 0;

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const correctAnswerId = question.correctAnswerId;
    const userSelectedAnswer = answer[question.id];
    if (!userSelectedAnswer) continue;
    if (correctAnswerId === userSelectedAnswer.id) {
      correctAnswers += 1;
    } else {
      incorrectAnswers += 1;
    }
  }

  return { correctAnswers, incorrectAnswers };
}

export default App;
