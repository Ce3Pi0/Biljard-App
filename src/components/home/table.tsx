import { IonFab, IonFabButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import pool from '../../images/pool.png';
import chess from '../../images/chess.png'
import dart from '../../images/dart.png';
import React, { useEffect, useState } from "react";
import { play, stop, trashBinOutline } from "ionicons/icons";
import './table.css'
import requestDBChange from "../../utils/requestDBChange";

const Table: React.FC<{name: string, price:number, type:string, start_time:string, end_time:string, user_id:number, id:number}> = ({name, price, type, start_time, end_time, user_id, id}) => {
    
    const [startTime, setStartTime] =useState<any>(new Date(start_time));
    const [endTime, setEndTime] =useState<any>(new Date(end_time));
    const [playDisabled, setPlayDisabled] = useState<boolean>(start_time !== null && end_time === null);
    const [stopDisabled, setStopDisabled] = useState<boolean>(!(end_time === null) && start_time !== null || (end_time === null && start_time === null));  


    const calcTime = (end: any, start: any) => {
        let dif = end - start;
        
        let hrs, mins, secs;

        hrs = Math.floor(dif/1000/60/60);
        mins = Math.floor(dif/1000/60) - (60 * hrs);
        secs = Math.floor(dif/1000) - (60 * mins);
        if(start_time === null) return
        
        hrs = hrs < 10? '0'+hrs: hrs;
        mins = hrs < 10? '0'+mins: mins;
        secs = secs < 10? '0'+secs: secs;
        
        return(`${hrs}:${mins}:${secs}`)
    }

    const calculateTimeInterval = () => {
        let current: any = new Date();
        return calcTime(current, startTime);
    }

    const calcPrice = (end: any, start: any) => {
        let dif = end - start;

        return Math.round(price / 60) * Math.round(Math.abs(dif/ 1000/60));
    }

    const calcPriceInterval = () => {
        let current: any = new Date();
        return calcPrice(current, startTime);
    }

    const [time, setTime] = useState(stopDisabled? calcTime(endTime, startTime): calculateTimeInterval());
    const [currPrice, setCurrPrice] = useState(stopDisabled? calcPrice(endTime, startTime): calcPriceInterval());

    useEffect(() => {
        const interval = setInterval(() => {
            if (end_time === null && start_time !== null) {
                setTime(calculateTimeInterval());
                setCurrPrice(calcPriceInterval());
            }
        }, 10)

        return () => clearInterval(interval)
    }, [playDisabled])
 
    let myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("session_id")}`);
    myHeaders.append("Content-Type", "application/json");
    
    const handleDelete = () => {
        requestDBChange(`https://ce3pi0.pythonanywhere.com/tables?id=${id}`, {method: "DELETE", headers:myHeaders, body:null, redirect:undefined, signal:undefined})
    }

    const handlePlay = () => {
        setEndTime(undefined);
        const currentTime = new Date();
        setStartTime(currentTime);

        setPlayDisabled(true);
        setStopDisabled(false);
        //fetch
        const body = {
            start_time: currentTime,
            end_time: null 
        }
        
        let headers = new Headers();

        headers.append("Authorization", `Bearer ${window.localStorage.getItem("session_id")}`);
        headers.append("Content-Type", "application/json");

        requestDBChange(`https://ce3pi0.pythonanywhere.com/tables?id=${id}`, {method: "PUT", headers:headers, body:JSON.stringify(body), redirect:undefined, signal:undefined})
    }

    const handleStop = () => {
        const currentTime = new Date();
        setEndTime(currentTime);

        setPlayDisabled(false);
        setStopDisabled(true);
        //fetch
        const body = {
            start_time: startTime,
            end_time: currentTime 
        }
        
        let headers = new Headers();

        headers.append("Authorization", `Bearer ${window.localStorage.getItem("session_id")}`);
        headers.append("Content-Type", "application/json");

        requestDBChange(`https://ce3pi0.pythonanywhere.com/tables?id=${id}`, {method: "PUT", headers:headers, body:JSON.stringify(body), redirect:undefined, signal:undefined})
    }

    return (  
        <>
            <IonItem>
                <IonLabel>
                    {type === "pool" && <img width="27%" height="27%"src={pool} alt="pool table image"/>}
                    {type === "chess" && <img width="20%" height="20%"src={chess} alt="pool table image"/>}
                    {type === "darts" && <img width="15%" height="15%"src={dart} alt="pool table image"/>}
                    <p style={{color: "#bfbfbf"}}>Type: {type}</p>
                    <h1>Name: {name}</h1>
                    <p>Price per hour: {price}</p>
                    <div id="flexBox">
                        <h1>Total Price:{currPrice}</h1>
                        <h1 id='time'>Time:{time}</h1>
                    </div>
                    <br/>

                </IonLabel>
                <IonFab horizontal="end" vertical="top">
                        <IonFabButton disabled={playDisabled} size="small" color={"success"} onClick={() => handlePlay()}>
                            <IonIcon icon={play}></IonIcon>
                        </IonFabButton>
                </IonFab>
                <IonFab horizontal="end" vertical="center">
                    <IonFabButton disabled={stopDisabled} size="small" color={"warning"!} onClick={() => handleStop()}>
                        <IonIcon icon={stop}></IonIcon>
                    </IonFabButton>
                </IonFab>
                <IonFab horizontal="end" vertical="bottom">
                    <IonFabButton size="small" color={"danger"} onClick={() => handleDelete()}>
                        <IonIcon icon={trashBinOutline}></IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonItem>
            <br/>
        </>
    );
}
 
export default Table;