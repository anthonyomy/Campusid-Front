import React, {useEffect,useState} from 'react';
import styles from './style';
import ImgInformation from '../../common/components/ImgInformation';
import { Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {getTrombinoscope} from '../../api/index';
import { useCurrentUser } from 'common/hooks';


const Trombinoscope = () => {
    const classes = styles();
    const [TabEtudiant, setTabEtudiant] = useState([]);
    const currentUser = useCurrentUser();


    useEffect(() => {
        getTrombinoscope(currentUser.idboard)
            .then((res : any) => {
               let tmpTabEtudiant = res.students.map((student: any) => {
                   return {
                       id: student.idboard,
                       name: student.firstName,
                       lastName: student.name,
                       img: student.photoPath
                   }
               });
               setTabEtudiant(tmpTabEtudiant);
            })
    }, []);

    //const TabEtudiant = [
     //   {id: 1, name: "Jean", lastName: "Yves", img: "https://thispersondoesnotexist.com/image" },{id: 1, name: "Marc", lastName: "Henry", img: "https://thispersondoesnotexist.com/image" },{id: 1, name: "Paul", lastName: "Jacques", img: "https://thispersondoesnotexist.com/image" },{id: 1, name: "Pierre", lastName: "Paul", img: "https://thispersondoesnotexist.com/image" },{id: 1, name: "Prince", lastName: "Mickael", img: "https://thispersondoesnotexist.com/image" },{id: 1, name: "Remy", lastName: "Lannyere", img: "https://thispersondoesnotexist.com/image" },{id: 1, name: "Jerry", lastName: "Dou", img: "https://thispersondoesnotexist.com/image" },{id: 1, name: "Phillipe", lastName: "Row", img: "https://thispersondoesnotexist.com/image" },{id: 1, name: "Black", lastName: "Berry", img: "https://thispersondoesnotexist.com/image" },{id: 1, name: "Sam", lastName: "Sung", img: "https://thispersondoesnotexist.com/image" }]


    return (
        <div>
            <Grid container spacing={2}>
                    {TabEtudiant.map(value =>
                        <ImgInformation eleve={value}></ImgInformation>
                    )}
            </Grid>
        </div>
    );
};

export default Trombinoscope;