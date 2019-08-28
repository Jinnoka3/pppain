
const fs = require('fs');
const { buildPathHtml } = require('./buildPaths');

let data = fs.readFileSync("data.json", "utf8");
obj = JSON.parse(data);

var tableBody = '';

function createRow(item) {

    for(var a in obj) {
        for(var b in obj.flowsToRun){
            var q = Number(b) + 1;
            tableBody += `<table><h2>Flow To Step ${q}</h2><tr> <th>Project Name</td> <th>Cucumber Options</td> </tr>`;
            for(var c in obj.flowsToRun[b].flowSteps){
                tableBody += `<tr>
                <td>${item.flowsToRun[b].flowSteps[c].projectName}</td>
                <td>${item.flowsToRun[b].flowSteps[c].cucumberOptions}</td>
                </tr>`
            }
            tableBody += `<tr></tr></table>`;
        }
    }
    return tableBody;
}

const createHtml = (table) => `
  <html>
    <head>
      <style>
        table {
          width: 100%;
        }
        tr {
          text-align: left;
          border: 1px solid black;
        }
        th, td {
          padding: 15px;
        }
        tr:nth-child(odd) {
          background: #CCC
        }
        tr:nth-child(even) {
          background: #FFF
        }
        .no-content {
          background-color: red;
        }
      </style>
    </head>
    <body>
      ${table}
    </body>
  </html>
`;

const doesFileExist = (filePath) => {
    try {
        fs.statSync(filePath); // get information of the specified file path.
        return true;
    } catch (error) {
        return false;
    }
};

if (doesFileExist(buildPathHtml)) {
    fs.unlinkSync(buildPathHtml);
}

const rows = createRow(obj);
const html = createHtml(rows);
fs.writeFileSync(buildPathHtml, html);