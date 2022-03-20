import { Divider } from "@chakra-ui/react";
import React from "react";
import * as Scroll from "react-scroll";
import { Flex } from "@chakra-ui/react";
import { ShowLinks } from "./MainScreen/ShowLinks";
import { ShowProducts } from "./MainScreen/ShowProducts";
import mainScreenStyles from "styles/MainScreen";

let Element = Scroll.Element;

// Add a custom Link
export function MainScreen({ links, recos, user, buckets }) {
  const [currentLinks, setCurrentLinks] = React.useState(links);
  const [currentRecos, setCurrentRecos] = React.useState(recos);

  return (
    <>
      <Flex 
        sx={mainScreenStyles.container}
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
