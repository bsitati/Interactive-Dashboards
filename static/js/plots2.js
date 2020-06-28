// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
function buildMetadata(sample) {
    // Fetch the data.
    // d3.json("data/samples.json").then(function(data) {
    // d3.json(`/metadata/${sample}`).then(function(data) {
      // Select the html element to modify.
    // data.metadata
    // console.log(data.metadata[5])
    // sample = sample.metadata.
    console.log(sample)

      let metaDataElement = d3.select("#sample-metadata");
      // Clean any old data in there.
      metaDataElement.html("");
      // Make it a table.
      let metaDataTr = metaDataElement.append("th")
  
      // Add the rows.
      for (let [key, value] of Object.entries(sample)) {
        metaDataTr.append("tr").text(key + ": " + value);

        
        console.log(`key ${key}`)
        console.log(`value ${value.id}`)





      }
    // });
  }
  
  //buildMetadata(3)
  
function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("data/samples.json").then((namesData) => {

  console.log(namesData.samples.slice(0,10));
        console.log(`NamesData ${namesData.names.slice(0,10)}`)
        namesData.names.slice(0,10).forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);

          console.log(`sample ${sample}`)
//  get patient ID
    d3.selectAll("#selDataset").on("change", getData);

            

         });

      });
  
      
      // Use the first sample from the list to build the initial plots
      const firstSample = namesData.metadata;
      console.log(`first sample ${firstSample[3]}`);


     //buildCharts(firstSample);
     buildMetadata(firstSample);
    });
  }

  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
  }
  


  // Initialize the dashboard
init();





// function buildCharts(sample) {

// d3.json("data/samples.json").then((importedData) => {
//   //console.log(importedData);
//   var data = importedData;
//   console.log(importedData);

//   // Sort the data array using the  value
//   sortData = data.samples[0].sample_values.sort(function(a, b) {
//     return parseFloat(b) - parseFloat(a);
//   });

//   console.log(data.metadata[0]);

//   // Slice the first 10 objects for plotting
//   sample_values = sortData.slice(0, 10)
//   console.log(sample_values);
//   otu_labels = data.samples[0].otu_labels.slice(0, 10)
//   otu_ids = data.samples[0].otu_ids.slice(0, 10)
//   //metadata 
//   id = data.metadata[0].id
//   console.log(id)
//   ethnicity = data.metadata[0].ethnicity
//   gender = data.metadata[0].gender
//   age = data.metadata[0].age
//   located = data.metadata[0].location.text
//   //console.log(location)

// // Select the html element to modify.
// let metaDataElement = d3.select("#sample-metadata");
// // Clean any old data in there.
// metaDataElement.html("");
// // Make it a table.
// let metaDataTr = metaDataElement.append("th")

// // Add the rows.
// for (let [key, value] of Object.entries(data.metadata[0])) {
//   metaDataTr.append("tr").text(key + ": " + value);
// }

// // Build the bubble chart.
// var trace1 = {
//     x: data.samples[0].otu_ids,
//     y: data.samples[0].sample_values,
//     text: data.samples[0].otu_labels,
//     mode: 'markers',
//     marker: {
//       size: data.samples[0].sample_values,
//       color: data.samples[0].otu_ids,
//     },
//   };

//   var bubbleData = [trace1];

//   var layout = {
//     title: 'OTU ID',
//     xaxis_title: "OTU ID",
//     showlegend: false,
//     height: 600,
//     width: 800
//   };

//   Plotly.newPlot('bubble', bubbleData, layout);
  
//   console.log(sample_values);
//   console.log(data);

//   // Reverse the array due to Plotly's defaults
  
//   sample_values = sample_values.reverse();
//   console.log(sample_values);
//   // Trace1 for the Greek Data
// //   var trace1 = {
// //     x: sample_values,
// //     y: otu_labels,
// //     text: data.samples[0].id,
// //     name: "Top OUT",
// //     type: "bar",
// //     orientation: "h"
// //   };


//   var trace1 = {
//     x: sample_values,
//     // y: otu_ids,
//     y: otu_labels,
//     text: data.samples[0].otu_labels,
//     name: "Top OUT",
//     type: "bar",
//     orientation: "h"
//   };

//   // data
//   var chartData = [trace1];

//   // Apply the group bar mode to the layout
//   var layout = {
//     title: "Top 10 OTUs found",
//     margin: {
//       l: 100,
//       r: 100,
//       t: 100,
//       b: 100,
//       hovermode:'closest',
//       title:'Click on Points'
//     }
//   };

//   // Render the plot to the div tag with id "plot"
//   Plotly.newPlot("bar", chartData, layout);

// // Build the pie chart.

// // var pieData = [{
// //     values: sample_values,
// //     labels: otu_ids,
// //     hovertext: otu_labels,
// //     hoverinfo: "text",
// //     type: 'pie'
// //   }];
// //   console.log(`Pie Data ${pieData}`)


// //   var layout = {
// //     height: 400,
// //     width: 500
// //   };
// //   Plotly.newPlot('gauge', pieData, layout);

//   //Guage plot
  

// // var gaugeDiv = document.getElementById("gauge-chart");

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

// });

// // // On change to the DOM, call getData() --- stu evt9
// // d3.selectAll("#selDataset").on("change", getData);

// // // Function called by DOM changes
// function getData() {
//   var dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   var dataset = dropdownMenu.property("value");
//   // Initialize an empty array for the country's data
//   var otu_ids =[],
//   sample_values=[],
//   otu_labels=[];

// for(var i=0; i < data.samples.length; i++){
// otu_ids = data.samples[i].otu_ids;
// sample_values = data.samples[i].sample_values;
// otu_labels = data.samples[i].otu_labels;
// };

// var update = {'otu_ids':{otu_ids: otu_ids}};
// Plotly.restyle('bar', update, [sample_values]);


// }

// }

// function init() {
//     // Grab a reference to the dropdown select element
//     var selector = d3.select("#selDataset");
  
//     // Use the list of sample names to populate the select options
//     d3.json("data/samples.json").then((namesData) => {

//   console.log(namesData.names.slice(0,10));
//         console.log(`NamesData ${namesData.names}`)
//         namesData.names.slice(0,10).forEach((sample) => {
//         selector
//           .append("option")
//           .text(sample)
//           .property("value", sample);
//       });
  
//       // Use the first sample from the list to build the initial plots
//       const firstSample = namesData;
//       console.log(`first sample ${firstSample.metadata[0].ethnicity}`);


//      buildCharts(firstSample);
//      //buildMetadata(firstSample);
//     });
//   }

//   function optionChanged(newSample) {
//     // Fetch new data each time a new sample is selected
//     buildMetadata(newSample);
//   }
  


//   // Initialize the dashboard
// init();

