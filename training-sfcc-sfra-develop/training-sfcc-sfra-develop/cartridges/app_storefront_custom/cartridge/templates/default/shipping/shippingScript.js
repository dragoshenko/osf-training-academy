$(document).ready(function() {
    // Character count for comments
    $('#comments').on('input', function() {
        var charCount = $(this).val().length;
        $('#charCount').text(charCount + '/150');
    });

    // Scroll to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#scrollTopBtn').fadeIn();
        } else {
            $('#scrollTopBtn').fadeOut();
        }
    });

    $('#scrollTopBtn').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        return false;
    });
});