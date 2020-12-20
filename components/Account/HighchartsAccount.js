
export default function highchartsAccount(pricedata) {
    return {
        chart: {
            zoomType: 'x'
        },

        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
    
        yAxis: {
            title: {
                text: 'Account Value (USD)'
            }
        },

        xAxis: {

            type: 'datetime'
        },
    
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            }
        },
    
        series: [{
            name: "Account Value",
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