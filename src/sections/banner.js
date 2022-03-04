import React from "react";
import Image from "next/image";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Label,
  Input,
  Button,
  Link,
} from "theme-ui";

import client1 from "assets/client-1.svg";
import client2 from "assets/client-2.svg";
import client3 from "assets/client-3.svg";
import sectionImage from "assets/banner-1.svg";
import { useRouter } from "next/router";
import axios from "axios";
import { translation } from "translation";

const Banner = () => {
  const { locale } = useRouter();
  const router = useRouter();
  const [signedup, setSignedup] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const signup = (event) => {
    // console.log(email);
    axios
      .post(
        "https://sim4yarfg6.execute-api.ap-south-1.amazonaws.com/prod/leadgen",
        { email_id: email }
      )
      .then((res) => {
        setSignedup(true);
      })
      .catch((err) => {
        // console.log("error in request", err);
      });
  };

  const BANNER_DATA = {
    title: translation[locale].HeaderSection.Title,
    text: translation[locale].HeaderSection.SubTitle,
    subcontent: translation[locale].HeaderSection.SignupTitle,
    image: sectionImage,
    GettingStarted: translation[locale].HeaderSection.GettingStarted,
  };

  React.useEffect(() => {}, []);

  const signin = () => {
    router.push("/auth");
  };

  const { title, text, clients, image, subcontent, GettingStarted } =
    BANNER_DATA;
  return (
    <Box as="section" id="banner" sx={styles.section}>
      <Container sx={styles.container}>
        <Flex sx={styles.flex}>
          <Box sx={styles.content}>
            <Heading as="h2">{title}</Heading>
            <Text as="h4">{text}</Text>

            <Heading as="h3">{subcontent}</Heading>
            <Flex
              sx={{
                flex: 1,
              }}
            >
              <Flex
                sx={{
                  backgroundColor: "#D7354A",
                  p: "16px",
                  width: "60%",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  borderRadius: "30px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#d42a40",
                  },
                }}
                onClick={signin}
              >
                <Text
                  sx={{
                    color: "white",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                  }}
                >
                  {GettingStarted}
                </Text>
              </Flex>
            </Flex>
            {/* {signedup ? (
              <Text as="p">
                {translation[locale].HeaderSection.signedUpSubTitle}
              </Text>
            ) : (
              <Box as="form">
                <Label variant="styles.srOnly" htmlFor="emailaddress">
                  Email Address
                </Label>
                <Input
                  type="text"
                  placeholder={
                    translation[locale].HeaderSection.emailPlaceholder
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // name="emailaddress"
                  // id="email"
                />

                <Flex onClick={signup} sx={styles.signupButton}>
                  <Text sx={styles.signupButtonText}>
                    {translation[locale].HeaderSection.signUpText}
                  </Text>
                </Flex>
              </Box>
            )} */}
          </Box>
          <Box sx={styles.images}>
            <Image src={image} width="740" height="558" alt="section image" />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Banner;

const styles = {
  section: {
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    pt: ["160px", null, null, null, "200px"],
    pb: ["72px", null, null, null, "96px"],
  },
  container: {
    maxWidth: ["100%", null, null, null, null, "1172px", "1280px"],
    position: "relative",
  },
  flex: {
    flexWrap: "wrap",
    gap: 0,
  },
  content: {
    textAlign: ["center", "left", null, "center", "left"],
    flex: ["0 0 100%", null, null, null, "0 0 50%", "0 0 40%"],
    h2: {
      color: "#02073E",
      letterSpacing: "-1px",
      fontSize: ["24px", null, "36px", null, null, "48px"],
      fontFamily: "Poppins",
      lineHeight: 1.45,
      maxWidth: "546px",
      mb: "8px",
      mx: ["0", null, null, "auto"],
    },
    h4: {
      fontSize: ["16px", null, "16px"],
      lineHeight: [2, null, 2.62],
      color: "#02073E",
      maxWidth: "486px",
      fontFamily: "Poppins",
    },
    h3: {
      fontSize: ["8px", null, "16px"],
      marginTop: 10,
      lineHeight: [2, null, 2.62],
      color: "#02073E",
      maxWidth: "486px",
      fontFamily: "Poppins",
    },
    p: {
      fontSize: ["8px", null, "16px"],
      marginTop: 10,
      lineHeight: [2, null, 2.62],
      color: "#d95f76",
      maxWidth: "486px",
      fontStyle: "italic",
      fontFamily: "Poppins",
    },
    form: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: [null, null, null, "center", "flex-start"],
      mt: "24px",
      mb: ["16px", "32px"],
      input: {
        width: ["100%", "216px", "346px", null, "300px", null, "332px"],
        border: "1px solid #E9EDF5",
        borderRadius: "8px",
        mr: ["0", "16px"],
        mb: ["8px", "0"],
        height: ["48px", null, null, null, null, "60px", "60px"],
        fontSize: "16px",
        fontFamily: "Poppins",
        color: "rgba(2,7,62,.4)",
        backgroundColor: "#ffffff",
        px: "24px",
        boxShadow: "none !important",
        outline: "none !important",
        "&::placeholder": {
          color: "rgba(2,7,62,.4)",
        },
        "&:focus": {
          border: "primary",
        },
      },
      button: {
        fontSize: "16px",
        fontFamily: "Poppins",
        color: "#ffff",
        fontWeight: 700,
        borderRadius: "8px",
        height: ["48px", null, null, null, null, "60px", "60px"],
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 32px",
        WebkitAppearance: "none",
        appearance: "none",
        outline: "none",
        cursor: "pointer",
        mx: ["auto", 0],
        transition: "all 500ms ease",
        "&:hover": {
          backgroundColor: "secondary",
        },
      },
    },
  },
  images: {
    flex: ["0 0 100%", null, null, null, "0 0 50%", "0 0 60%"],
    position: "relative",
    left: ["auto", null, null, null, "48px", "96px"],
    mt: ["24px", null, "32px", null, "0"],
  },
  clients: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: ["center", null, null, "center", "flex-start"],
    span: {
      color: "#566272",
      opacity: 0.6,
      flex: ["0 0 100%", "1 1 100%", "0 0 auto"],
      mb: ["8px", null, "0"],
      textAlign: ["center", null, "left"],
    },
    a: {
      display: "flex",
      alignItems: "center",
      ml: ["8px", "16px", null, "16px", "0px", null, "16px"],
      img: {
        display: "block",
      },
    },
  },
  signupButton: {
    borderRadius: "32px",
    backgroundColor: "#D7354A",
    px: "32px",
    py: "8px",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#d42a40",
    },
    cursor: "pointer",
  },
  signupButtonText: {
    fontFamily: "Poppins",
    fontWeight: "medium",
    fontSize: "16px",
    color: "white",
  },
};
