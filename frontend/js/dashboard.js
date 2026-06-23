// <! FULLY INTERACTIVE JAVASCRIPT FOR RESPONSIVE TOGGLE ----------- Start

        document.addEventListener('DOMContentLoaded', function() {
            const sidebar = document.getElementById('sidebar');
            const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
            const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
            const sidebarOverlay = document.getElementById('sidebarOverlay');

            
            function toggleSidebar() {
                const isMobile = window.innerWidth <= 991;
                if (isMobile) {
                    sidebar.classList.toggle('active');
                    sidebarOverlay.classList.toggle('active');
                } else {
                   
                    sidebar.classList.toggle('collapsed');
                }
            }

            
            function closeSidebar() {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            }

            
            sidebarToggleBtn.addEventListener('click', toggleSidebar);
            sidebarCloseBtn.addEventListener('click', closeSidebar);
            sidebarOverlay.addEventListener('click', closeSidebar);

            
            window.addEventListener('resize', function() {
                if (window.innerWidth > 991) {
                    closeSidebar();
                }
            });
        });

// <! FULLY INTERACTIVE JAVASCRIPT FOR RESPONSIVE TOGGLE ----------- End 



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