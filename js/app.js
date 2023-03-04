const fetchAiUniverse = () => {
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
        .then(res => res.json())
        .then(data => showAiUniverse(data.data.tools.slice(0, 6))

        )
}
// display items
const showAiUniverse = (aiDataRecv) => {
    // ai tools container receive
    const AiContainer = document.getElementById('Ai-Container');

    //    previous data empty when click see more button 
    AiContainer.innerHTML = "";
    // single data receive and ui show
    aiDataRecv.forEach((singleDataRecv) => {
        const AiDiv = document.createElement('div');
        AiDiv.classList.add('col');
        AiDiv.innerHTML = `
    <div class="card h-100">
        <img src="${singleDataRecv.image}" class="card-img-top" alt="..." height="190" width="50">
        <div class="card-body">
            <h5 class="card-title">Features</h5>
                <ol>
                    <li> ${singleDataRecv.features[0]}</li>
                    <li> ${singleDataRecv.features[1]}</li>
                    <li> ${singleDataRecv.features[2]}</li>
                </ol>
                 <hr>


            <div class="d-flex justify-content-between">
                <div>
                    <h5 class="card-title">${singleDataRecv.name}</h5>
                    <p class="ms-3"><i class="fa-solid fa-calendar-days"></i> ${singleDataRecv.published_in}</p>
                </div>
                <div class="d-flex justify-content-center">

                        <button onclick="showModalSingleDataInfo('${singleDataRecv.id}')" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            <i class="fas fa-arrow-right p-2 bg-danger bg-opacity-10 rounded-circle text-danger " > </i>
                        </button>
                        
                </div>
            </div>    
        </div>
    </div>`;
        // elements inside the card
        AiContainer.appendChild(AiDiv);

    })
    toggleSpinner(false)
};


fetchAiUniverse();

// show all data display 
const showAllData = () => {
    
    toggleSpinner(true);

    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
        .then(res => res.json())
        .then(data => showAiUniverse(data.data.tools))

}
// 2nd featch 
// modal value show

const showModalSingleDataInfo = (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((data) => showSingleDataModal(data.data))
}
const showSingleDataModal = (modalSingleValueRecv) => {
    console.log(modalSingleValueRecv.description);
    
       const modalContainer = document.getElementById('modal-info');
        const div = document.createElement('div');
       div.innerHTML = `
       <div class="container mx-auto row row-cols-1 row-cols-md-2 g-4 mb-5">
       <div class="col">
           <div class="card">

               <div class="card-body bg-danger bg-opacity-10">
                   <h5 class="card-title my-4">${modalSingleValueRecv.description ? modalSingleValueRecv.description : "No Data Found"} </h5>
                   

                   <div class="d-flex justify-content-between ">

                    
                       <div class="bg-light p-4 rounded text-center text-success">
                       <span> ${modalSingleValueRecv.pricing[0].price ? modalSingleValueRecv.pricing[0].price : "No Data Found"}</span> 
                       <br>
                       
                        <span> ${modalSingleValueRecv.pricing[0].plan ? modalSingleValueRecv.pricing[0].plan : "No Data Found"} </span> 
                        </div>

                       <div class="bg-light  p-4 rounded text-center text-warning">
                       <span> ${modalSingleValueRecv.pricing[1].price ? modalSingleValueRecv.pricing[1].price : "No Data Found"}</span> 
                       <br>
                       
                        <span> ${modalSingleValueRecv.pricing[1].plan ? modalSingleValueRecv.pricing[1].plan : "No Data Found"} </span> 
                        </div>

                       <div class="bg-light  p-4  rounded text-center text-danger">
                       <span> ${modalSingleValueRecv.pricing[2].price.slice(0,10) ? modalSingleValueRecv.pricing[2].price.slice(0,10) : "No Data Found"}</span> 
                       <br>
                       
                        <span> ${modalSingleValueRecv.pricing[2].plan ? modalSingleValueRecv.pricing[2].plan : "No Data Found"} </span> 
                       </div>

                       
                   </div>


                   <!-- card 2 by 2  -->
                   <div class="d-flex justify-content-between my-3 gap-2">
                       <div class=" w-100 rounded">
                           <h5>Features</h5>
                           <ul>
                           <li>${modalSingleValueRecv.features[1].feature_name ? modalSingleValueRecv.features[1].feature_name : "No Data Found"} </li>
                           <li>${modalSingleValueRecv.features[2].feature_name ? modalSingleValueRecv.features[2].feature_name : "No Data Found"} </li>
                           <li>${modalSingleValueRecv.features[3].feature_name ? modalSingleValueRecv.features[3].feature_name : "No Data Found"} </li>
                      
                             
                           </ul>
                       </div>
                       <div class=" w-100 rounded">
                           <h5>Integrations</h5>
                           <ul>
                           <li>${modalSingleValueRecv.integrations[0] ? modalSingleValueRecv.integrations[0] : "No Data Found"} </li>
                           <li>${modalSingleValueRecv.integrations[1] ? modalSingleValueRecv.integrations[1] : "No Data Found"} </li>
                           <li>${modalSingleValueRecv.integrations[2] ? modalSingleValueRecv.integrations[2] : "No Data Found"} </li>
            

                           </ul>
                       </div>

                   </div>
               </div>
           </div>
       </div>
       <div class="col">
           <div class="card">
               <div class="card-body text-center position-relative">
                   <div class=" absolute m">
                   <h3 class="d-flex align-items-center justify-content-center bg-danger w-50 text-white rounded position-absolute end-0 me-4 mt-2" >${modalSingleValueRecv.accuracy.score*100} <span></span> % accuracy</span> </h3>
                   
                   <img src="${modalSingleValueRecv.image_link[0] ? modalSingleValueRecv.image_link[0] : 'No! Not Yet! Take a break!!!'}" class="card-img-top " alt="..." >


                   </div>
                   <h5 class="mt-3">${modalSingleValueRecv.input_output_examples[0].input ? modalSingleValueRecv.input_output_examples[0].input : "No Data Found"} </h5>
                   <p class="mt-3">${modalSingleValueRecv.input_output_examples[0].output ? modalSingleValueRecv.input_output_examples[0].input : "No! Not Yet! Take a break!!!"} </h5>
                  
               </div>
           </div>
       </div>
   </div>
      
       `;
       // previous modal edit 

    modalContainer.innerHTML = "";
    modalContainer.appendChild(div);
};


// loading 
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}