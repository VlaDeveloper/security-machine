// $('body').hide()
$(function () {
	
	$('.toggle-mnu').on('click', function() {
		// $(this).find('button').toggleClass('is-active')
		$('.nav-mobile').toggleClass('active')
		$('body').toggleClass('active-menu')
		// $('.hidden-mnu').slideToggle(function(){
		// 	if($(this).css('display') == 'none'){
		// 		$(this).removeAttr('style');
		// 	}
		// });
	});

	// Внедряем статистику
	function renderChart() {
		const ctx = document.getElementById('myChart');

		if (!ctx) {
			return
		}

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
		navText: ['<img class="img-svg" src="images/angle-left-solid.svg" alt="Left">','<img class="img-svg" src="images/angle-right-solid.svg" alt="Right">'],
		responsive:{
			0:{
				nav:false,
				dots: true
			},
			992:{
					// nav:false
			}
	}
	});
	
	$("img.img-svg").each(function(){var t=$(this),r=t.attr("id"),a=t.attr("class"),e=t.attr("src");$.get(e,function(e){var i=$(e).find("svg");void 0!==r&&(i=i.attr("id",r)),void 0!==a&&(i=i.attr("class",a+" replaced-svg")),!(i=i.removeAttr("xmlns:a")).attr("viewBox")&&i.attr("height")&&i.attr("width")&&i.attr("viewBox","0 0 "+i.attr("height")+" "+i.attr("width")),t.replaceWith(i)},"xml")});

	$('.sec-carousel-item').each(function(e){
		console.log(e);
		// $(this).attr('data-num', `${e+1}/${$('.sec-carousel-item').length}`)
		$(this).find('a').attr('data-num', `${e+1}/${$('.sec-carousel-item').length}`)
		$(this).find('.sec-carousel-link').attr('href', '#sec-carousel-popup-' + e);
		$(this).find('.sec-carousel-popup').attr('id', 'sec-carousel-popup-' + e);
	});
	$('.sec-carousel-link').magnificPopup();

	$('.sec-statistic').magnificPopup();
	
	$('.sec-settings-btn').magnificPopup();

	function makeEqual() {
		$('.sec-inner').height('auto').equalHeight();
	}

	// makeEqual()
	
	// $(window).resize(function () {
	// 	makeEqual()
	// })

	let resize = false;
	if($(window).width() > 992){
		makeEqual()
		resize = true;
	}
	
	if (resize === true){
		$(window).resize(function(){
			makeEqual()
		});	
	}

	// Parameters file script
	$('.pfile-icon').on('click', function () {
		$(this).parent('.sec-pgroup').find('.hidden-pfile').trigger('click')
	})

	$('.hidden-pfile').on('change', function (e) {
		// console.log('e: ', e);
		// console.log($(this).val());
		let fullPath = $(this).val()
		fullPath = fullPath.replace('C:\\fakepath\\', '')
		$(this).parent('.sec-pgroup').find('.ptext').val(fullPath)
	})
		// $(this).parent('.sec-pgroup').find('.hidden-pfile').trigger('click')

})