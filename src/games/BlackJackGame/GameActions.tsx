import { Hand, Pause, Repeat, ChevronsUp } from "lucide-react"
import { GiCardExchange } from "react-icons/gi"
import { HiDownload } from "react-icons/hi"
import { IoHandLeft } from "react-icons/io5"
import { RiContrast2Fill } from "react-icons/ri"
import { TiDownload } from "react-icons/ti"

interface GameActionsProps {
  canHit: boolean
  canStand: boolean
  canSplit: boolean
  canDouble: boolean
  onHit: () => void
  onStand: () => void
  onSplit: () => void
  onDouble: () => void
}

export function GameActions({
  canHit,
  canStand,
  canSplit,
  canDouble,
  onHit,
  onStand,
  onSplit,
  onDouble,
}: GameActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        onClick={onHit}
        disabled={!canHit}
        className="flex items-center text-[14px] justify-center shadow-md shadow-black/50 gap-2 py-2.5 px-4 bg-[#4c6772] border border-slate-700 rounded-[4px] font-semibold hover:bg-[#90b1bf] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"

      >
        <span>Hit</span>
        <TiDownload color="#f67509" size={15}/>
      </button>
      <button
        onClick={onStand}
        disabled={!canStand}
        className="flex items-center text-[14px] justify-center shadow-md shadow-black/50 gap-2 py-2.5 px-4 bg-[#4c6772] border border-slate-700 rounded-[4px] font-semibold hover:bg-[#90b1bf] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"

      >
        <span>Stand</span>
        <IoHandLeft color="#b007f5" size={15} />
      </button>
      
      <button
        onClick={onSplit}
        disabled={!canSplit}
        className="flex items-center text-[14px] justify-center shadow-md shadow-black/50 gap-2 py-2.5 px-4 bg-[#4c6772] border border-slate-700 rounded-[4px] font-semibold hover:bg-[#90b1bf] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        
        <span>Split</span>
        <GiCardExchange size={15} />
      </button>
      <button
        onClick={onDouble}
        disabled={!canDouble}
        className="flex items-center text-[14px] justify-center shadow-md shadow-black/50 gap-2 py-2.5 px-4 bg-[#4c6772] border border-slate-700 rounded-[4px] font-semibold hover:bg-[#90b1bf] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span>Double</span>
        <RiContrast2Fill size={15} />

      </button>
    </div>
  )
}

