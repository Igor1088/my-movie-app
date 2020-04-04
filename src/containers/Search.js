import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Autosuggest from "react-autosuggest";
import { API_KEY } from "../constants/config";
import { fetchSearchResults } from "../actions";
import {
  getSearchResultsError,
  getSearchResultsLoading,
  getSearchResults
} from "../reducers/search";
import { withRouter } from "react-router-dom";

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
      suggestions: [],
      toResults: false
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
    if (e.key === "Enter") {
      this.props.fetchSearchResults(this.state.value);
      // this.setState({ value: "", suggestions: [], toResults: true });
      this.props.history.push("/search");
      localStorage.setItem("query", this.state.value);
    }
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Search...",
      value,
      onChange: this.onChange
    };

    return (
      <div className="nav-search" onKeyDown={this.handleSubmit}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          highlightFirstSuggestion={true}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: getSearchResultsError(state),
  loading: getSearchResultsLoading(state),
  results: getSearchResults(state)
});

const mapDispatchToProps = dispatch => ({
  fetchSearchResults: bindActionCreators(fetchSearchResults, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
