/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Container } from "theme-ui";
import Slider from "react-slick";
import SectionHeading from "components/section-heading";
import PriceTable from "components/price-table";
import SlickArrow from "components/slick-arrow";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react/cjs/react.production.min";
import { useRouter } from "next/router";
import { translation } from "translation";

const data = [
  {
    id: 1,
    title: "Basic Pack",
    subtitle:
      "For hobbyists who like to recommend products they used to their friends",
    price: "Forever free",
    isRecommended: false,
    buttonText: "Sign Up",
    features: [
      {
        id: 1,
        isAvailable: true,
        title: "50 Products",
      },
      {
        id: 2,
        isAvailable: true,
        title: `50 Website/Social Links`,
      },
      {
        id: 3,
        isAvailable: true,
        title: `5 Affiliate Ids`,
      },
      {
        id: 6,
        isAvailable: true,
        title: `Support for Indian Local Languages`,
      },
      {
        id: 7,
        isAvailable: true,
        title: `Basic Analytics`,
      },
      {
        id: 8,
        isAvailable: true,
        title: `Basic Support`,
      },
      {
        id: 9,
        isAvailable: false,
        title: `Bucketing`,
      },
      {
        id: 10,
        isAvailable: false,
        title: `Product Analytics`,
      },
    ],
  },
  {
    id: 2,
    title: "Premium Pack",
    subtitle:
      "For expert reviewers who recommend products after thorough research",
    price: "₹99 per mo.",
    isRecommended: false,
    buttonText: "Start Free Trial",
    features: [
      {
        id: 1,
        isAvailable: true,
        title: "150 Products",
      },
      {
        id: 2,
        isAvailable: true,
        title: `Unlimited Website/Social Links`,
      },
      {
        id: 3,
        isAvailable: true,
        title: `20 Affiliate Ids`,
      },
      {
        id: 6,
        isAvailable: true,
        title: `Support for Indian Local Languages`,
      },
      {
        id: 7,
        isAvailable: true,
        title: `Basic Analytics`,
      },
      {
        id: 8,
        isAvailable: true,
        title: `Premium Support`,
      },
      {
        id: 9,
        isAvailable: true,
        title: `10 Buckets`,
      },
      {
        id: 10,
        isAvailable: false,
        title: `Product Analytics`,
      },
    ],
  },
  {
    id: 3,
    title: "Ultimate Pack",
    subtitle:
      "For influencers who partner with brands and help companies spread their reach",
    price: "₹199 per mo.",
    isRecommended: false,
    buttonText: "Start Free Trial",
    features: [
      {
        id: 1,
        isAvailable: true,
        title: "500 Products",
      },
      {
        id: 2,
        isAvailable: true,
        title: `Unlimited Website/Social Links`,
      },
      {
        id: 3,
        isAvailable: true,
        title: `Unlimited Affiliate Ids`,
      },
      {
        id: 6,
        isAvailable: true,
        title: `Support for Indian Local Languages`,
      },
      {
        id: 7,
        isAvailable: true,
        title: `Basic Analytics`,
      },
      {
        id: 8,
        isAvailable: true,
        title: `Premium Support`,
      },
      {
        id: 9,
        isAvailable: true,
        title: `Unlimited custom Buckets`,
      },
      {
        id: 10,
        isAvailable: true,
        title: `Product Analytics`,
      },
    ],
  },
];

