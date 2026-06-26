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

        console.log(data)
        
    } catch (error) {
        console.log(error)
    }

    }

    