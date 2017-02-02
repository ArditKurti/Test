$(document).ready(function() {
    portlet();

    checkForAccountInValutazione();

    $('#zgjidhurButton').click( function () {
        mailPersonalizatto();
    });

    $('#paZgjidhurButton').click( function () {
        mailIrreperibile();
    } );



});

function portlet() {

    $('#portlet-show').off().on('click', function () {
        passDataWithAjax();
    });
}

function checkForAccountInValutazione() {
    $.ajax({
        type: "POST",
        url: "/problemi/check-account",
        success: function(data) {

            if(typeof data === 'object'){

                $('.portlet').removeClass('hidden');
                $('#portlet-show').addClass('hidden');
                $('#dataKlienti').val(data["klienti"]);
                $("#dataKerkesa").val(data["kerkesa"]);
                $("#dataZona").val(data["zona"]);
                $("#dataOra").val(data["data"]);
                $("#dataTelefon").val(data["telefon"]);
                $("#dataCelular").val(data["celular"]);
                $("#dataEmail").val(data["mail"]);
                $("#dataProblemi").val(data["problemi"]);
                $("#accountId").val(data["_id"]);

            }
            else {
                console.log('Ska Account ne Punim');
            }

        }
    });
}

function passDataWithAjax() {
    $.ajax({
        type: "POST",
        url: "/problemi/get-account",
        success: function(data) {
            if(data !== 'no account'){

                $('.portlet').removeClass('hidden');
                $('#portlet-show').addClass('hidden');
                $('#dataKlienti').val(data["klienti"]);
                $("#dataKerkesa").val(data["kerkesa"]);
                $("#dataZona").val(data["zona"]);
                $("#dataOra").val(data["data"]);
                $("#dataTelefon").val(data["telefon"]);
                $("#dataCelular").val(data["celular"]);
                $("#dataEmail").val(data["mail"]);
                $("#dataProblemi").val(data["problemi"]);
                $("#accountId").val(data["_id"]);
            }
            else {
                alert('Ska Account');
            }

        },
        error : function(){
            alert('Some error occurred!');
        }
    });
}

function mailPersonalizatto() {

    $.ajax({
        type: "POST",
        url: "/kerkesa/iZgjidhur",
        data: {
            "id" : $('#accountId').val(),
            "konstatimiProblemit": $('#dataKonstatim').val(),
            "statusi" : "zgjidhur"
        },
        success: function (data) {
            if(data === 'ok'){
                location.reload();
            }


        },
        error: function () {
            console.log('error')
        }
    })
}

function mailIrreperibile() {

    $.ajax({
        type: "POST",
        url: "/problemi/ePaZgjidhshme",
        data: {
            "id" : $('#accountId').val(),
            "konstatimiProblemit": $('#dataKonstatim').val(),
            "statusi" : "iPazgjidhur"
        },
        success: function (data) {
            if(data === 'ok'){
                location.reload();
            }


        },
        error: function () {
            console.log('error')
        }
    })
}