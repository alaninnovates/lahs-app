import { Box, Image } from '@chakra-ui/react';
// import campusMap from './campus-map.png';
import campusMap from './image.png';
import { useEffect, useRef, useState } from 'react';

const Dot = ({ position }: { position: { x: number, y: number } }) => {
    return (
        <Box
            position={'absolute'}
            left={`${position.x}px`}
            top={`${position.y}px`}
            bgColor={'red.500'}
            borderRadius={'full'}
            w={'10px'}
            h={'10px'}
        />
    );
};

//distance x: 1,019.48 ft (310.74 m)
//distance y: 1,318.26 ft (401.80 m)

// the top left corner of the property
const propertyBoundaries = {
    topLeft: {
        x: 37.388108453155274, y: -122.11086695167541
    },
    bottomRight: {
        x: 37.384503051331065, y: -122.10735850360584
    }
};

export const Map = () => {
    const campusImg = useRef<HTMLImageElement>(null);
    const [imagePos, setImagePos] = useState({ x: 0, y: 0, w: 0, h: 0 });
    // the position the dot should be placed at on the webpage, measured in px units
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [permission, setPermission] = useState(false);
    useEffect(() => {
        if (!campusImg.current) return;
        window.onresize = () => {
            if (!campusImg.current) return;
            setImagePos({
                x: campusImg.current.x,
                y: campusImg.current.y,
                w: campusImg.current.width,
                h: campusImg.current.height,
            });
        }
    }, [campusImg]);
    useEffect(() => {
        console.log(imagePos);
        const watch = navigator.geolocation.watchPosition((position) => {
            console.log(position.coords.latitude, position.coords.longitude);
            // top right of big gym
            // const lat = 37.38708928259531, long = -122.10905035584749
            // top right of building next to 304
            // const lat = 37.38607621011464, long = -122.10880372168637
            // bottom left corner of student services
            const lat = 37.38525130052182, long = -122.10793309347262;
            // top right corner of 900s
            // const lat = 37.38754091591029, long = -122.1095991173775
            // x = imageWidth * ( pointLon - ImageExtentLeft ) / (ImageExtentRight - ImageExtentLeft);
            // y = imageHeight * ( 1 - ( pointLat - ImageExtentBottom) / (ImageExtentTop - mImageExtentBottom));
            const x = imagePos.w * (long - propertyBoundaries.topLeft.y) / (propertyBoundaries.bottomRight.y - propertyBoundaries.topLeft.y) + imagePos.x
            const y = imagePos.h * (1 - (lat - propertyBoundaries.bottomRight.x) / (propertyBoundaries.topLeft.x - propertyBoundaries.bottomRight.x)) + imagePos.y
            setX(x);
            setY(y);
            console.log(x, y);
            setPermission(true);
        }, (error) => {
            console.log(error);
            setPermission(false);
        });
        return () => {
            navigator.geolocation.clearWatch(watch);
        }
    }, [imagePos]);
    return (
        <Box w={'100%'} position={'relative'}
             display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Image src={campusMap} alt={'Campus Map'} objectFit={'contain'} h={'100%'} ref={campusImg}/>
            {permission && <Dot position={{ x, y }}/>}
        </Box>
    );
};
