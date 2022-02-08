/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Button, Grid } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";

import { useRouter } from "next/router";
import { BsPlusCircleFill, BsPlusLg } from "react-icons/bs";

// Add a custom Link
export function AddButtons() {
  const router = useRouter();

  const addLinks = () => {
    console.log("add links");
  };

  return (
    <Flex as="container" sx={styles.container}>
      <Button as="addbutton" sx={styles.addbutton}>
        <Flex
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BsPlusCircleFill color="#FF5151" sx={{ mr: "5px" }} />
          <Text sx={styles.addbuttonText}>Recommend Products</Text>
        </Flex>
      </Button>
      <Button as="addbutton" sx={styles.addbutton}>
        <Flex
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BsPlusCircleFill color="#FF5151" sx={{ mr: "5px" }} />
          <Text sx={styles.addbuttonText}>Custom Links</Text>
        </Flex>
      </Button>
    </Flex>
  );
}

const styles = {
  container: {
    px: "10%",
    mb: "20px",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  addbutton: {
    mt: "20px",
    borderRadius: "20px",
    borderWidth: "2px",
    borderColor: "#000",
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "18px",
    ml: "15px",
    color: "#FF5151",
    flexDirection: "row",
  },
  addbuttonText: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "18px",
    color: "#FF5151",
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