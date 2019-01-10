import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import SearchBar from "./SearchBar";
import ResultsList from "./ResultsList";
import Favourites from "./Favourites";
import Footer from "./Footer";

class App extends Component {
  /**
   * Represents the logic behind the Toronto Waste App, serves as a container for the rest of the components
   * @constructor
   */
  constructor() {
    super();
    // resultItems are the users search results
    // favourites are items that the user chose to save
    this.state = {
      resultItems: [],
      favourites: []
    };

    //bind handle methods to this so they can be passed down as props to other components
    this.handleSearch = this.handleSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.handleNewFavourite = this.handleNewFavourite.bind(this);
    this.handleRemoveFavourite = this.handleRemoveFavourite.bind(this);
  }

  /**
   * Method meant to handle the api call to the toronto waste database. Given a keyword by the user, this method updates the resultItems state
   * trash items that match with the key word.
   * @param {string} keyword
   */
  handleSearch(keyword) {
    // create a regex using the keyword given the by user this is used to match entries in the database with the given keyword
    const re = new RegExp("." + keyword + ".");
    // init an array that will hold the matching entries
    let results = [];
    // make an fetch api call on the toronto waste database and retrieve the json file
    fetch(
      "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000"
    )
      .then(function(response) {
        return response.json();
      })
      .then(
        function(myJson) {
          // the forEach method is used here instead of filter because if an item is matched, the special characters in the entry must be converted in order for the html to render properly
          myJson.forEach(trashItem => {
            // if the current trash item contains the keyword given by the user, add this item to the results items that will be displayed to the user

            if (
              trashItem.keywords.match(re) ||
              trashItem.title.match(re) ||
              trashItem.body.match(re)
            ) {
              // convert special characters to html tags so that rendering works properly
              trashItem.body = trashItem.body.replace(/&lt;/g, "<");
              trashItem.body = trashItem.body.replace(/&gt;/g, ">");
              trashItem.body = trashItem.body.replace(/&amp;/g, "&");
              trashItem.body = trashItem.body.replace(/&quot;/g, "");
              // add the matched entry to the results
              results.push(trashItem);
            }
          });
          // update the resultsItems state to the new matched entries
          this.setState(prevState => (prevState["resultItems"] = results));
        }.bind(this)
      );
  }

  /**
   * Method to reset the search results state item
   */
  clearSearch() {
    // clear the result items
    this.setState(prevState => (prevState["resultItems"] = []));
  }

  /**
   * Method to handle the user requesting to add a waste item to the favourites list
   * @param {object} item
   */
  handleNewFavourite(item) {
    // append the given item which includes the title and body text to the favourites state
    this.setState(prevState => prevState["favourites"].push(item));
  }

  /**
   * Method to handle the user requesting to remove a favourited item from their list
   * @param {object} item
   */
  handleRemoveFavourite(item) {
    //remove the given item from the favourites state, do not alter the state if the given item is not currently favourited
    this.setState(prevState => {
      const index = prevState["favourites"].findIndex(
        favItem => favItem.title === item.title
      );
      if (index > -1) {
        return prevState["favourites"].splice(index, 1);
      } else {
        return prevState;
      }
    });
  }

  /**
   * Method to render the app using react
   */
  render() {
    return (
      <div>
        <div className="App">
          <Header />
          <SearchBar
            handleSearch={this.handleSearch}
            clearSearch={this.clearSearch}
          />
          <ResultsList
            handleNewFavourite={this.handleNewFavourite}
            handleRemoveFavourite={this.handleRemoveFavourite}
            displayItems={this.state.resultItems}
            favourites={this.state.favourites}
          />
          {// if there is atleast 1 favourited item generate the favourites component
          this.state.favourites.length > 0 && (
            <Favourites
              handleNewFavourite={this.handleNewFavourite}
              handleRemoveFavourite={this.handleRemoveFavourite}
              displayItems={this.state.favourites}
              favourites={this.state.favourites}
            />
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
