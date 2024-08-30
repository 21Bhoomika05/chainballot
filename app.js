import '../styles/globals.css';

//INTERNAL IMPORT
import { VotingProvider } from '../context/voter';
import NavBar from "../components/NavBar/NavBar";

const MyApp = ({ Component, pageProps }) => {
  return(
  <VotingProvider>
    <div>
      <NavBar/>
      <div>
        <Componenet {...pageProps} />
      </div>
     
        
    </div>
  </VotingProvider>
  );
}


export default MyApp;
