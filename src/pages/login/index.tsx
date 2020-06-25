//@ts-nocheck

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Checkbox,
    FormControlLabel,
    CardMedia,
} from '@material-ui/core';

import { fetchUser } from 'api';

import {
    userLogin,
    userLoginSuccess,
    userLoginError,
} from 'common/state/actions';

import CustomInput from 'common/components/CustomInput';
import ButtonCustom from 'common/components/ButtonCustom';

import styles from './style';

export default function FormDialog() {
    const dispatch = useDispatch();
    const classes = styles();
    const [idboard, setIdboard] = useState('');
    const [password, setPassword] = useState('');

    const callBackButton = () => {
        if (idboard && password) {
            fetchUser(idboard)
                .then(res => {
                    dispatch(
                        userLogin({
                            idboard: res.idboard,
                            classId: res.idCurrentClass,
                            lastname: res.name,
                            firstname: res.firstName,
                            photo: res.photoPath,
                            avatar: res.avatar || '',
                            role: res.idTypeBusinessEntity,
                            idCurrentClass: res.idCurrentClass,
                        })
                    );
                })
                .then(() => {
                    dispatch(userLoginSuccess);
                    window.location.assign('/planning');
                })
                .catch(err => {
                    dispatch(userLoginError);
                });
        }
    };

    const inputMailComputed = (event: any) => {
        setIdboard(event.target.value);
    };

    const inputPasswordComputed = (event: any) => {
        setPassword(event.target.value);
    };

    return (
        <div>
            <Dialog
                className={classes.containerLogin}
                style={{
                    backgroundImage:
                        "url('https://cdn2.scratch.mit.edu/get_image/gallery/5262616_170x100.png')",
                    backgroundSize: 'cover',
                }}
                open={true}
                PaperProps={{
                    style: {
                        backgroundColor: 'white',
                        boxShadow: 'none',
                    },
                }}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle
                    style={{
                        textAlign: 'center',
                        color: 'white',
                        backgroundColor: '#B70000',
                    }}
                    id="form-dialog-title"
                >
                    <CardMedia
                        className={classes.logoCampus}
                        image={require('../../common/components/header/CampusIdLogoPhone.png')}
                        title="Campus ID"
                    />
                </DialogTitle>
                <DialogContent>
                    <br></br>
                    <br></br>
                    <CustomInput
                        name="N°IDBoard"
                        type="ID"
                        style={{ margin: 20, backgroundColor: 'white' }}
                        size="medium"
                        color="secondary"
                        callBack={inputMailComputed}
                        hasIcon={false}
                    />
                    <br></br>
                    <br></br>
                    <CustomInput
                        name="Mot de passe"
                        type="password"
                        width="100%"
                        style={{ margin: 20, backgroundColor: 'white' }}
                        size="medium"
                        color="secondary"
                        callBack={inputPasswordComputed}
                        hasIcon={false}
                    />
                    <FormControlLabel
                        value="Save"
                        control={<Checkbox />}
                        style={{ margin: 35, backgroundColor: '870D0D' }}
                        label="Se souvenir de moi"
                    />
                </DialogContent>

                <DialogActions style={{ display: 'flex' }}>
                    <div style={{ margin: 'auto', backgroundColor: 'white' }}>
                        <ButtonCustom
                            disabled={!password || !idboard}
                            callBack={callBackButton}
                            typeButton="contained"
                            valueButton="Se connecter"
                        />
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}
