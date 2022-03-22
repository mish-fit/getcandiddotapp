import { useRouter } from "next/router";
import { BsPlusCircleFill } from "react-icons/bs";
import { IoMdAnalytics } from "react-icons/io";
import { Flex, Text } from "@chakra-ui/react";

// Add a custom Link
export function AddButtons({ addLink, addProduct, showAnalytics }) {
  const router = useRouter();

  const addLinks = () => {
    addLink();
  };

  const addProducts = () => {
    addProduct();
  };

  const analytics = () => {
    showAnalytics();
  };

  return (
    <Flex as="container" sx={styles.container}>
      <Flex>
        <Flex as="addbutton" sx={styles.addbutton} onClick={analytics}>
          <Flex
            sx={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IoMdAnalytics color="#4B0082" />
            <Text sx={styles.showAnalyticsText}>Show Analytics</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <Flex as="addbutton" sx={styles.addbutton} onClick={addProducts}>
          <Flex
            sx={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BsPlusCircleFill color="#D7354A" />
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
            <BsPlusCircleFill color="#D7354A" />
            <Text sx={styles.addbuttonText}>Custom Links</Text>
          </Flex>
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
      "space-between",
      "space-between",
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
    ml: "6px",
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "16px",
    color: "#D7354A",
  },
  showAnalyticsText: {
    ml: "6px",
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "16px",
    color: "#4B0082",
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
