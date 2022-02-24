/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, Image } from "theme-ui";
import { Link } from "components/link";
import logo from "assets/CaNDiD.png";
import { Heading } from "theme-ui";

export default function Logo() {
  return (
    <Link
      path="/"
      sx={{
        variant: "links.logo",
      }}
    >
      <Image src={logo} width='210' height='70' sx={style.logoStyles} alt="startup landing logo" />
    </Link>
  );
}

const style = {
  logoStyles:{
    mr:['250px','400px','650px','50px','50px','50px','50px']
  }
}