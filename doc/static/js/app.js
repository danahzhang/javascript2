function handleSubmit() {
    
    d3.json("samples.json").then(function(datas) {
        var idObjects = [];
        for (x = 0; x < datas.samples.length; x++){
            var idObject = {"value": x, "text": datas.samples[x].id};
            idObjects.push(idObject);
        };

        var selectTag = d3.select("#selDataset")
            .selectAll('option')
            .data(idObjects)
            .enter()
            .append('option')
            .attr('value', function(d) {
                return d.value;
            })
            .text(function(d) {
                return d.text;
            });
        
        // Select the input value from the form
        var theID = d3.select("#selDataset").node().value;

        //Create Demographic Info Chart
        
        var aKey = Object.keys(datas.metadata[theID]);
        var aValue = Object.values(datas.metadata[theID]);
        var theInfo = [];
        for (x = 0; x < aKey.length; x++) {
            theInfo.push(aKey[x]+": "+ aValue[x]);
            };
        var infoChart = d3.select("#sample-metadata")
            .selectAll('div')  
            .data(theInfo)
            .enter()
            .append("div")
            .text(function(d) {
                return d;
            });


            // Build the plots
        charts(theID);
    });
  };

function charts(theID) {
    d3.json("samples.json").then(function(datas) {
      
        //Creating Bar Chart
        var bar = [
            {
              y: datas.samples[theID].otu_ids.slice(0,9),
              x: datas.samples[theID].sample_values.slice(0,9),
              type: 'bar',
              orientation: 'h',
              text: datas.samples[theID].otu_labels.slice(0,9)
            }
          ];
        var layout = {
            title: 'Top 10 OTUs',
            yaxis: {'type': 'category'},
            yaxis_title: "OTU",
        };
        Plotly.newPlot('bar', bar, layout);
        
        //Creating Bubble Chart
        var trace1 = {
            x: datas.samples[theID].otu_ids,
            y: datas.samples[theID].sample_values,
            mode: 'markers',
            marker: {
              size: datas.samples[theID].sample_values,
              color:datas.samples[theID].otu_ids
            },
            text: datas.samples[theID].otu_labels
          };

          var data = [trace1];
          
          Plotly.newPlot('bubble', data);
    });
};

d3.select("#selDataset").on("click", handleSubmit);  