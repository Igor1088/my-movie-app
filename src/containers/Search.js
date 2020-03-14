import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import { API_KEY } from "../constants/config";

let results = [];

const getSuggestions = value => {
  return results;
};

const getSuggestionValue = suggestion =>
  suggestion.title ? suggestion.title : suggestion.name;

const renderSuggestion = suggestion => (
  <div>{suggestion.title ? suggestion.title : suggestion.name}</div>
);

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      suggestions: []
    };
  }

  fetchResults = query => {
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    )
      .then(response => response.json())
      .then(data => {
        results = [...data.results];
      });
  };

  onChange = (event, { newValue, up }) => {
    if (newValue.length !== 0) {
      this.fetchResults(newValue);
    }
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleSubmit = e => {
    this.setState({ value: "", suggestion: [] });
    e.preventDefault();
    // this.props.fetchSearchResults(this.state.value);
    this.props.history.push("/search");
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Search...",
      value,
      onChange: this.onChange
    };

    return (
      <form className="nav-search" onSubmit={this.handleSubmit}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          highlightFirstSuggestion={true}
        />
      </form>
    );
  }
}

export default withRouter(Search);
