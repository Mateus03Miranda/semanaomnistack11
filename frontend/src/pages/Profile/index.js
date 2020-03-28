import React,{useEffect, useState} from "react";
import LogoImg from "../../assets/logo.svg"
import {Link, useHistory} from "react-router-dom";
import {FiPower, FiTrash2} from "react-icons/fi";
import "./styles.css";
import api from "../../services/api";

export default function Profiler(){
  const OngId=localStorage.getItem("OngId");
  const OngName=localStorage.getItem("OngName");
  const [incidents,Setincidents]=useState([]);
  const history=useHistory();

  useEffect(()=>{
    api.get("profile",{
      headers:{
        authorization:OngId
      }
    }).then(response=>{
      Setincidents(response.data);
    })
  
  },[]);

  async function handleDeleteIncident(id){
    try{
      await api.delete(`incidents/${id}`,{
        headers:{
          authorization:OngId
        }
      });

      Setincidents(incidents.filter(incident=>incident.id!==id));
    }catch(err){
      alert("Erro ao Deletar o caso, tente novamente.");
    }
  }

  async function handleLogout(){
    localStorage.clear();
    history.push("/");
  }
  return(

    <div className="profile-container">
      <header>
        <img src={LogoImg} alt="Be The Hero"/>
        <span>Bem vinda, {OngName}</span>
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button type="button" onClick={()=>handleLogout()}>
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>
      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map(incident=>(
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}</p>
            <button type="button" onClick={()=>handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#A8A8B3"/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}