import { Flex, Image, Text } from "@chakra-ui/react";
import logo from "assets/CaNDiD.png";
import React from "react";
import '@fontsource/open-sans'
// Add a custom Link
export function UserNotFound() {
  React.useEffect(() => {}, []);

  const goToSignup = () => {};

  return (
    <Flex
      sx={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        mx: "16px"
      }}
    >
      <Image
        src={logo}
        width="400"
        height="100"
        alt="startup landing logo"
        sx={{ mt: "32px" }}
      />
      <Text
        sx={{
          fontFamily: "Open Sans",
          fontSize: "32px",
          // fontWeight: "bold",
          mt: "128px",
        }}
      >
       The page you are looking for doesn&apos;t exist.
      </Text>
      <Flex
        sx={{
          cursor: "pointer",
          flex: 1,
          mt: "64px",
        }}
        onClick={goToSignup}
      >
        <Text
          sx={{
            fontFamily: "Open Sans",
            fontSize: "18px",
            fontWeight: "bold",

            borderBottomWidth: 3,
            borderBottomColor: "#D95F76",
            color: "#D95F76",
          }}
        >
          Want to claim this page ? Sign up now
        </Text>
      </Flex>
    </Flex>
  );
}
