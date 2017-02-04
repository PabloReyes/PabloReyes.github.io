---
layout: null
---
$(document).ready(function () {

  $('.btn-mobile-menu').click(function () {
    $('.navigation-wrapper').toggleClass('visible animated bounceInDown')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })

    $('.navigation--blog').click(function(e){
      e.preventDefault();
      var panel = $('.panel-cover');
      if(panel.hasClass('panel-cover--collapsed')){
          panel.removeClass('panel-cover--collapsed');
      }
      else{
          panel.addClass('panel-cover--collapsed');
      }
    });
})
