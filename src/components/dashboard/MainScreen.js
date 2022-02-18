/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text } from "theme-ui";

import { useRouter } from "next/router";
import { ShowProducts } from "./MainScreen/ShowProducts";
import { ShowLinks } from "./MainScreen/ShowLinks";
import { AddButtons } from "./MainScreen/AddButtons";

import React from "react";
import { LinksModal } from "./Modals/LinksModal";
import { ProductsModal } from "./Modals/ProductsModal";
import * as Scroll from "react-scroll";
import { Divider } from "@chakra-ui/react";

let Element = Scroll.Element;

// Add a custom Link
export function MainScreen({ links, recos, buckets, user, cookie }) {
  const [isOpenLinksModal, setOpenLinksModal] = React.useState(false);
  const [isOpenProductsModal, setOpenProductsModal] = React.useState(false);

  React.useEffect(() => {
    console.log("sort id ", Math.max(...links.map((o) => o.sort_id), 0));
  }, []);

  const onCloseLinksModal = (item) => {
    console.log("close");
    setOpenLinksModal(false);
  };

  const onCloseProductsModal = (item) => {
    console.log("close");
    setOpenProductsModal(false);
  };

  return (
    <Container sx={{ backgroundColor: "white", px: "0px" }}>
      <LinksModal
        isOpen={isOpenLinksModal}
        closeParent={(item) => onCloseLinksModal(item)}
        buckets={buckets.filter((item) => item.type == "Links")}
        maxSortId={Math.max(...links.map((o) => o.sort_id), 0)}
        user={user}
        cookie={cookie}
      />
      <ProductsModal
        isOpen={isOpenProductsModal}
        closeParent={(item) => onCloseProductsModal(item)}
        buckets={buckets.filter((item) => item.type == "Recos")}
        maxSortId={Math.max(...recos.map((o) => o.sort_id), 0)}
        user={user}
        cookie={cookie}
      />
      <AddButtons
        addLink={() => setOpenLinksModal(true)}
        addProduct={() => setOpenProductsModal(true)}
      />
      <Element name="products">
        <ShowProducts id="products" data={recos} />
      </Element>
      <Divider />
      <Element name="links">
        <ShowLinks id="links" data={links} />
      </Element>
    </Container>
  );
}

const style = {};
