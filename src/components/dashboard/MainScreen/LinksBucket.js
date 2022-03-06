/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid, merge } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ProductsCard } from "./ProductsCard";
import { LinksCard } from "./LinksCard";

// Add a custom Link
export function LinksBucket({ bucketName, data, link }) {
  const router = useRouter();

  const bucketLinkClick = () => {
    console.log("link click", link.link);
    window.open(link.link, "_blank");
  };

  return (
    <Container sx={style.container}>
      <Flex
        sx={{ cursor: link ? "pointer" : "default", backgroundColor: "white" }}
        onClick={link ? bucketLinkClick : null}
      >
        <Text
          sx={merge(style.heading, { color: link ? "#2A5DB0" : "#323232" })}
        >
          {bucketName}
        </Text>
      </Flex>
      <Flex sx={style.grid}>
        {data.map((item, index) => {
          return <LinksCard key={index} item={item} />;
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
