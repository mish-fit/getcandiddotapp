/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsPlusCircleFill, BsPlusLg } from "react-icons/bs";

// Add a custom Link
export function SocialHandles() {
  const router = useRouter();

  const addLinks = () => {
    console.log("add links");
  };

  return (
    <Container sx={{ px: "10%", mt: "10px", pb: "20px" }}>
      <Text sx={style.heading}>Social Handles</Text>
      <Grid gap={2} columns={[3, 4, 5, 6, 6, 6]} sx={style.grid}>
        <Container sx={style.socialView}>
          <Image src={"social/trell.png"} sx={style.social} />
          <Text sx={style.socialText}>Trell</Text>
        </Container>
        <Container sx={style.socialView}>
          <Image src={"social/koo.png"} sx={style.social} />
          <Text sx={style.socialText}>Koo</Text>
        </Container>
        <Container sx={style.socialView}>
          <Image src={"social/simsim.png"} sx={style.social} />
          <Text sx={style.socialText}>Simsim</Text>
        </Container>
        <Container sx={style.socialView}>
          <Image src={"social/bulbul.png"} sx={style.social} />
          <Text sx={style.socialText}>Bulbul</Text>
        </Container>
        <Container sx={style.socialView}>
          <Image src={"social/koo.png"} sx={style.social} />
          <Text sx={style.socialText}>Koo</Text>
        </Container>
        <Container sx={style.socialView}>
          <Image src={"social/trell.png"} sx={style.social} />
          <Text sx={style.socialText}>Trell</Text>
        </Container>
        <Container sx={style.socialView}>
          <Image src={"social/simsim.png"} sx={style.social} />
          <Text sx={style.socialText}>Simsim</Text>
        </Container>
        <Container sx={style.socialView}>
          <Image src={"social/bulbul.png"} sx={style.social} />
          <Text sx={style.socialText}>Bulbul</Text>
        </Container>
        <Container sx={style.socialView}>
          <Image src={"social/koo.png"} sx={style.social} />
          <Text sx={style.socialText}>Koo</Text>
        </Container>
        <Container sx={style.socialView}>
          <Image src={"social/trell.png"} sx={style.social} />
          <Text sx={style.socialText}>Trell</Text>
        </Container>

        <Flex
          sx={{
            justifyContent: "center",
            alignItems: "center",
            mb: "10px",
          }}
        >
          <Button as="addbutton" sx={style.addbutton}>
            <BsPlusCircleFill color="#FF5151" size={30} />
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
    fontSize: "25px",
    py: "10px",
  },
  socialView: {
    textAlign: "center",
  },
  social: {
    width: "30px",
    height: "30px",
  },
  socialText: {
    fontFamily: "Poppins",
    fontSize: "13px",
    color: "#646464",
  },
  addbutton: {},
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
