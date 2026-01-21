import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import fetchUsers from "../redux/car/CarActions";
import Card from "./Card";

function Home() {
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <ul>
      {data?.stocks?.map((res) => (
        <Card key={res.profileId} data={res} />
      ))}
    </ul>
  );
}


export default Home