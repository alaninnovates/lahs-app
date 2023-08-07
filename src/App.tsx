import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Flex, Heading, Image, Tab, TabList, Tabs } from '@chakra-ui/react';
import { Map } from './pages/Map';
import React from 'react';
import { FaHome, FaInfo, FaMap } from 'react-icons/fa';
import lahs from './lahs.png';

// const IconTab = React.forwardRef((props, ref) => {
//     // 1. Reuse the `useTab` hook
//     const tabProps = useTab({ ...props, ref })
//     const isSelected = tabProps['aria-selected']
//
//     // 2. Hook into the Tabs `size`, `variant`, props
//     const styles = useMultiStyleConfig('Tabs', tabProps)
//
//     return (
//         <IconButton __css={styles.tab} {...tabProps}>
//             {tabProps.children}
//         </IconButton>
//     )
// })


const LinkTab = ({ to, icon }: {
    to: string;
    icon: React.ReactNode;
}) => {
    const navigate = useNavigate();
    return (
        <Tab
            onClick={() => {
                navigate(to);
            }}
        >
            {icon}
        </Tab>
    );
};

const RouterTabs = ({ routes, children }: {
    routes: string[];
    children: React.ReactNode;
}) => {
    const location = useLocation();
    const index = routes.indexOf(location.pathname);
    return (
        <Tabs index={index} align={'center'} size={'lg'} isFitted={true}
              position={'fixed'} bottom={0} left={0} right={0} zIndex={1}
              bgColor={'white'} borderTop={'1px solid #eee'}>
            {children}
        </Tabs>
    );
};

export const App = () => {
    return (
        <BrowserRouter>
            <RouterTabs routes={['/', '/map', '/about']}>
                <TabList>
                    <LinkTab to="/" icon={<FaHome/>}/>
                    <LinkTab to="/map" icon={<FaMap/>}/>
                    <LinkTab to="/about" icon={<FaInfo/>}/>
                </TabList>
            </RouterTabs>
            <Flex
                as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                w="100%"
                p={3}
                bg={'blue.500'}
            >
                <Image src={lahs} alt={'LAHS'} w={'50px'} h={'50px'}/>
            </Flex>
            <Routes>
                <Route path="/" element={<p>home</p>}/>
                <Route path="/map" element={<Map/>}/>
                <Route path="/about" element={<p>hi</p>}/>
            </Routes>
        </BrowserRouter>
    );
};