const settings = {
  slidesToShow: 3,
  slidesToScroll: 1,
  speed: 500,
  nextArrow: <SlickArrow control="next" />,
  prevArrow: <SlickArrow control="prev" />,
  responsive: [
    {
      breakpoint: 100000,
      settings: "unslick",
    },
    {
      breakpoint: 768,
      settings: {
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 767,
      settings: {
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Pricing = () => {
  const { locale } = useRouter();
  const lang = translation[locale].pricingSection;
  const data = [
    {
      id: 1,
      title: lang.Tile1.Title,
      subtitle: lang.Tile1.Content,
      price: lang.Tile1.pricing,
      isRecommended: false,
      buttonText: lang.Tile1.buttonText,
      features: [
        {
          id: 1,
          isAvailable: true,
          title: lang.Tile1.features[0],
        },
        {
          id: 2,
          isAvailable: true,
          title: lang.Tile1.features[1],
        },
        {
          id: 3,
          isAvailable: true,
          title: lang.Tile1.features[2],
        },
        {
          id: 6,
          isAvailable: true,
          title: lang.Tile1.features[3],
        },
        {
          id: 7,
          isAvailable: true,
          title: lang.Tile1.features[4],
        },
        {
          id: 8,
          isAvailable: true,
          title: lang.Tile1.features[5],
        },
        {
          id: 9,
          isAvailable: false,
          title: lang.Tile1.features[6],
        },
        {
          id: 10,
          isAvailable: false,
          title: lang.Tile1.features[7],
        },
      ],
    },
    {
      id: 2,
      title: lang.Tile2.Title,
      subtitle: lang.Tile2.Content,
      price: lang.Tile2.pricing,
      isRecommended: false,
      buttonText: lang.Tile2.buttonText,
      features: [
        {
          id: 1,
          isAvailable: true,
          title: lang.Tile2.features[0],
        },
        {
          id: 2,
          isAvailable: true,
          title: lang.Tile2.features[1],
        },
        {
          id: 3,
          isAvailable: true,
          title: lang.Tile2.features[2],
        },
        {
          id: 6,
          isAvailable: true,
          title: lang.Tile2.features[3],
        },
        {
          id: 7,
          isAvailable: true,
          title: lang.Tile2.features[4],
        },
        {
          id: 8,
          isAvailable: true,
          title: lang.Tile2.features[5],
        },
        {
          id: 9,
          isAvailable: false,
          title: lang.Tile2.features[6],
        },
        {
          id: 10,
          isAvailable: false,
          title: lang.Tile2.features[7],
        },
      ],
    },
    {
      id: 3,
      title: lang.Tile3.Title,
      subtitle: lang.Tile3.Content,
      price: lang.Tile3.pricing,
      isRecommended: false,
      buttonText: lang.Tile3.buttonText,
      features: [
        {
          id: 1,
          isAvailable: true,
          title: lang.Tile3.features[0],
        },
        {
          id: 2,
          isAvailable: true,
          title: lang.Tile3.features[1],
        },
        {
          id: 3,
          isAvailable: true,
          title: lang.Tile3.features[2],
        },
        {
          id: 6,
          isAvailable: true,
          title: lang.Tile3.features[3],
        },
        {
          id: 7,
          isAvailable: true,
          title: lang.Tile3.features[4],
        },
        {
          id: 8,
          isAvailable: true,
          title: lang.Tile3.features[5],
        },
        {
          id: 9,
          isAvailable: false,
          title: lang.Tile3.features[6],
        },
        {
          id: 10,
          isAvailable: false,
          title: lang.Tile3.features[7],
        },
      ],
    },
  ];
  return (
    <Box as="section" id="pricing" sx={styles.section}>
      <Container sx={styles.container}>
        <SectionHeading
          sx={styles.heading}
          slogan="Deals for you"
          title="Meet our pricing plan that suit you"
        />
        <Slider sx={styles.grid} {...settings}>
          {data?.map((price, index) => (
            <PriceTable price={price} key={index} />
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default Pricing;

const styles = {
  section: {
    pt: [6],
    pb: [12, null, null, 15, 17],
  },
  container: {
    pl: 0,
    pr: 0,
  },
  heading: {
    mb: ["0px", null, null, "70px"],
    px: [6, null, null, 0],
    h3: {},
  },
  grid: {
    gap: [null, null, null, null, 6],
    display: [null, null, null, null, "grid"],
    gridTemplateColumns: [null, null, null, null, "repeat(3, 1fr)"],
    alignItems: [null, null, null, null, "flex-end"],
    ".slick-slide > div": {
      p: ["35px", "40px", null, "35px 23px 23px", 0],
    },
    ".slick-arrow": {
      bottom: -5,
    },
  },
};
