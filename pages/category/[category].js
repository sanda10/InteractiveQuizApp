import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Quiz() {
  const router = useRouter();
  const { category } = router.query;

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    if (!category) return;
    const loadQuestions = async () => {
      try {
        const response = await fetch(`/api/questions?category=${category}`);
        const data = await response.json();
        console.log("Questions loaded:", data);
        setQuestions(data);
      } catch (error) {
        console.error("Eroare la încărcarea întrebărilor:", error);
      }
    };
    loadQuestions();
  }, [category]);

  const handleAnswer = (answer) => {
    console.log("Answer given:", answer);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex === questions.length - 1) {
      console.log("Quiz finished");
      setQuizFinished(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleFinishQuiz = () => {
    alert(
      `Chestionarul este finalizat! Scorul tău este: ${score}/${questions.length}`
    );
    router.push("/categories");
  };

  console.log("Current question index:", currentQuestionIndex);
  console.log("Quiz finished state (outside):", quizFinished);

  return (
    <div>
      {questions.length > 0 && !quizFinished ? (
        <div>
          <h1>{questions[currentQuestionIndex].question}</h1>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h1>Gata. Ai terminat chestionarul. Felicitări!</h1>
          <p>
            Scor: {score} / {questions.length}
          </p>
          {console.log("Quiz finished state (inside):", quizFinished)}
          <button onClick={handleFinishQuiz} disabled={!quizFinished}>
            Finalizează
          </button>
        </div>
      )}
    </div>
  );
}
