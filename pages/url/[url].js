import { Flex } from '@chakra-ui/react';
const Url = () => {
  return <Flex>No long url found with the given short url.</Flex>;
}

export default Url;

export async function getServerSideProps(context) {
  const  { url } = context.params;
  console.log(url)
  
  const urls = {
    abc:"https://gmail.com/"
  }

  if(urls[url]){
    return {
      redirect: {
        destination: urls[url], 
        permanent: false,
      },
    }
  }
  else
  {
    return {
      redirect: {
        destination: "/url",
        permanent: false,
      }
    }
  }
  return {
    props: {},
  };
}