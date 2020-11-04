let menuItem = ''
let orderList = []


/**
 * Defauly hidden for the overlay.
 */
$(document).ready(function(){
    $('.overlay').hide();
})

//=========================================


/**
 * Generates a order item template
 * 
 * @param {*} obj 
 */
function modalTemplate(obj){

    var template = `<p class="product" data-item = "${obj.item}" data-price = ${obj.price} > Item: ${obj.item}, Description: ${obj.description}, Price: ${obj.price} </p>`
    return template;
}

//=============================================


/**
 * Item template for the order list array
 * 
 * @param {*} item 
 * @param {*} price 
 */
function createOrderItem(item,price){

    return { item:item, price:price, qty:1 }
}
//================================================



/**
 *Displays an overlay with the apropriate item list for the group clicked 
 */
$('.menuItem').click( function(){

    $('.modal').html('');
    $('.overlay').show();
    
    menuItem = $(this).text().toLowerCase().trim();

    if(menuItem !='settings'){

       var category = stock[menuItem];
    
        for (let index = 0; index < category.length; index++) {

            var item = modalTemplate(category[index]);

            $('.modal').append(item);
        }   
    }
})
//===================================================




/**
 * Takes the clicked items from the overlay and appends them to the orderList accordingly.
 */
$('.modal').on('click','.product',function(){

    var item = $(this).attr('data-item');
    var price = $(this).attr('data-price');
    var compare = orderList.filter((el)=>el.item==item);
    var index = -1;

    if(compare.length > 0){
        index = orderList.indexOf(compare[0]); 
    }

    if(index != -1){
        orderList[index]['qty']+=1;       
    }else{
        let objectItem = createOrderItem(item,price);
        orderList.push(objectItem);
    }

    $('.orderItems').html(insertOrderItems(orderList));
    $('.total').html(calculateTotal(orderList));
    
})

//=====================================================





/**
 * Closes the item menu modal
 * 
 */

$(document).keyup(function(e){
    if(e.which == 27){
        $('.overlay').hide();
    }
})


//====================================================





/**
 * Calculates order total
 * 
 * @param {*} param 
 */
function calculateTotal(param=[]){

    var total = 0;

    for (let index = 0; index < param.length; index++) {
        const element = param[index];
        total += element.price*element.qty;
    }

    return total.toFixed(2);

}

//==============================



/**
 * Creates a template for ordered items to be added to the order list
 * 
 * @param {*} orders 
 */
function insertOrderItems(orders = []){

    var template = ``;

    for (let index = 0; index < orders.length; index++) {
        const item = orders[index];
        template+= `<p> ${item.item} | ${item.qty} | ${item.price} </p>`;
        
    }

    return template
}


