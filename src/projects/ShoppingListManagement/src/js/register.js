import {links} from './helper.js'
import * as Helper from './helper.js'
import * as Data from './data.js'

var userName =  $('.regName');

var password = $('.regPassword');

var confirmPassword = $('.confirmPassword');

var url = links.register
console.log(url)



$('#regUser').click(function(){
 

    if( password.val() === confirmPassword.val() ){
       
        $.post( url,{name: userName.val(),password : confirmPassword.val()}).done(function(response){

                if(response.status === 200){

                    localStorage.setItem('token', response.token)
                   // window.location.assign('../src/addItems.html')

                }else(
                    console.log(response)
                )


            });

    }else{
        console.log('no');
    }



});

 


userName.keyup(function(){

    Helper.check($(this), Data.userRules);

});


 password.keyup(function(){

     Helper.check($(this), Data.passRules);

 });


 confirmPassword.keyup(function(){

  Helper.comparePass($(this), password);

 });