import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Chats.css";
import Chat from "./Chat";
import SearchIcon from "@material-ui/icons/Search";
import ChatbubbleIcon from "@material-ui/icons/ChatBubble";
import { auth, db } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectuser } from "./features/appSlice";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useHistory } from "react-router-dom";
import { resetCameraImage } from "./features/cameraSlice";

const Chats = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectuser);
  const dispatch = useDispatch();
  const history = useHistory();
  const takeSnap = () => {
    dispatch(resetCameraImage());
    history.push("/");
  };

  // load up on app start download all data from firebase (firestore)
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className="chats__avatar"
        />
        <div className="chats__search">
          <SearchIcon className="chats__searchIcon" />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatbubbleIcon className="chats__chatIcon" />
      </div>

      {/* rendering downloaded data into chat components */}
      <div className="chats__posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
              timestamp={timestamp}
            />
          )
        )}
      </div>
      <RadioButtonUncheckedIcon
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
};

export default Chats;
