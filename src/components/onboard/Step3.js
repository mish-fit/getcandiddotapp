import {
  Input,
  Heading,
  Box,
  Stack,
  Text,
  Container,
  Flex,
  FormControl,
  useToast,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Progress,
  Image,
  Button,
} from "@chakra-ui/react";
import { useState, useContext, useRef, useEffect } from "react";
import { UserContext } from "lib/UserDataProvider";
import { firestore } from "lib/firebase";
import { useRouter } from "next/router";
import "@fontsource/poppins";
import axios from "axios";
import { UploadImageToS3WithNativeSdk } from "lib/aws";
import { authapi, s3url } from "lib/api";
import { IoCloseCircle } from "react-icons/io5";
import { Layout } from "./Layout";
const Step3 = (props) => {
  const [userDataContext, user] = useContext(UserContext);
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [imageSelected, setImageSelected] = useState(false);
  const [isNextClicked, setIsNextClicked] = useState(true);
  const router = useRouter();
  const toast = useToast();
  let hiddenInput = null;
  useEffect(() => {
    // console.log("Step3", userDataContext.userData);
    // console.log(userDataContext.userSignInInfo.user.uid);
    if (image.preview !== "") {
      setImageSelected(true);
    }
  }, [image, userDataContext.userData]);
  // console.log(userDataContext.userData);
  // console.log(userDataContext.userSignInInfo);

  const handleChange = (e) => {
    e.preventDefault();
    // console.log(e.target.files[0]);
    if (e.target.files.length) {
      setImageSelected(true);
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      handleUpdate({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpdate = (image) => {
    // console.log(image);
    const formData = new FormData();
    formData.append("image", image.raw);
    UploadImageToS3WithNativeSdk(
      image.raw,
      userDataContext.userSignInInfo.user.uid
    );
  };

  const onCancelImage = () => {
    setImageSelected(false);
    setImage({ preview: "", raw: "" });
  };

  const next = async (e) => {
    e.preventDefault();
    setIsNextClicked(false);
    // console.log(image.preview+image.raw+"jj"+imageName+"jj"+imageSelected);
    let new_profile_image = "";
    if (imageSelected) {
      new_profile_image =
        s3url + userDataContext.userSignInInfo.user.uid + ".png";
      userDataContext.setProfileImage(
        s3url + userDataContext.userSignInInfo.user.uid + ".png"
      );
    }
    if (userDataContext.userData.name === "") {
      userDataContext.setName(userDataContext.userSignInInfo.user.displayName);
      userDataContext.setMail(userDataContext.userSignInInfo.user.email);
    }

    const batch = firestore.batch();
    const usernameDoc = firestore.doc(
      `usernames/${userDataContext.userData.username}`
    );
    batch.set(usernameDoc, { uid: userDataContext.userSignInInfo.user.uid });

    const userDoc = firestore.doc(
      `users/${userDataContext.userSignInInfo.user.uid}`
    );
    batch.set(userDoc, {
      username: userDataContext.userData.username,
      name: userDataContext.userData.name,
      profile_image: new_profile_image,
      mail: userDataContext.userData.mail,
      phone: userDataContext.userData.phone,
      about: userDataContext.userData.about,
      affiliateCodes: [],
    });
    await batch.commit();

    const u_data = {
      u_id: userDataContext.userSignInInfo.user.uid,
      u_name:
        userDataContext.userData.name ||
        userDataContext.userSignInInfo.user.displayName,
      u_profile_image: new_profile_image,
      u_cover_image: "",
      u_uuid: userDataContext.userData.username,
      u_email: userDataContext.userData.mail,
      u_phone: userDataContext.userData.phone,
      u_about: userDataContext.userData.about,
      u_gender: "",
      u_dob: "",
      expo_token: "",
      device_token: "",
      u_language: "en",
      aff_ids: [],
      others: {
        twitter: "",
        instagram: "",
      },
    };
    console.log(u_data);
    // API Call 1: User Data
    axios(
      {
        method: "post",
        url: `${authapi}user/add`,
        data: u_data,
        options: origin,
      },
      { timeout: 5000 }
    ).then((res) => {
      console.log("Success", res.data);
      toast({
        title: "New User Added",
        description: "",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    });

    const u_buckets = {
      links: [{ name: "My Links", link: "" }],
      recos: [{ name: "My Recos", link: "" }],
    };
    // API Call 2: Buckets
    const buckets = {
      u_id: userDataContext.userSignInInfo.user.uid,
      u_buckets: u_buckets,
    };
    console.log("buckets", buckets);
    axios(
      {
        method: "post",
        url: `${authapi}buckets`,
        data: buckets,
        options: origin,
      },
      { timeout: 5000 }
    )
      .then((res) => {
        console.log("Success: Buckets Added", res.data);
        router.push("/dashboard");

        // toast({
        // 	title: "Aff codes added",
        // 	description: "",
        // 	status: "success",
        // 	duration: 1000,
        // 	isClosable: true,
        // });
      })
      .catch((e) => console.log(e));
  };

  const back = (e) => {
    e.preventDefault();
    props.nextStep();
  };

  const handleKeyPressNext = (e) => {
    if (e.key === "Enter") {
      next();
    }
  };

  return (
    <>
      <Layout value={75}>
        <Flex flexDirection={"column"} margin={6}>
          <FormControl>
            <Heading size={"lg"} textAlign={{ base: "center", md: "left" }}>
              Add a profile photo
            </Heading>
            <FormLabel
              size={"md"}
              margin="8px"
              marginLeft="0px"
              paddingBottom="1rem"
              textAlign={{ base: "center", md: "left" }}
            >
              Your photo appears on your profile and in places where people
              might interact with you.
            </FormLabel>
            {/* <Flex width={'lg'} height='100px' bg='grey.100' marginBottom='20px'>
              	<Button as="Input" type='file' width={{base:'md',md:'lg'}} height='100px' fontSize={15} text='Click to upload' onChange={handleChange}></Button>
							</Flex> */}

            <Flex sx={style.leftContainer} onKeyPress={handleKeyPressNext}>
              <Flex sx={style.imageContainer}>
                {image.preview ? (
                  <Flex
                    sx={{
                      position: "relative",
                      flex: 1,
                    }}
                  >
                    <Flex onClick={() => hiddenInput.click()} sx={{ flex: 1 }}>
                      <Image
                        src={image.preview}
                        alt="dummy"
                        sx={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "100%",
                        }}
                      />
                    </Flex>
                    <Flex
                      sx={{
                        position: "absolute",
                        top: "-5%",
                        right: "-5%",
                        zIndex: 101,
                        cursor: "pointer",
                      }}
                      onClick={onCancelImage}
                    >
                      <IoCloseCircle size={20} color="gray" />
                    </Flex>
                  </Flex>
                ) : (
                  <Flex
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      flex: 1,
                    }}
                    onClick={() => hiddenInput.click()}
                  >
                    <Text sx={{ fontSize: "15px" }}>
                      Upload Profile Picture
                    </Text>
                  </Flex>
                )}
                <input
                  accept="image/png, image/jpeg, image/jpg"
                  type="file"
                  hidden
                  onChange={handleChange}
                  ref={(el) => (hiddenInput = el)}
                />
              </Flex>
            </Flex>
            {/* <Input type='file' bg='white' onChange={handleChange}/> */}
            {/* <Flex style={{ display: imageSelected ? 'block' : 'none' }} marginLeft='2px' marginBottom='10px'>
								<Image src={image.preview} width="240" height="240" alt="profile picture" />
							</Flex> */}

            {/* <Button
								bg={'#D7354A'}
								_hover={{ bg: '#C23043' }}
								borderRadius={10}
								color='white'
								width={250}
								height={50}
								fontSize={18}
								marginTop='8px'
								marginBottom='8px'
								type='submit'
							>
								Upload
							</Button> */}
            <Flex justifyContent={"space-between"}>
              <Button
                // bg={'#D7354A'}
                // _hover={{ bg: '#C23043' }}
                // borderRadius={10}
                // color='white'
                fontSize={"lg"}
                width={120}
                height={50}
                onClick={next}
              >
                Skip
              </Button>
              <Button
                bg={"#D7354A"}
                _hover={{ bg: "#C23043" }}
                borderRadius={10}
                color="white"
                fontSize={"lg"}
                width={120}
                height={50}
                mr={{ base: "0", md: "190" }}
                onClick={isNextClicked ? next : null}
                // onClick={next}
              >
                Submit
              </Button>
            </Flex>
          </FormControl>
        </Flex>
      </Layout>
    </>
  );
};

const style = {
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: "100%",
    borderColor: "#C23043",
    _hover: { bg: "gray.50" },
    borderWidth: 1,
    position: "relative",
    cursor: "pointer",
  },
  leftContainer: {
    margin: "20px",
    justifyContent: "center",
    alignItems: "center",
    width: "250px",
    height: "250px",
    mx: "18%",
  },
};

export default Step3;
