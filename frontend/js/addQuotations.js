// ─── CONFIG ───────────────────────────────────────────────────────────────────
const API_BASE = "http://127.0.0.1:8000/api/auth";

function authHeaders() {
    return {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}

// ─── STATE ────────────────────────────────────────────────────────────────────
let vendors = [];

const COLORS = [
    { color: '#4361ee', bg: 'rgba(67,97,238,0.12)'  },
    { color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
    { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
    { color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)' },
    { color: '#ef4444', bg: 'rgba(239,68,68,0.12)'  },
];

// ─── INIT ─────────────────────────────────────────────────────────────────────
if (localStorage.getItem("token")) {
    fetchVendors();
}

// ─── FETCH VENDORS ────────────────────────────────────────────────────────────
async function fetchVendors() {
    try {
        const { data } = await axios.get(`${API_BASE}/vendors`, {
            headers: authHeaders()
        });

        if (data?.data) {
            vendors = data.data.map((v, i) => ({
                id:       v.id,
                name:     v.vendor_name,
                initials: getInitials(v.vendor_name),
                color:    COLORS[i % COLORS.length].color,
                bg:       COLORS[i % COLORS.length].bg,
                status:   v.status == 1 ? 'active' : 'inactive',
                selected: false
            }));

            renderVendors(vendors);
        }

    } catch (err) {
        console.error("Vendors fetch failed:", err);
        showToast('error', 'Error', 'Could not load vendors.');
    }
}

// ─── RENDER ───────────────────────────────────────────────────────────────────
function renderVendors(list) {
    const container = document.getElementById('vendorList');
    container.innerHTML = '';

    if (!list.length) {
        container.innerHTML = `
            <div class="no-vendors">
                <i class="fas fa-store-slash"></i>
                No vendors found.
            </div>`;
        updateBadge();
        return;
    }

    list.forEach(v => {
        const div = document.createElement('div');
        div.className = 'vendor-row' + (v.selected ? ' is-selected' : '');
        div.dataset.id = v.id;
        div.onclick = () => toggleVendor(v.id);

        div.innerHTML = `
            <div class="vcheck"><i class="fas fa-check"></i></div>
            <div class="vavatar" style="background:${v.bg}; color:${v.color};">${v.initials}</div>
            <span class="vname">${v.name}</span>
            <span class="vbadge ${v.status}">${capitalize(v.status)}</span>
        `;

        container.appendChild(div);
    });

    updateBadge();
}

// ─── TOGGLE SELECT ────────────────────────────────────────────────────────────
function toggleVendor(id) {
    const vendor = vendors.find(v => v.id === id);
    if (!vendor) return;

    vendor.selected = !vendor.selected;

    const query = document.getElementById('vendorSearch').value;
    filterVendors(query);

    document.getElementById('err-vendors').style.display = 'none';
}

// ─── SEARCH FILTER ────────────────────────────────────────────────────────────
function filterVendors(query) {
    const filtered = vendors.filter(v =>
        v.name.toLowerCase().includes(query.toLowerCase())
    );
    renderVendors(filtered);
}

// ─── SELECTED BADGE ───────────────────────────────────────────────────────────
function updateBadge() {
    const count = vendors.filter(v => v.selected).length;
    const badge = document.getElementById('selBadge');
    const num   = document.getElementById('selCount');

    if (count > 0) {
        badge.style.display = 'inline-flex';
        num.textContent = count;
    } else {
        badge.style.display = 'none';
    }
}

// ─── CREATE QUOTATION ─────────────────────────────────────────────────────────
async function handleCreate() {
    const titleEl  = document.getElementById('qTitle');
    const descEl   = document.getElementById('qDesc');
    const dateEl   = document.getElementById('qDate');
    const selected = vendors.filter(v => v.selected);

    // validation
    let valid = true;

    if (!titleEl.value.trim()) {
        showFieldErr(titleEl, 'err-title');
        valid = false;
    }

    if (!descEl.value.trim()) {
        showFieldErr(descEl, 'err-desc');
        valid = false;
    }

    if (!selected.length) {
        document.getElementById('err-vendors').style.display = 'flex';
        valid = false;
    }

    if (!valid) return;

    // payload jo backend jayega
    const payload = {
        title:       titleEl.value.trim(),
        description: descEl.value.trim(),
        date:        dateEl.value,
        vendor_ids:  selected.map(v => v.id)   // [1, 3, 5]
    };

    try {
        await axios.post(`${API_BASE}/quotations`, payload, {
            headers: authHeaders()
        });

        showToast('success', 'Quotation Created!',
            `"${payload.title}" sent to ${selected.map(v => v.name).join(', ')}.`
        );

        resetForm();

    } catch (err) {
        console.error("Create quotation failed:", err);
        showToast('error', 'Failed', 'Could not create quotation. Try again.');
    }
}

// ─── CANCEL ───────────────────────────────────────────────────────────────────
function handleCancel() {
    const hasData = document.getElementById('qTitle').value.trim()
                 || document.getElementById('qDesc').value.trim()
                 || vendors.some(v => v.selected);

    if (!hasData) return;

    resetForm();
    showToast('error', 'Cancelled', 'All changes have been discarded.');
}

// ─── RESET FORM ───────────────────────────────────────────────────────────────
function resetForm() {
    document.getElementById('qTitle').value       = '';
    document.getElementById('qDesc').value        = '';
    document.getElementById('qDate').value        = '';
    document.getElementById('vendorSearch').value = '';
    vendors.forEach(v => v.selected = false);
    renderVendors(vendors);
}

// ─── FIELD ERROR ──────────────────────────────────────────────────────────────
function showFieldErr(el, errId) {
    el.classList.add('has-error');
    document.getElementById(errId).style.display = 'flex';
}

function clearError(el) {
    el.classList.remove('has-error');
    const errMap = { qTitle: 'err-title', qDesc: 'err-desc' };
    if (errMap[el.id]) {
        document.getElementById(errMap[el.id]).style.display = 'none';
    }
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function showToast(type, title, message) {
    const wrap  = document.getElementById('toastWrap');
    const toast = document.createElement('div');
    toast.className = `toast-msg ${type}`;

    const icon = type === 'success'
        ? '<i class="fas fa-circle-check"></i>'
        : '<i class="fas fa-circle-xmark"></i>';

    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-body">
            <div class="toast-head">${title}</div>
            <div class="toast-sub">${message}</div>
        </div>
        <button class="toast-close" onclick="this.closest('.toast-msg').remove()">
            <i class="fas fa-xmark"></i>
        </button>
    `;

    wrap.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}