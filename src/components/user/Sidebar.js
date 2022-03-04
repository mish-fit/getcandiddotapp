/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Box } from "theme-ui";

import { UserCard } from "./Sidebar/UserCard";
import { UserSummary } from "./Sidebar/UserSummary";
import { SocialHandles } from "./Sidebar/SocialHandles";

import React from "react";

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
        borderRadius: "16px",
        boxShadow: [
          " ",
          " ",
          " ",
          "0 0 4px 1px rgba(0, 0, 0, 0.5)",
          "0 0 4px 1px rgba(0, 0, 0, 0.5)",
          "0 0 4px 1px rgba(0, 0, 0, 0.5)",
        ],
      }}
    >
      <UserCard data={user} />
      <UserSummary data={summary} />
      <SocialHandles data={currentSocials} />
    </Flex>
  );
}
