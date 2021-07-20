/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */

"use strict";

fetch("./samples.json")
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {

        let names = data.names;
        console.log(names);

        let metadata = data.metadata;
        console.log(metadata);
        console.log(metadata[0].id);

        let samples = data.samples;
        console.log(samples);

        let namesList = [];
        for (let i = 0; i < names.length; i++) {
            namesList.push(names[i]);
        }
        console.log(namesList);


        let select = document.getElementById("selDataset");

        // Dropdown Menu Options

        for (let i = 0; i < namesList.length; i++) {
            let option = namesList[i];
            let elect = document.createElement("option");
            elect.textContent = option;
            elect.value = option;
            select.appendChild(elect);
        }

        // Update Metadata
        d3.selectAll("#selDataset").on("click", function () {
            let selectedValue = this.value;
            let sample = metadata.find(({ id }) => id == selectedValue);
            document.getElementById('sample-metadata').innerHTML = "";

            function createMetadata(obj) {
                this.AGE = obj.age;
                this.BBTYPE = obj.bbtype;
                this.ETHNICITY = obj.ethnicity;
                this.GENDER = obj.gender;
                this.LOCATION = obj.location;
                this.WFREQ = obj.wfreq;
                this.sample = obj.id;
            }
            let sampleMetadata = new createMetadata(sample);
           
            for (let property in sampleMetadata) {
                console.log(`${property}: ${sampleMetadata[property]}`);
            }

            for (let property in sampleMetadata) {
                let json = (`${property}: ${sampleMetadata[property]}`);
                document.getElementById('sample-metadata').innerHTML += '<br>' + json;
                json = '';
            }

            // Bar Chart
            let samplesID = samples.find(({ id }) => id == selectedValue);
            document.getElementById("bar").innerHTML = "";
            

            let id = samplesID.id;
            let otuIds = samplesID.otu_ids;
            let sampleValues = samplesID.sample_values;
            let otuLabels = samplesID.otu_labels;

            otuIds = otuIds.slice([0], [10]);
            sampleValues = sampleValues.slice([0], [10]);
            otuLabels = otuLabels.slice([0], [10]);
           
            otuIds = otuIds.map(d => "OTU " + d);
           
            let chartData = [];
            for (let i = 0; i < sampleValues.length; i++) {
                chartData.push({
                    sample: sampleValues[i],
                    id: otuIds[i],
                    label: otuLabels[i],
                    
                });
            }
           
            let sortedChartData = chartData.sort((a, b) => (a.sample < b.sample) ? 1 : -1);
            let reversedChartData = sortedChartData.reverse();
            
            let trace1 = {
                x: reversedChartData.map(object => object.sample),
                y: reversedChartData.map(object => object.id),
                text: reversedChartData.map(object => object.label),
                type: "bar",
                orientation: "h",
            };
                       
            let otuData = [trace1];
            let layout = {
                title: "Top 10 OTUs",
                yaxis: {
                    range: "nonnegative",
                    
                }             
               
            };
            Plotly.newPlot("bar", otuData, layout);

        }


        )
    })




// Read json data

// Parse and filter data to get sample names

// Add dropdown option for each sample

// Call functions below using the first sample to build metadata and initial plots



// Define a function that will create metadata for given sample
function buildMetadata(sample) {

    // Read the json data

    // Parse and filter the data to get the sample's metadata

    // Specify the location of the metadata and update it

}

// Define a function that will create charts for given sample
function buildCharts(sample) {

    // Read the json data

    // Parse and filter the data to get the sample's OTU data
    // Pay attention to what data is required for each chart

    // Create bar chart in correct location

    // Create bubble chart in correct location

}


function optionChanged(sample) {
    // The parameter being passed in this function is new sample id from dropdown menu

    // Update metadata with newly selected sample

    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();

