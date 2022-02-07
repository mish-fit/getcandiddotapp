import React, { useState } from "react";
import { keyframes } from "@emotion/core";
import { IoIosAdd, IoIosRemove } from "react-icons/io";

import { Box, Container, Heading, Text, Link } from "theme-ui";
import { useRouter } from "next/router";
import { translation } from "translation";

const FaqItem = ({ title, text, status, index }) => {
  const [active, setActive] = useState(status);
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <Box
      id="faq-two"
      sx={styles.item}
      className={`${active === true ? "active" : " "}`}
      onClick={handleClick}
    >
      <Heading as="h3">
        <span>0{index + 1}.</span>
        {title}
      </Heading>
      {active === false ? <Text as="p">{text.slice(0, 65)} ...</Text> : null}
      {active === true ? <Text as="p">{text}</Text> : null}
      <Box sx={styles.icon}>
        {active === false ? <IoIosAdd /> : null}
        {active === true ? <IoIosRemove /> : null}
      </Box>
    </Box>
  );
};
const FaqTwo = () => {
  const { locale } = useRouter();
  const lang = translation[locale].faqSection;

  const FAQ_TWO_DATA = {
    sectionTitle: {
      title: lang.subHeader,
      text: lang.Header,
    },
    posts: [
      {
        status: true,
        title: lang.questions[0].Title,
        text: lang.questions[0].Text,
      },
      {
        status: false,
        title: lang.questions[1].Title,
        text: lang.questions[1].Text,
      },
      {
        status: false,
        title: lang.questions[2].Title,
        text: lang.questions[2].Text,
      },
      {
        status: false,
        title: lang.questions[3].Title,
        text: lang.questions[3].Text,
      },
      {
        status: false,
        title: lang.questions[4].Title,
        text: lang.questions[4].Text,
      },
    ],
    button: {
      link: "mailto:sai@getcandid.app",
      label: lang.moreQuestions,
    },
  };
  const { sectionTitle, posts, button } = FAQ_TWO_DATA;
  return (
    <Box sx={styles.section}>
      <Container>
        <Box sx={styles.sectionTitle}>
          <Text as="p">{sectionTitle.text}</Text>
          <Heading as="h3">{sectionTitle.title}</Heading>
        </Box>
        <Box>
          {posts.map(({ title, text, status }, index) => (
            <FaqItem
              key={`faq-key-${index}`}
              title={title}
              text={text}
              index={index}
              status={status}
            />
          ))}
        </Box>
        <Box sx={styles.buttonWrap}>
          <Link href={button.link}>{button.label}</Link>
        </Box>
      </Container>
    </Box>
  );
};

export default FaqTwo;

const faqAnim = keyframes`
    from {
        opacity: 0;
        transform: translateY(20%);
    }
    to {
        opacity: 1;
        transform: translateY(0%);
    }
`;

const styles = {
  section: {
    pb: ["70px", null, null, null, "100px", null, "150px"],
    pt: ["40px", null, null, null, "75px"],
  },
  sectionTitle: {
    mb: ["0", null, null, null, "40px"],
    textAlign: "center",
    p: {
      color: "#d7354a",
      fontSize: "16px",
    },
    h3: {
      color: "#0F2137",
      letterSpacing: "-0.5px",
      fontSize: "24px",
      fontWeight: 500,
    },
  },
  item: {
    display: "flex",
    flexWrap: "wrap",
    borderBottom: "1px solid #E5E5E5",
    px: ["15px", "40px"],
    py: "40px",
    cursor: "pointer",
    transition: "all 500ms ease",
    position: "relative",
    "&.active": {
      borderColor: "#0F2137",
    },
    h3: {
      flex: ["0 0 100%", null, null, null, "0 0 50%"],
      color: "#0F2137",
      fontSize: ["16px", null, null, "18px", null, "20px"],
      fontWeight: 500,
      letterSpacing: "-0.5px",
      position: "relative",
      pl: ["0", null, null, null, "35px"],
      lineHeight: 1.67,
      whiteSpace: ["normal", null, null, null, "pre-line"],
      mb: ["10px", null, null, null, "0"],
      span: {
        position: ["relative", null, null, null, "absolute"],
        top: 0,
        left: 0,
        mr: ["10px", null, null, null, "0"],
      },
    },
    p: {
      flex: ["0 0 100%", null, null, null, "0 0 50%"],
      color: "#343D48",
      fontSize: ["15px", null, null, "16px"],
      lineHeight: [1.87, 2],
      animation: `${faqAnim} .8s linear`,
    },
  },
  buttonWrap: {
    textAlign: "center",
    mt: "40px",
    a: {
      display: "inline-flex",
      backgroundColor: "#ECF2F7",
      borderRadius: "5px",
      color: "#738295",
      fontSize: "16px",
      fontWeight: 700,
      padding: "10px 22px",
      transition: "all 500ms ease",
      "&:hover": {
        backgroundColor: "#4F96FF",
        color: "#fff",
      },
    },
  },
  icon: {
    position: "absolute",
    top: "45px",
    right: 0,
    svg: {
      fontSize: "24px",
      color: "#B1B8C0",
    },
  },
};
