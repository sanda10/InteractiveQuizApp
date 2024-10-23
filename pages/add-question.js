import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/AddQuestion.module.css";

export default function AddQuestion() {
  const router = useRouter();

  // Starea formularului pentru noua întrebare
  const [formData, setFormData] = useState({
    category: "javascript",
    question: "",
    options: ["", "", ""],
    correctAnswer: "",
  });

  const [questions, setQuestions] = useState(() => {
    const storedQuestions = localStorage.getItem("questions");
    return storedQuestions ? JSON.parse(storedQuestions) : {};
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // useEffect pentru a sincroniza întrebările cu localStorage
  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  const addOption = () => {
    if (formData.options.length < 5) {
      setFormData((prev) => ({
        ...prev,
        options: [...prev.options, ""],
      }));
    }
  };

  const removeOption = (index) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        options: newOptions,
        correctAnswer:
          formData.correctAnswer === formData.options[index]
            ? ""
            : formData.correctAnswer,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.question.trim()) {
      setError("Vă rugăm să introduceți o întrebare.");
      return;
    }

    if (formData.options.some((opt) => !opt.trim())) {
      setError("Toate opțiunile trebuie completate.");
      return;
    }

    if (!formData.correctAnswer) {
      setError("Vă rugăm să selectați răspunsul corect.");
      return;
    }

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: formData.category,
          question: formData.question.trim(),
          options: formData.options.filter((opt) => opt.trim()),
          correctAnswer: formData.correctAnswer,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Eroare la salvarea întrebării");
      }

      setSuccess(true);
      setFormData({
        category: "javascript",
        question: "",
        options: ["", "", ""],
        correctAnswer: "",
      });

      setTimeout(() => {
        router.push("/categories");
      }, 2000);
    } catch (err) {
      setError(err.message || "A apărut o eroare la salvarea întrebării");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Adaugă o întrebare nouă</h1>

      {error && <div className={styles.error}>{error}</div>}
      {success && (
        <div className={styles.success}>
          Întrebarea a fost adăugată cu succes!
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Categorie:
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={styles.select}
          >
            <option value="javascript">JavaScript</option>
            <option value="nextjs">Next.js</option>
            <option value="restapi">REST API</option>
          </select>
        </label>

        <label>
          Întrebare:
          <textarea
            name="question"
            value={formData.question}
            onChange={handleInputChange}
            className={styles.textarea}
            required
          />
        </label>

        <label>Opțiuni:</label>
        {formData.options.map((option, index) => (
          <div key={index} className={styles.optionGroup}>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className={styles.input}
              required
            />
            {formData.options.length > 2 && (
              <button
                type="button"
                onClick={() => removeOption(index)}
                className={styles.removeButton}
              >
                ×
              </button>
            )}
          </div>
        ))}
        {formData.options.length < 5 && (
          <button
            type="button"
            onClick={addOption}
            className={styles.addButton}
          >
            + Adaugă opțiune
          </button>
        )}

        <label>Răspuns corect:</label>
        {formData.options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name="correctAnswer"
              value={option}
              checked={formData.correctAnswer === option}
              onChange={handleInputChange}
              required
            />
            {option || `Opțiunea ${index + 1}`}
          </label>
        ))}

        <button type="submit">Adaugă întrebarea</button>
      </form>
    </div>
  );
}
