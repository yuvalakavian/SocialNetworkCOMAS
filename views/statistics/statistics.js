const getDataForCities = () => {    
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

const getDataForLikes = () => {    
    $.ajax({
        url: '/statistics/getLikesPerWeek',
        type: 'GET', 
        dataType: 'json', 
        success: function(response) {
          likesOrPostsPerWeekHandler(response, 'Likes')
          console.log(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('Request failed: ' + textStatus, errorThrown);
        }
    });
}

const getDataForPosts = () => {    
    $.ajax({
        url: '/statistics/getPostsPerWeek',
        type: 'GET', 
        dataType: 'json', 
        success: function(response) {
          likesOrPostsPerWeekHandler(response, 'Posts')
          console.log(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('Request failed: ' + textStatus, errorThrown);
        }
    });
}

const likesOrPostsPerWeekHandler = (data, mode) => {
    const maxValue = data.reduce((max, currentValue) => {
        return Math.max(max, currentValue.value); }, 0 );
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parseDate = d3.timeParse("%Y-%m-%d");
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.value = +d.value;
    });

    var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.date; }))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
            .ticks(d3.timeWeek.every(1))
            .tickFormat(d3.timeFormat("%Y-%m-%d"))); 

    var y = d3.scaleLinear()
        .domain([0, maxValue])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.value); })
        );

    svg.selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.value); })
        .attr("r", 5)
        .attr("fill", "#69b3a2");

    svg.append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.top + 20)
    .style("text-anchor", "middle")
    .text("Weeks");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - height / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Amount of " + mode);
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
        .attr("fill", "#bd661b")
    
    svg.append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.top + 20)
    .style("text-anchor", "middle")
    .text("Cities");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - height / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Amount of Users");

}
  
$(document).ready(function () {
    $('#messageBox').html('Displaying Most Six Populated Cities')
    getDataForCities()
    
    $('.d3js-tabs').click(function () {
        $('#my_dataviz').html('')
    });

    $('.d3js-tabs').hover(function () {
        $(this).css('cursor', 'pointer');
    });

    $('#users-per-city').click(function () {
        $('#messageBox').html('Displaying Most Six Populated Cities')
        getDataForCities()
    });

    $('#likes-per-week').click(function () {
        $('#messageBox').html('Likes- Displaying Last Six Weeks')
        getDataForLikes()
    });

    $('#posts-per-week').click(function () {
        $('#messageBox').html('Posts - Displaying Last Six Weeks')
        getDataForPosts()
    });
});