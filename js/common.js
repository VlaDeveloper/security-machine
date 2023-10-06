// $('body').hide()

$('.sec-inner').equalHeight();

$(".sec-carousel").owlCarousel({
	items: 1,
	dots: false,
	nav: true,
	navText: ['<img class="img-svg" src="images/angle-left-solid.svg" alt="Left">','<img class="img-svg" src="images/angle-right-solid.svg" alt="Right">']
});

$("img.img-svg").each(function(){var t=$(this),r=t.attr("id"),a=t.attr("class"),e=t.attr("src");$.get(e,function(e){var i=$(e).find("svg");void 0!==r&&(i=i.attr("id",r)),void 0!==a&&(i=i.attr("class",a+" replaced-svg")),!(i=i.removeAttr("xmlns:a")).attr("viewBox")&&i.attr("height")&&i.attr("width")&&i.attr("viewBox","0 0 "+i.attr("height")+" "+i.attr("width")),t.replaceWith(i)},"xml")});

