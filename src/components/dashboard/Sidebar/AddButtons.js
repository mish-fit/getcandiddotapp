/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Button } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";
import { StylesProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";

// Add a custom Link
export function AddButtons() {
  const router = useRouter();

  const addLinks = () => {
    console.log("add links");
  };

  return (
    <Container as="container" sx={styles.container}>
      <Button as="addButton" sx={styles.addButton}>
        Add Social Link
      </Button>
      <Button as="addButton" sx={styles.addButton}>
        Recommend Product
      </Button>
      <Button as="addButton" sx={styles.addButton}>
        Add Custom Link
      </Button>
    </Container>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
  addButton: {
    p: "10px",
    backgroundColor: "red",
    maxWidth: "80%",
    mt: "20px",
    borderRadius: "20px",
    borderWidth: "2px",
    borderColor: "#000",
  },
  button: {
    fontSize: "16px",
    color: "#ffff",
    fontWeight: 700,
    borderRadius: "8px",
    height: ["50px", null, null, null, null, "55px", "60px"],
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
};
