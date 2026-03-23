import React from 'react'

export default function GameLimitModel(props) {
    const { open, setOpen } = props

    return (
        <>
            {
                open && (
                    <div className='model gameLimitModel'>
                        <div className='mainBox'>
                            <div className='modelHead'>
                                <h6>Game Limits</h6>
                                <button onClick={() => setOpen(false)}>
                                    < i class="fa-solid fa-xmark" ></i>
                                </button>
                            </div>
                            <div className='modelBody'>
                              <div className='showBoxGame'>
                              <div className='showDetial'>
                                    <h6>Minimum bet INR :</h6>
                                    <span>10</span>
                                </div>
                                <div className='showDetial'>
                                    <h6>Maximum bet INR :</h6>
                                    <span>8000</span>
                                </div>
                                <div className='showDetial'>
                                    <h6>Maximum win for one bet INR :</h6>
                                    <span>800000</span>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
