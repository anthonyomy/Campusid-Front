import React, { useState, useEffect } from 'react';
import TabCustom from 'common/components/TabCustom';
import Accordeon from 'common/components/Accordeon';
import GraphsContainer from 'common/components/GraphsContainer';
import ColumnChartContainer from 'common/components/ColumnChartContainer';
import RadartChart from 'common/components/RadarChartContainer';
import { getGrades } from '../../api/index';
import _ from 'lodash';

const Grades = () => {
    const [matieres, setMatieres] = useState<any>([]);

    useEffect(() => {
        getGrades().then((res: any) => {
            setMatieres(res);
        });
    }, []);

    let resultsTotale = {
        inProgress: {
            name: 'En cours de validation',
            icon: 'https://image.flaticon.com/icons/svg/325/325211.svg',
        },

        validated: {
            name: 'Validé',
            icon: 'https://image.flaticon.com/icons/svg/390/390973.svg',
        },

        failed: {
            name: 'Echoué',
            icon: 'https://image.flaticon.com/icons/svg/594/594864.svg',
        },

        obtainedCredits: {
            name: 'Crédits obtenu',
            icon: 'https://image.flaticon.com/icons/svg/794/794625.svg',
        },
    };

    const getComponentAccordeon = () => {
        return <Accordeon resultsTotale={resultsTotale} matieres={matieres} />;
    };

    const getOngletsWithData = () => {
        let tmpDomainAverage: any = [];

        for (let y = 0; y < matieres.length; y++) {
            let domainAverageToPush = {
                name: matieres[y].descriptionDefaultValueDomain,
                average: matieres[y].mediumOfIdIdentifiant,
            };
            tmpDomainAverage.push(domainAverageToPush);
        }

        const orderAscDomainAverage = _.orderBy(
            tmpDomainAverage,
            ['average'],
            ['asc']
        );
        const flopAverage = orderAscDomainAverage.slice(0, 3);

        const orderDescDomainAverage = _.orderBy(
            tmpDomainAverage,
            ['average'],
            ['desc']
        );
        const topAverage = orderDescDomainAverage.slice(0, 3);
        const topFlopDomainAverage = [...flopAverage, ...topAverage];

        return [
            { name: 'Note', component: getComponentAccordeon },
            {
                name: 'Graphique Camenbert',
                component: <GraphsContainer dataAverage={tmpDomainAverage} />,
            },
            {
                name: 'Graphique Colonne',
                component: (
                    <ColumnChartContainer dataAverage={tmpDomainAverage} />
                ),
            },
            {
                name: 'Graphique Radar',
                component: <RadartChart dataAverage={tmpDomainAverage} />,
            },
        ];
    };

    return <TabCustom onglets={getOngletsWithData()} />;
};

export default Grades;
