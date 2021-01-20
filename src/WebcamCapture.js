import React, { useCallback, useRef, useState } from "react";
import "./WebcamCapture.css";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useDispatch } from "react-redux";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
  }, [webcamRef]);
  return (
    <div className="webcamCapture">
      <h3>I am the camera page</h3>
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshootFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />
      <RadioButtonUncheckedIcon
        onClick={capture}
        className="webcamCapture__button"
        fontSize="large"
      />
    </div>
  );
};

export default WebcamCapture;
