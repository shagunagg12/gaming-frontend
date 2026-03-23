import ballAudio from "../Game/assets/sounds/ball.wav"
import {
  Bodies,
  Body,
  Composite,
  Engine,
  Events,
  IEventCollision,
  Render,
  Runner,
  World
} from 'matter-js'
import { useCallback, useEffect, useState } from 'react'
// import { useAuthStore } from 'store/auth'
// import { useGameStore } from 'store/game'
import { random } from '../../utils/random'

import { LinesType, MultiplierValues } from './@types'
import { BetActions } from './components/BetActions'
import { PlinkoGameBody } from './components/GameBody'
import { MultiplierHistory } from './components/MultiplierHistory'
import { config } from './config'
import {
  getMultiplierByLinesQnt,
  getMultiplierSound
} from './config/multipliers'

export function PlinkoGame() {
  // region States
  const [smallScreen, setIsSmallScreen] = useState(false)
  // const incrementCurrentBalance = useAuthStore(state => state.incrementBalance)
  const [currentBalance, setCurrentBalance] = useState(110);
  const incrementCurrentBalance = (amount: number) => {
    setCurrentBalance(prevBalance => prevBalance + amount);
  };
  const engine = Engine.create()
  const [lines, setLines] = useState<LinesType>(16)
  // const [gapValue, setGapValue] = useState(16)

  // useEffect(() => {
  //   setGapValue(lines)
  // },[lines])
  //pin size 
  const IncreasePinSize = (lines: number) => {
    if (lines === 16) return 1
    if (lines === 15) return 2
    if (lines === 14) return 2
    if (lines === 13) return 3
    if (lines === 12) return 3
    if (lines === 11) return 4
    if (lines === 9) return 5
    if (lines === 8) return 5

  }
  console.log('lines', lines);
// pin gaps
  const pinGaps =()=>{
    if(lines) 
      if (lines === 16) return 30
      if(lines === 15) return 32
      if(lines === 14) return 34
      if(lines === 13) return 36
      if(lines === 12) return 38
      if(lines === 11) return 40
      if(lines === 10) return 44
      if(lines === 9) return 48
      if(lines === 8) return 60
      else return 30
  }

  // const inGameBallsCount = useGameStore(state => state.gamesRunning)
  // const inGameBallsCount=20
  // const incrementInGameBallsCount = useGameStore(
  //   state => state.incrementGamesRunning
  // )
  const [inGameBallsCount, setInGameBallsCount] = useState(10);

  const incrementInGameBallsCount = () => {
    setInGameBallsCount(prevCount => prevCount + 1);
  };  // const decrementInGameBallsCount = useGameStore(
  //   state => state.decrementGamesRunning
  // )
  const decrementInGameBallsCount = () => {
    setInGameBallsCount(prevCount => Math.max(0, prevCount - 1)); // Prevents negative values
  };
  const [lastMultipliers, setLastMultipliers] = useState<number[]>([])
  const {
    pins: pinsConfig,
    colors,
    ball: ballConfig,
    engine: engineConfig,
    world: worldConfig
  } = config

  const worldWidth: number = worldConfig.width

  const worldHeight: number = worldConfig.height
  // endregion

  useEffect(() => {
    const updateScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 767);
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);
  useEffect(() => {
    engine.gravity.y = engineConfig.engineGravity
    const element = document.getElementById('plinko')
    const render = Render.create({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      element: element!,
      bounds: {
        max: {
          y: worldHeight,
          x: worldWidth
        },
        min: {
          y: 0,
          x: 0
        }
      },
      options: {
        background: "none",
        hasBounds: true,
        width: worldWidth,
        height: worldHeight,
        wireframes: false
      },
      engine
    })
    const runner = Runner.create()
    Runner.run(runner, engine)
    Render.run(render)
    return () => {
      World.clear(engine.world, true)
      Engine.clear(engine)
      render.canvas.remove()
      render.textures = {}
    }
  }, [lines])

  const pins: Body[] = []

  for (let l = 0; l < lines; l++) {
    const linePins = pinsConfig.startPins + l
    const lineWidth = linePins * pinGaps()
    for (let i = 0; i < linePins; i++) {
      const pinX =
        worldWidth / 2 -
        lineWidth / 2 +
        // pin horizontal gap
        i * (pinGaps()) +l // Increase the horizontal gap by adding a constant value (e.g., 5)
        // pin vertical gap
        worldWidth / lines + l * (pinGaps() + 10) + pinGaps() // Increase the vertical gap by adding a constant value (e.g., 5)
        pinGaps() / 2

      const pinY =
        worldWidth / lines + l * pinGaps() + pinGaps() 

      // pin size
      const sizeIncrease = IncreasePinSize(lines) ?? 4;
      const pin = Bodies.circle(pinX, pinY, pinsConfig.pinSize + sizeIncrease, {
        label: `pin-${i}`,
        // dots
        render: {
          // pin colors
          fillStyle: '#F5DCFF'
        },
        isStatic: true
      })
      pins.push(pin)
    }
  }

  function addInGameBall() {
    if (inGameBallsCount > 15) return
    incrementInGameBallsCount()
  }

  function removeInGameBall() {
    decrementInGameBallsCount()
  }

  const addBall = useCallback(
    (ballValue: number) => {
      addInGameBall()
      const ballSound = new Audio(ballAudio)
      ballSound.volume = 0.2
      ballSound.currentTime = 0
      ballSound.play()

      const minBallX =
        worldWidth / 2 - pinsConfig.pinSize * 3 + pinGaps()
      const maxBallX =
        worldWidth / 2 -
        pinsConfig.pinSize * 3 -
        pinGaps() +
        pinGaps() / 2

      const ballX = random(minBallX, maxBallX)
      const ballColor = ballValue <= 0 ? colors.text : colors.purple
      const ball = Bodies.circle(ballX, 20, ballConfig.ballSize, {
        restitution: 1,
        friction: 0.6,
        label: `ball-${ballValue}`,
        id: new Date().getTime(),
        frictionAir: 0.05,
        collisionFilter: {
          group: -1
        },
        render: {
          fillStyle: ballColor
        },
        isStatic: false
      })
      Composite.add(engine.world, ball)
    },
    [lines]
  )

  const leftWall = Bodies.rectangle(
    worldWidth / 3 - pinsConfig.pinSize * pinGaps()/1.3 - pinGaps(),
    worldWidth / 2 - pinsConfig.pinSize,
    worldWidth * 4,
    40,
    {
      angle: 90,
      render: {
        visible: true
      },
      isStatic: true
    }
  )
  const rightWall = Bodies.rectangle(
    worldWidth -
    pinsConfig.pinSize * pinGaps() -
    pinGaps() -
    pinGaps() / 1,
    worldWidth / 2 - pinsConfig.pinSize+500,
    worldWidth * 2,
    40,
    {
      angle: -90,
      render: {
        visible: true
      },
      isStatic: true
    }
  )
  const floor = Bodies.rectangle(0, worldWidth + 10, worldWidth * 10, 40, {
    label: 'block-1',
    render: {
      visible: true
    },
    isStatic: true
  })

  const multipliers = getMultiplierByLinesQnt(lines)

  const multipliersBodies: Body[] = []

  let lastMultiplierX: number =
    // multiplier shifting
    worldWidth / 2.05 - (pinGaps() / 2) * lines - pinGaps()

  multipliers.forEach(multiplier => {
    // multplier img box
    const blockSize = 30 // height and width
    const multiplierBody = Bodies.rectangle(
      // multiplier width nearing
      lastMultiplierX + 31,
      worldWidth / lines + lines * pinGaps() + pinGaps(),
      blockSize,
      blockSize,
      {
        label: multiplier.label,
        isStatic: true,
        render: {
          sprite: {
            xScale: 1.6,
            yScale: 1.6,
            // multiplier img
            texture: multiplier.img
          }
        }
      }
    )
    lastMultiplierX = multiplierBody.position.x
    multipliersBodies.push(multiplierBody)
  })

  Composite.add(engine.world, [
    ...pins,
    ...multipliersBodies,
    leftWall,
    rightWall,
    floor
  ])

  function bet(betValue: number) {
    addBall(betValue)
  }

  async function onCollideWithMultiplier(ball: Body, multiplier: Body) {
    ball.collisionFilter.group = 2
    World.remove(engine.world, ball)
    removeInGameBall()
    const ballValue = ball.label.split('-')[1]
    const multiplierValue = +multiplier.label.split('-')[1] as MultiplierValues

    const multiplierSong = new Audio(getMultiplierSound(multiplierValue))
    multiplierSong.currentTime = 0
    multiplierSong.volume = 0.2
    multiplierSong.play()
    setLastMultipliers(prev => [multiplierValue, prev[0], prev[1], prev[2]])

    if (+ballValue <= 0) return

    const newBalance = +ballValue * multiplierValue
    await incrementCurrentBalance(newBalance)
  }
  async function onBodyCollision(event: IEventCollision<Engine>) {
    const pairs = event.pairs
    for (const pair of pairs) {
      const { bodyA, bodyB } = pair
      if (bodyB.label.includes('ball') && bodyA.label.includes('block'))
        await onCollideWithMultiplier(bodyB, bodyA)
    }
  }

  Events.on(engine, 'collisionActive', onBodyCollision)

  return (
    <div className="min-h-screen  items-center text-white flex-shrink-0 flex flex-col">
      <div className={` flex flex-shrink-0 flex-row ${smallScreen && "w-full"} w-[95%] min-h-fit m-10 bg-[#192b37] rounded-lg items-start`}>
        <div className={`px-3 py-2 md:w-[25%] rounded-md`}>

          <BetActions
            inGameBallsCount={inGameBallsCount}
            onChangeLines={setLines}
            onRunBet={bet}
          />
        </div>

        <div className={`bg-[#0e1722] md:w-[75%] items-center flex justify-center rounded-r-lg gap-y-4`}>
          <PlinkoGameBody />
          <MultiplierHistory multiplierHistory={lastMultipliers} />
        </div>
      </div>
    </div>
  )
}
