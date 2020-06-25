import React from 'react';
import CustomInput from 'common/components/CustomInput/index';
import { withKnobs } from '@storybook/addon-knobs';

export default {
    title: 'CustomInput',
    decorators: [withKnobs],
};

export const customInputMail = () => {
    let inputComputed = (value: any) => {
        console.log(value.target.value);
    };

    return (
        <div className="customInput">
            <CustomInput
                id="outlined-required"
                variant="outlined"
                name="Enter your mail"
                type="mail"
                style={{ margin: 20 }}
                size="small"
                color="secondary"
                defaultValue="défaut@gmail.com"
                callBack={inputComputed}
                hasIcon={false}
            />
        </div>
    );
};

export const customInputPassword = () => {
    let inputComputed = (value: any) => {
        console.log('value');
        console.log(value.target.value);
    };
    return (
        <div className="customInput">
            <CustomInput
                name="Enter your password"
                type="password"
                size="medium"
                callBack={inputComputed}
                hasIcon={false}
            />
        </div>
    );
};

export const customInputSearchBar = () => {
    let inputComputed = (value: any) => {
        console.log('value');
        console.log(value.target.value);
    };
    return (
        <div className="customInput">
            <CustomInput
                id="outlined-required"
                variant="outlined"
                type="text"
                style={{ margin: 20 }}
                size="small"
                color="secondary"
                placeholder="text"
                hasIcon={true}
                callBack={inputComputed}
                name="Research"
            />
        </div>
    );
};
