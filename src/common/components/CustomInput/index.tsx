import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import '@storybook/addon-knobs/register';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

export default function CustomInput(props: any) {
    let type = props.type;
    let label = props.name;
    let callBack = props.callBack;
    let size = props.size;
    let defaultValue = props.defaultValue;
    let variant = props.variant;
    let id = props.id;
    let style = props.style;
    let color = props.color;
    let placeholder = props.placeholder;
    let hasIcon = props.hasIcon;

    //const classes = useStyles();
    return (
        <div>
            {hasIcon ? (
                <div className="inputText">
                    <TextField
                        required
                        id={id}
                        label={label}
                        defaultValue={defaultValue}
                        variant={variant}
                        size={size}
                        style={style}
                        color={color}
                        type={type}
                        placeholder={placeholder}
                        onChange={value => callBack(value)} // TODO CHECK
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
            ) : (
                <div className="inputText">
                    <TextField
                        required
                        id={id}
                        label={label}
                        defaultValue={defaultValue}
                        variant={variant}
                        size={size}
                        style={style}
                        color={color}
                        type={type}
                        placeholder={placeholder}
                        onChange={value => callBack(value)}
                    />
                </div>
            )}
        </div>
    );
}
