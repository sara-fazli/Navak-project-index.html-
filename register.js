const registerForm=document.getElementById('registerForm');
const errorText = document.getElementById('errorMessage');

registerForm.addEventListener('submit', function(event){
    event.preventDefault();//جلوگیری از رفرش شدن صفحه

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    errorText.style.display="none";

    if(password !== confirmPassword){
        errorText.textContent = "رمز عبور و تکرار رمز عبور یکسان نیستند!";
        errorText.style.display ="block";
        return;
    }
    

    //دریافت اطلاعات قبلی کاربران
    let users = JSON.parse(localStorage.getItem('users'))  || [];

    //بررسی تکراری بودن نام کاربری یا ایمیل تکراری
    const isDuplicate = users.some(
        user => 
            user.username===username || 
        user.email === email
    );

    if(isDuplicate) {
        //اگر تکراری بود پیام خطا بده

        errorText.textContent= "خطا:نام کاربری یا ایمیل از قبل وجود دارد.";
        errorText.style.display = "block";  
    }else{
        //اگر تکراری نبود کاربر جدید به لیست اضافه می شود
        const newUser = {
            username:username,
            email: email,
            password:password

        };

        users.push(newUser);
        //ذخیره مجدد لیست آپدیت شده
        localStorage.setItem('users',JSON.stringify(users));

        //هدایت کاربر به صفحه ورود
        alert("ثبت نام با موفقیت انجام شد!لطفا وارد شوید.");
        window.location.href ='index.html';
    }

});