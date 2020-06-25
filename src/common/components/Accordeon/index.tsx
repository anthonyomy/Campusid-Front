import React, { useState, useEffect } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import useStyles from './style';
import { Card, CardMedia, Grid } from '@material-ui/core';
import { CardContent } from '@material-ui/core';

function Accordeon(props: any) {
    const classes = useStyles();
    let matieres = props.matieres;
    let resultsTotale = props.resultsTotale;

    let ectsObtained = 0;
    let ectsTotalYears = 0;
    matieres.map((matiere: any) => {
        ectsTotalYears += matiere.ectscredits;
        if (matiere.isValidate === 1) {
            ectsObtained += matiere.ectscredits;
        }
    });

    const matiereInProgress = matieres.filter((matiere: any) => {
        return matiere.isValidate === 0;
    }).length;

    const mattersValidation = matieres.filter((matiere: any) => {
        return matiere.isValidate === 1;
    }).length;

    const mattersCancelled = matieres.filter(
        (matiere: any) => matiere.isValidate === -1
    ).length;

    const getBackgroundHeading = (matiere: any) => {
        return matiere.isValidate === 1
            ? classes.backgroundValid
            : matiere.isValidate === -1
            ? classes.backgroundInvalid
            : classes.heading;
    };
    const getClassOfNote = (note: any) => {
        if (note.marks !== null) {
            return note.marks.map((mark: any) => {
                return mark.value >= 10
                    ? classes.details + ' ' + classes.backgroundValid
                    : mark.value < 10
                    ? classes.details + ' ' + classes.backgroundInvalid
                    : classes.details;
            });
        }
    };

    return (
        <>
            <div className={classes.root}>
                <Card className={classes.root}>
                    <div className={classes.details}>
                        <CardContent>
                            <div className="content">
                                <Grid container>
                                    <Grid item xs={12} sm container>
                                        <Grid
                                            item
                                            container
                                            direction="column"
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Grid item>
                                                <CardMedia
                                                    className={
                                                        classes.cardImage
                                                    }
                                                    image={
                                                        resultsTotale.inProgress
                                                            .icon
                                                    }
                                                    title="En cours de validation.."
                                                />
                                            </Grid>

                                            <Grid item>
                                                <Typography
                                                    component="h6"
                                                    variant="h6"
                                                >
                                                    {
                                                        resultsTotale.inProgress
                                                            .name
                                                    }{' '}
                                                    : {matiereInProgress}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm
                                        container
                                        alignItems="center"
                                    >
                                        <Grid
                                            item
                                            container
                                            direction="column"
                                            justify="center"
                                        >
                                            <Grid item>
                                                <CardMedia
                                                    className={
                                                        classes.cardImage
                                                    }
                                                    image={
                                                        resultsTotale.validated
                                                            .icon
                                                    }
                                                    title="Validé"
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography
                                                    component="h6"
                                                    variant="h6"
                                                >
                                                    {
                                                        resultsTotale.validated
                                                            .name
                                                    }{' '}
                                                    : {mattersValidation}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm container>
                                        <Grid
                                            item
                                            container
                                            direction="column"
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Grid item>
                                                <CardMedia
                                                    className={
                                                        classes.cardImage
                                                    }
                                                    image={
                                                        resultsTotale.failed
                                                            .icon
                                                    }
                                                    title="Echoué"
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography
                                                    component="h6"
                                                    variant="h6"
                                                >
                                                    {resultsTotale.failed.name}{' '}
                                                    : {mattersCancelled}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm container>
                                        <Grid
                                            item
                                            container
                                            direction="column"
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Grid item>
                                                <CardMedia
                                                    className={
                                                        classes.cardImage
                                                    }
                                                    image={
                                                        resultsTotale
                                                            .obtainedCredits
                                                            .icon
                                                    }
                                                    title="Crédits"
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography
                                                    component="h6"
                                                    variant="h6"
                                                >
                                                    {
                                                        resultsTotale
                                                            .obtainedCredits
                                                            .name
                                                    }{' '}
                                                    :{' '}
                                                    {Math.round(ectsObtained) +
                                                        '/' +
                                                        Math.round(
                                                            ectsTotalYears
                                                        )}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </CardContent>
                    </div>
                </Card>

                {matieres.map(function(matiere: any, index: any) {
                    return (
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className={getBackgroundHeading(matiere)}
                            >
                                <div
                                    className={classes.column}
                                    style={{ marginRight: '15px' }}
                                >
                                    <CardMedia
                                        className={classes.logo}
                                        image={matiere.icon}
                                        title="Campus ID"
                                    />
                                </div>
                                <div
                                    className={
                                        classes.column +
                                        ' ' +
                                        classes.marginCenterY
                                    }
                                >
                                    <strong>
                                        {matiere.descriptionDefaultValueDomain}
                                    </strong>
                                </div>
                            </ExpansionPanelSummary>

                            {matiere.matters.map(function(
                                matter: any,
                                indexB: any
                            ) {
                                return (
                                    <ExpansionPanelDetails>
                                        <Card className={classes.root}>
                                            <div className={classes.details}>
                                                <CardContent
                                                    className={getClassOfNote(
                                                        matter
                                                    )}
                                                >
                                                    <Typography variant="h6">
                                                        {
                                                            matter.descriptionDefaultValue
                                                        }{' '}
                                                        / {matter.type}
                                                    </Typography>
                                                    {matter.marks &&
                                                        matter.marks.map(
                                                            function(
                                                                note: any,
                                                                indexB: any
                                                            ) {
                                                                return (
                                                                    <>
                                                                        <Typography variant="subtitle1">
                                                                            Date
                                                                            :{' '}
                                                                            <strong>
                                                                                24/04/2020
                                                                            </strong>
                                                                        </Typography>
                                                                        <Typography variant="subtitle1">
                                                                            Note
                                                                            :{' '}
                                                                            <strong>
                                                                                {
                                                                                    note.value
                                                                                }
                                                                            </strong>
                                                                        </Typography>
                                                                        <Typography variant="subtitle1">
                                                                            Coef
                                                                            :{' '}
                                                                            <strong>
                                                                                {
                                                                                    note.coefficient
                                                                                }
                                                                            </strong>
                                                                        </Typography>
                                                                        <Typography variant="subtitle1">
                                                                            Moyenne
                                                                            de
                                                                            la
                                                                            classe
                                                                            :{' '}
                                                                            <strong>
                                                                                {
                                                                                    note.mediumOfClasses
                                                                                }
                                                                            </strong>
                                                                        </Typography>
                                                                        <Typography variant="subtitle1">
                                                                            Commentaire
                                                                            :{' '}
                                                                            <strong>
                                                                                {
                                                                                    note.comments
                                                                                }
                                                                            </strong>
                                                                        </Typography>
                                                                    </>
                                                                );
                                                            }
                                                        )}
                                                </CardContent>
                                            </div>
                                        </Card>
                                    </ExpansionPanelDetails>
                                );
                            })}
                        </ExpansionPanel>
                    );
                })}
            </div>
        </>
    );
}

export default Accordeon;
