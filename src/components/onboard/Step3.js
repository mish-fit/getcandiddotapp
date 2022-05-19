import { Button, Flex, FormControl, FormLabel, Heading, Image, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { authapi, s3url } from "lib/api";
import { UploadImageToS3WithNativeSdk } from "lib/aws";
import { firestore } from "lib/firebase";
import { UserContext } from "lib/UserDataProvider";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { Layout } from "./Layout";
import { useSelector, useDispatch } from "react-redux";
import { setName, setUsername, setMail, setPhone, setAbout, setProfileImage, setAffiliateCodes } from "store/actions/authActions";

const Step3 = (props) => {
  const [userDataContext, user] = useContext(UserContext);
	const dispatch = useDispatch();
	const authCtx= useSelector(state => state.auth);
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
  }, [image, authCtx.userData]);
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

    // get image using FormData and sends to s3
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
      // userDataContext.setProfileImage(
      //   s3url + userDataContext.userSignInInfo.user.uid + ".png"
      // );
      dispatch(setProfileImage(s3url + userDataContext.userSignInInfo.user.uid + ".png"));
    }
    if (authCtx.userData.name === "") {
      // userDataContext.setName(userDataContext.userSignInInfo.user.displayName);
      dispatch(setName(userDataContext.userSignInInfo.user.displayName));
      // userDataContext.setMail(userDataContext.userSignInInfo.user.email);
      dispatch(setMail(userDataContext.userSignInInfo.user.email));
    }

    // batches the all the data to be sent to the firestore
    const batch = firestore.batch();
    const usernameDoc = firestore.doc(
      `usernames/${authCtx.userData.username}`
    );
    batch.set(usernameDoc, { uid: userDataContext.userSignInInfo.user.uid });

    const userDoc = firestore.doc(
      `users/${userDataContext.userSignInInfo.user.uid}`
    );
    batch.set(userDoc, {
      username: authCtx.userData.username,
      name: authCtx.userData.name,
      profile_image: new_profile_image,
      mail: authCtx.userData.mail,
      phone: authCtx.userData.phone,
      about: authCtx.userData.about,
      affiliateCodes: [],
    });
    await batch.commit();

    // sends all the auth and onboarding data to the database
    const u_data = {
      u_id: userDataContext.userSignInInfo.user.uid,
      u_name:
        authCtx.userData.name ||
        userDataContext.userSignInInfo.user.displayName,
      u_profile_image: new_profile_image,
      u_cover_image: "",
      u_uuid: authCtx.userData.username,
      u_email: authCtx.userData.mail,
      u_phone: authCtx.userData.phone,
      u_about: authCtx.userData.about,
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
      links: [{ id: 0, name: "My Links", link: "", sort_id: 0 }],
      recos: [{ id: 0, name: "My Recos", link: "", sort_id: 0 }],
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

      // API Call 3: Adding 2 Default Recos
      const recos = [
        {
          id: "",
          u_id: userDataContext.userSignInInfo.user.uid,
          u_name: authCtx.userData.name ||
          userDataContext.userSignInInfo.user.displayName,
          prod_name: "Apple MacBook Air (M1, 2020)",
          cat_name: "Laptop",
          bucket: "My Recos",
          photo: "https://m.media-amazon.com/images/I/71vFKBpKakL._SL1500_.jpg",
          prod_link: "https://amazon.in/Apple-MacBook-Chip-13-inch-512GB/dp/B08N5T6CZ6",
          aff_code: "",
          sort_id: 0,
          others: {},
        },
        {
          id: "",
          u_id: userDataContext.userSignInInfo.user.uid,
          u_name: authCtx.userData.name ||
          userDataContext.userSignInInfo.user.displayName,
          prod_name: "Samsung Galaxy F22",
          cat_name: "Mobile",
          bucket: "My Recos",
          photo: "https://www.mobiledor.com/wp-content/uploads/Samsung-Galaxy-F22-Bangladesh.jpg",
          prod_link: "https://www.amazon.in/SAMSUNG-Galaxy-Denim-Blue-Storage/dp/B09QXBCSPS",
          aff_code: "",
          sort_id: 1,
          others: {},
        }
      ]

      axios(
        {
          method: "post",
          url: `${authapi}recos`,
          data: { recos_array: JSON.stringify(recos)},
          options: origin,
        },
        { timeout: 2000 }
      )
        .then((res) => {
          // console.log(res);
          toast({
            title: "Recos Added",
            description: "",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
        })
        .catch((e) => {
          // console.log(e);
        });


      // API Call 4: Adding 2 Default Links
      const links = [
        {
          id: "",
          u_id: userDataContext.userSignInInfo.user.uid,
          u_name: authCtx.userData.name ||
          userDataContext.userSignInInfo.user.displayName,
          title: "Candid Home",
          link: "https://cndd.in/home",
          bucket: "My Links",
          photo: "",
          font_color: "black",
          shadow_color: "rgba(0,0,0,.5)",
          sort_id: 0,
          others: {},
        },
        {
          id: "",
          u_id: userDataContext.userSignInInfo.user.uid,
          u_name: authCtx.userData.name ||
          userDataContext.userSignInInfo.user.displayName,
          title: "Candid Blog",
          link: "https://medium.com/@cndd_india",
          bucket: "My Links",
          photo: "",
          font_color: "black",
          shadow_color: "rgba(0,0,0,.5)",
          sort_id: 1,
          others: {},
        },
      ]

      axios(
        {
          method: "post",
          url: `${authapi}links`,
          data: { links_array: JSON.stringify(links)},
          options: origin,
        },
        { timeout: 2000 }
      )
        .then((res) => {
          // console.log(res);
          toast({
            title: "Links Added",
            description: "",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
        })
        .catch((e) => {
          // console.log(e);
        });

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
                // bg={"#D7354A"}
                // _hover={{ bg: "#C23043" }}
                // borderRadius={10}
                // color="white"
                // fontSize={"lg"}
                // width={120}
                // height={50}
                variant={'primary'}
                width={120}
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
