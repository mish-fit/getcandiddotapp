import React from "react";
import Image from "next/image";
import { Box, Container, Flex, Heading, Text } from "theme-ui";
import Accordion from "components/accordion/accordion";
import image from "assets/faq-one-1.png";
const FAQ_ONE_DATA = {
  sectionImage: image,
  tagline: "Website content builder",
  title: "Meet our premium features that will make you wow",
  text: "Build an incredible workplace and grow your business with Gusto’s all-in-one platform with amazing contents.",
  faqs: [
    {
      isExpanded: true,
      title: "Organize your project content",
      contents: (
        <div>
          Get your website ads tests delivered at let collect sample from the
          victory of the managments that supplies best design system which
          guidelines ever with multiple features.
        </div>
      ),
    },
    {
      isExpanded: false,
      title: "Collaborate your multiple team support easily",
      contents: (
        <div>
          Get your website ads tests delivered at let collect sample from the
          victory of the managments that supplies best design system which
          guidelines ever with multiple features.
        </div>
      ),
    },
    {
      isExpanded: false,
      title: "Build your team's knowledge base system",
      contents: (
        <div>
          Get your website ads tests delivered at let collect sample from the
          victory of the managments that supplies best design system which
          guidelines ever with multiple features.
        </div>
      ),
    },
  ],
};
const FaqOne = () => {
  const { sectionImage, title, text, tagline, faqs } = FAQ_ONE_DATA;
  return (
    <Box as="section" sx={styles.section}>
      <Box sx={styles.sectionImage}>
        <Image
          src={sectionImage}
          width="1011"
          height="830"
          alt="sectionImage"
        />
      </Box>
      <Container sx={styles.container}>
        <Flex sx={styles.flex}>
          <Box sx={styles.content}>
            <Box sx={styles.sectionTitle}>
              <Text as="span">{tagline}</Text>
              <Heading as="h2">{title}</Heading>
              <Text as="p">{text}</Text>
            </Box>
            <Accordion items={faqs} />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default FaqOne;

const styles = {
  section: {
    position: "relative",
  },
  container: {
    maxWidth: ["100%", null, null, null, null, "1172px", "1280px"],
    position: "relative",
  },
  sectionImage: {
    display: ["none", null, null, null, "block"],
    position: ["relative", null, null, null, "absolute"],
    top: 0,
    left: [0, null, null, null, "-55%", "-15%", "0%"],
    maxWidth: ["80%", null, null, "94%", null, "100%"],
    mx: ["auto", null, null, null, 0],
    "@media(min-width: 1232px)": {
      left: "-20%",
    },
    "@media(min-width: 1432px)": {
      left: "-17%",
    },
    "@media(min-width: 1648px)": {
      left: "-10%",
    },
    "@media(min-width: 1848px)": {
      left: "0%",
    },
  },
  flex: {
    display: "flex",
    gap: 0,
    justifyContent: ["flex-start", null, null, null, "flex-end"],
  },
  content: {
    flex: ["0 0 100%", null, null, null, "0 0 60%", "0 0 45%"],
    pl: ["0", null, null, null, "80px"],
    pt: ["60px", null, null, null, "80px"],
    pb: ["48px", null, null, "72px", null, null, "96px"],
  },
  sectionTitle: {
    mb: "24px",
    textAlign: ["left", null, "center", null, "left"],
    h2: {
      color: "#0F2137",
      fontWeight: 500,
      fontSize: ["22px", null, null, "28px", "32px", "36px", "32px"],
      lineHeight: 1.5,
      letterSpacing: "-1.5px",
      mt: "8px",
      maxWidth: ["100%", "300px", "400px", null, "100%"],
      mx: ["0", null, "auto", null, "0"],
    },
    span: {
      color: "secondary",
      fontSize: ["16px", "16px"],
      lineHeight: 1.87,
      display: "block",
    },
    p: {
      color: "#0F2137",
      fontSize: "16px",
      lineHeight: 2.19,
      maxWidth: ["100%", "332px", "400px", null, "100%"],
      mx: ["0", null, "auto", null, "0"],
      mt: ["16px", null, null, "24px"],
    },
  },
};
