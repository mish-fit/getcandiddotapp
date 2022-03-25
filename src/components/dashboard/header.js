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

export default function Header({ menu, menuActive, data }) {
  const { locale } = useRouter();
  const router = useRouter();
  const lang = translation[locale].HeaderSection.Header;
  const [active, setActive] = React.useState(menuActive);
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

  return (
    <DrawerProvider>
      <header sx={dashboardHeaderStyles.header}>
        <Flex sx={dashboardHeaderStyles.container} >
          <Flex as="logo">
            <Link
              path="/"
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
              <Flex onClick={linkCopy}>
                <AiFillCopy
                  sx={{ fontSize: "24px", ml: "8px" }}
                  color={"gray"}
                />
              </Flex>
            </CopyToClipboard>
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
