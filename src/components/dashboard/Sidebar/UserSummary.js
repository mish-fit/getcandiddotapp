/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

// Add a custom Link
export function UserSummary() {
  const router = useRouter();

  const addLinks = () => {
    console.log("add links");
  };

  return (
    <Container>
      <Text>Products Recommended</Text>
      <Text>Links</Text>
    </Container>
  );
}
