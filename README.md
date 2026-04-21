# CharityChain — Blockchain-Based Charity Donation Platform

A decentralized, transparent charity donation system built on Ethereum. Donations are sent **directly to charity wallets on-chain** with no intermediaries. Every transaction is permanently recorded and publicly verifiable on the blockchain.

---

## Table of Contents

1. [Problem Statement](#problem-statement)
2. [Solution Overview](#solution-overview)
3. [Technologies Used](#technologies-used)
4. [File Structure](#file-structure)
5. [Smart Contract Details](#smart-contract-details)
6. [Prerequisites](#prerequisites)
7. [Step-by-Step Execution Guide](#step-by-step-execution-guide)
8. [Role Reference](#role-reference)
9. [Request Status Reference](#request-status-reference)
10. [On-Chain Fraud Prevention](#on-chain-fraud-prevention)
11. [Troubleshooting](#troubleshooting)

---

## Problem Statement

Charitable organizations often struggle with transparency and accountability in managing donations. Donors lack visibility into how contributions are used, and there is no reliable mechanism to verify that donated funds reach the intended recipients without passing through intermediaries who may misuse them.

---

## Solution Overview

CharityChain addresses this by:

- Recording every donation immutably on the Ethereum blockchain
- Sending ETH directly from the donor's wallet to the charity's wallet — the smart contract holds nothing
- Requiring admin verification of charities before they can receive funds (fraud prevention)
- Requiring admin approval of each donation request before donors can contribute
- Giving donors a full, timestamped on-chain history of every contribution they have made
- Showing real-time progress bars for each donation campaign

---

## Technologies Used

| Technology | Purpose |
|------------|---------|
| **Solidity 0.8.x** | Smart contract language — handles all on-chain logic, role enforcement, and fund transfer |
| **Ethereum (Sepolia Testnet)** | Blockchain network where the contract is deployed |
| **MetaMask** | Browser wallet extension — signs transactions and manages accounts |
| **Remix IDE** | Browser-based IDE used to compile and deploy the Solidity contract |
| **Ethers.js v6** | JavaScript library for connecting the frontend to MetaMask and the deployed contract |
| **HTML5 / CSS3** | Frontend structure and styling |
| **Vanilla JavaScript (ES2020)** | All frontend interaction logic — no frameworks |
| **Python (http.server)** | Lightweight local web server to serve the frontend files |

---

## File Structure

```
charity-donation/
│
├── contracts/
│   └── CharityDonation.sol        ← Solidity smart contract (deploy this in Remix)
│
├── frontend/
│   ├── index.html                 ← Main UI — all panels and layout
│   ├── charity.js                 ← All blockchain interaction logic (Ethers.js)
│   └── styles.css                 ← Styling for all components
│
├── docs/
│   └── DEMO_CHECKLIST.md          ← Quick reference demo script
│
└── README.md                      ← This file
```

### File Descriptions

**`contracts/CharityDonation.sol`**
The Solidity smart contract containing all business logic: role management, charity registration and verification, donation request lifecycle, fund transfer, and immutable donation records. This is the only file that gets deployed to the blockchain.

**`frontend/index.html`**
The single-page frontend. Contains four role-specific panels (Admin, Charity, Donor, No Role) that are shown or hidden based on the connected wallet's on-chain role. Loads Ethers.js from CDN and references `charity.js`.

**`frontend/charity.js`**
All JavaScript logic for the application. Includes the full contract ABI, MetaMask connection, contract loading, and all functions for every role — assign roles, register/verify charities, create/approve requests, donate, and load donation history.

**`frontend/styles.css`**
CSS for the entire UI — layout, cards, progress bars, status pills, form elements, and responsive design.

---

## Smart Contract Details

**Contract name:** `CharityDonation`
**Solidity version:** `^0.8.0`
**Network:** Ethereum Sepolia Testnet (or local Ganache)

### Roles (enum)
| Value | Role | Permissions |
|-------|------|-------------|
| 0 | None | No access |
| 1 | Admin | Assign roles, verify charities, approve/reject requests |
| 2 | Charity | Register profile, create donation requests |
| 3 | Donor | Browse approved requests, donate ETH, view history |

### Request Status (enum)
| Value | Status | Meaning |
|-------|--------|---------|
| 0 | Pending | Created by charity, awaiting admin approval |
| 1 | Approved | Admin approved — donors can now contribute |
| 2 | Rejected | Admin rejected — cannot receive donations |
| 3 | Fulfilled | Target amount reached — marked complete |

### Key Functions

**Admin functions:**
- `assignRole(address, role)` — assigns a role to any wallet
- `verifyCharity(address)` — marks a registered charity as verified
- `approveRequest(requestId)` — opens a donation request to donors
- `rejectRequest(requestId)` — closes a request permanently

**Charity functions:**
- `registerCharity(name, description)` — registers the charity's profile on-chain
- `createRequest(title, description, targetAmount)` — creates a new donation campaign

**Donor functions:**
- `donate(requestId, message)` — sends ETH directly to the charity wallet; records the donation on-chain

**View functions:**
- `getAllRequests()` — returns all donation requests
- `getRequestDonations(requestId)` — returns all donations for a specific request
- `getMyDonations()` — returns request IDs the current donor contributed to
- `getMyCharityRequests()` — returns all requests created by the current charity
- `getAllCharities()` — returns all registered charity profiles
- `getCharityProfile(address)` — returns a single charity's profile

### On-Chain Events
Every key action emits a blockchain event for auditability:
- `RoleAssigned` — when admin assigns a role
- `CharityRegistered` — when a charity registers
- `CharityVerified` — when admin verifies a charity
- `RequestCreated` — when a charity creates a request
- `RequestApproved` / `RequestRejected` — when admin reviews a request
- `DonationMade` — when a donor sends ETH
- `RequestFulfilled` — when a request reaches its target

---

## Prerequisites

Install and set up the following before running the project:

| Tool | Where to get it |
|------|----------------|
| **Google Chrome or Firefox** | Any standard download |
| **MetaMask extension** | https://metamask.io |
| **Python 3** | https://python.org (pre-installed on Mac/Linux) |
| **Sepolia test ETH** | https://sepoliafaucet.com or https://faucets.chain.link |

You do **not** need Node.js, npm, Truffle, Hardhat, or any other tools.

---

## Step-by-Step Execution Guide

### Phase 1 — MetaMask Setup

**Step 1: Install MetaMask**
- Go to https://metamask.io and install the browser extension
- Create a wallet and save your seed phrase securely

**Step 2: Create 3 accounts in MetaMask**
- Click the account circle (top right in MetaMask) → **Add account or hardware wallet** → **Add a new account**
- Create 3 accounts total:
  - Account 1 → Admin (contract deployer)
  - Account 2 → Charity wallet
  - Account 3 → Donor wallet

**Step 3: Switch to Sepolia testnet**
- Click the network dropdown at the top of MetaMask
- Select **Sepolia test network**
- If you don't see it: MetaMask Settings → Advanced → Enable **Show test networks**

**Step 4: Get Sepolia test ETH**
- Go to https://sepoliafaucet.com
- Paste **Account 1** address → request ETH (needed to deploy)
- Paste **Account 3** address → request ETH (needed to donate)
- Wait 1–2 minutes for funds to arrive

---

### Phase 2 — Deploy the Smart Contract

**Step 5: Open Remix IDE**
- Go to https://remix.ethereum.org in your browser

**Step 6: Create the contract file**
- In the left sidebar, click the **File Explorer** icon
- Click **New File** → name it `CharityDonation.sol`
- Open `contracts/CharityDonation.sol` from this project
- Copy the entire contents and paste into Remix

**Step 7: Compile the contract**
- Click the **Solidity Compiler** tab (left sidebar — looks like `<S>`)
- Compiler version: select any **0.8.x** version (e.g. `0.8.20`)
- Click **Compile CharityDonation.sol**
- You should see a green checkmark — no errors

**Step 8: Deploy the contract**
- Click the **Deploy & Run Transactions** tab (left sidebar — Ethereum logo)
- **Environment:** select `Injected Provider - MetaMask`
- MetaMask will pop up asking to connect → click **Connect**
- Make sure MetaMask is on **Account 1 (Admin)** and **Sepolia** network
- **Contract:** select `CharityDonation` from the dropdown
- Click the orange **Deploy** button
- MetaMask will show a transaction confirmation → click **Confirm**
- Wait 10–20 seconds for the transaction to confirm on Sepolia

**Step 9: Copy the contract address**
- In Remix under **Deployed Contracts**, your contract will appear
- Click the **copy icon** next to the contract address
- Save this address — you will need it in the frontend

---

### Phase 3 — Run the Frontend

**Step 10: Start the local web server**

Open a terminal and navigate to the `frontend/` folder:

```bash
# Windows
cd path\to\charity-donation\frontend
python -m http.server 5500

# Mac / Linux
cd path/to/charity-donation/frontend
python3 -m http.server 5500
```

You should see:
```
Serving HTTP on 0.0.0.0 port 5500 (http://0.0.0.0:5500/) ...
```

**Step 11: Open the app**
- Open the **same browser** where MetaMask is installed
- Go to: `http://127.0.0.1:5500/frontend/`
- You should see the CharityChain homepage

**Step 12: Connect wallet and load contract**
- Click **Connect Wallet** → MetaMask will ask to connect → click **Connect**
- Paste the contract address (from Step 9) into the **Contract Address** field
- Click **Save** (stores it in browser so you don't need to paste it again)
- Click **Load Contract**
- Status bar should say: **"Contract loaded successfully"**
- The Admin Panel will appear (since Account 1 is Admin)

---

### Phase 4 — Full Demo Walkthrough

> To switch accounts: click the MetaMask extension → click the account name → select a different account. The page detects the change automatically.

**Step 13 (Admin): Assign roles**
- In Admin Panel → **Assign Role**
- Paste Account 2 address → select **Charity** → click **Assign Role** → confirm in MetaMask → wait
- Paste Account 3 address → select **Donor** → click **Assign Role** → confirm in MetaMask → wait

**Step 14 (Charity): Register charity**
- Switch MetaMask to **Account 2**
- The page switches to Charity Panel automatically
- Under **Step 1 — Register Your Charity**: fill in name and description
- Click **Register Charity** → confirm in MetaMask → wait for confirmation

**Step 15 (Admin): Verify the charity**
- Switch MetaMask to **Account 1 (Admin)**
- In Admin Panel → **Load All Charities** — you will see the charity with a ⚠ Pending badge
- Copy the charity's wallet address from the card
- Paste it into **Verify Charity** → click **Verify Charity** → confirm in MetaMask → wait
- The charity card now shows **✓ Verified**

**Step 16 (Charity): Create a donation request**
- Switch MetaMask to **Account 2 (Charity)**
- Under **Step 2 — Create a Donation Request**: fill in title, description, target ETH amount
- Click **Create Request** → confirm in MetaMask → wait
- Click **Refresh** under My Requests — the request appears with status **Pending**

**Step 17 (Admin): Approve the request**
- Switch MetaMask to **Account 1 (Admin)**
- In Admin Panel → **Load Pending Requests**
- Click **✓ Approve** on the request → confirm in MetaMask → wait
- The request disappears from the pending list

**Step 18 (Donor): Donate**
- Switch MetaMask to **Account 3 (Donor)**
- The page switches to Donor Panel
- Click **Load All Requests** — the approved request appears with progress bar at 0%
- Enter an ETH amount (e.g. `0.001`) and optional message
- Click **💚 Donate** → confirm in MetaMask → wait for confirmation
- The progress bar updates immediately to reflect the new amount

**Step 19 (Donor): View donation history**
- Click **Load My Donations**
- You will see every request you donated to, with:
  - Current progress bar
  - Each individual donation amount and timestamp
  - Your message (if any)
  - Your total contribution to that request

**Step 20 (Charity): View incoming donations**
- Switch MetaMask to **Account 2 (Charity)**
- Click **Refresh** under My Requests
- Click **Show donations ▾** on any request to see the full donor list

---

## On-Chain Fraud Prevention

| Mechanism | How it works |
|-----------|-------------|
| **Role gating** | Only wallets with the Charity role can create requests; only wallets with the Donor role can donate |
| **Two-step charity verification** | Admin must assign the Charity role AND separately verify the charity profile before any requests are accepted |
| **Request approval** | Every donation campaign must be reviewed and approved by the admin before it appears to donors |
| **Direct transfer** | ETH goes directly from `msg.sender` to `charity.wallet` — the contract never holds funds |
| **Immutable records** | All donations are permanently stored on-chain with donor address, amount, timestamp, and message |
| **No double-dipping** | The contract tracks which requests a donor has participated in for accurate history |

---

## Troubleshooting

**"MetaMask not detected"**
Make sure the MetaMask extension is installed and enabled in your browser.

**"Failed to load contract"**
- Double-check the contract address — copy it exactly from Remix
- Make sure MetaMask is on the same network you deployed to (Sepolia)

**"Charity not verified by admin yet"**
The charity registered but the admin hasn't verified them. Switch to Admin wallet → Verify Charity → paste the charity address → confirm.

**"Not a charity" or "Not admin"**
The connected MetaMask account doesn't have the right role. Switch to the correct account.

**Progress bar not updating**
Click **Load All Requests** to manually refresh after a donation confirms.

**Browser showing old version of JS**
Rename `app.js` to `charity.js` and update `index.html` to reference `charity.js`. The browser will fetch the new filename fresh with no cache.

**Port 5500 already in use**
```bash
python3 -m http.server 8080
# Then open http://127.0.0.1:8080
```

**Ganache (local) instead of Sepolia**
- Start Ganache → note RPC `http://127.0.0.1:7545`, Chain ID `1337`
- Add to MetaMask: Settings → Networks → Add Network → fill in the values above
- Import Ganache accounts using their private keys
- Deploy in Remix with the Ganache network selected — everything else is identical
