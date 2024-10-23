import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/Quiz.module.css";

const Quiz = () => {
  const router = useRouter();
  const { category } = router.query;

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!category) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/questions?category=${category}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.questions || data.questions.length === 0) {
          throw new Error("Nu există întrebări pentru această categorie.");
        }

        setQuestions(data.questions);
      } catch (err) {
        setError(
          err.message ||
            "Nu am putut încărca întrebările. Vă rugăm încercați din nou."
        );
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer("");
    } else {
      setQuizCompleted(true);
      localStorage.setItem(`quiz_score_${category}`, score.toString());
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setQuizCompleted(false);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <p>Se încarcă întrebările...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={() => router.push("/")} className={styles.button}>
          Înapoi la început
        </button>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className={styles.completionContainer}>
        <h2>Felicitări! Ai terminat quiz-ul!</h2>
        <p>
          Scorul tău final: {score} din {questions.length}
        </p>
        <div className={styles.buttonGroup}>
          <button onClick={handleRestartQuiz} className={styles.button}>
            Încearcă din nou
          </button>
          <button
            onClick={() => router.push("/")}
            className={`${styles.button} ${styles.secondary}`}
          >
            Înapoi la categorii
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <Head>
        <title>Quiz - {category?.toUpperCase()}</title>
      </Head>

      <div className={styles.quizContainer}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${
                ((currentQuestionIndex + 1) / questions.length) * 100
              }%`,
            }}
          />
        </div>

        <div className={styles.questionCard}>
          <h3 className={styles.questionText}>{currentQuestion?.question}</h3>

          <div className={styles.optionsContainer}>
            {currentQuestion?.options.map((option, index) => (
              <label
                key={index}
                className={`${styles.optionLabel} ${
                  selectedAnswer === option ? styles.selected : ""
                }`}
              >
                <input
                  type="radio"
                  name="quizOption"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => handleAnswerSelect(option)}
                  className={styles.radioInput}
                />
                <span className={styles.optionText}>{option}</span>
              </label>
            ))}
          </div>

          <div className={styles.quizFooter}>
            <div className={styles.score}>
              Scor curent: {score}/{currentQuestionIndex}
            </div>
            <button
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              className={`${styles.button} ${
                !selectedAnswer ? styles.disabled : ""
              }`}
            >
              {currentQuestionIndex === questions.length - 1
                ? "Finalizează"
                : "Următoarea întrebare"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
