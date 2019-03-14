$(function() {

	$(".btn-pgastats").click(function(evt) {
		//evt.preventDefault();
		var stat = $(this).attr("data-stat");
		console.log(`stat: ${stat}`);

		// Ensure that there is only one collapsible section open at a time for this stat
		$(`#${stat}-stats-graph`).collapse("hide");
		$(`#${stat}-stats-numbers`).collapse("hide");
	});
});

queue()
	.defer(d3.json, "assets/data/data.json")
	.await(makeGraphs);

function makeGraphs(err, statData) {
	var ndx = crossfilter(statData);

	buildStatYearSel(ndx);

	getDataByYear(ndx, "2002");

}

// Build our list of years of stats
function buildStatYearSel(ndx) {
    var dim = ndx.dimension(dc.pluck('Year'));
    var grp = dim.group();  // Just counting rows

    console.log(grp.all());
    console.log(`Number of years: ${grp.size()}`);
    //console.log(dim.all());

    /*
    dc.selectMenu("#year-selector")
        .dimension(dim)
        .group(grp);
    */

    var foo = 1; // Nice place to set a break point
}

function getDataByYear(ndx, yr) {
	var dataForYr = ndx.groupAll().reduce(
		function(p, v) {
			console.log("here");
			if (v.Year === yr) {
				p.count++;
			}

			return p;
		},
		function(p, v) {
			if (v.Year === yr) {
				p.count--;
			}

			return p;
		},
		function() {
			console.log("here in initialiser");
			return {count: 0};
		}
	);

	console.log(`Number of stats for year: ${dataForYr.count}`);
}
