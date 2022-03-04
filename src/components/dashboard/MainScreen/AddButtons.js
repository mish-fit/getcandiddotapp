/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Button, Grid } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";

import { useRouter } from "next/router";
import { BsPlusCircleFill, BsPlusLg } from "react-icons/bs";

// Add a custom Link
export function AddButtons({ addLink, addProduct }) {
  const router = useRouter();

  const addLinks = () => {
    addLink();
  };

  const addProducts = () => {
    addProduct();
  };

  return (
    <Flex as="container" sx={styles.container}>
      <Flex as="addbutton" sx={styles.addbutton} onClick={addProducts}>
        <Flex
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BsPlusCircleFill color="#D7354A" sx={{ mr: "6px" }} />
          <Text sx={styles.addbuttonText}>Recommend Products</Text>
        </Flex>
      </Flex>
      <Flex as="addbutton" sx={styles.addbutton} onClick={addLinks}>
        <Flex
          sx={{
            // ml: ["80px", "80px", "0px", "0px", "0px", "0px"],
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BsPlusCircleFill color="#D7354A" sx={{ mr: "6px" }} />
          <Text sx={styles.addbuttonText}>Custom Links</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

const styles = {
  container: {
    px: ["4%", "4%", "0%", "0%", "0%", "0%"],
    mb: "16px",
    justifyContent: [
      "justify-evenly",
      "justify-evenly",
      "flex-end",
      "flex-end",
      "flex-end",
      "flex-end",
    ],
    alignItems: "flex-start",
    width: ["100%", "100%", null],
  },
  addbutton: {
    mt: "16px",
    borderRadius: "16px",
    borderWidth: "2px",
    borderColor: "#FFF",
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "16px",
    // ml: "16px",
    color: "#D7354A",
    flexDirection: "row",
    cursor: "pointer",
    justifyContent: "center",
    alignItems: "center",
    py: ["2px", "2px", "4px", "8px"],
    px: ["4px", "4px", "8px", "16px"],
    mx: "4px",
    flex: [1, 1, `0 1 auto`],
  },
  addbuttonText: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "16px",
    color: "#D7354A",
  },
  button: {
    fontSize: "16px",
    color: "#ffff",
    fontWeight: 700,
    borderRadius: "8px",
    height: ["48px", null, null, null, null, "60px", "60px"],
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
