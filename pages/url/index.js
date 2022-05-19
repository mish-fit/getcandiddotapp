import Layout from "components/onboard/Layout";
import { useEffect, useState } from "react";
import { Button, Flex, FormLabel, Heading, Input } from '@chakra-ui/react';
export default function Index() {
  const [longUrl, setLongUrl] = useState('');

  const onChangeUrl = (e) => {
    e.preventDefault();
    setLongUrl(e.target.value);
  }

	const shortHandler = (e) => {
		e.preventDefault();
    console.log(longUrl)
    
  }

  return(
    <Flex flexDirection={'column'} w='100%'>
    <Flex  flexDirection={"column"} margin={6}>
      <Heading size={'lg'} textAlign={{base:'center', md:'left'}}>Enter a URL to Short</Heading>
      <form onSubmit={shortHandler}>
        <Flex flexDirection={'row'} alignItems={'center'} my='16px'>
          <Input
            name='url'
            width={'md'}
            display='inline'
            onChange={onChangeUrl}
          />
        </Flex>
        <Flex>
        <Button
          variant={'primary'}
          width={'md'}
          _hover={{ bg: '#C23043' }}
          type='submit'
        >
          Short
        </Button>
        </Flex>
      </form>
    </Flex>
    </Flex>
  )
}


export async function getServerSideProps() {
  return {
    props: {},
  };
}
