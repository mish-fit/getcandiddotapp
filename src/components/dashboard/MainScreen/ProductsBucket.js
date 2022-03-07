/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid, merge } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ProductsCard } from "./ProductsCard";

// Add a custom Link
export function ProductsBucket({ bucketName, data, link, deleteItem }) {
  const router = useRouter();

  const bucketLinkClick = () => {
    console.log("link click", link.link);
    if(link.link.substring(0, 8)!=="https://"){
      window.open("https://"+link.link, "_blank");
    }
    else{
      window.open(link.link, "_blank");
    }
  };

  return (
    <Container sx={style.container}>
      <Flex
        sx={{
          cursor: link.link ? "pointer" : "default",
          backgroundColor: "white",
        }}
        onClick={link.link ? bucketLinkClick : null}
      >
        <Text
          sx={merge(style.heading, {
            color: link.link ? "#2A5DB0" : "#323232",
          })}
        >
          {bucketName}
        </Text>
      </Flex>

      <Flex sx={style.grid}>
        {data.map((item, index) => {
          return <ProductsCard key={index} item={item} deleteItem={(item)=>{
            console.log('recosbucket', item);
            deleteItem(item)}
          } />;
        })}
      </Flex>
    </Container>
  );
}

const style = {
  container: {
    my: "8px",
    width: "100%",
    backgroundColor: "white",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  heading: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "24px",
    py: "8px",
  },
};
