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
import axios from "axios";
import { nonauthapi } from "lib/api";

// Add a custom Link
export function Sidebar({
  socials,
  user,
  summary,
  cookie,
  buckets,
  masterSocials,
}) {
  const [isOpenSocialModal, setOpenSocialModal] = React.useState(false);
  const [currentSocials, setCurrentSocials] = React.useState(socials);
  React.useEffect(() => {}, []);

  React.useEffect(() => {
    axios
      .get(
        `${nonauthapi}socials`,
        { params: { u_id: user[0].u_id } },
        { timeout: 3000 }
      )
      .then((res) => res.data)
      .then((responseData) => {
        setCurrentSocials(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isOpenSocialModal, user]);

  const onCloseSocialModal = (item) => {
    console.log("close");
    setOpenSocialModal(false);
  };
  const router = useRouter();

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        // width:'100%',
        // backgroundColor: "yellow",
        // mr:["50px", "0px","0px","0px","0px","0px"],
        borderRadius: "16px",
        boxShadow: [" " ," " ," " ,"0 0 4px 1px rgba(0, 0, 0, 0.5)","0 0 4px 1px rgba(0, 0, 0, 0.5)","0 0 4px 1px rgba(0, 0, 0, 0.5)"],
      }}
    >
      <SocialModal
        isOpen={isOpenSocialModal}
        closeParent={(item) => onCloseSocialModal(item)}
        user={user}
        cookie={cookie}
        maxSortId={Math.max(...currentSocials.map((o) => o.sort_id), 0)}
        data={currentSocials}
        buckets={buckets}
        masterSocials={masterSocials}
      />
      <UserCard data={user} />
      <UserSummary data={summary} />
      <SocialHandles
        social={() => setOpenSocialModal(true)}
        data={currentSocials}
      />
    </Flex>
  );
}
