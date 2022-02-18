import React from "react";
import { ThemeProvider } from "theme-ui";
import { StickyProvider } from "contexts/app/app.provider";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";

import Features from "sections/features";

import FaqTwo from "sections/faq-two";

import Pricing from "sections/pricing";

import ProductFeature from "sections/product-feature";

import Banner1 from "sections/banner1";
import { useRouter } from "next/router";

export default function V1() {
  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChange = (url) => {
      // pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout>
          <SEO
            title="Get your free CNDD link"
            description="Become affiliate marketer in 2 mins"
          />
          <Banner1 />
          <Features />
          {/* <FaqOne /> */}
          <ProductFeature />
          {/* <Services /> */}
          <Pricing />
          {/* <CustomerSupport />
          <Video /> */}
          <FaqTwo />
        </Layout>
      </StickyProvider>
    </ThemeProvider>
  );
}
