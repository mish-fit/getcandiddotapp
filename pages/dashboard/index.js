/** @jsxRuntime classic */
/** @jsx jsx */
import Header from "components/dashboard/header";
import { MainScreen } from "components/dashboard/MainScreen";
import { MenuPopup } from "components/dashboard/MenuPopup";
import { Sidebar } from "components/dashboard/Sidebar";
import { authapi, nonauthapi } from "lib/api";
import { auth } from "lib/firebase";
import { firebaseAdmin } from "lib/firebaseadmin";
// import { UserContext } from "../../src/lib/UserDataProvider";
import { UserContext } from "lib/UserDataProvider";
import Head from "next/head";
import nookies from "nookies";
import React, { useContext } from "react";
import { Flex, jsx } from "theme-ui";
import isURL from "validator/lib/isURL";

// import { firebaseAdmin } from "lib/firebaseadmin";
export default function Dashboard({
  links,
  recos,
  buckets,
  user,
  socials,
  currentUser,
  cookies,
  masterSocials,
  linkAnalytics,
  prodAnalytics,
}) {
  const [userDataContext] = useContext(UserContext);

  const [menuClick, setMenuClick] = React.useState(false);
  const [summary, setSummary] = React.useState({});
  // auth.signOut();
  // React.useEffect(() => {
  //   console.log(
  //     "links ",
  //     links,
  //     " recos ",
  //     recos,
  //     " buckets ",
  //     buckets[0].u_buckets,
  //     " user ",
  //     user,
  //     " socials ",
  //     socials,
  //     " currentuser ",
  //     currentUser,
  //     " cookies ",
  //     cookies,
  //     " master socials ",
  //     masterSocials
  //   );
  // }, [
  //   buckets,
  //   cookies,
  //   currentUser,
  //   masterSocials,
  //   recos,
  //   user,
  //   socials,
  //   links,
  // ]);
  React.useEffect(() => {
    setSummary({
      products: recos.filter((item) => isURL(item.prod_link) == true).length,
      links: links.filter((item) => isURL(item.link) == true).length,
    });

    auth.onAuthStateChanged((user) => {
      localStorage.setItem("jwt", user.toJSON().stsTokenManager.accessToken);
    });
  }, [links.length, recos.length]);

  const menuActivate = (item) => {
    setMenuClick(item);
    // if (item) {
    //   document.addEventListener("click", () => setMenuClick(false));
    // } else {
    //   document.removeEventListener("click", () => setMenuClick(false));
    // }
  };

  const onClose = () => {};

  return (
    <div>
      <Head>
        <title>Candid Dashboard</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href={user[0].u_profile_image} />
      </Head>
      <Header
        menu={(item) => menuActivate(item)}
        menuActive={menuClick}
        data={user}
      />
      {menuClick ? <MenuPopup /> : null}
      <Flex as="container" sx={styles.container}>
        <Flex as="sidebar" sx={styles.sidebar}>
          <Sidebar
            socials={socials}
            user={user}
            summary={summary}
            cookie={cookies[0]}
            buckets={buckets}
            masterSocials={masterSocials}
          />
        </Flex>
        <Flex as="mainscreen" sx={styles.mainscreen}>
          <MainScreen
            links={links}
            recos={recos}
            buckets={buckets[0].u_buckets}
            user={user}
            cookie={cookies[0]}
            linkAnalytics={linkAnalytics}
            prodAnalytics={prodAnalytics}
          />
        </Flex>
      </Flex>
    </div>
  );
}

