$(document).ready(function() {

    $('#datetimepicker1').datetimepicker();

   setNavActive();

    initToggle();
    // $('.isAdmin').bootstrapToggle('on');

    $('.isAdmin').change(function () {
        var $id = $(this).closest("tr").find(".id").text();
        var isAdmin = $(this).prop('checked');
        console.log("ID:" + $id + "-->" + isAdmin);
        $.post("/admin/update-role", {
            id: $id,
            isAdmin: isAdmin
        }).done(function (data) {
            if (data === 'ok') {
                location.reload();
            }
            else {
                alert('Errore con il database');
            }
        });
    });


    $(".delete-button").click(function () {
        var $id = $(this).closest("tr").find(".id").text();

        $.post("/admin/delete", {
            id: $id
        }).done(function (data) {
            if (data === 'ok') {
                location.reload();
            }
            else {
                alert('Errore con il database');
            }
        });

    });

    initToggle2();

    $('.isTeknikTest').change(function () {
        var $id = $(this).closest("tr").find(".id").text();
        var isTeknikTest = $(this).prop('checked');
        $.post("/admin/update-teknik-role", {
            id: $id,
            isTeknikTest: isTeknikTest
        }).done(function (data) {
            if (data === 'ok') {
                location.reload();
            }
            else {
                alert('Errore con il database');
            }
        });
    });
});

function initToggle() {

    $('.isAdmin').each(function () {

        var isAdmin = $(this).attr('data-isAdmin');

        if (isAdmin === 'true'){
            $(this).bootstrapToggle('on');
        }
        else {
            $(this).bootstrapToggle('off');
        }
    });
}

function initToggle2() {

    $('.isTeknikTest').each(function () {

        var isTeknikTest = $(this).attr('data-isTeknikTest');

        if (isTeknikTest === 'true'){
            $(this).bootstrapToggle('on');
        }
        else {
            $(this).bootstrapToggle('off');
        }
    });
}

function setNavActive() {

    var curr = window.location.pathname;

    $("#navigator").find(".active").removeClass("active");
    $("#navigator a").each(function () {

        var href = $(this).attr('href');
        if (curr == href) {
            $(this).parent().addClass("active");
        }

    });
}