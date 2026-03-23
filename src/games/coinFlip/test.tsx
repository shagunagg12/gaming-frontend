// CoinFlip.tsx
import React, { useState } from "react";
import {
  Engine,
  Scene,
  useScene,
  useBeforeRender,
  StandardMaterial,
  HemisphericLight,
  ArcRotateCamera,
} from "react-babylonjs";
import * as BABYLON from "babylonjs";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Color3 } from "@babylonjs/core/Maths/math.color";

const Coin: React.FC<{ rotationTarget: number }> = ({ rotationTarget }) => {
  const scene = useScene();
  const [coin, setCoin] = React.useState<BABYLON.Mesh | null>(null);

  // create coin mesh once
  React.useEffect(() => {
    if (!scene) return;
    const cylinder = MeshBuilder.CreateCylinder("coin", {
      diameter: 2,
      height: 0.1,
      tessellation: 64,
    }, scene);

    // material
    const mat = new StandardMaterial("coinMat", scene);
    mat.diffuseColor = Color3.FromHexString("#FFD966");
    mat.specularColor = Color3.FromHexString("#E6B800");
    cylinder.material = mat;

    // add two textures for heads/tails if you want:
    // const headsTexture = new Texture("heads.png", scene);
    // mat.diffuseTexture = headsTexture;

    setCoin(cylinder);
    return () => cylinder.dispose();
  }, [scene]);

  // animate rotation
  useBeforeRender(() => {
    if (!coin) return;
    coin.rotation.y += (rotationTarget - coin.rotation.y) * 0.15;
  });

  return null; // nothing to render directly, mesh is in scene
};

export default function CoinFlipG() {
  const [rotationTarget, setRotationTarget] = useState(0);

  function flip() {
    const spins = Math.floor(Math.random() * 4) + 3; // 3..6 spins
    const newTarget = rotationTarget + spins * 2 * Math.PI + Math.PI;
    setRotationTarget(newTarget);
  }

  return (
    <div style={{ width: 400, height: 400 }}>
      <Engine antialias adaptToDeviceRatio canvasId="babylon-canvas">
        <Scene>
          {/* camera */}
          <arcRotateCamera
            name="camera1"
            alpha={Math.PI / 2}
            beta={Math.PI / 3}
            radius={5}
            target={[0, 0, 0]}
          />
          <hemisphericLight
            name="light1"
            direction={[0, 1, 0]}
            intensity={0.9}
          />

          <Coin rotationTarget={rotationTarget} />
        </Scene>
      </Engine>

      <button onClick={flip} style={{ marginTop: 10 }}>
        Flip Coin
      </button>
    </div>
  );
}
