(function($) {

    "use strict";

    const animate = function() {
        var animates = $('.animated-paused').toArray();
        var progress = $('[role="progressbar"]').toArray();
        animates.forEach(element => {
            var windowHeight = window.innerHeight;
            var elementTop = element.getBoundingClientRect().top;
            var elementVisible = 100;
            if (elementTop <= windowHeight - elementVisible) {
                $(element).addClass("active");
            } else {
                $(element).removeClass("active");
            }
        });

        progress.forEach(element => {
            var windowHeight = window.innerHeight;
            var elementTop = element.getBoundingClientRect().top;
            var elementVisible = 10;
            if (elementTop <= windowHeight - elementVisible) {
                var valuenow = $(element).attr('aria-valuenow');
                $(element).css("width", valuenow + "%");
                $(element).text(valuenow + "%")
            } else {
                $(element).removeClass("active");
            }
        });
    }

    var fullHeight = function() {

        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function() {
            $('.js-fullheight').css('height', $(window).height());
        });

    };
    fullHeight();

    $('#sidebarCollapse').on('click', function() {
        $('#sidebar').toggleClass('active');
        $('.sidebar-container').toggleClass('active');
    });

    $(window).scroll(function() {
        animate();
        let scroll = $(window).scrollTop();
        let headers = $("[data-content]").toArray();
        let scrollMax = $(document).height() - $(window).height();
        let sectionRatio = scrollMax / headers.length;
        let section = parseInt(scroll / sectionRatio);

        section = section < 0 ? 0 : section;
        section = section >= headers.length ? headers.length - 1 : section;

        var content = $(headers[section]).data('content');
        $('[data-sidebar-content]').removeClass("active");
        $('[data-sidebar-content="' + content + '"]').addClass("active");
    });

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
})(jQuery);