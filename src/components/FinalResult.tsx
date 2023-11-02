import questions from '../data/questions';
import Option from './Option';

type QuestionType = typeof questions[0];

function FinalResult({
  questions,
  userAnswers,
}: {
  questions: QuestionType[];
  userAnswers: {
    question: QuestionType;
    userSelectedAnswer: { id: number; answer: string };
  }[];
}) {
  console.log(questions, userAnswers);
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-gray-600">
          Correct Answers: <span className="font-bold">4</span>
        </h3>
        <h3 className="text-gray-600">
          Incorrect Answers: <span className="font-bold">2</span>{' '}
        </h3>
      </div>
      <div className="flex flex-col gap-8">
        {questions.map((questionObject, questionIndex) => {
          return (
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold">
                {questionObject.question}
              </h1>
              <div className="flex flex-col gap-2">
                {questionObject.answers.map((answer, index) => {
                  return (
                    <div className="flex gap-6 items-center">
                      <p className="text-lg">{index + 1}</p>
                      <div className="grow">
                        <Option
                          key={answer.id}
                          answer={answer}
                          selectedAnswerId={
                            userAnswers[questionIndex].userSelectedAnswer.id
                          }
                          actualAnswerId={questionObject.correctAnswerId}
                          onClick={(answer: string) => {}}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FinalResult;
