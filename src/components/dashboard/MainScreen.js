import { Divider } from "@chakra-ui/react";
import React from "react";
import * as Scroll from "react-scroll";
import { Flex } from "@chakra-ui/react";
import { AddButtons } from "./MainScreen/AddButtons";
import { ShowLinks } from "./MainScreen/ShowLinks";
import { ShowProducts } from "./MainScreen/ShowProducts";
import { EditLinksModal } from "./Modals/EditLinksModal";
import { EditProductsModal } from "./Modals/EditProductsModal";
import { LinksModal } from "./Modals/LinksModal";
import { ProductsModal } from "./Modals/ProductsModal";
import mainScreenStyles from "styles/MainScreen";
import { AnalyticsModal } from "./Modals/AnalyticsModal";

let Element = Scroll.Element;

// Add a custom Link
export function MainScreen({
  links,
  recos,
  buckets,
  user,
  cookie,
  linkAnalytics,
  prodAnalytics,
}) {
  const [isOpenLinksModal, setOpenLinksModal] = React.useState(false);
  const [isOpenProductsModal, setOpenProductsModal] = React.useState(false);
  const [isOpenAnalyticsModal, setOpenAnalyticsModal] = React.useState(false);

  const [isOpenEditLinksModal, setOpenEditLinksModal] = React.useState(false);
  const [editLinkItem, setEditLinkItem] = React.useState({});
  const [isOpenEditProductsModal, setOpenEditProductsModal] =
    React.useState(false);
  const [editProductItem, setEditProductItem] = React.useState({});

  const [currentLinks, setCurrentLinks] = React.useState(links);
  const [currentRecos, setCurrentRecos] = React.useState(recos);
  const [newRecos, setNewRecos] = React.useState([]);
  const [newLinks, setNewLinks] = React.useState([]);
  const [dbLinks, setDbLinks] = React.useState(links);
  const [dbRecos, setDbRecos] = React.useState(recos);

  React.useEffect(() => {
    // console.log("MAINSCREEN UFX");
    // console.log("CUR LINKS", currentLinks);
    // console.log("NEW LINKS", newLinks);
    // console.log("DB LINKS", dbLinks);
    // console.log("CUR PRODUCTS", currentRecos);
    // console.log("Main Screen", editLinkItem);

    setCurrentLinks([...dbLinks, ...newLinks]);
  }, [isOpenLinksModal, dbLinks, newLinks, isOpenEditLinksModal]);

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

  const onCloseAnalyticsModal = (item) => {
    // console.log("close");
    setOpenAnalyticsModal(false);
  };

  const newReco = (item) => {
    setNewRecos([...newRecos, ...item]);
  };

  const newLink = (item) => {
    setNewLinks([...newLinks, ...item]);
  };

  const deleteLink = (item) => {
    // console.log(item);
    // console.log("CUR LINKS", currentLinks);
    // console.log("NEW LINKS", newLinks);
    // console.log("DB LINKS", dbLinks);

    const curLinks = [...currentLinks];
    curLinks.forEach((element, idx) => {
      if (element.id === item) {
        curLinks.splice(idx, 1);
      }
    });
    setCurrentLinks(curLinks);

    const nLinks = [...newLinks];
    nLinks.forEach((element, idx) => {
      if (element.id === item) {
        nLinks.splice(idx, 1);
      }
    });
    setNewLinks(nLinks);

    const dLinks = [...dbLinks];
    dLinks.forEach((element, idx) => {
      if (element.id === item) {
        dLinks.splice(idx, 1);
      }
    });
    setDbLinks(dLinks);
  };

  const deleteReco = (item) => {
    const curRecos = [...currentRecos];
    curRecos.forEach((element, idx) => {
      if (element.id === item) {
        curRecos.splice(idx, 1);
      }
    });
    setCurrentRecos(curRecos);

    const nRecos = [...newRecos];
    nRecos.forEach((element, idx) => {
      if (element.id === item) {
        nRecos.splice(idx, 1);
      }
    });
    setNewRecos(nRecos);

    const dRecos = [...dbRecos];
    dRecos.forEach((element, idx) => {
      if (element.id === item) {
        dRecos.splice(idx, 1);
      }
    });
    setDbRecos(dRecos);
  };

  const onCloseEditLinksModal = (item) => {
    // console.log("close");
    setOpenEditLinksModal(false);
  };

  const editLink = (item) => {
    // console.log("reached", item);
    setEditLinkItem((prev) => item);
    if (item) {
      setOpenEditLinksModal(true);
    }
  };
  // console.log("DB LINKS", dbLinks);

  const editLinkSave = (item) => {
    // console.log("EDIT LINK");
    // console.log("CUR LINKS", currentLinks);
    // console.log("NEW LINKS", newLinks);

    const curLinks = [...currentLinks];
    curLinks.forEach((element, idx) => {
      if (element.id === item.id) {
        // console.log("BEFORE", curLinks);
        curLinks.splice(idx, 1, item);
      }
    });
    setCurrentLinks(curLinks);

    const nLinks = [...newLinks];
    // console.log("nLinks", nLinks);
    nLinks.forEach((element, idx) => {
      // console.log("ELEMENT.ID", element.id);
      if (element.id === item.id) {
        nLinks.splice(idx, 1, item);
      }
    });
    setNewLinks(nLinks);

    const dLinks = [...dbLinks];
    dLinks.forEach((element, idx) => {
      if (element.id === item.id) {
        dLinks.splice(idx, 1, item);
      }
    });
    setDbLinks(dLinks);
    setOpenEditLinksModal(false);
  };

  const onCloseEditProductsModal = (item) => {
    // console.log("close");
    setOpenEditProductsModal(false);
  };

  const editProduct = (item) => {
    // console.log("reached", item);
    setEditProductItem((prev) => item);
    if (item) {
      setOpenEditProductsModal(true);
    }
  };

  const editProductSave = (item) => {
    // console.log("SAVE", item);
    const curRecos = [...currentRecos];
    curRecos.forEach((element, idx) => {
      if (element.id === item.id) {
        // console.log("BEFORE", curRecos);
        curRecos.splice(idx, 1, item);
      }
    });
    setCurrentRecos(curRecos);

    const nRecos = [...newRecos];
    nRecos.forEach((element, idx) => {
      if (element.id === item.id) {
        nRecos.splice(idx, 1, item);
      }
    });
    setNewRecos(nRecos);

    const dRecos = [...dbRecos];
    dRecos.forEach((element, idx) => {
      if (element.id === item.id) {
        dRecos.splice(idx, 1, item);
      }
    });
    setDbRecos(dRecos);

    setOpenEditProductsModal(false);
  };

  return (
    <Flex sx={mainScreenStyles.container}>
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
      <AnalyticsModal
        isOpen={isOpenAnalyticsModal}
        closeParent={(item) => onCloseAnalyticsModal(item)}
        user={user}
        linkAnalytics={linkAnalytics}
        prodAnalytics={prodAnalytics}
      />
      <EditLinksModal
        isOpen={isOpenEditLinksModal}
        closeParent={(item) => onCloseEditLinksModal(item)}
        buckets={JSON.parse(buckets)}
        maxSortId={Math.max(...currentLinks.map((o) => o.sort_id), 0)}
        user={user}
        cookie={cookie}
        editLinkItem={editLinkItem}
        editLinkSave={editLinkSave}
      />
      <EditProductsModal
        isOpen={isOpenEditProductsModal}
        closeParent={(item) => onCloseEditProductsModal(item)}
        buckets={JSON.parse(buckets)}
        maxSortId={Math.max(...currentRecos.map((o) => o.sort_id), 0)}
        user={user}
        cookie={cookie}
        editProductItem={editProductItem}
        editProductSave={editProductSave}
      />
      <AddButtons
        addLink={() => setOpenLinksModal(true)}
        addProduct={() => setOpenProductsModal(true)}
        showAnalytics={() => setOpenAnalyticsModal(true)}
      />

      <Divider />
      <Element name="products">
        <ShowProducts
          id="products"
          data={currentRecos}
          bucketData={JSON.parse(buckets).recos}
          deleteItem={(item) => deleteReco(item)}
          editProductModal={(item) => editProduct(item)}
        />
      </Element>
      <Divider />
      <Element name="links">
        <ShowLinks
          id="links"
          data={currentLinks}
          bucketData={JSON.parse(buckets).links}
          deleteItem={(item) => deleteLink(item)}
          editLinkModal={(item) => editLink(item)}
        />
      </Element>
    </Flex>
  );
}

const style = {};
