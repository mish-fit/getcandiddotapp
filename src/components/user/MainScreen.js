/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text } from "theme-ui";

import { ShowProducts } from "./MainScreen/ShowProducts";
import { ShowLinks } from "./MainScreen/ShowLinks";

import React from "react";

import * as Scroll from "react-scroll";
import { Divider } from "@chakra-ui/react";
import Head from "next/head";
let Element = Scroll.Element;

// Add a custom Link
export function MainScreen({ links, recos, user, buckets }) {
  const [currentLinks, setCurrentLinks] = React.useState(links);
  const [currentRecos, setCurrentRecos] = React.useState(recos);

  return (
    <>
      <Head>
        <title>User Dashboard</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Container
        sx={{
          px: "0px",
          width: ["100%", "100%", "100%", null],
        }}
      >
        <Element name="products">
          <ShowProducts
            id="products"
            data={currentRecos}
            bucketData={JSON.parse(buckets).recos}
          />
        </Element>
        <Divider />
        <Element name="links">
          <ShowLinks
            id="links"
            data={currentLinks}
            bucketData={JSON.parse(buckets).links}
          />
        </Element>
      </Container>
    </>
  );
}

const style = {};
