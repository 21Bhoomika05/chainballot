import React from "react";
import Image from "next/image";

//INTERNAL IMPORT

import Style from '../Card/Card';
import images from  "../../assets";

const Card = ({candidateArray, giveVote}) => {
    return(
        <div className= {Style.Card}>
            {candidateArray.map ((el,i) => (
                <div className= {Style.Card_box}>
                    <div className= {Style.image}>
                        <img src={el[3]} alt= "profile" />

                    </div>

                    <div className= {Style.Card_info}>
                        <h2>
                            {el[1]} #{el[2].tonumber()}
                        </h2>
                        <p>{el[0]}</p>
                        <p>Address: {el[6].slice(0,30)}...</p>
                        <p className= {Style.total}>Total Vote</p>

                    </div>

                    <div className= {Style.Card_vote}>
                        <p>{el[4].toNumber()}</p>

                    </div>

                    <div className= {Style.Card_button}>
                        <button onClick={()=> giveVote({id: el[2].toNumber(), address: el [6]})} >Give Vote</button>

                    </div>
                </div>

            ))}

        </div>
    );
};

export default Card;