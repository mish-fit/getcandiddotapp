import { Button, Flex, Image, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { AiFillCopy } from "react-icons/ai";
import userCardStyles from "styles/UserCard";
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
    <Flex sx={userCardStyles.container}>
      <Flex sx={userCardStyles.coverPhotoView}>
        <Image
          sx={userCardStyles.coverPhoto}
          alt={"cover img"}
          src={
            data[0].u_cover_image && data[0].u_cover_image != ""
              ? data[0].u_cover_image
              : "/user/cover.png"
          }
        />
      </Flex>
      <Flex as="nav" sx={userCardStyles.nav}>
        <CopyToClipboard text={"cndd.in/" + data[0].u_uuid}>
          <Flex onClick={linkClick} display="inline">
            <Button sx={{ fontSize: "16px" }}>
              {"cndd.in/" + data[0].u_uuid}
            </Button>
          </Flex>
        </CopyToClipboard>
        <CopyToClipboard text={"cndd.in/" + data[0].u_uuid}>
          <Flex onClick={linkCopy} display="inline-block">
            <AiFillCopy sx={{ fontSize: "24px", ml: "8px" }} color={"gray"} />
          </Flex>
        </CopyToClipboard>
      </Flex>
      <Flex sx={userCardStyles.userPhotoView}>
        <Image
          sx={userCardStyles.userImage}
          alt={"profile img"}
          src={
            data[0].u_profile_image && data[0].u_profile_image != ""
              ? data[0].u_profile_image
              : "/user/profile.png"
          }
        />
      </Flex>
      <Flex sx={userCardStyles.userNameView}>
        <Flex>
          <Text sx={userCardStyles.userName}>{data[0].u_name}</Text>
        </Flex>
      </Flex>
      <Flex sx={userCardStyles.aboutMeView}>
        <Flex>
          <Text sx={userCardStyles.aboutMe}>{data[0].u_about}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
