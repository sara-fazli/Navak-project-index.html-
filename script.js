
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

//چک کردن حفظ نشست
//با استفاده از حافظه مرورگر
window.onload = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn ==='true'){
        //اگر کاربر قبلا وارد شده او را به صفحه لیست محصولات میبریم
        alert("در حال انتقال به products.html");

        window.location.href = "./products.html";
    }
};

//وقتی کاربر روی دکمه ورود کلیک می کند
loginForm.addEventListener('submit', function(event){
    alert("submit works");
    event.preventDefault();//جلوگیری از رفرش شدن پیش فرض
    errorMessage.style.display="none";

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

  //دریافت لیست کاربران ثبت نام شده از حافظه مرورگر
    const users = JSON.parse(localStorage.getItem('users')) || [];

    //جستجو در لیست کاربران برای یافتن کاربری با این مشخصات
    const validUser = users.find(user =>
        user.username ===username &&
        user.password===password
    );

if(validUser){

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);

       alert("isLoggedIn = " + localStorage.getItem('isLoggedIn'));

    window.location.href = "products.html";

}else{

    errorMessage.innerText = "نام کاربری یا رمز عبور اشتباه است!";
    errorMessage.style.display ="block";

}
});
