import {
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import Logo from "components/logo";
import { DrawerProvider } from "contexts/drawer/drawer.provider";
import { auth } from "lib/firebase";
import { useRouter } from "next/router";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiFillCopy } from "react-icons/ai";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { translation } from "translation";
import MobileDrawer from "./mobile-drawer";
import { Link } from "components/link";
import logo from "assets/CaNDiD_B.png";
import dashboardHeaderStyles from "styles/dashboardHeader";
import { ReactShare } from "./ReactShare";
import { FaShareAlt } from "react-icons/fa";

export default function Header({ menu, menuActive, data }) {
  const { locale } = useRouter();
  const router = useRouter();
  const lang = translation[locale].HeaderSection.Header;
  const [active, setActive] = React.useState(menuActive);
  const [share, setShare] = React.useState(false);
  const toast = useToast();

  const onClickIcon = () => {
    setActive(!active);
    menu(!active);
  };

  const editProfile = () => {
    router.push("/edit");
  };

  const signout = () => {
    auth.signOut();
    router.push("/auth");
  };

  const linkClick = () => {
    window.open("https://www.cndd.in/" + data[0].u_uuid, "_blank");
    toast({
      title: "Link Copied & Redirecting",
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

   const shareHandler = () => {
     setShare(!share);
   }

  return (
    <DrawerProvider>
      <header sx={dashboardHeaderStyles.header}>
        <Flex sx={dashboardHeaderStyles.container} >
          <Flex as="logo">
            <Link
              path="/home"
            >
              <Image
                src={logo}
                width="150px"
                height="50px"
                sx={dashboardHeaderStyles.logodashboardHeaderStyles}
                alt="startup landing logo"
              />
            </Link>
          </Flex>
          <Flex as="nav" sx={dashboardHeaderStyles.nav}>
            <CopyToClipboard text={"cndd.in/" + data[0].u_uuid}>
              <Flex onClick={linkClick}>
                <Text sx={{ fontSize: "18px" }}>
                  {"cndd.in/" + data[0].u_uuid}
                </Text>
              </Flex>
            </CopyToClipboard>
            <CopyToClipboard text={"cndd.in/" + data[0].u_uuid}>
              <Flex onClick={linkCopy} mx= "8px">
                <AiFillCopy
                  sx={{ fontSize: "24px", ml: "8px" }}
                  color={"gray"}
                />
              </Flex>
            </CopyToClipboard>
           <Text onClick={shareHandler} ><FaShareAlt color='#D7354A' _hover={{color:"#C23043"}}/></Text>
          <ReactShare 
            openProp = {!share}
            title={data[0].u_name + " on Candid Reviews"}
            url={"https://www.cndd.in/" + data[0].u_uuid}
            description={"Here are my all recommendations at one place!"}
            hashtags={["cndd", "candidreviews"]}/
          >
          </Flex>
          <Flex id="editprofile">
          <Menu>
            <MenuButton sx={dashboardHeaderStyles.menuButton}>
              <Image
                sx={dashboardHeaderStyles.userImage}
                alt={"profile img"}
                src={
                  data[0].u_profile_image && data[0].u_profile_image != ""
                    ? data[0].u_profile_image
                    : "/user/profile.png"
                }
              />
            </MenuButton>
            <MenuList minWidth="148px">
              <MenuItem onClick={editProfile}>Edit Profile</MenuItem>
              <MenuItem onClick={signout}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
          </Flex>
          <MobileDrawer />
        </Flex>
      </header>
    </DrawerProvider>
  );
}
