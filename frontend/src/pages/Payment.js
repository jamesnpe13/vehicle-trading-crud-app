import "./Payment.scss";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {AiOutlineArrowLeft} from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";


export default function Payment() { 
    const history = useNavigate()
    const [card, setCard] = useState({
        cardno: "",
        cardtype: "far fa-credit-card",
        expirydt: ""
      });

      const [method, setmethod] = useState({ full: false, finance: false })

      const RadioButton = ({ name, id, value, onChange, checked, text }) => {
          return (
            <label htmlFor={id} className="radio-label-1">
              <input
                className="radio-input-1"
                type="radio"
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                checked={checked}
              />
              <span className="custom-radio-1" />
              {text}
            </label>
          )
        }
  
      const onChangemethod = (e) => {
        const { name } = e.target
        if (name === 'credit') {
          setmethod({ paypal: false, credit: true })
        }
        if (name === 'paypal') {
          setmethod({ paypal: true, credit: false })
        }
      }  
    
      const onChange = (e) => {
        var cartype_new = cardnumber(e.target.value);
        setCard({
          ...card,
          cardno: e.target.value,
          cardtype: cartype_new
        });
      };
      const cardnumber = (inputtxt) => {
        var matches = inputtxt.match(/(\d+)/);
        var cardno = "";
        console.log(matches);
        if (matches) {
          cardno = inputtxt.split(" - ").join("");
        }
        console.log(cardno);
        var cardtype1 = card.cardtype;
        //var visa = /^(?:4[0-9]{16}(?:[0-9]{3})?)$/;
        var visa = /^(?:4[0-9]{2}?)$/;
        var mastercardRegEx = /^(?:5[1-5][0-9]{3})$/;
        var amexpRegEx = /^(?:3[47][0-9]{3})$/;
        var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{5})$/;
        console.log(visa.test(cardno));
        if (visa.test(cardno) === true) {
          //eg:4651970022334445
          cardtype1 = "far fa fa-3x fa-cc-visa  carddetail-cardtype";
        } else if (mastercardRegEx.test(cardno) === true) {
          cardtype1 = "far fa fa-3x fa-cc-mastercard carddetail-cardtype";
        } else if (amexpRegEx.test(cardno) === true) {
          cardtype1 = "far fa fa-3x fa-cc-amex carddetail-cardtype";
        } else if (discovRegEx.test(cardno) === true) {
          cardtype1 = "far fa fa-3x fa-cc-discover carddetail-cardtype";
        }
        return cardtype1;
      };
    
      const cc_format = (value) => {
        const v = value.replace(/[^0-9]/gi, "").substr(0, 16);
    
        const parts = [];
        for (let i = 0; i < v.length; i += 4) {
          parts.push(v.substr(i, 4));
        }
        return parts.length > 1 ? parts.join(" - ") : value;
      };
      const expriy_format = (value) => {
        const expdate = value;
        const expDateFormatter =
          expdate.replace(/\//g, "").substring(0, 2) +
          (expdate.length > 2 ? "/" : "") +
          expdate.replace(/\//g, "").substring(2, 4);
    
        return expDateFormatter;
      };
      const onChangeExp = (e) => {
        setCard({
          ...card,
          expirydt: e.target.value
        });
      };
    return (
        
        <>
        <div  onClick={()=> history(`/listings/:id/purchase`)} className="back-button">
        <BsArrowLeft /></div>
        {/* <button onClick={()=> history(`/listings/:id/purchase`)}>Go back</button> */}
        <h1 className="title-payment">Payment</h1>
          <div className="cardetails-wrapper">
            <div className="cardetails-payment">
              <div className="cardetails-form">

              <div className="select-method-1">
      <p className="title-select-1">Choose payment method</p>

      <div className="select-1-1">
       
        <div className="select-2-1">
      <RadioButton
        name="credit"
        id="credit"
        value="Credit"
        text="Credit/Debit Card"
        onChange={onChangemethod}
        checked={method.credit}
      />

      </div>
      </div>

      <div className="select-1-1">
     
        <div className="select-2-1">
      <RadioButton
        name="paypal"
        id="paypal"
        value="Paypal"
        text="Paypal"
        onChange={onChangemethod}
        checked={method.paypal}
      />
      
      </div>
      </div>
     
    </div>

                <div className="cardetails-card cardetails-space cardetails-icon-relative">
                  <label className="cardetails-label">Card Number:</label>
                  <input
                    type="text"
                    className="cardetails-input"
                    data-mask="0000 0000 0000 0000"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    value={cc_format(card.cardno)}
                    onChange={onChange}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  {/* <i className={card.cardtype} id="cardtype"></i> */}
                </div>
    
                <div className="cardetails-card-grp cardetails-space">
                  <div className="cardetails-card-item cardetails-icon-relative">
                    <label className="cardetails-label">Expiry date:</label>
    
                    <input
                      type="text"
                      name="expiry-data"
                      className="cardetails-input"
                      placeholder="MM / YY"
                      onChange={onChangeExp}
                      value={expriy_format(card.expirydt)}
                    />
                    <i className="far fa-calendar-alt"></i>
                  </div>
                  <div className="cardetails-card-item cardetails-icon-relative">
                    <label className="cardetails-label">CVC:</label>
                    <input
                      type="password"
                      className="cardetails-input"
                      data-mask="000"
                      placeholder="***"
                      maxlength="3"
                      pattern="[0-9][0-9][0-9]"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                    <i className="fas fa-lock"></i>
                  </div>
                </div>
                <div className="cardetails-card cardetails-space cardetails-icon-relative">
                  <label className="cardetails-label">Name on Card:</label>
                  <input type="text" className="cardetails-input" placeholder="" />
                  <i className="fas fa-user"></i>
                </div>
                
              </div>
            </div>
            
            <div className="cardetails-terms">I agree with <div className="red"> general terms</div> and <div className="red"> conditions</div></div>
          </div>
         
          <div onClick={()=> history(`/listings/:id/payment/confirmation`)} className="cardetails-btn">Confirm Payment</div>
        </>
      );
}