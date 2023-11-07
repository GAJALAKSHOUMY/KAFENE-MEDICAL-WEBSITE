$(document).ready(function () {
    if(localStorage.getItem('loginStatus') == 'true'){
        location.assign('./orders.html')
    }
    let loginDOM = window.document.getElementById('signInForm');
    loginDOM.onsubmit = function (e) {
        e.preventDefault();
        let loginDetails = {
            username: this.username.value,
            password: this.password.value
        }
        if (loginDetails.username === loginDetails.password) {

            window.localStorage.setItem('loginStatus',true)
            alert('Login Successful!')
            location.replace('./orders.html')
            //api call (api call is not working so I made login direct);
        } else {
            alert(`Please Enter Valid Credentials `)
        }
    }
    $('.navMenuLinks').click(function (e) { 
        e.preventDefault();
        $('.active').removeClass('active');
        $(e.target).addClass('active')
        
    });
});