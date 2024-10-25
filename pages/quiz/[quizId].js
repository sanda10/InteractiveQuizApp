import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "@/styles/Quiz.module.css";

export default function Quiz() {
  const router = useRouter();
  const { quizId } = router.query;

  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    if (!quizId) return;
    const loadQuestions = async () => {
      try {
        const response = await fetch(`/api/questions?category=${quizId}`);
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error("Eroare la încărcarea întrebărilor:", error);
      }
    };
    loadQuestions();
  }, [quizId]);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex === questions.length - 2) {
      setQuizFinished(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (!questions) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingWrapper}>
          <div className={styles.loadingSpinner}></div>
          <p>Se încarcă întrebările...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Quiz - {quizId?.toUpperCase()}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.quizWrapper}>
          {!quizFinished ? (
            <>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${
                      ((currentQuestionIndex + 1) / (questions.length - 1)) *
                      100
                    }%`,
                  }}
                />
              </div>

              <h2 className={styles.question}>
                {questions[currentQuestionIndex].question}
              </h2>

              <div className={styles.options}>
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className={styles.option}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>

              <div className={styles.footer}>
                <div className={styles.score}>
                  Scor: {score}/{currentQuestionIndex}
                </div>
              </div>
            </>
          ) : (
            <div className={styles.finishScreen}>
              <h2 className={styles.finishTitle}>
                Gata. Ai terminat chestionarul. Felicitări!
              </h2>
              <p className={styles.finalScore}>
                Scor final: {score} / {questions.length - 1}
              </p>

              {/* Link-ul către categorii */}
              <Link href="/categories" passHref>
                <button className={styles.button}>Înapoi la categorii</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
