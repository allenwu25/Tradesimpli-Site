
export default function highchartsConfig(sym, pricedata) {
    return {
        chart: {
            zoomType: 'x'
        },

        title: {
            text: ''
        },
        subtitle: {
            text: 'Click and drag in the plot area to zoom in'
        },
    
        yAxis: {
            title: {
                text: 'Price (USD)'
            }
        },

        xAxis: {

            type: 'datetime'
        },
    
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            }
        },
    
        series: [{
            name: "Stock Price",
            data: pricedata
        }],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                }
            }]
        },
        credits: {
            enabled: false
        },
    
    }
}