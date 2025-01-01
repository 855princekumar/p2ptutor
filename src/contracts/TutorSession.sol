// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract TutorSession {
    IERC20 public educaToken;
    
    struct Session {
        address tutor;
        address trainee;
        uint256 amount;
        uint256 startTime;
        uint256 endTime;
        bool tutorConfirmed;
        bool traineeConfirmed;
        bool completed;
    }
    
    mapping(bytes32 => Session) public sessions;
    
    event SessionCreated(bytes32 sessionId, address tutor, address trainee, uint256 amount);
    event SessionCompleted(bytes32 sessionId, uint256 duration);
    
    constructor(address _educaToken) {
        educaToken = IERC20(_educaToken);
    }
    
    function createSession(address _trainee, uint256 _amount, string memory _nftId) external returns (bytes32) {
        bytes32 sessionId = keccak256(abi.encodePacked(_nftId, block.timestamp));
        
        require(sessions[sessionId].tutor == address(0), "Session already exists");
        
        sessions[sessionId] = Session({
            tutor: msg.sender,
            trainee: _trainee,
            amount: _amount,
            startTime: block.timestamp,
            endTime: 0,
            tutorConfirmed: false,
            traineeConfirmed: false,
            completed: false
        });
        
        require(
            educaToken.transferFrom(_trainee, address(this), _amount),
            "Token transfer failed"
        );
        
        emit SessionCreated(sessionId, msg.sender, _trainee, _amount);
        return sessionId;
    }
    
    function confirmSession(bytes32 _sessionId) external {
        Session storage session = sessions[_sessionId];
        require(!session.completed, "Session already completed");
        
        if (msg.sender == session.tutor) {
            session.tutorConfirmed = true;
        } else if (msg.sender == session.trainee) {
            session.traineeConfirmed = true;
        }
        
        if (session.tutorConfirmed && session.traineeConfirmed) {
            completeSession(_sessionId);
        }
    }
    
    function completeSession(bytes32 _sessionId) internal {
        Session storage session = sessions[_sessionId];
        require(!session.completed, "Session already completed");
        
        session.endTime = block.timestamp;
        session.completed = true;
        
        require(
            educaToken.transferFrom(address(this), session.tutor, session.amount),
            "Token transfer failed"
        );
        
        emit SessionCompleted(_sessionId, session.endTime - session.startTime);
    }
}