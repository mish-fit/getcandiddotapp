/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid } from "theme-ui";
import { useRouter } from "next/router";
import { LinksBucket } from "./LinksBucket";

// Add a custom Link
export function ShowLinks() {
  const router = useRouter();

  const addLinks = () => {
    console.log("add links");
  };

  return (
    <Container sx={{ width: "95%" }}>
      <LinksBucket />
      <LinksBucket />
    </Container>
  );
}

const style = {
  grid: {
    width: "100%",
  },
};
