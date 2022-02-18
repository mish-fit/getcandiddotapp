import React from "react";
import Image from "next/image";
import { Box, Container, Flex, Heading, Text } from "theme-ui";
import image1 from "assets/features-1.svg";
import image2 from "assets/features-2.svg";
import image3 from "assets/features-3.svg";
import { useRouter } from "next/router";
import { translation } from "translation";

const Features = () => {
  const { locale } = useRouter();
  const lang = translation[locale].highlightsSection;

  const FEATURES_DATA = {
    title: lang.Header,
    text: lang.subHeader,
    posts: [
      {
        image: image3,
        title: lang.Tile1.Title,
        text: lang.Tile1.Content,
      },
      {
        image: image2,
        title: lang.Tile2.Title,
        text: lang.Tile2.Content,
      },
      {
        image: image1,
        title: lang.Tile3.Title,
        text: lang.Tile3.Content,
      },
    ],
  };
  const { title, text, posts } = FEATURES_DATA;

  return (
    <Box as="section" id="features" sx={styles.section}>
      <Container sx={styles.container}>
        <Box sx={styles.sectionTitle}>
          <Text as="p">{text}</Text>
          <Heading as="h2">{title}</Heading>
        </Box>
        <Flex sx={styles.flex}>
          {posts.map(({ image, title, text }, index) => (
            <Box sx={styles.post} key={`feature-post-key-${index}`}>
              <Box className="image">
                <Image width="70" height="70" src={image} alt={title} />
              </Box>
              <Box sx={styles.postContent}>
                <Heading as="h3">{title}</Heading>
                <Text as="p">{text}</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default Features;

const styles = {
  section: {
    overflow: "hidden",
    pt: ["72px", null, null, "96px"],
    pb: ["32px", null, null, "72px"],
  },
  container: {},
  flex: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  sectionTitle: {
    textAlign: "center",
    mb: ["32px", null, null, "72px"],
    h2: {
      color: "#0F2137",
      fontWeight: 500,
      fontSize: ["22px", null, null, "24px"],
      lineHeight: 1,
      letterSpacing: "-0.5px",
      mt: "16px",
    },
    p: {
      color: "secondary",
      fontSize: "16px",
      lineHeight: 1.87,
    },
  },
  post: {
    mb: "24px",
    mx: ["0", null, null, null, null, "16px"],
    display: "flex",
    flex: ["0 0 100%", null, null, "0 0 calc(33.333% - 24px)"],
    flexDirection: ["column", null, null, null, "row"],
    justifyContent: ["center", null, "flex-start"],
    textAlign: ["center", null, null, "left"],
    ">.image": {
      flexShrink: 0,
      width: "72px",
      height: "72px",
      mx: ["auto", null, null, "0"],
    },
  },
  postContent: {
    ml: ["0", null, null, null, "24px"],
    mt: ["16px", null, null, null, "0"],
    h3: {
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: 1,
      color: "#0F2137",
      mb: "16px",
    },
    p: {
      color: "#343D48",
      lineHeight: 1.87,
      fontSize: ["14px", null, null, "16px"],
      maxWidth: ["100%", "300px", null, "100%"],
      mx: [null, "auto", null],
    },
  },
};
