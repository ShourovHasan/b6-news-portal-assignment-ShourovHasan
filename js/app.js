const loadNewsCategories = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.data);
        displayNewsCategories(data.data);
    }
    catch (error) {
        // document.getElementById("error_fetch").innerHTML = error.message;
        console.log(error);
    }

}
const displayNewsCategories = (categories) => {
    const categoriesContainer = document.getElementById('show_news');
    categoriesContainer.innerHTML = '';

    // Sort By viewers of news 
    categories = categories.sort((a, b) => b.total_view - a.total_view);


    categories.forEach(category => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('mb-3');
        div.innerHTML = ` 
        <div class="row g-0">
            <div class="col-md-4 col-lg-4">
                <img src="${category.image_url ? category.image_url : 'Image Not Found'}" class="img-fluid h-100 rounded  p-3" alt="...">
            </div>
            <div class="col-md-8 col-lg-8">
                <div class="card-body">
                    <h5 class="card-title  text-capitalize">${category.title ? category.title : 'News Title Not Found'}</h5>
                    <p class="card-text">${category.details ? category.details : 'News Details Not Found'}</p>
                    <div class="d-flex justify-content-between">
                        <div class="bloger_info d-flex" style="width:35%">
                            <div class="my-auto w-50">
                                <img class="w-100 rounded-circle d-inline-block me-0 pe-0" src="${category.author.img ? category.author.img : 'Author Image Not Found'}" alt="">
                            </div>
                            <div class="ps-2 my-auto">
                                <p class="m-0 p-0">${category.author.name ? category.author.name : 'Author Name Not Found'}</p>
                                <p class="text-black-50 m-0 p-0">${category.author.published_date ? category.author.published_date : 'Published Date Not Found'}</p>
                            </div>
                        </div>
                        <div class="my-auto">
                            <i class="fa fa-eye"></i>
                            <span class="fw-bolder h5">${category.total_view ? category.total_view : 'News View Not Found'}</span>
                        </div>
                        <div class="my-auto">
                            <i class="fas fa-star-half-alt"></i>
                            <i class="far fa-star"></i>
                            <i class="far fa-star"></i>
                            <i class="far fa-star"></i>
                            <i class="far fa-star"></i>
                        </div>
                        <div class="my-auto h4 fw-bolder text-primary">                            
                            <span onclick = "loadNewsDetails('${category._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailModal"><i class="fa fa-arrow-right"></i></span>
                        </div>
                    </div>                            
                </div>
            </div>
        </div>
        `;
        categoriesContainer.appendChild(div);
    })
}
const loadNewsDetails = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
}
const displayNewsDetails = newsInfo => {
    console.log(newsInfo);
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = newsInfo.title;

    const newsDetails = document.getElementById('modal_Body');    
    newsDetails.innerHTML = `
        <div class="card-body">     
            <img src="${newsInfo.image_url ? newsInfo.image_url : 'Image Not Found'}" class="img-fluid h-100 rounded  p-3" alt="...">       
            <p class="card-text">${newsInfo.details ? newsInfo.details : 'News Details Not Found'}</p>
            <div class="w-100 d-flex justify-content-between">
                <div class="bloger_info d-flex w-50">
                    <div class="my-auto w-25">
                        <img class="w-100 rounded-circle d-inline-block me-0 pe-0" src="${newsInfo.author.img ? newsInfo.author.img : 'Author Image Not Found'}" alt="">
                    </div>
                    <div class="ps-2 my-auto">
                        <p class="m-0 p-0">${newsInfo.author.name ? newsInfo.author.name : 'Author Name Not Found'}</p>
                        <p class="text-black-50 m-0 p-0">${newsInfo.author.published_date ? newsInfo.author.published_date : 'Published Date Not Found'}</p>
                    </div>
                </div>
                <div class="my-auto w-25">
                    <i class="fa fa-eye"></i>
                    <span class="fw-bolder h5">${newsInfo.total_view ? newsInfo.total_view : 'News View Not Found'}</span>
                </div>
                <div class="my-auto w-25">
                    <span>${newsInfo.rating.badge ? newsInfo.rating.badge : 'News badge Not Found'}</span>
                </div>
                <div class="my-auto w-25">
                    <span class="fw-bolder">${newsInfo.rating.number ? newsInfo.rating.number : 'News Rating Not Found'}</span>
                </div>
            </div>                            
        </div>
    `;

}


// const someFunction = (news_sort_details)=>{
//     const para = document.getElementsByClassName("news_sort_details")[0];
//     const text = para.innerHTML;
//     console.log(text);
//     // para.innerHTML = "";
//     // const words = text.split(" ");
//     // // if()
//     // for (i = 0; i < 50; i++) {
//     //     para.innerHTML += words[i] + " ";
//     // }
//     // para.innerHTML += "...";    
// }







// news Show from nav Menu 
document.getElementById('home_id').addEventListener('click', function(){
    loadNewsCategories('08');
})
document.getElementById('breaking_news_id').addEventListener('click', function(){
    loadNewsCategories('01');
})
document.getElementById('regular_news_id').addEventListener('click', function(){
    loadNewsCategories('02');
})
document.getElementById('international_id').addEventListener('click', function(){
    loadNewsCategories('03');
})
document.getElementById('sports_id').addEventListener('click', function(){
    loadNewsCategories('04');
})
document.getElementById('entertainment_id').addEventListener('click', function(){
    loadNewsCategories('05');
})
document.getElementById('culture_id').addEventListener('click', function(){
    loadNewsCategories('06');
})
document.getElementById('arts_id').addEventListener('click', function(){
    loadNewsCategories('07');
})
document.getElementById('all_news_id').addEventListener('click', function(){
    loadNewsCategories('08');
})
loadNewsCategories('08');

