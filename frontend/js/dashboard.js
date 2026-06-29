

// Charts Code --------------------- Start tive 

let active = 0

function chartUpdate(){


const options = {
    series: [active, 7, 11],

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

}



async function dashboard() {
    try {

    const {data} = await axios.get('http://localhost:8000/api/auth/dashboard-stats',{
        headers:{
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    });

    console.log(data)

    
    

    active = data.activeQuotations

    document.getElementById("totalvendors").innerHTML = data.totalVendors;
    document.getElementById("active-quotes").innerHTML = data.activeQuotations;

    chartUpdate()

} catch (error) {
    console.log(error.response)
}
}

dashboard()