pragma solidity ^0.8.0;

contract Event {
  string public data = "Hello other blockchain";

  enum Step { Send, Receive }
  event Transfer(
    address from,
    address to,
    string data,
    uint date,
    Step indexed step
  );

  function send(address to, string memory _data) external {
    emit Transfer(
      msg.sender,
      to,
      _data,
      block.timestamp,
      Step.Send
    );
  } 
  
    function receiv(address to, string memory _data) external {
    emit Transfer(
      msg.sender,
      to,
      _data,
      block.timestamp,
      Step.Receive
    );
  }

}