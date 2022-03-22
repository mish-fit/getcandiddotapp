/** @jsxRuntime classic */
/** @jsx jsx */
import logo from "assets/CaNDiD_B.png";
import { Link } from "components/link";
import { MainScreen } from "components/user/MainScreen";
import { Sidebar } from "components/user/Sidebar";
import { UserNotFound } from "components/user/UserNotFound";
import { DrawerProvider } from "contexts/drawer/drawer.provider";
import { ampapi, ampdashboard, ampsecret, nonauthapi } from "lib/api";
import Lottie from "lottie-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Button, Container, Flex, Image, jsx } from "theme-ui";
import isURL from "validator/lib/isURL";
import smm from "../public/lottie/smn.json";

import { event, pageview } from "analytics/ga";

export default function User({ links, recos, user, socials, buckets }) {
  const [summary, setSummary] = React.useState({});

  React.useEffect(() => {
    pageview(user[0].uuid);

    setSummary({
      products: recos.filter((item) => isURL(item.prod_link) == true).length,
      links: links.filter((item) => isURL(item.link) == true).length,
    });
  }, [recos, links, user]);

  const router = useRouter();
  if (!user.length) {
    return (
      <Flex sx={{ width: "100%", height: "100%", flex: 1 }}>
        <UserNotFound />
      </Flex>
    );
  }

  if (!recos.length && !links.length) {
    return (
      <div>
        <Flex as="container" sx={styles.container}>
          <Flex as="sidebar" sx={styles.sidebar}>
            <Sidebar socials={socials} user={user} summary={summary} />
          </Flex>
          <Flex as="mainscreen" sx={styles.mainscreen}>
            <Flex
              sx={{
                height: ["400px", "400px", "400px", "700px", "800px", "900px"],
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Lottie animationData={smm} />
            </Flex>
          </Flex>
        </Flex>
      </div>
    );
  }

  const handleCreateLinkButton = () => {
    event("CREATE_YOUR_CNDD_LINK", { new_user: true });
    router.push("/auth");
  };
  return (
    <div>
      <Head>
        <title>{user[0].u_name}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href={user[0].u_profile_image} />
      </Head>

      <DrawerProvider>
        <header sx={styles.header}>
          <Container sx={styles.headerContainer}>
            <Flex as="logo" sx={styles.logoStyles}>
              <Link
                path="/"
                sx={{
                  variant: "links.logo",
                }}
              >
                <Image
                  src={logo}
                  width="120"
                  height="40"
                  sx={styles.logoStyles}
                  alt="startup landing logo"
                />
              </Link>
            </Flex>
            <Flex
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button sx={styles.button} onClick={handleCreateLinkButton}>
                Create your CNDD link!
              </Button>
            </Flex>
          </Container>
        </header>
      </DrawerProvider>

      <Flex as="container" sx={styles.container}>
        <Flex as="sidebar" sx={styles.sidebarTrial}>
          <Sidebar socials={socials} user={user} summary={summary} />
        </Flex>
        <Flex as="mainscreen" sx={styles.mainscreen}>
          <MainScreen
            links={links}
            recos={recos}
            user={user}
            buckets={buckets[0].u_buckets}
          />
        </Flex>
      </Flex>
    </div>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch(
    nonauthapi + "user/byusername" + "?u_uuid=" + context.params.user
  );
  const userDetails = await response.json();

  if (userDetails.length && userDetails[0].u_id) {
    const [
      { value: links, reason: linksError },
      { value: socials, reason: socialsError },
      { value: recos, reason: recosError },
      { value: user, reason: userError },
      { value: buckets, reason: bucketError },
    ] = await Promise.allSettled(
      [
        fetch(nonauthapi + "links" + "?u_id=" + userDetails[0].u_id),
        fetch(nonauthapi + "socials" + "?u_id=" + userDetails[0].u_id),
        fetch(nonauthapi + "recos" + "?u_id=" + userDetails[0].u_id),
        fetch(nonauthapi + "user" + "?u_id=" + userDetails[0].u_id),
        fetch(nonauthapi + "buckets" + "?u_id=" + userDetails[0].u_id),
      ].map((fetchApi) => fetchApi.then((res) => res.json()))
    );

    // console.log(recos, links);

    return {
      props: {
        links,
        socials,
        recos,
        user,
        buckets,
      },
    };
  } else {
    const links = [];
    const socials = [];
    const recos = [];
    const user = [];
    return {
      props: { links, socials, recos, user },
    };
  }
}

const styles = {
  container: {
    mt: "40px",
    flex: 1,
    maxWidth: "100%",
    display: "flex",
    flexDirection: ["column", "column", "row", "row", "row", "row"],
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  mainscreen: {
    flex: [1, 1, 1, 2, 3, 3],
    // backgroundColor: "blue",
  },
  sidebar: {
    p: "10px",
    width: "100%",
    flex: 1,
    pl: "8px",
    pt: "16px",
    alignItems: "center",
    justifyContent: "center",
    position: "sticky",
    bottom: "8px",
    alignSelf: "flex-end",
  },
  sidebarTrial: {
    p: "10px",
    width: "320px",
    //flex: 1,
    pl: "8px",
    pt: "16px",
    alignItems: "center",
    justifyContent: "center",
    position: "sticky",
    bottom: "8px",
    alignSelf: "flex-end",
    // backgroundColor: "red",
  },

  header: {
    color: "text_white",
    fontWeight: "normal",
    py: ["0px", "0px", "0px", "0px", "0px", "0px"],
    width: "100%",
    backgroundColor: "#fff",
    transition: "all 0.4s ease",
    borderBottom: [
      null,
      null,
      "1px solid #E9EDF5",
      "1px solid #E9EDF5",
      "1px solid #E9EDF5",
      "1px solid #E9EDF5",
    ],
    position: ["relative", "relative", "fixed", "fixed", "fixed", "fixed"],
    top: 0,
    left: 0,
    zIndex: 100,
    "&.sticky": {
      backgroundColor: "background",
      color: "text",
      py: "16px",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
    },
  },

  headerContainer: {
    mb: [-124, -124, 0, 0, 0, 0],
    display: "flex",
    alignItems: "center",
    flexDirection: ["column", "column", "row", "row", "row", "row"],
    justifyContent: [
      "center",
      "center",
      "space-between",
      "space-between",
      "space-between",
      "space-between",
    ],
    maxWidth: ["100%", null, null, null, null, "1172px", "1280px"],
  },

  button: {
    mx: 2,
    bg: "#D7354A",
    ":hover": {
      bg: "#C23043",
    },
    borderRadius: [0, 0, 0, 0, 0, 0, 0],
    color: "white",
    fontSize: "12px",
    width: "md",
    height: [30, 30, 30, 30, 30, 30, 30],
    mt: [24, 24, 0, 0, 0, 0],
    justifyContent: "center",
    alignItems: "center",
    p: "2px",
    px: "8px",
  },
  logoStyles: {
    mr: ["200px", "350px", "350px", "50px", "50px", "50px", "50px"],
    ml: [null, null, null, "16px", "16px", "16px", "16px"],
  },
};
