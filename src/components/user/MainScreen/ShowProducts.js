/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ProductsCard } from "./ProductsCard";
import { ProductsBucket } from "./ProductsBucket";

// Add a custom Link
export function ShowProducts({ data, bucketData }) {
  const router = useRouter();
  const buckets = [];
  data.map((item) => {
    if (buckets.indexOf(item.bucket) === -1) {
      buckets.push(item.bucket);
    }
  });

  const addLinks = () => {
    // console.log("add links");
  };

  return (
    <Container sx={{ width: "95%" }}>
      {buckets.map((item, index) => {
        return (
          <ProductsBucket
            key={index}
            bucketName={buckets[index]}
            data={data.filter((item) => item.bucket === buckets[index])}
            link={
              bucketData.filter((item) => item.name === buckets[index])[0] || ""
            }
          />
        );
      })}
    </Container>
  );
}

const style = {
  grid: {
    width: "100%",
  },
};
