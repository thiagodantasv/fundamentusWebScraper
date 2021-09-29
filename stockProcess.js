const puppeteer = require('puppeteer');

const stockProcess = async(stockList) => {
    //
    let stocksData = [];
    let stocksWithoutData = [];
    //initiate the page
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    
    //iterate stockList
    for(let i = 0; i < stockList.length; i++){
        let stock = stockList[i];
        let pageUrl = `https://www.fundamentus.com.br/detalhes.php?papel=${stock}`;
        
        console.log(`Processing ${stock} (${new Date().toLocaleString()})`);
        console.log(`Fetching data from ${pageUrl} (${new Date().toLocaleString()})`);

        await page.goto(pageUrl);
        
        const processedStock = await page.evaluate(()=>{
            try{
                let tables = document.getElementsByClassName('w728');
                let informationsOnScreen = [];
                for(let i in tables[0].rows){
                    try{
                        let row = tables[0].rows[i];
                        let cellInfosOne = row.cells[1].innerText;
                        let cellInfosTwo = row.cells[3].innerText;
                        informationsOnScreen.push(cellInfosOne);
                        informationsOnScreen.push(cellInfosTwo);
                    }catch(e){
                        //ignore the error
                    }
                }
        
                for(let i in tables[1].rows){
                    try{
                        let row = tables[1].rows[i];
                        let cellInfosOne = row.cells[1].innerText;
                        let cellInfosTwo = row.cells[3].innerText;
                        informationsOnScreen.push(cellInfosOne);
                        informationsOnScreen.push(cellInfosTwo);
                    }catch(e){
                        //ignore the error
                    }
                }
        
                for(let i in tables[2].rows){
                    try{
                        let row = tables[2].rows[i];
                        let cellInfosOne = row.cells[1].innerText;
                        let cellInfosTwo = row.cells[3].innerText;
                        let cellInfosThree = row.cells[5].innerText;
                        informationsOnScreen.push(cellInfosOne);
                        informationsOnScreen.push(cellInfosTwo);
                        informationsOnScreen.push(cellInfosThree);
                    }catch(e){
                        //ignore the error
                    }
                }
        
                for(let i in tables[3].rows){
                    try{
                        let row = tables[3].rows[i];
                        let cellInfosOne = row.cells[1].innerText;
                        let cellInfosTwo = row.cells[3].innerText;
                        informationsOnScreen.push(cellInfosOne);
                        informationsOnScreen.push(cellInfosTwo);
                    }catch(e){
                        //ignore the error
                    }
                }
        
                for(let i in tables[4].rows){
                    try{
                        let row = tables[4].rows[i];
                        let cellInfosOne = row.cells[1].innerText;
                        let cellInfosTwo = row.cells[3].innerText;
                        informationsOnScreen.push(cellInfosOne);
                        informationsOnScreen.push(cellInfosTwo);
                    }catch(e){
                        //ignore the error
                    }
                }
                let stockInformation = {
                    papel: informationsOnScreen[0] ? informationsOnScreen[0] : '-',
                    empresa:informationsOnScreen[4] ? informationsOnScreen[4] : '-',
                    setor:informationsOnScreen[6] ? informationsOnScreen[6] : '-',
                    subsetor:informationsOnScreen[8] ? informationsOnScreen[8] : '-',
                    cotacao:`R$ ${informationsOnScreen[1] ? informationsOnScreen[1] : '-'}`,
                    valorDeMercado:`R$ ${informationsOnScreen[10] ? informationsOnScreen[10] : '-'}`,
                    nroAcoes:informationsOnScreen[13] ? informationsOnScreen[13] : '-',
                    pl:informationsOnScreen[15] ? informationsOnScreen[15] : '-',
                    evEbitda:informationsOnScreen[39] ? informationsOnScreen[39] : '-',
                    evEbit:informationsOnScreen[42] ? informationsOnScreen[42] : '-',
                    margemBruta:informationsOnScreen[22] ? informationsOnScreen[22] : '-',
                    margemEbit:informationsOnScreen[25] ? informationsOnScreen[25] : '-',
                    margemLiquida:informationsOnScreen[28] ? informationsOnScreen[28] : '-',
                    divBrPatrim:informationsOnScreen[43] ? informationsOnScreen[43] : '-',
                    ativo:`R$ ${informationsOnScreen[47] ? informationsOnScreen[47] : '-'}`,
                    dividaBruta:`R$ ${informationsOnScreen[48] ? informationsOnScreen[48] : '-'}`,
                    dividaLiquida:`R$ ${informationsOnScreen[50] ? informationsOnScreen[50] : '-'}`,
                    patrimonioLiquido:`R$ ${informationsOnScreen[52] ? informationsOnScreen[52] : '-'}`,
                    receitaLiquida:`R$ ${informationsOnScreen[53] ? informationsOnScreen[53] : '-'}`,
                    ebit:`R$ ${informationsOnScreen[55] ? informationsOnScreen[55] : '-'}`,
                    lucroLiquido:`R$ ${informationsOnScreen[57] ? informationsOnScreen[57] : '-'}`
                };
                return stockInformation;
            }catch(error){
                return {
                    error: true,
                    message: `Error when fetching data from page. Error: ${error}`
                }
            }
        });
        
        if(!processedStock.error){
            stocksData.push(processedStock);
            console.log(`Finished fetching ${stock} data (${new Date().toLocaleString()})`);
        }else{
            console.log(`FAILED FETCHING ${stock} DATA (${new Date().toLocaleString()})`);
            stocksWithoutData.push(stock);
            //write error file showing missing stocks;
        }
    }

    await browser.close();
    return {
        stocksData,
        stocksWithoutData
    };
}

module.exports = stockProcess;