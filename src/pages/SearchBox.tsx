import { Flex, Input, Icon } from '@chakra-ui/react'
import { RiSearchLine } from 'react-icons/ri'
import { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';

interface OrderProps {
    asks: []
    bids: []
    lastUpdated: number
}

interface SearchBoxProps {
    setOrders: Dispatch<SetStateAction<OrderProps>>;
    setPrice: Dispatch<SetStateAction<string>>;
}

export function SearchBox({ setOrders, setPrice }: SearchBoxProps) {

    const [orderSymbol, setOrderSymbol] = useState<String>('')

    const getOrderBook = async () => {        
        while(true) {
            try {
                const orders = await fetch(`http://api.binance.com/api/v3/depth?symbol=${orderSymbol.toUpperCase().replace('/', '')}`)
                const price = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${orderSymbol.toUpperCase().replace('/', '')}`)                
                setOrders(await orders.json())                
                setPrice(JSON.parse(await price.text()).price)
            } catch(err) {
                console.log(err)
            }
        }
    }

    return (
        <Flex
            as="label"
            flex="1"
            py="4"
            px="8"
            ml="6"
            maxW={400}
            alignSelf="center"
            
            position="relative"
            bg="gray.800"
            borderRadius="full"
        >            
            <Input 
                id="name" 
                name="name" 
                type="text"
                color="gray.50"
                variant="unstyled"
                px="4"
                mr="4"
                placeholder="Get orders"
                _placeholder={{
                    color: 'gray.400'
                }}
                onChange={event => setOrderSymbol(event.target.value)}                              
            />            
            <Icon as={RiSearchLine} fontSize={20} onClick={getOrderBook} cursor="pointer"/>
        </Flex>
    )
}