import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import SectionHeading from "components/section-heading";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import faqTwostyles from "styles/faq-two";
import { translation } from "translation";

const FaqItem = ({ title, text, status, index }) => {
  const [active, setActive] = useState(status);
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <Box
      id="faq-two"
      sx={faqTwostyles.item}
      className={`${active === true ? "active" : " "}`}
      onClick={handleClick}
    >
      <Heading as="h3">
        <span>0{index + 1}.</span>
        {title}
      </Heading>
      {active === false ? <Text as="p">{text.slice(0, 65)} ...</Text> : null}
      {active === true ? <Text as="p">{text}</Text> : null}
      <Box sx={faqTwostyles.icon}>
        {active === false ? <IoIosAdd /> : null}
        {active === true ? <IoIosRemove /> : null}
      </Box>
    </Box>
  );
};
const FaqTwo = ({ addQuestion }) => {
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
      // {
      //   status: false,
      //   title: lang.questions[4].Title,
      //   text: lang.questions[4].Text,
      // },
    ],
    button: {
      link: "mailto:hello@cndd.in",
      label: lang.moreQuestions,
    },
  };
  const { sectionTitle, posts, button } = FAQ_TWO_DATA;

  const add = () => {
    addQuestion();
  };

  return (
    <Box sx={faqTwostyles.section}>
      <Flex flexDirection={"column"}>
      <SectionHeading slogan={sectionTitle.text} title={sectionTitle.title} />
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
        <Flex
          sx={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Button sx={faqTwostyles.buttonWrap} onClick={add}>
            <Text>{button.label}</Text>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default FaqTwo;