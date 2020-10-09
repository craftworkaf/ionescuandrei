
let basePath = 'https://upster.co.uk/shopping-list-manager/';

export var links = {

    
    store : basePath + 'store',
    all: basePath +'all',
    delete : basePath + 'delete',
    login : basePath + 'admin/login',
    register: basePath + 'admin/register',

};





export function nameFilter(el){

    // if (el.val() == '' ){

    //     return false

    // }

    return el.val() == '';


}




export function fieldFilter(el,rules){


    return el.val().length < rules.min || el.val().length > rules.max;

}



export function check(element, ruleName){

    var result = fieldFilter(element, ruleName)

    if (result){
        element.css({borderColor : ' rgba(255,57,24,.5)'})
    }else{
        element.css({border: '5px solid green'})
    }

}


export function comparePass(pass1, pass2){

    if (pass1.val() == pass2.val()){

        pass1.css({border:'5px solid green'});
        return 

    }else {

        pass1.css({border:'5px solid red'});
        return 

    }

   
}



