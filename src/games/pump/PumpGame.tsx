import { useState } from "react";
import BetPanel from "./BetCalculatorPump";
import History from "./History";
import Graph from "./graph";

import HistoryTable from "./Historytable";
export default function PumpGame() {

  const [bet,setBet] = useState(0)
  const [multiplier,setMultiplier] = useState(1)
  const [pumping,setPumping] = useState(false)
  const [crash,setCrash] = useState(false)
  const [history,setHistory] = useState<number[]>([])

  const difficultyCrash = (difficulty:string)=>{

    if(difficulty==="Easy") return Math.random()*6+3
    if(difficulty==="Medium") return Math.random()*4+2
    return Math.random()*2+1.5
  }

  const startGame=(difficulty:string)=>{

    setMultiplier(1)
    setCrash(false)
    setPumping(true)

    const crashPoint = difficultyCrash(difficulty)

    const interval = setInterval(()=>{

      setMultiplier(prev=>{

        const next = +(prev+0.05).toFixed(2)

        if(next>=crashPoint){

          clearInterval(interval)
          setCrash(true)
          setPumping(false)

          setHistory(h=>[next,...h.slice(0,9)])

        }

        return next
      })

    },120)

  }

  const pump=()=>{
    if(!pumping || crash) return
    setMultiplier(m=>+(m+0.2).toFixed(2))
  }

  const profit = bet * multiplier

  return (

    <div className="pump-wrapper">

      <BetPanel
  bet={bet}
  setBet={setBet}
  startGame={startGame}
  pump={pump}
  multiplier={multiplier}
/>

      <div className="pump-display">

       <Graph multiplier={multiplier} crash={crash}/>


        <div className="profit">
          Profit: {profit.toFixed(2)}
        </div>

      </div>

      <History history={history}/>
      <HistoryTable history={history}/>

    </div>
  )
}