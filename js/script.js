// Smooth scroll
$(document).on('click','a[href^="#"]',function(e){
  const t=$(this.getAttribute('href'));
  if(t.length){e.preventDefault();$('html,body').animate({scrollTop:t.offset().top-68},620);}
});

// Navbar + scroll top
$(window).on('scroll',function(){
  const s=$(this).scrollTop();
  s>60?$('#nav').addClass('scrolled'):$('#nav').removeClass('scrolled');
  s>400?$('#stt').addClass('show'):$('#stt').removeClass('show');
});

// Reveal on scroll
const ro=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('show');});},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));
$(function () {

    /* ════════════════════════════
       HERO CAROUSEL — jQuery manual
    ════════════════════════════ */
    var INTERVAL = 5000;
    var ANIM_DUR = 750;
    var $items = $('.carousel-item');
    var $dots = $('.hp-dot');
    var total = $items.length;
    var current = 0;
    var isAnimating = false;

    /* Navbar scroll */
    $(window).on('scroll', function () {
        $('#mainNav').toggleClass('scrolled', $(this).scrollTop() > 50);
    });

    /* goTo */
    function goTo(next, fromLeft) {
        if (isAnimating || next === current) return;
        isAnimating = true;
        $items.eq(current).find('.hero-slide').removeClass('do-animate');
        $items.eq(next).removeClass('sliding-in from-left active').addClass('sliding-in' + (fromLeft ? ' from-left' : ''));
        setTimeout(function () {
            $items.eq(current).removeClass('active sliding-in from-left');
            $items.eq(next).removeClass('sliding-in from-left').addClass('active');
            var $hs = $items.eq(next).find('.hero-slide');
            $hs.removeClass('do-animate');
            void $hs[0].offsetHeight;
            $hs.addClass('do-animate');
            current = next;
            isAnimating = false;
            updateDots();
            startFill();
        }, ANIM_DUR);
    }

    function goNext() { goTo((current + 1) % total, false); }
    function goPrev() { goTo((current - 1 + total) % total, true); }

    /* Dots */
    function updateDots() {
        $dots.removeClass('active');
        $dots.eq(current).addClass('active');
    }

    /* Progress fill — jQuery animate drives the timer */
    function startFill() {
        $('.hp-dot-fill').stop(true).css('width', '0%');
        $dots.eq(current).find('.hp-dot-fill').animate({ width: '100%' }, {
            duration: INTERVAL,
            easing: 'linear',
            complete: function () { goNext(); }
        });
    }

    /* Pause/resume on hover */
    $('#heroCarousel').on('mouseenter', function () {
        $('.hp-dot-fill').stop(true);
    }).on('mouseleave', function () {
        var fillW = parseFloat($dots.eq(current).find('.hp-dot-fill').css('width')) || 0;
        var dotW = parseFloat($dots.eq(current).width()) || 60;
        var rem = Math.round(INTERVAL * (1 - fillW / dotW));
        $dots.eq(current).find('.hp-dot-fill').animate({ width: '100%' }, {
            duration: rem < 100 ? INTERVAL : rem,
            easing: 'linear',
            complete: function () { goNext(); }
        });
    });

    /* Touch swipe */
    var tx = 0;
    document.getElementById('heroCarousel').addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
    document.getElementById('heroCarousel').addEventListener('touchend', function (e) {
        var d = tx - e.changedTouches[0].clientX;
        if (Math.abs(d) > 50) { $('.hp-dot-fill').stop(true); if (d > 0) goNext(); else goPrev(); startFill(); }
    }, { passive: true });

    /* Buttons */
    $('#cNext').on('click', function () { $('.hp-dot-fill').stop(true); goNext(); });
    $('#cPrev').on('click', function () { $('.hp-dot-fill').stop(true); goPrev(); });

    /* Dot clicks */
    $dots.on('click', function () {
        var idx = parseInt($(this).data('idx'));
        if (idx === current) return;
        $('.hp-dot-fill').stop(true);
        goTo(idx, idx < current);
    });

    /* Init */
    setTimeout(function () {
        $items.eq(0).find('.hero-slide').addClass('do-animate');
        startFill();
    }, 200);

});

$(function(){

  /* Filter */
  $('.fbtn').on('click', function(){
    $('.fbtn').removeClass('active');
    $(this).addClass('active');
    var f = $(this).data('f');
    if(f === 'all'){
      $('.gi').removeClass('hidden').hide().fadeIn(340);
    } else {
      $('.gi').each(function(){
        $(this).data('cat') === f
          ? $(this).removeClass('hidden').hide().fadeIn(340)
          : $(this).addClass('hidden').hide();
      });
    }
  });

  /* Lightbox open */
  $('.gi').on('click', function(){
    $('#lbi').attr('src', $(this).find('img').attr('src'));
    $('#lb').addClass('open');
  });

  /* Lightbox close */
  $('#lbx, #lb').on('click', function(e){
    if(e.target.id === 'lb' || $(e.target).closest('#lbx').length){
      $('#lb').removeClass('open');
      setTimeout(function(){ $('#lbi').attr('src',''); }, 300);
    }
  });
  $(document).on('keydown', function(e){
    if(e.key === 'Escape') $('#lb').removeClass('open');
  });

});