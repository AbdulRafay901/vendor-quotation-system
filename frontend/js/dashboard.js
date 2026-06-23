
// Charts Code --------------------- Start 

const options = {
    series: [18, 7, 11],

    labels: [
        "Active",
        "Pending",
        "Approved",
    ],

    chart: {
        type: "donut",
        height: 320,
    },

    plotOptions: {
        pie: {
            donut: {
                size: "72%",
                labels: {
                    show: true,

                    total: {
                        show: true,
                        label: "Total",
                        formatter() {
                            return "36";
                        },
                    },
                },
            },
        },
    },

    dataLabels: {
        enabled: false,
    },

    legend: {
        position: "bottom",
        fontSize: "14px",
    },

    stroke: {
        width: 5,
    },

    responsive: [
        {
            breakpoint: 768,
            options: {
                chart: {
                    height: 280,
                },
                legend: {
                    position: "bottom",
                },
            },
        },
    ],
};

new ApexCharts(
    document.querySelector(
        "#quotationChart"
    ),
    options
).render();