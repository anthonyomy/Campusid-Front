import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getIdboard } from 'common/state/selectors';
import CustomInput from 'common/components/CustomInput';
import TabCustom from 'common/components/TabCustom';
import Accordeon from 'common/components/Accordeon';
import ColumnChartContainer from 'common/components/ColumnChartContainer';
import RadartChart from 'common/components/RadarChartContainer';
import { getMarks } from '../../api/index';
import _ from 'lodash';

const Grades = () => {
    const [allMatieres, setAllMatieres] = useState<any>([]);
    const [filteredMatieres, setFilteredMatieres] = useState<any>();
    const idboard = useSelector(getIdboard);
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        try {
            getMarks(idboard).then((res: any) => {
                setAllMatieres(res);
            });
        } catch (err) {
            console.log(err);
        }
    }, [idboard]);

    const onChange = (value: string) => {
        setFilterText(value);
    };

    const filteredMatter = (arr: any, request: any) => {
        return arr.filter((el: any) => {
            if (el.descriptionDefaultValueDomain) {
                return el.descriptionDefaultValueDomain
                    .toLowerCase()
                    .includes(request.toLowerCase());
            }
            return '';
        });
    };

    const inputComputed = (event: any) => {
        if (event) {
            setFilteredMatieres(
                filteredMatter(allMatieres, event.target.value)
            );
        } else {
            setFilteredMatieres(allMatieres);
        }
    };

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
        return (
            <>
                <CustomInput
                    id="outlined-required" //variant="outlined" type="text" style={{ margin: 20 }}
                    size="medium"
                    color="secondary"
                    placeholder="text"
                    hasIcon={true}
                    value={filterText}
                    onChange={onChange}
                    callBack={inputComputed}
                    name="Matiére"
                />
                <Accordeon
                    resultsTotale={resultsTotale}
                    matieres={filteredMatieres || allMatieres}
                />
            </>
        );
    };

    const getOngletsWithData = () => {
        let tmpDomainAverage: any = [];

        for (let y = 0; y < allMatieres.length; y++) {
            let domainAverageToPush = {
                name: allMatieres[y].descriptionDefaultValueDomain,
                average: allMatieres[y].mediumOfIdIdentifiant,
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
            // {
            //     name: 'Graphique Camenbert',
            //     component: <GraphsContainer dataAverage={tmpDomainAverage} />,
            // },
            {
                name: 'Graphique Colonne',
                component: (
                    <ColumnChartContainer dataAverage={tmpDomainAverage} />
                ),
            },
            {
                name: 'Graphique Radar',
                component: <RadartChart dataAverage={topFlopDomainAverage} />,
            },
        ];
    };

    return <TabCustom onglets={getOngletsWithData()} />;
};

export default Grades;
