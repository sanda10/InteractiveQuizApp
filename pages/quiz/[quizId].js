// pages/quiz/[quizId].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/Quiz.module.css";

export default function QuizPage() {
  const router = useRouter();
  const { quizId } = router.query;

  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Încarcă întrebările când componenta se montează
  useEffect(() => {
    const loadQuestions = async () => {
      if (!quizId) return; // Așteaptă până când quizId este disponibil

      try {
        const response = await fetch(`/api/questions?category=${quizId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();
        setQuestions(data.questions);
        setLoading(false);
      } catch (err) {
        console.error("Error loading questions:", err);
        setError(
          "Nu am putut încărca întrebările. Te rugăm să încerci din nou."
        );
        setLoading(false);
      }
    };

    loadQuestions();
  }, [quizId]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    // Verifică dacă răspunsul este corect
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Trece la următoarea întrebare sau finalizează quiz-ul
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      // Redirect la pagina de rezultate
      router.push(`/results?score=${score}&total=${questions.length - 1}`);
    }
  };

  // Afișează loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingWrapper}>
          <div className={styles.loadingSpinner}></div>
          <p>Se încarcă întrebările...</p>
        </div>
      </div>
    );
  }

  // Afișează eroarea dacă există
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          <p>{error}</p>
          <button onClick={() => router.push("/")} className={styles.button}>
            Înapoi la început
          </button>
        </div>
      </div>
    );
  }

  // Verifică dacă avem întrebări
  if (!questions || questions.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          <p>Nu am găsit întrebări pentru această categorie.</p>
          <button onClick={() => router.push("/")} className={styles.button}>
            Înapoi la început
          </button>
        </div>
      </div>
    );
  }

  // Afișează quiz-ul
  return (
    <>
      <Head>
        <title>Quiz - {quizId?.toUpperCase()}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.quizWrapper}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          <h2 className={styles.question}>
            {questions[currentQuestion].question}
          </h2>

          <div className={styles.options}>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`${styles.option} ${
                  selectedAnswer === option ? styles.selected : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className={styles.footer}>
            <div className={styles.score}>
              Scor: {score}/{currentQuestion}
            </div>

            <button
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              className={styles.nextButton}
            >
              {currentQuestion === questions.length - 1
                ? "Finalizează"
                : "Următoarea întrebare"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
