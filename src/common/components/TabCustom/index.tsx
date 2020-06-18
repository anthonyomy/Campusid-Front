import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

/* <TabCustom onglets={tabArray}></TabCustom> */

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    backgroundColorStyle: {
        backgroundColor: 'white',
        color: 'black',
    },
}));

function TabCustom(props: any) {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const printOnglet = props.onglets.map((onglet: any, index: any) => (
        <Tab label={onglet.name} id={'simple-tab-' + index} />
    ));

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <div className={classes.backgroundColorStyle}>
                    <Tabs value={value} onChange={handleChange}>
                        {printOnglet}
                    </Tabs>
                </div>
            </AppBar>
            {props.onglets.map((onglet: any, index: any) => (
                <TabPanel value={value} index={index}>
                    {onglet.component}
                </TabPanel>
            ))}
        </div>
    );
}

export default TabCustom;
