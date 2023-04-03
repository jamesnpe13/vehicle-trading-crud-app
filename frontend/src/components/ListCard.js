import "./ListCard.scss";
import locationimg from "../images/location.svg";
import carimg from "../images/car.svg";
import fuelimg from "../images/fuel.svg";
import odometerimg from "../images/odometer.svg";
import personimg from "../images/person.svg";
import transmissionimg from "../images/transmission.svg";
import { useState } from "react";

const Card = ({ itemData }) => {
    return (
        <div className="card">
            <div>
                <img
                    src="https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png"
                    alt="placeholderimg"
                ></img>
            </div>
            <div className="card-info">
                <h1 className="list-title">{itemData.title}</h1>
                <div className="specs">
                    <div className="main-specs">
                        <p className="price">$10,000</p>
                        <div className="card-item">
                            <img src={personimg}></img>
                            <p>seller name</p>
                        </div>
                        <div className="card-item">
                            <img src={locationimg}></img>
                            <p>{itemData.location}</p>
                        </div>
                    </div>
                    <hr />
                    <div className="detail-specs">
                        <div className="card-item">
                            <img src={carimg}></img>
                            <p>
                                {itemData.vehicle.make} {itemData.vehicle.model}
                            </p>
                        </div>
                        <div className="card-item">
                            <img src={personimg}></img>
                            <p>{itemData.vehicle.year}</p>
                        </div>
                        <div className="card-item">
                            <img src={odometerimg}></img>
                            <p>{itemData.vehicle.mileage}</p>
                        </div>
                        <div className="card-item">
                            <img src={fuelimg}></img>
                            <p>{itemData.vehicle.color}</p>
                        </div>
                        <div className="card-item">
                            <img src={transmissionimg}></img>
                            <p>{itemData.vehicle.transmission}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
