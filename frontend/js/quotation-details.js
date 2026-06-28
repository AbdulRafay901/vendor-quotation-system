/* ================================================================
   quotation-details.js
   VQMS — Quotation Details Page Logic

   Flow:
   1. Read `id` from URL query param  (?id=1)
   2. Find matching quotation from sampleData (swap with API later)
   3. Populate Quotation Information card
   4. Render Vendor Responses table
   5. Highlight lowest-bid row + update banner
   ================================================================ */


/* ================================================================
   SAMPLE DATA
   Replace with: const quotation = await fetchQuotation(id);
   when backend is ready.
   ================================================================ */

const sampleQuotations = [
    {
        id: 1,
        title: "Purchase of Laptops",
        description: "We need 20 Dell Core i7 laptops with 16GB RAM and 512GB SSD.",
        createdOn: "24 Jun 2024",
        requiredBy: "05 Jul 2024",
        status: "active",
        vendors: [
            {
                name: "ABC Traders",
                initials: "AT",
                chip: "chip-red",
                amount: 950000,
                submissionDate: "25 Jun 2024",
                status: "submitted"
            },
            {
                name: "Tech Solutions",
                initials: "TS",
                chip: "chip-blue",
                amount: 980000,
                submissionDate: "25 Jun 2024",
                status: "submitted"
            },
            {
                name: "Global Systems",
                initials: "GS",
                chip: "chip-green",
                amount: 920000,
                submissionDate: "26 Jun 2024",
                status: "submitted"
            }
        ]
    },
    {
        id: 2,
        title: "Office Furniture",
        description: "Office chairs, desks, and storage cabinets for the new Karachi branch setup.",
        createdOn: "22 Jun 2024",
        requiredBy: "10 Jul 2024",
        status: "pending",
        vendors: [
            {
                name: "Smart Supplies",
                initials: "SS",
                chip: "chip-purple",
                amount: 1250000,
                submissionDate: "23 Jun 2024",
                status: "submitted"
            },
            {
                name: "ABC Traders",
                initials: "AT",
                chip: "chip-red",
                amount: 1100000,
                submissionDate: "24 Jun 2024",
                status: "submitted"
            },
            {
                name: "Future Tech",
                initials: "FT",
                chip: "chip-teal",
                amount: 1300000,
                submissionDate: "24 Jun 2024",
                status: "pending"
            }
        ]
    },
    {
        id: 3,
        title: "Network Equipment",
        description: "Routers, switches, and network cables for office LAN setup.",
        createdOn: "20 Jun 2024",
        requiredBy: "08 Jul 2024",
        status: "active",
        vendors: [
            {
                name: "Global Systems",
                initials: "GS",
                chip: "chip-green",
                amount: 750000,
                submissionDate: "21 Jun 2024",
                status: "submitted"
            },
            {
                name: "Tech Solutions",
                initials: "TS",
                chip: "chip-blue",
                amount: 820000,
                submissionDate: "21 Jun 2024",
                status: "submitted"
            }
        ]
    },
    {
        id: 4,
        title: "Printer & Accessories",
        description: "Heavy-duty printers, ink cartridges, and paper reams for admin department.",
        createdOn: "18 Jun 2024",
        requiredBy: "30 Jun 2024",
        status: "completed",
        vendors: [
            {
                name: "ABC Traders",
                initials: "AT",
                chip: "chip-red",
                amount: 320000,
                submissionDate: "19 Jun 2024",
                status: "approved"
            },
            {
                name: "Smart Supplies",
                initials: "SS",
                chip: "chip-purple",
                amount: 350000,
                submissionDate: "19 Jun 2024",
                status: "submitted"
            },
            {
                name: "Hamza Ali Co.",
                initials: "HA",
                chip: "chip-amber",
                amount: 295000,
                submissionDate: "20 Jun 2024",
                status: "submitted"
            }
        ]
    },
    {
        id: 5,
        title: "Server Hardware",
        description: "Rack-mount servers with 64GB RAM and 10TB storage for data center expansion.",
        createdOn: "15 Jun 2024",
        requiredBy: "25 Jun 2024",
        status: "active",
        vendors: [
            {
                name: "Tech Solutions",
                initials: "TS",
                chip: "chip-blue",
                amount: 4500000,
                submissionDate: "16 Jun 2024",
                status: "submitted"
            },
            {
                name: "Global Systems",
                initials: "GS",
                chip: "chip-green",
                amount: 4200000,
                submissionDate: "17 Jun 2024",
                status: "submitted"
            }
        ]
    }
];


