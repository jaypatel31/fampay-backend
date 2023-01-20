import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import Response from "./components/Response/Response";

import 'react-toastify/dist/ReactToastify.css';
import Instruction from "./components/Instruction/Instruction";

function App() {
  const [responesData, setResponesData] = useState([])

  const callApi = async (api) => {

    let baseUrl = `http://localhost:4000/${api}`;
    try{
      let response = await axios.get(baseUrl);
      setResponesData(response.data.videos)
    }catch(error){
      console.log(error)
      if(error.response.status !== 200){
        toast.error('Invalid API Request', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    }
  }
    

  return (
    <div className="App">
      <ToastContainer />
      <Header/>
      <Instruction/>
      <SearchBar callApi={callApi}/>
      <Response responesData={responesData}/>
    </div>
  );
}

export default App;
