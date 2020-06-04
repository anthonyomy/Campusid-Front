import { createUseStyles } from 'react-jss';

export default createUseStyles({
    pageLogin: {},

    containerLogin: {
        width: '100%',

        '& .MuiPaper-root': {
            width: '60%',
            height: '80%',
            borderRadius: '0px',
        },

        '& .MuiButtonBase-root': {
            backgroundColor: '#B70000',
            color: 'white',
            borderRadius: '0px',
            margin: '8px',
            width: 'auto',
            textAlign: 'center',
            textTransform: 'uppercase',
            alignSelf: 'center',
        },
        '& .MuiFormControl-root': {
            width: '80%',
        },
    },
});
