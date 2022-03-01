import React, { useContext } from "react";
import { Button, Box } from "theme-ui";
import { Scrollbars } from "react-custom-scrollbars";
import Drawer from "components/drawer";
import { DrawerContext } from "contexts/drawer/drawer.context";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { Link as ScrollLink } from "react-scroll";
import menuItems from "./header.data";
import Logo from "components/logo";
import { auth } from 'lib/firebase';
import { useRouter } from "next/router";

const MobileDrawer = () => {
  const { state, dispatch } = useContext(DrawerContext);
  const router= useRouter();
  
  const signout = () => {
    auth.signOut();
    router.push('/auth');
  };

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
        <Box sx={styles.handler}>
          <IoMdMenu size="22px" />
        </Box>
      }
      open={state.isOpen}
      toggleHandler={toggleHandler}
      closeButton={<IoMdClose size="24px" color="#02073E" />}
      drawerStyle={styles.drawer}
      closeBtnStyle={styles.close}
    >
      <Scrollbars autoHide>
        <Box sx={styles.content}>
          <Logo />
          <Box sx={styles.menu}>
          </Box>

          <Box sx={styles.menuFooter}>
            <Button variant="primary" onClick={signout} sx={styles.button}>
              Sign Out
            </Button>
          </Box>
        </Box>
      </Scrollbars>
    </Drawer>
  );
};

const styles = {
  handler: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: "0",
    width: "24px",

    "@media screen and (min-width: 960px)": {
      display: "none",
    },
  },

  drawer: {
    width: "100%",
    height: "100%",
    background: "#fff",
  },

  close: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "24px",
    right: "24px",
    zIndex: "1",
  },

  content: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    pt: "24px",
    pb: "32px",
    px: "24px",
  },

  menu: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: "24px",

    a: {
      fontSize: "16px",
      fontWeight: "400",
      color: "black",
      py: "6px",
      cursor: "pointer",
    },
  },

  menuFooter: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mt: "auto",
  },

  button: {
    fontSize: "16px",
    fw: "700",
    height: "48px",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    py: "0",
    backgroundColor: "black",
    color: "#fff",
  },
};

export default MobileDrawer;
