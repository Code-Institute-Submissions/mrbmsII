// Some constants

export const dataArrIdx = {
	first: 0,
	tenth: 1,
	twentyfifth: 2,
	hundredth: 3,
	last: 4
}
Object.freeze(dataArrIdx);

export const statCodes = {
	driving: "102",
	gir: "103",
	gir100125: "077",
	gir125150: "329",
	gir150175: "328",
	gir175200: "327",
	gir200Plus: "326",
	sandSave: "111",
	scrambling: "130"
}
Object.freeze(statCodes);

export const statText = {
	driving: 	{
					elemId: "#driving-line-chart",
					label: "Driving Accuracy",
					yAxisLabel: "% of Fairways Made"
				},
	gir: 		{
					elemId: "#gir-line-chart",
					label: "Greens In Regulation",
					yAxisLabel: "% of GIR"					
				},
	gir100125: 	{
					elemId: "#gir-100-125-line-chart",
					label: "GIR 100-125 Yards Out",
					yAxisLabel: "% of GIR From 100-125 Yards"					
				},
	gir125150: 	{
					elemId: "#gir-125-150-line-chart",
					label: "GIR 125-150 Yards Out",
					yAxisLabel: "% of GIR From 125-150 Yards"					
				},
	gir150175: 	{
					elemId: "#gir-150-175-line-chart",
					label: "GIR 150-175 Yards Out",
					yAxisLabel: "% of GIR From 150-175 Yards"					
				},
	gir175200: 	{
					elemId: "#gir-175-200-line-chart",
					label: "GIR 175-200 Yards Out",
					yAxisLabel: "% of GIR From 175-200 Yards"					
				},
	gir200Plus: {
					elemId: "#gir-200-plus-line-chart",
					label: "GIR 200+ Yards Out",
					yAxisLabel: "% of GIR From 200+ Yards"					
				},
	sandSave: 	{
					elemId: "#sand-saves-line-chart",
					label: "Sand Saves",
					yAxisLabel: "% Saving Par from Sand"					
				},
	scrambling: {
					elemId: "#scrambling-line-chart",
					label: "Scrambling",
					yAxisLabel: "% Scrambling to Save Par"					
				}
}
Object.freeze(statText);


// Returns index of array of objects where key = to valToFind or -1 if not found
export function keyExists(obj, key, valToFind)
{
    return (obj.findIndex(i => i[key] === valToFind));
}

export function getObjData(obj, key)
{
    if (obj.hasOwnProperty(key)) {return obj[key];} 
    else {return "";}
}

export function print_filter(filter){
	var f = eval(filter);

	if (typeof(f.length) != "undefined") {} else {}
	if (typeof(f.top) != "undefined") {f = f.top(Infinity);} else {}
	if (typeof(f.dimension) != "undefined") {f = f.dimension(function(d) {return "";}).top(Infinity);} else {}
	console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
} 

