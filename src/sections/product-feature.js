import feature1 from "assets/service-1.svg";
import feature2 from "assets/service-2.svg";
import feature4 from "assets/service-4.svg";
import SectionHeading from "components/section-heading";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { translation } from "translation";
import productFeatureStyles from "styles/product-feature";

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
    <Box sx={productFeatureStyles.section}>
      <Flex sx={productFeatureStyles.container}>
        <SectionHeading slogan={sectionTitle.text} title={sectionTitle.title} />
        <Flex sx={productFeatureStyles.flex}>
          {posts.map(({ label, icon, title, text, button }, index) => (
            <Box key={`feature-key-${index}`} sx={productFeatureStyles.items}>
              <Box className="image">
                <Image src={icon} alt={title} width="70" height="70" />
              </Box>
              <Box sx={productFeatureStyles.itemContent}>
                <Heading as="h3">
                  {title}
                  {label ? <Text as="span">{label}</Text> : null}
                </Heading>
                <Text as="p">{text}</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProductFeature;
