$(document).ready(function(){
  var bigObject

  renderCardSet()

  var win = $(window);
  win.scroll(function() {
		var scrollHeight = $(document).height() - win.height()
    if ( scrollHeight > win.scrollTop() - 10 && scrollHeight < win.scrollTop() + 10) {
			renderCardSet();
    }
	});
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
  var temp =  $('#temp').html()
  return temp
}
