import { useCallback, useState } from "react"
import Count from "./Count";
import Title from "./Title";
import Button from "./Button";

function ParentComponent() {
    const [age,setAge] = useState(0);
    const [salary,setSalary] = useState(25000);


    // here we are using usecallback so that if dependencies changes then only do the function change otherwise give same
    const incrementAge  = useCallback(()=>{
        setAge(age+1);
    },[age])

    const incrementSalary = useCallback(()=>{
        setSalary(age+1);
    },[salary])

    // const incrementAge = ()=>{
    //     setAge(age+1);
    // }

    // const incrementSalary = ()=>{
    //     setSalary(salary+1000);
    // }

    console.log("Parent Component Rendering")
    return (
        <div>
        <Title/>
        <Count text = "age" count = {age}/>
        <Button handleClick = {incrementAge}>Increment Age</Button>
        <Count text = "salary" count = {salary}/>
        <Button handleClick = {incrementSalary}>Increment Salary</Button>
        </div>
    )
}
export default ParentComponent