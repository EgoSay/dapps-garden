// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "./StakeRewardToken.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {console} from "hardhat/console.sol";

contract Staker is Ownable {
    StakeRewardToken public token;

    constructor(address _token) {
        _transferOwnership(msg.sender);
        token = StakeRewardToken(_token);
    }

    // 预售价格
    uint256 public constant stakingPrice = 0.0001 ether;
    uint256 public constant stakingTotal = 100_0000;
    // limit user min and max Staking amount
    uint256 public immutable maxStakingAmount = 1 ether;
    uint256 public immutable minStakingAmount = 0.01 ether;
    // 预售目标
    uint256 public immutable stakingTarget = 100 ether;
    // 预售超募上限
    uint256 public immutable stakingCap = 200 ether;
    uint256 public totalReceivedETH;

    // 预售开始时间, "2024-08-27 00:00:00"
    uint256 public stakingStartTime = 1734573600;
    // 预售结束时间
    uint256 public stakingEndTime = stakingStartTime + 7 days;
    // 预售已募集金额
    // uint256 public StakingRaised;
    // 预售成功后，项目方可提现比例 => 10 %
    uint256 public projectCanWithdrawRate = 10;

    // 预售参与用户及其参与数量
    mapping(address => uint256) public stakingParticipantAmount;

    modifier isOnStaking() {
        require(block.timestamp >= stakingStartTime && block.timestamp <= stakingEndTime, "Staking is not start");
        require(totalReceivedETH <= stakingCap, "Staking is full");
        _;
    }

    modifier OnlySuccess() {
        require(totalReceivedETH >= stakingTarget, "Staking is not enough");
        _;
    }

    modifier OnlyFailed() {
        require(block.timestamp > stakingEndTime, "Staking is not end");
        require(totalReceivedETH < stakingTarget, "Staking is success");
        _;
    }

    /*
     * 开启预售: 支持对给定的任意ERC20开启预售，设定预售价格，募集ETH目标，超募上限，预售时长
     * 任意用户可支付ETH参与预售
     * @param amount 用户计划参与预售的数量
     */
    function stake() public payable isOnStaking {
        require(msg.value >= minStakingAmount && msg.value <= maxStakingAmount, "Staking: PURCHASE_AMOUNT_INVALID");
        require(msg.value <= (stakingCap - totalReceivedETH), "Staking is full");

        // update StakingParticipantAmount
        stakingParticipantAmount[msg.sender] += msg.value;
        totalReceivedETH += msg.value;
        emit Staking(msg.sender, msg.value);
    }

    /**
     * 预售结束后，如果没有达到募集目标，则用户可退款
     */
    function refund() public OnlySuccess {
        address refunder = msg.sender;
        uint256 refundAmount = stakingParticipantAmount[refunder];
        require(refundAmount > 0, "No refund");

        stakingParticipantAmount[refunder] = 0;
        (bool success,) = refunder.call{value: refundAmount}("");
        require(success, "Refund: FAILED");
        emit Refund(refunder, stakingParticipantAmount[refunder]);
    }

    /**
     * 预售成功，用户可领取 Token
     */
    function claim() public OnlySuccess {
        require(stakingParticipantAmount[msg.sender] > 0, "No claim");
        console.log(stakingParticipantAmount[msg.sender]);
        console.log(totalReceivedETH);
        uint256 canClaimAmount = stakingParticipantAmount[msg.sender] * stakingTotal / totalReceivedETH;
        stakingParticipantAmount[msg.sender] = 0;
        token.transfer(msg.sender, canClaimAmount);
        emit Claim(msg.sender, canClaimAmount);
    }

    /**
     * 预售成功，项目方可提现募集的ETH
     */
    function withdraw() public OnlySuccess {
        // 项目方只能提取一定比例的募集金额
        uint256 projectCanWithdraw = totalReceivedETH * projectCanWithdrawRate / 100;
        payable(owner()).transfer(projectCanWithdraw);
        totalReceivedETH -= projectCanWithdraw;
        emit Withdraw(msg.sender, projectCanWithdraw);
    }

    function getStakedAmount(address userAddress) public view returns (uint256) {
        return stakingParticipantAmount[userAddress];
    }

    function getStakingTarget() public pure returns (uint256) {
        return stakingTarget;
    }

    function getTotalReceivedETH() public view returns (uint256) {
        return totalReceivedETH;
    }

    function getCanClaimRewards(address userAddress) public view returns (uint256) {
        if (totalReceivedETH == 0) {
            return 0;
        }
        uint256 rewardPool = totalReceivedETH < stakingTarget ? stakingTarget : totalReceivedETH;
        return stakingParticipantAmount[userAddress] * stakingTotal / rewardPool;
    }

    function getTimeLeft() public view returns (uint256) {
        console.log("============>", block.timestamp, stakingEndTime);
        return stakingEndTime - block.timestamp;
    }

    function isCompleted() public view returns (bool) {
        return (block.timestamp > stakingEndTime || totalReceivedETH >= stakingCap);
    }

    event Staking(address indexed user, uint256 amount);
    event Refund(address indexed refunder, uint256 amount);
    event Claim(address indexed claimer, uint256 amount);
    event Withdraw(address indexed withdrawer, uint256 amount);
}
