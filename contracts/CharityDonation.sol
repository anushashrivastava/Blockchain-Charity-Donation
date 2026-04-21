// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CharityDonation {

    // ─── Roles ───────────────────────────────────────────────────────────────
    enum Role { None, Admin, Charity, Donor }

    // ─── Request status ──────────────────────────────────────────────────────
    enum RequestStatus { Pending, Approved, Rejected, Fulfilled }

    // ─── Structs ─────────────────────────────────────────────────────────────
    struct CharityProfile {
        address wallet;
        string  name;
        string  description;
        bool    verified;
        uint256 totalReceived;
    }

    struct DonationRequest {
        uint256 id;
        address charity;
        string  title;
        string  description;
        uint256 targetAmount;   // in wei
        uint256 raisedAmount;
        RequestStatus status;
        uint256 createdAt;
        uint256 fulfilledAt;
    }

    struct Donation {
        uint256 requestId;
        address donor;
        uint256 amount;
        uint256 donatedAt;
        string  message;
    }

    // ─── State ───────────────────────────────────────────────────────────────
    address public superAdmin;

    mapping(address => Role)          public roles;
    mapping(address => CharityProfile) private _charities;
    address[] private _charityList;

    uint256 private _nextRequestId = 1;
    mapping(uint256 => DonationRequest) private _requests;
    mapping(uint256 => Donation[])      private _requestDonations;  // donations per request
    mapping(address => uint256[])       private _charityRequests;
    mapping(address => uint256[])       private _donorRequests;     // requests a donor contributed to

    uint256 public totalDonationsGlobal;

    // ─── Events ──────────────────────────────────────────────────────────────
    event RoleAssigned(address indexed account, Role role, address indexed byAdmin);
    event CharityRegistered(address indexed charity, string name);
    event CharityVerified(address indexed charity, address indexed byAdmin);
    event RequestCreated(uint256 indexed requestId, address indexed charity, string title, uint256 targetAmount);
    event RequestApproved(uint256 indexed requestId, address indexed byAdmin);
    event RequestRejected(uint256 indexed requestId, address indexed byAdmin);
    event DonationMade(uint256 indexed requestId, address indexed donor, uint256 amount);
    event RequestFulfilled(uint256 indexed requestId, address indexed charity, uint256 totalRaised);

    // ─── Modifiers ───────────────────────────────────────────────────────────
    modifier onlyAdmin() {
        require(roles[msg.sender] == Role.Admin, "Not admin");
        _;
    }

    modifier onlyCharity() {
        require(roles[msg.sender] == Role.Charity, "Not a charity");
        _;
    }

    modifier requestExists(uint256 id) {
        require(id > 0 && id < _nextRequestId, "Request does not exist");
        _;
    }

    // ─── Constructor ─────────────────────────────────────────────────────────
    constructor() {
        superAdmin = msg.sender;
        roles[msg.sender] = Role.Admin;
        emit RoleAssigned(msg.sender, Role.Admin, msg.sender);
    }

    // ─── Admin functions ─────────────────────────────────────────────────────

    function assignRole(address account, Role role) external onlyAdmin {
        require(account != address(0), "Invalid address");
        roles[account] = role;
        emit RoleAssigned(account, role, msg.sender);
    }

    function verifyCharity(address charity) external onlyAdmin {
        require(roles[charity] == Role.Charity, "Not a charity wallet");
        _charities[charity].verified = true;
        emit CharityVerified(charity, msg.sender);
    }

    function approveRequest(uint256 requestId) external onlyAdmin requestExists(requestId) {
        DonationRequest storage r = _requests[requestId];
        require(r.status == RequestStatus.Pending, "Not pending");
        r.status = RequestStatus.Approved;
        emit RequestApproved(requestId, msg.sender);
    }

    function rejectRequest(uint256 requestId) external onlyAdmin requestExists(requestId) {
        DonationRequest storage r = _requests[requestId];
        require(r.status == RequestStatus.Pending, "Not pending");
        r.status = RequestStatus.Rejected;
        emit RequestRejected(requestId, msg.sender);
    }

    // ─── Charity functions ────────────────────────────────────────────────────

    function registerCharity(string calldata name, string calldata description) external {
        require(roles[msg.sender] == Role.Charity, "Assign Charity role first");
        require(bytes(name).length > 0, "Name required");
        _charities[msg.sender] = CharityProfile({
            wallet: msg.sender,
            name: name,
            description: description,
            verified: false,
            totalReceived: 0
        });
        _charityList.push(msg.sender);
        emit CharityRegistered(msg.sender, name);
    }

    function createRequest(
        string calldata title,
        string calldata description,
        uint256 targetAmount
    ) external onlyCharity {
        require(_charities[msg.sender].verified, "Charity not verified by admin yet");
        require(bytes(title).length > 0, "Title required");
        require(targetAmount > 0, "Target must be > 0");

        uint256 id = _nextRequestId++;
        _requests[id] = DonationRequest({
            id: id,
            charity: msg.sender,
            title: title,
            description: description,
            targetAmount: targetAmount,
            raisedAmount: 0,
            status: RequestStatus.Pending,
            createdAt: block.timestamp,
            fulfilledAt: 0
        });
        _charityRequests[msg.sender].push(id);
        emit RequestCreated(id, msg.sender, title, targetAmount);
    }

    // ─── Donor functions ──────────────────────────────────────────────────────

    function donate(uint256 requestId, string calldata message)
        external payable requestExists(requestId)
    {
        require(msg.value > 0, "Send some ETH");
        DonationRequest storage r = _requests[requestId];
        require(r.status == RequestStatus.Approved, "Request not approved");

        // Record donation
        _requestDonations[requestId].push(Donation({
            requestId: requestId,
            donor: msg.sender,
            amount: msg.value,
            donatedAt: block.timestamp,
            message: message
        }));

        // Track donor's participated requests (deduplicated via simple check)
        bool alreadyTracked = false;
        uint256[] storage dReqs = _donorRequests[msg.sender];
        for (uint256 i = 0; i < dReqs.length; i++) {
            if (dReqs[i] == requestId) { alreadyTracked = true; break; }
        }
        if (!alreadyTracked) dReqs.push(requestId);

        r.raisedAmount += msg.value;
        _charities[r.charity].totalReceived += msg.value;
        totalDonationsGlobal += msg.value;

        emit DonationMade(requestId, msg.sender, msg.value);

        // If target reached, send funds to charity and mark fulfilled
        if (r.raisedAmount >= r.targetAmount) {
            r.status = RequestStatus.Fulfilled;
            r.fulfilledAt = block.timestamp;
            (bool sent, ) = r.charity.call{value: r.raisedAmount}("");
            require(sent, "Transfer failed");
            emit RequestFulfilled(requestId, r.charity, r.raisedAmount);
        } else {
            // Send immediately - charity gets funds as donations come in
            (bool sent, ) = r.charity.call{value: msg.value}("");
            require(sent, "Transfer failed");
        }
    }

    // ─── View functions ────────────────────────────────────────────────────────

    function getRequest(uint256 requestId)
        external view requestExists(requestId)
        returns (DonationRequest memory)
    {
        return _requests[requestId];
    }

    function getAllRequests() external view returns (DonationRequest[] memory) {
        uint256 count = _nextRequestId - 1;
        DonationRequest[] memory result = new DonationRequest[](count);
        for (uint256 i = 1; i <= count; i++) {
            result[i - 1] = _requests[i];
        }
        return result;
    }

    function getRequestDonations(uint256 requestId)
        external view requestExists(requestId)
        returns (Donation[] memory)
    {
        return _requestDonations[requestId];
    }

    function getMyCharityRequests() external view onlyCharity returns (DonationRequest[] memory) {
        uint256[] memory ids = _charityRequests[msg.sender];
        DonationRequest[] memory result = new DonationRequest[](ids.length);
        for (uint256 i = 0; i < ids.length; i++) {
            result[i] = _requests[ids[i]];
        }
        return result;
    }

    function getMyDonations() external view returns (uint256[] memory) {
        return _donorRequests[msg.sender];
    }

    function getCharityProfile(address charity) external view returns (CharityProfile memory) {
        return _charities[charity];
    }

    function getAllCharities() external view returns (CharityProfile[] memory) {
        CharityProfile[] memory result = new CharityProfile[](_charityList.length);
        for (uint256 i = 0; i < _charityList.length; i++) {
            result[i] = _charities[_charityList[i]];
        }
        return result;
    }

    function totalRequests() external view returns (uint256) {
        return _nextRequestId - 1;
    }
}
