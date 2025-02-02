import React, { useState,useEffect } from "react";
import axios from "axios";
import "./style.css";
import { Button, Form, Input, Radio, TextArea } from "semantic-ui-react";
import { useHistory } from "react-router";
import useModal from "./useModal";
import ModalSubmit from "./ModalSubmit";

export default function SubmitActivity() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [zipcode, setZipCode] = useState("");
  
  const [free, setFree] = useState("");
  const [town,setTown] = useState("");
  const [dataTown,setDataTown] = useState("");
  const [picture, setPicture] = useState();
  const [src, setSrc] = useState('');
  const [activeChangeInput,setActiveChangeInput] = useState(false)
  const [limitData,setLimitData] = useState(5)
  const history = useHistory()

  const { isShowing, toggle } = useModal();
  
  const handleSubmitActivity = async (evt) => {
    evt.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);
    
    const formData = new FormData()
    formData.append('picture',picture)
    formData.append('title',title)
    formData.append('description',description)
    formData.append('zipcode',zipcode)
    formData.append('free',free)
    formData.append('town',town)
    console.log(formData)
    //call for setTime Modal return to home after submit
    const returnToHome = ()=> {
       history.push("/")
 }
    axios.post("https://kidozanges.herokuapp.com/api/submitactivity", formData,
    {
      headers: {
        authorization:`Bearer ${token}`,
      },
    },
    
    );
    setTitle("")
    setDescription('')
    setTown('')
    setPicture()
    setTimeout(returnToHome,1500)
  };

  const inputCode = async () => {
    try{
      const responce = await axios.get(`https://geo.api.gouv.fr/communes?nom=${town}&fields=nom,codeDepartement&limit=${limitData}&boost=population`);
      console.log(responce.data)
      // eslint-disable-next-line array-callback-return
      setDataTown(responce.data)
    }
    catch(error){
      console.log(error)
    }
  }

  const jsxVille = () => {
    if(activeChangeInput){
      const res = dataTown.map(home => {
        const getName = () => {
          setTown(home.nom)
          document.querySelector("#form--activity ul").style.display="none"
          setZipCode(home.codeDepartement)
        }
      

        const jsx = <li onClick={getName} key={home.code}>{home.nom} ({home.codeDepartement})</li>
        return jsx 
      })

      return res
    }
  }

  useEffect(() => {
    inputCode()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [town])

  return (
    <div className="container">
      <Form id="form--activity" method="POST" onSubmit={handleSubmitActivity} encType="multipart/form-data"> 
        <Form.Field
          control={Input}
          name='title'
          label="Titre de l'activité"
          placeholder="Titre de l'activité"
          value={title}
          autoFocus
          onChange={(evt) => {
            setTitle(evt.target.value);
          }}
        />
        <Form.Field
        control={Input}
        type="file"
        name='télécharger une image'
        label = "Vous pouvez joindre une photo du lieu"
        placeholder="Photo de l'activité"
        onChange={(evt) => {
          setPicture(evt.target.files[0]);
          setSrc(evt.target.files[0].name)
          console.log(evt.target.files[0])
        }}
        />
        <Form.Field
          control={TextArea}
          name='description'
          label="Description de l'activité"
          placeholder="Description de l'activité, informations utiles..."
          value={description}
          onChange={(evt) => {
            setDescription(evt.target.value);

          }}
        />
        <Form.Field
          control={Input}

          type="text"
          name="town"
          icon="search"
          label="Ville"
          placeholder="Entrez une ville"
          value={town}
          onChange={(evt) => {
            setTown(evt.target.value);
            setActiveChangeInput(true)
            document.querySelector("#form--activity ul").style.display="block"
          }}
        />
        <ul>
          {jsxVille()}
        </ul>
        <Form.Group inline className="box--radios">
          <Form.Field
            control={Radio}
            label="Gratuite"
            name="freeOrPaying"
            value={free}
            checked={free === "true"}
            onChange={() => {
              setFree("true");
            }}
          />
          <Form.Field
            control={Radio}
            label="Payante"
            name="freeOrPaying"
            value={free}
            checked={free === "false"}
            onChange={() => {
              setFree("false");
            }}
          />
        </Form.Group>
        <Form.Field id="form--activity__button" control={Button} className="modal-toggle" onClick={toggle}>
          Proposer cette activité
          <ModalSubmit isShowing={isShowing} hide={toggle} />
        </Form.Field>
        
      </Form>
      
    </div>
  );
}
