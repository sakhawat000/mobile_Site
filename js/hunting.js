 
//  sit er link theke data niye asa 
 const phon = async (searchText) =>{
    //link কে ডাইনামিকেলি করা হল ${searchText}  দিয়ে
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    // console.log(data.data[4].phone_name)
    const phones = data.data; 
    // console.log(phone)
    
    // ২য় function কে কল করা   
    displayPhon(phones);

 }
 

  const displayPhon = (phones) => {
      //  console.log(phones);
    
    
    const phonneContiner = document.getElementById('phone-continer')
    //  যা ভিতরে কাড গুলাকে রাখব তাকে নি আসা

    // continer কে ফাকা করার জন্য 
      phonneContiner.textContent = '';

    //  search button ke কখন দেখাব কখন দেখাব না সেটার জন্য 
    const showAllContainer = document.getElementById('show-all-button')
    if(phones.length > 9  ){
        showAllContainer.classList.remove('hidden')
    }
     else{
         showAllContainer.classList.add('hidden')
     }
     

    // কয়টি  item দেখাব সেটা বলে দেয়ার জন্য

       phones = phones.slice(0,9);



 phones.forEach(phone => {
      // console.log(phone);
    //  
    const phonCard = document.createElement('div');
    // একটি ডিভ বানানো যার ভিতরে কার্ডগুল থাকবে 
    phonCard.classList = `card  bg-base-100 shadow-xl py-6`;
    // ডিভ এর ভিতরে ক্লাস দেওয়া 
     phonCard.innerHTML =`
     <figure><img src="${phone.image}" alt="Shoes" /></figure>
     <div class="card-body">
       <h2 class="card-title">${phone.phone_name}</h2>
       <p>If a dog chews shoes whose shoes does he choose?</p>
       <div class="card-actions justify-center">
         <button class="btn btn-primary" onclick=" handelShowDetails('${phone.slug}')">Show Details</button>
       </div>
     </div> 
     `;
    //  ডাইনামিকেলি বানানো কার্ড এর ভিতরে পাঠান 

     phonneContiner.appendChild(phonCard);

    //  phonContiner  এর ভিতরে পাঠানো
      
   });
 
    // search function কে কল করা হচ্ছে কারন এখান থেকে ডাটা সাইটে দেখাচ্ছে আর আমরা ডেটা দেখানোর পর spinner টা কে off করতে চাই  

    toggoleSpiner(false)
};
  

//  প্রথম function কে কল করা   

//  phon()



//  .................. search বার এর কাজ ...............

// search  বাটন কে নিয়ে আসা জাভা তে 
 
const searcehandaler = ()=>{

    //  spinner  কে দেখানোর জন্য কাজ করা কারন এখানে সার্চ বাটন এ ক্লিক করা হচ্ছে 
    toggoleSpiner(true)


  const searchFild = document.getElementById('input-filde');
  const searchText = searchFild.value;
//  search box   এর ভেলু ডিলেট করার জন্য 
  searchFild.value = '';
  // console.log(searchText);

  phon(searchText, );
//  ডিনামিকেলি করার জন্য  প্রথম function কে কল করা হল এখানে
};
// spinner , loader  এর জন্য কাজ 
  const toggoleSpiner = (isloadaing) =>{
    const loadaingSpinner = document.getElementById('loading-spiner');
     if(isloadaing){
        loadaingSpinner.classList.remove('hidden');
     }
     else{
        loadaingSpinner.classList.add('hidden');  
     }

  };

//    show all button 

// const handelShowAll = () =>{
//     searcehandaler(true)  
// }

// 

const handelShowDetails = async (id) =>{
    //  console.log(id)
    //  lode single phon all data 
     const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
     const data = await res.json() 
     const phone = data.data;
    //  console.log(phone)
    
    showPhoneDetails(phone)
};


// show phon ditalce on modal

const showPhoneDetails = (phone) =>{
     console.log(phone);

     show_details_modal.showModal()

     const phonename = document.getElementById('show-details-phone-name');
     phonename.innerText = phone.name;

     const showdetailsContiner = document.getElementById('show-detaile-continaer');
     showdetailsContiner.innerHTML = `
       <img src="${phone.image}" alt="" />
       <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
       <p><span>ReleseDate:</span>${phone?.releaseDate}</p>
       <p><span>Display:</span>${phone?.mainFeatures?.displaySize}</p>
       <p><span>ChipSet:</span>${phone?.mainFeatures?.chipSet}</p>
       <p><span>Canection:</span>${phone?.others?.WLAN || 'NO GPS IN THIS PHONES'}</p>

     `
}