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
                'Accept':        'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);
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
    if (num === null || num === undefined || num === "") return "0";
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
 * Find the vendor with the LOWEST amount from a list.
 *
 * ✅ FIX: Uses vendor.vendor_amount (correct backend field)
 *         Previously was using vendor.amount which was undefined — causing
 *         findLowestVendor to always return the first vendor incorrectly.
 */
function findLowestVendor(vendors) {
    if (!vendors || vendors.length === 0) return null;

    // Only consider vendors that have a valid numeric amount
    const validVendors = vendors.filter(
        (v) => v.vendor_amount !== null &&
               v.vendor_amount !== undefined &&
               v.vendor_amount !== "" &&
               !isNaN(Number(v.vendor_amount))
    );

    if (validVendors.length === 0) return null;

    return validVendors.reduce(
        (lowest, vendor) =>
            Number(vendor.vendor_amount) < Number(lowest.vendor_amount) ? vendor : lowest,
        validVendors[0]
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
 * Return the status badge CSS class name.
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
    const item = quotation.data ? quotation.data : quotation;

    document.getElementById("qdTitle").textContent =
        item.title || "No Title Available";
    document.getElementById("qdDescription").textContent =
        item.description || "No Description Provided";

    document.getElementById("qdCreatedOn").textContent =
        item.createdOn  || item.created_at  || "N/A";
    document.getElementById("qdRequiredBy").textContent =
        item.requiredBy || item.required_by || "N/A";

    const vendorsList = item.vendors || [];
    const vendorCount = vendorsList.length;
    const vendorLabel = `${vendorCount} Vendor${vendorCount !== 1 ? "s" : ""}`;
    document.getElementById("qdVendorCount").innerHTML =
        `<i class="ri-team-fill"></i><span>${vendorLabel}</span>`;

    const badge         = document.getElementById("qdStatusBadge");
    const text          = document.getElementById("qdStatusText");
    const currentStatus = item.status || "active";

    if (badge && text) {
        badge.className  = `qd-status-badge ${currentStatus.toLowerCase()}`;
        text.textContent = capitalize(currentStatus);

        const iconEl = badge.querySelector("i");
        if (iconEl) {
            const statusIcons = {
                active:    "ri-checkbox-circle-fill",
                pending:   "ri-time-fill",
                completed: "ri-check-double-fill",
                inactive:  "ri-close-circle-fill"
            };
            iconEl.className =
                statusIcons[currentStatus.toLowerCase()] || "ri-checkbox-circle-fill";
        }
    }
}

/* ================================================================
   POPULATE VENDOR RESPONSES TABLE (Right Card)
   ================================================================ */

function populateVendorTable(quotation) {
    const tbody        = document.getElementById("vendorResponsesBody");
    const lowestBanner = document.getElementById("lowestVendorBanner"); // full green banner row
    const lowestText   = document.getElementById("lowestVendorText");

    const item        = quotation.data ? quotation.data : quotation;
    const vendorsList = item.vendors || [];

    // ✅ FIX: findLowestVendor now correctly reads vendor.vendor_amount
    const lowest = findLowestVendor(vendorsList);

    /* ── Empty state ── */
    if (vendorsList.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding:24px; color:#6b7280;">
                    No vendor responses yet.
                </td>
            </tr>`;
        if (lowestBanner) lowestBanner.style.display = "none";
        return;
    }

    /* ── Build table rows ── */
    let rows = "";

    vendorsList.forEach((vendor) => {

        /*
         * ✅ FIX: isLowest comparison now uses vendor.vendor_name & vendor.vendor_amount
         *         Previously used vendor.name & vendor.amount (both undefined from backend)
         *         which caused every row to be treated as lowest — or none at all.
         */
        const isLowest =
            lowest !== null &&
            vendor.vendor_name === lowest.vendor_name &&
            Number(vendor.vendor_amount) === Number(lowest.vendor_amount);

        const rowClass    = isLowest ? ' class="lowest-row"' : "";
        const amountClass = isLowest ? "amount-cell amount-lowest" : "amount-cell";

        const vendorStatus   = vendor.status || "submitted";
        const statusCls      = getStatusClass(vendorStatus);
        const statusIcon     = getStatusIcon(vendorStatus);

        // ✅ FIX: initials fallback now reads vendor.vendor_name (was vendor.name)
        const initials = vendor.initials
            || (vendor.vendor_name
                    ? vendor.vendor_name.substring(0, 2).toUpperCase()
                    : "VN");

        const submissionDate = vendor.submissionDate || vendor.submission_date || "N/A";

        // Trophy icon only on the lowest-amount cell
        const trophyIcon = isLowest
            ? `<i class="ri-trophy-fill" style="color:#f59e0b; margin-right:5px; font-size:14px;"></i>`
            : "";

        rows += `
            <tr${rowClass}>
                <td>
                    <div class="vendor-name-cell">
                        <div class="vendor-chip ${vendor.chip || 'chip-blue'}">${initials}</div>
                        ${vendor.vendor_name || "Unknown Vendor"}
                    </div>
                </td>
                <td class="${amountClass}">
                    ${trophyIcon}PKR ${formatAmount(vendor.vendor_amount)}
                </td>
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
                        onclick="viewVendorDetails('${(vendor.vendor_name || "").replace(/'/g, "\\'")}')"
                    >
                        <i class="ri-eye-fill"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = rows;

    /* ── Lowest vendor banner ──
     *
     * ✅ FIX: lowest.vendor_name & lowest.vendor_amount used here
     *         Previously lowest.name & lowest.amount were both undefined,
     *         so the banner showed "undefined (PKR 0)" or was blank.
     */
    if (lowest) {
        if (lowestText) {
            lowestText.textContent =
                `${lowest.vendor_name} (PKR ${formatAmount(lowest.vendor_amount)})`;
        }
        if (lowestBanner) lowestBanner.style.display = "flex";
    } else {
        if (lowestBanner) lowestBanner.style.display = "none";
    }
}

/* ================================================================
   ACTION: View Vendor Details
   ================================================================ */

function viewVendorDetails(vendorName) {
    console.log("View vendor:", vendorName);
    // TODO: Add navigation or modal logic here
}

/* ================================================================
   INIT — Entry point
   ================================================================ */

async function init() {
    // Read quotation id from URL: quotation-details.html?id=5
    const params      = new URLSearchParams(window.location.search);
    const quotationId = parseInt(params.get("id"), 10) || 1;

    const quotation = await fetchQuotationData(quotationId);

    if (quotation) {
        populateQuotationInfo(quotation);
        populateVendorTable(quotation);
    } else {
        console.error("Quotation data not found");

        const titleEl = document.getElementById("qdTitle");
        const descEl  = document.getElementById("qdDescription");

        if (titleEl) titleEl.textContent = "Data Not Found";
        if (descEl)  descEl.textContent  =
            "backend Error.";
    }
}

document.addEventListener("DOMContentLoaded", init);