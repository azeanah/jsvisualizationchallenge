// begin

function getPlots(id) {

        d3.json("samples.json").then (data =>{
            var samples = data.samples;
            var result = samples.filter(sample => sample.id == id)[0]

            var ids = result.otu_ids;
            var sampleValues =  result.sample_values.slice(0,10).reverse();
            var labels =  result.otu_labels.slice(0,10).reverse();
            
        // find top OTU
            var OTU_top = ids.slice(0, 10).reverse();


        // create ids
            var OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)


         // create lables
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };

            // define variable
            var data = [trace];


            // create layout
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };


            // bar plot
        Plotly.newPlot("bar", data, layout);
            var trace1 = {
                x: result.otu_ids,
                y: result.sampleValues,
                mode: "markers",
                marker: {
                    size: result.sampleValues,
                    color: result.otu_ids
                },
                text:  result.otu_labels
            };

            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 700,
                width: 1200
            };

            var data1 = [trace1];

        Plotly.newPlot("bubble", data1, layout_2);
        });
    }


    function getDemoInfo(id) {

        d3.json("samples.json").then((data)=> {

            var metadata = data.metadata;
            console.log(metadata)
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
           var demographicInfo = d3.select("#sample-metadata");
           demographicInfo.html("");
            Object.entries(result).forEach((key) => {
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
            });
        });
    }

    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }

    function init() {
        var dropdown = d3.select("#selDataset");

        d3.json("samples.json").then((data)=> {
            console.log(data)
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });

            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    init();
function getDemoInfo(id) {

// json
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        console.log(metadata)
       var result = metadata.filter(meta => meta.id.toString() === id)[0];
       var demographicInfo = d3.select("#sample-metadata");
       demographicInfo.html("");

        Object.entries(result).forEach((key) => {
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}