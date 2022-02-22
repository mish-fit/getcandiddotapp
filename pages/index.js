import React from "react";
import { ThemeProvider } from "theme-ui";
import { StickyProvider } from "contexts/app/app.provider";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import Banner from "sections/banner";
import Features from "sections/features";
import FaqTwo from "sections/faq-two";
import Pricing from "sections/pricing";
import ProductFeature from "sections/product-feature";
import Banner1 from "sections/banner1";
import { useRouter } from "next/router";
import { initOptimize } from "analytics/go";
import "@fontsource/poppins";
import { pageview } from "react-ga";
import Script from "next/script";

const useExperiment = (experimentId) => {
  const [variant, setVariant] = React.useState();
  React.useEffect(() => {
    (async () => {
      if (window.dataLayer) {
        await window.dataLayer.push({ event: "optimize.activate" });
      }
      const intervalId = setInterval(() => {
        if (window.google_optimize !== undefined) {
          // Set the variant to the state.
          setVariant(window.google_optimize.get(experimentId));
          clearInterval(intervalId);
        }
      }, 100);
    })();
  });
  return variant;
};

export default function IndexPage() {
  const router = useRouter();
  const variant = useExperiment("65elEA0zTVyfg-IGET3tYA");

  React.useEffect(() => {
    initOptimize();
    console.log("Variant", variant);
    const handleRouteChange = (url) => {
      pageview(url);
    };

    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, variant]);

  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout>
          <SEO
            title="Get your free CNDD link"
            description="Now claim your candid store and share product recommendations seamlessly. Earn money when people buy from your store"
          />
          {variant ? <Banner1 /> : <Banner />}
          <Features />
          <ProductFeature />
          <FaqTwo />
        </Layout>
      </StickyProvider>
    </ThemeProvider>
  );
}
