import {
  Input,
  Text,
  Box,
  Container,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Progress,
  Button,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { firestore } from "../../lib/firebase";
import { UserContext } from "../../lib/UserDataProvider";
import "@fontsource/poppins";
const Step6 = (props) => {
  const ctx = useContext(UserContext);
  const [showPhone, setShowPhone] = useState(true);
  console.log(ctx.userData);
  useEffect(() => {
    if (ctx.userData.phone === "+91") {
      setShowPhone(false);
    }
  });
  const back = (e) => {
    e.preventDefault();
    props.prevStep();
  };
  const submitHandler = async (e) => {
    const userDoc = firestore.doc(`users/${ctx.userSignInInfo.user.uid}`);
    const batch = firestore.batch();
    batch.set(userDoc, {
      username: ctx.userData.username,
      name: ctx.userData.name,
      mail: ctx.userData.mail,
      phone: ctx.userData.phone,
      affiliateCodes: ctx.userData.affiliateCodes,
    });
    await batch.commit();

    e.preventDefault();
  };

  return (
    <>
      <Container
        fontFamily={"Poppins"}
        maxW={"container.lg"}
        h={"100vh"}
        p={0}
        pt="10"
        align="center"
      >
        <Box
          p={10}
          bg="gray.50"
          display={{ md: "flex" }}
          maxWidth="26rem"
          borderWidth={2}
          margin={4}
        >
          {" "}
          <Stack
            align={{ base: "center", md: "stretch" }}
            textAlign={{ base: "center", md: "left" }}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
          >
            <Progress value={100} size={"sm"} width={100} borderRadius={50} />
            <FormControl>
              <Heading size={"lg"} marginBottom="16px">
                Submit User details
              </Heading>
              <Text>{ctx.userData.name}</Text>
              <Text>{ctx.userData.username}</Text>
              <Text>{ctx.userData.mail}</Text>
              <Text style={{ display: showPhone ? "block" : "none" }}>
                {ctx.userData.phone}
              </Text>
              <Text marginBottom="8px">{ctx.userData.affiliateCodes}</Text>
              <Button
                borderRadius={50}
                color="white"
                bg={"#ff5151"}
                marginRight="6px"
                _hover={{ bg: "#D7354A" }}
                onClick={back}
              >
                Back
              </Button>
              <Button
                borderRadius={50}
                color="white"
                bg={"#ff5151"}
                _hover={{ bg: "#D7354A" }}
                onClick={submitHandler}
              >
                Submit
              </Button>
            </FormControl>
          </Stack>
        </Box>
      </Container>
    </>
  );
};
export default Step6;
