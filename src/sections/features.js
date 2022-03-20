import image1 from "assets/features-1.svg";
import image2 from "assets/features-2.svg";
import image3 from "assets/features-3.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { translation } from "translation";
import SectionHeading from "components/section-heading";
import featuresStyles from "styles/features";

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
    <Box as="section" id="features" sx={featuresStyles.section}>
      <Flex sx={featuresStyles.container}>
        <SectionHeading slogan={text} title={title} />
        <Flex sx={featuresStyles.flex}>
          {posts.map(({ image, title, text }, index) => (
            <Box sx={featuresStyles.post} key={`feature-post-key-${index}`}>
              <Box className="image">
                <Image width="70" height="70" src={image} alt={title} />
              </Box>
              <Box sx={featuresStyles.postContent}>
                <Heading as="h3">{title}</Heading>
                <Text as="p">{text}</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Features;
