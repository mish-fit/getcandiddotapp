import React from 'react';
import { Image as Img } from '@chakra-ui/react';

export default function Image({ src, ...rest }) {
  return <Img src={src} {...rest} />;
}
