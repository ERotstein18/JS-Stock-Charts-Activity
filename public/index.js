function getColor(stock) {
    if (stock === 'GME') {
        return 'rgba()'
    }
    if (stock === 'MSFT') {
        return 'rgba()'
    }
    if (stock === 'DIS') {
        return 'rgba()'
    }
    if (stock === 'BNTX') {
        return 'rgba()'
    }
}

async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    
    const response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=b2b0e11651294ee9a789558a1625b754')
    
    const result = await response.json()

    const { GME, MSFT, DIS, BNTX } = mockData;

    const stocks = [GME, MSFT, DIS, BNTX];
    
    stocks.forEach(stock => stock.values.reverse())

    /*Next, let's replace ctx with the 2d context for the canvas element we queried above, and change the type of chart from bar to line:*/
    // Time Chart
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.map.symbol,
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
                data: stock.values.map(value => parseFloat(value.high))
            }))
        }
    });

    //High Chart
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    findHighest(stock.values)
                ))
            
        }]
        }
    });

    //Average Chart
    new Chart(averagePriceChartCanvas.getContext('2d'),{
        type: 'pie',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
                datasets: [{
                    label: 'Average',
                    backgroundColor: stocks.map(stock => (
                        getColor(stock.meta.symbol)
                    )),
                    borderColor: stocks.map(stock => (
                        getColor(stock.meta.symbol)
                    )),
                    data: stocks.map(stock => (
                        calculateAverage(stock.values)
                    ))
                }]
             }
         });
    }
    
function findHighest(values) {
    let highest = 0;
    values.forEach(value => {
        if (parseFloat(value.high) > highest) {
            highest = value.high
        }
    })
    return highest
    }

function calculateAverage(values) {
    let total = 0;
    values.forEach(value => {
        total += parseFloat(value.high)
    })
    return total /values.length
    }


main()