/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, Image } from "theme-ui";
import { Link } from "components/link";
import logo from "assets/logo.svg";
import { Heading } from "theme-ui";

export default function Logo() {
  return (
    <Link
      path="/"
      sx={{
        variant: "links.logo",
      }}
    >
      <Image src={logo} width="300" height="70" alt="startup landing logo" />
    </Link>
  );
}
