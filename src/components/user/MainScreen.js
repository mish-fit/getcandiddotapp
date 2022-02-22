/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text } from "theme-ui";

import { ShowProducts } from "./MainScreen/ShowProducts";
import { ShowLinks } from "./MainScreen/ShowLinks";

import React from "react";

import * as Scroll from "react-scroll";
import { Divider } from "@chakra-ui/react";

let Element = Scroll.Element;

// Add a custom Link
export function MainScreen({ links, recos, user }) {
  const [currentLinks, setCurrentLinks] = React.useState(links);
  const [currentRecos, setCurrentRecos] = React.useState(recos);

  return (
    <Container sx={{ backgroundColor: "white", px: "0px" }}>
      <Element name="products">
        <ShowProducts id="products" data={currentRecos} />
      </Element>
      <Divider />
      <Element name="links">
        <ShowLinks id="links" data={currentLinks} />
      </Element>
    </Container>
  );
}

const style = {};
