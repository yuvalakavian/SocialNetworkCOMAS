const getDataForCities = (data) => {    
    event.preventDefault();

    $.ajax({
        url: '/statistics/getPopularCities',
        type: 'GET', 
        dataType: 'json', 
        success: function(response) {
          popularCitiesHandler(response)
          console.log(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('Request failed: ' + textStatus, errorThrown);
        }
      });
}

const popularCitiesHandler = (data) => {    
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function (d) { return d.Country; }))
        .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    
    var y = d3.scaleLinear()
        .domain([0, data[0].Value])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));
    
    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d.Country); })
        .attr("y", function (d) { return y(d.Value); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.Value); })
        .attr("fill", "#bd661b");
}
  
$(document).ready(function () {
    $('.d3js-tabs').click(function () {
        $('#my_dataviz').html('')
    });

    $('.d3js-tabs').hover(function () {
        $(this).css('cursor', 'pointer');
    });

    $('#users-per-city').click(function () {
        var data = [
            { "Country": "A", "Value": 150 },
            { "Country": "B", "Value": 205 },
            { "Country": "C", "Value":  20},
            { "Country": "D", "Value": 110 },
            { "Country": "E", "Value":  100}
        ];
        getDataForCities()
        // postPerWeekHandler(data); 
    });

    $('#posts-per-week').click(function () {
        var data = [
            { "Country": "A", "Value": 150 },
            { "Country": "B", "Value": 205 },
            { "Country": "C", "Value":  20},
            { "Country": "D", "Value": 110 },
            { "Country": "E", "Value":  100}
        ];
        postPerWeekHandler(data); 
    });

    $('#likes-per-week').click(function () {
        var data = [
            { "Country": "A", "Value": 150 },
            { "Country": "B", "Value": 205 },
            { "Country": "C", "Value":  20},
            { "Country": "D", "Value": 110 },
            { "Country": "E", "Value":  100}
        ];
        // postPerWeekHandler(data); 
    });


});

