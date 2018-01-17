var indexpage = 1;
var timerslider;

$(document).ready(function() {
	
	//timerslider = setTimeout(timerpage, 7500);

	/* поиск */
	$('.searchbutton, .searchform>input[type="submit"]')
	.click(function(){
		if( $('.searchform').css('display') == 'none' )
		{
			$('.searchform').css('display','flex');
			$('.searchform>input[type="text"]').focus();
		}
		else
		{
			if( $('.searchform>input[type="text"]').val() == "" )
				$('.searchform').css('display','none');	
			else
				$('.searchform>input[type="text"]').val("");
		}
	});

	/* меню */

	$('.menuicon').click(function(){
		$('.menu>ul').css('display', $('.menu>ul').css('display')=='block'?'none':'block');
	});

	/* слайдер */

	$('.arrow.right').click(function(){
		changepage(true, 1);
	});

	$('.arrow.left').click(function(){
		changepage(true, -1);
	});

	$('.circle').click(function(){
		changepage(false, $(this).index());
	});

	var original = document.getElementsByClassName('page')[0];
    var clone = original.cloneNode(true);
    clone.id = "5";
    document.getElementsByClassName('pages')[0].appendChild(clone);

    original = document.getElementsByClassName('page')[3];
    clone = original.cloneNode(true);
    clone.id = "6";
    document.getElementsByClassName('pages')[0].appendChild(clone);
    $('.page#5').css({
    	left: "100%",
    	position: "absolute",
    	zIndex: "3"
    });
    $('.page#6').css({
    	left: "-100%",
    	position: "absolute",
    	zIndex: "3"
    });
});

function timerpage()
{
	changepage(true, 1);
	clearTimeout(timerslider);
	timerslider = setTimeout(timerpage, 7500);
}

function changepage(fromcurrent, val)
{
	clearTimeout(timerslider);
	timerslider = setTimeout(timerpage, 7500);
	if( fromcurrent == true ) //через стрелки
	{
		if( indexpage==4 && val>0 ) //ЕСЛИ ПОСЛЕДНЯЯ СТРАНИЦА ПЕРЕКЛЮЧАЕМ НА КЛОН
		{
			$('.page#5').css('left', "100%");
			$('.circle.active').removeClass('active');
				indexpage  = 1;
				$('.circle:nth-child('+indexpage+')').addClass('active');
			$('.page#5, .page').animate({
				left: "-=100%"
			}, 1500, function()
			{

				for( var i = 1; i < 5; i ++ )
				{
					$('.page:nth-child('+i+')').css('left', '0%');
				}
				
			});
		}
		else if( indexpage==1 && val<0 )  //ЕСЛИ ПЕРВАЯ СТРАНИЦА ПЕРЕКЛЮЧАЕМ НА КЛОН
		{
			$('.page#6').css('left', "-100%");
			$('.page#6, .page').animate({
				left: "+=100%"
			}, 1500, function()
			{
				$('.circle.active').removeClass('active');
				indexpage  = 4;
				$('.circle:nth-child('+indexpage+')').addClass('active');
				for( var i = 1; i < 5; i ++ )
				{
					$('.page:nth-child('+i+')').css('left', '-300%');
				}
				
			});
		}
		else
		{
			if( $('.page#5').css('left') == '0px' )
			{
				if( val<0 )
				{
					for( var i = 1; i < 5; i ++ )
					{
						$('.page:nth-child('+i+')').css('left', '300%');
					}
				}
				$('.circle.active').removeClass('active');
				indexpage += val;
				$('.circle:nth-child('+indexpage+')').addClass('active');
				$('.page').stop( true, false );
				$('.page#5, .page:not(#6)').animate({
					left: val>0?"-=100%":"+=100%"
				}, 1500, function(){
					$('.page#5').css('left', '100%');
				});
				
			}
			else if( $('.page#6').css('left') == '0px' )
			{
				$('.circle.active').removeClass('active');
				indexpage += val;
				$('.circle:nth-child('+indexpage+')').addClass('active');
				$('.page#6, .page:not(#5)').animate({
					left: val>0?"-=100%":"+=100%"
				}, 1500, function(){
					$('.page#6').css('left', '-100%');
				});
				
			}
			else
			{
				$('.circle.active').removeClass('active');
				indexpage += val;
				$('.circle:nth-child('+indexpage+')').addClass('active');
				$('.page:not(#'+(val>0?'5':'6')+')').animate({
					left: val>0?"-=100%":"+=100%"
				}, 1500);
			}
		}
	}
	else
	{
		var query = '.page:not(#5):not(#6)';
		if( $('.page#6').css('left') == '0px' )
		{
			$('.page#5').css('left', "100%");
			query = '.page:not(#5)';
		}
		else if( $('.page#5').css('left') == '0px' )
		{
			$('.page#6').css('left', "-100%");
			query = '.page:not(#6)';
		}
		val += 1;
		$('.circle.active').removeClass('active');
		$('.circle:nth-child('+indexpage+')').addClass('active');
		$(query).animate({
			left: (indexpage>val)?("+="+((indexpage-val)*100)+"%"):("-="+((val-indexpage)*100)+"%")
		}, 1500);
		indexpage = val;
	}
}