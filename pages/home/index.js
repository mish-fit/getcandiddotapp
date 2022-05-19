import { Flex, Text } from "@chakra-ui/react";
import { initOptimize } from "analytics/go";
import Layout from "components/layout";
import SEO from "components/seo";
// import { StickyProvider } from "contexts/app/app.provider";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { pageview, event } from "analytics/ga";
import Banner from "sections/banner";
import Banner1 from "sections/banner1";
import FaqTwo from "sections/faq-two";
import Features from "sections/features";
import ProductFeature from "sections/product-feature";
import { ContactUsModal } from "sections/video";

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

export default function Home() {
  const router = useRouter();
  const variant = useExperiment("65elEA0zTVyfg-IGET3tYA");
  const [isOpenLinksModal, setOpenLinksModal] = React.useState(false);

  React.useEffect(() => {
    initOptimize();
    // console.log("Variant", variant);
    const handleRouteChange = (url) => {
      pageview(url);
      event("LANDED_ON_HOME_PAGE", {});
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
    <Flex sx={{ flexDirection: "column" }}>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {/* <StickyProvider> */}
        <Layout>
          <SEO
            title="Get your free CNDD link"
            description="Now claim your candid store and share product recommendations seamlessly. Earn money when people buy from your store"
          />
          <ContactUsModal
            isOpen={isOpenLinksModal}
            closeParent={() => setOpenLinksModal(false)}
          />
          {variant ? <Banner1 /> : <Banner />}
          <Features />
          <ProductFeature />
          <FaqTwo addQuestion={() => setOpenLinksModal(true)} />
        </Layout>
      {/* </StickyProvider> */}
    </Flex>
  );
}