export async function getServerSideProps(context) {
  let currentUser = [];
  let cookies = [];
  let uid = "";
  const cookie = nookies.get(context).token;
  if (cookie) {
    await firebaseAdmin
      .auth()
      .verifyIdToken(cookie)
      .then((res) => {
        // console.log("res", res);
        uid = res.uid;
        currentUser.push(res.uid);
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  if (currentUser[0] !== "") {
    const res = await fetch(`${nonauthapi}user?u_id=${currentUser[0]}`);
    const data = await res.json();
    // console.log("da", data);
    if (data.length === 0) {
      return {
        redirect: {
          destination: "/onboard",
          permanent: false,
        },
      };
    }
  }

  if (!currentUser[0]) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  const [
    { value: links, reason: linksError },
    { value: socials, reason: socialsError },
    { value: recos, reason: recosError },
    { value: buckets, reason: bucketsError },
    { value: user, reason: userError },
    { value: masterSocials, reason: masterSocialsError },
    { value: linkAnalytics, reason: linkAnalyticsError },
    { value: prodAnalytics, reason: prodAnalyticsError },
  ] = await Promise.allSettled(
    [
      fetch(nonauthapi + "links" + "?u_id=" + currentUser[0]),
      fetch(nonauthapi + "socials" + "?u_id=" + currentUser[0]),
      fetch(nonauthapi + "recos" + "?u_id=" + currentUser[0]),
      fetch(nonauthapi + "buckets" + "?u_id=" + currentUser[0]),
      fetch(nonauthapi + "user" + "?u_id=" + currentUser[0]),
      fetch(authapi + "socials/master"),
      fetch(authapi + "analytics/link" + "?u_id=" + currentUser[0]),
      fetch(authapi + "analytics/prod" + "?u_id=" + currentUser[0]),
    ].map((fetchApi) => fetchApi.then((res) => res.json()))
  );

  // console.log(currentUser[0], linkAnalytics, prodAnalytics);

  return {
    props: {
      links,
      socials,
      recos,
      buckets,
      user,
      currentUser,
      cookies,
      masterSocials,
      linkAnalytics,
      prodAnalytics,
    },
  };
}

const styles = {
  container: {
    mt: "50px",
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
    width: "320px",
    pl: "8px",
    pt: "16px",
    alignItems: "center",
    justifyContent: "center",
    position: "sticky",
    bottom: "8px",
    alignSelf: "flex-end",
    // backgroundColor: "red",
  },
  headerBtn: {
    backgroundColor: "#f29183",
    fontSize: "16px",
    fontWeight: "normal",
    letterSpacing: "-0.16px",
    borderRadius: "6px",
    color: "#ffffff",
    borderWidth: "4px",
    borderColor: "black",
    padding: "4.0px 16px",
    display: ["none", null, null, null, "inline-block"],
    ml: ["0", null, null, "auto", "0"],
    mr: ["0", null, null, "16px", "0"],
    transition: "all 500ms ease",
    "&:hover": {
      color: "#fff",
      backgroundColor: "secondary",
    },
  },
  blogBtn: {
    backgroundColor: "#d95f76",
    fontSize: "16px",
    fontWeight: "bold",
    letterSpacing: "-0.16px",
    borderRadius: "8px",
    color: "#ffffff",
    padding: "8px 24px",
    display: ["none", null, null, null, "inline-block"],
    ml: ["0", null, null, "auto", "0"],
    mr: ["16px", "16px", "16px", "16px", "0"],
    transition: "all 500ms ease",
    "&:hover": {
      color: "#fff",
      backgroundColor: "secondary",
    },
  },

  header: {
    color: "text_white",
    fontWeight: "normal",
    py: "16px",
    width: "100%",
    backgroundColor: "#fff",
    transition: "all 0.4s ease",
    borderBottom: "1px solid #E9EDF5",
    position: "fixed",
    top: 0,
    left: 0,

    "&.sticky": {
      backgroundColor: "background",
      color: "text",
      py: "16px",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
    },
  },
  logoContainer: {},
  signoutContainer: {
    loginBtn: {
      ml: "auto",
      display: "inline-flex",
      alignItems: "center",
      fontSize: "16px",
      color: "#0F2137",
      fontWeight: 500,
      mr: "16px",
      img: {
        mr: "8px",
      },
      text: {
        color: "green",
      },
    },
  },
};
