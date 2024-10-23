// pages/api/questions.js
import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  const questionsPath = path.join(process.cwd(), "public", "questions.json");

  if (req.method === "GET") {
    try {
      const jsonData = await fs.readFile(questionsPath, "utf-8");
      const questions = JSON.parse(jsonData);

      const { category } = req.query;
      if (category && questions[category]) {
        return res.status(200).json(questions[category]);
      }

      return res.status(200).json(questions);
    } catch (error) {
      console.error("Error loading questions:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    try {
      const { category, question, options, correctAnswer } = req.body;

      // Validări
      if (!category || !question || !options || !correctAnswer) {
        return res
          .status(400)
          .json({ message: "Toate câmpurile sunt obligatorii" });
      }

      // Citește fișierul existent
      const jsonData = await fs.readFile(questionsPath, "utf-8");
      const questions = JSON.parse(jsonData);

      // Adaugă noua întrebare
      if (!questions[category]) {
        questions[category] = { questions: [] };
      }

      // Îndepărtăm ultima întrebare (cea cu "Felicitări") dacă există
      const categoryQuestions = questions[category].questions;
      if (
        categoryQuestions.length > 0 &&
        categoryQuestions[categoryQuestions.length - 1].options.length === 0
      ) {
        categoryQuestions.pop();
      }

      // Adaugă noua întrebare
      categoryQuestions.push({
        question,
        options,
        correctAnswer,
      });

      // Adaugă înapoi întrebarea de felicitare
      categoryQuestions.push({
        question: "Gata. Ai terminat chestionarul. Felicitari!",
        options: [],
        correctAnswer: "",
      });

      // Salvează fișierul actualizat
      await fs.writeFile(questionsPath, JSON.stringify(questions, null, 2));

      return res.status(200).json({ message: "Întrebare adăugată cu succes" });
    } catch (error) {
      console.error("Error saving question:", error);
      return res.status(500).json({ message: "Eroare la salvarea întrebării" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
