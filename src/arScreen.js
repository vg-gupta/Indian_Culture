import "./App.css"
import React, { useEffect, useRef, useState } from "react"
import { BANUBA_CLIENT_TOKEN } from "./BanubaClientToken"
import { Webcam, Player, Module, Effect, Dom } from "@banuba/webar"
import wasm from "@banuba/webar/BanubaSDK.wasm"
import simd from "@banuba/webar/BanubaSDK.simd.wasm"
import data from "@banuba/webar/BanubaSDK.data"
import FaceTracker from "@banuba/webar/face_tracker.zip"

const arScreen = () => {
  return (
    <div>arScreen</div>
  )
}

export default arScreen