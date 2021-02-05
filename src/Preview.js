import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetCameraImage, selectCameraImage } from "./features/cameraSlice";
import "./Preview.css";
import WebcamCapture from "./WebcamCapture";
import NoteIcon from "@material-ui/icons/Close";
import CloseIcon from "@material-ui/icons/Close";
import MusicNoteIcon from "@material-ui/icons/Note";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CropIcon from "@material-ui/icons/Crop";
import TimerIcon from "@material-ui/icons/Timer";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CreateIcon from "@material-ui/icons/Create";
import SendIcon from "@material-ui/icons/Send";
import firebase from "firebase";
import { db, storage } from "./firebase";
// uuid libray import as npm add uuid
import { v4 as uuid } from "uuid";
import { selectuser } from "./features/appSlice";

const Preview = () => {
  const cameraImage = useSelector(selectCameraImage); //pull data from data-layer
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectuser);

  useEffect(() => {
    if (!cameraImage) {
      history.replace("/");
    }
  }, [cameraImage, history]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  // upload task to firebase firestore
  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, "data_url");

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.log("error list" + error);
      },
      () => {
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              imageUrl: url,
              username: user.username,
              read: false,
              profilePic: user.profilePic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace("/chats");
          });
      }
    );
  };

  return (
    <div className="preview">
      <CloseIcon onClick={closePreview} className="preview__close" />
      <div className="preview__toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt="" />
      <div onClick={sendPost} className="preview__footer">
        <h2>Send Now</h2>
        <SendIcon className="preview__sendIcon" fontSize="medium" />
      </div>
    </div>
  );
};

export default Preview;
