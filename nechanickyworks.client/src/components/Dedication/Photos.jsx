import * as React from 'react';
import { ImageListItem, ImageList, Box } from '@mui/material';
import AllPics from './Data/AllPics';
export default function Photos() {
    return (
            <ImageList variant="masonry" cols={3} gap={8}>
                {AllPics.map((item) => (
                    <ImageListItem key={item}>
                        <img
                            srcSet={`${item}`}
                            src={`${item}`}
                            alt={item}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
    );
}