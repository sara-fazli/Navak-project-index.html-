let allProducts = [];
const productsContainer = document.getElementById('productContainer');
const searchInput = document.getElementById('searchInput');

window.onload = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if(isLoggedIn!=='true'){
        alert('ابتدا باید وارد حساب کاربری شوید.');
        window.location.href ='index.html';
        return;
    }
        
const darkMode = localStorage.getItem('darkMode');

if(darkMode === 'true'){
    document.body.classList.add('dark-mode');
}
const username= localStorage.getItem('username');
if (username){
    document.getElementById('welcome-message').innerText =`خوش آمدید ${username} - لیست کتاب‌ها`;

    const profileName= document.getElementById('profile-name');

    if(profileName){
        profileName.innerText = username;
    }
}

fetchProducts();
};
//قابلیت خروج از حساب
const logoutBtn= document.getElementById('logoutBtn');
if (logoutBtn){
    logoutBtn.addEventListener('click', function(){
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = 'index.html';//بازگشت به صفحه ورود




});
}

//ایجاد داده های داینامیک(لیست کتابها)
async function fetchProducts(){
    try{

        console.log("Fetching products...");
        
        const[electronicRes, audioRes] = await Promise.all([
            fetch('http://127.0.0.1:8000/product/electronic-book-list-create'),
            fetch('http://127.0.0.1:8000/product/audio-book-list-create')

        ]);

        const electronicBooks = await electronicRes.json();
        const audioBooks = await audioRes.json();

        const electronicFormatted = electronicBooks.map(item => ({
            id : item.id,
            title : item.name,
            author : item.author,
            price : item.price,
            description : item.description,
            rating : item.score,
            image : item.picture || 'images/default.jpg',
            type: "📖 الکترونیکی"

        }));

        const audioFormatted  = audioBooks.map(item => ({
            id : item.id,
            title: item.name,
            author : item.author,
            price: item.price,
            description : item.description,
            rating: item.score,
            image : item.picture || 'images/default.jpg',
            type:"🎧 صوتی"
        }));

        allProducts = [...electronicFormatted, ...audioFormatted];
        displayProducts(allProducts);
        updateCartCount();
    }catch(err){
        console.error("API Error:", err);

        if(productsContainer){
        productsContainer.innerHTML =`
        <p style="color:red; text-align:center;">
            خطا در دریافت اطلاعات از سرور 
        </p>
    `;

        }

        
    }
}


//تابعی برای نمایش محصولات در صفحه

function displayProducts(productsList){
    productsContainer.innerHTML ='' ;
   
  

    //اگر محصولی یافت نشد
    if (productsList.length ===0){
        productsContainer.innerHTML = '<p>محصولی یافت نشد.</p>';
        return;
    }

    productsList.forEach(function(product){
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

         productCard.innerHTML = `
          <img src="${product.image}" alt="${product.title}" class="product-image">
          <span class="book-type">${product.type}</span>

            <h3>${product.title}</h3>
            <p>نویسنده: ${product.author}</p>
            <p class="rating">⭐ ${product.rating}</p>
            ${product.discountPrice ?
`
<p class="old-price">
    ${product.price.toLocaleString()} تومان
</p>

<p class="discount-price">
    ${product.discountPrice.toLocaleString()} تومان
</p>
`
:
`
<p class="price">
    ${product.price.toLocaleString()} تومان
</p>
`
}

            <a href="product-detail.html?id=${product.id}" class="btn">مشاهده جزئیات</a>
        `;

        productsContainer.appendChild(productCard)
    });
}




if (searchInput) {
    searchInput.addEventListener('input', function(event) {
        const searchValue = event.target.value.trim().toLowerCase();

        const filteredProducts = allProducts.filter(function(product) {
            return product.title.toLowerCase().includes(searchValue)
             ||
                   product.author.toLowerCase().includes(searchValue);
        });

        displayProducts(filteredProducts);
    });
}

function updateCartCount() {
    const cart = JSON.parse(
        localStorage.getItem('shoppingCart')
    ) || [];
    let totalCount = 0;
    cart.forEach(item =>{
        totalCount += item.count;

    });
    const cartCount = document.getElementById('cart-count');

    if(cartCount) {
        cartCount.innerText = totalCount;
    }

}