/* ================================================================
   UTILITY FUNCTIONS
   ================================================================ */

/**
 * Format a number with comma separators.
 * e.g. 920000 → "920,000"
 */
function formatAmount(num) {
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
    return vendors.reduce(
        (lowest, vendor) => vendor.amount < lowest.amount ? vendor : lowest,
        vendors[0]
    );
}

/**
 * Return the status badge icon class based on status string.
 */
function getStatusIcon(status) {
    const icons = {
        submitted: "ri-check-line",
        pending:   "ri-time-line",
        approved:  "ri-checkbox-circle-line",
        rejected:  "ri-close-circle-line"
    };
    return icons[status] || "ri-time-line";
}

/**
 * Return the status badge class name.
 */
function getStatusClass(status) {
    const classes = {
        submitted: "submitted",
        pending:   "pending",
        approved:  "approved",
        rejected:  "rejected"
    };
    return classes[status] || "pending";
}


/* ================================================================
   POPULATE QUOTATION INFORMATION (Left Card)
   ================================================================ */

function populateQuotationInfo(quotation) {

    // Title
    document.getElementById("qdTitle").textContent = quotation.title;

    // Description
    document.getElementById("qdDescription").textContent = quotation.description;

    // Dates
    document.getElementById("qdCreatedOn").textContent  = quotation.createdOn;
    document.getElementById("qdRequiredBy").textContent = quotation.requiredBy;

    // Vendor count
    const vendorCount = quotation.vendors.length;
    const vendorLabel = `${vendorCount} Vendor${vendorCount !== 1 ? "s" : ""}`;
    document.getElementById("qdVendorCount").innerHTML =
        `<i class="ri-team-fill"></i><span>${vendorLabel}</span>`;

    // Page status badge (top-right)
    const badge = document.getElementById("qdStatusBadge");
    const text  = document.getElementById("qdStatusText");

    badge.className = `qd-status-badge ${quotation.status}`;
    text.textContent = capitalize(quotation.status);

    // Icon for status
    const iconEl = badge.querySelector("i");
    const statusIcons = {
        active:    "ri-checkbox-circle-fill",
        pending:   "ri-time-fill",
        completed: "ri-check-double-fill",
        inactive:  "ri-close-circle-fill"
    };
    iconEl.className = statusIcons[quotation.status] || "ri-checkbox-circle-fill";
}


/* ================================================================
   POPULATE VENDOR RESPONSES TABLE (Right Card)
   ================================================================ */

function populateVendorTable(quotation) {

    const tbody      = document.getElementById("vendorResponsesBody");
    const lowestText = document.getElementById("lowestVendorText");
    const lowest     = findLowestVendor(quotation.vendors);

    let rows = "";

    quotation.vendors.forEach((vendor) => {

        const isLowest    = vendor.name === lowest.name && vendor.amount === lowest.amount;
        const rowClass    = isLowest ? ' class="lowest-row"' : "";
        const amountClass = isLowest ? "amount-cell amount-lowest" : "amount-cell";
        const statusCls   = getStatusClass(vendor.status);
        const statusIcon  = getStatusIcon(vendor.status);

        rows += `
            <tr${rowClass}>
                <td>
                    <div class="vendor-name-cell">
                        <div class="vendor-chip ${vendor.chip}">${vendor.initials}</div>
                        ${vendor.name}
                    </div>
                </td>
                <td class="${amountClass}">${formatAmount(vendor.amount)}</td>
                <td>${vendor.submissionDate}</td>
                <td>
                    <span class="badge-row-status ${statusCls}">
                        <i class="${statusIcon}"></i>
                        ${capitalize(vendor.status)}
                    </span>
                </td>
                <td>
                    <button
                        class="qd-action-btn btn-view"
                        title="View vendor details"
                        onclick="viewVendorDetails('${vendor.name}')"
                    >
                        <i class="ri-eye-fill"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = rows;

    // Update lowest banner text
    lowestText.textContent = `${lowest.name} (PKR ${formatAmount(lowest.amount)})`;
}


/* ================================================================
   ACTION: View Vendor Details
   Navigate to vendor-details page or open a modal.
   ================================================================ */

function viewVendorDetails(vendorName) {
    // TODO: link to vendor-details.html?name=<vendorName>
    // or open a modal — implement when vendor-details page is ready.
    console.log("View vendor:", vendorName);
}


/* ================================================================
   INIT — Entry point
   ================================================================ */

