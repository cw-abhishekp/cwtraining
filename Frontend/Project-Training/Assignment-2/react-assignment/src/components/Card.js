
function Card({ data }) {
    console.log({ data })
  
    return  data.stockImages.length > 0 ? (
        <div className="carComponent">
            <img className="carImage" src={data.stockImages[0]}/>
            <div className="carName">{data.carName}</div>
            <div className="km-fuelType">
                <span className="km">{data.km}&nbsp;km</span> |&nbsp;
                <span className="km">{data.fuel}</span> |&nbsp;
                <span className="km">{data.cityName}&nbsp;</span>
            </div>

            <div className="price-offer">
                <span className="price">Rs.&nbsp;{data.price}&nbsp;|&nbsp;</span>
                <span className="offers">Make Offer</span>
            </div>

            <div className="emi">{data.emiText}</div>
        </div>
    ) : null
}

export default Card



// function Card(props) {
//   console.log(data);

//   return (
//     <div className="carComponent">
//       <img
//         className="carImage"
//         src={data.stockImages?.[0]}
//         alt="car"
//       />
//     </div>
//   );
// }

// export default Card;


