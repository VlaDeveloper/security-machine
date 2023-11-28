// $('body').hide()
$(function () {
	
	// Внедряем статистику
	function renderChart() {
		const ctx = document.getElementById('myChart');

		const cfg = {
			type: 'pie',
			data: {
				datasets: [{
					data: [{id: 'Detections', nested: {value: 10}}, {id: 'Errors', nested: {value: 20}}, {id: 'Undefined', nested: {value: 15}}]
				}],
				labels: ['Обнаружений', 'Ошибок', 'Не определено']
			},
			options: {
				parsing: {
					key: 'nested.value'
				}
			}
		}
		
		
		const ctx2 = document.getElementById('myChartPop');
		

		new Chart(ctx, cfg);
		new Chart(ctx2, cfg);
	}

	renderChart()

	$(window).scroll(function(){
		if($(window).scrollTop() > 50){
				$('.top-line').addClass('active');
			}else{
				$('.top-line').removeClass('active');
			}
	});

	$(".sec-carousel").owlCarousel({
		items: 1,
		dots: false,
		nav: true,
		navText: ['<img class="img-svg" src="images/angle-left-solid.svg" alt="Left">','<img class="img-svg" src="images/angle-right-solid.svg" alt="Right">']
	});
	
	$("img.img-svg").each(function(){var t=$(this),r=t.attr("id"),a=t.attr("class"),e=t.attr("src");$.get(e,function(e){var i=$(e).find("svg");void 0!==r&&(i=i.attr("id",r)),void 0!==a&&(i=i.attr("class",a+" replaced-svg")),!(i=i.removeAttr("xmlns:a")).attr("viewBox")&&i.attr("height")&&i.attr("width")&&i.attr("viewBox","0 0 "+i.attr("height")+" "+i.attr("width")),t.replaceWith(i)},"xml")});

	$('.sec-carousel-item').each(function(e){
		$(this).find('.sec-carousel-link').attr('href', '#sec-carousel-popup-' + e);
		$(this).find('.sec-carousel-popup').attr('id', 'sec-carousel-popup-' + e);
	});
	$('.sec-carousel-link').magnificPopup();

	$('.sec-statistic').magnificPopup();
	
	$('.sec-settings-btn').magnificPopup();

	function makeEqual() {
		$('.sec-inner').height('auto').equalHeight();
	}

	makeEqual()
	
	$(window).resize(function () {
		makeEqual()
	})


})