$(document).ready(function () {
    if(localStorage.getItem('loginStatus') !== 'true'){
        location.assign('./index.html')
    }
    let logoutBtn = document.getElementById('logout-button');
    logoutBtn.onclick = function (e) {
        e.preventDefault();
        localStorage.setItem('loginStatus', false)
        location.assign('./index.html')
    }
    $.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
        function (data) {           
            data.map((item,pos) => {
                createRows(item)              
            })
            searchFun();
            $('#resetBtn').click(function (e) { 
                e.preventDefault();
                $('#searchBox').val('');
                $('#t2 tr').css('display','')
            });
        },
    );
    function createRows(data) {
        let t_row = (`
        <tr class="table-row">
            <td class="lightText">${data.id}</td>
            <td class="lightText"><img src=${data.profilePic}/></td>
            <td class="lightText">${data.fullName}</td>
            <td class="darkText">${data.dob}</td>
            <td class="lightText">${data.gender}</td>
            <td class="lightText">${data.currentCity}, ${data.currentCountry}</td>
        </tr>`)
        $('#t2').append(t_row);
    }


    const searchFun = () => {
        $('#search-form').submit((e) => {
            let searchValue = document.getElementById('searchBox').value.toUpperCase();
            e.preventDefault();
            if (searchValue.length < 2) {
                alert('Please enter atleast 2 characters');
                $('#t2 tr').css('display','')
            } else {
                $.get(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=${searchValue}`,
                    function (data, textStatus, jqXHR) {

                        let tb = document.getElementById('t2');
                        let tr = tb.getElementsByTagName('tr');
                        for (let i = 0; i < tr.length; i++) {
                            let td = tr[i].getElementsByTagName('td')[2];
                            if (td) {
                                let value = td.textContent || td.innerHTML;

                                if (value.toUpperCase().indexOf(searchValue) > -1) {
                                    tr[i].style.display = "";
                                } else {
                                    tr[i].style.display = 'none';
                                }
                            }
                        }
                    },
                );
            }
        })
    }
});
