/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid } from "theme-ui";
import { useRouter } from "next/router";
import { LinksBucket } from "./LinksBucket";

// Add a custom Link
export function ShowLinks({ data }) {
  const router = useRouter();
  const buckets = [];
  data.map((item) => {
    if (buckets.indexOf(item.bucket) === -1) {
      buckets.push(item.bucket);
    }
  });

  const addLinks = () => {
    console.log("add links");
  };

  return (
    <Container sx={{ width: "95%" }}>
      {buckets.map((item, index) => {
        return (
          <LinksBucket
            key={index}
            bucketName={buckets[index]}
            data={data.filter((item) => item.bucket === buckets[index])}
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
