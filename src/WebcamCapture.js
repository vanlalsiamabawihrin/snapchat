import React, { useCallback, useRef, useState } from "react";
import "./WebcamCapture.css";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { setCameraImage } from "./features/cameraSlice";
import { useHistory } from "react-router-dom";

const videoConstraints = {
  width: 380,
  height: 600,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    // push camera image to data layer
    dispatch(setCameraImage(imageSrc));
    history.push("/preview");
  }, [webcamRef]);
  return (
    <div className="webcamCapture">
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
