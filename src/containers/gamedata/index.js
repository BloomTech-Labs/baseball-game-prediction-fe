import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuthMSF } from "../../utils/axiosWithAuthMSF";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { getLineup } from '../../utils/getLineup';
import { getPrediction } from '../../utils/getPrediction';

export default function GameData(props) {
    const { date, away, home } = props.match.params;
    const [lineup, setLineup] = useState({})
    const [prediction, setPrediction] = useState({})

    useEffect(() => {
        getLineup(date, away, home)
        .then(res => {
            setLineup(res);
            getPrediction(res)
            .then(res => {
                setPrediction(res);
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
    }, [])


    console.log(lineup, prediction);
    if (prediction !== {}) {
        console.log(prediction);
        return (
            <div>Prediction Received!</div>
        )
    }

    return (
        <div/>
    )
}