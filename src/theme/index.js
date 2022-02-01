import {extendTheme , theme as base , withDefaultColorScheme, withDefaultVariant} from '@chakra-ui/react'
import {mode} from '@chakra-ui/theme-tools'

const brandRing = {
    _focus : {
        ring : 2,
        ringColor : 'brand.500'
    },
}


const inputSelectStyles = {
    variants : {
        filled : {
            field : {
                _focus : {
                    borderColor : 'brand.500'
                },
            },
        },
    },
    sizes : {
        md : {
            field : {
                borderRadius : 'none'
            },
        },
    },
}

const checkboxStyles = {
    baseStyle : {
        control : {
            borderRadius : 'none', 
            ...brandRing
        },
    },
}

const buttonStyles = {
    variants : {
        primary : (props)=>({
            rounded : 'none',
            ...brandRing,
            color : mode('white','gray.800')(props),
            backgroundColor : mode('brand.500','brand.200')(props),
            
            _hover : {
                backgroundColor : mode('brand.600','brand.300')(props),
            },

            _active : {
                backgroundColor : mode('brand.700','brand.400')(props),
            }
        }),
    },
}

const tabStyles = {
    variants : {
        primary : (props)=>({
            rounded : 'none',
            ...brandRing,
            color : mode('white','gray.800')(props),
            backgroundColor : mode('brand.500','brand.200')(props),
            
            _hover : {
                backgroundColor : mode('brand.600','brand.300')(props),
            },

            _active : {
                backgroundColor : mode('brand.700','brand.400')(props),
            }
        }),
    },
}

const brandColors = {
    50 : '#ffffff',
    100 : '#f7d7db',
    150 : '#f3c2c9',
    200 : '#efaeb7',
    250 : '#eb9aa5',
    300 : '#e78692',
    350 : '#e37280',
    400 : '#df5d6e',
    450 : '#db495c',
    500 : '#d7354a',
    550 : '#c23043',
    600 : '#ac2a3b',
    650 : '#972534',
    700 : '#81202c',
    750 : '#6c1b25',
    800 : '#56151e',
    850 : '#401016',
    900 : '#2b0b0f'
}

const theme = extendTheme(
    {
        fonts : {
            heading : `Montserrat, ${base.fonts?.heading}`,
            body : `Inter, ${base.fonts?.body}`
        },
        colors : {
            brand : {...brandColors}
        },
        components : {
            Input : {...inputSelectStyles},
            Select : {...inputSelectStyles},
            Checkbox : {...checkboxStyles},
            Button : {...buttonStyles},
            Tab : {...tabStyles}
        },
    },
    withDefaultColorScheme({
        colorScheme : 'brand',
        components : ['Checkbox']
    }),
    withDefaultVariant({
        variant : 'filled',
        components : ['Input', 'Select']
    })
)

export default theme