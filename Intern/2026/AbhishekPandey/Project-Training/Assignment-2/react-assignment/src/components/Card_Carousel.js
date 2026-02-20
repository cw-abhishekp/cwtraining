import { useState } from "react";
import "../styles/card.css";

function Card({ data = {} }) {
  //const { stockImages = , km =  } = data || {};
  const images = data.stockImages || [];
  const [index, setIndex] = useState(0);
  const hasImages = images.length > 0;
  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  // const isDirectOwner = index % 2 != 0
  return (
    <div className="car-card">
      <div className="image-carousel">
        {/* {isDirectOwner ? (
            <span className="tag tag-owner">Direct Owner Car</span>
        ) : (
            <span className="tag">Featured</span>
        )} */}

        {hasImages ? (
          <>
            <img className="car-image" src={images[index]} alt={data.carName} />
            {images.length > 1 && (
              <>
                <button className="nav left" onClick={prev}>
                  ‹
                </button>
                <button className="nav right" onClick={next}>
                  ›
                </button>
              </>
            )}
          </>
        ) : (
          <div className="no-image">
            <img src="https://imgd.aeplcdn.com/0x0/cw/static/icons/svg/no-image.svg" />
            <button
              className="request-photo-btn"
              onClick={() =>
                alert(
                  "The photo has been requested from the owner and will be delivered shortly.",
                )
              }
            >
              Request Photo
            </button>
          </div>
        )}
      </div>

      <div className="card-body">
        <div className="car-name" title={`${data.carName}`}>
          {data.carName}
        </div>

        <div className="car-meta">
          {/* {data.km} km | {data.fuel} | {data.cityName} */}
          <>
            {data.km && `${data.km} km`}
            {data.km && data.fuel && " | "}
            {data.fuel && data.fuel}
            {(data.km || data.fuel) && data.cityName && " | "}
            {data.cityName && data.cityName}
          </>
        </div>

        <div className="price-section">
          <div className="car-price">
            {data.price ? `Rs. ${data.price}` : null}
            {/* Rs. {data.price} */}
            <span className="emi-text">{data.emiText}</span>
          </div>
        </div>
        <div className="card-actions">
          <span className="make-offer">Make Offer</span>
          <button className="seller-btn">Get Seller Details</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
