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
import React from "react";
import { SocialModal } from "./Modals/SocialModal";

// Add a custom Link
export function Sidebar({ socials, user, summary }) {
  const [isOpenSocialModal, setOpenSocialModal] = React.useState(false);

  React.useEffect(() => {
    console.log(summary);
  }, []);

  const onCloseSocialModal = (item) => {
    console.log("close");
    setOpenSocialModal(false);
  };
  const router = useRouter();

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.5)",
      }}
    >
      <SocialModal
        isOpen={isOpenSocialModal}
        closeParent={(item) => onCloseSocialModal(item)}
      />
      <UserCard data={user} />
      <UserSummary data={summary} />
      <SocialHandles social={() => setOpenSocialModal(true)} data={socials} />
    </Box>
  );
}
