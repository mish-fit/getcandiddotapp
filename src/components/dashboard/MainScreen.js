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
import { nonauthapi } from "lib/api";
import axios from "axios";

let Element = Scroll.Element;

// Add a custom Link
export function MainScreen({ links, recos, buckets, user, cookie }) {
  const [isOpenLinksModal, setOpenLinksModal] = React.useState(false);
  const [isOpenProductsModal, setOpenProductsModal] = React.useState(false);

  const [currentLinks, setCurrentLinks] = React.useState(links);
  const [currentRecos, setCurrentRecos] = React.useState(recos);
  const [newRecos, setNewRecos] = React.useState([]);
  const [newLinks, setNewLinks] = React.useState({});

  React.useEffect(() => {
    console.log([...links]);
    console.log(newLinks);
    setCurrentLinks([...links, newLinks]);
    // axios
    //   .get(
    //     `${nonauthapi}links`,
    //     { params: { u_id: user[0].u_id } },
    //     { timeout: 3000 }
    //   )
    //   .then((res) => res.data)
    //   .then((responseData) => {
    //     setCurrentLinks(responseData);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, [isOpenLinksModal, links, newLinks]);

  React.useEffect(() => {
    setCurrentRecos([...recos, ...newRecos]);
    // axios
    //   .get(
    //     `${nonauthapi}recos`,
    //     { params: { u_id: user[0].u_id } },
    //     { timeout: 3000 }
    //   )
    //   .then((res) => res.data)
    //   .then((responseData) => {
    //     setCurrentRecos(responseData);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, [isOpenProductsModal, recos, newRecos]);

  const onCloseLinksModal = (item) => {
    console.log("close");
    setOpenLinksModal(false);
  };

  const onCloseProductsModal = (item) => {
    console.log("close");
    setOpenProductsModal(false);
  };

  const newReco = (item) => {
    setNewRecos(item);
  };

  const newLink = (item) => {
    setNewLinks(item);
  };

  return (
    <Container sx={{ backgroundColor: "white", px: "0px" }}>
      <LinksModal
        isOpen={isOpenLinksModal}
        closeParent={(item) => onCloseLinksModal(item)}
        buckets={JSON.parse(buckets)}
        maxSortId={Math.max(...currentLinks.map((o) => o.sort_id), 0)}
        user={user}
        cookie={cookie}
        newItem={(item) => newLink(item)}
      />
      <ProductsModal
        isOpen={isOpenProductsModal}
        closeParent={(item) => onCloseProductsModal(item)}
        buckets={JSON.parse(buckets)}
        maxSortId={Math.max(...currentRecos.map((o) => o.sort_id), 0)}
        user={user}
        cookie={cookie}
        newItem={(item) => newReco(item)}
      />
      <AddButtons
        addLink={() => setOpenLinksModal(true)}
        addProduct={() => setOpenProductsModal(true)}
      />
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
