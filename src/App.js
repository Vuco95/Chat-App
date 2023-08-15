import React, { Component } from 'react';
import './App.css';
import Messages from "./Messages";
import Input from "./Input";

function randomName(gender) {
  const maleNames = ["Borna", "Zvonimir", "Domagoj", "Kresimir", "Radoslav"];
  const femaleNames = ["Korana", "Kosjenka", "Morana", "Vanda", "Zora"];
  const names = gender === 'male' ? maleNames : femaleNames;
  return names[Math.floor(Math.random() * names.length)];
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: '',
      color: randomColor(),
      gender: null,
    }
  }

  render() {
    const { gender } = this.state.member;

    if (!gender) {
      return (
          <div className="App GenderQuestion">
            <h2>Are you male or female?</h2>
          <div className="button-group">
            <button onClick={() => this.setGender('male')}>Male</button>
            <button onClick={() => this.setGender('female')}>Female</button>
          </div>
        </div>
      );
    }

    return (
      <div className="App">
        <div className="App-header">
          <h1>Slavic chat</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
          gender={this.state.member.gender}
        />
      </div>
    );
  }

  setGender(gender) {
    const member = { ...this.state.member, gender, username: randomName(gender) };
    this.setState({ member });

    this.drone = new window.Scaledrone("XxjiVvgc1NC6wn6Q", {
      data: member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      console.log("poslana poruka", member);
      const messages = [...this.state.messages];
      messages.push({member, text: data});
      this.setState({messages});
      this.setGender = this.setGender.bind(this);
    });
  }

  onSendMessage = (message) => {
    console.log("saljem message", message);
    this.drone.publish({
      room: "observable-room",
      message
    });
  }
}

export default App;
