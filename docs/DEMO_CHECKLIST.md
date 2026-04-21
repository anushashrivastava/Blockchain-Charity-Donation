# CharityChain — Complete Setup & Demo Guide

## Prerequisites
- MetaMask installed in your browser
- Remix IDE: https://remix.ethereum.org
- Ganache (optional, for local testing) OR use Sepolia testnet
- Sepolia test ETH from a faucet (e.g. https://sepoliafaucet.com)

---

## Option A — Deploy on Sepolia Testnet (Recommended for demo)

### Step 1: Set up MetaMask accounts
You need **4 accounts** in MetaMask for a full demo:
- Account 1: **Admin** (deployer)
- Account 2: **Charity** wallet
- Account 3: **Donor** wallet
- Account 4: (optional) Second donor

Make sure Account 1 and Account 3 (donors) have some Sepolia ETH.

### Step 2: Deploy the contract in Remix
1. Open https://remix.ethereum.org
2. In the File Explorer, create `CharityDonation.sol` and paste the contract code.
3. Go to **Solidity Compiler** tab → select version `0.8.x` → click **Compile**.
4. Go to **Deploy & Run Transactions** tab:
   - Environment: `Injected Provider - MetaMask`
   - Make sure MetaMask is on **Sepolia** network
   - Selected account: **Account 1 (Admin)**
5. Click **Deploy** → confirm in MetaMask.
6. Copy the deployed contract address from the "Deployed Contracts" section.

### Step 3: Start the frontend
```bash
cd frontend
python -m http.server 5500
```
Then open: http://127.0.0.1:5500

---

## Option B — Deploy on Ganache (Local)

### Step 1: Start Ganache
1. Open Ganache → New Workspace → Start.
2. RPC: `http://127.0.0.1:7545`
3. Import at least 4 accounts into MetaMask using their private keys.

### Step 2: Deploy in Remix
1. Same as above but:
   - Environment: `Injected Provider - MetaMask`
   - MetaMask network: point to Ganache (add custom RPC: http://127.0.0.1:7545, Chain ID: 1337)
2. Deploy, copy address.

### Step 3: Start frontend
Same as Option A.

---

## Full Demo Scenario

### Phase 1 — Admin Setup
1. Connect MetaMask with **Account 1 (Admin)**.
2. Paste contract address → click **Load Contract**.
3. Admin Panel → **Assign Role**:
   - Assign Account 2 → Role: `Charity`
   - Assign Account 3 → Role: `Donor`

### Phase 2 — Charity Registration
4. Switch MetaMask to **Account 2 (Charity)** → reload contract.
5. Charity Panel → **Register Your Charity** → fill name + description → click Register.
6. Switch back to **Account 1 (Admin)** → reload contract.
7. Admin Panel → **Verify Charity** → paste Account 2 address → click Verify Charity.

### Phase 3 — Create a Donation Request
8. Switch to **Account 2 (Charity)** → reload.
9. Charity Panel → **Create Donation Request** → fill title, description, target ETH amount → click Create.
10. Switch to **Account 1 (Admin)** → reload → **Load Pending Requests**.
11. Click **Approve** on the new request.

### Phase 4 — Donate
12. Switch to **Account 3 (Donor)** → reload.
13. Donor Panel → **Load All Requests** → find the approved request.
14. Enter ETH amount + optional message → click **Donate** → confirm in MetaMask.
15. Click **Load My Donations** to see your donation history and status.

### Phase 5 — Charity receives funds
- ETH goes directly to the charity wallet on-chain — no intermediary.
- When total raised ≥ target, the request is marked **Fulfilled** automatically.

---

## Rejection Test Cases
- Attempt to create a request as an unverified charity → rejected.
- Attempt to donate to a Pending (not-approved) request → rejected.
- Attempt to donate 0 ETH → rejected.

---

## Project Structure
```
charity-donation/
├── contracts/
│   └── CharityDonation.sol      ← Smart contract
├── frontend/
│   ├── index.html               ← UI
│   ├── app.js                   ← Ethers.js logic
│   └── styles.css               ← Styling
└── docs/
    └── DEMO_CHECKLIST.md        ← This file
```

## Role Reference
| Role | Value |
|------|-------|
| None | 0 |
| Admin | 1 |
| Charity | 2 |
| Donor | 3 |

## Request Status Reference
| Status | Value |
|--------|-------|
| Pending | 0 |
| Approved | 1 |
| Rejected | 2 |
| Fulfilled | 3 |
