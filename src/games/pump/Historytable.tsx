/*export default function HistoryTable({history}:any){

return(

<div className="history-table">

<div className="table-header">
<span>Round</span>
<span>Multiplier</span>
</div>

{history.map((h:number,i:number)=>(
<div key={i} className="table-row">

<span>#{history.length-i}</span>
<span className="multi">{h.toFixed(2)}x</span>

</div>
))}

</div>

)

}*/