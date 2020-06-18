import React, { useState, useEffect } from 'react';
import ImageCard from '../Card/ImageCard/index';
import styles from './style';
import { getInternship } from '../../../api/index';
import moment from 'moment';
import 'moment/locale/fr';

function ContainerInternship(props: any) {
    const [internship, setInternship] = useState([]);

    useEffect(() => {
        getInternship()
            .then((res : any) => {
                let tmpInternship = res.map((internship: any) => {
                    return {
                        mission: internship.missionSummary,
                        value: internship.title,
                        companyName: internship.companyName,
                        typeDeMission: internship.typeDefaultValue,
                        duree: internship.duration,
                        start: moment(internship.dateStart).format('ll'),
                        end: moment(internship.dateEnd).format('ll'),
                        text: internship.companyName,
                        contact: internship.contact,
                        phone: internship.contactPhone,
                        mail: internship.contactMail,
                        adress: internship.addressOne,
                        postal: internship.postalCode,
                        ville: internship.city,
                        pays: internship.country,
                    }
                });
                setInternship(tmpInternship);
            })
    }, []);


    const classes = styles();
    return internship.length > 0 ? (
        <>
            {internship.map((item: any, index: any) => (
                <div className="cardInternship" key={index}>
                    <ImageCard
                        image={
                            'https://studandglobe.com/wp-content/uploads/2019/01/ALERTE-STAGE_Plan-de-travail-1-copie-01.jpg'
                        }
                        title={item.value}
                        text={' Desciption de la mission : ' + item.mission}
                        textCompany={
                            "Nom de l'entreprise : " + item.companyName
                        }
                        hasButton={false}
                        buttonText={'détails'}
                        altImage={'image offre de stage'}
                        typeDeMission={
                            'Type de contrat : ' + item.typeDeMission
                        }
                        duree={'Durée de la mission : ' + item.duree}
                        start={'Date de début : ' + item.start}
                        end={'Date de fin : ' + item.end}
                        contact={'Contact : ' + item.contact}
                        phone={'Téléphone : ' + item.phone}
                        mail={'Email : ' + item.mail}
                        adress={'Lieu : ' + item.adress}
                        postal={item.postal}
                        ville={item.ville}
                        pays={item.pays}
                    />
                </div>
            ))}
        </>
    ) : (
        <> </>
    );
}

export default ContainerInternship;
