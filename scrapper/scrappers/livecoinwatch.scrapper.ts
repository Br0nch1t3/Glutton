import { WebDriver } from "selenium-webdriver";
import {
  HTMLRequest,
  NumericDataEntryType,
} from "../models/requests/html.request";
import { execRegexOnce } from "../utils/regex";
import { newNumericDataEntry } from "../utils/data";

export default async function liveCoinWatchScrapper(
  driver: WebDriver,
): Promise<HTMLRequest> {
  const priceRegex = /(?:\$)(\d+.\d+|\d+)(?:(?: )([M|B|K]))*/g;
  const timeRegex = /(\d+.\d+|\d+)(?:\%)/g;
  const url = "https://www.livecoinwatch.com/";
  const currentUrl = await driver.getCurrentUrl();

  if (currentUrl !== url) {
    await driver.get(url);
  }

  const data: string[][] = await driver.executeScript(`
    function cellValueGetter(td) {
      return td.textContent || td.innerText;
    }
    function tableToArray(tbl) {
      var twoD = [];
      for (
        var rowCount = tbl.rows.length, rowIndex = 2;
        rowIndex < rowCount;
        rowIndex++
      ) {
        twoD.push([]);
      }
      for (var rowIndex = 2, tr; rowIndex < rowCount; rowIndex++) {
        var tr = tbl.rows[rowIndex];
        for (
          var colIndex = 0, colCount = tr.cells.length, offset = 0;
          colIndex < colCount;
          colIndex++
        ) {
          var td = tr.cells[colIndex],
            text = cellValueGetter(td);
          while (twoD[rowIndex - 2].hasOwnProperty(colIndex + offset)) {
            offset++;
          }
          for (
            var i = 0, colSpan = parseInt(td.colSpan, 10) || 1;
            i < colSpan;
            i++
          ) {
            for (
              var j = 0, rowSpan = parseInt(td.rowSpan, 10) || 1;
              j < rowSpan;
              j++
            ) {
              twoD[rowIndex - 2 + j][colIndex + offset + i] = text;
            }
          }
        }
      }
      return twoD.map(c => c.slice(1, -1));
    }
    return tableToArray(window.document.getElementsByTagName("table").item(0));    
  `);

  return {
    source: url,
    data: data.map((entry) => {
      const [
        coins,
        price,
        marketCap,
        volume,
        liquidity,
        allTimeHigh,
        hourGrowth,
        dayGrowth,
      ] = entry;

      return {
        name: getNamePair(coins),
        metrics: {
          price: newNumericDataEntry(
            execRegexOnce(priceRegex)(price),
            NumericDataEntryType.PRICE,
          ),
          marketCap: newNumericDataEntry(
            execRegexOnce(priceRegex)(marketCap),
            NumericDataEntryType.PRICE,
          ),
          volume: newNumericDataEntry(
            execRegexOnce(priceRegex)(volume),
            NumericDataEntryType.PRICE,
          ),
          liquidity: newNumericDataEntry(
            execRegexOnce(priceRegex)(liquidity),
            NumericDataEntryType.PRICE,
          ),
          allTimeHigh: newNumericDataEntry(
            execRegexOnce(priceRegex)(allTimeHigh),
            NumericDataEntryType.PRICE,
          ),
          hourGrowth: newNumericDataEntry(
            execRegexOnce(timeRegex)(hourGrowth),
            NumericDataEntryType.PRICE,
          ),
          dayGrowth: newNumericDataEntry(
            execRegexOnce(timeRegex)(dayGrowth),
            NumericDataEntryType.PRICE,
          ),
        },
      };
    }),
  };
}

const getNamePair = (pair: string) => {
  const [short, ...long] = pair.split(/\s/);

  return `${short}(${long.join(" ")})`;
};
