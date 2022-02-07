/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

// Add a custom Link
export function UserSummary() {
  const router = useRouter();

  const addLinks = () => {
    console.log("add links");
  };

  return (
    <Container sx={style.container}>
      <Flex sx={style.buttonContainer}>
        <Button>Products</Button>
        <Button>Links</Button>
      </Flex>
      <Flex sx={style.summaryView}>
        <Text>Products</Text>
        <Text>20</Text>
      </Flex>
      <Flex sx={style.summaryView}>
        <Text>Links</Text>
        <Text>10</Text>
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
  },
  buttonContainer: {
    justifyContent: "space-evenly",
    mr: "20%",
  },
  summaryView: {
    flexDirection: "row",
    justifyContent: "space-between",
    mr: "20%",
  },
};
