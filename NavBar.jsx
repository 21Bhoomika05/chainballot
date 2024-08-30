import React, { useState, useContext } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { AiFillLock, AiFillUnlock } from "react-icons/ai";

// INTERNAL IMPORT
import { VotingContext } from "../../context/voter";
import Style from "./NavBar.module.css";
import loading from "../../assets/loading.gif";

const NavBar = () => {
  const { connectWallet, error, currentAccount } = useContext(VotingContext);
  const [openNav, setOpenNav] = useState(false);

  const toggleNavigation = () => {
    setOpenNav((prevState) => !prevState);
  };

  return (
    <div className={Style.navbar}>
      {error && (
        <div className={Style.message_box}>
          <div className={Style.message}>
            <p>{error}</p>
          </div>
        </div>
      )}

      <div className={Style.navbar_box}>
        <div className={Style.title}>
          <Link href="/">
            <Image src={loading} alt="logo" width={80} height={80} />
          </Link>
        </div>

        <div className={Style.connect}>
          {currentAccount ? (
            <div className={Style.connect_flex}>
              <button onClick={toggleNavigation}>
                {currentAccount.slice(0, 10)}...
              </button>
              <span onClick={toggleNavigation}>
                {openNav ? <AiFillUnlock /> : <AiFillLock />}
              </span>

              {openNav && (
                <div className={Style.navigation}>
                  <p>
                    <Link href={{pathname: "/" }}>Home</Link>
                  </p>
                  <p>
                    <Link href={{pathname: "candidate-registration"}}>
                      Candidate Registration
                    </Link>
                  </p>
                  <p>
                    <Link href={{pathname: "allowed-voters"}}>Voter Registration</Link>
                  </p>
                  <p>
                    <Link href={{pathname: "voterList"}}>Candidate List</Link>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button onClick={connectWallet}>Connect Wallet</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;