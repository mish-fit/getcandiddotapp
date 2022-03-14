/** @jsxRuntime classic */
/** @jsx jsx */

import logo from "assets/CaNDiD_B.png";
import { Link } from "components/link";
import { Image, jsx } from "theme-ui";

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
    mr:['200px','350px','350px','50px','50px','50px','50px']

  }
} 