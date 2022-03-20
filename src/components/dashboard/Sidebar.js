import axios from "axios";
import { nonauthapi } from "lib/api";
import { useRouter } from "next/router";
import React from "react";
import { Flex } from "@chakra-ui/react";
import { SocialModal } from "./Modals/SocialModal";
import { SocialHandles } from "./Sidebar/SocialHandles";
import { UserCard } from "./Sidebar/UserCard";
import { UserSummary } from "./Sidebar/UserSummary";
import sidebarStyles from "styles/Sidebar";
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
        // console.log(error);
      });
  }, [isOpenSocialModal, user]);

  const onCloseSocialModal = (item) => {
    // console.log("close");
    setOpenSocialModal(false);
  };
  const router = useRouter();

  return (
    <Flex
      sx={sidebarStyles.container}
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
