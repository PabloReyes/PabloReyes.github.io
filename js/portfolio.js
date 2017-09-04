---
layout: null
---
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var initial_value_personal = 10000;
    var initial_value_benchmark = 33.15;
    var data_personal_returns = {
        "2016-09": +0 ,
        "2016-10": +5.91 ,
        "2016-11": -1.58,
        "2016-12": +5.34 ,
        "2017-01": +8.97,
        "2017-02": +4.62,
        "2017-03": +2.83,
        "2017-04": -0.83,
        "2017-05": -1.31
    };
    var data_sp500_value = {
        "2016-09": 2143.02,
        "2016-10": 2164.99,
        "2016-11": 2246.63,
        "2016-12": 2275.12,
        "2017-01": 2329.91,
        "2017-02": 2345.96,
        "2017-03": 2358.84,
        "2017-04": 2388.33,
        "2017-05": 2430.06
    };

    var data_vffvx_value = {
        "2016-09": 33.15,
        "2016-10": 32.52,
        "2016-11": 32.97,
        "2016-12": 32.91,
        "2017-01": 33.70,
        "2017-02": 34.58,
        "2017-03": 34.94,
        "2017-04": 35.44,
        "2017-05": 36.04
    };

    var data_benchmark_value = data_vffvx_value;


    var data_chart = [];
    data_chart.push(['Mes', 'Portfolio personal', {type: 'string', role: 'annotation'}, 'VFFVX', {type: 'string', role: 'annotation'}]);
    var personal_value_last_month = initial_value_personal;
    var total_months = Object.keys(data_personal_returns).length,
        current_month = 0;

    for (var date in data_personal_returns) {
        current_month++;
        var returns_month = data_personal_returns[date]/100;
        var personal_value_this_month = personal_value_last_month*(1+returns_month);
        var personal_value_indexed = (personal_value_last_month*(1+returns_month) / initial_value_personal) * 100 - 100;
        var benchmark_value_indexed = (data_benchmark_value[date] / initial_value_benchmark) * 100 - 100;

        var annotation_personal, annotation_benchmark;
        // Last data element needs to show the annotation.
        if(current_month == total_months){
            annotation_personal = (personal_value_indexed>0?"+":"-") + Math.round(personal_value_indexed*100)/100 + "%";
            annotation_benchmark = (benchmark_value_indexed>0?"+":"-") + Math.round(benchmark_value_indexed*100)/100 + "%";
        }
        data_chart.push([date, personal_value_indexed, annotation_personal, benchmark_value_indexed, annotation_benchmark]);
        personal_value_last_month = personal_value_this_month;
    }

    var dataTable = google.visualization.arrayToDataTable(data_chart);

    var options = {
        title: '',
        vAxis: {minValue: 0},
        legend: {position: 'top', alignment: 'center'},
        pointSize: 5,
        animation: {
            duration: 700,
            easing: 'out',
            startup: true
        },
    };

    var chart = new google.visualization.AreaChart(document.getElementById("portfolio-benchmark"));
    chart.draw(dataTable, options);
}
