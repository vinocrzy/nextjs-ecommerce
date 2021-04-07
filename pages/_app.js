import "../styles/globals.scss";
import { DefaultSeo } from "next-seo";
import SEO from "../seo.config";
import { AnimatePresence } from "framer-motion";
import Layout from "../layout";

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Layout page={router.route}>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </>
  );
}

export default MyApp;
