import { Container, FormControl, Input } from '@chakra-ui/react';

const AddRecommendation= () => (
    <Container>
       <FormControl>
        <Input id='title' type='text' placeholder='Product Name'/>
        <Input id='title' type='text' placeholder='URL'/>
        <Input id='title' type='text' placeholder='Affiliate Code'/>
        <Input id='title' type='text' placeholder='Image Input'/>
        <Input id='title' type='text' placeholder='Save'/>
    </FormControl>
    </Container>
)   


export default AddRecommendation;

