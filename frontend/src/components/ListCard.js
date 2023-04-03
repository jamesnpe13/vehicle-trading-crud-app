import "./ListCard.scss";

const Card = () => {
    return (
        <div className="card">
            <div>
                <img
                    src="https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png"
                    alt="placeholderimg"
                ></img>
            </div>
            <div className="card-info">
                <h1 className="list-title">List title</h1>
                <div className="specs">
                    <div className="main-specs">
                        <p className="price">$10,000</p>
                        <p>seller name</p>
                        <p>location</p>
                    </div>
                    <hr />
                    <div className="detail-specs">
                        <p>Body type</p>
                        <p>Seats</p>
                        <p>Odometer</p>
                        <p>Fuel</p>
                        <p>Transmission</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
