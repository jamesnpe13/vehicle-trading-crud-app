import "./Confirmation.scss";
import { useNavigate } from "react-router-dom";

export default function Confirmation (){
    const history = useNavigate()
    return (
        <>
   
    <div className="confirm-box">

 <h1 className="confirm-heading">Success!</h1>
 <h2 className="confirm-subheading">Suzuki Jimny 2015</h2>
 <img className="confirm-photos" src="" alt="Image" />

 <div className="confirm-details">
    <div className="details-container">
Status
    </div>
    <div className="details-container">
Confirmed
    </div>
 </div>

 <div className="confirm-details">
    <div className="details-container">
Date
    </div>
    <div className="details-container">
    March 23, 2023
    </div>
 </div>


 <div className="confirm-details">
    <div className="details-container">
Name
    </div>
    <div className="details-container">
    Ellie Saxby
    </div>
 </div>



 <div className="confirm-details">
    <div className="details-container">
    Address
    </div>
    <div className="details-container">
    Jackson Street, Epsom
    </div>
 </div>

 <div className="confirm-details">
    <div className="details-container">
Contact
    </div>
    <div className="details-container">
    +64 21 XXXXX
    </div>
 </div>



 <div className="confirm-details">
    <div className="details-container">
Total
    </div>
    <div className="details-container">
    $25,000
    </div>
 </div>
 <div onClick={()=> history(`/listings/:id`)} className="receipt-btn">Download Receipt</div>

   
   
   
   
   
    </div>   
    </>
    )

    
};