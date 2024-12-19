// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract StakingComplete {
    bool public completed;

    function complete() public payable {
        completed = true;
    }

    function isCompleted() public view returns (bool) {
        return completed;
    }
}
