function linechart() {
    var margin = {
            top: 20,
            right: 20,
            bottom: 70,
            left: 40
        },
        width = 500 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom,
        padding = 20;

    var formatPct = d3.format("%");

    var x = d3.scale.linear()
        .range([padding, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var dotcolor = d3.scale.threshold()
        .domain([10.5])
        .range(["#712164", "#4f8a83"]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(20);

    var yAxis = d3.svg.axis()
        .scale(y)
        .tickSize(-width)
        .orient("left")
        .ticks(7, "%");

    var line = d3.svg.line()
        .x(function (d) {
            return x(d.episode);
        })
        .y(function (d) {
            return y(d.tmaspct);
        });

    var svg = d3.select("#linechart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("data/totaltime.csv", function (error, data) {

        data.forEach(function (d) {
            d.episode = d.episode;
            d.tmaspct = +d.tmaspct;
        });

        x.domain([1, 20]);
        //y.domain([0, d3.max(data, function (d) {
        //    return d.tmaspct;
        //})]);
        y.domain([0, 1.3]);

        //var gx = svg.append("g")
        //    .attr("class", "x axis")
        //    .attr("transform", "translate(0," + height + ")")
        //    .call(xAxis);

        var gy = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        gy.selectAll("g").filter(function (d) {
                return d;
            })
            .classed("minor", true);

        svg.append("path")
            .attr("class", "chartline")
            .attr("d", line(data));

        svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 4)
            .attr("fill", function (d) {
                return dotcolor(d.episode);
            })
            .attr("cx", function (d) {
                return x(d.episode);
            })
            .attr("cy", function (d) {
                return y(d.tmaspct);
            });

        //Season labels for x axis
        svg.append("g")
            .append("text")
            .attr("class", "seasonTitle")
            .attr("x", 0.17 * width)
            .attr("y", height + padding)
            .text(function (d) {
                return "Season 1";
            })
        svg.append("g")
            .append("text")
            .attr("class", "seasonTitle")
            .attr("x", 0.63 * width)
            .attr("y", height + padding)
            .text(function (d) {
                return "Season 2";
            })

    });

}
linechart()