import { Divider, Flex } from "@chakra-ui/react";
import Header from "components/dashboard/header";
import { MainScreen } from "components/dashboard/MainScreen";
import { MenuPopup } from "components/dashboard/MenuPopup";
import { Sidebar } from "components/dashboard/Sidebar";
import { authapi, nonauthapi } from "lib/api";
import { auth } from "lib/firebase";
import { firebaseAdmin } from "lib/firebaseadmin";
import Head from "next/head";
import nookies from "nookies";
import { useState, useEffect } from "react";
import isURL from "validator/lib/isURL";
import dashboardStyles from "styles/Dashboard";
import dynamic from "next/dynamic";

const DynamicIntro = dynamic(() => import("../../src/components/dashboard/Intro"), {
  ssr: false,
  loading: () => <div>...</div>
});

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
  const [menuClick, setMenuClick] = useState(false);
  const [summary, setSummary] = useState({});
  const [ initState, setInitState ]= useState(false);
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
  
  useEffect(()=>{

    const initialLinks = [
      {
        id: "",
        u_id: "",
        u_name: "",
        title: "Candid Home",
        link: "https://cndd.in/home",
        bucket: "My Links",
        photo: "",
        font_color: "black",
        shadow_color: "rgba(0,0,0,.5)",
        sort_id: 0,
        others: {},
      },
      {
        id: "",
        u_id: "",
        u_name: "",
        title: "Candid Blog",
        link: "https://medium.com/@cndd_india",
        bucket: "My Links",
        photo: "",
        font_color: "black",
        shadow_color: "rgba(0,0,0,.5)",
        sort_id: 1,
        others: {},
      },
    ]
  
    const initialRecos = [
      {
        id: "",
        u_id: "",
        u_name: "",
        prod_name: "Apple MacBook Air (M1, 2020)",
        cat_name: "Laptop",
        bucket: "My Recommendations",
        photo: "https://m.media-amazon.com/images/I/71vFKBpKakL._SL1500_.jpg",
        prod_link: "https://amazon.in/Apple-MacBook-Chip-13-inch-512GB/dp/B08N5T6CZ6",
        aff_code: "",
        sort_id: 0,
        others: {},
      },
      {
        id: "",
        u_id: "",
        u_name: "",
        prod_name: "Samsung Galaxy F22",
        cat_name: "Mobile",
        bucket: "My Recommendations",
        photo: "https://www.mobiledor.com/wp-content/uploads/Samsung-Galaxy-F22-Bangladesh.jpg",
        prod_link: "https://www.amazon.in/SAMSUNG-Galaxy-Denim-Blue-Storage/dp/B09QXBCSPS",
        aff_code: "",
        sort_id: 1,
        others: {},
      }
    ]
    let loopState = true;
    for(let i=0; i<2; i++){        
      if(initialLinks[i].title === links[i].title &&
        initialLinks[i].link === links[i].link &&
        initialLinks[i].bucket === links[i].bucket &&
        initialLinks[i].photo === links[i].photo &&
        initialLinks[i].shadow_color === links[i].shadow_color &&
        initialRecos[i].prod_name === recos[i].prod_name &&
        initialRecos[i].prod_link === recos[i].prod_link &&
        initialRecos[i].bucket === recos[i].bucket &&
        initialRecos[i].cat_name === recos[i].cat_name &&
        initialRecos[i].photo === recos[i].photo &&
        initialRecos[i].aff_code === recos[i].aff_code &&
        loopState){
          loopState=true;
      }
      else{
        loopState=false;
      }
    }
    setInitState(loopState);
  },[links, recos, initState])

  useEffect(() => {
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
      { ( links.length===2 && recos.length===2 && socials.length===0 && initState ) ? <DynamicIntro/> : <></>}
      <Divider />
      {menuClick ? <MenuPopup /> : null}
      <Flex as="container" sx={dashboardStyles.container}>
        <Flex as="sidebar" sx={dashboardStyles.sidebar} id="sidebar">
          <Sidebar
            socials={socials}
            user={user}
            summary={summary}
            cookie={cookies[0]}
            buckets={buckets}
            masterSocials={masterSocials}
          />
        </Flex>
        <Flex as="mainscreen" sx={dashboardStyles.mainscreen}>
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

  // console.log(currentUser[0], buckets);

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
