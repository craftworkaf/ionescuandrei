let menuItem = ''
let orderList = []
let orderType = 'delivery'

/**
 * Defauly hidden for the overlay.
 */
$(document).ready(function(){
    $('.overlay').hide();
})

//=========================================


/**
 * Template for generating an order item 
 * 
 * @param {*} obj 
 */
function modalTemplate(obj){
    var template = `<p class="product" data-item = "${obj.item}" data-price = ${obj.price} data-description = ${obj.description}> <br> ${obj.item}, <br>${obj.description}, <br>£ ${obj.price} </p>`
    return template;
}
//=============================================

/**
 * ========Generates the Edit order modal =================
 * @param {*} obj 
 * @param {*} index 
 */
function editOrderItem(obj,index){

    var template = 
        `<div class="editOrderModal">
                    
            <div class="editOrderTitle"> 
                <h1>${obj.item}</h1>
                <h1>£${obj.price}</h1>
            </div>

            <div class="editOrderDescription">
                <p>${obj.description}</p>
            </div>

            <div class="editOrderQty">
                <h3>Quantity</h3> 
                <h3 id="qty">${Number(obj.qty)}</h3>
            </div>
            
            <input type="range" id="quantity" onchange="showQuantity(this,${index})" min="1" max="10" value="${Number(obj.qty)}" class="slider" id="myRange">
                <br>
            
            <div class="editOrderComment "> 
                <h4>Comments</h4> 
                <textarea rows=3 id="comment">${obj.comment}</textarea> 
            </div>
                <br>
                
            <div class="editOrderButtons"> 
                <button onclick="saveItem(${index})" class="orderSaveBtn">Save</button> 
                <button onclick="deleteItem(${index})" class="orderDeleteBtn">Delete</button> 
            </div>

        </div>`

    return template  
}

/**===============End of Edit Order Modal================================= */


function showQuantity(order,index){
    $('#qty').text(order.value);
    // orderList[index].qty=order.value;
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

    return { item:item,description:description,comment:"",price:price, qty:1 }
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
    var description = $(this).attr('data-description');
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
    
});
//=====================================================





/**
 * ========= Hides the item menu modal when pressing Esc ================
 * 
 */

$(document).keyup(function(e){
    if(e.which == 27){
        $('.overlay').hide();
    }
})


$('.closeModal').click(function(){

    $('.overlay').hide();

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
        template+= `<div class="orderItem ${item.comment?'commented':''}"  data-index=${index} ><span class="mleft">${item.item}</span> <span>Qty: ${Number(item.qty)}</span> <span class="mright font20">£ ${item.price}</span> </div>`;

    }
    return template;
}




function orderItems(obj){
    var template = ``;
    return template;
}


$('.aside').on('click','.orderItem',function(){
    var index = $(this).attr('data-index');
    var obj = orderList[index];

    $('.modal').html(editOrderItem(obj,index));
    $('.overlay').show();

})

function saveItem(index){
    
    let comment = $('#comment').val();
    orderList[index].comment = comment;
    orderList[index].qty = $('#quantity').val();
    $('.overlay').hide();
    $('.orderItems').html(insertOrderItems(orderList));
    $('.totalOutput').html( '£'+ calculateTotal(orderList));

}




function deleteItem(i){
    console.log(i);

    // orderList = orderList.filter(function(el, index ) {
    //     return index !=i;
    // });

    let newOrderList = [];
    if(window.confirm("Are you sure ?")){
    for(let index = 0; index < orderList.length; index++){
            if(index != i){
                newOrderList.push(orderList[index])
            }
    }
    orderList = newOrderList;

    // orderlist=orderList.splice(index,1);

    $('.overlay').hide();
    $('.orderItems').html(insertOrderItems(orderList));
    $('.totalOutput').html( '£'+ calculateTotal(orderList));
    }
}

$('.aside').on('click','.cancelOrder',function(){

    if(window.confirm("Are you sure ?")){
        orderList = [];
        $('.orderItems').html(insertOrderItems(orderList));
        $('.totalOutput').html( '£'+ calculateTotal(orderList));
    }
});



function modal_Container(){

    var template = 
        `<div class="modal_container">
    
            <div class="top">
                <div class="left">
                    <div class="l1">
                    ${checkOrderType(orderType)}
                   

                    </div>
                    <div class="l2">
                    <h4>Payment Type</h4>
                    <button>Cash</button>
                    </div>
                <div class="l3">
                    <h4>Ammount</h4>
                    <input type="text">
                </div>
                </div>
            
                <div class="right">
                    <div class="r1">
                    <h3>Total</h3>
                    </div>
                    <div class="r2">
                    
                    <button>Card</button>
                    </div>
                <div class="r3">
                    <h4>Change</h4>
                    <h3>Ammount</h3>
                </div>
                </div>
                
            </div>
            
            <div class="bottom">
            <button>Pay</button>
            </div>
    
</div> `

    return template  
}


$('.aside').on('click','.completeOrder',function(){

    $('.modal').html(modal_Container());
    $('.overlay').show();
    


});

// $('.modal').on('click',"button",function(){
//     $(this).css({"background":"white","color":"black" })
// });

function checkOrderType(data){
    
    // if(data == 'in') {
    //     return `<button id="orderType" data-orderType="in" style="background-color:white; color:black">In</button>`
    // }else if(data == 'out'){
    //     return `<button id="orderType" data-orderType="out" style="background-color:white; color:black">Out</button>`
    // }else if(data=='delivery') {
    //     return `<button id="orderType" data-orderType="delivery" style="background-color:white; color:black">Delivery</button>`
    // }
    if(data == 'in') {
        return `<button id="orderType" data-orderType="in" style="background-color:white; color:black">In</button>
                <button id="orderType" data-orderType="out" style="background-color:none; color:white">Out</button>
                <button id="orderType" data-orderType="delivery" style="background-color:none; color:white">Delivery</button>`
    }else if(data == 'out'){
        return  `<button id="orderType" data-orderType="in" style="background-color:none; color:white">In</button>
                <button id="orderType" data-orderType="out" style="background-color:white; color:black">Out</button>
                <button id="orderType" data-orderType="delivery" style="background-color:none; color:white">Delivery</button>`
    }else if(data=='delivery') {
       return  `<button id="orderType" data-orderType="in" style="background-color:none; color:white">In</button>
                <button id="orderType" data-orderType="out" style="background-color:none; color:white">Out</button>
                <button id="orderType" data-orderType="delivery" style="background-color:white; color:black">Delivery</button>`
    }

    
}
