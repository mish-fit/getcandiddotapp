import { Flex, Image, Text } from "@chakra-ui/react";
import userCardStyles from "styles/UserCard";

// Add a custom Link
export function UserCard({ data }) {
  // React.useEffect(() => {
  //   console.log("user data", data);
  // }, [data]);

  return (
    <Flex sx={userCardStyles.container}>
      <Flex>
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