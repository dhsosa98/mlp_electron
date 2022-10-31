import * as ReactDom from "react-dom";
import './style.css'
import { Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Home from "./app/views/home";
import GenerateDatasets from "./app/views/generate-datasets";
import Models from "./app/views/models";
import Predict from "./app/views/models/predict";
import TrainModel from "./app/views/train-model";
import TestModel from "./app/views/models/test";
import DeleteModel from "./app/views/models/delete";
import styled from "styled-components";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import ESFlag from '../assets/es.png';
import ENFlag from '../assets/en.png';
import ES from './locale/es.json';
import EN from './locale/en.json';
import {useState, useRef, useEffect} from 'react';

const resources = {
  en: EN,
  es: ES
}

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
})

const DropDown = () => {
  const keys = ["en", "es"];

  let { i18n } = useTranslation();

  const languages = {
    en: {
      icon: ENFlag,
      text: "English"
    },
    es: {
      icon: ESFlag,
      text: "Español"
    }
  }

  const [language, setLanguage] = useState<('es'|'en')>("en");

  const [toggle , setToggle] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
        setToggle(false);
    }
};

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
        document.removeEventListener('click', handleClickOutside, true);
    };
}, []);

  return (
    <div className={`rtc-dropdown ${(toggle ? 'toggle' : '')}`}>
    {keys.length > 0 &&
      (
        <button type="button" className="rtc-dropdown-toggle" onClick={() => setToggle(toggle => !toggle )}>
          <img src={languages[language].icon} alt="Flag" />
          {languages[language].text}
        </button>
      )}
    <div ref={ref} className="rtc-dropdown-menu">
      {keys.map((key: 'es' | 'en') => (
        <button
          key={key}
          type="button"
          className="rtc-btn"
          data-selected={(key === language)}
          onClick={() => {
            i18n.changeLanguage(key);
            setLanguage(key);
          }}
        >
          <img src={languages[key].icon} alt="Flag" className="rtc-flag" />
          {languages[key].text}
        </button>
      ))}
    </div>
  </div>
);
}

function App() {
  return (
    <HashRouter >
        
        <Separator>
          <Wave/>
        </Separator>
        <div className="fixed top-12 right-10 z-50 shadow-sm shadow-grey-100 ">
        <DropDown/>
        </div>
        <Route exact path="/"  component={Home} />
        <Route exact path="/models"  component={Models} />
        <Route exact path="/models/test"  component={TestModel} />
        <Route exact path="/models/predict"  component={Predict} />
        <Route exact path="/models/delete"  component={DeleteModel} />
        <Route exact path="/generate-datasets"  component={GenerateDatasets} />
        <Route exact path="/train-model" component={TrainModel} />
    </HashRouter>
  );
}

const Separator = styled.div`
  position: fixed;
  background: #0ea5e9;
  height: 50vh;
  width: 100%;
  z-index: -999;
`;

const Wave = styled.div`
  position: absolute;
  height: 250px;
  width: 100%;
  background: #0ea5e9;
  bottom: 0;
  ::before, ::after{
    content: "";
    display: block;
    position: absolute;
    border-radius: 100% 50%;
  }
  ::before{
    width: 55%;
    height: 109%;
    background-color: rgb(251, 251, 251);
    right: -1.5%;
    top: 60%;
  }
  ::after{
    width: 55%;
    height: 100%;
    background-color: #0ea5e9;
    left: -1.5%;
    top: 40%;
  }
`;

function render() {
  ReactDom.render(<App />, document.getElementById("root"));
}

render();

