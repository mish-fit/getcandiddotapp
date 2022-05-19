// import { useStickyDispatch, useStickyState } from 'contexts/app/app.provider';
import React, { useCallback } from 'react';
import Sticky from 'react-stickynode';
import { Waypoint } from 'react-waypoint';
import Footer from './footer/footer';
import Header from './header/header';
import { Flex } from '@chakra-ui/react';
import { useSelector, useDispatch } from "react-redux";
import { setSticky, removeSticky, setSidebarSticky, removeSidebarSticky } from 'store/actions/stickyActions';

export default function Layout({ children }) {
  // const isSticky = useStickyState('isSticky');
  // const dispatch = useStickyDispatch();
  const dispatch = useDispatch();
  const stickyCtx = useSelector(state => state.sticky);
  const setStickyHandler = useCallback(() => dispatch(setSticky()), [dispatch]);
  const removeStickyHandler = useCallback(() => dispatch(removeSticky()),[dispatch]);

  const onWaypointPositionChange = ({ currentPosition }) => {
    if (currentPosition === 'above') {
      setStickyHandler();
    }
    if (currentPosition === 'below') {
      removeStickyHandler();
    }
  };

  return (
    <Flex flexDirection={"column"}>
      <Sticky enabled={stickyCtx} innerZ={991}>
        <Header className={`${stickyCtx ? 'sticky' : 'unSticky'}`} />
      </Sticky>
      <Waypoint
        onEnter={removeSticky}
        // onLeave={setSticky}
        onPositionChange={onWaypointPositionChange}
      />
      <main 
        sx={{
          variant: 'layout.main',
        }}
      >
        {children}
      </main>
      <Footer />
    </Flex>
  );
}
