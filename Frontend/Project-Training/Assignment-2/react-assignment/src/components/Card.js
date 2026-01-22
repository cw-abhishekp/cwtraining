// function Card({ data }) {
//   console.log({ data });
//   if (!data?.stockImages || data.stockImages.length === 0) return null;

//   return (
//     <div className="carComponent">
//       <img
//         className="carImage"
//         src={data.stockImages[0]}
//         alt={data.carName}
//       />

//       <div className="carName">{data.carName}</div>

//       <div className="km-fuelType">
//         <span className="km">{data.km} km</span> |&nbsp;
//         <span className="km">{data.fuel}</span> |&nbsp;
//         <span className="km">{data.cityName}</span>
//       </div>

//       <div className="price-offer">
//         <span className="price">₹ {data.price}</span> |&nbsp;
//         <span className="offers">Make Offer</span>
//       </div>

//       <div className="emi">{data.emiText}</div>
//       <button className="sellerDetails">Get Seller Details</button>
//     </div>
    
//   );
// }

// export default Card;


// function Card({ data }) {
//   if (!data?.stockImages || data.stockImages.length === 0) return null;

//   return (
//     <div className="car-card">
//       <img
//         className="car-image"
//         src={data.stockImages[0]}
//         alt={data.carName}
//       />

//       <div className="card-body">
//         <h3 className="car-name">{data.carName}</h3>

//         <p className="car-meta">
//           {data.km} km | {data.fuel} | {data.cityName}
//         </p>

//         <p className="car-price">₹ {data.price} Lakh</p>

//         <button className="seller-btn">Get Seller Details</button>
//       </div>
//     </div>
//   );
// }

// export default Card;


// import { useState } from "react";

// function Card({ data }) {
//   const images = data.stockImages || [];
//   const [index, setIndex] = useState(0);

//   const hasImages = images.length > 0;

//   const next = () => setIndex(i => (i + 1) % images.length);
//   const prev = () => setIndex(i => (i - 1 + images.length) % images.length);

//   return (
//     <div className="car-card">
//       <div className="image-carousel">
//         {hasImages ? (
//           <>
//             <img
//               className="car-image"
//               src={images[index]}
//               alt={data.carName}
//             />

//             {images.length > 1 && (
//               <>
//                 <button className="nav left" onClick={prev}>‹</button>
//                 <button className="nav right" onClick={next}>›</button>
//               </>
//             )}
//           </>
//         ) : (
//           <div className="no-image">
//             <div className="car-outline">🚗</div>
//             <button className="request-photo">Request Photo</button>
//           </div>
//         )}
//       </div>

//       <div className="card-body">
//         <h3 className="car-name">{data.carName}</h3>
//         <p className="car-meta">
//           {data.km} km | {data.fuel} | {data.cityName}
//         </p>
//         <p className="car-price">₹ {data.price}</p>
//         <button className="seller-btn">Get Seller Details</button>
//       </div>
//     </div>
//   );
// }

// export default Card;





import { useState } from "react";

function Card({ data }) {
  const images = data.stockImages || [];
  const [index, setIndex] = useState(0);

  const hasImages = images.length > 0;
  const next = () => setIndex(i => (i + 1) % images.length);
  const prev = () => setIndex(i => (i - 1 + images.length) % images.length);

  return (
    <div className="car-card">
      <div className="image-carousel">
        <span className="badge">Featured</span>

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
            <div style={{ fontSize: "44px" }}>🚗</div>
            <button className="request-photo">Request Photo</button>
          </div>
        )}
      </div>

      <div className="card-body">
        <div className="car-name">{data.carName}</div>

        <div className="car-meta">
          {data.km} km | {data.fuel} | {data.cityName}
        </div>

        <div className="car-price-row">
          <div className="car-price">₹ {data.price}</div>
          <div className="emi">{data.emiText}</div>
        </div>
        <div className="make-offer">Make Offer</div>
        <button className="seller-btn">Get Seller Details</button>
      </div>
    </div>
  );
}

export default Card;



