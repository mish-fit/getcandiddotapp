/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, Image } from 'theme-ui';
import { Link } from 'components/link';
import logo from 'assets/logo.svg';
import {Heading} from 'theme-ui'

export default function Logo() {
  return (
    <Link
      path="/"
      sx={{
        variant: 'links.logo',
      }}
    >
      <Image src={logo} width="199" height="45" alt="startup landing logo" />
      
    </Link>
  );
}
