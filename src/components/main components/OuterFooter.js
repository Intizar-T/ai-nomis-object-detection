import React from 'react';
import { useContext } from "react";
import { Context } from "../context/context";
import { Card, } from '@material-tailwind/react';
import CustomButton from '../helper components/CustomButton';
import DownloadAll from '../download/DownloadAll';
import DownloadAllText from '../download/DownloadAllText';

const OuterFooter = () => {
    const { state, dispatch } = useContext(Context);

    return (
        <div className="flex flex-row gap-2">
           <CustomButton
                action={() => {
                    DownloadAll(state, dispatch);
                }}
                text = "Download All"
                color="green"
           />
           <CustomButton
                 action={() => DownloadAllText(state)}
                 text = "Download All .txt"
                 color="green"
           />
        </div>
    );
}

export default OuterFooter;