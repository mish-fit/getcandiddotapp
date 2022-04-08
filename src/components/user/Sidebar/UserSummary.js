import { Button, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { Link as ScrollLink } from "react-scroll";
import userSummaryStyles from "styles/UserSummary";

// Add a custom Link
export function UserSummary({ data }) {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [activeTab, setActiveTab] = React.useState(0);

  const onClickProducts = () => {
    setActiveTab(0);
  };

  const onClickLinks = () => {
    setActiveTab(1);
  };

  return (
    <Flex sx={userSummaryStyles.container}>
      <Flex sx={userSummaryStyles.flex}>
        <Flex sx={userSummaryStyles.buttonContainer}>
          <ScrollLink
            to="products"
            spy={true}
            smooth={true}
            offset={-200}
            duration={500}
            key={1}
          >
            <Flex sx={activeTab == 0 ? userSummaryStyles.button : userSummaryStyles.button1}>
              <Button
                onClick={onClickProducts}
                sx={activeTab == 0 ? userSummaryStyles.buttonText : userSummaryStyles.buttonText1}
              >
                {isLargerThan768 ? "" : data.products} Products
              </Button>
            </Flex>
          </ScrollLink>
          <ScrollLink
            to="links"
            spy={true}
            smooth={true}
            offset={-125}
            duration={500}
            key={2}
          >
            <Flex sx={activeTab > 0 ? userSummaryStyles.button : userSummaryStyles.button1}>
              <Button
                onClick={onClickLinks}
                sx={activeTab > 0 ? userSummaryStyles.buttonText : userSummaryStyles.buttonText1}
              >
                {isLargerThan768 ? "" : data.links} Links
              </Button>
            </Flex>
          </ScrollLink>
        </Flex>
      </Flex>

      <Flex sx={userSummaryStyles.summaryView}>
        <Text sx={activeTab == 0 ? userSummaryStyles.summaryText : userSummaryStyles.summaryText1}>
          Products
        </Text>
        <Text sx={activeTab == 0 ? userSummaryStyles.summaryText : userSummaryStyles.summaryText1}>
          {data.products || "0"}
        </Text>
      </Flex>
      <Flex sx={userSummaryStyles.summaryView}>
        <Text sx={activeTab > 0 ? userSummaryStyles.summaryText : userSummaryStyles.summaryText1}>
          Links
        </Text>
        <Text sx={activeTab > 0 ? userSummaryStyles.summaryText : userSummaryStyles.summaryText1}>
          {data.links || "0"}
        </Text>
      </Flex>
    </Flex>
  );
}