// Initializes the page with a default plot
function init() {

var data = d3.json('data/samples.json').then(function(data) {

        // Sort the data array using the greekSearchResults value
  data.sort(function(a, b) {
    return parseFloat(b.samples[0].sample_values) - parseFloat(a.samples[0].sample_values);
  });

  // Slice the first 10 objects for plotting
  data = data.slice(0, 10);

  console.log(`slice data ${data}`)

  // Reverse the array due to Plotly's defaults
  data = data.reverse();

  // Trace1 for the Greek Data
  var trace1 = {
    x: data.map(row => row.samples[0].otu_ids),
    y: data.map(row => row.samples[0].sample_values),
    text: data.map(row => row.otu_labels),
    name: "Greek",
    type: "bar",
    orientation: "h"
  };

  // data
  var chartData = [trace1];

  // Apply the group bar mode to the layout
  var layout = {
    title: "Greek gods search results",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot", chartData, layout);
    
        // console.log(data);
        // console.log(data.samples);
        // console.log(data.names[0]);
        // console.log(data.samples[0].id);
        // console.log(data.samples[0].otu_ids);
        // console.log(data.samples[0].sample_values);
        // console.log(data.samples[0].otu_labels);
        // console.log(d3.entries(data.samples[3].sample_values));
        // console.log('-------------------------------------');
      

  

//    var id1 = data.samples[0].id
//     var id = data.samples.map(row => row.id);
//   console.log(id);
//   var otu_ids = data.samples.map(row => row.otu_ids);
//   console.log(otu_ids);
//   var sample_values = data.samples.map(row => row.sample_values);
//   console.log(sample_values);
//   var otu_labels = data.samples.map(row => row.otu_labels);
//   console.log(otu_labels);



//   data = [{
//     x: otu_ids,
//     y: sample_values,
//   Plotly.newPlot("bar", data);
//   });
}

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");

  // Initialize x and y arrays
  var x = [];
  var y = [];

  if (dataset === 'dataset1') {
    x = [1, 2, 3, 4, 5];
    y = [1, 2, 4, 8, 16];
  }

  if (dataset === 'dataset2') {
    x = [10, 20, 30, 40, 50];
    y = [1, 10, 100, 1000, 10000];
  }

  // Note the extra brackets around 'x' and 'y'
  Plotly.restyle("plot", "x", [x]);
  Plotly.restyle("plot", "y", [y]);


}

init();
