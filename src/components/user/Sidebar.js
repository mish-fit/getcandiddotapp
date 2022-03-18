import React from "react";
import { Flex } from "@chakra-ui/react";
import { SocialHandles } from "./Sidebar/SocialHandles";
import { UserCard } from "./Sidebar/UserCard";
import { UserSummary } from "./Sidebar/UserSummary";

// Add a custom Link
export function Sidebar({ socials, user, summary }) {
  const [currentSocials, setCurrentSocials] = React.useState(socials);

  React.useEffect(() => {}, []);

  return (
    <Flex
      sx={{
        flexDirection: "column",
        width: ["100%", "100%", null],
        mx: ["1rem", "1rem", "0px", "0px", "0px", "0px"],
        borderRadius: "0px",
        boxShadow: [
          " ",
          " ",
          " ",
          "0 0 4px 1px rgba(0, 0, 0, 0.5)",
          "0 0 4px 1px rgba(0, 0, 0, 0.5)",
          "0 0 4px 1px rgba(0, 0, 0, 0.5)",
        ],
        pb: "8px",
      }}
    >
      <UserCard data={user} />
      <UserSummary data={summary} />
      <SocialHandles data={currentSocials} />
    </Flex>
  );
}
