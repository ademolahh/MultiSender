// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract multiSender is Ownable{
    // name of the contract
    string public name;

    constructor()payable {
        name = 'PayEmployees';
    }
    
    fallback() payable external {}
    
    // Calculate the total amount of ether tbo be sent by the contract
    function calc(uint [] memory _receiver) pure private returns(uint){
        uint totalAmount = 0;
        for(uint i = 0; i<_receiver.length; i++){
            totalAmount += _receiver[i];
        }

        return totalAmount; 
    }

    // Withdrawal
    function withdraw(address payable receiver, uint amount) private{
        receiver.transfer(amount);
    }

    // A transfer function to
    function payOut(address payable [] memory _employeesAddr, uint[] memory _amount) onlyOwner public payable returns(bool success){
        // The length of the address array should be the same to that of the amount to be inputed by the caller
       require(_employeesAddr.length == _amount.length);

        //Using the calc function to check the total amount of eth we are sending out 
        uint toBeSent = calc(_amount);
        
        // The balance of the ether in the contract should be greater than the total amount to be sent
      require(address(this).balance > toBeSent);
        for(uint i=0; i<_employeesAddr.length; i++){

            // Calling the withdraw function
            withdraw(_employeesAddr[i], _amount[i]);
        }

        return true;
    }

    // Get the eth balance of the contract
    function getContractEthBalance() public view returns(uint){
        return address(this).balance;
    }
}
