/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsPlusCircleFill, BsPlusLg } from "react-icons/bs";

const SocialElement = ({ item }) => (
  <Flex sx={style.socialView} onClick={() => console.log("Trell")}>
    <Image src={item.social_logo} alt={'social logo'} sx={style.social} />
    <Text sx={style.socialText}>
      {item && item.social_name && item.social_name.length > 9
        ? item.social_name.slice(0, 10) + ".."
        : item.social_name}
    </Text>
  </Flex>
);

// Add a custom Link
export function SocialHandles({ social, data }) {
  const router = useRouter();

  const addSocial = () => {
    social();
  };

  return (
    <Container sx={{ px: "10%", mt: "8px", pb: "16px" }}>
      <Text sx={style.heading}>Social Handles</Text>
      <Grid gap={2} columns={[4, 4, 5, 6, 6, 6]} sx={style.grid}>
        {data.map((item, index) => {
          return <SocialElement item={item} key={index} />;
        })}

        <Flex
          sx={{
            justifyContent: "center",
            alignItems: "center",
            mb: "8px",
          }}
        >
          <Button as="addbutton" sx={style.addbutton} onClick={addSocial}>
            <BsPlusCircleFill color="#D7354A" size={30} />
          </Button>
        </Flex>
      </Grid>
    </Container>
  );
}

const style = {
  grid: {},
  heading: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "24px",
    py: "8px",
  },
  socialView: {
    textAlign: "center",
    cursor: "pointer",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  social: {
    width: "24px",
    height: "24px",
  },
  socialText: {
    fontFamily: "Poppins",
    fontSize: "11px",
    color: "#646464",
    textAlign: "center",
  },
  addbutton: {
    cursor: "pointer",
    backgroundColor: "transparent",
  },
  addContainer: {
    textAlign: "center",
  },
  addbuttonText: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "12px",
    color: "#FFFFFF",
  },
};
