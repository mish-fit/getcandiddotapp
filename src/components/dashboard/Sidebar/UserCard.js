import { Button, Flex, Image, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { AiFillCopy } from "react-icons/ai";
// Add a custom Link
export function UserCard({ data }) {
  const router = useRouter();
  const toast = useToast();

  React.useEffect(() => {
    // console.log("user data", data);
  }, [data]);

  const addLinks = () => {
    // console.log("add links");
  };

  const linkClick = () => {
    window.open("https://www.cndd.in/" + data[0].u_uuid, "_blank");
    // router.push(data[0].u_uuid);
    toast({
      title: "Link Copied",
      // description: "Add you Candid link to Instagram Bio",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  const linkCopy = () => {
    toast({
      title: "Link Copied",
      description: "Add you Candid link to Instagram Bio",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Flex sx={style.container}>
      <Flex sx={style.coverPhotoView}>
        <Image
          sx={style.coverPhoto}
          alt={"cover img"}
          src={
            data[0].u_cover_image && data[0].u_cover_image != ""
              ? data[0].u_cover_image
              : "/user/cover.png"
          }
        />
      </Flex>
      <Flex as="nav" sx={style.nav}>
        <CopyToClipboard text={"cndd.in/" + data[0].u_uuid}>
          <Flex onClick={linkClick}>
            <Button sx={{ fontSize: "24px" }}>
              {"cndd.in/" + data[0].u_uuid}
            </Button>
          </Flex>
        </CopyToClipboard>
        <CopyToClipboard mt="6px" text={"cndd.in/" + data[0].u_uuid}>
          <Flex onClick={linkCopy}>
            <AiFillCopy sx={{ fontSize: "24px", ml: "8px" }} color={"gray"} />
          </Flex>
        </CopyToClipboard>
      </Flex>
      <Flex sx={style.userPhotoView}>
        <Image
          sx={style.userImage}
          alt={"profile img"}
          src={
            data[0].u_profile_image && data[0].u_profile_image != ""
              ? data[0].u_profile_image
              : "/user/profile.png"
          }
        />
      </Flex>
      <Flex sx={style.userNameView}>
        <Flex>
          <Text sx={style.userName}>{data[0].u_name}</Text>
        </Flex>
      </Flex>
      <Flex sx={style.aboutMeView}>
        <Flex>
          <Text sx={style.aboutMe}>{data[0].u_about}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

const style = {
  container: {
    flexDirection: "column",
    width: "full",
    mt: ["48px", "48px", "0px", "0px", "0px", "0px"],
    // mr:["-10%","-10%","0%","0%","0%","0%"],
    borderTopRadius: "0px",
  },
  coverPhotoView: {
    flexDirection: "column", 
    backgroundColor: "white",
    width: "full",
    // width: ["0px","0px","0px","448px","448px","448px"],
    // width: ["0px","448px","448px","448px","448px","448px"],
    // height: ["48rem", "248rem","248px","160px","248px","248px"],
    justifyContent: "flex-start",
  },
  userPhotoView: {
    justifyContent: "center",
    // mt: ["24px", "24px", "-48px", "-48px", "0px", "0px"],
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  userNameView: {
    flexDirection: "column",
    mt: "12px",
    justifyContent: "center",
    alignItems: "center",
    px: "auto",
  },
  aboutMeView: {
    alignItems:"center",
    flexDirection: "column",
    mt: "4px",
  },
  aboutMe: {
    textAlign: "center",
    color: "#868686",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontWeight: "400",
  },
  coverPhoto: {
    display: ["none", "inline", "inline", "inline", "inline", "inline"],
    // mt: ["-150px" ,"0px","0px","0px","0px","0px"],
    textAlign: "center",
    borderRadius: "0px",
  },
  userImage: {
    mt: "-36px",
    width: "120px",
    height: "120px",
    backgroundColor: "yellow",
    textAlign: "center",
    borderRadius: "200px",
  },
  userName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "18px",
    fontFamily: "Poppins",
    color: "#323232",
  },

  nav: {
    cursor: "pointer",
    display: ["", "", "none", "none", "none", "none"],
    justifyContent: "center",
    navLink: {
      // textDecoration:"underline",
      fontFamily: "Poppins",
      fontSize: "16px",
      color: "#323232",
      fontWeight: "bold",
      cursor: "pointer",
      lineHeight: "1.2",
      mt: "-64px",
      "&:hover, &.active": {
        color: "primary",
      },
    },
  },
};
