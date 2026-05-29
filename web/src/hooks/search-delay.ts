import { useEffect, useState } from "react";

export function useDelaySearch<T>(value:T, delay:300):T{
    const [delayedValue,setDelayedValue]=useState(value);

    useEffect(()=>{
        const timeoutId = setTimeout(() => {
            setDelayedValue(value);
        }, delay);

    return ()=>{
        clearTimeout(timeoutId)
    };
    },[value,delay])
    return delayedValue;
}