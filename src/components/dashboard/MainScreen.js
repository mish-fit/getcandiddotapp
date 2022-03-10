/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text } from "theme-ui";

import { useRouter } from "next/router";
import { ShowProducts } from "./MainScreen/ShowProducts";
import { ShowLinks } from "./MainScreen/ShowLinks";
import { AddButtons } from "./MainScreen/AddButtons";

import React, { useEffect } from "react";
import { LinksModal } from "./Modals/LinksModal";
import { ProductsModal } from "./Modals/ProductsModal";
import * as Scroll from "react-scroll";
import { Divider } from "@chakra-ui/react";
import { nonauthapi } from "lib/api";
import Head from "next/head";
// import { EditLinksModal } from "./Modals/EditLinksModal";

let Element = Scroll.Element;

// Add a custom Link
export function MainScreen({ links, recos, buckets, user, cookie }) {
  const [isOpenLinksModal, setOpenLinksModal] = React.useState(false);
  const [isOpenProductsModal, setOpenProductsModal] = React.useState(false);
  // const [isOpenEditLinksModal, setOpenEditLinksModal] = React.useState(false);
  // const [editLinkItem, setEditLinkItem] = React.useState({});
  const [currentLinks, setCurrentLinks] = React.useState(links);
  const [currentRecos, setCurrentRecos] = React.useState(recos);
  const [newRecos, setNewRecos] = React.useState([]);
  const [newLinks, setNewLinks] = React.useState([]);
  const [dbLinks, setDbLinks] = React.useState(links);
  const [dbRecos, setDbRecos] = React.useState(recos);

  React.useEffect(() => {
    // console.log([...links]);
    console.log("CUR LINKS", currentLinks);
    console.log("NEW LINKS", newLinks);
    console.log("DB LINKS", dbLinks);
    // console.log("CUR PRODUCTS", currentRecos);
    // console.log("Main Screen", editLinkItem);

    setCurrentLinks([...dbLinks, ...newLinks]);

  }, [isOpenLinksModal, dbLinks, newLinks]);

  React.useEffect(() => {
    setCurrentRecos([...dbRecos, ...newRecos]);

  }, [isOpenProductsModal, dbRecos, newRecos]);

  const onCloseLinksModal = (item) => {
    // console.log("close");
    setOpenLinksModal(false);
  };

  const onCloseProductsModal = (item) => {
    // console.log("close");
    setOpenProductsModal(false);
  };

  const newReco = (item) => {
    setNewRecos([...newRecos, ...item]);
  };

  const newLink = (item) => {
    setNewLinks([...newLinks, ...item]);
  };

  const deleteLink = (item)=>{

    console.log("CUR LINKS", currentLinks);
    console.log("NEW LINKS", newLinks);
    console.log("DB LINKS", dbLinks);

    const curLinks = [...currentLinks];
    curLinks.forEach((element, idx) => {
      if(element.id===item){
        curLinks.splice(idx, 1);
      }
    });
    setCurrentLinks(curLinks);

    const nLinks = [...newLinks];
    nLinks.forEach((element, idx) => {
      if(element.id===item){
        nLinks.splice(idx, 1);
      }
    });
    setNewLinks(nLinks);


    const dLinks = [...dbLinks];
    dLinks.forEach((element, idx) => {
      if(element.id===item){
        dLinks.splice(idx, 1);
      }
    });
    setDbLinks(dLinks);

  }

  const deleteReco= (item)=>{

    const curRecos = [...currentRecos];
    curRecos.forEach((element, idx) => {
      if(element.id===item){
        curRecos.splice(idx, 1);
      }
    });
    setCurrentRecos(curRecos);


    const nRecos = [...newRecos];
    nRecos.forEach((element, idx) => {
      if(element.id===item){
        nRecos.splice(idx, 1);
      }
    });
    setNewRecos(nRecos);


    const dRecos = [...dbRecos];
    dRecos.forEach((element, idx) => {
      if(element.id===item){
        dRecos.splice(idx, 1);
      }
    });
    setDbRecos(dRecos);
  }

  const onCloseEditLinksModal = (item) => {
    // console.log("close");
    setOpenEditLinksModal(false);
  };

  const editLink = (item) => {
    console.log("reached", item);
    setEditLinkItem((prev)=>item)
    if(item){
      setOpenEditLinksModal(true);
    }
  }

  return (
    <Container
      sx={{
        px: "0px",
        width: ["100%", "100%", "100%", null],
      }}
    >
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
      {/* <EditLinksModal
        isOpen={isOpenEditLinksModal}
        closeParent={(item) => onCloseEditLinksModal(item) }
        buckets={JSON.parse(buckets)}
        maxSortId={Math.max(...currentRecos.map((o) => o.sort_id), 0)}
        user={user}
        cookie={cookie}
        newItem={(item) => newReco(item)}
        editLinkItem={editLinkItem}
      /> */}
      <AddButtons
        addLink={() => setOpenLinksModal(true)}
        addProduct={() => setOpenProductsModal(true)}
      />
      <Element name="products">
        <ShowProducts
          id="products"
          data={currentRecos}
          bucketData={JSON.parse(buckets).recos}
          deleteItem={(item)=>deleteReco(item)}
        />
      </Element>
      <Divider />
      <Element name="links">
        <ShowLinks
          id="links"
          data={currentLinks}
          bucketData={JSON.parse(buckets).links}
          deleteItem={(item)=>deleteLink(item)}
          // editLinkModal={(item)=>editLink(item)}
        />
      </Element>
    </Container>
  );
}

const style = {};
