import {
  Button, Flex, Heading, Input, InputGroup,
  InputLeftAddon, Text, useToast
} from "@chakra-ui/react";
import "@fontsource/poppins";
import firebase from "firebase";
import { auth, googleAuthProvider } from "lib/firebase";
import { useRouter } from "next/router";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Layout } from "./../onboard/Layout";
// Sign in with Phone button
export function SignInOptions() {
  const router = useRouter();
  const [mynumber, setNumber] = useState("+91");
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const [googleShow, setGoogleShow] = useState(true);
  const [final, setFinal] = useState("");
  const [isVerifyClicked, setIsVerifyClicked] = useState(true);
  const [isConfirmClicked, setIsConfirmClicked] = useState(true);

  const toast = useToast();

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider).then((result) => {
      router.push("/onboard");
    });
  };

  // Validate OTP
  const ValidatePhoneOTP = () => {
    setIsConfirmClicked(false);
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        router.push("/onboard");
      })
      .catch((err) => {
        // alert('Wrong code');
        toast({
          title: "Wrong Code",
          description: "",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      });
  };

  const signInWithPhone = async () => {
    if (mynumber === "" || mynumber.length < 10) {
      toast({
        title: "Phone number must have 10 numbers!",
        description: "",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    } else {
      setIsVerifyClicked(false);
      let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
      let newnumber = "+91" + mynumber;
      auth
        .signInWithPhoneNumber(newnumber, verify)
        .then((result) => {
          setFinal(result);
          toast({
            title: "OTP Sent",
            description: "",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          setShow(true);
          setGoogleShow(false);
        })
        .catch((err) => {
          alert(err);
          window.location.reload();
        });
    }
  };

  const setHandler = () => {
    setShow(!show);
    setGoogleShow(!googleShow);
  };
  const handleKeyPressVerify = (e) => {
    if (e.key === "Enter") {
      signInWithPhone();
    }
  };
  const handleKeyPressConfirm = (e) => {
    if (e.key === "Enter") {
      ValidatePhoneOTP();
    }
  };

  const handleTerms =()=>{
    window.open("https://cndd.in/terms", "_blank");
  }
  const handlePrivacy =()=>{
    window.open("https://cndd.in/privacy", "_blank");
  }
  return (
    <Layout value={0}>
      <Flex flexDirection={"column"} w="100%">
      <Flex  flexDirection={"column"} margin={6}>
        <Flex style={{ display: !show ? "block" : "none" }} w="100%">
          <Heading
            size={"lg"}
            textAlign={{ base: "center", md: "left" }}
            mb={"24px"}
          >
            Sign in to CaNDiD!
          </Heading>
          <InputGroup>
            <InputLeftAddon height={50} fontSize={18}>
              {" "}
              +91{" "}
            </InputLeftAddon>
            <Input
              // value={mynumber}
              // variant={"primary"}
              // bg="white"
              // focusBorderColor="#E78692"
              // borderColor={"black"}
              // border="1px"
              // height={50}
              // fontSize={"lg"}
              // width={"full"}
              type="tel"
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              onKeyPress={handleKeyPressVerify}
            />
          </InputGroup>
          <Flex id="recaptcha-container" mt={"8px"}></Flex>
          <Button
            // bg='#D7354A'
            // _hover={{ bg: '#C23043' }}
            // color='white'
            // height={'3.1rem'}
            // width='full'
            // fontSize={'lg'}
            variant={"primary"}
            marginTop="8px"
            marginBottom="24px"
            // spinner={<BeatLoader size={8} color='white' />}
            // onClick={signInWithPhone}
            // isLoading={!isVerifyClicked}
            // loadingText={!isVerifyClicked? 'Sending OTP' : ''}
            // isLoading= { isVerifyClicked ? isLoading : ''}
            onClick={isVerifyClicked ? signInWithPhone : null}
          >
            Verify
          </Button>
        </Flex>
        <Flex style={{ display: show ? "block" : "none" }} w="100%">
          <Heading
            size={"lg"}
            textAlign={{ base: "center", md: "left" }}
            mb={"16px"}
          >
            Verify OTP
          </Heading>
          <Input
            // variant={"primary"}
            // bg="white"
            // focusBorderColor="#E78692"
            // _hover={{ borderColor: "#E78592" }}
            // borderColor="black"
            // height={50}
            // fontSize={18}
            type="tel"
            textAlign={"center"}
            width={{ base: "full", md: "sm" }}
            placeholder={"Enter your OTP"}
            marginBottom="16px"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            onKeyPress={handleKeyPressConfirm}
          />

          <Flex justifyContent={"space-between"}>
            <Button
              // bg={'#D7354A'}
              // _hover={{ bg: '#C23043' }}
              // borderRadius={10}
              // color='white'
              width={120}
              height={50}
              fontSize={'lg'}
              marginTop="8px"
              marginBottom="8px"
              onClick={setHandler}
            >
              Back
            </Button>
            <Button
              display="block"
              variant={'primary'}
              width={120}
              // bg={"#D7354A"}
              // _hover={{ bg: "#C23043" }}
              // height={50}
              // borderRadius={10}
              // fontSize={'lg'}
              marginTop="8px"
              marginBottom="8px"
              onClick={isConfirmClicked ? ValidatePhoneOTP : null}
            >
              Confirm
            </Button>
          </Flex>
        </Flex>
        <Flex style={{ display: googleShow ? "inline" : "none" }} w="100%">
          <Flex style={{ flexDirection: "row", alignItems: "center" }} my="8px">
            <Flex style={{ flex: 1, height: 1, backgroundColor: "black" }} />
            <Flex>
              <Text style={{ width: 50, textAlign: "center" }}>Or</Text>
            </Flex>
            <Flex style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          </Flex>
          <Flex w="100%">
            <Flex w="100%">
              <Button
                variant={"primary"}
                border="1px"
                bg="white"
                color="black"
                _hover={{ bg: "gray.50" }}
								_active={{ bg: 'gray.50' }}
                onClick={signInWithGoogle}
              >
                <Flex mr="8px">
                  <FcGoogle size={25} />{" "}
                </Flex>
                Continue with Google
              </Button>
            </Flex>
          </Flex>
          <Flex mt="16px">
            <Text>
              {" "}
              By signing up, you agree to our
                <Text
                  onClick={handlePrivacy}
                  display={"inline"}
                  textColor={"#D7354A"}
                  cursor={"pointer"}
                >{" "}
                  Privacy{" "}
                </Text>
              and
                <Text
                  onClick={handleTerms}
                  display={"inline"}
                  textColor={"#D7354A"}
                  cursor={"pointer"}
                >{" "}
                  Terms{" "}
                </Text>
            </Text>
          </Flex>
        </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}
