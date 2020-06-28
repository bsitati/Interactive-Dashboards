/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}


var data = d3.json('data/samples.json').then(function(data) {
  console.log(data);
  console.log(data.samples);
  console.log(data.names[0]);
  console.log(data.samples[0].id);
  console.log(data.samples[0].otu_ids);
  console.log(data.samples[0].sample_values);
  console.log(data.samples[0].otu_labels);
  console.log(d3.entries(data.samples[3].sample_values));
  console.log('-------------------------------------');
  
  var id = data.samples.map(row => row.id);
  console.log(id);
  var otu_ids = data.samples.map(row => row.otu_ids);
  console.log(otu_ids);
  var sample_values = data.samples.map(row => row.sample_values);
  console.log(sample_values);
  var otu_labels = data.samples.map(row => row.otu_labels);
  console.log(otu_labels);

  

  var new_sample = data.samples[0].sample_values
  console.log("------------------");
  console.log(new_sample);



  // var sample_values = data.samples[i].sample_values
  // console.log(sample_values);


  // ["a", "b", "c"].forEach(function(d, i) { console.log(d + " " + i); });
  // Outputs:

  // const dashData = data.forEach(function (d, i) {
  //   otu_ids = d.samples[i].otu_ids;

  //   sample_values = d.samples[i].sample_values;
  //   otu_labels = d.samples[i].otu_labels;
  //   console.log(otu_labels);
  // });

 // Create an array of each value
  // var dates = unpack(data.dataset.data, 0);

  // var otu_ids = unpack(data.samples,1);
  // console.log(otu_labels);
  // var sample_values  = unpack(data.samples, 2);
  // console.log(sample_values);
  // var otu_labels = unpack(data.samples,3);

    
  console.log(otu_labels);
  
  // Create an array of samples labels
  var labels = Object.keys(data.names[0]);


// Promise Pending
// const data = d3.json('data/samples.json');
// console.log("Data Promise: ", data);

// console.log(`Data samples:${data.samples.sample_values[0]} `);


   console.log(`Otu labels :${otu_labels}`);


// Display the default plot
function init() {
  
    var data = [{
      values: sample_values,
      labels: otu_labels,
      type: "bar"
    }];
  
    var layout = {
      height: 600,
      width: 800
    };
  
    Plotly.newPlot("bar", data, layout);
  }
  
  d3.selectAll("#selDataset").on("change", getData);


  // Function called by DOM changes
function getData() {
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    // Initialize an empty array for the id data
    // Initialize x and y arrays
  // var x = [];
  // var y = [];

 //populate metadata
  var meta = d3.select("#sample-metadata");

  //get variable names
  var keys = d3.keys(data.names[0]);
  var namesTitle = keys[0];
  var valuesTitle = keys[1];


  var names = Object.keys(data.names).sort();
  
    if (dataset == 'us') {
        data = us;
    }
    else if (dataset == 'uk') {
        data = uk;
    }
    else if (dataset == 'canada') {
        data = canada;
    }
    // Call function to update the chart
    updatePlotly(data);
  }
  
  // Update the restyled plot's values
  function updatePlotly(newdata) {
    Plotly.restyle("bar", "values", [newdata]);
  }
  
  init();
});

  

  