import Drawer from "components/drawer";
import Logo from "components/logo";
import { DrawerContext } from "contexts/drawer/drawer.context";
import React, { useContext } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { Link as ScrollLink } from "react-scroll";
import { Box, Button } from "@chakra-ui/react";
import menuItems from "./header.data";
import headerMobileDrawerStyles from "styles/headerMobileDrawer";

const MobileDrawer = () => {
  const { state, dispatch } = useContext(DrawerContext);

  // Toggle drawer
  const toggleHandler = React.useCallback(() => {
    dispatch({
      type: "TOGGLE",
    });
  }, [dispatch]);

  return (
    <Drawer
      width="316px"
      drawerHandler={
        <Box sx={headerMobileDrawerStyles.handler}>
          <IoMdMenu size="22px" />
        </Box>
      }
      open={state.isOpen}
      toggleHandler={toggleHandler}
      closeButton={<IoMdClose size="24px" color="#02073E" />}
      drawerStyle={headerMobileDrawerStyles.drawer}
      closeBtnStyle={headerMobileDrawerStyles.close}
    >
      <Scrollbars autoHide>
        <Box sx={headerMobileDrawerStyles.content}>
          <Logo />
          <Box sx={headerMobileDrawerStyles.menu}>
            {menuItems.map(({ path, label }, i) => (
              <ScrollLink
                activeClass="active"
                to={path}
                spy={true}
                smooth={true}
                offset={10}
                duration={500}
                key={i}
                onClick={toggleHandler}
              >
                {label}
              </ScrollLink>
            ))}
          </Box>

          <Box sx={headerMobileDrawerStyles.menuFooter}>
            <Button variant="primary" sx={headerMobileDrawerStyles.button}>
              Sign Up!
            </Button>
          </Box>
        </Box>
      </Scrollbars>
    </Drawer>
  );
};

export default MobileDrawer;
