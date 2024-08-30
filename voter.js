import React, {useState,useEffect} from 'react';
import Web3Modal from 'web3modal' ;
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import {VotingAddress, VotingAddressABI} from "./constant";

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
const fetchContract = (signerOrProvider) => new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);
    export const VotingContext =  React.createContext();
    export const VotingProvider = ({children}) =>{
        const VotingTitle = 'My first smart contract app';
        const router = useRouter();
        const [currentAccount, setCurrentAccount] = useState('');
        const [candidateLength, setCandidateLength] = useState('');
        const pushCandidate = [];
        const candidateIndex = [];
        const [candidateArray, setCandidateArray] = useState(pushCandidate);

        //--------------------END OF CANDIDATE DATA

        const [error, setError] = useState('');
        const highestVote = [];
        
        //------------VOTER SECTION
        const pushVoter = [];
        const [voteArray, setVoterArray] = useState(pushVoter);
        const [voterLength, setVoterLength] = useState('');
        const [voterAddress, setVoterAddress] = useState([]);

        //----------------CONNECTING METMASK

        const checkIfWalletIsConnected = async()=>{
            if (!window.ethereum) return setError("Please Install MetaMask");

            const account = await window.ethereum.request({method: "eth.accounts"});

            if(account.length){
                setCurrentAccount(account[0]);
            } else{
                setError("Please Install Metamask and connect, Reload");
            }
        };

         //-------CONNECT WALLET
        const connectWallet = async()=>{
            if(!window.ethereum) return setError("Please Install Metamask");

        const account = await window.ethereum.request({method: "eth_requestAcounts",});

        setCurrentAccount(account[0]);

    };

    //-------------UPLOAD TO IPFS VOTER IMAGE

    const uploadToIPFS = async(file)=>{
        try{
            const added = await client.add({content: file});

            const url = 'https://ipfs.infura.io/ipfs/${added.path}';
            return url;
        } catch (error){
            setError("Error Uploading file to IPFS");
        }
    };

    const uploadToIPFSCandidate = async(file)=>{
        try{
            const added = await client.add({content: file});

            const url = 'https://ipfs.infura.io/ipfs/${added.path}';
            return url;
        } catch (error){
            setError("Error Uploading file to IPFS");
        }
    };

    //----------------------CREATE VOTER
    const createVoter = async(formInput, fileUrl, router) => {
        try{
            const {name, address, position} = formInput;
            if(!name || !address || !position)
                return setError("Input data is missing");

            //CONNECTING SMART CONTRACT

            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Modal(connection);
            const signer = provider.getSigner();
            const contract= fetchContract(signer);
            
            const data = JSON.stringyfy({name, address, position, image:fileUrl})
            const added = await client.add(data);

            const url = 'https://ipfs.infura.io/ipfs/${added.path}';

            const voter = await contract.voterRight(address, name, url, fileUrl);
            voter.wait();

            router.push("/voterList");

        } catch (error){
           setError("Something went wrong creating voter");
        }
    };

    //--------------------------GET VOTER DATA

    const getAllVoterData = async() =>{
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Modal9(connection);
        const signer = provider.getSigner();
        const contract= fetchContract(signer);

        //VOTER LIST
        const voterListData = await contract.getVoterList();
        setVoterAddress(voterListData);
        
        voterListData.map(async(eL)=> {
            const singleVoterData = await contract.getAllVoterdata(eL);
            pushVoter.push(singleVoterData);
        });

        //VOTER LENGTH
        const voterList = await contract.getVoterLength();
        setVoterLength(voterList.toNumber());        
    try{

    }
    catch (error) {
       setError("Something went wrong fetching data");
    }
};

    //useEffect(() => {
       // getAllVoterData();
  //  }, []);

    //--------------GIVE VOTE
    const giveVote = async(id) => {
        try{
            const voterAddress = id.address;
            const voterId = id.id;
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Modal(connection);
            const signer = provider.getSigner();
            const contract= fetchContract(signer);

          const voteredList = await Contract.vote(voterAddress, votetrId);
          console.log(voteredList);
        } catch (error) {
          console.log(error);
            
        }
    };
    //----------------------------CANDIDATE SECTION----------------------------------

    const setCandidate = async(candidateform, fileUrl, router) => {
        try{
            const {name, address, age} = candiateform;
            if(!name || !address || !age)
                return setError("Input data is missing");

            //CONNECTING SMART CONTRACT

            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Modal(connection);
            const signer = provider.getSigner();
            const contract= fetchContract(signer);

            const data = JSON.stringyfy({name, address, image:fileUrl, age})
            const added = await client.add(data);

            const ipfs = 'https://ipfs.infura.io/ipfs/${added.path}';

            const candidate = await contract.voterRight(address, age, name, fileUrl, ipfs);
            candidate.wait();

          router.push("/voterList");

        } catch (error){
          setError("Something went wrong creating voter");
        }
    };
            
    //---GET CANDIDATE DATA
    const getNewCandidate = async ()=> {
        try{
            //CONNECTING SMART CONTRACT
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Modal(connection);
            const signer = provider.getSigner();
            const contract= fetchContract(signer);

            //--------------ALL CANDIDATE
            const allCandidate = await contract.getNewCandidate();
            console.log(allCandidate);

            allCandidate.map(async (eL) =>{
                const singleCandidateData = await contract.singleCandidateData(eL);

                pushCandidate.push(singleCandidateData);
                candidateIndex.push(singleCandidateData[2].toNumber());
            }
            );

            //--------------------CANDIDATE LENGTH
            const allCandidateLength = await contract.getNewCandidateLegnth();
            setCandidateLength(allCandidateLength.toNumber());
        } catch (error) {
            console.log(error)
        }
        
    };

    useEffect(() => {
        getNewCandidate();
    }, []);
    
        return(
            <VotingContext.Provider value={{
                VotingTitle,
                checkIfWalletIsConnected,
                connectWallet,
                uploadToIPFS,
                createVoter,
                getAllVoterData,
                giveVote,
                setCandidate,
                getNewCandidate,
                error,
                voteArray,
                voterLength,
                voterAddress,
                currentAccount,
                candidateArray,
                uploadToIPFSCandidate,
                
            }}
            >
                {children}
                </VotingContext.Provider>
        );

    };


   
