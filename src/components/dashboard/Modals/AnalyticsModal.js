import {
  Box,
  Divider,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
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
  return DATA.length ? (
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
              ctr={item.views > 0 ? item.clicks / item.views : 0}
            />
          );
        })}
      </Flex>
      <Divider />
    </Flex>
  ) : null;
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
          color: "#D7354A",
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
            <FiEye color="#0066b2" size={16} sx={{ ml: "6px" }} />
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
  const [rollup, setRollup] = React.useState("LIFETIME");
  const [currentLinkAnalytics, setCurrentLinkAnalytics] =
    React.useState(linkAnalytics);
  const [currentProdAnalytics, setCurrentProdAnalytics] =
    React.useState(prodAnalytics);

  React.useEffect(() => {
    console.log(rollup);
    setCurrentLinkAnalytics(
      linkAnalytics.filter((item, index) => item.rollup === rollup)
    );
    setCurrentProdAnalytics(
      prodAnalytics.filter((item, index) => item.rollup === rollup)
    );
  }, [rollup, linkAnalytics, prodAnalytics]);

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
              <Flex sx={{ flex: 1, alignItems: "center" }}>
                <Text sx={analyticsModalStyles.topHeader}>
                  See your profile insights
                </Text>
              </Flex>
              <Flex sx={{ flex: 1, alignItems: "center" }}>
                <Select
                  value={rollup}
                  onChange={(e) => setRollup(e.target.value)}
                >
                  <option value="LIFETIME">Lifetime</option>
                  <option value="Last 30 days">Last 30 days</option>
                  <option value="Last 15 days">Last 15 days</option>
                  <option value="Last 7 days">Last 7 days</option>
                </Select>
              </Flex>
              <Flex
                sx={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
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
                level="OVERALL ANALYTICS"
                DATA={groupByOverall(
                  currentProdAnalytics,
                  currentLinkAnalytics
                )}
              />
              <AnalyticsBucket
                level="RECO BUCKETS"
                DATA={groupByProduct(currentProdAnalytics, "bucket")}
              />
              <AnalyticsBucket
                level="CATEGORY"
                DATA={groupByProduct(currentProdAnalytics, "cat_name")}
              />
              <AnalyticsBucket
                level="PRODUCT"
                DATA={groupByProduct(currentProdAnalytics, "prod_name")}
              />
              <AnalyticsBucket
                level="LINK BUCKETS"
                DATA={groupByLink(currentLinkAnalytics, "bucket")}
              />
              <AnalyticsBucket
                level="LINK TITLE"
                DATA={groupByLink(currentLinkAnalytics, "title")}
              />
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
