import { Link } from "components/link";
import Logo from "components/logo";
import { useRouter } from "next/router";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { translation } from "translation";
import footerStyles from "styles/footer";

export default function Footer() {
  const { locale } = useRouter();
  const lang = translation[locale].footerSection.footer;

  return (
      <Flex sx={footerStyles.container}>
      <Flex sx={footerStyles.logo}>
        <Logo />
      </Flex>

      <Flex sx={footerStyles.copyright}>
        <Text sx={footerStyles.copyrightText} >
          &copy; Copyright by {new Date().getFullYear()} Mish Tech Inc.
        </Text>
      </Flex>
      <Flex sx={footerStyles.bottomMenu} >
        <Link path="/" label={lang[0]} />
        <Link path="/privacy" label={lang[1]} />
        <Link path="/terms" label={lang[2]} />
      </Flex>
      </Flex>
  );
}
