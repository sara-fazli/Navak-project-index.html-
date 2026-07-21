window.onload = function() {
    const isLoggedIn= localStorage.getItem('isLoggedIn');

    if(isLoggedIn !== 'true'){
        alert('ابتدا وارد حساب کاربری خود شوید.');
        window.location.href = 'index.html';

        return;
    }

//نمایش نام کاربری
const username= this.localStorage.getItem('username');
document.getElementById('username').innerText = username || 'کاربر';

//نمایش تعداد کتاب های سبد خرید
const cart = JSON.parse(
    this.localStorage.getItem('shoppingCart')) || [];

    let totalBooks =0;
    cart.forEach(item => {
        totalBooks += item.count;
    });

    document.getElementById('cartCount').innerText = totalBooks;
};

//خروج از حساب
const logoutBtn = document.getElementById('logoutBtn');

if(logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');

        alert('با موفقیت از حساب خارج شدید.')

        window.location.href ='index.html';
    });
}

const darkModeToggle =
document.getElementById('darkModeToggle');
console.log(darkModeToggle);

if(darkModeToggle){

    const darkMode =
    localStorage.getItem('darkMode');

    if(darkMode === 'true'){

        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener('change', function(){

        if(this.checked){

            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode','true');

        }else{

            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode','false');
        }
    });
}




