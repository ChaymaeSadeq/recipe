import React from "react";
import Recette from "./Components/Recette.js";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Recette />
      </div>
    );
  }
}

export default App;
