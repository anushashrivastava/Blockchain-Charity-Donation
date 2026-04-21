# CharityChain — Blockchain-Based Charity Donation Platform

A transparent, trustless charity donation system built with Solidity, Ethers.js, MetaMask, and Remix. Donations are sent **directly to the charity's wallet** on-chain with no intermediaries. Every transaction is immutable and publicly verifiable.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [How It Works](#how-it-works)
3. [Prerequisites](#prerequisites)
4. [Part 1 — Deploy the Smart Contract (Remix + MetaMask)](#part-1--deploy-the-smart-contract)
5. [Part 2 — Run the Frontend](#part-2--run-the-frontend)
6. [Part 3 — Full Demo Walkthrough](#part-3--full-demo-walkthrough)
7. [Role Reference](#role-reference)
8. [Request Status Reference](#request-status-reference)
9. [Troubleshooting](#troubleshooting)

---

## Project Structure

```
charity-donation/
├── contracts/
│   └── CharityDonation.sol       ← Smart contract (deploy this in Remix)
├── frontend/
│   ├── index.html                ← Open this in your browser
│   ├── app.js                    ← All blockchain interaction logic
│   └── styles.css                ← Styling
└── docs/
    └── DEMO_CHECKLIST.md         ← Quick demo script
```

---

## How It Works

```
Admin deploys contract
       │
       ▼
Admin assigns roles (Charity / Donor) to wallets
       │
       ▼
Charity registers profile → Admin verifies them
       │
       ▼
Charity creates donation request → Admin approves it
       │
       ▼
Donors browse approved requests → Send ETH directly to charity wallet
       │
       ▼
All donations logged on-chain, visible on the live feed and donor history
```

**Key properties:**
- ETH goes directly to the charity wallet — the contract holds nothing
- Admin must verify charities before they can create requests (fraud prevention)
- Admin must approve each request before it accepts donations (further fraud prevention)
- Every donation is permanently recorded on-chain with timestamp, donor address, amount, and message
- The UI auto-refreshes progress bars when a donation is confirmed

---

## Prerequisites

You need:

| Tool | Purpose | Link |
|------|---------|-------|
| **MetaMask** browser extension | Wallet for all accounts | https://metamask.io |
| **Remix IDE** | Deploy the smart contract | https://remix.ethereum.org |
| **Python 3** (or any HTTP server) | Serve the frontend locally | Already installed on most systems |
| **Sepolia test ETH** | Pay for transactions on testnet | https://sepoliafaucet.com |

> **Ganache alternative:** If you prefer a fully local setup, Ganache works too. See the [Troubleshooting](#troubleshooting) section.

---

## Part 1 — Deploy the Smart Contract

### Step 1.1 — Set up MetaMask accounts

You need **at least 3 MetaMask accounts** for a full demo:

| Account | Role | Needs test ETH? |
|---------|------|----------------|
| Account 1 | Admin (contract deployer) | Yes (small amount for deployment) |
| Account 2 | Charity wallet | No |
| Account 3 | Donor wallet | Yes (to send donations) |

To create extra accounts in MetaMask:
- Click the account icon (top right) → **Add account or hardware wallet** → **Add a new account**

To get Sepolia ETH:
- Go to https://sepoliafaucet.com or https://faucets.chain.link
- Paste your Account 1 and Account 3 addresses and request test ETH

### Step 1.2 — Switch MetaMask to Sepolia

1. Open MetaMask
2. Click the network dropdown at the top (may say "Ethereum Mainnet")
3. Select **Sepolia test network**
   - If you don't see it, go to Settings → Advanced → turn on **Show test networks**

### Step 1.3 — Deploy in Remix

1. Open **https://remix.ethereum.org**

2. In the left sidebar, click the **File Explorer** icon (top icon)

3. Click the **New File** icon → name it `CharityDonation.sol`

4. Copy the entire contents of `contracts/CharityDonation.sol` and paste it into Remix

5. Go to the **Solidity Compiler** tab (left sidebar, looks like `<S>`)
   - Compiler version: select **0.8.0** or higher (e.g. `0.8.20`)
   - Click **Compile CharityDonation.sol**
   - You should see a green checkmark — no errors

6. Go to the **Deploy & Run Transactions** tab (left sidebar, looks like Ethereum logo)
   - **Environment:** select `Injected Provider - MetaMask`
   - MetaMask will pop up and ask to connect — approve it
   - **Account:** make sure **Account 1 (Admin)** is selected in MetaMask
   - **Contract:** select `CharityDonation`

7. Click the orange **Deploy** button
   - MetaMask will show a transaction prompt → click **Confirm**
   - Wait ~10–20 seconds for the transaction to confirm on Sepolia

8. In Remix, under **Deployed Contracts**, you'll see your contract
   - Click the **copy icon** next to the contract address
   - **Save this address — you'll need it for the frontend**

---

## Part 2 — Run the Frontend

### Step 2.1 — Start a local web server

Open a terminal, navigate to the `frontend` folder:

**On Windows:**
```cmd
cd path\to\charity-donation\frontend
python -m http.server 5500
```

**On Mac/Linux:**
```bash
cd path/to/charity-donation/frontend
python3 -m http.server 5500
```

You should see:
```
Serving HTTP on 0.0.0.0 port 5500 ...
```

### Step 2.2 — Open the app

Open your browser (the same browser where MetaMask is installed) and go to:

```
http://127.0.0.1:5500
```

You should see the CharityChain homepage.

### Step 2.3 — Connect the contract

1. Click **Connect Wallet** → MetaMask will ask you to connect → click **Connect**
2. In the **Contract Address** field, paste the address you copied from Remix
3. Click **Save** (stores it in your browser so you don't have to paste it every time)
4. Click **Load Contract**
5. The status bar should say **"Contract loaded successfully"**
6. The global stats bar will appear at the top
7. Your role panel will appear (Admin, Charity, or Donor depending on your wallet)

---

## Part 3 — Full Demo Walkthrough

> Switch MetaMask accounts by clicking the MetaMask icon → clicking the account circle → selecting a different account. The page detects the change automatically.

### Phase 1 — Admin Setup

**Use Account 1 (Admin)**

1. In the **Admin Panel**, go to **Assign Role**
2. Paste **Account 2's address** → select **Charity** → click **Assign Role** → confirm in MetaMask
3. Wait for confirmation
4. Paste **Account 3's address** → select **Donor** → click **Assign Role** → confirm in MetaMask
5. Wait for confirmation

### Phase 2 — Charity Registers

**Switch MetaMask to Account 2 (Charity)**

The page will detect the account change and show the Charity Panel.

1. Go to **Step 1 — Register Your Charity**
2. Fill in charity name and description → click **Register Charity** → confirm in MetaMask
3. Wait for confirmation. You'll see: *"Registered! Ask the admin to verify your wallet."*

**Switch back to Account 1 (Admin)**

4. In **Admin Panel → Verify Charity**, paste **Account 2's address** → click **Verify Charity** → confirm in MetaMask
5. Wait for confirmation

### Phase 3 — Charity Creates a Request

**Switch to Account 2 (Charity)**

1. Go to **Step 2 — Create a Donation Request**
2. Fill in:
   - Title: e.g. `School Supplies Drive`
   - Description: e.g. `Providing notebooks and pens to 200 students`
   - Target Amount: e.g. `0.05` (ETH)
3. Click **Create Request** → confirm in MetaMask
4. Click **Refresh** under My Requests — you should see the request with status **Pending**

### Phase 4 — Admin Approves the Request

**Switch to Account 1 (Admin)**

1. In **Admin Panel → Pending Requests**, click **Load Pending Requests**
2. You'll see the charity's request
3. Click **✓ Approve** → confirm in MetaMask
4. Wait for confirmation — the request disappears from the pending list

### Phase 5 — Donor Donates

**Switch to Account 3 (Donor)**

1. In **Donor Panel**, click **Load All Requests**
2. You'll see the approved request with its progress bar at **0%**
3. Enter an ETH amount (e.g. `0.01`) in the donation box
4. Optionally add a message (e.g. `Keep up the great work!`)
5. Click **💚 Donate** → confirm in MetaMask
6. Wait for confirmation
7. The progress bar **immediately updates** to reflect the new amount
8. The **Live Feed panel** on the right shows the donation in real time
9. The global stats counter at the top updates

### Phase 6 — Check Donation History

**Still as Account 3 (Donor)**

1. Click **Load My Donations**
2. You'll see each request you donated to, with:
   - The current progress bar
   - A breakdown of your individual donations with timestamps and messages
   - Your total contribution to that request

### Phase 7 — Charity Checks Incoming Donations

**Switch to Account 2 (Charity)**

1. Click **Refresh** under My Requests
2. Click **Show donations ▾** on any request to see the full donation list
3. Each donor's address, amount, timestamp, and message are visible

---

## Role Reference

| Role | Value | Can do |
|------|-------|--------|
| None | 0 | Nothing |
| Admin | 1 | Assign roles, verify charities, approve/reject requests |
| Charity | 2 | Register, create donation requests, view incoming donations |
| Donor | 3 | Browse approved requests, donate ETH, view history |

---

## Request Status Reference

| Status | Value | Meaning |
|--------|-------|---------|
| Pending | 0 | Created by charity, waiting for admin approval |
| Approved | 1 | Admin approved — donors can donate |
| Rejected | 2 | Admin rejected — cannot accept donations |
| Fulfilled | 3 | Target amount reached — marked complete |

---

## Troubleshooting

### "MetaMask not detected"
- Make sure MetaMask is installed and enabled in your browser
- Use Chrome or Firefox (MetaMask doesn't work on some Brave settings)

### "Failed to load contract"
- Double-check the contract address — it must match exactly what Remix showed after deployment
- Make sure MetaMask is on the **same network** you deployed to (Sepolia, or Ganache)
- Make sure you clicked **Compile** successfully before deploying in Remix

### "User rejected transaction"
- You clicked Cancel in MetaMask — try the action again and click Confirm

### "Error: Not a charity" or "Error: Not admin"
- The currently connected MetaMask account doesn't have the right role
- Switch to the correct account or ask admin to assign the role

### "Charity not verified"
- The charity must be verified by an Admin before creating requests
- Switch to Admin account → Verify Charity → paste the charity wallet address

### Progress bar not updating after donation
- The bar updates automatically after the transaction confirms
- If it doesn't, click the **Load All Requests** button to manually refresh

### Using Ganache instead of Sepolia

1. Open Ganache → Start a new workspace (note: RPC URL is `http://127.0.0.1:7545`, Chain ID `1337`)
2. In MetaMask → Add a network manually:
   - Network Name: `Ganache`
   - RPC URL: `http://127.0.0.1:7545`
   - Chain ID: `1337`
   - Currency: `ETH`
3. Import accounts from Ganache using their private keys (click the key icon in Ganache)
4. In Remix, set Environment to `Injected Provider - MetaMask`, select your Ganache network
5. Deploy and follow the same steps above — everything works the same way

### Port 5500 already in use
```bash
python3 -m http.server 8080
# Then open http://127.0.0.1:8080
```
