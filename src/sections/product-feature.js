import React from "react";
import Image from "next/image";
import { Container, Link, Box, Grid, Heading, Text } from "theme-ui";
import { IoIosArrowForward } from "react-icons/io";
import SectionHeading from "components/section-heading";
import feature1 from "assets/service-1.svg";
import feature2 from "assets/service-2.svg";
import feature3 from "assets/service-3.svg";
import feature4 from "assets/service-4.svg";
import feature5 from "assets/service-5.svg";
import feature6 from "assets/service-6.svg";
import { useRouter } from "next/router";
import { translation } from "translation";

const ProductFeature = () => {
  const { locale } = useRouter();
  const lang = translation[locale].featuresSection;
  const PRODUCT_FEATURE = {
    sectionTitle: {
      text: lang.subHeader,
      title: lang.Header,
    },
    posts: [
      {
        icon: feature1,
        title: lang.Tile1.Title,
        text: lang.Tile1.Content,
        button: {
          link: "/auth",
          label: lang.signupText,
        },
      },
      {
        label: lang.popularText,
        icon: feature2,
        title: lang.Tile2.Title,
        text: lang.Tile2.Content,
        button: {
          link: "/auth",
          label: lang.signupText,
        },
      },
      {
        icon: feature4,
        title: lang.Tile3.Title,
        text: lang.Tile3.Content,
        button: {
          link: "/auth",
          label: lang.signupText,
        },
      },
    ],
  };
  const { sectionTitle, posts } = PRODUCT_FEATURE;
  return (
    <Box sx={styles.section}>
      <Container>
        <SectionHeading slogan={sectionTitle.text} title={sectionTitle.title} />

        <Grid sx={styles.grid}>
          {posts.map(({ label, icon, title, text, button }, index) => (
            <Box key={`feature-key-${index}`} sx={styles.items}>
              <Box className="image">
                <Image src={icon} alt={title} width="70" height="70" />
              </Box>
              <Box sx={styles.itemContent}>
                <Heading as="h3">
                  {title}
                  {label ? <Text as="span">{label}</Text> : null}
                </Heading>
                <Text as="p">{text}</Text>
                {/* <Link href={button.link}>
                  {button.label}
                  <IoIosArrowForward />
                </Link> */}
              </Box>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductFeature;

const styles = {
  section: {
    pt: ["72px", null, null, null, "96px", null, "148px"],
    pb: ["32px", null, null, null, "72px", null, "96px"],
    backgroundColor: "#F9FAFC",
  },
  grid: {
    gridColumnGap: "24px",
    gridTemplateColumns: ["1fr", null, "1fr 1fr", null, "1fr 1fr 1fr"],
  },
  items: {
    display: "flex",
    mb: ["24px", null, null, null, null, null, "60px"],
    ".image": {
      flexShrink: "0",
      width: "72px",
      height: "72px",
      mr: ["16px", null, null, "24px"],
    },
  },
  itemContent: {
    h3: {
      fontSize: ["17px", null, null, null, "16px"],
      color: "#0F2137",
      fontWeight: 700,
      lineHeight: 1,
      alignItems: "center",
      display: "inline-flex",
      flexWrap: "wrap",
      span: {
        backgroundColor: "#28A5FF",
        fontSize: "12px",
        color: "#fff",
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        lineHeight: "24px",
        borderRadius: "24px",
        letterSpacing: "-0.5px",
        px: "8px",
        ml: ["8px", null, "8px", "8px"],
        mt: ["0", null, "6px", "0"],
      },
    },
    p: {
      color: "#343D48",
      fontSize: ["16px", null, null, "16px"],
      lineHeight: 1.87,
      mt: "6px",
      mb: "8px",
    },
    a: {
      display: "inline-flex",
      alignItems: "center",
      fontSize: "16px",
      color: "#3183FF",
      fontWeight: 500,
      transition: "all 500ms ease",
      "&:hover": {
        color: "black",
      },
      svg: {
        fontSize: "16px",
        ml: "6px",
      },
    },
  },
};
