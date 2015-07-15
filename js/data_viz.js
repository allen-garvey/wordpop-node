WDP.displayViz = function(data){
	//height and width of svg
	var height = window.innerHeight;
	var width = window.innerWidth;
	var padding = 0;

	var viz = d3.select("#viz-wrapper")
					.append('svg')
					.attr('id', 'viz')
					.attr('height', height)
					.attr('width', width)
					.append('g');

	var rDomain = d3.extent(data, function(d){
        return d.amount;
    });
	var rScale = d3.scale.linear().domain(rDomain).range([1, 25]);

	var dots = viz.selectAll('g.dots').data(data).enter().append('g').attr('class', 'dots');
	dots.attr('transform', function(d){
		var x = Math.max(padding, Math.random() * width - padding);
		var y = Math.max(padding, Math.random() * height - padding);
		return "translate(" + x + ", " + y + ")";
	});

	dots.append('circle').attr('r', function(d){ return rScale(d.amount); });
	dots.append('text').text(function(d){return d.name;});

	/*
	//background rectangles are being created, but I cannot get them to show up for some reason
	viz.selectAll("text").each(function(d, i){
		var bbox = this.getBBox();
		console.log(bbox);
		var padding = 2;
		var rect = d3.select(document.createElement("rect"))
			.attr("x", bbox.x - padding)
		    .attr("y", bbox.y - padding)
		    .attr("width", bbox.width + (padding*2))
		    .attr("height", bbox.height + (padding*2))
		    .attr('class', 'word_label_background');
		this.parentNode.insertBefore(rect.node(), this.nextSibling);

	});
	*/
}





















