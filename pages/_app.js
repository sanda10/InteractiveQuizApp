import "@/styles/globals.css";
import { defaultConfig } from "next/dist/server/config-shared";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
