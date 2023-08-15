import {Component} from "react";
import React from "react";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ text: "" });
    this.props.onSendMessage(this.state.text);
  }

  render() {
    return (
      <div className="Input">
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Choose your words wisely for they may be your last!"
            autoFocus
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Input;