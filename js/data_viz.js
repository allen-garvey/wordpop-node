WDP.displayViz = function(data){
	//height and width of svg
	var height = 800;
	var width = 500;
	var padding = 0;

	var viz = d3.select("#viz-wrapper")
					.append('svg')
					.attr('id', 'viz')
					.attr('height', height)
					.attr('width', width);

	var dots = viz.selectAll('circle').data(data).enter().append('circle');
	dots.attr('r', function(d){ return d.amount; })
		.attr('cx', function(d){return Math.max(0 + padding, Math.random() * width - padding)})
		.attr('cy', function(d){return Math.max(0 + padding, Math.random() * height - padding)});
}





















