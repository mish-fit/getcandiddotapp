import { Button, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Link as ScrollLink } from "react-scroll";

// Add a custom Link
export function UserSummary({ data }) {
  const router = useRouter();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const [activeTab, setActiveTab] = React.useState(0);

  const addLinks = () => {
    // console.log("add links");
  };

  const onClickProducts = () => {
    setActiveTab(0);
  };

  const onClickLinks = () => {
    setActiveTab(1);
  };

  return (
    <Flex sx={style.container}>
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
    </Flex>
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
    borderRadius: "0px",
    borderColor: "#D7354A",
    py: "2px",
    width: "120px",
    height:"40px",
    borderWidth: 1,
  },
  summaryText: {
    display: ["none", "none", "inline", "inline", "inline", "inline"],
    fontWeight: "bold",
    fontFamily: "Poppins",
    fontSize: "12px",
  },
  buttonText: {
    ':hover': {backgroundColor:"#D7354A", 
    boxShadow: "none", outline:"none"},
    ':focus': {backgroundColor:"#D7354A", 
    boxShadow: "none", outline:"none"},
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    borderWidth: "0px",
    color: "white",
    fontWeight: "bold",
    fontFamily: "Poppins",
    fontSize: "12px",
    cursor: "pointer",
  },
  button1: {
    // ml:"50px",
    backgroundColor: "white",
    borderRadius: "0px",
    borderColor: "#D7354A",
    py: "2px",
    borderWidth: 1,
    width: "120px",
    height:"40px",
  },
  buttonText1: {
    ':hover': {backgroundColor:"white", 
    boxShadow: "none", outline:"none"},
    ':focus': {backgroundColor:"white", 
    boxShadow: "none", outline:"none"},
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    borderWidth: "0px",
    color: "#D7354A",
    fontWeight: "bold",
    fontFamily: "Poppins",
    fontSize: "12px",
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
    fontSize: "12px",
  },
};
