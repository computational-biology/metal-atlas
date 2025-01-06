
obj1 = JSON.stringify(MG);

var data = JSON.parse(obj1);
var global_download_data = "";
var global_download_data_header = "accn, trp, res1, bp1 ,res2, bp2 ,res2,   res1_detail  , res1_detail  , res1_detail\n";

//const isUpperCase = (string) => /^[A-Z]*$/.test(string);

const global_detail_headers = [
  "PDB-ID", 
  "Met Res ID", 
  "Chn", 
  "Ion", 
  "Ln", 
  "Pos", 
  "NUC", 
  "Atom", 
  "Res1 ID", 
  "Ch", 
  "Res2 ID", 
  "Ch", 
  "Res1", 
  "Res2", 
  "Eg1", 
  "Eg2", 
  "Ori", 
  "Eval", 
  "Dist", 
  "numBP"
];

// Map headers to object keys for explicit mapping
const global_metal_keys = [
  "pdbid", 
  "metresid", 
  "metchain", 
  "metal", 
  "link", 
  "position", 
  "attaching_nuc", 
  "attaching_atom", 
  "res1id", 
  "res1chain", 
  "res2id", 
  "res2chain", 
  "res1", 
  "res2", 
  "edge1", 
  "edge2", 
  "orien", 
  "eavl", 
  "dist", 
  "numbp"
];

// Function to generate HTML table
function generateTable(data, headers, keys) {
  // Create a table element
  const table = document.createElement("table");
  table.innerHTML = "";
  table.style.borderCollapse = "collapse";
  table.style.width = "100%";

  // Add table header row
  const headerRow = document.createElement("tr");
  headers.forEach(header => {
    const th = document.createElement("th");
    th.textContent = header;
    th.style.border = "1px solid black";
    th.style.padding = "8px";
    th.style.backgroundColor = "#f2f2f2";
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Add data rows
  data.forEach(item => {
    const row = document.createElement("tr");
    keys.forEach(key => {
      const td = document.createElement("td");
      td.textContent = item[key];
      td.style.border = "1px solid black";
      td.style.padding = "8px";
      row.appendChild(td);
    });
    table.appendChild(row);
  });

  return table;
}

// Insert the table into the document
function generate_table_container(){
      const tableContainer = document.getElementById("table-container");
      const table_old = tableContainer.querySelector("table"); // Select the table inside the container
        if (table_old) {
          tableContainer.removeChild(table_old); // Remove the table
        }
      const table = generateTable(data, global_detail_headers, global_metal_keys);
      
      tableContainer.appendChild(table);
}

function isUpperCase(a){
  //var str = a;
  //console.log(str);
  var x = a.charAt(0);

  if (x === x.toUpperCase())
    {
        return true;
   }
    else
    {
        return false;
   }
}

function get_bptype_std(bp, rescls1, rescls2){
      if(isUpperCase(rescls1) === false || isUpperCase(rescls2) === false){
          return "NO-MATCH";
      }
      var a = bp.substr(0,1);
      var b = bp.substr(2,1);
      if((a === "W" || a === "H" || a === "S") && (b === "W" || b === "H" || b === "S")){
	    return "STD";
      }else {
	    return "NO-MATCH";
      }
}

function get_bptype_cho(bp, rescls1, rescls2){
      if(isUpperCase(bp.substr(0,1)) === false){
          return "CHO";
      }else{
          return "NO-MATCH";
      }
}

function get_bptype_sug(bp, rescls1, rescls2){
      if(isUpperCase(bp.substr(3,1)) === false){
          return "SUG";
      }else{
          return "NO-MATCH";
      }
}

function get_bptype_mod(bp, rescls1, rescls2){
      if(isUpperCase(rescls1) === false || isUpperCase(rescls2) == false){
          return "MOD";
      }else{
          return "NO-MATCH";
      }
}

function get_bptype_proto(bp, rescls1, rescls2){
      var a = bp.substr(0,1);
      var b = bp.substr(2,1);
      if((a === "+" || a === "z" || a === "g") || (b === "+" || b === "g" || b ==="z")){
        return "PROTO";
      }else{
	    return "NO-MATCH";
      }
}

function is_std_basepair(x){
      
      var a = x.substr(0,1);
      var b = x.substr(2,1);
      if((a === "W" || a === "H" || a === "S") && (b === "W" || b === "H" || b ==="S")){
	    return true;
      }else{
	    return false;
      }
}




function gen_position_pie_chart(){
    // Get the canvas element
    const ctx = document.getElementById('pos_pie_chart').getContext('2d');

    // Data for the chart
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'], // X-axis labels
      datasets: [
        {
          label: 'Sales', // Legend label
          data: [10, 20, 30, 40, 50, 60], // Data points
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color (with transparency)
          borderColor: 'rgba(75, 192, 192, 1)', // Border color
          borderWidth: 1 // Border width
        }
      ]
    };

    // Configuration for the chart
    const config = {
      type: 'pie', // Chart type (e.g., 'bar', 'line', 'pie', etc.)
      data: data,
      options: {
        responsive: false,
				maintainAspectRatio: false, // Allow independent width and height
        scales: {
          y: {
            beginAtZero: true // Y-axis starts at 0
          }
        }
      }
    };

    // Create and render the chart
    const myChart = new Chart(ctx, config);
}

function display_all_charts(){
  gen_position_pie_chart();
}



