import React from "react";
import image from'next/image'

//INTERNAL IMPORT
import Style from '../Card.Card.module.css';
import images from '../..assets';
import voterCardStyle from './voterCard.module.css';

const voterCard = ({voterArray}) => {
    return (
        <div className={Style.card}>
            {voterArray.map((el,i)=>(
                <div className={Style.card_box}>
                    <div className={Style.image}>
                        <image src={el[4]} alt="Profilr photo" />
                    </div>  

                    <div className={Style.card_info}>
                        <h2>
                            {el[1]} #{el[0].toNumber()}
                        </h2>
                        <p>Address: {el[3].slice(0,30)}...</p>
                        <p>details</p>
                        <p className={voterCardStyle.voter_Status}>
                            {el[6] == true ? "You already Voted" : "Not Voted"}
                        </p>
                    </div>
                </div>     
            )
            )}

        </div>
    ) 
   
};

export default voterCard;