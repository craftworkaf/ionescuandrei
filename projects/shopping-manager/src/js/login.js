import{userRules, passRules} from './data.js'
import{fieldFilter, check} from './helper.js'

import * as Helper from './helper.js'

console.log(Helper)

var user =  $('.name');

var password = $('.password');

var url = Helper.links.login;




$('#login').click(function(){



   
    if (Helper.fieldFilter(user,userRules)){

        $('#badLogin2').show();
                
        return

    }else if (fieldFilter(password,passRules)){

            $('#badLogin2').show();
           
            return
            
        };
        
        console.log(user.val(), password.val());

    $.post(url,{  

        user: user.val(),
        password : password.val()

    }).done(function(response){
        
        console.log(response);

        if(response.status == 200){

            localStorage.setItem('token', response.token)
            localStorage.setItem('userName', response.userName)
            window.location.assign('addItems.html')

        }else if ( response.status == 401 ){

            $('#badLogin').show();

            }
        
         });

    

         

});




user.keyup(function(){

    Helper.check($(this), userRules);

});


 password.keyup(function(){

     Helper.check($(this), passRules);

 });

 $('input').click(function(){

    $('#badLogin').hide();
    $('#badLogin2').hide();
    $('.name').css({
        border : 'none',
        
});
    $('.password').css({
        border : " none ",
       
    });
    
 });



$(document).ready(function(){

    if(localStorage.getItem('token')){

        window.location.assign('addItems.html')

    };

});




