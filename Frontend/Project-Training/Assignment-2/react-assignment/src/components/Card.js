import { useState } from "react";
import '../styles/card.css'

function Card({ data }) {
  const images = data.stockImages || [];
  const [index, setIndex] = useState(0);

  const hasImages = images.length > 0;
  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  // Example Logic for tags (You can adjust based on your API data)
  const isDirectOwner = index % 2 === 0; // Just for demo, use data.isDirectOwner

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
                <button className="nav left" onClick={prev}>‹</button>
                <button className="nav right" onClick={next}>›</button>
              </>
            )}
          </>
        ) : (
          <div className="no-image">
            {/* <svg width="60" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <circle cx="17" cy="17" r="2" />
                <path d="M5 17h8" />
            </svg> */}
            <img src="https://imgd.aeplcdn.com/0x0/cw/static/icons/svg/no-image.svg" />
            <button className="request-photo-btn">Request Photo</button>
          </div>
        )}
      </div>

      <div className="card-body">
        <div className="car-name" title={`${data.makeYear} ${data.carName}`}>{data.makeYear} {data.carName}</div>

        <div className="car-meta">
          {data.km} km | {data.fuel} | {data.cityName}
        </div>

        <div className="price-section">
          <div className="car-price">
            Rs. {data.price}
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
