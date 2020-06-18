import React, {useState, useEffect} from 'react';
import styles from './style';
import TabCustom from 'common/components/TabCustom';
//import Card from 'common/components/Card/ImageCard';
import ContainerInternship from 'common/components/ContainerInternship';
import ContainerEvent from 'common/components/ContainerEvent';
import {getInternship} from '../../api/index';
import { useCurrentUser } from 'common/hooks';

const News = () => {
    const classes = styles();

    const getComponentInternship = () => {
        return <ContainerInternship />;
    };
    const getComponentEvent = () => {
        return <ContainerEvent />;
    };

    let tabArray = [
        { name: 'Offre de stage', component: getComponentInternship },
        { name: 'Evénements', component: getComponentEvent },
    ];

    return <TabCustom onglets={tabArray}></TabCustom>;
};

export default News;
