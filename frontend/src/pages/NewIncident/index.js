import React,{useState} from "react";
import LogoImg from "../../assets/logo.svg";
import {FiArrowLeft} from "react-icons/fi";
import {Link,useHistory} from "react-router-dom";
import "./styles.css";
import api from "../../services/api";

export default function NewIncident(){
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [value,setValue]=useState('');
  const ongID=localStorage.getItem("OngId");
  const history=useHistory();
  async function NewIncident(e){
    e.preventDefault();
    const data={
      title,
      description,
      value
    };
    try{
      await api.post("incidents",data,{
        headers:{
          Authorization:ongID
        }
      });
      history.push("/profile");
    }catch(err){
      alert("Não foi possível criar o caso, favor tentar novamente");
    }
  }

  return (
    <div className="new-incident-container">
    <div className="content">
      <section>
        <img src={LogoImg} alt="Be The Hero"/>
        <h1>Cadastrar novo caso</h1>
        <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
        <Link className="back-link" to="/profile">
          <FiArrowLeft size={16} color="#E02041"/>
          Voltar para Home
        </Link>
      </section>
      <form onSubmit={NewIncident}>
        <input 
          placeholder="Título do caso"
          value={title}
          onChange={e=>setTitle(e.target.value)}
        />
        
        <textarea 
          placeholder="Descrição"
          value={description}
          onChange={e=>setDescription(e.target.value)}
        />
        <input 
          placeholder="Valor em reais"
          value={value}
          onChange={e=>setValue(e.target.value)}
        />
        <button className="button" type="submit">Cadastrar</button>
      </form>
    </div>
  </div>
  );
}