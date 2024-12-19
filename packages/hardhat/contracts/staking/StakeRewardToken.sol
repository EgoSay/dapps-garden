// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StakeRewardToken is ERC20 {
    constructor() ERC20("StakeRewardToken", "SRT") {
        _mint(msg.sender, 10000 * 10 ** decimals());
    }
}
