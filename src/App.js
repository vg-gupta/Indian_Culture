import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import { BANUBA_CLIENT_TOKEN } from "./BanubaClientToken";
import { Webcam, Player, Module, Effect, Dom } from "@banuba/webar";
import wasm from "@banuba/webar/BanubaSDK.wasm";
import simd from "@banuba/webar/BanubaSDK.simd.wasm";
import data from "@banuba/webar/BanubaSDK.data";

import FaceTracker from "@banuba/webar/face_tracker.zip";

function App() {
  const cameras = [
    {
      id: 1,
      filter: 'effects/glasses_RayBan4165_Dark.zip'
    },
    {
      id: 2,
      filter: 'effects/necklace_01.zip'
    },
    {
      id: 3,
      filter: 'effects/glasses_Banuba.zip'
    },
    {
      id: 4,
      filter: 'effects/earrings_01.zip'
    }
  ];

  const refs = useRef(cameras.map(() => ({})));
  const [keys, setKeys] = useState(cameras.map(() => 0));
  const [filterId, setFilterId] = useState(4); // Initialize with default camera id 4

  useEffect(() => {
    const index = cameras.findIndex((camera) => camera.id === filterId);
    if (index !== -1) {
      const webcam = refs.current[index].webcam ??= new Webcam();
      const promise = refs.current[index].player ??= Player.create({
        clientToken: BANUBA_CLIENT_TOKEN,
        locateFile: {
          "BanubaSDK.wasm": wasm,
          "BanubaSDK.simd.wasm": simd,
          "BanubaSDK.data": data,
        },
      }).then((player) =>
        player.addModule(new Module(FaceTracker)).then(() => {
          player.use(webcam);
          const containerId = `webar-${filterId}`;
          const container = document.getElementById(containerId);
          if (container) {
            player.applyEffect(new Effect(cameras[index].filter));
            Dom.render(player, `#${containerId}`);
          } else {
            console.error(`Container with id ${containerId} not found`);
          }
        })
      );

      return () => {
        webcam.stop();
        const containerId = `webar-${filterId}`;
        const container = document.getElementById(containerId);
        if (container) {
          Dom.unmount(`#${containerId}`);
        }
      };
    }
  }, [filterId, keys, cameras]);

  const handleFilterChange = (cameraId) => {
    setFilterId(cameraId); // Set the filterId to the clicked camera id
    const index = cameras.findIndex((camera) => camera.id === cameraId);
    if (index !== -1) {
      const newKeys = [...keys];
      newKeys[index] += 1;
      setKeys(newKeys); // Trigger re-rendering
    }
  };

  return (
    <div className="App">
      <div style={{ fontSize: 50, fontFamily: 'initial', padding: 20 }}>Choose from the filters</div>
      <div style={{ display: 'flex', gap: 10 }}>
        <div key={filterId} id={`webar-${filterId}`} style={{ maxWidth: "800px", marginRight: "10px" }}></div>
        {cameras.map((camera) => (
          <button key={camera.id} className="filter-button" onClick={() => handleFilterChange(camera.id)}>
            Filter {camera.id}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
