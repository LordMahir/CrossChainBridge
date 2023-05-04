pragma solidity ^0.8.0;

// Fire and Rec are two smart contracts 
// Fire(fires an event) -> API(listens to the event && fires another event) -> Rec(listens to the event) 

contract Fire {
  address public admin;
  string public data = "Hello other blockchain";

  enum Step { Send, Receive }
  event Transfer(
    address from,
    address to,
    string data,
    uint date,
    Step indexed step
  );

  function sayHello() public pure returns(string memory){
    return("hello world");
  }

  function send(address to, string data) external {
    // token.burn(msg.sender, amount);
    sayHello();
    emit Transfer(
      msg.sender,
      to,
      data,
      block.timestamp,
      Step.Send
    );
  } 
  
    function receive(address to, string data) external {
    require(msg.sender == admin, 'only admin');
    // token.mint(to, amount);
    emit Transfer(
      msg.sender,
      to,
      data,
      block.timestamp,
      Step.Receive
    );
  }

}