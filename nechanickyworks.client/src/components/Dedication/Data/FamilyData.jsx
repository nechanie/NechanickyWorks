import React from 'react';
import brothers from '../../../assets/imgs/Dedication/all/brothers.jpg';
import family from '../../../assets/imgs/Dedication/all/family.jpg';
import FatherAndSon from '../../../assets/imgs/Dedication/all/FatherAndSon.jpg';
import MotherAndSon from '../../../assets/imgs/Dedication/all/MotherAndSon.jpg';
import friends from '../../../assets/imgs/Dedication/all/friends.jpg';

const FamilyData = ([
    {
        relationship: 'Son',
        images: [FatherAndSon, MotherAndSon]
    },
    {
        relationship: 'Brother',
        images: [brothers]
    },
    {
        relationship: 'Uncle',
        images: [family]
    },
    {
        relationship: 'Friend',
        images: [friends]
    }
]);

export default FamilyData;