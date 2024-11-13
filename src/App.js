import './App.css'
import { ToastContainer } from 'react-toastify';
import Routing from './Routing/Routing';
import ReactGA from 'react-ga4';
import "./global.css";
const TRACKING_ID = "G-W0WXHB8BHZ"; 
 ReactGA.initialize(TRACKING_ID);

const App = () => {
  return (
    <>
      <Routing />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  )
}

export default App
