var topPhoto = false;
var myMap = false;
var popMap = false;
var canAuto = true;

$(document).ready(function()
  {

    $('input:text').live('keypress', function(event)
      {
        if(event.which == 0) return true;
        var trg = event.target;
        var res = 0;

        if($(trg).hasClass('digit')) if(!in_array(event.which,[8, 45, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57])) res++;
        if($(trg).hasClass('ceil')) if(!in_array(event.which,[8, 45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57])) res++;
        if($(trg).hasClass('positive')) if(!in_array(event.which,[8, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57])) res++;
        if($(trg).hasClass('phone')) if(!in_array(event.which,[8, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 41, 40, 32, 45])) res++;

        if(res > 0) {event.keyCode = 0; return false;}
      }
    );

    $('.close-dlg, #dlgOverlay').live('click', function()
      {
        $("#dlgOverlay").css("display", "none");
        $("#dlgBox").css("display", "none");
        $("#mapup").css("display", "none");
      }
    );


    $(window).scroll(function ()
      {
        if ($("#dlgBox").css('display') == 'block') $("#dlgBox").center();
        if ($("#mapup").css('display') == 'block') $("#mapup").center();
      }
    );

    $(window).resize(function()
      {
        if ($("#dlgBox").css('display') == 'block') $("#dlgBox").center();
        if ($("#mapup").css('display') == 'block') $("#mapup").center();
      }
    );

    //--------------------------------------
    $('.teams ul li a').click(function()
      {
        if($(this).hasClass('active')) return false;
        var thUrl = $(this).attr('href');
        $('.teams ul li a').removeClass('active');
        $(this).addClass('active');
        $('.replaceable').load(thUrl); // здесь можно чтонть дописать, если проблемы различать ajax-запрос, типо load(thUrl+'?type=js')
        // т.к. в случае перехода по ссылке робота - надо возвращать страницу целиком
        $('.teams h3 span').text($(this).text());
        return false;
      }
    );

    //--------------------------------------
    $('.service ul li a').click(function()
      {
        if($(this).hasClass('active')) return false;
        var thUrl = $(this).attr('href');
        $('.service ul li a').removeClass('active');
        $(this).addClass('active');
        $('.replaceable').load(thUrl);
        $('.service h3 span').text($(this).text());
        return false;
      }
    );

    //--------------------------------------
    $('.service table td a').live('click', function()
      {
        var thUrl = $(this).attr('href');
        $("#dlgOverlay").css('display', 'block');
        $('#dlgBox').load(thUrl).css('display', 'block').center();
        return false;
      }
    );


    $('.give').click(function()
      {
        var destination = $('#review_form').offset().top;
        $("html,body").animate({scrollTop: destination}, 200);
        $('#review_form').find('input[name="user_name"]').focus();
        return false;
      }
    );


    if($('.index-wrap').length) {
      var auto = true;
      var autostopped = false;

      var sudoSlider1 = $(".index-wrap").sudoSlider(
        {
          // customLink:'a.slider-scroll',
        responsive: false,
        prevNext: false,
        numeric: true,
        continuous: true,
        slideCount: 1,
        auto: true,
        effect: 'fade',
          //controlsFadeSpeed:2800,
        speed: 800,
        pause: 6000,
          //resumePause: 90000,
        beforeAnimation: function(slide) {
            if(!canAuto) sudoSlider1.stopAuto();
          },
        afterAnimation: function(slide) {
            var nextDiv = $('.frame_'+slide);
            if($(nextDiv).hasClass('active')) return false;
            $('.slider-menu div').removeClass('active');

            var thSp = $(nextDiv).children('span')[0];
            var thLn = $(thSp).children('a')[0];
            var thH = parseInt($(thLn).height()) +1;
            var thCd = $(thSp).children('code')[0];
            $(thCd).css('height', thH+'px');
            $(nextDiv).addClass('active');
          }
        }
      ).mouseenter(function() {
          auto = sudoSlider1.getValue('autoAnimation');
          if (auto)
          {
            sudoSlider1.stopAuto();
          }
          else
          {
            autostopped = true;
          }
        }
      ).mouseleave(function() {
          if (!autostopped)
          {
            sudoSlider1.startAuto();
          }
        }
      );
    }

    if($('.slider-box').length) {
      var auto = true;
      var autostopped = false;

      var sudoSlider2 = $(".slider-box").sudoSlider(
        {
        customLink: 'a.slider-scroll',
        responsive: false,
        prevNext: false,
        numeric: false,
        continuous: true,
        slideCount: 8,
        auto: true,
        }
      ).mouseenter(function() {
          auto = sudoSlider2.getValue('autoAnimation');
          if (auto)
          {
            sudoSlider2.stopAuto();
          }
          else
          {
            autostopped = true;
          }
        }
      ).mouseleave(function() {
          if (!autostopped)
          {
            sudoSlider2.startAuto();
          }
        }
      );
    }

    if($('.iStack-wrap').length) {
      shuffleImg();

      $('.iStack-wrap a').live('click', function()
        {
          if($(this).hasClass('topPhoto')) {
            $.colorbox({href: $(this).attr('href'), otransition: "fade", opacity: "0.15", maxWidth: "96%", maxHeight: "96%", scrolling: false, photo: true, retinaImage: true});
            return false;
          } else {
            centerPhoto(this);
            //$('a.topPhoto').colorbox({otransition:"fade", opacity:"0.15", maxWidth:"96%", maxHeight:"96%",  scrolling:false, photo:true, retinaImage:true });
            return false;
          }
        }
      );

      $('.iStack-wrap a').mouseover(function()
        {
          if(topPhoto) return false;
          $('.iStack-wrap a').css('z-index', 3);
          $('.iStack-wrap a').find('img').css('opacity', 0.6);
          $(this).css('z-index', 15);
          $(this).find('img').css('opacity', 1);
        }
      ).mouseout(function() {
          /*
        if(topPhoto) {
          $(this).css('z-index', 3);
          $(this).find('img').css('opacity', 0.6);
          $(topPhoto).find('img').css('opacity', 1);
          $(topPhoto).css('z-index', 15);
        }     */
        }
      );
    }

    if($('.salon-foto').children()) {
      $('.salon-foto li > a').click(function()
        {//         if( $(this).hasClass('slider-scroll') ) return false;
          var thUrl = $(this).attr('href');
          var newObj = '<a href="'+thUrl+'" title="" data-index="9" style="z-index:20"><img src="'+thUrl+'" alt=""></a>';
          $(newObj).appendTo('.iStack-wrap');
          var lastImg = $('.iStack-wrap a:last-child');
          $(lastImg).css('display', 'block');
          $(lastImg).height($(lastImg).find('img').height() -1);
          $(lastImg).find('img').css('opacity', 1);
          centerPhoto($(lastImg));
          return false;
        }
      )

    }


    if($('#map').length) {
      function map_show () {
        if(!myMap) {
          myMap = new ymaps.Map("map", {center:[55.7757, 37.6963], zoom: 15, type: 'yandex#satellite'});
          var myPlacemark = new ymaps.Placemark(
            [55.7738, 37.6959], {
              //hintContent: 'Имидж-студия Лукаш'
            }, {
            iconImageHref: '../img/map-icon.png',
            iconImageSize:[82, 98],
            iconImageOffset:[-37, -102]
            }
          );
          myMap.geoObjects.add(myPlacemark);

        } else {
          myMap.setCenter([55.7757, 37.6963], 15, 'SATELLITE');
        }
      }

      ymaps.ready(map_show);

    }

    if($('#popmap').length) {
      function popmap_show () {
        if(!popMap) {
          popMap = new ymaps.Map("popmap", {center:[55.7757, 37.6963], zoom: 15, type: 'yandex#satellite'});
          var myPlacemark = new ymaps.Placemark(
            [55.7738, 37.6959], {
              //hintContent: 'Имидж-студия Лукаш'
            }, {
            iconImageHref: '../img/map-icon.png',
            iconImageSize:[82, 98],
            iconImageOffset:[-37, -102]
            }
          );
          popMap.geoObjects.add(myPlacemark);

        } else {
          popMap.setCenter([55.7757, 37.6963], 15, 'SATELLITE');
        }
      }

      ymaps.ready(popmap_show);

    }

    $('.map-link a').click(function()
      {
        $("#dlgOverlay").css('display', 'block');
        $('#mapup').css('display', 'block').center();
        if(popMap) {
          popMap.container.fitToViewport();
          popMap.setCenter([55.7746, 37.6963], 15, 'SATELLITE');
        }
        return false;
      }
    );

    $('.slider-menu').mouseover(function()
      {
        canAuto = false;
      }
    ).mouseout(function() {
        canAuto = true;
      }
    );

    $('.slider-menu div').mouseover(function()
      {
        $('.slider-menu div').removeClass('active');
        $(this).addClass('active');
        var thSp = $(this).children('span')[0];
        var thLn = $(thSp).children('a')[0];
        var thH = parseInt($(thLn).height()) +1;
        var thCd = $(thSp).children('code')[0];
        $(thCd).css('height', thH+'px');
        sudoSlider1.goToSlide($(this).data('index'));

        sudoSlider1.stopAuto();
      }
    ).mouseout(function() {
        sudoSlider1.startAuto();

      }
    );


  }
); // -- document.ready

