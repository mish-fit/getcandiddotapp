/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid, Button } from "theme-ui";

import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { useMediaQuery } from "@chakra-ui/react";
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
    <Container sx={style.container}>
      <Flex sx={{ flex: 1, width: "100%" }}>
        <Flex sx={style.buttonContainer}>
          <ScrollLink
            sx={{}}
            to="products"
            spy={true}
            smooth={true}
            offset={-200}
            duration={500}
            key={1}
          >
            <Flex sx={activeTab == 0 ? style.button : style.button1}>
              <Button
                onClick={onClickProducts}
                sx={activeTab == 0 ? style.buttonText : style.buttonText1}
              >
                {isLargerThan768 ? "" : data.products} Products
              </Button>
            </Flex>
          </ScrollLink>
          <ScrollLink
            sx={{}}
            to="links"
            spy={true}
            smooth={true}
            offset={-125}
            duration={500}
            key={2}
          >
            <Flex sx={activeTab > 0 ? style.button : style.button1}>
              <Button
                onClick={onClickLinks}
                sx={activeTab > 0 ? style.buttonText : style.buttonText1}
              >
                {isLargerThan768 ? "" : data.links} Links
              </Button>
            </Flex>
          </ScrollLink>
        </Flex>
      </Flex>

      <Flex sx={style.summaryView}>
        <Text sx={activeTab == 0 ? style.summaryText : style.summaryText1}>
          Products
        </Text>
        <Text sx={activeTab == 0 ? style.summaryText : style.summaryText1}>
          {data.products || "0"}
        </Text>
      </Flex>
      <Flex sx={style.summaryView}>
        <Text sx={activeTab > 0 ? style.summaryText : style.summaryText1}>
          Links
        </Text>
        <Text sx={activeTab > 0 ? style.summaryText : style.summaryText1}>
          {data.links || "0"}
        </Text>
      </Flex>
    </Container>
  );
}

const style = {
  container: {
    width: "full",
    display: "flex",
    flexDirection: "column",
    mt: "16px",
  },
  buttonContainer: {
    justifyContent: "space-evenly",
    flex: 1,
    // mr: ["-25%","0%","0%","0%","0%","0%"],
    my: "2%",
  },
  summaryView: {
    flexDirection: "row",
    justifyContent: "space-between",
    mx: "10%",
    mt: "8px",
  },
  button: {
    backgroundColor: "#D7354A",
    // mr:"50px",
    borderRadius: "24px",
    borderColor: "#D7354A",
    py: "8px",
    width: "148px",
  },
  summaryText: {
    display: ["none", "none", "inline", "inline", "inline", "inline"],
    fontWeight: "bold",
    fontFamily: "Poppins",
    fontSize: "16px",
  },
  buttonText: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    borderWidth: "0px",
    color: "white",
    fontWeight: "bold",
    fontFamily: "Poppins",
    fontSize: "16px",
    cursor: "pointer",
  },
  button1: {
    // ml:"50px",
    backgroundColor: "white",
    borderRadius: "24px",
    borderColor: "#D7354A",
    py: "8px",
    borderWidth: 1,
    width: "148px",
  },
  buttonText1: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    borderWidth: "0px",
    color: "#D7354A",
    fontWeight: "bold",
    fontFamily: "Poppins",
    fontSize: "16px",
    cursor: "pointer",
  },
  summaryView1: {
    flexDirection: "row",
    justifyContent: "space-between",
    mx: "10%",
    mt: "8px",
  },
  summaryText1: {
    display: ["none", "none", "inline", "inline", "inline", "inline"],
    fontWeight: "medium",
    fontFamily: "Poppins",
    fontSize: "16px",
  },
};
