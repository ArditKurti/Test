$(document).ready(function() {
    reportQa();
});

function reportQa() {
    function cb(start, end) {
        $('#fromToRangeReportQA span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
    }

    $('#fromToRangeReportQA').daterangepicker({
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
        ranges: {
            'Today': [
                moment(), moment()
            ],
            'Yesterday': [
                moment().subtract(1, 'days'),
                moment().subtract(1, 'days')
            ],
            'Last 7 Days': [
                moment().subtract(6, 'days'),
                moment()
            ],
            'Last 30 Days': [
                moment().subtract(29, 'days'),
                moment()
            ],
            'This Month': [
                moment().startOf('month'), moment().endOf('month')
            ],
            'Last Month': [
                moment().subtract(1, 'month').startOf('month'),
                moment().subtract(1, 'month').endOf('month')
            ]
        }
    }, cb);

    var drpQa = $('#fromToRangeReportQA').data('daterangepicker');

    var tableQa = $('#report_table').DataTable({
        "paging": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "scrollX": true,
        "dom": 'Bfrtip',
        "buttons": [
            {
                extend: 'csv',
                text: 'Export'
            },
            'copy'
        ],
        responsive: true,
        ajax: {
            url: "/report/get-all",
            type: "POST",
            data: function(d) {
                d.startTime = drpQa.startDate.format();
                d.endTime = drpQa.endDate.format();
            },
            dataSrc: "data"
        },

        aoColumns: [
            {
                "mData": "klienti"
            }, {
                "mData": "kerkesa"
            }, {
                "mData": "zona"
            }, {
                "mData": "data"
            }, {
                "mData": "telefon"
            }, {
                "mData": "celular"
            }, {
                "mData": "mail"
            }, {
                "mData": "statusi"
            },
            {
                "mData": "problemi"
            },
            {
                "mData": "konstatimiProblemit"
            },
            {
                "mData": "createdBy"
            },
            {
                "mData": "createdAt"
            }

        ]

    });

    $('#fromToRangeReportQA').on('apply.daterangepicker', function(ev, picker) {
        //do something, like clearing an input
        tableQa.ajax.reload();
    });

    $('#searchReportTable').keyup(function() {
        tableQa.search($(this).val()).draw();
    });

    tableQa.column(1).visible(false);
    tableQa.column(4).visible(false);
    tableQa.column(5).visible(false);
    tableQa.column(8).visible(false);
    tableQa.column(9).visible(false);


}