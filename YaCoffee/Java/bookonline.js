var listOfTables = null;
var choosenTable = null;

function BranchChoose(id){
  var xmlHttp = new XMLHttpRequest();
  var received = false;

  //Set http packet to send
  xmlHttp.open("POST", '/book/TablesAtBranch', true ); // false for synchronous request, using false with GET
  xmlHttp.setRequestHeader("Content-type", "application/json");
  xmlHttp.send(JSON.stringify({idBranch: id}));
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.status == 200) {
      var res = JSON.parse(xmlHttp.responseText);
      listOfTables = res;
      console.log(res)
      $("#tables").empty();
      $.each(res, function(idx, item){
        $("#tables").append('<label class="rad"><input type="radio" name="fb" value="small" />\
                            <img type="radio" src="' + item.imageDirect +
                            '" alt="" class="swiper-slide" onclick="javascript:TableChoose('
                            + item.idTable + ')"></label>')
      });
    }
  }
}
function TableChoose(idTable){
  choosenTable = idTable;
}

function BookTable(){
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var date = document.getElementById("date").value;
  var stime = document.getElementById("stime").value;
  var etime = document.getElementById("etime").value;
  var msg = document.getElementById("msg").value;
  var xmlHttp = new XMLHttpRequest();
  var bookInfo = {
    idTable: choosenTable,
    date: date,
    startTime: stime,
    endTime: etime,
    phone: phone,
    name: name,
    message: msg
  }

  xmlHttp.open("POST", '/auth/bookTableAtBranch', true ); // false for synchronous request, using false with GET
  xmlHttp.setRequestHeader("Content-type", "application/json");
  xmlHttp.send(JSON.stringify(bookInfo));
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.status == 200) {
      //var res = JSON.parse(xmlHttp.responseText);
    }
  }
}
// Validating Empty Field
function check_empty() {
  if (document.getElementById('name').value == "" || document.getElementById('email').value == "" || document.getElementById('msg').value == "") {
    alert("Fill All Fields !");
  } else {
    document.getElementById('form').submit();
    alert("Form Submitted Successfully...");
  }
}
//Function To Display Popup
function div_show() {
  document.getElementById('abc').style.display = "block";
}
//Function to Hide Popup
function div_hide(){
  document.getElementById('abc').style.display = "none";
}

window.onload = function() {
  var xmlHttp = new XMLHttpRequest();
  var received = false;
  //Set http packet to send
  xmlHttp.open("GET", '/book/getBranches', true ); // false for synchronous request, using false with GET
  xmlHttp.send(null);
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.status == 200) {
      var res = JSON.parse(xmlHttp.responseText);
      if (received == false){
        $.each(res, function(idx, item){
            $("#branch").append('<div class="card"><input type="image" src="' + item.imageDirect +
          '" alt="Card image cap" width=50% height=50% onclick="BranchChoose('+ item.idBranch +
          '),div_show()"><p class="card-text"><b>Address</b>: ' + item.Address +
          '</p><p class="card-text"><b>Phone</b>: ' + item.phone +
          '</p></div>')
        })
      }
      received = true;
    }
  }
}
