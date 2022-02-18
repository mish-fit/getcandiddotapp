import {
  Input,
  Text,
  Heading,
  Flex,
  Stack,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Progress,
} from "@chakra-ui/react";
import { auth, googleAuthProvider } from "../../lib/firebase";
import { useState, useContext, useRef, useEffect } from "react";
import { UserContext } from "../../lib/UserDataProvider";
import { AiFillGoogleCircle } from "react-icons/ai";
import "@fontsource/poppins";
import Header from "./Header";
const Step2 = (props) => {
  // const name= useRef();
  // const mail=useRef();
  const [state, setState] = useState({
    name: "",
    mail: "",
  });
  const [showLink, setShowLink] = useState(false);
  const [mailInput, setMailInput] = useState(true);
  const [info, setInfo] = useState(false);
  const ctx = useContext(UserContext);
  // console.log('Step2', ctx.userData);

  useEffect(() => {
    if (ctx.userData.phone === "+91") {
      setMailInput(false);
    }

    setShowLink(false);
    setInfo(false);
  }, [ctx.userSignInInfo.user.mail]);

  const SignInWithGoogle = () => {
    auth.currentUser
      .linkWithPopup(googleAuthProvider)
      .then((result) => {
        // var credential = result.credential;
        // var u = result.user;
        // ctx.setMail(result.user.email);
        setMailInput(false);
        setShowLink(false);
        setInfo(true);
        setState({
          ...state,
          mail: result.user.email,
        });
        console.log("reached");
        // console.log('hh', mail);
        // console.log('jj', result.user.email);
        // ctx.setMail((result.user.email));
        setMailInput(false);
        setInfo(true);
        console.log(result.user);
      })
      .catch((error) => {});
  };

  const next = (e) => {
    e.preventDefault();
    if (ctx.userData.mail === null) {
      ctx.setMail(ctx.userSignInInfo.user.email);
    }
    if (ctx.userData.mail !== null) {
      ctx.setMail(state.mail);
    }
    ctx.setName(state.name);
    // ctx.setMail(state.mail);
    props.nextStep();
  };

  const onChange = (e) => {
    // console.log(state.name, state.mail);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
    const regex = /^[a-z0-9](\.?[a-z0-9]){3,}@gmail\.com$/;
    if (regex.test(e.target.value)) {
      setShowLink(true);
    }
    if (!regex.test(e.target.value)) {
      setShowLink(false);
    }
  };

  const onChangeName = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };
  const back = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  return (
    <>
      <Container
        fontFamily={"Poppins"}
        maxW={"container.md"}
        p={0}
        align="center"
      >
        <Header value={50} />
        <Flex display={{ md: "flex" }}>
          <Stack
            align={{ base: "center", md: "stretch" }}
            textAlign={{ base: "center", md: "left" }}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
          >
            <Flex>
              <form onSubmit={next}>
                {/* <Heading size={'lg'} marginBottom="16px" >Enter User Details</Heading> */}
                <Heading size={"lg"}>Tell Us About You</Heading>
                <FormLabel
                  size={"md"}
                  margin="8px"
                  marginLeft="0px"
                  paddingBottom="1rem"
                >
                  Using your real name will help people confirm that they are
                  interacting with you.
                </FormLabel>
                <FormLabel fontSize={18}>Full Name</FormLabel>
                <Input
                  name="name"
                  bg="white"
                  display="block"
                  focusBorderColor="#E78692"
                  _hover={{ borderColor: "#E78592" }}
                  borderColor="#E78592"
                  height={50}
                  width={250}
                  fontSize={18}
                  marginBottom="8px"
                  defaultValue={ctx.userSignInInfo.user.displayName}
                  type="text"
                  onChange={onChangeName}
                />
                <Flex style={{ display: mailInput ? "block" : "none" }}>
                  <FormLabel fontSize={18}>E-Mail</FormLabel>
                  <Input
                    name="mail"
                    type="email"
                    bg="white"
                    focusBorderColor="#E78692"
                    _hover={{ borderColor: "#E78592" }}
                    borderColor="#E78592"
                    height={50}
                    width={250}
                    fontSize={18}
                    marginBottom="8px"
                    onChange={onChange}
                  />
                </Flex>
                <Text
                  style={{ display: info ? "block" : "none" }}
                  marginBottom="8px"
                >
                  Your email is taken from gmail.
                </Text>
                <Button
                  style={{ display: showLink ? "block" : "none" }}
                  color="white"
                  borderRadius={10}
                  width={250}
                  height={50}
                  fontSize={18}
                  marginBottom="8px"
                  bg={"#1A8BF7"}
                  _hover={{ bg: "#1A7BF7" }}
                  onClick={SignInWithGoogle}
                >
                  {" "}
                  Link Google Account
                </Button>
                <Button
                  bg={"#ff5151"}
                  bg={"#D7354A"}
                  _hover={{ bg: "#C23043" }}
                  borderRadius={10}
                  color="white"
                  width={120}
                  height={50}
                  fontSize={18}
                  marginRight="8px"
                  onClick={back}
                >
                  Back
                </Button>
                <Button
                  bg={"#D7354A"}
                  _hover={{ bg: "#C23043" }}
                  borderRadius={10}
                  color="white"
                  width={120}
                  height={50}
                  fontSize={18}
                  type="submit"
                >
                  Next
                </Button>
              </form>
            </Flex>
          </Stack>
        </Flex>
      </Container>
    </>
  );
};

export default Step2;
