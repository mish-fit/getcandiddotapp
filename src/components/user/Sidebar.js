import React from "react";
import { Flex } from "@chakra-ui/react";
import { SocialHandles } from "./Sidebar/SocialHandles";
import { UserCard } from "./Sidebar/UserCard";
import { UserSummary } from "./Sidebar/UserSummary";
import sidebarStyles from "styles/Sidebar";

// Add a custom Link
export function Sidebar({ socials, user, summary }) {
  const [currentSocials, setCurrentSocials] = React.useState(socials);

  React.useEffect(() => {}, []);

  return (
    <Flex
      sx={sidebarStyles.container}
    >
      <UserCard data={user} />
      <UserSummary data={summary} />
      <SocialHandles data={currentSocials} />
    </Flex>
  );
}
