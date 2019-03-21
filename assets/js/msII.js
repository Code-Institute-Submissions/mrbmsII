"use strict";

import * as utils from "./utils.js";

var g_statArr = [];
var g_charts = [];

$(function() {
	$(".btn-pgastats").click(function(evt) {
		//evt.preventDefault();
		var stat = $(this).attr("data-stat");
		console.log(`stat: ${stat}`);

		// Ensure that there is only one collapsible section open at a time for this stat
		$(`#${stat}-coll-row-1`).collapse("hide"); // Line chart row
		$(`#${stat}-coll-row-2`).collapse("hide"); // Stat numbers row
	});

	// When the user changes years, rebuild charts
	$("#yr-selector").change(function() {
		updateChartsAndStats($(this).val());
	});

	queue()
		.defer(d3.json, "assets/data/data.json")
		.await(processData);

	function processData(err, statData) {
		var ndx = crossfilter(statData);
		console.log(`Number of records in dataset: ${ndx.size()}`);

		// Build our select list dropdown
		buildStatYearSel(ndx);

		// Create our charts
		buildChartsAndStats($("#yr-selector").val());		
	}
});

// Objects are passed in by reference by default in JS :-)
function setDataPoints(cfgDataObj, yrIdx, statIdx) {
	cfgDataObj.datasets[0].data[utils.dataArrIdx.first] = g_statArr[yrIdx].statkeys[statIdx].data.first;
	cfgDataObj.datasets[0].data[utils.dataArrIdx.tenth] = g_statArr[yrIdx].statkeys[statIdx].data.tenth;
	cfgDataObj.datasets[0].data[utils.dataArrIdx.twentyfifth] = g_statArr[yrIdx].statkeys[statIdx].data.twentyfifth;
	cfgDataObj.datasets[0].data[utils.dataArrIdx.hundredth] = g_statArr[yrIdx].statkeys[statIdx].data.hundredth;
	cfgDataObj.datasets[0].data[utils.dataArrIdx.last] = g_statArr[yrIdx].statkeys[statIdx].data.last;
}

function updateChartsAndStats(yr) {
	// Get the index of the object for this year
	var yrIdx = utils.keyExists(g_statArr, "yr", yr);

	$.each(utils.statCodes, function(key, val) {
		// Get the index for this year and then the stat index within the year
		var statIdx = utils.keyExists(g_statArr[yrIdx].statkeys, "statcode", val);
		var statTextObj = utils.getObjData(utils.statText, key);

		// Get the index of chart object data.
		var chartIdx = utils.keyExists(g_charts, "statcode", val);

		// Update our statistic chart with the selected year data
		g_charts[chartIdx].chart.config.options.title.text = `${statTextObj.label} for ${yr}`;
		setDataPoints(g_charts[chartIdx].chart.config.data, yrIdx, statIdx);

		// Tell Chart.js to update our chart
		g_charts[chartIdx].chart.update();

		// Update the "By the Numbers" collapsible section
		$(`#${g_statArr[yrIdx].statkeys[statIdx].data.stat}-coll-row-2`).html(buildStatListHTML(yr, yrIdx, statIdx));
	});
}

function buildChartsAndStats(yr) {
	// Get the index of the object for this year
	var yrIdx = utils.keyExists(g_statArr, "yr", yr);

	$.each(utils.statCodes, function(key, val) {
		var currConfigObj = buildStaticChartConfig(); // Static chart configuration in all charts
		var statTextObj = utils.getObjData(utils.statText, key);
		currConfigObj.options.title.text = `${statTextObj.label} for ${yr}`;
		currConfigObj.data.datasets[0].label = statTextObj.label;
		currConfigObj.options.scales.yAxes[0].scaleLabel.labelString = statTextObj.yAxisLabel;

		// Get the stat object index for this year
		var statIdx = utils.keyExists(g_statArr[yrIdx].statkeys, "statcode", val);

		// Now put the data in our configuration
		setDataPoints(currConfigObj.data, yrIdx, statIdx);

		// Create the chart context
		var myChart = new Chart($(statTextObj.elemId), currConfigObj);

		// I am storing the statcode for updating the chart data when the user selects a different year
		g_charts.push(
						{
						"id":statTextObj.elemId,
						"statcode":val,
						"chart":myChart
						}
					);

		// Set the data for the "By the Numbers" collapsible section
		$(`#${g_statArr[yrIdx].statkeys[statIdx].data.stat}-coll-row-2`).html(buildStatListHTML(yr, yrIdx, statIdx));
	});

    var foo = 1; // Nice place to set a break point	
}

function buildStatListHTML(yr, yrIdx, statIdx) {
	return (
        `<div class="container">
        <div class="row">
        	<div class="col-12 center-block text-center">
        		<h5 class="what-heading">${g_statArr[yrIdx].statkeys[statIdx].data.heading} for ${yr}</h5>
        	</div>
        </div>
        <div class="row pt-2">
	        <div class="col-sm-12 offset-md-3 col-md-3">
	        	<ul>
					<li>1st: ${g_statArr[yrIdx].statkeys[statIdx].data.first}</li>
					<li>10th: ${g_statArr[yrIdx].statkeys[statIdx].data.tenth}</li>
					<li>25th: ${g_statArr[yrIdx].statkeys[statIdx].data.twentyfifth}</li>
					<li>100th: ${g_statArr[yrIdx].statkeys[statIdx].data.hundredth}</li>
					<li>Last: ${g_statArr[yrIdx].statkeys[statIdx].data.last}</li>
				</ul>
			</div>
			<div class="col-sm-12 col-md-3">
	        	<ul>
					<li>Top 10 Avg: ${g_statArr[yrIdx].statkeys[statIdx].data.top10avg}</li>
					<li>Top 25 Avg: ${g_statArr[yrIdx].statkeys[statIdx].data.top25avg}</li>
					<li>Top 100 Avg: ${g_statArr[yrIdx].statkeys[statIdx].data.top100avg}</li>
				</ul>
			</div>
		</div>
		</div>`
	);
}

