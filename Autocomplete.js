import React from "react";
import { Link } from "react-router-dom";
import "./Autocomplete.css";

class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.items = [];
    this.state = {
      suggestions: [],
      text: ""
    };
  }
  onTextChanged = e => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regEx = new RegExp(`^${value}`, "i");
      suggestions = this.items.sort().filter(v => regEx.test(v));
    }
    this.setState(() => ({ suggestions, text: value }));
  };
  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map(item => (
          <li onClick={() => this.suggestionselected(item)}>{item}</li>
        ))}
      </ul>
    );
  }
  suggestionselected(value) {
    this.setState(() => ({
      text: value,
      suggestions: []
    }));
  }
  render() {
    const { text } = this.state;
    return (
      <div className="AutoCompleteText">
        <input value={text} onChange={this.onTextChanged} type="text" />
        {this.renderSuggestions()}
      </div>
    );
  }
}
export default AutoComplete;
