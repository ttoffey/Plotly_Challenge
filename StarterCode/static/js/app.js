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
        


        // let metadataList = [];
        // for (let i = 0; i < metadata.length; i++) {
        //     metadataList.push(i);
        // }
        // console.log(metadataList);


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
            console.log(this.value);
            let selectedValue = this.value;
            console.log(selectedValue);
            
            let result = metadata.find ( ( {id}) => id == selectedValue);
            console.log(result);

           

            
        })





    });




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

