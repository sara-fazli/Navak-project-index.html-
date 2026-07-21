


window.onload = function(){
    if (localStorage.getItem('isLoggedIn') !=='true'){
        alert("ابتدا وارد حساب کاربری شوید.");
        window.location.href = 'index.html';
        return;
    }


const darkMode = localStorage.getItem('darkMode');

if(darkMode === 'true'){
    document.body.classList.add('dark-mode');
}
//کدهای دکمه خروج
const logoutBtn= document.getElementById('logoutBtn');

if(logoutBtn){
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');

        window.location.href = "index.html";
    });
}

loadProduct();
};
//تعریف مجدد محصولات
const products= [
     {

        id :1,
         title:'کتاب صوتی سمفونی مردگان',
         author:'عباس معروفی', 
         price:330000,
         description:'رمانی تاثیرگذار درباره خانواده، مرگ و سرنوشت در جامعه معاصر ایران.',
        image:'images/symphony.jfif'
    },

     {
        id :2,
         title:'کتاب الکترونیکی بینوایان',
          author:'ویکتور هوگو',
           price:670000,
           description:'شاهکاری از ویکتور هوگو درباره عدالت، فقر و رستگاری انسان.',
        image:'images/lesmiserable.jpg'
     },
     {
        id :3,
         title:'کتاب صوتی کیمیاگر',
          author:'پائولو کوئیلو',
           price:520000,
           description:'داستانی الهام بخش درباره دنبال کردن رویاها و کشف هدف زندگی.',
           image:'images/alchemist.jfif'
        },
     {
        id :4,
         title:'کتاب الکترونیکی 1984 ',
          author:'جورج اورول ',
           price:400000,
           description:'رمانی مشهور که جامعه ای تحت کنترل کامل حکومت را به تصویر می کشد.',
           image:'images/1984.jfif'
        },
     {
        id:5,
        title:'کتاب صوتی ملت عشق',
        author:'الیف شافاک',
        price:300000,
        discountPrice:240000,
        description:'روایتی جذاب از عشق، عرفان و زندگی شمس تبریزی و مولانا.',
        image:'images//love.jfif'

    },
    {
        id:6,
        title:'کتاب صوتی اثر مرکب',
        author:'دارن هاردی',
        price:350000,
        description:'کتابی کاربردی درباره موفقیت از طریق پیشرفت های کوچک و مستمر.',
        image:'images/compound.jfif'
    },
    {
        id:7,
        title:'کتاب صوتی انسان در جستجوی معنا',
        author:'ویکتور فرانکل',
        price:320000,
        description:'تجربیات نویسنده از اردوگاه های جنگ و معنای زندگی در سخت ترین شرایط زندگی.',
        image:'images/meaning.jfif'
    },
      {
        id:8,
        title:'کتاب الکترونیکی کار عمیق',
        author:'کال نیوپورت',
        price:310000,
        discountPrice:249000,
        type:'📖 الکترونیکی',
        description:'راهنمایی برای افزایش تمرکز و بهره وری در دنیای پر از حواس پرتی.',
        image:'images/deepwork.jfif'
        
    },
    {
        id:9,
        title:'کتاب الکترونیکی شازده کوچولو',
        author:'آنتوان دوسنت اگزوپری',
        price:245000,
        type:'📖 الکترونیکی',
        description:'داستانی ماندگار با نگاهی عمیق به دوستی، عشق و زندگی.',
        image:'images/thelittleprince.jfif'
    },
    {
        id:10,
        title:'کتاب صوتی پدر پولدار،پدر بی پول',
        author:'رابرت کیوساکی',
        price:550000,
        type:'🎧 صوتی',
        description:'آموزش مفاهیم مالی و سرمایه گذاری با زبانی ساده و کاربردی.',
        image:'images/richdadpoordad.jfif'
    },
    {
        id:11,
        title:'کتاب صوتی قلعه حیوانات',
        author:'جورج اورول',
        price:592000,
        type:'🎧 صوتی',
        description:'تمثیلی سیاسی درباره قدرت، فساد و تحولات اجتماعی.',
        image:'images/animalfarm.jfif'
    },
    {
        id:12,
        title:'کتاب الکترونیکی عادت های اتمی',
        author:'جیمز کلیر',
        price:110000,
        discountPrice:89000,
        type:'📖 الکترونیکی',
        description:'راهنمایی عملی برای ساخت عادت های خوب و ترک عادت های بد.',
        image:'images/atomichabits.jfif'

    }
];

const urlParams = new URLSearchParams(window.location.search);
const productId = Number(urlParams.get('id'));

const container = document.getElementById('product-detail-container');

if(productId){
    const product = products.find( p => p.id===productId);

    if(product){

    //اگر محصول پیدا شد،نمایش بده
       container.innerHTML = `
         <img src="${product.image}" 
         alt="${product.title}" 
         class="product-detail-image">

    <h2>${product.title}</h2>

    <p><strong>نویسنده:</strong> ${product.author}</p>
    <p class="product-description">
    ${product.description}
</p>

    <p>${product.discountPrice ?
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



    <button onclick="addToCart(${product.id})" class="btn">
        افزودن به سبد خرید
    </button>
`;
    } else {
        // اگر ID معتبر نبود
        container.innerHTML = '<h2>خطا: محصولی با این شناسه یافت نشد!</h2>';
    }
} else {
   
    container.innerHTML = '<h2>محصولی انتخاب نشده است.</h2>';
}
    
//تابع افزودن به سبد خرید
function addToCart(id){
    console.log("addToCart اجرا شد", id);
    let cart = JSON.parse(
        localStorage.getItem('shoppingCart')
    ) || [];
    const existingItem = cart.find(
        item => item.productId ===id
    );

    if (existingItem){
        existingItem.count +=1;
    }else{
        cart.push({
            productId:id,
            count:1
        });
    }

    localStorage.setItem(
        'shoppingCart',
        JSON.stringify(cart)
    );

    alert('محصول با موفقیت به سبد خرید اضافه شد.')
  
}

function loadProduct(){

    const urlParams = new URLSearchParams(window.location.search);
    const productId = Number(urlParams.get('id'));

    const container = document.getElementById('product-detail-container');

    if (!productId) {
        container.innerHTML = "<h2>محصولی انتخاب نشده است.</h2>";
        return;
    }

    const product = products.find(p => p.id === productId);

    if (!product) {
        container.innerHTML = "<h2>محصول پیدا نشد.</h2>";
        return;
    }

    container.innerHTML = `
        <img src="${product.image}" class="product-detail-image">

        <h2>${product.title}</h2>

        <p><strong>نویسنده:</strong> ${product.author}</p>

        <p>${product.description}</p>

        ${
            product.discountPrice ?
            `
            <p class="old-price">${product.price.toLocaleString()} تومان</p>
            <p class="discount-price">${product.discountPrice.toLocaleString()} تومان</p>
            `
            :
            `
            <p class="price">${product.price.toLocaleString()} تومان</p>
            `
        }

        <button onclick="addToCart(${product.id})" class="btn">
            افزودن به سبد خرید
        </button>
    `;
}


