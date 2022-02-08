/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Box } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { UserCard } from "./Sidebar/UserCard";
import { UserSummary } from "./Sidebar/UserSummary";
import { SocialHandles } from "./Sidebar/SocialHandles";
import { AddButtons } from "./MainScreen/AddButtons";

// Add a custom Link
export function Sidebar() {
  const router = useRouter();

  const addLinks = () => {
    console.log("add links");
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "20px",
        boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.5)",
      }}
    >
      <UserCard />
      <UserSummary />
      <SocialHandles />
    </Box>
  );
}
