import { Divider } from "@chakra-ui/react";
import React from "react";
import * as Scroll from "react-scroll";
import { Flex } from "@chakra-ui/react";
import { ShowLinks } from "./MainScreen/ShowLinks";
import { ShowProducts } from "./MainScreen/ShowProducts";

let Element = Scroll.Element;

// Add a custom Link
export function MainScreen({ links, recos, user, buckets }) {
  const [currentLinks, setCurrentLinks] = React.useState(links);
  const [currentRecos, setCurrentRecos] = React.useState(recos);

  return (
    <>
      <Flex 
        sx={{
          flexDirection: "column",
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
      </Flex>
    </>
  );
}

const style = {};
