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
          link: "/signup.html",
          label: lang.signupText,
        },
      },
      {
        label: lang.popularText,
        icon: feature2,
        title: lang.Tile2.Title,
        text: lang.Tile2.Content,
        button: {
          link: "/signup.html",
          label: lang.signupText,
        },
      },
      {
        icon: feature4,
        title: lang.Tile3.Title,
        text: lang.Tile3.Content,
        button: {
          link: "/signup.html",
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
                <Link href={button.link}>
                  {button.label}
                  <IoIosArrowForward />
                </Link>
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
    pt: ["70px", null, null, null, "100px", null, "150px"],
    pb: ["40px", null, null, null, "70px", null, "90px"],
    backgroundColor: "#F9FAFC",
  },
  grid: {
    gridColumnGap: "30px",
    gridTemplateColumns: ["1fr", null, "1fr 1fr", null, "1fr 1fr 1fr"],
  },
  items: {
    display: "flex",
    mb: ["30px", null, null, null, null, null, "60px"],
    ".image": {
      flexShrink: "0",
      width: "70px",
      height: "70px",
      mr: ["20px", null, null, "30px"],
    },
  },
  itemContent: {
    h3: {
      fontSize: ["17px", null, null, null, "18px"],
      color: "#0F2137",
      fontWeight: 700,
      lineHeight: 1,
      alignItems: "center",
      display: "inline-flex",
      flexWrap: "wrap",
      span: {
        backgroundColor: "#28A5FF",
        fontSize: "13px",
        color: "#fff",
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        lineHeight: "26px",
        borderRadius: "30px",
        letterSpacing: "-0.5px",
        px: "10px",
        ml: ["10px", null, "10px", "10px"],
        mt: ["0", null, "5px", "0"],
      },
    },
    p: {
      color: "#343D48",
      fontSize: ["14px", null, null, "16px"],
      lineHeight: 1.87,
      mt: "5px",
      mb: "10px",
    },
    a: {
      display: "inline-flex",
      alignItems: "center",
      fontSize: "15px",
      color: "#3183FF",
      fontWeight: 500,
      transition: "all 500ms ease",
      "&:hover": {
        color: "black",
      },
      svg: {
        fontSize: "17px",
        ml: "5px",
      },
    },
  },
};
