// interface Props {
//     name:string;
//     age:number;
// }


// const Greeting = ({name, age}: Props) => {
//     return <h1>Welcome! {name}. You are {age} old.</h1>
// }

import { useState } from "react";

const incrementer = () => {
    const [count, setCount] = useState<number>(0);

    const handleIncre = () => {
        setCount(count + 1);
    }

    const handleDecre = () => {
        setCount(count - 1);
    }

    const handleReset = () => {
        setCount(0);
    }

    return (
        <>
            <p>Current Count : {count}</p>
            <button onClick={handleIncre}>Increment</button>
            <button onClick={handleDecre}>Decrement</button>
            <button onClick={handleReset}>Reset</button>
        </>
    )
}

export default incrementer;