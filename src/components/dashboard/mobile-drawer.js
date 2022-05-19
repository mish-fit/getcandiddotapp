import Drawer from "components/drawer";
import Logo from "components/logo";
// import { DrawerContext } from "contexts/drawer/drawer.context";
import { auth } from 'lib/firebase';
import { useRouter } from "next/router";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { Box, Button } from "@chakra-ui/react";
import dahsboardMobileDrawerStyes from "styles/dashboardMobileDrawer";
import { useSelector, useDispatch } from "react-redux";
import { setToggle } from "store/actions/drawerActions";
const MobileDrawer = () => {
  // const { state, dispatch } = useContext(DrawerContext);
  
	const dispatch = useDispatch();
	const drawerCtx= useSelector(state => state.drawer);
  const router= useRouter();
  
  const signout = () => {
    auth.signOut();
    router.push('/auth');
  };

  const editProfile = () => {
    router.push("/edit");
  };

  // Toggle drawer
  const toggleHandler = React.useCallback(() => {
    dispatch(setToggle());
  }, [dispatch]);

  return (
    <Drawer
      width="316px"
      drawerHandler={
        <Box sx={dahsboardMobileDrawerStyes.handler}>
          <IoMdMenu size="22px" />
        </Box>
      }
      open={drawerCtx.isOpen}
      toggleHandler={toggleHandler}
      closeButton={<IoMdClose size="24px" color="#02073E" />}
      drawerStyle={dahsboardMobileDrawerStyes.drawer}
      closeBtnStyle={dahsboardMobileDrawerStyes.close}
    >
      <Scrollbars autoHide>
        <Box sx={dahsboardMobileDrawerStyes.content}>
          <Logo />
          <Box sx={dahsboardMobileDrawerStyes.menu}>
          <Button onClick={editProfile} sx={dahsboardMobileDrawerStyes.button}>
              Edit Profile
            </Button>
          </Box>

          <Box sx={dahsboardMobileDrawerStyes.menuFooter}>
            <Button onClick={signout} sx={dahsboardMobileDrawerStyes.button}>
              Sign Out
            </Button>
          </Box>
        </Box>
      </Scrollbars>
    </Drawer>
  );
};

export default MobileDrawer;
