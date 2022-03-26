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
import { Button, Divider, Flex, Image } from "@chakra-ui/react";
import isURL from "validator/lib/isURL";
import smm from "../public/lottie/smn.json";

import { event, pageview } from "analytics/ga";
import userStyles from "styles/user";

export default function User({ links, recos, user, socials, buckets }) {
  const [summary, setSummary] = React.useState({});

  React.useEffect(() => {
    if(user[0]){
      pageview(user[0].uuid);
    }

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
        <Flex as="container" sx={userStyles.container}>
          <Flex as="sidebar" sx={userStyles.sidebar}>
            <Sidebar socials={socials} user={user} summary={summary} />
          </Flex>
          <Flex as="mainscreen" sx={userStyles.mainscreen}>
            <Flex
              sx={userStyles.lottieFlex}
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
        <header sx={userStyles.header}>
          <Flex sx={userStyles.headerContainer}>
            <Flex as="logo" sx={userStyles.logouserStyles}>
              <Link
                path="/"
              >
                <Image
                  src={logo}
                  width="150px"
                  height="50px"
                  // sx={userStyles.logouserStyles}
                  alt="startup landing logo"
                />
              </Link>
            </Flex>
            <Flex>
              <Button sx={userStyles.button} onClick={handleCreateLinkButton}>
                Create your own CNDD link!
              </Button>
            </Flex>
          </Flex>
        </header>
      </DrawerProvider>
      <Divider/>
      <Flex as="container" sx={userStyles.container}>
        <Flex as="sidebar" sx={userStyles.sidebar}>
          <Sidebar socials={socials} user={user} summary={summary} />
        </Flex>
        <Flex as="mainscreen" sx={userStyles.mainscreen}>
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