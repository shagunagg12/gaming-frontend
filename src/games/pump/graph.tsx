import { useEffect, useRef } from "react";

export default function Graph({multiplier}:any){

const canvasRef = useRef<HTMLCanvasElement>(null)
const points = useRef<number[]>([])

useEffect(()=>{

points.current.push(multiplier)

const canvas = canvasRef.current
if(!canvas) return

const ctx = canvas.getContext("2d")
if(!ctx) return

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.beginPath()

points.current.forEach((m,i)=>{

const x = i*8
const y = canvas.height - m*20

if(i===0) ctx.moveTo(x,y)
else ctx.lineTo(x,y)

})

ctx.strokeStyle="#00e676"
ctx.lineWidth=2
ctx.stroke()

},[multiplier])

return <canvas ref={canvasRef} width={500} height={200}/>
}