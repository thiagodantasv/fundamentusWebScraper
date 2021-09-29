const puppeteer = require('puppeteer');

const getStocksList = async () => {
    console.log(`Started fetching a list of all stocks (${new Date().toLocaleString()})`);
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    await page.goto('https://www.fundamentus.com.br/detalhes.php?papel=');

    const stocks = await page.evaluate(()=>{
        let stocks = [];
        let table = document.getElementById('test1');
        
        for(let i in table.rows){
            try{
                let row = table.rows[i];
                let cell = row.cells[0].innerText;
                stocks.push(cell);
            }catch(e){
                //ignore the error
            }
        }
        return stocks;
    });
    await browser.close();

    //removing the header of the table.
    stocks.shift();
    console.log(`Finished fetching a list of all stocks (${new Date().toLocaleString()}). \n Count of stocks: ${stocks.length}`);
    return stocks;
}

module.exports = getStocksList;