// Parent.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Tableau from "./Tableau";

function Parent() {
  const [tableauData, setTableauData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/training-courses')
      .then(response => setTableauData(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Tableau tab={tableauData} />
    </div>
  );
}

export default Parent;
