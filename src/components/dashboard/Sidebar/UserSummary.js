/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

// Add a custom Link
export function UserSummary() {
  const router = useRouter();

  const [activeTab, setActiveTab] = React.useState(0);

  const addLinks = () => {
    console.log("add links");
  };

  const onClickProducts = () => {
    setActiveTab(0);
  };

  const onClickLinks = () => {
    setActiveTab(1);
  };

  return (
    <Container sx={style.container}>
      <Container>
        <Flex sx={style.buttonContainer}>
          <Button sx={style.button} onClick={onClickProducts}>
            Products
          </Button>
          <Button sx={style.button} onClick={onClickLinks}>
            Links
          </Button>
        </Flex>
      </Container>

      <Flex sx={style.summaryView}>
        <Text sx={style.summaryText}>Products</Text>
        <Text sx={style.summaryText}>20</Text>
      </Flex>
      <Flex sx={style.summaryView}>
        <Text sx={style.summaryText}>Links</Text>
        <Text sx={style.summaryText}>10</Text>
      </Flex>
    </Container>
  );
}

const style = {
  container: {
    justifyContent: "flex-start",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    mt: "20px",
  },
  buttonContainer: {
    width: "450px",
    justifyContent: "space-around",
    mb: "10px",
    mx: "auto",
  },
  summaryView: {
    flexDirection: "row",
    justifyContent: "space-between",
    mx: "10%",
    mt: "10px",
  },
  button: {
    backgroundColor: "#FF5151",
    borderRadius: "30px",
    borderColor: "orange",
    width: "150px",
    py: "10px",
    color: "white",
    fontWeight: "bold",
    fontFamily: "Poppins",
    fontSize: "15px",
  },
  summaryText: {
    fontWeight: "bold",
    fontFamily: "Poppins",
    fontSize: "18px",
  },
};
