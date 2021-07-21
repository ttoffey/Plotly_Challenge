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
            let wfreq = sampleMetadata.WFREQ;


            otuIds = otuIds.slice([0], [10]);
            sampleValues = sampleValues.slice([0], [10]);
            otuLabels = otuLabels.slice([0], [10]);

            let barOtuIds = otuIds.map(d => "OTU " + d);

            let chartData = [];
            for (let i = 0; i < sampleValues.length; i++) {
                chartData.push({
                    sample: sampleValues[i],
                    id: barOtuIds[i],
                    label: otuLabels[i],

                });
            }

            let sortedChartData = chartData.sort((a, b) => (a.sample < b.sample) ? 1 : -1);
            let reversedChartData = sortedChartData.reverse();

            let trace = {
                x: reversedChartData.map(object => object.sample),
                y: reversedChartData.map(object => object.id),
                text: reversedChartData.map(object => object.label),
                type: "bar",
                orientation: "h",
            };

            let otuData = [trace];
            let layout = {
                title: "Top 10 OTUs",
                yaxis: {
                    range: "nonnegative",
                }

            };
            Plotly.newPlot("bar", otuData, layout);

            // Bubble Chart

            let bubbleChartData = [];
            for (let i = 0; i < sampleValues.length; i++) {
                bubbleChartData.push({
                    sample: sampleValues[i],
                    id: otuIds[i],
                    label: otuLabels[i],

                });
            }

            let trace1 = {
                x: bubbleChartData.map(object => object.id),
                y: bubbleChartData.map(object => object.sample),
                text: bubbleChartData.map(object => object.label),
                mode: 'markers',
                marker: {
                    size: bubbleChartData.map(object => object.sample),
                    color: bubbleChartData.map(object => object.id),

                }
            };

            console.log(wfreq);

            let bubbleData = [trace1];
            let layout1 = {
                xaxis: {
                    title: "OTU IDS",
                },
                showlegend: false,
                height: 600,
                width: 1000,
            };

            Plotly.newPlot("bubble", bubbleData, layout1);

            // Gauge

            let gaugeData = [
                {
                    mode: "number+delta+gauge",
                    // domain: { x: [0, 9], y: [1, 9] },
                    // colorway: ['#f3cec9', '#e7a4b6', '#cd7eaf', '#a262a9', '#6f4d96', '#3d3b72', '#182844'],
                    colorscale: 'Earth',
                    delta: {reference: 380},
                    gauge: {
                        axis: {
                            range: [0, 9]},
                      
                    },
                    colorscale: "Earth",
                    value: wfreq,
                    title: { text: "Belly Button Washing Frequency" },
                    type: "indicator",
                    mode: "gauge+number"
                }
            ];

            var layout2 = { width: 600, height: 500, margin: { t: 0, b: 0 } };
            Plotly.newPlot('gauge', gaugeData, layout2);

        });
    });



init();

