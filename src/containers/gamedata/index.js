import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuthMSF } from "../../utils/axiosWithAuthMSF";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { getPrediction } from '../../utils/getPrediction'

export default function GameData(props) {
    const { date, away, home } = props.match.params;

    useEffect(() => {
        getPrediction(date, away, home);
    }, [])



    return (
        <div/>
    )
}