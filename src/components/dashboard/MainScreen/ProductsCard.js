/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

// Add a custom Link
export function ProductsCard() {
  const router = useRouter();

  const addLinks = () => {
    console.log("add links");
  };

  return (
    <Flex sx={style.container}>
      <Flex sx={style.imageMaster}>
        <Flex sx={style.imageContainer}>
          <Image src={"/user/mobile.png"} sx={style.image} />
        </Flex>
      </Flex>
      <Flex sx={style.detailsContainer}>
        <Flex sx={style.content}>
          <Text sx={style.product}>Product Name</Text>
          <Text sx={style.category}>Category Name</Text>
        </Flex>
        <Flex sx={style.buttonContainer}>
          <Flex sx={style.button}>
            <Button sx={style.buttonText}>Buy Now</Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

const style = {
  container: {
    flexDirection: "row",
    p: "10px",
    backgroundColor: "white",
    borderRadius: "2px",
    boxShadow: "0 1px 1px 1px rgba(0, 0, 0, 0.1)",
    mx: "20px",
    width: "450px",
    my: "20px",
  },
  imageMaster: {
    backgroundColor: "white",
  },
  imageContainer: {
    my: "25px",
    mx: "10px",
    backgroundColor: "white",
  },
  image: {
    height: "100px",
    width: "150px",
    borderRadius: "5px",
  },
  detailsContainer: {
    backgroundColor: "white",
    flexDirection: "column",
    ml: "10px",
    width: "250px",
    justifyContent: "space-between",
    py: "10px",
  },
  buttonText: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    borderWidth: "0px",
    color: "white",
    fontWeight: "medium",
    fontFamily: "Poppins",
    fontSize: "15px",
    cursor: "pointer",
  },
  button: {
    backgroundColor: "#FF5151",
    borderRadius: "30px",
    borderColor: "#FF5151",
    py: "5px",
    width: "150px",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "column",
  },
  buttonContainer: {
    justifyContent: "center",
    width: "100%",
  },
  product: {
    fontFamily: "Poppins",
    fontWeight: "medium",
    fontSize: "24px",
    color: "#000",
  },
  category: {
    fontFamily: "Poppins",
    fontWeight: "medium",
    fontSize: "18px",
    color: "#D7354A",
  },
  buynow: {},
};
