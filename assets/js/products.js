$(document).ready(function(){
    renderCardSet()
});

function renderCardSet() {
  $(".grid-row").html(renderContentRow())
  var temp = $(".grid-set").html()
  $(".grid-set").append(temp)
  $(".grid-set").append(temp)
}
function renderContentRow() {
  $(".grid-card").html(renderContentGrid())
  var temp = $(".grid-row").html()
  $(".grid-row").append(temp)
  $(".grid-row").append(temp)
}
function renderContentGrid() {
  var temp =  document.getElementById("temp").innerHTML
  return temp
}
