document
    .querySelector(".addVendorBtn")
    .addEventListener("click", () => {
        window.location.href =
            "addQuotation.html";
    });



// ─── CONFIG ───────────────────────────────────────────────────────────────────
const API_BASE = "http://127.0.0.1:8000/api/auth";

function authHeaders() {
    return {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Accept':        'application/json',
        'Content-Type':  'application/json'
    };
}

// ─── STATE ────────────────────────────────────────────────────────────────────
let allQuotations = [];
let filtered      = [];

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

    if (!localStorage.getItem("token")) {
        window.location.href = "login.html";
        return;
    }

    fetchQuotations();

    // Create Quotation button
    document.querySelector(".addVendorBtn")
            .addEventListener("click", () => {
                window.location.href = "addQuotations.html";
            });

    // Search
    document.querySelector(".search-box input")
            .addEventListener("input", () => applyFilters());

    // Status Filter
    document.querySelector("select")
            .addEventListener("change", () => applyFilters());
});

// ─── FETCH QUOTATIONS ─────────────────────────────────────────────────────────
async function fetchQuotations() {
    showLoading();

    try {
        const { data } = await axios.get(`${API_BASE}/quotations`, {
            headers: authHeaders()
        });

        if (data?.data) {
            allQuotations = data.data;
            filtered      = data.data;
            renderTable(filtered);
        }

    } catch (err) {
        console.error("Fetch quotations failed:", err);
        showError();
    }
}

// ─── RENDER TABLE ─────────────────────────────────────────────────────────────
function renderTable(list) {
    const tbody = document.getElementById("dataShow");
    tbody.innerHTML = '';

    if (!list.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state">
                    <i class="fa-regular fa-folder-open"></i>
                    No quotations found.
                </td>
            </tr>`;
        return;
    }

    list.forEach((q, index) => {

        // Assigned vendors ke naam comma se join karo
        const vendorNames = q.vendors?.length
            ? q.vendors.map(v => v.vendor_name).join(', ')
            : '—';

        // Date format
        const createdOn = new Date(q.created_at).toLocaleDateString('en-PK', {
            day:   '2-digit',
            month: 'short',
            year:  'numeric'
        });

        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${q.title}</td>
                <td>${createdOn}</td>
                <td>${vendorNames}</td>
                <td>
                    <span class="badge ${q.status}">
                        ${capitalize(q.status)}
                    </span>
                </td>
                <td class="actions">
                    <button class="icon-btn" title="View" onclick="quotationDetails(${q.id})">
                        <i class="fa-regular fa-eye"></i>
                    </button>
                    <button class="icon-btn" title="Edit" onclick="editQuotation(${q.id})">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button class="icon-btn delete" title="Delete" onclick="deleteQuotation(${q.id})">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </td>
            </tr>`;
    });
}

// ─── SEARCH + FILTER ──────────────────────────────────────────────────────────
function applyFilters() {
    const searchVal = document.querySelector(".search-box input").value.toLowerCase();
    const statusVal = document.querySelector("select").value;

    filtered = allQuotations.filter(q => {

        const matchSearch = q.title.toLowerCase().includes(searchVal);

        const matchStatus = statusVal === 'All Status'
                         || (statusVal === 'Active'   && q.status === 'open')
                         || (statusVal === 'Inactive' && q.status === 'closed');

        return matchSearch && matchStatus;
    });

    renderTable(filtered);
}

// ─── ACTIONS ──────────────────────────────────────────────────────────────────
function quotationDetails(id) {
    window.location.href = `quotationDetails.html?id=${id}`;
}

function editQuotation(id) {
    window.location.href = `editQuotation.html?id=${id}`;
}

async function deleteQuotation(id) {
    if (!confirm("Are you sure you want to delete this quotation?")) return;

    try {
        await axios.delete(`${API_BASE}/quotations/${id}`, {
            headers: authHeaders()
        });

        allQuotations = allQuotations.filter(q => q.id !== id);
        applyFilters();

    } catch (err) {
        console.error("Delete failed:", err);
        alert("Could not delete quotation. Try again.");
    }
}

// ─── LOADING / ERROR STATES ───────────────────────────────────────────────────
function showLoading() {
    document.getElementById("dataShow").innerHTML = `
        <tr>
            <td colspan="6" class="empty-state">
                <i class="fa-solid fa-spinner fa-spin"></i>
                Loading quotations...
            </td>
        </tr>`;
}

function showError() {
    document.getElementById("dataShow").innerHTML = `
        <tr>
            <td colspan="6" class="empty-state">
                <i class="fa-solid fa-circle-exclamation"></i>
                Failed to load quotations.
            </td>
        </tr>`;
}

// ─── HELPER ───────────────────────────────────────────────────────────────────
function capitalize(str) {
    if (!str) return '—';
    return str.charAt(0).toUpperCase() + str.slice(1);
}


document.addEventListener("click", ((e) => {
    if(e.target.classList.contains("icon-btn")){
        
    }
}))