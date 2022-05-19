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
import cheerio from "cheerio";
import axios from "axios";
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
        bucket: "My Recos",
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
        bucket: "My Recos",
        photo: "https://www.mobiledor.com/wp-content/uploads/Samsung-Galaxy-F22-Bangladesh.jpg",
        prod_link: "https://www.amazon.in/SAMSUNG-Galaxy-Denim-Blue-Storage/dp/B09QXBCSPS",
        aff_code: "",
        sort_id: 1,
        others: {},
      }
    ]
    if(links.length>1){
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
  }
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

  const fetchProduct = async () => {
    try {
        let link = 'https://www.myntra.com/kurta-sets/khushal-k/khushal-k-women-black-ethnic-motifs-printed-kurta-with-palazzos--with-dupatta/17048614/buy'
        if(link.toString().substring(0, 8) !== "https://"){
          link = "https://" + link;
        }
        if(link.toString().substring(8,12) !== "www."){
          link = link.slice(0, 8) + 'www.' + link.slice(8);
        }
        // console.log(link)
        let site='';
        let i=12;
        while(link.charAt(i)!=='.'){
          site+=link.charAt(i);
          i++;
        }
        // console.log(site)
        // console.log('link', link)
        const response = await axios.get(link);
        const html = response.data;
        const $ = cheerio.load(html, { decodeEntities: false });
        // const i1 = $('#f271f8e29560878 > div > div > span > a > span')
        // console.log(i1.text())
        // const yid = $('#watch7-content > meta:nth-child(5)')
        // const yname = $('#watch7-content > span:nth-child(9) > link:nth-child(2)')
        // const yid1 = $('#watch7-content > span:nth-child(9) > link:nth-child(1)')
        // console.log(yid.attr('content'))
        // console.log(yid1.attr('href'))
        // console.log(yname.attr('content'))
        // console.log($('#body').text())
        const productData = [];

      //not working
      const myntra = () => {
        var g=$('script').map((idx, el) => $(el).html()).toArray();
        for(let s in g){
          if(g[s].includes('pdpData')){
            const data = JSON.parse(g[s].substring(15, g[s].length))
            console.log(data)
            const title=data['pdpData']['name'];
            const image=data['pdpData']['media']['albums'][0]['images'][0]['src']
            const mrp=data['pdpData']['price']['mrp'];
            const discountPrice = data['pdpData']['price']['discounted'];
            const rating = data['pdpData']['ratings']['averageRating'];
            const discount = data['pdpData']['discounts'][0]['label'];
            const description = data['pdpData']['descriptors'][0]['description'].replace( /(<([^>]+)>)/ig, '');
            productData.push(title, link, image, rating, mrp, discountPrice, discount);
          }
        }
      }

        const amazon = () => {
          const title = $('#productTitle')
          const image = $('#landingImage')
          const rating = $('#acrPopover > span.a-declarative > a > i.a-icon.a-icon-star')
          const discountPrice = $('#corePrice_desktop > div > table > tbody > tr:nth-child(2) > td.a-span12 > span.a-price.a-text-price.a-size-medium.apexPriceToPay > span:nth-child(2)')
          const mrp = $('#corePrice_desktop > div > table > tbody > tr:nth-child(1) > td.a-span12.a-color-secondary.a-size-base > span.a-price.a-text-price.a-size-base > span:nth-child(2)')
          const discount=$('#corePrice_desktop > div > table > tbody > tr:nth-child(3) > td.a-span12.a-color-price.a-size-base > span.a-color-price')
          const description=$('#feature-bullets > ul')
          productData.push(title.text().split("  ").join(""),link,image.attr('src'),rating.text(),discountPrice.text(),mrp.text(),discount.text(),description.text());
        }

        const flipkart = () => {
          const title = $('#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(3) > div > div:nth-child(1) > h1 > span')
          const image = $('#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-5-12._78xt5Y > div:nth-child(1) > div > div._3li7GG > div._1BweB8 > div._3kidJX > div.CXW8mj._3nMexc > img')
          const mrp = $('#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(3) > div > div.dyC4hf > div.CEmiEU > div > div:nth-child(2)')
          const discountPrice = $('#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(3) > div > div.dyC4hf > div.CEmiEU > div > div:nth-child(1)')
          const discount = $('#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(3) > div > div.dyC4hf > div.CEmiEU > div > div:nth-child(3)')
          const rating = $('#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(2) > div.aMaAEs > div:nth-child(2) ')
          const description=$('#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(9) > div:nth-child(1) > div > div._2418kt > ul')
          productData.push(title.text(),link,image.attr('src'),rating.text(),discountPrice.text(),mrp.text(),discount.text(),description.text());
        }

        const nykaa = () => {
          const title = $('#app > div > div > div.css-11ayi09 > div.css-1ufhqkr > div > div.css-1d5wdox > h1')
          const image = $('#app > div > div > div.css-11ayi09 > div.css-o21o8r > div.css-ov1ktg > div.productSelectedImage.css-eyk94w > div > div > img')
          const mrp = $('#app > div > div > div.css-11ayi09 > div.css-1ufhqkr > div > div.css-1d5wdox > div.css-f5j3vf > div > span.css-u05rr > span')
          const discountPrice = $('#app > div > div > div.css-11ayi09 > div.css-1ufhqkr > div > div.css-1d5wdox > div.css-f5j3vf > div > span.css-1jczs19')
          const discount = $('#app > div > div > div.css-11ayi09 > div.css-1ufhqkr > div > div.css-1d5wdox > div.css-f5j3vf > div > span.css-2w3ruv')
          const rating = $('#app > div > div > div.css-11ayi09 > div.css-1ufhqkr > div > div.css-1d5wdox > div.css-173satf > div.css-4zp2mz > div.css-m6n3ou')
          productData.push(title.text(),link,image.attr('src'),discountPrice.text(),mrp.text(),rating.text())
        }

        const meesho = () => {
          const title = $('#__next > div.sc-bczRLJ.Pagestyled__ContainerStyled-sc-ynkej6-0.eNeMob.kEgYzU > div > div.sc-dkzDqf.ecjLHH > div.Card__BaseCard-sc-b3n78k-0.gguLc.ShippingInfo__DetailCard-sc-dflqn4-0.dOonFh.ShippingInfo__DetailCard-sc-dflqn4-0.dOonFh > span')
          const image = $('#__next > div.sc-bczRLJ.Pagestyled__ContainerStyled-sc-ynkej6-0.eNeMob.kEgYzU > div > div.sc-dkzDqf.eewkZT > div > div.Card__BaseCard-sc-b3n78k-0.cWVjzZ.ProductCard__Container-sc-camkhj-0.gjLyQd.ProductCard__Container-sc-camkhj-0.gjLyQd > div.ProductDesktopImage__ImageWrapperDesktop-sc-8sgxcr-0.echLZw > div > img')
          const discountPrice = $('#__next > div.sc-bczRLJ.Pagestyled__ContainerStyled-sc-ynkej6-0.eNeMob.kEgYzU > div > div.sc-dkzDqf.ecjLHH > div.Card__BaseCard-sc-b3n78k-0.gguLc.ShippingInfo__DetailCard-sc-dflqn4-0.dOonFh.ShippingInfo__DetailCard-sc-dflqn4-0.dOonFh > div.Card__BaseCard-sc-b3n78k-0.gdwhYz.ShippingInfo__PriceRow-sc-dflqn4-2.NQjqx.ShippingInfo__PriceRow-sc-dflqn4-2.NQjqx > h4')
          const mrp=$('#__next > div.sc-bczRLJ.Pagestyled__ContainerStyled-sc-ynkej6-0.eNeMob.kEgYzU > div > div.sc-dkzDqf.ecjLHH > div.Card__BaseCard-sc-b3n78k-0.gguLc.ShippingInfo__DetailCard-sc-dflqn4-0.dOonFh.ShippingInfo__DetailCard-sc-dflqn4-0.dOonFh > div.Card__BaseCard-sc-b3n78k-0.gdwhYz.ShippingInfo__PriceRow-sc-dflqn4-2.NQjqx.ShippingInfo__PriceRow-sc-dflqn4-2.NQjqx > p')
          const discount=$('#__next > div.sc-bczRLJ.Pagestyled__ContainerStyled-sc-ynkej6-0.eNeMob.kEgYzU > div > div.sc-dkzDqf.ecjLHH > div.Card__BaseCard-sc-b3n78k-0.gguLc.ShippingInfo__DetailCard-sc-dflqn4-0.dOonFh.ShippingInfo__DetailCard-sc-dflqn4-0.dOonFh > div.Card__BaseCard-sc-b3n78k-0.gdwhYz.ShippingInfo__PriceRow-sc-dflqn4-2.NQjqx.ShippingInfo__PriceRow-sc-dflqn4-2.NQjqx > span.Text__StyledText-sc-oo0kvp-0.kGYFqT')
          const rating = $('#__next > div.sc-bczRLJ.Pagestyled__ContainerStyled-sc-ynkej6-0.eNeMob.kEgYzU > div > div.sc-dkzDqf.ecjLHH > div.Card__BaseCard-sc-b3n78k-0.gguLc.ShippingInfo__DetailCard-sc-dflqn4-0.dOonFh.ShippingInfo__DetailCard-sc-dflqn4-0.dOonFh > div.Card__BaseCard-sc-b3n78k-0.fpIkxz.ShippingInfo__RatingSection-sc-dflqn4-12.hqUvHB.ShippingInfo__RatingSection-sc-dflqn4-12.hqUvHB > span > span.Rating__StyledPill-sc-5nayi4-0 > span')
          productData.push(title.text(),link,image.attr('src'),discountPrice.text(),rating.text())
        }

        const snapdeal = () => {
          const title = $('#productOverview > div.col-xs-14.right-card-zoom.reset-padding > div > div.pdp-fash-topcenter-inner.layout > div.row > div.col-xs-18 > h1')
          const image = $('#bx-slider-left-image-panel > li:nth-child(1) > img')
          const mrp=$('#buyPriceBox > div.row.reset-margin > div.col-xs-14.reset-padding.padL8 > div.disp-table > div.pdp-e-i-PAY-r.disp-table-cell.lfloat > div.pdpCutPrice')
          const discount=$('#buyPriceBox > div.row.reset-margin > div.col-xs-14.reset-padding.padL8 > div.disp-table > div.pdp-e-i-PAY-r.disp-table-cell.lfloat > span.pdpDiscount > span')
          //get different discount price format
          const discountPrice = $('#buyPriceBox > div.row.reset-margin > div.col-xs-14.reset-padding.padL8 > div.disp-table > div.pdp-e-i-PAY-r.disp-table-cell.lfloat > span.pdp-final-price > span')
          const rating = $('#productOverview > div.col-xs-14.right-card-zoom.reset-padding > div > div.pdp-fash-topcenter-inner.layout > div.pdp-e-i-ratereviewQA.marT10 > div.pdp-e-i-ratings > div > span.avrg-rating')
          productData.push(title.text().split("\n   \t\t\t").join(""),link,image.attr('src'),discountPrice.text(),rating.text());
        }
        
        //not working
        const ajio = () => {
          const brand = $('#appContainer > div.content > div > div > div.prod-container > div > div.col-4 > div > h2')
          const title = $('#appContainer > div.content > div > div > div.prod-container > div > div.col-4 > div > h1')
          const image = $('#appContainer > div.content > div > div > div.prod-container > div > div.col-6 > div > div.img-mv-left.col-10 > div.image-slick-container > div > div > div > div:nth-child(6) > div > img')
          const price = $('#appContainer > div.content > div > div > div.prod-container > div > div.col-4 > div > div.prod-price-section > div.prod-sp')
          productData.push(brand.text() + title.text(),link,image.attr('src'),price.text());
        }

        //not working
        const purplle = () => {
          const title = $('#body > app > main > product-app > div > div > div > div.pp-g30.mrb30 > div.pp-2-5.w39pi.sp30 > h1')
          const image = $('#mainImage > img')
          const price = $('#body > app > main > product-app > div > div > div > div.pp-g30.mrb30 > div.pp-2-5.w39pi.sp30 > table > tr > td:nth-child(1) > span > span')
          const rating = $('#body > app > main > product-app > div > div > div > div.pp-g30.mrb30 > div.pp-2-5.w39pi.sp30 > p.mr0.mrb20 > span.tr-box2.bg-green')
          productData.push(title.text(),link,image.attr('src'),price.text(),rating.text());
        }

        switch(site){
          case 'amazon': amazon(); break;
          case 'flipkart': flipkart(); break;
          case 'meesho': meesho(); break;
          case 'nykaa': nykaa(); break;
          case 'snapdeal': snapdeal(); break;
          case 'myntra': myntra(); break;
          case 'ajio': ajio(); break;
          case 'purplle': purplle(); break;
          default: return '';
        }
        return productData;
    } catch (error) {
        throw error;
    }
 };
 
//  fetchProduct().then((productData) => console.log(productData));



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
