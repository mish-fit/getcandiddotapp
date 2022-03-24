import {
  Box,
  Divider,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";

import Head from "next/head";
import React from "react";

import { BsCheckCircleFill, BsPlusCircleFill } from "react-icons/bs";
import { FiEye } from "react-icons/fi";
import { GiClick } from "react-icons/gi";
import { IoAnalytics } from "react-icons/io5";
import analyticsModalStyles from "styles/AnalyticsModal";

const AnalyticsBucket = ({ level, DATA }) => {
  return (
    <Flex sx={{ flexDirection: "column", mt: 8 }}>
      <Box sx={analyticsModalStyles.subHeaderContainer}>
        <Text sx={analyticsModalStyles.subHeader}>{level}</Text>
      </Box>
      <Flex sx={{ flexDirection: "row", flexWrap: "wrap" }}>
        {DATA.map((item, index) => {
          return (
            <AnalyticsCard
              key={index}
              title={item.title}
              views={item.views}
              clicks={item.clicks}
              ctr={item.clicks / item.views}
            />
          );
        })}
      </Flex>
      <Divider />
    </Flex>
  );
};

const AnalyticsCard = ({ title, views, clicks, ctr }) => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        my: 4,
        mx: 4,
        borderWidth: 1,
        width: "330px",
      }}
    >
      <Text
        sx={{
          ml: 4,
          fontWeight: "bold",
          fontSize: 14,
          mt: 2,
          color: "#722F37",
        }}
      >
        {title}
      </Text>

      <Flex sx={analyticsModalStyles.analyticsCard}>
        <Flex sx={analyticsModalStyles.analyticsElement}>
          <Flex
            sx={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FiEye color="#E35335" size={16} sx={{ ml: "6px" }} />
            <Text sx={analyticsModalStyles.analyticsElementTitleView}>
              Views
            </Text>
          </Flex>
          <Text sx={analyticsModalStyles.analyticsElementValueView}>
            {views}
          </Text>
        </Flex>
        <Flex sx={analyticsModalStyles.analyticsElement}>
          <Flex
            sx={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GiClick color="#2AAA8A" size={16} sx={{ ml: "6px" }} />
            <Text sx={analyticsModalStyles.analyticsElementTitleClick}>
              Clicks
            </Text>
          </Flex>
          <Text sx={analyticsModalStyles.analyticsElementValueClick}>
            {clicks}
          </Text>
        </Flex>
        <Flex sx={analyticsModalStyles.analyticsElement}>
          <Flex
            sx={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IoAnalytics color="#E3963E" size={16} sx={{ ml: "6px" }} />
            <Text sx={analyticsModalStyles.analyticsElementTitleCtr}>CTR</Text>
          </Flex>
          <Text sx={analyticsModalStyles.analyticsElementValueCtr}>
            {ctr.toFixed(2) * 100}%
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

// Add a custom Link
export function AnalyticsModal({
  closeParent,
  isOpen,
  user,
  linkAnalytics,
  prodAnalytics,
}) {
  React.useEffect(() => {
    console.log(JSON.stringify(groupByOverall(prodAnalytics, linkAnalytics)));
  }, []);

  const closeModal = () => {
    closeParent(true);
  };

  const groupByOverall = (recos, links) => {
    // Return the end result
    const recoSummary = recos.reduce(
      (result, item) => {
        result.views =
          item.eventname === "PRODUCT_EXTENSION"
            ? result.views + 1
            : result.views;
        result.clicks =
          item.eventname === "PRODUCT_CLICK"
            ? result.clicks + 1
            : result.clicks;

        return result;
      },
      { title: "All Recommendations", views: 0, clicks: 0 }
    );

    const linkSummary = links.reduce(
      (result, item) => {
        result.views =
          item.eventname === "LINK_EXTENSION" ? result.views + 1 : result.views;
        result.clicks =
          item.eventname === "LINK_CLICK" ? result.clicks + 1 : result.clicks;

        return result;
      },
      { title: "All Links", views: 0, clicks: 0 }
    );
    return [recoSummary, linkSummary];
  };

  const groupByProduct = (array, key) => {
    // Return the end result
    return array.reduce((result, item) => {
      const currentBucket = result.find((i) => i.title === item[key]);

      if (currentBucket) {
        currentBucket.views =
          item.eventname === "PRODUCT_EXTENSION"
            ? currentBucket.views + 1
            : currentBucket.views;
        currentBucket.clicks =
          item.eventname === "PRODUCT_CLICK"
            ? currentBucket.clicks + 1
            : currentBucket.clicks;

        return result;
      }

      const newBucket = {
        title: item[key],
        views: item.eventname === "PRODUCT_EXTENSION" ? 1 : 0,
        clicks: item.eventname === "PRODUCT_CLICK" ? 1 : 0,
      };

      return [...result, newBucket];
    }, []);
  };

  const groupByLink = (array, key) => {
    // Return the end result
    return array.reduce((result, item) => {
      const currentBucket = result.find((i) => i.title === item[key]);

      if (currentBucket) {
        currentBucket.views =
          item.eventname === "LINK_EXTENSION"
            ? currentBucket.views + 1
            : currentBucket.views;
        currentBucket.clicks =
          item.eventname === "LINK_CLICK"
            ? currentBucket.clicks + 1
            : currentBucket.clicks;

        return result;
      }

      const newBucket = {
        title: item[key],
        views: item.eventname === "LINK_EXTENSION" ? 1 : 0,
        clicks: item.eventname === "LINK_CLICK" ? 1 : 0,
      };

      return [...result, newBucket];
    }, []);
  };

  return (
    <Flex>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Modal onClose={closeModal} isOpen={isOpen} size="full">
        <ModalOverlay />
        <ModalContent maxW={"760px"}>
          <Flex sx={analyticsModalStyles.container}>
            <Flex sx={analyticsModalStyles.row1}>
              <Text sx={analyticsModalStyles.topHeader}>
                See your profile insights
              </Text>
              <Flex
                sx={analyticsModalStyles.saveContainer}
                onClick={closeModal}
              >
                <Text sx={analyticsModalStyles.save}>Close </Text>
                <BsCheckCircleFill
                  color="#D7354A"
                  size={15}
                  sx={{ ml: "6px" }}
                />
              </Flex>
            </Flex>
            <Flex
              sx={{
                flexDirection: "column",
                maxHeight: "1000px",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  width: "0px",
                  borderRadius: "8px",
                  backgroundColor: `rgba(0, 0, 0, 0.05)`,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: `rgba(0, 0, 0, 0.05)`,
                },
              }}
            >
              <AnalyticsBucket
                level="LIFETIME ANALYTICS"
                DATA={groupByOverall(prodAnalytics, linkAnalytics)}
              />
              <AnalyticsBucket
                level="RECO BUCKETS"
                DATA={groupByProduct(prodAnalytics, "bucket")}
              />
              <AnalyticsBucket
                level="CATEGORY"
                DATA={groupByProduct(prodAnalytics, "cat_name")}
              />
              <AnalyticsBucket
                level="PRODUCT"
                DATA={groupByProduct(prodAnalytics, "prod_name")}
              />
              <AnalyticsBucket
                level="LINK BUCKETS"
                DATA={groupByLink(linkAnalytics, "bucket")}
              />
              <AnalyticsBucket
                level="LINK TITLE"
                DATA={groupByLink(linkAnalytics, "title")}
              />
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
