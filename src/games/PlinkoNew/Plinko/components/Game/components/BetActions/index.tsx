// import { Coin, CurrencyDollarSimple, Smiley } from 'phosphor-react'
import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'

import { LinesType } from '../../@types'
import { PiCurrencyDollarSimple } from 'react-icons/pi'
import { FaBitcoin, FaRegSmile } from 'react-icons/fa'

interface PlinkoBetActions {
  onRunBet: (betValue: number) => void
  onChangeLines: (lines: LinesType) => void
  inGameBallsCount: number
}

export function BetActions({
  onRunBet,
  onChangeLines,
  inGameBallsCount
}: PlinkoBetActions) {
  // const isLoading = useAuthStore(state => state.isWalletLoading)
  // const currentBalance = useAuthStore(state => state.wallet.balance)
  const currentBalance = 2000;
  // const decrementCurrentBalance = useAuthStore(state => state.decrementBalance)
  const [getDecrementCurrentBalance, decrementCurrentBalance] = useState(0)
  const isAuth = true
  const isLoading = true
  // const isAuth = useAuthStore(state => state.isAuth)
  const [betValue, setBetValue] = useState<number>(0)
  const handleBetChange = (value: string) => {
    const amount = Number.parseFloat(value);
    if (isNaN(amount) || amount < 0) {
      setBetValue(0);
    } else if (amount > currentBalance) {
      setBetValue(currentBalance);
    } else {
      setBetValue(amount);
    }
  };

  const maxLinesQnt = 16
  const linesOptions: number[] = []
  for (let i = 8; i <= maxLinesQnt; i++) {
    linesOptions.push(i)
  }

  function handleChangeBetValue(e: ChangeEvent<HTMLInputElement>) {
    if (!isAuth || isLoading) return
    e.preventDefault()
    const value = +e.target.value
    const newBetValue = (value >= currentBalance) ? currentBalance : value
    setBetValue(newBetValue)
  }

  function handleChangeLines(e: ChangeEvent<HTMLSelectElement>) {
    // if (!isAuth || isLoading) return

    onChangeLines(Number(e.target.value) as LinesType)
  }

  function handleHalfBet() {
    if (!isAuth || isLoading) return
    const value = betValue / 2
    const newBetvalue = value <= 0 ? 0 : Math.floor(value)
    setBetValue(newBetvalue)
  }

  function handleDoubleBet() {
    if (!isAuth || isLoading) return
    const value = betValue * 2

    if (value >= currentBalance) {
      setBetValue(currentBalance)
      return
    }

    const newBetvalue = value <= 0 ? 0 : Math.floor(value)
    setBetValue(newBetvalue)
  }

  function handleMaxBet() {
    if (!isAuth || isLoading) return
    setBetValue(currentBalance)
  }

  async function handleRunBet() {
    // alert('oi')
    // if (!isAuth || isLoading) return
    // if (inGameBallsCount >= 15) return
    if (betValue > currentBalance) {
      setBetValue(currentBalance)
      return
    }
    onRunBet(betValue)
    if (betValue <= 0) return
    await decrementCurrentBalance(betValue)
  }

  return (
    <div className="relative h-1/2 w-full flex-1">

      <div className="text-xs mb-2 font-bold text-text md:text-base">
        Balls in play {inGameBallsCount}/15
      </div>
      <div className="flex h-full flex-col gap-4 rounded-md bg-primary text-text md:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-stretch gap-1 md:flex-col">
            <div className="w-full text-sm font-bold md:text-base">
              <div className="flex flex-shrink-0 items-center justify-between">
                <div className="text-[14px] text-blue-100 font-semibold">Bet Amount</div>
                <div className="text-[12px] text-blue-100 font-semibold">{betValue.toFixed(2)}</div>
              </div>

              <div className="flex items-center w-full p-[1.5px] rounded-[4px] bg-[#2c4651] shadow-sm shadow-gray-900">

                <div className="flex justify-between w-[70%] px-2 items-center bg-[#1c2633] border-slate-700 border-[1.5px] hover:border-[#4b5c64] rounded-l-[4px]">

                  {/* <input
                    type="number"
                    min={0}
                    max={currentBalance}
                    onChange={(e) => setBetValue(e.currentTarget.valueAsNumber)}
                    value={betValue}
                    className="w-full py-2 border-none text-[14px] font-bold bg-[#1c2633] focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"

                  /> */}
                  <input
            type="number"
            value={betValue}
            onChange={(e) => handleBetChange(e.target.value)}
            className="w-full py-2 border-none text-[14px] font-bold bg-[#1c2633] focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            min={0}
            max={betValue}
            // disabled={!isInputEnabled} // Controlled by game state
          />
                  <FaBitcoin size={18} color="#fd8905" />
                </div>
                <div className="flex w-[30%] items-center">

                  <button
                    onClick={handleHalfBet}
                    className="hover:bg-[#889cb0] w-[50%] h-[40px] text-[14px] font-bold"
                  >
                    ½
                  </button>
                  <div className="h-[20px] w-[2px] bg-[#1c2633]"></div>
                  <button
                    onClick={handleDoubleBet}
                    className="hover:bg-[#889cb0] rounded-r-[4px] w-[50%] h-[40px] text-[14px] font-bold"
                  >
                    2x
                  </button>
                  {/* <button
                  onClick={handleMaxBet}
                  className="rounded-br-md rounded-tr-md border-2 border-transparent bg-secondary p-2 px-3 text-xs transition-colors hover:bg-secondary/80 focus:border-purple focus:outline-none"
                >
                  max
                </button> */}
                </div>
              </div>
            </div>

            {/* <button
              onClick={handleRunBet}
              disabled={!isLoading}
              className="block rounded-md bg-purple-100 px-2 py-4 text-sm font-bold leading-none text-background transition-colors hover:bg-purpleDark focus:outline-none focus:ring-1 focus:ring-purple focus:ring-offset-1 focus:ring-offset-primary disabled:bg-gray-500 md:hidden"
            >
              Bet
            </button> */}
          </div>
          <select
            // disabled={inGameBallsCount > 0}
            onChange={handleChangeLines}
            defaultValue={16}
            className="flex items-center justify-between text-white bg-[#102636] hover:bg-[#1b3648] focus:ring-1 focus:ring-[#6e8190] font-medium rounded-md text-sm px-4 py-2 w-full border border-[#6e8190] shadow-md"
            
          >
            {linesOptions.map(line => (
              <option key={line} value={line}>
                {line} Lines
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleRunBet}
          // disabled={!isLoading}
        className="w-full text-black font-bold py-3 px-6 mb-2 bg-[#1fec07] hover:bg-green-700 disabled:bg-green-600/50 disabled:cursor-not-allowed rounded-[4px] transition-colors"
        >
          Bet
        </button>
        {/* <div className="flex flex-col items-center gap-4 text-sm font-bold text-text md:items-start lg:absolute lg:-bottom-20 lg:left-4">
          <span>

            If you had fun playing and want to help in any way,
            <span className="flex items-center gap-2">
              donate 1 real to the developer by clicking below.
              <FaRegSmile />
            </span>
          </span>
          <Link
            to="/contribute"
            className="flex items-center gap-2 rounded-md bg-background p-2 font-bold transition-colors hover:bg-primary/50 lg:bg-primary"
          >

            ONLY 1 REAL <FaBitcoin />
          </Link>
        </div> */}
      </div>
    </div>
  )
}
