import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import styles from './style';

type Props = {
    title: string;
    text: string;
    image: string;
    hasButton: boolean;
    buttonText: string;
    altImage: string;
    textCompany: string;
    typeDeMission: string;
    duree: string;
    start: string;
    end: string;
    contact: string;
    phone: string;
    mail: string;
    adress: string;
    postal: string;
    ville: string;
    pays: string;
};

export default function ImageCard(props: Props) {
    const handleClick = () => {
        alert('Button clicked ! :D');
    };

    const {
        image,
        title,
        hasButton,
        buttonText,
        altImage,
        text = '',
        textCompany = '',
        typeDeMission = '',
        duree = '',
        start = '',
        end = '',
        contact = '',
        phone = '',
        mail = '',
        adress = '',
        postal = '',
        ville = '',
        pays = '',
    } = props;

    const classes = styles();

    return (
        <Card className={classes.Card}>
            <Grid container direction="row">
                <Grid item container justify="center" md={4} xs={12}>
                    <img
                        className={classes.img}
                        src={image}
                        alt={altImage}
                    ></img>
                </Grid>

                <Grid item md={6} xs={12} className={classes.content}>
                    <CardContent>
                        <Typography variant="h4" color="secondary">
                            {title}
                        </Typography>
                        <p>{textCompany}</p>

                        <p>{typeDeMission}</p>

                        <p>{duree}</p>
                        <p>{start}</p>
                        <p>{end}</p>

                        <p>{text}</p>

                        <p>{contact}</p>
                        <p>{phone}</p>
                        <p>{mail}</p>
                        <p>{adress}</p>
                        <p>{postal}</p>
                        <p>{ville}</p>
                        <p>{pays}</p>
                    </CardContent>
                </Grid>
                {hasButton ? (
                    <Grid
                        className={classes.buttonContainer}
                        item
                        md={2}
                        xs={12}
                    >
                        <CardActions>
                            <Button
                                size="medium"
                                onClick={handleClick}
                                variant="outlined"
                                color="secondary"
                            >
                                {buttonText}
                            </Button>
                        </CardActions>
                    </Grid>
                ) : null}
            </Grid>
        </Card>
    );
}
