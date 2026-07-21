const cart= JSON.parse(
    localStorage.getItem('shoppingCart')
) || [];

//دریافت المنت ها 
const totalPriceElement= document.getElementById('totalPrice');
const submitOrderBtn= document.getElementById('submitOrderBtn');
const darkMode = localStorage.getItem('darkMode');

if(darkMode === 'true'){
    document.body.classList.add('dark-mode');
}
//محصولات
const products= [
    {
        id:1,
        price:330000
    },
    {
        id:2,
        price:670000
    },
    {
        id:3,
        price:520000
    },
    {
        id:4,
        price:400000
    },
    {
        id:5,
        price:300000,
        discountPrice:240000
    },
    {
        id:6,
        price:350000
    },
    {
        id:7,
        price:320000
    },
    {
        id:8,
        price:310000,
        discountPrice:249000
    },
    {
        id:9,
        price:245000
    },
    {
        id:10,
        price:550000
    },
    {
        id:11,
        price:592000
    },
    {
        id:12,
        price:110000,
        discountPrice:89000
    }
];
//محاسبه مبلغ کل
let total = 0;
cart.forEach(item =>{

    const product =
    products.find(
        p=> p.id ===item.productId
    );
    if(product){
        const finalPrice=
        product.discountPrice || product.price;
        total += finalPrice * item.count;
    }
});

//نمایش مبلغ کل
totalPriceElement.innerText =  `مبلغ کل: ${total.toLocaleString()} تومان`;

//ثبت سفارش
submitOrderBtn.addEventListener(
    'click',
    function () {
        const address= document.getElementById('address').value.trim();
        if (address === ''){
            alert('لطفا آدرس تحویل سفارش را وارد کنید.');

            return;
        }

        alert('سفارش شما با موفقیت ثبت شد!');

//خالی کردن سبد خرید 
localStorage.removeItem('shoppingCart');

//بازگشت به محصولات
window.location.href= 'products.html';
    }
);




