import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { MenuList, MenuItem, Typography, Drawer, makeStyles, Theme, createStyles} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import SettingsIcon from '@material-ui/icons/Settings';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import ScheduleIcon from '@material-ui/icons/Schedule';
import GradeIcon from '@material-ui/icons/Grade';
import LinkIcon from '@material-ui/icons/Link';

import styles from './style';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            background: "#B70000",
            color: "white"
        },
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

const Sidebar = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                        [classes.paper]: true
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerOpen}>
                        {!open ? <ChevronRightIcon style={{ fontSize: 30, color: "white" }} ></ChevronRightIcon> : <ChevronLeftIcon style={{ fontSize: 40, color: "white" }}></ChevronLeftIcon>}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <Link to="/grades" style={{textDecoration: "none" }}>
                        <ListItem button>
                                <ListItemIcon >
                                    <GradeIcon style={{ fontSize: 30, color: "white" }} />
                                </ListItemIcon>
                                <ListItemText style={{ fontSize: 30, color: "white"}} primary={'Vie étudiante'} />
                        </ListItem>
                    </Link>
                    <Link to="/news" style={{textDecoration: "none" }}>
                        <ListItem button>
                                <ListItemIcon >
                                    <SpeakerNotesIcon style={{ fontSize: 30, color: "white" }}  />
                                </ListItemIcon>
                                <ListItemText primary={'Actualités'} style={{ fontSize: 30, color: "white"}}/>
                        </ListItem>
                    </Link>
                    <Link to="/external-links" style={{textDecoration: "none" }}>
                        <ListItem button>
                                <ListItemIcon >
                                    <LinkIcon style={{ fontSize: 30, color: "white" }} />
                                </ListItemIcon>
                                <ListItemText primary={'Demande administrative'} style={{ fontSize: 30, color: "white", whiteSpace: "normal"}}/>
                        </ListItem>
                    </Link>
                    <Link to="/configuration" color="White" style={{textDecoration: "none" }}>
                        <ListItem button>
                                <ListItemIcon >
                                    <SettingsIcon style={{ fontSize: 30, color: "white" }} />
                                </ListItemIcon>
                                <ListItemText primary={'Configuration'} style={{ fontSize: 30, color: "white"}}/>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        </div>
    );
};

export default Sidebar;
