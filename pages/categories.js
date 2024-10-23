import Link from "next/link";
import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Categories() {
  return (
    <>
      <Head>
        <title>Chestionar GT</title>
        <meta name="description" content="Categorii chestionar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Alege o categorie</h1>

          <div className={styles.categoryList}>
            <h3>
              <Link href="/quiz/restapi">REST API</Link>
            </h3>
            <h3>
              <Link href="/quiz/nextjs">Next.js</Link>
            </h3>
            <h3>
              <Link href="/quiz/javascript">JavaScript</Link>
            </h3>
          </div>

          <div className={styles.buttonContainer}>
            <Link href="/" className={`${styles.button} ${styles.secondary}`}>
              Înapoi la prima pagină
            </Link>
            <Link href="/add-question" className={styles.button}>
              Adaugă o întrebare nouă
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