function centerPhoto(theObj) {

  var defX =[20, 560, 40, 120, 440, 585, 245, 330];
  var defY =[15, 58, 220, 320, 250, 210, 30, 180];

  var cPos = $('.iStack-wrap').offset();
  var cHeight = $('.iStack-wrap').height();
  var cWidth = $('.iStack-wrap').width();

  var newY = parseInt((cHeight/2) - ($(theObj).height() /2));
  var newX = parseInt((cWidth/2) - ($(theObj).width() /2));

  if(topPhoto) {
    var ind = $(topPhoto).data('index');
    //  var ind = $(theObj).data('index');
    var oldX = defX[ind];
    var oldY = defY[ind];
    $(topPhoto).animate(
      {
      top: oldY,
      left: oldX,
      }, 'slow', function() {
      }
    );
  }
  $('.iStack-wrap a').removeClass('topPhoto');
  $('.iStack-wrap a').css('z-index', 3);
  $('.iStack-wrap a').find('img').css('opacity', 0.6);

  $(theObj).css('z-index', 15);
  $(theObj).find('img').css('opacity', 1);
  $(theObj).addClass('topPhoto');

  $(theObj).animate(
    {
    top: newY,
    left: newX,
    }, 'slow', function() {
    }
  );
  topPhoto = theObj;

}


