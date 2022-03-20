import { Flex, HStack, Text } from "@chakra-ui/react";
import Logo from "components/logo";
import { DrawerProvider } from "contexts/drawer/drawer.provider";
import { useRouter } from "next/router";
import { Link as ScrollLink } from "react-scroll";
import headerStyles from "styles/header";
import { translation } from "translation";
import menuItems from "./header.data";
import MobileDrawer from "./mobile-drawer";

export default function Header({ className }) {
  const { locale } = useRouter();
  const lang = translation[locale].HeaderSection.Header;
  return (
    <DrawerProvider>
      <Flex sx={headerStyles.header} className={className}>
        <Flex sx={headerStyles.container}>
          <Flex>
            <HStack>
              <Logo />
            </HStack>
            <HStack>
              <MobileDrawer />
            </HStack>
          </Flex>
          <Flex as="nav" sx={headerStyles.nav}>
            {menuItems.map(({ path, label, offset }, i) => (
              <ScrollLink
                activeClass="active"
                sx={headerStyles.nav.navLink}
                to={path}
                spy={true}
                smooth={true}
                offset={offset}
                duration={500}
                key={i}
              >
                <Flex sx={headerStyles.sections}>
                {lang[i]}
                </Flex>
              </ScrollLink>
            ))}
          </Flex>
          <Flex
            sx={headerStyles.signupButton}
            onClick={() => {
              window.open("https://medium.com/@cndd_india", "_blank"); //to open new page
            }}
          >
            <Text sx={headerStyles.signupButtonText}>
              {translation[locale].HeaderSection.Blog}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DrawerProvider>
  );
}
