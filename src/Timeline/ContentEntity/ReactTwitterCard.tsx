import {Fragment, useEffect, useState, useCallback, useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


const useStyles = makeStyles({
    dialog: {
        // minHeight: '80%',
        // maxHeight: '80%',
        minWidth: '80%',
        maxWidth: '80%',
        // backgroundColor: 'red',
        // opacity: 1,
        // background: 'rgba(0, 0, 0, 0)',
    },
    dialogContent: {
        // opacity: 0,
        textAlign: 'center',
        background: 'rgba(0, 0, 0, 0)',
    }
});

interface Props {
    sorce: string
}

export const ReactTwitterCard = (props : Props) => {
    const classes = useStyles();

    return(
        <Fragment>
            
        </Fragment>
    )
}
export default ReactTwitterCard;