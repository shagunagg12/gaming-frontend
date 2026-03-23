const backgroundConfig = {
    view: {
      sprite: "logoSprite",
      texture: "logoTexture",
      scale: { x: 1, y: 1 },
      anchor: { x: 0.5, y: 0.5 },
    },
    model: {
      width: 200,
      height: 100,
      position: { x: 0, y: 0 },
      textureTypes: {
        landscape: "logoTextureLandscape",
        portrait: "logoTexturePortrait"
      },
    },
  };
  
  export default backgroundConfig;
  