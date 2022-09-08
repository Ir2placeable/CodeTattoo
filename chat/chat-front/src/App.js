import logo from './logo.svg';
import './App.css';
import React from 'react';


class App extends React.Component {
  ws = new WebSocket("ws://localhost:3002/chating"); // 온프레미스 or 클라우드

  componentDidMount() { // <- 추후에 로그인할때 실행되는 함수로 변경
    this.ws.onopen = () => {
      console.log("connected!!");
    };
  }

  sendMessage = () => {  // 화살표함수로 만들것!!
    this.ws.send("hello this is client Message");  // 서버로 메세지 보내는건 send
  };
  sendMessage
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.sendMessage}>메세지 보내기</button>
        </header>
      </div>
    );

    // render() {

    //   return (
    //     <div id="container" className="container">
    //       <h1>채팅</h1>
    //       <div id="chating" className="chating">
    //       </div>

    //       <div id="yourName">
    //         <table className="inputTable">
    //           <tr>
    //             <th>사용자명</th>
    //             <th><input type="text" name="userName" id="userName"></input></th>
    //             <th><button onClick="chatName()" id="startBtn">이름 등록</button></th>
    //           </tr>
    //         </table>
    //       </div>

    //       <div id="yourMsg">
    //         <table className="inputTable">
    //           <tr>
    //             <th>메시지</th>
    //             <th><input id="chatting" placeholder="보내실 메시지를 입력하세요."></input></th>
    //             <th><button onClick="send()" id="sendBtn">보내기</button></th>
    //           </tr>
    //         </table>
    //       </div>
    //     </div>
    //   );
  }
}



export default App;
