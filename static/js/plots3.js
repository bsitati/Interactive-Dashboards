// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
function optionChanged(belly_id) {

console.log(`belly_id ${belly_id}`);


d3.json("data/samples.json").then((importedData) => {
  //console.log(importedData);
  var data = importedData;
  console.log(importedData);

  console.log(`importedData ${importedData}`);
  console.log(`all data ${data.samples[0]}`);


  var bellyIDSample = importedData.samples.filter(d => d.id == belly_id)
  
    console.log(`bellyIDSample ${bellyIDSample}`);
    console.log(`bellyIDSample ${bellyIDSample[0].sample_values}`);

  // Sort the data array using the  value
  sortData = bellyIDSample[0].sample_values.sort(function(a, b) {
    return parseFloat(b) - parseFloat(a);
  });


  // Slice the first 10 objects for plotting
  sortSampleValueData = sortData.slice(0, 10)
  console.log(sortData);
  otu_labels = bellyIDSample[0].otu_labels
  otu_ids = bellyIDSample[0].otu_ids
  sample_values = bellyIDSample[0].sample_values
  
  //metadata 
  var bellyIDMeta = data.metadata.filter(d => d.id == belly_id)
  console.log(`bellyIDMeta ${bellyIDMeta}`)

  var id = bellyIDMeta[0].id
  console.log(id)
  var ethnicity = bellyIDMeta[0].ethnicity
  console.log(ethnicity)
  var gender = bellyIDMeta[0].gender
  console.log(gender)
  age = bellyIDMeta[0].age
  var located = bellyIDMeta[0].location
  console.log(located)
  var bellyWfreq = bellyIDMeta[0].wfreq


// Select the html element to modify.
let metaDataElement = d3.select("#sample-metadata");
// Clean any old data in there.
metaDataElement.html("");
// Make it a table.
let metaDataTr = metaDataElement.append("th")
// Add the rows.
for (let [key, value] of Object.entries(bellyIDMeta[0])) {
  metaDataTr.append("tr").text(key + ": " + value);
}

// Build the bubble chart.
var trace1 = {
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: 'markers',
    marker: {
      size: sample_values,
      color: otu_ids,
    },
  };

  var bubbleData = [trace1];

  var layout = {
    title: 'OTU ID',
    xaxis_title: "OTU ID",
    showlegend: false,
    height: 600,
    width: 800
  };

  Plotly.newPlot('bubble', bubbleData, layout);

  // Reverse the array due to Plotly's defaults
  
  sample_values = sortSampleValueData.reverse();
  console.log(sample_values);
  

  var trace1 = {
    x: sample_values,
    // y: otu_ids,
    //y: otu_labels,
    y: otu_ids.slice(0,10).map(otu_ids => `OTU ${otu_ids}`).reverse() ,  
    text: otu_labels.slice(0,10).reverse(),
    name: "Top OUT",
    type: "bar",
    orientation: "h"
  };

  // data
  var chartData = [trace1];
  // Apply the group bar mode to the layout
  var layout = {
    title: "Top 10 OTUs found",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100,
      hovermode:'closest',
      title:'Click on Points'
    }
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", chartData, layout);


  //Guage plot
  

// var gaugeDiv = document.getElementById("gauge-chart");

// -----------------------------------------------
var data = [
    {
      type: "indicator",
      mode: "gauge+number+delta",
      value: bellyWfreq,
      title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
      delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
      gauge: {
        axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "darkblue" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 250], color: "cyan" },
          { range: [250, 400], color: "royalblue" }
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: 490
        }
      }
    }
  ];
  
  var layout = {
    width: 400,
    height: 310,
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: "lavender",
    font: { color: "darkblue", family: "Arial" }
  };
  
  Plotly.newPlot('gauge', data, layout);
  


// -----------------------------------------------

// var traceA = {
//   type: "pie",
//   showlegend: false,
//   hole: 0.4,
//   rotation: 90,
//   values: [100 / 5, 100 / 5, 100 / 5, 100 / 5, 100 / 5, 100],
//   text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9"],
//   direction: "clockwise",
//   textinfo: "text",
//   textposition: "inside",
//   marker: {
//     colors: ["rgba(255, 0, 0, 0.6)", "rgba(255, 165, 0, 0.6)", "rgba(255, 255, 0, 0.6)", "rgba(144, 238, 144, 0.6)", "rgba(154, 205, 50, 0.6)", "white"]
//   },
//   labels: ["0-10", "10-50", "50-200", "200-500", "500-2000", ""],
//   hoverinfo: "label"
// };

// var degrees = 115, radius = .6;
// var radians = degrees * Math.PI / 180;
// var x = -1 * radius * Math.cos(radians);
// var y = radius * Math.sin(radians);

// var layout = {
//   shapes:[{
//       type: 'line',
//       x0: 0,
//       y0: 0,
//       x1: x,
//       y1: 0.5,
//       line: {
//         color: 'black',
//         width: 8
//       }
//     }],
//   title: 'Belly Button Washing Frequency',
//   xaxis: {visible: false, range: [-1, 1]},
//   yaxis: {visible: false, range: [-1, 1]}
// };

// var data = [traceA];

// Plotly.plot(gauge, data, layout, {staticPlot: true});

});


}

// select data from dropdown
    d3.json("data/samples.json").then((data) => {

        d3.select("#selDataset").selectAll("option")
        .data(data.names.slice(0,10))
        .enter()
          .append("option")
          .text(d => d)
          .property("value", d => d);

        //  console.log(d)

        // // On change to the DOM, call getData() --- stu evt9
d3.selectAll("#selDataset").on("change", optionChanged);



// // Function called by DOM changes
// function getData() {
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var belly_id = dropdownMenu.property("value");
    console.log(`selected ID ${belly_id}`)

    optionChanged(belly_id);
    // buildMetaData(belly_id);

    // buidlBubble(belly_id);

// }

//filter data 
function filterData(selectedID){

    var metaData = data.metadata;
    var samples = data.samples

    console.log(metaData)
    console.log(samples)

    var bellyIDMeta = metaData.filter(d => d.id == selectedID)
    console.log(bellyIDMeta);
    var bellyIDSample = samples.filter(d => d.id == selectedID)
    console.log(bellyIDSample)
    var bellyWfreq = bellyIDMeta[0].wfreq
    console.log(bellyWfreq)
    
    var bellyIDSampleOtuID = samples.filter(d => d.id == selectedID)
    var bellyIDSampleOtusamples = samples.filter(d => d.id == selectedID)
    
    var bellyIDSampleOtuid = bellyIDSample[0].otu_ids
    console.log(`bellyIDSampleOtuID ${bellyIDSampleOtuid}`)

}
//Default Value for patient ID
var belly_id=940;
optionChanged(belly_id);


})
