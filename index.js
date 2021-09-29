const getStocksList = require('./getStocksList');
const stockProcess = require('./stockProcess');
const exportExcel = require('./exportExcel');

(async () => {
    let started = new Date().toLocaleString();
    const stocksList = await getStocksList();
    
    const stocksDataList = await stockProcess(stocksList);
    
    await exportExcel(stocksDataList.stocksData, stocksDataList.stocksWithoutData);

    console.log('Started At ->', started);
    console.log('Finished At ->', new Date().toLocaleString());
    console.log(`Stocks found: ${stocksDataList.stocksData.length} \nStocks not found: ${stocksDataList.stocksWithoutData.length}`);
})();