import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Container, Heading, Text, Link } from 'theme-ui';
import { IoIosArrowForward } from 'react-icons/io';
import ModalVideo from 'react-modal-video';
import videoImage from 'assets/video.png';
const VIDEO_DATA = {
  image: videoImage,
  title: 'See what our customer say about us',
  text:
    "Every email, web page, and social media post makes an impression on your customers. With our software you can be confident it's impression.",
  button: {
    label: 'Explore Details',
    link: '#',
  },
};
const Video = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setVideoOpen(true);
  };
  const { image, title, text, button } = VIDEO_DATA;
  return (
    <Box sx={styles.section}>
      <Container>
        <Box sx={styles.content}>
          <Heading as="h3">{title}</Heading>
          <Text as="p">{text}</Text>
          <Link href={button.link}>
            {button.label} <IoIosArrowForward />
          </Link>
        </Box>
        <Box onClick={handleClick} sx={styles.image}>
          <Image width="1075" height="650" src={image} alt="video image" />
        </Box>
      </Container>
      <ModalVideo
        channel="youtube"
        isOpen={videoOpen}
        videoId="Qwok8si3bz4"
        onClose={() => setVideoOpen(false)}
      />
    </Box>
  );
};

export default Video;

const styles = {
  section: {
    pt: ['0px', null, null, '70px', '0'],
  },
  image: {
    display: 'block',
    mx: 'auto',
    cursor: 'pointer',
  },
  content: {
    textAlign: 'center',
    mb: '20px',
    h3: {
      fontSize: ['22px', null, null, '24px', null, '30px'],
      fontWeight: 500,
      color: '#0F2137',
      letterSpacing: '-0.5px',
      mb: '20px',
      maxWidth: ['300px', null, null, '100%'],
      mx: ['auto', null, null, '0'],
      lineHeight: [1.5, null, null, null, null, 'auto'],
    },
    p: {
      mx: 'auto',
      fontSize: ['15px', null, null, '16px'],
      color: '#0F2137',
      lineHeight: [1.87, null, null, 2.19],
      maxWidth: '625px',
      mb: '20px',
    },
    a: {
      display: 'inline-flex',
      alignItems: 'center',
      color: '#4F96FF',
      fontSize: '16px',
      fontWeight: 700,
      transition: 'all 500ms ease',
      '&:hover': {
        color: 'black',
      },
      svg: {
        ml: '5px',
      },
    },
  },
};
