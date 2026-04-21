// ─── CONTRACT ABI ─────────────────────────────────────────────────────────────
const CONTRACT_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { anonymous: false, inputs: [{ indexed: true, internalType: "address", name: "account", type: "address" }, { indexed: false, internalType: "uint8", name: "role", type: "uint8" }, { indexed: true, internalType: "address", name: "byAdmin", type: "address" }], name: "RoleAssigned", type: "event" },
  { anonymous: false, inputs: [{ indexed: true, internalType: "address", name: "charity", type: "address" }, { indexed: false, internalType: "string", name: "name", type: "string" }], name: "CharityRegistered", type: "event" },
  { anonymous: false, inputs: [{ indexed: true, internalType: "address", name: "charity", type: "address" }, { indexed: true, internalType: "address", name: "byAdmin", type: "address" }], name: "CharityVerified", type: "event" },
  { anonymous: false, inputs: [{ indexed: true, internalType: "uint256", name: "requestId", type: "uint256" }, { indexed: true, internalType: "address", name: "charity", type: "address" }, { indexed: false, internalType: "string", name: "title", type: "string" }, { indexed: false, internalType: "uint256", name: "targetAmount", type: "uint256" }], name: "RequestCreated", type: "event" },
  { anonymous: false, inputs: [{ indexed: true, internalType: "uint256", name: "requestId", type: "uint256" }, { indexed: true, internalType: "address", name: "byAdmin", type: "address" }], name: "RequestApproved", type: "event" },
  { anonymous: false, inputs: [{ indexed: true, internalType: "uint256", name: "requestId", type: "uint256" }, { indexed: true, internalType: "address", name: "byAdmin", type: "address" }], name: "RequestRejected", type: "event" },
  { anonymous: false, inputs: [{ indexed: true, internalType: "uint256", name: "requestId", type: "uint256" }, { indexed: true, internalType: "address", name: "donor", type: "address" }, { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }], name: "DonationMade", type: "event" },
  { anonymous: false, inputs: [{ indexed: true, internalType: "uint256", name: "requestId", type: "uint256" }, { indexed: true, internalType: "address", name: "charity", type: "address" }, { indexed: false, internalType: "uint256", name: "totalRaised", type: "uint256" }], name: "RequestFulfilled", type: "event" },
  { inputs: [{ internalType: "address", name: "account", type: "address" }, { internalType: "uint8", name: "role", type: "uint8" }], name: "assignRole", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ internalType: "address", name: "charity", type: "address" }], name: "verifyCharity", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ internalType: "uint256", name: "requestId", type: "uint256" }], name: "approveRequest", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ internalType: "uint256", name: "requestId", type: "uint256" }], name: "rejectRequest", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ internalType: "string", name: "name", type: "string" }, { internalType: "string", name: "description", type: "string" }], name: "registerCharity", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ internalType: "string", name: "title", type: "string" }, { internalType: "string", name: "description", type: "string" }, { internalType: "uint256", name: "targetAmount", type: "uint256" }], name: "createRequest", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "getMyCharityRequests", outputs: [{ components: [{ internalType: "uint256", name: "id", type: "uint256" }, { internalType: "address", name: "charity", type: "address" }, { internalType: "string", name: "title", type: "string" }, { internalType: "string", name: "description", type: "string" }, { internalType: "uint256", name: "targetAmount", type: "uint256" }, { internalType: "uint256", name: "raisedAmount", type: "uint256" }, { internalType: "uint8", name: "status", type: "uint8" }, { internalType: "uint256", name: "createdAt", type: "uint256" }, { internalType: "uint256", name: "fulfilledAt", type: "uint256" }], internalType: "struct CharityDonation.DonationRequest[]", name: "", type: "tuple[]" }], stateMutability: "view", type: "function" },
  { inputs: [{ internalType: "uint256", name: "requestId", type: "uint256" }, { internalType: "string", name: "message", type: "string" }], name: "donate", outputs: [], stateMutability: "payable", type: "function" },
  { inputs: [], name: "getMyDonations", outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "getAllRequests", outputs: [{ components: [{ internalType: "uint256", name: "id", type: "uint256" }, { internalType: "address", name: "charity", type: "address" }, { internalType: "string", name: "title", type: "string" }, { internalType: "string", name: "description", type: "string" }, { internalType: "uint256", name: "targetAmount", type: "uint256" }, { internalType: "uint256", name: "raisedAmount", type: "uint256" }, { internalType: "uint8", name: "status", type: "uint8" }, { internalType: "uint256", name: "createdAt", type: "uint256" }, { internalType: "uint256", name: "fulfilledAt", type: "uint256" }], internalType: "struct CharityDonation.DonationRequest[]", name: "", type: "tuple[]" }], stateMutability: "view", type: "function" },
  { inputs: [{ internalType: "uint256", name: "requestId", type: "uint256" }], name: "getRequestDonations", outputs: [{ components: [{ internalType: "uint256", name: "requestId", type: "uint256" }, { internalType: "address", name: "donor", type: "address" }, { internalType: "uint256", name: "amount", type: "uint256" }, { internalType: "uint256", name: "donatedAt", type: "uint256" }, { internalType: "string", name: "message", type: "string" }], internalType: "struct CharityDonation.Donation[]", name: "", type: "tuple[]" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "getAllCharities", outputs: [{ components: [{ internalType: "address", name: "wallet", type: "address" }, { internalType: "string", name: "name", type: "string" }, { internalType: "string", name: "description", type: "string" }, { internalType: "bool", name: "verified", type: "bool" }, { internalType: "uint256", name: "totalReceived", type: "uint256" }], internalType: "struct CharityDonation.CharityProfile[]", name: "", type: "tuple[]" }], stateMutability: "view", type: "function" },
  { inputs: [{ internalType: "address", name: "charity", type: "address" }], name: "getCharityProfile", outputs: [{ components: [{ internalType: "address", name: "wallet", type: "address" }, { internalType: "string", name: "name", type: "string" }, { internalType: "string", name: "description", type: "string" }, { internalType: "bool", name: "verified", type: "bool" }, { internalType: "uint256", name: "totalReceived", type: "uint256" }], internalType: "struct CharityDonation.CharityProfile", name: "", type: "tuple" }], stateMutability: "view", type: "function" },
  { inputs: [{ internalType: "address", name: "", type: "address" }], name: "roles", outputs: [{ internalType: "uint8", name: "", type: "uint8" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "superAdmin", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "totalDonationsGlobal", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "totalRequests", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
];

const ROLE_NAMES   = { 0: "None", 1: "Admin", 2: "Charity", 3: "Donor" };
const STATUS_NAMES = { 0: "Pending", 1: "Approved", 2: "Rejected", 3: "Fulfilled" };
const STATUS_PILLS = { 0: "pill-pending", 1: "pill-approved", 2: "pill-rejected", 3: "pill-fulfilled" };

const $ = id => document.getElementById(id);
const el = {
  statusBar:            $("statusBar"),
  connectWalletBtn:     $("connectWalletBtn"),
  saveContractBtn:      $("saveContractBtn"),
  loadContractBtn:      $("loadContractBtn"),
  walletAddress:        $("walletAddress"),
  walletRole:           $("walletRole"),
  contractAddress:      $("contractAddress"),
  statPanel:            $("statPanel"),
  statTotalDonations:   $("statTotalDonations"),
  statTotalRequests:    $("statTotalRequests"),
  adminPanel:           $("adminPanel"),
  roleWallet:           $("roleWallet"),
  roleSelect:           $("roleSelect"),
  assignRoleBtn:        $("assignRoleBtn"),
  verifyCharityWallet:  $("verifyCharityWallet"),
  verifyCharityBtn:     $("verifyCharityBtn"),
  loadPendingBtn:       $("loadPendingBtn"),
  pendingList:          $("pendingList"),
  loadCharitiesBtn:     $("loadCharitiesBtn"),
  charitiesList:        $("charitiesList"),
  charityPanel:         $("charityPanel"),
  charityName:          $("charityName"),
  charityDesc:          $("charityDesc"),
  registerCharityBtn:   $("registerCharityBtn"),
  reqTitle:             $("reqTitle"),
  reqDesc:              $("reqDesc"),
  reqTarget:            $("reqTarget"),
  createRequestBtn:     $("createRequestBtn"),
  refreshMyRequestsBtn: $("refreshMyRequestsBtn"),
  myRequestsList:       $("myRequestsList"),
  donorPanel:           $("donorPanel"),
  browseRequestsBtn:    $("browseRequestsBtn"),
  browseList:           $("browseList"),
  myDonationsBtn:       $("myDonationsBtn"),
  myDonationsList:      $("myDonationsList"),
  donationFeed:         $("donationFeed"),
  noRolePanel:          $("noRolePanel"),
};

let provider, signer, contract;
let currentAccount = null;
let currentRole    = 0;
let eventListenersAttached = false;

function setStatus(msg, isError = false) {
  el.statusBar.textContent = msg;
  el.statusBar.className = "status-bar" + (isError ? " error" : "");
}

function ts(unix) {
  const n = Number(unix);
  return n ? new Date(n * 1000).toLocaleString() : "—";
}

function shortAddr(addr) {
  if (!addr || /^0x0{40}$/i.test(addr)) return "—";
  return addr.slice(0, 6) + "…" + addr.slice(-4);
}

function ethVal(wei) {
  return parseFloat(ethers.formatEther(BigInt(wei.toString()))).toFixed(4) + " ETH";
}

function pct(raised, target) {
  const r = Number(raised), t = Number(target);
  return (!t) ? 0 : Math.min(100, Math.round(r * 100 / t));
}

function pillHtml(s) {
  s = Number(s);
  return `<span class="pill ${STATUS_PILLS[s]}">${STATUS_NAMES[s] || "?"}</span>`;
}

function progressHtml(raised, target) {
  const p = pct(raised, target);
  const fill = p >= 100 ? "#16a34a" : "#2563eb";
  return `
    <div class="progress-wrap">
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width:${p}%;background:${fill}"></div>
      </div>
      <div class="progress-text">
        <strong>${ethVal(raised)}</strong> raised of <strong>${ethVal(target)}</strong>
        <span class="pct-badge">${p}%</span>
      </div>
    </div>`;
}

function emptyMsg(text) {
  const p = document.createElement("p");
  p.className = "note"; p.textContent = text;
  return p;
}

function hideAllPanels() {
  ["adminPanel","charityPanel","donorPanel","noRolePanel"]
    .forEach(id => $(id).style.display = "none");
}

function showRolePanel() {
  hideAllPanels();
  if      (currentRole === 1) el.adminPanel.style.display   = "block";
  else if (currentRole === 2) el.charityPanel.style.display = "block";
  else if (currentRole === 3) el.donorPanel.style.display   = "block";
  else                        el.noRolePanel.style.display  = "block";
  el.walletRole.textContent = ROLE_NAMES[currentRole] || "None";
}

function ensureReady() {
  if (!contract) { setStatus("Load the contract first.", true); return false; }
  return true;
}

// ─── Live feed ────────────────────────────────────────────────────────────────
function pushFeedItem(icon, html) {
  const item = document.createElement("div");
  item.className = "feed-item feed-new";
  item.innerHTML = `<span class="feed-icon">${icon}</span><div>${html}<div class="feed-time">${new Date().toLocaleTimeString()}</div></div>`;
  el.donationFeed.insertBefore(item, el.donationFeed.firstChild);
  setTimeout(() => item.classList.remove("feed-new"), 600);
  while (el.donationFeed.children.length > 20)
    el.donationFeed.removeChild(el.donationFeed.lastChild);
}

// ─── Contract events ─────────────────────────────────────────────────────────
function attachContractEvents() {
  if (eventListenersAttached) return;
  eventListenersAttached = true;

  contract.on("DonationMade", async (requestId, donor, amount) => {
    pushFeedItem("💚",
      `<strong>${shortAddr(donor)}</strong> donated <strong>${ethVal(amount)}</strong>
       to Request <strong>#${requestId}</strong>`);
    await updateStats();
    if (currentRole === 3) { await browseRequests(true); await loadMyDonations(true); }
    if (currentRole === 2) await refreshMyRequests(true);
  });

  contract.on("RequestFulfilled", async (requestId) => {
    pushFeedItem("🎉", `Request <strong>#${requestId}</strong> has been <strong>fully funded!</strong>`);
    await updateStats();
    if (currentRole === 3) await browseRequests(true);
    if (currentRole === 2) await refreshMyRequests(true);
  });

  contract.on("RequestApproved", async () => {
    if (currentRole === 3) await browseRequests(true);
    if (currentRole === 1) await loadPendingRequests(true);
  });
}

// ─── Stats ────────────────────────────────────────────────────────────────────
async function updateStats() {
  try {
    const [total, reqs] = await Promise.all([
      contract.totalDonationsGlobal(),
      contract.totalRequests(),
    ]);
    el.statTotalDonations.textContent = ethVal(total.toString());
    el.statTotalRequests.textContent  = reqs.toString();
    el.statPanel.style.display        = "flex";
  } catch (_) {}
}

// ─── Wallet & Contract ────────────────────────────────────────────────────────
async function connectWallet() {
  if (!window.ethereum) { setStatus("MetaMask not detected.", true); return; }
  try {
    provider       = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer         = await provider.getSigner();
    currentAccount = await signer.getAddress();
    el.walletAddress.textContent = currentAccount;
    setStatus("Wallet connected. Enter contract address and click Load Contract.");
    if (contract) { contract = contract.connect(signer); await fetchRole(); }
  } catch (e) { setStatus("Connection failed: " + (e.message || e), true); }
}

async function loadContract() {
  if (!signer) { setStatus("Connect wallet first.", true); return; }
  const addr = el.contractAddress.value.trim();
  if (!addr) { setStatus("Enter contract address.", true); return; }
  try {
    contract = new ethers.Contract(addr, CONTRACT_ABI, signer);
    await contract.superAdmin();
    eventListenersAttached = false;
    attachContractEvents();
    await fetchRole();
    await updateStats();
    setStatus("Contract loaded successfully.");
    if (currentRole === 1) await loadAllCharities();
  } catch (e) {
    setStatus("Failed to load: " + (e.shortMessage || e.message), true);
  }
}

async function fetchRole() {
  if (!contract || !currentAccount) return;
  try {
    currentRole = Number(await contract.roles(currentAccount));
    showRolePanel();
  } catch (e) { setStatus("Could not read role: " + (e.shortMessage || e.message), true); }
}

// ─── Admin ────────────────────────────────────────────────────────────────────
async function assignRole() {
  if (!ensureReady()) return;
  try {
    const wallet = el.roleWallet.value.trim();
    const role   = Number(el.roleSelect.value);
    if (!ethers.isAddress(wallet)) { setStatus("Invalid wallet address.", true); return; }
    const tx = await contract.assignRole(wallet, role);
    setStatus("Assigning role… tx: " + tx.hash);
    await tx.wait();
    setStatus(`"${ROLE_NAMES[role]}" role assigned to ${shortAddr(wallet)}.`);
    el.roleWallet.value = "";
  } catch (e) { setStatus("Error: " + (e.shortMessage || e.message), true); }
}

async function verifyCharity() {
  if (!ensureReady()) return;
  try {
    const wallet = el.verifyCharityWallet.value.trim();
    if (!ethers.isAddress(wallet)) { setStatus("Invalid wallet address.", true); return; }
    const role = Number(await contract.roles(wallet));
    if (role !== 2) {
      setStatus(`⚠ That wallet has role "${ROLE_NAMES[role] || "None"}". Assign the Charity role first.`, true);
      return;
    }
    const profile = await contract.getCharityProfile(wallet);
    if (!profile.name || profile.name.trim() === "") {
      setStatus("⚠ This charity has not registered yet. Ask them to fill in their name in the Charity Panel first.", true);
      return;
    }
    const tx = await contract.verifyCharity(wallet);
    setStatus("Verifying… tx: " + tx.hash);
    await tx.wait();
    setStatus(`✅ Charity "${profile.name}" verified!`);
    el.verifyCharityWallet.value = "";
    await loadAllCharities();
  } catch (e) { setStatus("Error: " + (e.shortMessage || e.message), true); }
}

async function loadPendingRequests(silent = false) {
  if (!ensureReady()) return;
  try {
    const all     = await contract.getAllRequests();
    const pending = all.filter(r => Number(r.status) === 0);
    el.pendingList.innerHTML = "";
    if (!pending.length) { el.pendingList.appendChild(emptyMsg("No pending requests.")); return; }
    for (const r of pending) el.pendingList.appendChild(buildCard(r, { adminActions: true }));
    if (!silent) setStatus(pending.length + " pending request(s) loaded.");
  } catch (e) { setStatus("Error: " + (e.shortMessage || e.message), true); }
}

async function approveRequest(id) {
  if (!ensureReady()) return;
  try {
    const tx = await contract.approveRequest(id);
    setStatus("Approving… tx: " + tx.hash);
    await tx.wait();
    setStatus("Request #" + id + " approved.");
    await loadPendingRequests();
  } catch (e) { setStatus("Error: " + (e.shortMessage || e.message), true); }
}

async function rejectRequest(id) {
  if (!ensureReady()) return;
  try {
    const tx = await contract.rejectRequest(id);
    setStatus("Rejecting… tx: " + tx.hash);
    await tx.wait();
    setStatus("Request #" + id + " rejected.");
    await loadPendingRequests();
  } catch (e) { setStatus("Error: " + (e.shortMessage || e.message), true); }
}

async function loadAllCharities() {
  if (!ensureReady()) return;
  try {
    const list = await contract.getAllCharities();
    el.charitiesList.innerHTML = "";
    if (!list.length) {
      el.charitiesList.appendChild(emptyMsg("No charities registered yet. The charity wallet must open the Charity Panel and click Register first."));
      return;
    }
    for (const c of list) {
      const div = document.createElement("div");
      div.className = "charity-card";
      div.innerHTML = `
        <div class="charity-top">
          <strong>${c.name || "(unnamed)"}</strong>
          ${c.verified
            ? '<span class="badge-verified">✓ Verified</span>'
            : '<span class="badge-unverified">⚠ Pending verification</span>'}
        </div>
        <p>${c.description || "—"}</p>
        <p class="meta">Wallet: <code>${c.wallet}</code></p>
        <p class="meta">Total received: <strong>${ethVal(c.totalReceived)}</strong></p>
        ${!c.verified ? `<p class="meta" style="color:#b45309">→ Copy this wallet into the Verify Charity field above.</p>` : ""}`;
      el.charitiesList.appendChild(div);
    }
  } catch (e) { setStatus("Error: " + (e.shortMessage || e.message), true); }
}

// ─── Charity ──────────────────────────────────────────────────────────────────
async function registerCharity() {
  if (!ensureReady()) return;
  try {
    const name = el.charityName.value.trim();
    const desc = el.charityDesc.value.trim();
    if (!name) { setStatus("Charity name is required.", true); return; }
    const tx = await contract.registerCharity(name, desc);
    setStatus("Registering… tx: " + tx.hash);
    await tx.wait();
    setStatus("Registered! Share your wallet address with the admin so they can verify you.");
    el.charityName.value = ""; el.charityDesc.value = "";
  } catch (e) { setStatus("Error: " + (e.shortMessage || e.message), true); }
}

async function createRequest() {
  if (!ensureReady()) return;
  try {
    const profile = await contract.getCharityProfile(currentAccount);
    if (!profile.name || profile.name.trim() === "") {
      setStatus("⚠ Register your charity first (Step 1).", true); return;
    }
    if (!profile.verified) {
      setStatus(`⚠ Your charity "${profile.name}" is not verified yet. Ask the admin to verify your wallet.`, true); return;
    }
    const title  = el.reqTitle.value.trim();
    const desc   = el.reqDesc.value.trim();
    const ethAmt = parseFloat(el.reqTarget.value);
    if (!title)                 { setStatus("Title is required.", true); return; }
    if (!ethAmt || ethAmt <= 0) { setStatus("Enter a valid target ETH amount.", true); return; }
    const tx = await contract.createRequest(title, desc, ethers.parseEther(ethAmt.toString()));
    setStatus("Creating request… tx: " + tx.hash);
    await tx.wait();
    setStatus("✅ Request created! Waiting for admin approval.");
    el.reqTitle.value = ""; el.reqDesc.value = ""; el.reqTarget.value = "";
    await refreshMyRequests();
  } catch (e) { setStatus("Error: " + (e.shortMessage || e.message), true); }
}

async function refreshMyRequests(silent = false) {
  if (!ensureReady()) return;
  try {
    const list = await contract.getMyCharityRequests();
    el.myRequestsList.innerHTML = "";
    if (!list.length) { el.myRequestsList.appendChild(emptyMsg("No requests yet.")); return; }
    for (const r of list) el.myRequestsList.appendChild(buildCard(r, { showDonations: true }));
    if (!silent) setStatus("Requests refreshed.");
  } catch (e) { setStatus("Error: " + (e.shortMessage || e.message), true); }
}

// ─── Donor ────────────────────────────────────────────────────────────────────
async function browseRequests(silent = false) {
  if (!ensureReady()) return;
  try {
    const all = await contract.getAllRequests();
    el.browseList.innerHTML = "";
    const visible = all.filter(r => Number(r.status) === 1 || Number(r.status) === 3);
    if (!visible.length) { el.browseList.appendChild(emptyMsg("No approved requests yet.")); return; }
    for (const r of visible)
      el.browseList.appendChild(buildCard(r, { donateForm: Number(r.status) === 1, showDonations: true }));
    if (!silent) setStatus(visible.length + " request(s) loaded.");
  } catch (e) { setStatus("Error: " + (e.shortMessage || e.message), true); }
}

async function sendDonation(id, ethAmt, message, btn) {
  if (!ensureReady()) return;
  try {
    if (!ethAmt || ethAmt <= 0) { setStatus("Enter a valid ETH amount.", true); return; }
    btn.disabled = true; btn.textContent = "Sending…";
    const tx = await contract.donate(id, message, { value: ethers.parseEther(ethAmt.toString()) });
    setStatus("Sending donation… tx: " + tx.hash);
    await tx.wait();
    setStatus("✅ Donation sent! Loading your history…");
    await Promise.all([browseRequests(true), loadMyDonations(true), updateStats()]);
  } catch (e) {
    setStatus("Error: " + (e.shortMessage || e.message), true);
  } finally {
    btn.disabled = false; btn.textContent = "💚 Donate";
  }
}

async function loadMyDonations(silent = false) {
  if (!ensureReady()) return;
  try {
    // getMyDonations returns IDs of requests this donor contributed to
    const ids = await contract.getMyDonations();
    el.myDonationsList.innerHTML = "";
    if (!ids.length) {
      el.myDonationsList.appendChild(emptyMsg("You haven't donated yet."));
      return;
    }

    // Fetch all requests in one call and build a map — no getRequest() needed
    const allRequests = await contract.getAllRequests();
    const reqMap = {};
    for (const r of allRequests) reqMap[r.id.toString()] = r;

    for (const id of ids) {
      const req = reqMap[id.toString()];
      if (!req) continue;

      const donations = await contract.getRequestDonations(id);
      const mine    = donations.filter(d => d.donor.toLowerCase() === currentAccount.toLowerCase());
      const myTotal = mine.reduce((a, d) => a + BigInt(d.amount.toString()), 0n);

      const card = document.createElement("div");
      card.className = "req-card";
      card.innerHTML = `
        <div class="req-card-top">
          <strong>#${req.id} — ${req.title}</strong>
          ${pillHtml(req.status)}
        </div>
        <p class="meta">Charity: <code>${shortAddr(req.charity)}</code></p>
        ${progressHtml(req.raisedAmount, req.targetAmount)}
        <div class="my-donations-section">
          <strong>Your ${mine.length} contribution(s):</strong>
          ${mine.map(d => `
            <div class="donation-row">
              <span class="donor-amount">${ethVal(d.amount)}</span>
              <span class="meta">${ts(d.donatedAt)}</span>
              ${d.message ? `<span class="donation-msg">"${d.message}"</span>` : ""}
            </div>`).join("")}
          <div class="my-total">Your total: <strong>${ethVal(myTotal)}</strong></div>
        </div>`;
      el.myDonationsList.appendChild(card);
    }
    if (!silent) setStatus("Donation history loaded.");
  } catch (e) { setStatus("Error: " + (e.shortMessage || e.message), true); }
}

// ─── Card builder ─────────────────────────────────────────────────────────────
function buildCard(r, opts = {}) {
  const card = document.createElement("div");
  card.className = "req-card";
  card.innerHTML = `
    <div class="req-card-top">
      <strong>#${r.id} — ${r.title}</strong>
      ${pillHtml(r.status)}
    </div>
    <p class="req-desc">${r.description || ""}</p>
    <p class="meta">Charity: <code>${shortAddr(r.charity)}</code> &nbsp;|&nbsp; Created: ${ts(r.createdAt)}</p>
    ${Number(r.fulfilledAt) ? `<p class="meta">Fulfilled: ${ts(r.fulfilledAt)}</p>` : ""}
    ${progressHtml(r.raisedAmount, r.targetAmount)}`;

  if (opts.adminActions) {
    const div = document.createElement("div");
    div.className = "req-actions";
    div.innerHTML = `
      <button class="btn btn-success" data-id="${r.id}" data-action="approve">✓ Approve</button>
      <button class="btn btn-danger"  data-id="${r.id}" data-action="reject">✗ Reject</button>`;
    div.addEventListener("click", e => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      btn.dataset.action === "approve"
        ? approveRequest(Number(btn.dataset.id))
        : rejectRequest(Number(btn.dataset.id));
    });
    card.appendChild(div);
  }

  if (opts.donateForm) {
    const div = document.createElement("div");
    div.className = "req-actions donate-form";
    div.innerHTML = `
      <input type="number" class="donate-amount" placeholder="ETH amount" step="0.001" min="0.001" />
      <input type="text"   class="donate-msg"    placeholder="Message (optional)" />
      <button class="btn btn-primary" data-id="${r.id}" data-action="donate">💚 Donate</button>`;
    div.addEventListener("click", e => {
      const btn = e.target.closest("[data-action='donate']");
      if (!btn) return;
      const amt = parseFloat(div.querySelector(".donate-amount").value);
      const msg = div.querySelector(".donate-msg").value.trim();
      sendDonation(Number(btn.dataset.id), amt, msg, btn);
    });
    card.appendChild(div);
  }

  if (opts.showDonations) {
    const sec = document.createElement("div");
    sec.className = "donations-toggle";
    sec.innerHTML = `
      <button class="btn btn-outline btn-sm" data-id="${r.id}" data-open="0">Show donations ▾</button>
      <div class="donations-list" style="display:none"></div>`;
    sec.querySelector("button").addEventListener("click", async function() {
      const list = sec.querySelector(".donations-list");
      if (this.dataset.open === "0") {
        this.dataset.open = "1";
        this.textContent  = "Hide donations ▴";
        list.style.display = "block";
        await populateDonationList(Number(this.dataset.id), list);
      } else {
        this.dataset.open = "0";
        this.textContent  = "Show donations ▾";
        list.style.display = "none";
      }
    });
    card.appendChild(sec);
  }

  return card;
}

async function populateDonationList(requestId, container) {
  try {
    container.innerHTML = "<p class='note'>Loading…</p>";
    const donations = await contract.getRequestDonations(requestId);
    if (!donations.length) { container.innerHTML = "<p class='note'>No donations yet.</p>"; return; }
    container.innerHTML = "";
    for (const d of [...donations].reverse()) {
      const row = document.createElement("div");
      row.className = "donation-row";
      row.innerHTML = `
        <span class="donor-addr">${shortAddr(d.donor)}</span>
        <span class="donor-amount">${ethVal(d.amount)}</span>
        <span class="meta">${ts(d.donatedAt)}</span>
        ${d.message ? `<span class="donation-msg">"${d.message}"</span>` : ""}`;
      container.appendChild(row);
    }
  } catch (_) { container.innerHTML = "<p class='note'>Could not load donations.</p>"; }
}

// ─── Buttons ──────────────────────────────────────────────────────────────────
el.connectWalletBtn.addEventListener("click", connectWallet);
el.loadContractBtn.addEventListener("click", loadContract);
el.saveContractBtn.addEventListener("click", () => {
  localStorage.setItem("charity_contract", el.contractAddress.value.trim());
  setStatus("Contract address saved.");
});
el.assignRoleBtn.addEventListener("click", assignRole);
el.verifyCharityBtn.addEventListener("click", verifyCharity);
el.loadPendingBtn.addEventListener("click", () => loadPendingRequests(false));
el.loadCharitiesBtn.addEventListener("click", loadAllCharities);
el.registerCharityBtn.addEventListener("click", registerCharity);
el.createRequestBtn.addEventListener("click", createRequest);
el.refreshMyRequestsBtn.addEventListener("click", () => refreshMyRequests(false));
el.browseRequestsBtn.addEventListener("click", () => browseRequests(false));
el.myDonationsBtn.addEventListener("click", () => loadMyDonations(false));

if (window.ethereum) {
  window.ethereum.on("accountsChanged", async () => {
    if (!provider) return;
    signer         = await provider.getSigner();
    currentAccount = await signer.getAddress();
    el.walletAddress.textContent = currentAccount;
    if (contract) { contract = contract.connect(signer); await fetchRole(); }
  });
  window.ethereum.on("chainChanged", () => {
    setStatus("Network changed — reload the contract.", true);
    eventListenersAttached = false;
  });
}

window.addEventListener("load", () => {
  hideAllPanels();
  el.statPanel.style.display = "none";
  const saved = localStorage.getItem("charity_contract");
  if (saved) el.contractAddress.value = saved;
  setStatus("Connect your wallet, paste the contract address, and click Load Contract.");
});