function addCart() {
  var cart = JSON.parse(sessionStorage.getItem('result')) || [];
  console.log(cart);
  $('.detail-cart').remove();
  for (var i = 0; i < cart.length; i++) {
    var frame = $('<div class="frame col-md-12"></div>')
    var detail = $('<div class="detail-cart col-md-12"></div>');
    var img = $('<div class="image col-md-3"><img src="' + cart[i][0].pImg + '"></div>');
    var name = $('<div class="name col-md-3"><span>' + cart[i][0].pName + '</span></div>');
    var quantity = $('<div class="quantity col-md-2"><input id="quan-' + cart[i][0].pId + '" type="number" name="quantity" min="1" max="20" value="' + cart[i][0].pQuan + '" onchange="changeQuantity(' + cart[i][0].pId + ')"></div>');
    var price = $('<div class="price-tag col-md-2"><span>' + cart[i][0].pPrice + '</span></div>');
    var del_btn = $('<div class="btn-delete col-md-2"><button type="button" class="btn btn-danger" onclick="del(' + cart[i][0].pId + ')">Xoá</button></div>');
    detail.append(img, name, quantity, price, del_btn);
    frame.append(detail);
    $('.frame-total').append(frame);
  }
}

function changeQuantity(id) {
  var cart = JSON.parse(sessionStorage.getItem('result')) || [];
  var choose = "#quan-" + id;
  var quantity = $(choose).val();
  console.log(quantity);
  var i = 0;
  var b = true;
  while (i < cart.length && b) {
    if (cart[i][0].pId === id) {
      b = false;
      var number = sessionStorage.getItem('quantity');
      var num = Number(number) - cart[i][0].pQuan + Number(quantity);
      sessionStorage.setItem('quantity', num);
      cart[i][0].pQuan = Number(quantity);
      sessionStorage.setItem('result', JSON.stringify(cart));
      console.log(cart);
    }
    i++;
  }
  addPrice();
}

function del(id) {
  var cart = JSON.parse(sessionStorage.getItem('result')) || [];
  var i = 0;
  var b = true;
  while (i < cart.length && b) {
    if (cart[i][0].pId === id) {
      b = false;
      var number = sessionStorage.getItem('quantity');
      var num = Number(number) - cart[i][0].pQuan;
      sessionStorage.setItem('quantity', num);
      cart.splice(i, 1);
      sessionStorage.setItem('result', JSON.stringify(cart));
      console.log(cart);
    }
    i++;
  }
  addCart();
}

function addPrice() {
  var cart = JSON.parse(sessionStorage.getItem('result')) || [];
  $('.total-price').remove();
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    console.log(typeof cart[i][0].pQuan);
    total += cart[i][0].pPrice * cart[i][0].pQuan;
    console.log(total);
  }
  var total_price = $('<span class="total-price">' + total + '</span>');
  $('.price').append(total_price);
}

window.onload = function() {
  addCart();
  addPrice();
}
