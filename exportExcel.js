const xl = require('excel4node');

const exportExcel = async(stocksInformationList, stocksNoDataList) => {
    try{
        console.log(`Building a Excel File (${new Date().toLocaleString()})`);
        let workbook = new xl.Workbook();
        let worksheet = await workbook.addWorksheet("Lista de papéis");
        
        //excel file header
        stocksInformationList.unshift(
            {
                papel: 'Papel',
                empresa:'Empresa',
                setor:'Setor',
                subsetor:'Subsetor',
                cotacao:'Cotação',
                valorDeMercado:'Valor de Mercado',
                nroAcoes:'Nro. Ações',
                pl:'P/L',
                evEbitda:'EV/EBITDA',
                evEbit:'EV/EBIT',
                margemBruta:'Marg. Bruta',
                margemEbit:'Marg. EBIT',
                margemLiquida:'Marg. Líquida',
                divBrPatrim:'Div Br/Patrim',
                ativo:'Ativo',
                dividaBruta:'Dív. Bruta',
                dividaLiquida:'Dív. Líquida',
                patrimonioLiquido:'Patrim. Líq',
                receitaLiquida:'Receita Líquida',
                ebit:'EBIT',
                lucroLiquido:'Lucro Líquido'
            }
        );

        await stocksInformationList.forEach((stock, i) => {
            let cellPosition = i + 1;
            worksheet.cell(cellPosition, 1).string(stock.papel);
            worksheet.cell(cellPosition, 2).string(stock.empresa);
            worksheet.cell(cellPosition, 3).string(stock.setor);
            worksheet.cell(cellPosition, 4).string(stock.subsetor);
            worksheet.cell(cellPosition, 5).string(stock.cotacao);
            worksheet.cell(cellPosition, 6).string(stock.valorDeMercado);
            worksheet.cell(cellPosition, 7).string(stock.nroAcoes);
            worksheet.cell(cellPosition, 8).string(stock.pl);
            worksheet.cell(cellPosition, 9).string(stock.evEbitda);
            worksheet.cell(cellPosition, 10).string(stock.evEbit);
            worksheet.cell(cellPosition, 11).string(stock.margemBruta);
            worksheet.cell(cellPosition, 12).string(stock.margemEbit);
            worksheet.cell(cellPosition, 13).string(stock.margemLiquida);
            worksheet.cell(cellPosition, 14).string(stock.divBrPatrim);
            worksheet.cell(cellPosition, 15).string(stock.ativo);
            worksheet.cell(cellPosition, 16).string(stock.dividaBruta);
            worksheet.cell(cellPosition, 17).string(stock.dividaLiquida);
            worksheet.cell(cellPosition, 18).string(stock.patrimonioLiquido);
            worksheet.cell(cellPosition, 19).string(stock.receitaLiquida);
            worksheet.cell(cellPosition, 20).string(stock.ebit);
            worksheet.cell(cellPosition, 21).string(stock.lucroLiquido);
        });
        worksheet.column(1).setWidth(20);
        worksheet.column(2).setWidth(50);
        worksheet.column(3).setWidth(50);
        worksheet.column(4).setWidth(20);
        worksheet.column(5).setWidth(40);
        worksheet.column(6).setWidth(40);
        worksheet.column(7).setWidth(25);
        worksheet.column(8).setWidth(30);
        worksheet.column(9).setWidth(35);
        worksheet.column(10).setWidth(35);
        worksheet.column(11).setWidth(40);
        worksheet.column(12).setWidth(30);
        worksheet.column(13).setWidth(50);
        worksheet.column(14).setWidth(60);
        worksheet.column(15).setWidth(50);
        worksheet.column(16).setWidth(40);
        worksheet.column(17).setWidth(50);
        worksheet.column(18).setWidth(50);
        worksheet.column(19).setWidth(50);
        worksheet.column(20).setWidth(50);
        worksheet.column(21).setWidth(50);

        if(stocksNoDataList.length){
            let worksheetNoDataStocks = await workbook.addWorksheet("Papéis sem índice");

            await stocksNoDataList.forEach((stock, i) => {
                let cellPosition = i + 1;
                worksheetNoDataStocks.cell(cellPosition, 1).string(stock);
            });
        }
    
        await workbook.write("Lista-de-Papeis.xlsx");
        console.log(`Excel File created Succesfully (${new Date().toLocaleString()})`);
        return true;
    }catch(error){
        console.log('Could not create excel file: error ->', error);
        return false;
    }
}

module.exports = exportExcel;