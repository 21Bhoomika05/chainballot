import React, {useState, useEffect, useContext} from "react";

//INTERNAL IMPORT
import VoterCard from "../components/VoterCard/VoterCard";
import Style from '../styles/votersList.module.css';
import { VotingContext } from "../context/voter";


const voterList = () => {

    const {getAllVoterData, voterArray} = useContext(VotingContext);
    useEffect(() => {
        getAllVoterData()
    }, []);  

    
    return(
        <div className={Style.voterList}>
            <VoterCard voterArray={voterArray}/>
          
        </div>
    );
};

export default voterList;
