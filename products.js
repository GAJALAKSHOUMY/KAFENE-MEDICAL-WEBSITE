$(document).ready(function () {
    if(localStorage.getItem('loginStatus') !== 'true'){
        location.assign('./index.html')
    }
    const logoutButton = document.getElementById('logout-button');
    logoutButton.onclick = function (e) {
        e.preventDefault();
        localStorage.setItem('loginStatus', false)
        location.assign('./index.html')
    }
    $.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products",
        function (data) {
            data.map((item,pos) => {    
                createRows(item)
                $('#count').html(data.length)
            })
        },
    );
    function createRows(data) {
        let tab_row = (`
        <tr>
            <td class="lightText">${data.id}</td>
            <td class="darkText">${data.medicineName}</td>
            <td class="lightText">${data.medicineBrand}</td>
            <td class="darkText">${data.expiryDate}</td>
            <td class="lightText">$${data.unitPrice}</td>
            <td class="lightText">${data.stock}</td>
        </tr>`)
        $('#printData').append(tab_row);
    }


    
    let expiredCBox = document.getElementById('expiredCheckBox');
    expiredCBox.addEventListener('change', function (e) {
        e.preventDefault();
        let tb = document.getElementById('printData');
        let t_r = tb.getElementsByTagName('tr');
        for (let i = 0; i < t_r.length; i++) {
            let td = t_r[i].getElementsByTagName('td')[3];
            if (td) {
                let value = myParser(td.textContent || td.innerHTML);
                if (new Date(value).getTime() < new Date().getTime()){
                    if(this.checked === true){
                        t_r[i].style.display = "";
                        $('#count').html(parseInt($('#count').html()) + 1 );
                    }else{
                        t_r[i].style.display = "none";
                        $('#count').html(parseInt($('#count').html()) - 1 );
                    }     
                }
            }
        }
    })


    let lowStockCBox = document.getElementById('lowStockCheckBox');
    lowStockCBox.addEventListener('change', function (e) {
        e.preventDefault();
        let tb = document.getElementById('printData');
        let t_r = tb.getElementsByTagName('tr');
        for (let i = 0; i < t_r.length; i++) {
            let td = t_r[i].getElementsByTagName('td')[5];
            if (td) {
                let value = td.textContent || td.innerHTML;
                if (value < 100){
                    if(this.checked === true){
                        t_r[i].style.display = "";
                        $('#count').html(parseInt($('#count').html()) + 1 );
                    }else{
                        t_r[i].style.display = "none";
                        $('#count').html(parseInt($('#count').html()) - 1 );
                    }     
                }
            }
        }
    })


    function myParser (date) {
        let arr = date.split('-');
        return arr.join(' ')
    }
});
