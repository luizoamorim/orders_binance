import { 
  Flex, 
  Table, 
  Thead, 
  Tbody,
  Th, 
  Tr, 
  Td,
  Text,
  Icon
} from '@chakra-ui/react'
import { SearchBox } from './SearchBox'
import { useState } from 'react'
import { HiOutlineSwitchVertical } from 'react-icons/hi'
interface OrderProps {
  asks: []
  bids: []
  lastUpdated: number
}

export default function Home() {    
    
    const [orders, setOrders] = useState<OrderProps>(null)
    const [price, setPrice] = useState<string>('')
    
    return (
        <Flex direction="column" h="100hv">          
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
              <SearchBox setOrders={setOrders} setPrice={setPrice}/>              
            </Flex>

            {orders &&              
              <Flex w="100%" my="6" maxWidth={580} mx="auto" px="6">                
                <Table colorScheme="blackAlpha" size="sm">
                    <Thead>
                        <Tr>                            
                            <Th>Price</Th>
                            <Th>Amount</Th>                            
                            <Th>Total</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                      {orders.asks.slice(0, 10).map(order => (
                        <Tr _hover={{
                          bgColor: 'black'
                        }}>                            
                          <Td>                                                            
                            <Text fontSize="xs" color="red">{order[0]}</Text>                              
                          </Td>
                          <Td>
                            <Text fontSize="xs" color="red">{order[1]}</Text>                                
                          </Td>                            
                          <Td>
                            <Text fontSize="xs" color="gray.300">{(parseFloat((order[0]))*(parseFloat(order[1]))).toFixed(5)}</Text>   
                          </Td> 
                        </Tr>
                      ))}
                      
                      <Tr marginLeft={3}>                            
                            <Th><Text fontSize="md">{price}</Text></Th>
                            <Th></Th>                            
                            <Th>
                              <Icon as={HiOutlineSwitchVertical} fontSize={20}/>
                            </Th>
                      </Tr>
                                            
                      {orders.bids.slice(0, 10).map(order => (
                        <Tr _hover={{
                          bgColor: 'black'
                        }}>
                          <Td>                                                            
                            <Text fontSize="xs" color="green">{order[0]}</Text>                              
                          </Td>
                          <Td>
                            <Text fontSize="xs" color="green">{order[1]}</Text>                                
                          </Td>                            
                          <Td>
                            <Text fontSize="xs" color="gray.300">{(parseFloat((order[0]))*(parseFloat(order[1]))).toFixed(5)}</Text>   
                          </Td> 
                        </Tr>
                      ))}
                    </Tbody>
                </Table>
              </Flex>
            }
        </Flex>
    )

}