import PDFParser from "pdf2json";

const parsePDF = (filePath) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on(
      "pdfParser_dataError",
      (errData) => {
        reject(errData.parserError);
      }
    );

    pdfParser.on(
      "pdfParser_dataReady",
      (pdfData) => {
        try {
          let extractedText = "";

          pdfData.Pages.forEach((page) => {
            page.Texts.forEach(
              (textItem) => {
                textItem.R.forEach((r) => {
                  extractedText +=
                    r.T + " ";
                });
              }
            );
          });

          resolve(extractedText);
        } catch (error) {
          reject(error);
        }
      }
    );

    pdfParser.loadPDF(filePath);
  });
};

export default parsePDF;