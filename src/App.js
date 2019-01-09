import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import SearchBar from "./SearchBar";
import ResultsList from "./ResultsList";
import Favourites from "./Favourites";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <SearchBar />
        <ResultsList />
        <Favourites />
      </div>
    );
  }
}

export default App;
