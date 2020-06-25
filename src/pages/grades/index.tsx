import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getIdboard, getClassId } from 'common/state/selectors';
import CustomInput from 'common/components/CustomInput';
import TabCustom from 'common/components/TabCustom';
import Accordeon from 'common/components/Accordeon';
import ColumnChartContainer from 'common/components/ColumnChartContainer';
import RadartChart from 'common/components/RadarChartContainer';
import { getMarks } from '../../api/index';
import _ from 'lodash';

const Grades = () => {
    const idboard = useSelector(getIdboard);
    const classId = useSelector(getClassId);

    const [allMatieres, setAllMatieres] = useState<any>([]);
    const [filteredMatieres, setFilteredMatieres] = useState<any>();
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        try {
            getMarks(idboard, classId).then((res: any) => {
                setAllMatieres(
                    res.filter((matiere: any) => {
                        return matiere.descriptionDefaultValueDomain != null;
                    })
                );
            });
        } catch (err) {
            console.log(err);
        }
    }, [classId, idboard]);

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
            allMatieres && (
                <Accordeon
                    resultsTotale={resultsTotale}
                    matieres={filteredMatieres || allMatieres}
                />
            )
        );
    };

    const getOngletsWithData = () => {
        const tmpDomainAverage = allMatieres.map(
            (e: {
                descriptionDefaultValueDomain: string;
                mediumOfIdIdentifiant: string;
            }) => {
                return {
                    name: e.descriptionDefaultValueDomain,
                    average: e.mediumOfIdIdentifiant,
                };
            }
        );

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
            //     name: 'Graphique Camembert',
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

    return (
        <>
            <CustomInput
                id="outlined-required"
                size="medium"
                color="secondary"
                placeholder="Matière..."
                hasIcon={true}
                value={filterText}
                onChange={onChange}
                callBack={inputComputed}
                name="Matière"
            />
            <TabCustom onglets={getOngletsWithData()} />;
        </>
    );
};

export default Grades;
