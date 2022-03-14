/** @jsxRuntime classic */
/** @jsx jsx */
import { Container, Flex, Image, jsx, Text } from "theme-ui";

// Add a custom Link
export function UserCard({ data }) {
  // React.useEffect(() => {
  //   console.log("user data", data);
  // }, [data]);

  return (
    <Container sx={style.container}>
      <Container sx={style.coverPhotoView}>
        <Image
          sx={style.coverPhoto}
          alt={"cover img"}
          src={
            data[0].u_cover_image && data[0].u_cover_image != ""
              ? data[0].u_cover_image
              : "/user/cover.png"
          }
        />
      </Container>
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
      <Container sx={style.userNameView}>
        <Container>
          <Text sx={style.userName}>{data[0].u_name}</Text>
        </Container>
      </Container>
      <Container sx={style.aboutMeView}>
        <Container>
          <Text sx={style.aboutMe}>{data[0].u_about}</Text>
        </Container>
      </Container>
    </Container>
  );
}

const style = {
  container: {
    width: "full",
    mt: ["48px", "48px", "0px", "0px", "0px", "0px"],
    // mr:["-10%","-10%","0%","0%","0%","0%"],
    borderTopRadius: "0px",
  },
  coverPhotoView: {
    borderTopRadius: "0px",
    backgroundColor: "white",
    mt: "0px",
    width: "full",
    // width: ["0px","0px","0px","448px","448px","448px"],
    // width: ["0px","448px","448px","448px","448px","448px"],
    // height: ["48rem", "248rem","248px","160px","248px","248px"],
    justifyContent: "flex-start",
  },
  userPhotoView: {
    justifyContent: "center",
    mt: ["0px", "-48px", "-48px", "-48px", "0px", "0px"],
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    borderRadius: "0px",
  },
  userNameView: {
    mt: "12px",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    px: "auto",
  },
  aboutMeView: {
    width: "90%",
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
    display: ["", "none", "none", "none", "none"],
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