// Build charts for all stats for currently selected year
function buildStaticChartConfig() {
	return  {
				type: 'line',
				data: {
					labels: ["1st","10th","25th","100th","Last"],
					datasets: [
								{ 
									data: [],
									label: "",
									borderColor: "#3E95CD",
									fill: false
								}
							]
				},
				options: {
					title: {
						display: true,
						text: ""
					},
					tooltips: {
						mode: "index",
						intersect: false
					},
					hover: {
						mode: "nearest",
						intersect: true
					},
					scales: {
						xAxes: [
								{
									display: true,
									scaleLabel: {
										display: true,
										labelString: "Finishing Place for Year for Statistic"
									}
								}
								],
						yAxes: [
								{
									display: true,
									scaleLabel: {
										display: true,
										labelString: ""
									},
									ticks: {
									// Include a % sign in the ticks
									callback: function(value, index, values) {
										return `${value}%`;
									}
								}
					}	]
					}
				}
			};
}

// Build our list of years of stats
function buildStatYearSel(ndx) {
    var dim = ndx.dimension(function(d) {return d.yr});
    var grp = dim.group();  // Just counting rows
    //var rotatedGrp = rotate(dim, ['Year', 'StatKey']);
    //console.log(rotatedGrp.all());
    var numOfYrs = grp.all().length;

    var yrs = "",
    	i = 0;
    grp.all().forEach(function(entry) {
    	yrs += `<option value="${entry.key}"${(numOfYrs === ++i ? " selected" : "")}>${entry.key}</option>`;
    	var dataForYr = getDataByYear(ndx, entry.key);
    	dataForYr.all();
    });    

    $("#yr-selector").html(yrs);

    var foo = 1; // Nice place to set a break point
}

function getDataByYear(ndx, yr) {
	var dataForYr = ndx.groupAll().reduce(
		function(p, v) {
			if (v.yr === yr) {
				p.count++;
				addToDataArr(v);
			}

			return p;
		},
		function(p, v) {
			if (v.yr === yr) {
				p.count--;
			}

			return p;
		},
		function() {return {count: 0};});

	return {
		all: function() {
			// or _.pair, anything to turn the object into an array
			return d3.map(dataForYr.value()).entries();
		}
	};
}

function addToDataArr(obj) {
	if (g_statArr.length === 0) {pushObj(-1, obj);}
	else {
		// Check to see if our top level object (year) already exists
		pushObj(utils.keyExists(g_statArr, "yr", obj.yr), obj);
	}
}

function pushObj(objIdx, obj)
{
	// Adding a new year to our array
	if (objIdx < 0) {
		g_statArr.push(
						{
						"yr": obj.yr,
						"statkeys":
							[
								{
									"statcode":obj.statcode,
									"data":
										{
											"first":obj.first,
											"tenth":obj.tenth,
											"twentyfifth":obj.twentyfifth,
											"hundredth":obj.hundredth,
											"last":obj.last,
											"top10avg":obj.top10avg,
											"top25avg":obj.top25avg,
											"top100avg":obj.top100avg,
											"stat":obj.stat,
											"heading":obj.heading
										}
								}
							]
						}
					);
	} else {
		// Adding another statistic to an existing year
		g_statArr[objIdx].statkeys.push(
										{
											"statcode":obj.statcode,
											"data":
												{
													"first":obj.first,
													"tenth":obj.tenth,
													"twentyfifth":obj.twentyfifth,
													"hundredth":obj.hundredth,
													"last":obj.last,
													"top10avg":obj.top10avg,
													"top25avg":obj.top25avg,
													"top100avg":obj.top100avg,
													"stat":obj.stat,
													"heading":obj.heading
												}
										}			
									);
	}
}


function drawCharts() {
	g_chartConfig.forEach(function(cfg) {
		console.log(cfg.id);
		var ctx = $(cfg.id);
		var myChart = new Chart(ctx, cfg.config);
		g_charts.push(myChart);
	});
}

// Currently not used, but kept for reference. It is an attempt at pivoting the data
function rotate(dim, cols) {
	var _groupAll = dim.groupAll().reduce(
		function(p, v) {
			cols.forEach(function(c) { // add
				p[c] += v[c];
			});
			return p;
		},
		function(p, v) { // remove
			cols.forEach(function(c) {
				p[c] -= v[c];
			});
			return p;
		},
		function() { // init
			console.log("In init");
			var p = {};
			cols.forEach(function(c) {
				p[c] = 0;
			});
			return p;
		});
	return {
		all: function() {
			// or _.pair, anything to turn the object into an array
			return d3.map(_groupAll.value()).entries();
		}
	};
}

// Sort in descending order. Currently not used; kept for reference.
function SortByYear(x, y) {
	return (((parseInt(x.yr) == parseInt(y.yr)) ? 0 : (((parseInt(x.yr > y.yr)) ? 1 : -1))));
}

