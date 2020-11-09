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
    var template = `<p class="product" data-item = "${obj.item}" data-price = ${obj.price} data-description = ${obj.description}> <br> ${obj.item}, <br>${obj.description}, <br>£ ${obj.price} </p>`
    return template;
}
//=============================================


function editOrderItem(obj,index){

var template = `
    <div class="editOrderModal">
                
       <div class="editOrderTitle"> <h1>${obj.item}</h1><h1>£${obj.price}</h1></div>

       <div class="editOrderDescription"><p>${obj.description}</p></div>

    <div class="editOrderQty"><h3>Quantity</h3> <h3 id="qty">${Number(obj.qty)}  </h3></div>
          
    <input type="range" onchange="showQuantity(this,${index})" min="1" max="10" value="${Number(obj.qty)}" class="slider" id="myRange">
    <br>
    <div class="editOrderComment"> <h4>Comments</h4> <textarea rows=3 ></textarea> </div>
    <br>
    <div class="editOrderButtons"> <button>Save</button><button>Close</button></div>
    </div>`

return template  

}

function showQuantity(order,index){
    $('#qty').text(order.value);
    orderList[index].qty=order.value;
    $('.orderItems').html(insertOrderItems(orderList));
    $('.totalOutput').html( '£'+ calculateTotal(orderList));
}



/**
 * Item template for the order list array
 * 
 * @param {*} item 
 * @param {*} price 
 */
function createOrderItem(item,description,price){

    return { item:item,description:description ,price:price, qty:1 }
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
    var description = $(this).attr('data-description')
    var compare = orderList.filter((el)=>el.item==item);
    var index = -1;

    if(compare.length > 0){
        index = orderList.indexOf(compare[0]); 
    }

    if(index != -1){
        orderList[index]['qty']++;       
    }else{
        let objectItem = createOrderItem(item,description,price);
        orderList.push(objectItem);
    }

    $('.orderItems').html(insertOrderItems(orderList));
    $('.totalOutput').html( '£'+ calculateTotal(orderList));
    
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


$('.closeModal').click(function(){

    $('.overlay').hide()

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

        template+= `<div class="orderItem" data-index=${index} ><span class="mleft">${item.item}</span> <span>Qty: ${Number(item.qty)}</span> <span class="mright font20">£ ${item.price}</span> </div>`;
    }
    return template
}




function orderItems(obj){
    var template = ``
    return template;
}


$('.aside').on('click','.orderItem',function(){
    var index = $(this).attr('data-index')
    var obj = orderList[index]

        // console.log(obj)
    $('.modal').html(editOrderItem(obj,index))
    $('.overlay').show()

})