// Coin3D.tsx
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Engine, Scene } from "react-babylonjs";
import {
  ArcRotateCamera,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Texture,
  Vector3
} from "@babylonjs/core";

export type Coin3DHandle = {
  flip: (rotations?: number) => void;
};

interface Props {
  size?: number;
  thickness?: number;
  headsUrl: string;
  tailsUrl: string;
}

const Coin3D = forwardRef<Coin3DHandle, Props>(
  ({ size = 2, thickness = 0.2, headsUrl, tailsUrl }, ref) => {
    const coinMeshRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      flip: (rotations = 6) => {
        if (!coinMeshRef.current) return;
        const mesh = coinMeshRef.current;
        // Animate rotation over time (simple)
        let start = performance.now();
        const duration = 1600;
        const totalRot = rotations * Math.PI; // in radians

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          mesh.rotation.y = totalRot * t;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
    }));

    return (
      <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
        <Scene>
          <arcRotateCamera
            name="camera1"
            alpha={Math.PI / 2}
            beta={Math.PI / 3}
            radius={6}
            target={Vector3.Zero()}
          />
          <hemisphericLight name="light1" intensity={0.9} direction={Vector3.Up()} />
          {/* Coin mesh */}
          <cylinder
            name="coin"
            ref={coinMeshRef}
            height={thickness}
            diameter={size}
            tessellation={96}
            position={new Vector3(0, 0, 0)}
          >
            <standardMaterial name="coinMat">
              <texture name="heads" url={headsUrl} assignTo="diffuseTexture" />
            </standardMaterial>
          </cylinder>
        </Scene>
      </Engine>
    );
  }
);

export default Coin3D;
