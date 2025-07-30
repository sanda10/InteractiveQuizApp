 InteractiveQuizApp



Aplicație interactivă de tip quiz, construită cu **Next.js** și **React**, care testează cunoștințele utilizatorului pe teme precum REST API, JavaScript și Next.js. Utilizatorii pot naviga prin categorii, răspunde la întrebări și adăuga propriile întrebări – toate fără un backend real, folosind `localStorage`.


 🚀 Funcționalități

- ✅ Quiz interactiv cu întrebări pe categorii
- ✅ Răspunsuri multiple (cu o singură alegere corectă)
- ✅ Scor în timp real și mesaj final
- ✅ Adăugare de întrebări noi din interfață
- ✅ Persistență cu `localStorage` (fără backend)
- ✅ Stiluri personalizate cu `CSS Modules`
- ✅ Rute dinamice cu `[quizId]` din Next.js
- ✅ Încărcare întrebări prin `API Route`



 🧰 Tehnologii folosite

- **Next.js** – pentru routing și generare statică/dinamică
- **React** – pentru componentizare și hooks (`useState`, `useEffect`)
- **localStorage** – pentru salvarea întrebărilor custom
- **API Routes** – pentru expunerea fișierului `questions.json`
- **CSS Modules** – pentru stiluri scoped



 🧪 Cum rulezi aplicația local

1. **Clonează proiectul**

bash
git clone https://github.com/username/InteractiveQuizApp.git
cd InteractiveQuizApp

Instalează dependențele

bash
Copy
Edit
npm install
Pornește serverul de dezvoltare

bash
Copy
Edit
npm run dev
Accesează aplicația

👉 http://localhost:3000

🧱 Structura Proiectului
bash
Copy
Edit
/pages
  /index.js              - Pagina principală
  /quiz/[quizId].js      - Pagină pentru fiecare quiz
  /add-question.js       - Formular pentru întrebări noi
  /api/questions.js      - Rută API pentru încărcarea întrebărilor

/components
  /Question.js           - Componenta pentru o întrebare

/public
  /questions.json        - Întrebările inițiale pentru quiz

/styles
  /Home.module.css
  /Quiz.module.css
📦 Salvarea întrebărilor noi
Întrebările introduse de utilizator sunt salvate local în localStorage per categorie (restapi, nextjs, javascript)

La încărcarea quiz-ului, întrebările din questions.json sunt combinate cu cele din localStorage

Nu este nevoie de backend pentru funcționare

📈 Idei de îmbunătățire
Autentificare utilizator (NextAuth, JWT)

Persistență reală într-o bază de date (MongoDB, Supabase)

Istoric de scoruri

Timer per întrebare sau quiz multiplayer live

Export în PDF/CSV a răspunsurilor

 Licență
Acest proiect este licențiat sub MIT License.
