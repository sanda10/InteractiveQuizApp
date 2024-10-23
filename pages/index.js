import Link from "next/link";
import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Chestionar GT</title>
        <meta name="description" content="Workout 3 - Modulul 8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Chestionar cunoștințe generale</h1>

          <p className="category">
            Întrebările sunt grupate pe 3 categorii:&nbsp;
            <Link href="/quiz/restapi">REST API</Link>,&nbsp;
            <Link href="/quiz/nextjs">Next.js</Link>,&nbsp;
            <Link href="/quiz/javascript">JavaScript</Link>
          </p>

          <p>
            Există doar o singură variantă corectă de răspuns pentru fiecare
            întrebare
          </p>

          <p>
            Alege o categorie sau începe chestionarul apăsând butonul Start.
          </p>

          <div className={styles.buttonContainer}>
            <Link href="/categories" className={styles.button}>
              Start Chestionar
            </Link>

            <Link
              href="/add-question"
              className={`${styles.button} ${styles.secondary}`}
            >
              Adaugă o întrebare nouă
            </Link>
          </div>
        </main>

        <footer className={styles.footer}>
          <Link href="/quiz/restapi">REST API</Link>
          <Link href="/quiz/nextjs">Next.js</Link>
          <Link href="/quiz/javascript">JavaScript</Link>
        </footer>
      </div>
    </>
  );
}
