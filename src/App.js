import React, { useState } from 'react';
import Create_room from "./create_room";
import Join_room from './client/join_room_1.js';
import Message_rev from "./client/message_recived";
import './client/Moulikcss/button.css';
import './client/Moulikcss/coolinput.css'
import './client/Moulikcss/modifyButtons.css';
import './client/Moulikcss/roomCodeText.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import "./client/App.css"

const Disposable_Forms = () => {
  const [press, setpress] = useState(false);
  const [press_1, setpress_1] = useState(false);

  if (press || press_1) {
    if (press) {
      return (
        <div>
          <Create_room/>
        </div>
      );
    }
    if (press_1) {
      return (
        <div>
          <Join_room/>
        </div>
      );
    }
  }

  const Handleclick = () => {
    setpress(true);
  };
  
  const Handleclick_1 = () => {
    setpress_1(true);
  };

  return (

    <div class="bg-dark ">
    <div className="container">
      <button className="button" onClick={Handleclick}>
        Create room
      </button>
      <button className="button" onClick={Handleclick_1}>
        Join Room
      </button>
    </div>
    </div>
  );
}

export default Disposable_Forms;