/* ================================================================
   quotation-details.js
   VQMS — Quotation Details Page Logic (Backend Fetch Version)
   ================================================================ */

/* ================================================================
   API FETCH FUNCTION
   ================================================================ */
async function fetchQuotationData(id) {
    try {
        const backendUrl = `http://127.0.0.1:8000/api/auth/quotations/${id}/details`;

        const response = await fetch(backendUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}` 
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error("Backend se data fetch karne mein masla:", error);
        return null;
    }
}

/* ================================================================
   UTILITY FUNCTIONS
   ================================================================ */

/**
 * Format a number with comma separators.
 * e.g. 920000 → "920,000"
 */
function formatAmount(num) {
    if (!num) return "0";
    return Number(num).toLocaleString("en-PK");
}

/**
 * Return first letter uppercase, rest lowercase.
 */
function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Find the vendor with the lowest amount from a list.
 */
function findLowestVendor(vendors) {
    if (!vendors || vendors.length === 0) return null;
    return vendors.reduce(
        (lowest, vendor) => Number(vendor.amount) < Number(lowest.amount) ? vendor : lowest,
        vendors[0]
    );
}

/**
 * Return the status badge icon class based on status string.
 */
function getStatusIcon(status) {
    if (!status) return "ri-time-line";
    const icons = {
        submitted: "ri-check-line",
        pending:   "ri-time-line",
        approved:  "ri-checkbox-circle-line",
        rejected:  "ri-close-circle-line"
    };
    return icons[status.toLowerCase()] || "ri-time-line";
}

/**
 * Return the status badge class name.
 */
function getStatusClass(status) {
    if (!status) return "pending";
    const classes = {
        submitted: "submitted",
        pending:   "pending",
        approved:  "approved",
        rejected:  "rejected"
    };
    return classes[status.toLowerCase()] || "pending";
}

/* ================================================================
   POPULATE QUOTATION INFORMATION (Left Card)
   ================================================================ */

function populateQuotationInfo(quotation) {
    // Agar data 'data' key ke andar wrap hai toh use nikalien, nahi toh direct wrapper use karein
    const item = quotation.data ? quotation.data : quotation;

    // Title aur Description
    document.getElementById("qdTitle").textContent = item.title || "No Title Available";
    document.getElementById("qdDescription").textContent = item.description || "No Description Provided";

    // Dates (Smart fallback agar backend se snake_case aa raha ho)
    document.getElementById("qdCreatedOn").textContent  = item.createdOn || item.created_at || "N/A";
    document.getElementById("qdRequiredBy").textContent = item.requiredBy || item.required_by || "N/A";

    // Vendor count
    const vendorsList = item.vendors || [];
    const vendorCount = vendorsList.length;
    const vendorLabel = `${vendorCount} Vendor${vendorCount !== 1 ? "s" : ""}`;
    document.getElementById("qdVendorCount").innerHTML =
        `<i class="ri-team-fill"></i><span>${vendorLabel}</span>`;

    // Page status badge (top-right)
    const badge = document.getElementById("qdStatusBadge");
    const text  = document.getElementById("qdStatusText");
    const currentStatus = item.status || "active";

    if (badge && text) {
        badge.className = `qd-status-badge ${currentStatus.toLowerCase()}`;
        text.textContent = capitalize(currentStatus);

        // Icon for status
        const iconEl = badge.querySelector("i");
        if (iconEl) {
            const statusIcons = {
                active:    "ri-checkbox-circle-fill",
                pending:   "ri-time-fill",
                completed: "ri-check-double-fill",
                inactive:  "ri-close-circle-fill"
            };
            iconEl.className = statusIcons[currentStatus.toLowerCase()] || "ri-checkbox-circle-fill";
        }
    }
}

/* ================================================================
   POPULATE VENDOR RESPONSES TABLE (Right Card)
   ================================================================ */

function populateVendorTable(quotation) {
    const tbody      = document.getElementById("vendorResponsesBody");
    const lowestText = document.getElementById("lowestVendorText");
    
    // Data extraction
    const item       = quotation.data ? quotation.data : quotation;
    const vendorsList = item.vendors || [];
    const lowest     = findLowestVendor(vendorsList);

    let rows = "";

    if (vendorsList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No vendor responses yet.</td></tr>`;
        if (lowestText) lowestText.textContent = "N/A";
        return;
    }

    vendorsList.forEach((vendor) => {
        const isLowest    = lowest && vendor.name === lowest.name && Number(vendor.amount) === Number(lowest.amount);
        const rowClass    = isLowest ? ' class="lowest-row"' : "";
        const amountClass = isLowest ? "amount-cell amount-lowest" : "amount-cell";
        
        const vendorStatus = vendor.status || "submitted";
        const statusCls   = getStatusClass(vendorStatus);
        const statusIcon  = getStatusIcon(vendorStatus);
        
        // Agar initials backend se nahi aa rahe toh name ke pehle 2 letters nikal lein
        const initials    = vendor.initials || (vendor.name ? vendor.name.substring(0, 2).toUpperCase() : "VN");
        const submissionDate = vendor.submissionDate || vendor.submission_date || "N/A";

        rows += `
            <tr${rowClass}>
                <td>
                    <div class="vendor-name-cell">
                        <div class="vendor-chip ${vendor.chip || 'chip-blue'}">${initials}</div>
                        ${vendor.vendor_name || 'Unknown Vendor'}
                    </div>
                </td>
                <td class="${amountClass}">${formatAmount(vendor.vendor_amount)}</td>
                <td>${submissionDate}</td>
                <td>
                    <span class="badge-row-status ${statusCls}">
                        <i class="${statusIcon}"></i>
                        ${capitalize(vendorStatus)}
                    </span>
                </td>
                <td>
                    <button
                        class="qd-action-btn btn-view"
                        title="View vendor details"
                        onclick="viewVendorDetails('${vendor.name || ''}')"
                    >
                        <i class="ri-eye-fill"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = rows;

    // Update lowest banner text
    if (lowest && lowestText) {
        lowestText.textContent = `${lowest.name} (PKR ${formatAmount(lowest.amount)})`;
    }
}

/* ================================================================
   ACTION: View Vendor Details
   ================================================================ */

function viewVendorDetails(vendorName) {
    console.log("View vendor:", vendorName);
}

/* ================================================================
   INIT — Entry point (Async setup for API)
   ================================================================ */

async function init() {
    // Read quotation id from URL: quotation-details.html?id=1
    const params      = new URLSearchParams(window.location.search);
    const quotationId = parseInt(params.get("id"), 10) || 1; // Default ID 1

    // Backend se data fetch karein
    const quotation = await fetchQuotationData(quotationId);
    
    
    if (quotation) {
        populateQuotationInfo(quotation);
        populateVendorTable(quotation);
    } else {
        console.error("Quotation data load nahi ho saka.");
        document.getElementById("qdTitle").textContent = "Data Not Found";
        document.getElementById("qdDescription").textContent = "Backend se data fetch karte waqt error aaya. Console check karein.";
    }
}

document.addEventListener("DOMContentLoaded", init);