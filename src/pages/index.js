import Layout from "components/layout";
import SEO from "components/seo";
import { StickyProvider } from "contexts/app/app.provider";
import React from "react";
import Banner from "sections/banner";
import Banner1 from "sections/banner1";
import CustomerSupport from "sections/customer-support";
import FaqOne from "sections/faq-one";
import FaqTwo from "sections/faq-two";
import Features from "sections/features";
import Pricing from "sections/pricing";
import ProductFeature from "sections/product-feature";
import Services from "sections/services";
import Video from "sections/video";

export default function IndexPage() {
  return (
      <StickyProvider>
        <Layout>
          <SEO
            title="Startup Hosting Classic Landing"
            description="Collection of free top of the line startup landing templates built using react/ next js. Free to download, simply edit and deploy! Updated weekly!"
          />
          {variant ? <Banner /> : <Banner1 />}
          <Features />
          <FaqOne />
          <ProductFeature />
          <Services />
          <Pricing />
          <CustomerSupport />
          <Video />
          <FaqTwo />
        </Layout>
      </StickyProvider>
  );
}
