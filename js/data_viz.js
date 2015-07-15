WDP.displayViz = function(data){
	//height and width of svg
	var height = window.innerHeight;
	var width = window.innerWidth;
	var padding = 0;

	var viz = d3.select("#viz-wrapper")
					.append('svg')
					.attr('id', 'viz')
					.attr('height', height)
					.attr('width', width);

	var rDomain = d3.extent(data, function(d){
        return d.amount;
    });
	var rScale = d3.scale.linear().domain(rDomain).range([1, 25]);

	var dots = viz.selectAll('circle').data(data).enter().append('circle');
	dots.attr('r', function(d){ return rScale(d.amount); })
		.attr('cx', function(d){return Math.max(0 + padding, Math.random() * width - padding)})
		.attr('cy', function(d){return Math.max(0 + padding, Math.random() * height - padding)});
}





















