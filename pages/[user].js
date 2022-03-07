/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Button, Text, Divider } from "theme-ui";
import React, { useContext, useState, useEffect } from "react";
import Logo from "components/logo";
import { nonauthapi } from "lib/api";
import { Sidebar } from "components/user/Sidebar";
import { MainScreen } from "components/user/MainScreen";
import Lottie from "lottie-react";
import smm from "../public/lottie/smn.json";
import { UserNotFound } from "components/user/UserNotFound";
import Head from "next/head";
import { DrawerProvider } from "contexts/drawer/drawer.provider";
import { useRouter } from "next/router";
export default function User({ links, recos, user, socials, buckets }) {
  const [summary, setSummary] = React.useState({});

  React.useEffect(() => {
    setSummary({ products: recos.length, links: links.length });
  }, []);

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
    router.push("/auth");
  };
  return (
    <div>
      <Head>
        <title>User Screen</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <DrawerProvider>
        <header sx={styles.header}>
          <Container sx={styles.headerContainer}>
            <Flex as="logo" sx={styles.logoStyles}>
              <Logo />
            </Flex>
            <Flex>
              <Button sx={styles.button} onClick={handleCreateLinkButton}>
                Create your CNDD link!
              </Button>
            </Flex>
          </Container>
        </header>
      </DrawerProvider>

      <Flex as="container" sx={styles.container}>
        <Flex as="sidebar" sx={styles.sidebar}>
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

    console.log(recos, links);

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
    mt: "96px",
    flex: 1,
    maxWidth: "100%",
    display: "flex",
    flexDirection: ["column", "column", "row", "row", "row", "row"],
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  mainscreen: {
    flex: [1, 1, 1, 2, 3, 3],
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

  header: {
    color: "text_white",
    fontWeight: "normal",
    py: ["0px", "0px", "8px", "8px", "8px", "8px"],
    width: "100%",
    backgroundColor: "#fff",
    transition: "all 0.4s ease",
    borderBottom: [null, null, "1px solid #E9EDF5", "1px solid #E9EDF5", "1px solid #E9EDF5", "1px solid #E9EDF5"],
    position: ["relative","relative","fixed","fixed","fixed","fixed"],
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
    mb: [-124,-124,0,0,0,0],
    display: "flex",
    alignItems: "center",
    flexDirection:[ "column", "column", "row","row", "row","row"],
    justifyContent: ["center", "center","space-between","space-between","space-between","space-between"],
    maxWidth: ["100%", null, null, null, null, "1172px", "1280px"],
  },

  button: {
    mr: 2,
    bg: "#D7354A",
    ":hover": {
      bg: "#C23043",
    },
    borderRadius:[10, 10, 24, 24, 24, 24],
    color: "white",
    fontSize: "md",
    width: "md",
    height: [40,40,50,50,50,50,50],
    mt: [24,24,0,0,0,0]
  },
  logoStyles: {
    // display:"flex",
    // alignItems: "center",
    // mx:[86,148,0,0,0,0]
  }
};
