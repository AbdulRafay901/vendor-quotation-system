document
    .querySelector(".addVendorBtn")
    .addEventListener("click", () => {
        window.location.href =
            "addVendor.html";
    });


    if(localStorage.getItem("token")){
        index()
    }


   async function index(){
    

    try {

        const {data} = await axios.get("http://127.0.0.1:8000/api/auth/vendors",
            {
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )

        if(data){

            console.log(data.data[0])

            const dataShow = document.getElementById("dataShow");

            data.data.forEach(d => {
            

            dataShow.innerHTML += `
            <tr>
                    
                        <td>${d.id}</td>
                        <td>${d.vendor_name}</td>
                        <td>${d.company_name}</td>
                        <td>${d.email}</td>
                        <td>${d.phone}</td>
                        
                        <td>
                            <span class="badge active">
                                Active
                            </span>
                        </td>

                        <td class="actions">
                            <button class="icon-btn">
                                <i class="fa-regular fa-eye"></i>
                            </button>

                            <button class="icon-btn">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </button>

                            <button class="icon-btn">
                                <i class="fa-regular fa-trash-can"></i>
                            </button>
                        </td>
                    </tr> `

            })

        
            
        }
        
    } catch (error) {
        console.log(error)
    }

    }

    