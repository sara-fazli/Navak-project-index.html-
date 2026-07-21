const CART_STORAGE_KEY = 'shoppingCart';

const dummyProducts = [
      {
        id :1,
         title:'کتاب صوتی سمفونی مردگان',
          author:'عباس معروفی',
          price:330000,
          image:'images/symphony.jfif'

        },
    {
        id :2,
         title:'کتاب الکترونیکی بینوایان',
          author:'ویکتور هوگو',
           price:670000,
           image:'images/lesmiserable.jpg'
        },
    {
        id :3,
         title:'کتاب صوتی کیمیاگر',
          author:'پائولو کوئیلو',
           price:520000,
           image:'images/alchemist.jfif'
        },
    {
        id :4,
         title:'کتاب الکترونیکی 1984 ',
          author:'جورج اورول ',
           price:400000,
           image:'images/1984.jfif'
        },

      {
        id:5,
        title:'کتاب صوتی ملت عشق',
        author:'الیف شافاک',
        price:300000,
        discountPrice:240000,
        image:'images//love.jfif'

    },
    {
        id:6,
        title:'کتاب صوتی اثر مرکب',
        author:'دارن هاردی',
        price:350000,
        image:'images/compound.jfif'
    },
    {
        id:7,
        title:'کتاب صوتی انسان در جستجوی معنا',
        author:'ویکتور فرانکل',
        price:320000,
        image:'images/meaning.jfif'
    },
      {
        id:8,
        title:'کتاب الکترونیکی کار عمیق',
        author:'کال نیوپورت',
        price:310000,
        discountPrice:249000,
        type:'📖 الکترونیکی',
        image:'images/deepwork.jfif'
        
    },
    {
        id:9,
        title:'کتاب الکترونیکی شازده کوچولو',
        author:'آنتوان دوسنت اگزوپری',
        price:245000,
        type:'📖 الکترونیکی',
        image:'images/thelittleprince.jfif'
    },
    {
        id:10,
        title:'کتاب صوتی پدر پولدار،پدر بی پول',
        author:'رابرت کیوساکی',
        price:550000,
        type:'🎧 صوتی',
        image:'images/richdadpoordad.jfif'
    },
    {
        id:11,
        title:'کتاب صوتی قلعه حیوانات',
        author:'جورج اورول',
        price:592000,
        type:'🎧 صوتی',
        image:'images/animalfarm.jfif'
    },
    {
        id:12,
        title:'کتاب الکترونیکی عادت های اتمی',
        author:'جیمز کلیر',
        price:110000,
        discountPrice:89000,
        type:'📖 الکترونیکی',
        image:'images/atomichabits.jfif'

    }

];
//تابع کمکی برای پیدا کردن جزئیات محصولات براساس شناسه
function getProductById(productId){
    return dummyProducts.find(p => p.id===parseInt(productId));
}

//توابع اصلی مدیریت محصولات
function getCart(){
    return JSON.parse(
        localStorage.getItem(CART_STORAGE_KEY)

        ) || [];
    
}

function saveCart(cart){
    localStorage.setItem(CART_STORAGE_KEY,JSON.stringify(cart));
    }

 
function removeFromCart(productId) {
    const id = parseInt(productId);
    let cart = getCart();
    cart = cart.filter(
        item => item.productId !== id
    );
    saveCart(cart);
    displayCart();
}

function updateCartItem(productId,newCount){
    let cart = getCart();
    const item= cart.find(
        item => item.productId === parseInt(productId)
    );
    if (!item) return;
    if (newCount <= 0){
        cart = cart.filter(
            item => item.productId !== parseInt(productId)
        );
    }else{
        item.count = newCount;
    }
    saveCart(cart);
    displayCart();
}

    // محاسبه و نمایش مبلغ کل سبد خرید
function calculateTotal(){
    const cart = getCart();
    let total = 0;
    cart.forEach(item =>{
        const product =
        getProductById(item.productId);

        if (product) {
           const finalPrice=
           product.discountPrice || product.price;
           total += finalPrice*item.count;
        }
    });
    return total;

}

// نمایش سبد خرید
function displayCart() {

    const cartItemsContainer =
        document.getElementById('cart-items');

    const cartTotalElement =
        document.getElementById('cart-total');

        const darkMode = localStorage.getItem('darkMode');

if(darkMode === 'true'){
    document.body.classList.add('dark-mode');
}
    if (!cartItemsContainer) {
        console.warn("عنصر cart-items پیدا نشد");
        return;
    }

    if (!cartTotalElement) {
        console.warn("عنصر cart-total پیدا نشد");
        return;
    }

    const cart = getCart();
    console.log("cart =",cart);

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {

        cartItemsContainer.innerHTML =
            '<p>سبد خرید شما خالی است.</p>';

        cartTotalElement.innerText =
            'مبلغ کل: 0 تومان';

        return;
    }

    cart.forEach(item => {

        const product =
            getProductById(item.productId);

        if (!product) return;

        const itemElement =
            document.createElement('div');

        itemElement.classList.add('cart-item');

        itemElement.innerHTML = `
            <h3>${product.title}</h3>

            <p>
                نویسنده:
                ${product.author}
            </p>

            <p>
                قیمت:
                :
    ${(product.discountPrice || product.price).toLocaleString()} تومان
            </p>

            <p>
                تعداد:
                ${item.count}
            </p>

            <button
                onclick="updateCartItem(${item.productId}, ${item.count + 1})">
                +
            </button>

            <button
                onclick="updateCartItem(${item.productId}, ${item.count - 1})">
                -
            </button>

            <button
                onclick="removeFromCart(${item.productId})">
                حذف
            </button>
        `;

        cartItemsContainer.appendChild(itemElement);
    });

    const total = calculateTotal();

    cartTotalElement.innerText =
        `مبلغ کل: ${total.toLocaleString()} تومان`;
}

// اجرای اولیه صفحه
document.addEventListener(
    'DOMContentLoaded',
    function () {
        displayCart();
    }
);

const clearCartBtn = document.getElementById('clearCartBtn');
if(clearCartBtn){
    clearCartBtn.addEventListener('click', function(){
        localStorage.removeItem(CART_STORAGE_KEY);
        displayCart();
        alert('سبد خرید با موفقیت خالی شد.');
    });

}
