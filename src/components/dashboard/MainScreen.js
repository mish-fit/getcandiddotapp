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

// Add a custom Link
export function MainScreen() {
  const [isOpenLinksModal, setOpenLinksModal] = React.useState(false);
  const [isOpenProductsModal, setOpenProductsModal] = React.useState(false);

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
      />
      <ProductsModal
        isOpen={isOpenProductsModal}
        closeParent={(item) => onCloseProductsModal(item)}
      />
      <AddButtons
        addLink={() => setOpenLinksModal(true)}
        addProduct={() => setOpenProductsModal(true)}
      />
      <ShowProducts />
      <ShowLinks />
    </Container>
  );
}

const style = {};
