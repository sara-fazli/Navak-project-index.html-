let allProducts = [];
const productsContainer = document.getElementById('productContainer');
const searchInput = document.getElementById('searchInput');


allProducts = [
    {
        id:1,
        title:'کتاب صوتی سمفونی مردگان',
        author:'عباس معروفی',
        price:330000,
        description:'رمانی تاثیرگذار درباره خانواده، مرگ و سرنوشت در جامعه معاصر ایران.',
        rating:4.8,
        image:'images/symphony.jfif',
        type:'🎧 صوتی'
    },
    {
        id:2,
        title:'کتاب الکترونیکی بینوایان',
        author:'ویکتور هوگو',
        price:670000,
        description:'شاهکاری از ویکتور هوگو.',
        rating:4.9,
        image:'images/lesmiserable.jpg',
        type:'📖 الکترونیکی'
    },
    {
        id:3,
        title:'کتاب صوتی کیمیاگر',
        author:'پائولو کوئیلو',
        price:520000,
        description:'داستانی الهام‌بخش.',
        rating:4.7,
        image:'images/alchemist.jfif',
        type:'🎧 صوتی'
    },
    {
        id:4,
        title:'کتاب الکترونیکی 1984',
        author:'جورج اورول',
        price:400000,
        description:'رمانی مشهور.',
        rating:4.9,
        image:'images/1984.jfif',
        type:'📖 الکترونیکی'
    },
    {
        id:5,
        title:'کتاب صوتی ملت عشق',
        author:'الیف شافاک',
        price:300000,
        discountPrice:240000,
        description:'روایتی از عشق و عرفان.',
        rating:4.8,
        image:'images/love.jfif',
        type:'🎧 صوتی'
    },
    {
        id:6,
        title:'کتاب صوتی اثر مرکب',
        author:'دارن هاردی',
        price:350000,
        description:'موفقیت با پیشرفت‌های کوچک.',
        rating:4.7,
        image:'images/compound.jfif',
        type:'🎧 صوتی'
    },
    {
        id:7,
        title:'کتاب صوتی انسان در جستجوی معنا',
        author:'ویکتور فرانکل',
        price:320000,
        description:'معنای زندگی.',
        rating:4.9,
        image:'images/meaning.jfif',
        type:'🎧 صوتی'
    },
    {
        id:8,
        title:'کتاب الکترونیکی کار عمیق',
        author:'کال نیوپورت',
        price:310000,
        discountPrice:249000,
        description:'افزایش تمرکز.',
        rating:4.6,
        image:'images/deepwork.jfif',
        type:'📖 الکترونیکی'
    },
    {
        id:9,
        title:'کتاب الکترونیکی شازده کوچولو',
        author:'آنتوان دوسنت اگزوپری',
        price:245000,
        description:'داستانی ماندگار.',
        rating:5,
        image:'images/thelittleprince.jfif',
        type:'📖 الکترونیکی'
    },
    {
        id:10,
        title:'کتاب صوتی پدر پولدار، پدر بی‌پول',
        author:'رابرت کیوساکی',
        price:550000,
        description:'آموزش مفاهیم مالی.',
        rating:4.8,
        image:'images/richdadpoordad.jfif',
        type:'🎧 صوتی'
    },
    {
        id:11,
        title:'کتاب صوتی قلعه حیوانات',
        author:'جورج اورول',
        price:592000,
        description:'تمثیلی سیاسی.',
        rating:4.8,
        image:'images/animalfarm.jfif',
        type:'🎧 صوتی'
    },
    {
        id:12,
        title:'کتاب الکترونیکی عادت‌های اتمی',
        author:'جیمز کلیر',
        price:110000,
        discountPrice:89000,
        description:'ساخت عادت‌های خوب.',
        rating:5,
        image:'images/atomichabits.jfif',
        type:'📖 الکترونیکی'
    }
];

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

displayProducts(allProducts);
updateCartCount();
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
/*async function fetchProducts(){
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

*/

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