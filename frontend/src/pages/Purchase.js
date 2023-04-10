import "./Purchase.scss";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { BsCreditCardFill } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa";

import "../components/ListCard.scss";
import locationimg from "../images/location.svg";
import carimg from "../images/car.svg";
import fuelimg from "../images/fuel.svg";
import odometerimg from "../images/odometer.svg";
import personimg from "../images/person.svg";
import transmissionimg from "../images/transmission.svg";
import { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import Card from "../components/ListCard";

export default function Purchase() {
    const [listingsData, setListingsData] = useState([]);
    async function fetchData() {
        const response = await fetch("http://localhost:5000/listings/:id");
        const data = await response.json();
        setListingsData(data);
    }
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        console.log(listingsData);
    }, [listingsData]);

    const history = useNavigate()

    const [method, setmethod] = useState({ full: false, finance: false })

    const RadioButton = ({ name, id, value, onChange, checked, text }) => {
        return (
          <label htmlFor={id} className="radio-label">
            <input
              className="radio-input"
              type="radio"
              name={name}
              id={id}
              value={value}
              onChange={onChange}
              checked={checked}
            />
            <span className="custom-radio" />
            {text}
          </label>
        )
      }

    const onChangemethod = (e) => {
      const { name } = e.target
      if (name === 'finance') {
        setmethod({ full: false, finance: true })
      }
      if (name === 'full') {
        setmethod({ full: true, finance: false })
      }
    }  

    return(
        <>
           <div onClick={()=> history(`/listings/:id/purchase`)} className="back-button">
        <BsArrowLeft /></div>
        <h1 className="title-purchase">Purchase method</h1>

        <div className="select-method">
      <p className="title-select">Your puchase method</p>

      <div className="select-1">
        <div className="icon-box">
            <BsCreditCardFill />
        </div>
        <div className="select-2">
      <RadioButton
        name="finance"
        id="finance"
        value="Finance"
        text="Financing"
        onChange={onChangemethod}
        checked={method.finance}
      />
     <div className="method-explan">
      Everything simply online. Approval within 30 mintues
      </div>
      </div>
      </div>

      <div className="select-1">
      <div className="icon-box">
            <FaDollarSign />
        </div>
        <div className="select-2">
      <RadioButton
        name="full"
        id="full"
        value="Payment Full"
        text="Payment Full"
        onChange={onChangemethod}
        checked={method.full}
      />
      <div className="method-explan">
      Everything simply online. Approval within 30 mintues
      </div>
      </div>
      </div>
     
    </div>

    <div onClick={()=> history(`/listings/:id/payment`)} className="method-btn">Continue</div>

        </>

    )
                    }
   
