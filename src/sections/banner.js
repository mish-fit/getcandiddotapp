import sectionImage from "assets/banner-1.svg";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text
} from "@chakra-ui/react";
import { translation } from "translation";
import bannerStyles from "styles/banner";

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
    <Flex as="section" id="banner" sx={bannerStyles.section}>
      <Flex sx={bannerStyles.container}>
        <Flex sx={bannerStyles.flex}>
          <Flex sx={bannerStyles.content}>
            <Heading as="h2">{title}</Heading>
            <Text as="h4">{text}</Text>
            <Heading as="h3">{subcontent}</Heading>
            <Flex sx={bannerStyles.gettingStartedFlex}>
              <Button
                sx={bannerStyles.gettingStartedButton}
                onClick={signin}>
                {GettingStarted}
              </Button>
            </Flex>
          </Flex>
          <Flex sx={bannerStyles.images}>
            <Image src={image} width="740" height="558" alt="section image" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Banner;