function shuffleImg() {
  var zIndex = 3;
  var inImg;
  var childImg = $('.iStack-wrap').find('a');
  $(childImg).each (function(i)
    {
      zIndex++;
      $(this).css('z-index', zIndex);
      $(this).css('display', 'block');

      inImg = $(this).children('img').get(0);
      // $(this).css('height', $(inImg).height()+'px');
      $(this).height($(inImg).height() -1);
      $(this).width(350);
      // moveRandom(this, $(inImg).height(), 350, i);
    }
  );

  $('.iStack-wrap a:last-child').css('z-index', 15);
  $('.iStack-wrap a:last-child').find('img').css('opacity', 1);
}
/*
function randomFromTo(minn, maxx){
   // return Math.floor(Math.random() * (maxx - minn + 1) + minn);
    //return Math.round(Math.random() * (maxx - minn + 1) + minn);
    return (Math.random() * maxx | 0) + minn
}

function moveRandom(aImg, bHeight, bWidth, ind) {
  var randX = [17, 300, 630, 450, 210, 790, 150, 600, 490, 100, 600];
  var randY = [180, 10, 320, 120, 400, 200, 100, 50,  210, 300, 350];

    // get container position and size
    // * -- access method : cPos.top and cPos.left
    var cPos = $('.iStack-wrap').offset();
    var cHeight = $('.iStack-wrap').height() - 300;
    var cWidth = $('.iStack-wrap').width() - 300;

    // get box padding (assume all padding have same value)
    var pad = 15; // parseInt($('.iStack-wrap').css('padding').replace('px', ''));

        // get movable box size
        //var bHeight = $(aImg).height();
       // var bWidth = $(aImg).width();

        // set maximum position
        maxY = (cPos.top - 350) + cHeight - bHeight - pad;
        maxX = (cPos.left -250) + cWidth - bWidth - pad;

        // set minimum position
        minY = cPos.top + pad;
        minX = cPos.left + pad;

        // set new position
        //newY = randomFromTo(minY, maxY);
        //newX = randomFromTo(minX, maxX);
        // alert(minY+'\n'+maxY+'\n'+newY);
        ind = randomFromTo(0, 10);
        newY = randY[ind];
        newX = randX[ind];

       // if (( cPos.left + newX + bWidth ) > $('.iStack-wrap').width() ) {
       //   newX = $('.iStack-wrap').width() - 12 - bWidth ;
       // }
       // if (( cPos.top + newY + bHeight ) > $('.iStack-wrap').height() ) {
       //   newY = $('.iStack-wrap').height() - 12 - bHeight ;
       // }

        $(aImg).animate({
            top: newY,
            left: newX,
            }, 'slow', function() {
        });


}      */


//----------------------------------------------------------------------------------------------------
function in_array(what, where) {
  for(var i = 0; i<where.length; i++)
    if(what == where[i])
    return true;
  return false;
}
//----------------------------------------------------------------------------------------------------
String.prototype.trim = function() {
  return this.replace(/^\s*?(\S*?)\s*$/, '$1');
};
//----------------------------------------------------------------------------------------------------
function getClientWidth() {
  return document.compatMode=='CSS1Compat' && !window.opera? document.documentElement.clientWidth: document.body.clientWidth;
}

function getClientHeight() {
  return document.compatMode=='CSS1Compat' && !window.opera? document.documentElement.clientHeight: document.body.clientHeight;
}
jQuery.fn.center = function() {
  var scrTop;
  var w = $(window);
  this.css("position", "absolute");
  scrTop = document.documentElement.scrollTop;
  if (scrTop == 0) scrTop = $("html").scrollTop() || $("body").scrollTop();
  this.css("top", scrTop + ((getClientHeight()- this.height())/2) + "px");
  // this.css("left",document.documentElement.scrollLeft + (((getClientWidth()-this.width())/2) - (this.width()/2)) + "px");
  this.css("left", document.documentElement.scrollLeft + ((getClientWidth()- this.width())/2) + "px");
  // if( ((getClientHeight()-this.height())/2) < 0 ) this.css("top", "10px");
  return this;
}