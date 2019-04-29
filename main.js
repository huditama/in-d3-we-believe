var svg = d3.select("#goals"),
    margin = 265,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;

var tooltip = d3.select("body").append("div").attr("class", "toolTip");

var xScale = d3.scaleBand().range([0, width]).padding(0.4),
    yScale = d3.scaleLinear().range([height, 0]);

var g = svg
    .append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")")

d3
    .csv("./premier_league.csv")
    .then(function (data) {
        xScale.domain(data.map(function (d) { return d.team; }));
        yScale.domain([0, 120]);

        // X-Axis Label
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .append("text")
            .attr("y", height - 128)
            .attr("x", width - 250)
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Club Name")

        // X-Axis
        g.append('g')
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)")

        // Y-Axis
        g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function (d) {
                return d;
            })
                .ticks(5))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "-5.1em")
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Goals Scored");

        // BAR CHARTS
        g.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return xScale(d.team); })
            .attr("y", function (d) { return yScale(d.goals); })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) { return height - yScale(d.goals); })
            .on("mousemove", function (d) {
                d3
                    .select(this)
                    .attr('fill', 'red')
                tooltip
                    .style("left", d3.event.pageX - 80 + "px")
                    .style("top", d3.event.pageY - 100 + "px")
                    .style("display", "inline-block")
                    .html((d.team) + "<br>" + (d.goals) + ' goals');
            })
            .on("mouseout", function (d) {
                d3
                    .select(this)
                    .attr('fill', 'black')
                tooltip.style("display", "none")
            })

        // CHART TITLE
        svg.append("text")
            .attr("transform", "translate(100,0)")
            .attr("x", -10)
            .attr("y", 50)
            .attr("font-size", "24px")
            .text("Goals Scored by each Premier League Teams in 17/18 Season")
    })