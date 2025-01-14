
obj1 = JSON.stringify(metal);

const global_metal_data = JSON.parse(obj1);
var global_data = [];
var global_count_data = [];

  let global_chart1 = null;
  let global_chart2 = null;
  let global_chart3 = null;
  let global_chart4 = null;
  let global_chart5 = null;
  let global_chart6 = null;

const gua_var_names=[
  "G",
  "  G",
  " G ",
  "G  ",
  "DG ",
  " DG",
  "DG",
  "GUA",
  "DG5",
  "DG3",
  "2MG",
  "OMG",
  "G7M",
  "GNP",
  "7MG",
  "1MG",
  "5CG",
  "+G ",
  " +G",
  "+G",
  "GDP",
  "M2G",
  "  I",
  " I ",
  "I  ",
  "I",
  "GMP",
  "GTP",
  "DG ",
  " DG",
  "DG",
  "PGP",
  " YG",
  "YG ",
  "YG",
  "YYG",
  "2PR",
  "XUG",
  " RG",
  "RG ",
  "RG",
  "RG5",
  "RG3",
  "6OG"
];


function is_guavar(res){

  for(i in gua_var_names){
    if(res === gua_var_names[i]) return true;
  }
  return false;
}


const ade_var_names = [
  "A",
  "  A",
  " A ",
  "A  ",
  "ADE",
  "DA5",
  "DA3",
  "1MA",
  "MIA",
  "+A ",
  " +A",
  "+A",
  "AMP",
  "AMO",
  "12A",
  "AET",
  "PSD",
  "AVC",
  "APC",
  "GOM",
  "MAD",
  "A23",
  "ATP",
  "2MA",
  "A2M",
  "T6A",
  "RIA",
  "6MZ",
  "6IA",
  " DA",
  "DA ",
  "DA",
  " RA",
  "RA ",
  "RA",
  "RA5",
  "RA3",
  "ADP",
  "5AA",
  "PR5",
  "2AD",
  "3DA",
  "ANZ",
  "AVC",
  "TSB",
  "QSI",
  "VAA"
];


function is_adevar(res){

  for(i in ade_var_names){
    if(res === ade_var_names[i]) return true;
  }
  return false;
}


const cyt_var_names = [
  "C",
  "  C",
  " C ",
  "C  ",
  "CYT",
  "DC5",
  "DC3",
  "RC5",
  "RC3",
  "5MC",
  "+C ",
  " +C",
  "+C",
  "OMC",
  "S4C",
  "CB2",
  "5IC",
  "CCC",
  "1SC",
  " DC",
  "DC ",
  "DC",
  " RC",
  "RC ",
  "RC",
  "CBV",
  "DCZ",
  "CSL",
  "CBR",
  "C38",
  "BLS",
  "5CM"
];

function is_cytvar(res){

  for(i in cyt_var_names){
    if(res === cyt_var_names[i]) return true;
  }
  return false;
}

const ura_var_names = [
  "T",
  "  T",
  " T ",
  "T  ",
  " DT",
  "DT ",
  "DT",
  "THY",
  "PSU",
  "DT5",
  "DT3",
  "DU5",
  "DU3",
  "BRU",
  "  U",
  " U ",
  "U  ",
  "U",
  "URA",
  "H2U",
  "5MU",
  "2MU",
  "4SU",
  "FMU",
  "CMO",
  "OMU",
  "70U",
  " +U",
  "+U ",
  "+U",
  "DHU",
  "UR3",
  " RT",
  "RT ",
  "RT",
  " RU",
  "RU ",
  "RU",
  "RU5",
  "RU3",
  "5BU",
  "S4U",
  "MTU",
  "MNU",
  "UMS",
  " IU",
  "IU ",
  "IU",
  "UD5",
  "PYO",
  "SUR",
  "SSU",
  "UCL",
  "5IU",
  " DU",
  "DU ",
  "DU"
];
  
function is_uravar(res){

  for(i in ura_var_names){
    if(res === ura_var_names[i]) return true;
  }
  return false;
}

function filterData() {
  // Get input values from HTML fields

  

  const pdbidInput = document.getElementById("accn").value;
  const metalInput = document.getElementById("metal").value;
  const positionInput = document.getElementById("position").value;
  const edge = document.getElementById("edge").value;
  const res1 = document.getElementById("attaching_base").value;
  const res2 = document.getElementById("otherbase").value;
  const is_modi_nucleic = document.getElementById("modified").value;







  let edge1 = null;
  let edge2 = null;
  if (edge !== "ALL") {
    edge1 = edge.substring(0, 1);
  } else {
    edge1 = "ALL";
  }

  if (edge !== "ALL") {
    edge2 = edge.substring(1, 2);
  } else {
    edge2 = "ALL";
  }
  console.log(edge1);
  console.log(edge2);


  // Add more fields as needed

  // Filter data based on input values
  global_data = global_metal_data.filter(item =>
    (!pdbidInput || pdbidInput === "ALL" || item.pdbid === pdbidInput) &&
    (!metalInput || metalInput === "ALL" || item.metal === metalInput) &&
    (!positionInput || positionInput === "ALL" || item.position === positionInput) &&
    (!edge1 || edge1 === "ALL" || item.edge1 === edge1) &&
    (!edge2 || edge2 === "ALL" || item.edge2 === edge2) &&
    (!res1 || res1 === "ALL" || item.res1 === res1) &&
    (!res2 || res2 === "ALL" || item.res2 === res2) 
    


    // Add more conditions as needed
  );

  // Store the filtered data in another array
  console.log("Filtered Data:", global_data);

  // Optionally, display the filtered data in the HTML
  //const resultContainer = document.getElementById("result");
  //resultContainer.textContent = JSON.stringify(filteredData, null, 2);
  global_count_data = countUniqueValuesPerColumn(global_data);
}


var global_download_data = "";
var global_download_data_header = "accn, trp, res1, bp1 ,res2, bp2 ,res2,   res1_detail  , res1_detail  , res1_detail\n";


const global_position_pie_data = [0, 0, 0];
const global_attaching_nuc_pie_data = [0, 0, 0, 0];

function countUniqueValuesPerColumn() {
  const uniqueCounts = {};

  // Iterate through each row
  global_data.forEach(row => {
    Object.entries(row).forEach(([column, value]) => {
      // Initialize the column if not already present
      if (!uniqueCounts[column]) {
        uniqueCounts[column] = {};
      }

      // Increment the count for the specific value
      uniqueCounts[column][value] = (uniqueCounts[column][value] || 0) + 1;
    });
  });

  return uniqueCounts;
}


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
  global_data.forEach(item => {
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
function generate_table_container() {
  filterData();
  const tableContainer = document.getElementById("table-container");
  const table_old = tableContainer.querySelector("table"); // Select the table inside the container
  if (table_old) {
    tableContainer.removeChild(table_old); // Remove the table
  }
  const table = generateTable(global_data, global_detail_headers, global_metal_keys);

  tableContainer.appendChild(table);
}

function isUpperCase(a) {
  //var str = a;
  //console.log(str);
  var x = a.charAt(0);

  if (x === x.toUpperCase()) {
    return true;
  }
  else {
    return false;
  }
}

function get_bptype_std(bp, rescls1, rescls2) {
  if (isUpperCase(rescls1) === false || isUpperCase(rescls2) === false) {
    return "NO-MATCH";
  }
  var a = bp.substr(0, 1);
  var b = bp.substr(2, 1);
  if ((a === "W" || a === "H" || a === "S") && (b === "W" || b === "H" || b === "S")) {
    return "STD";
  } else {
    return "NO-MATCH";
  }
}

function get_bptype_cho(bp, rescls1, rescls2) {
  if (isUpperCase(bp.substr(0, 1)) === false) {
    return "CHO";
  } else {
    return "NO-MATCH";
  }
}

function get_bptype_sug(bp, rescls1, rescls2) {
  if (isUpperCase(bp.substr(3, 1)) === false) {
    return "SUG";
  } else {
    return "NO-MATCH";
  }
}

function get_bptype_mod(bp, rescls1, rescls2) {
  if (isUpperCase(rescls1) === false || isUpperCase(rescls2) == false) {
    return "MOD";
  } else {
    return "NO-MATCH";
  }
}

function get_bptype_proto(bp, rescls1, rescls2) {
  var a = bp.substr(0, 1);
  var b = bp.substr(2, 1);
  if ((a === "+" || a === "z" || a === "g") || (b === "+" || b === "g" || b === "z")) {
    return "PROTO";
  } else {
    return "NO-MATCH";
  }
}

function is_std_basepair(x) {

  var a = x.substr(0, 1);
  var b = x.substr(2, 1);
  if ((a === "W" || a === "H" || a === "S") && (b === "W" || b === "H" || b === "S")) {
    return true;
  } else {
    return false;
  }
}








function show_details(accn, i) {
  var detdata = document.getElementById("detaildata");
  var mainstr = "<strong> Showing The Details of<br>ACCN: " + accn + "</strong><br>";
  mainstr = mainstr + "Residue Names=" + tripdata[i].resname1 + "-" + tripdata[i].resname2 + "-" + tripdata[i].resname3 + ",  <br>";
  mainstr = mainstr + "mmCIF residue details [" + tripdata[i].resname1 + "-" + tripdata[i].chain1 + ":" + tripdata[i].resid1 + tripdata[i].ins1 + ", ";
  mainstr = mainstr + tripdata[i].resname2 + "-" + tripdata[i].chain2 + ":" + tripdata[i].resid2 + tripdata[i].ins2 + ", ";
  mainstr = mainstr + tripdata[i].resname3 + "-" + tripdata[i].chain3 + ":" + tripdata[i].resid3 + tripdata[i].ins3 + "]<br> ";
  mainstr = mainstr + "Base pair Stability Value for " + tripdata[i].resname1 + ":" + tripdata[i].resname2 + "  " + tripdata[i].bpname1 + " is " + tripdata[i].eval12 + "<br>";
  mainstr = mainstr + "Base pair Stability Value for " + tripdata[i].resname2 + ":" + tripdata[i].resname3 + "  " + tripdata[i].bpname23 + " is " + tripdata[i].eval23;
  detdata.innerHTML = mainstr;
}

function gen_download_data(i) {
  global_download_data += tripdata[i].accn + ", " + tripdata[i].tripname + ", " + tripdata[i].resname1 + ", " + tripdata[i].bpname1 + ", " + tripdata[i].resname2 + ", " + tripdata[i].bpname23 + ", " + tripdata[i].resname3 + ", [ ( " + tripdata[i].chain1 + ", " + tripdata[i].resid1 + ", " + tripdata[i].ins1 + " ), ( " + tripdata[i].chain2 + ", " + tripdata[i].resid2 + ", " + tripdata[i].ins2 + " ), ( " + tripdata[i].chain3 + ", " + tripdata[i].resid3 + ", " + tripdata[i].ins3 + " ) ]\n";
}

function show_trip_details_proto(bptype) {

  var accnval = document.getElementById("accn").value;
  var tripnameval = document.getElementById("tripname").value;
  var edge1 = document.getElementById("edge1").value;
  var ori1 = document.getElementsByName("orient1");
  var orival1;
  global_download_data = global_download_data_header;
  for (var i = 0; i < ori1.length; i++) {
    if (ori1[i].checked === true) {
      orival1 = ori1[i].value;
    }
  }

  var edge2 = document.getElementById("edge2").value;
  var ori2 = document.getElementsByName("orient2");
  var orival2;
  for (var i = 0; i < ori2.length; i++) {
    if (ori2[i].checked === true) {
      orival2 = ori2[i].value;
    }
  }
  //      window.alert(orival2);
  //      var ori2 = document.getElementByName("orient2").value;
  var str = "<table id=\"resulttable\"><tr><td>ACCN</td><td>TRP</td><td>EDG1-EDG2</td><td>  View in JsMol</td><td>Detail Only</td></tr>";
  var count = 0;
  for (var i = 0; i < tripdata.length; ++i) {
    if (tripdata[i].compname === "T1" && (get_bptype_proto(tripdata[i].bpname1, tripdata[i].rescls1, tripdata[i].rescls2) === bptype || get_bptype_proto(tripdata[i].bpname23, tripdata[i].rescls2, tripdata[i].rescls3) === bptype)) {
      if ((accnval.length === 0 || tripdata[i].accn === accnval.toLowerCase())
        &&
        (tripnameval.length === 0 || tripdata[i].tripname === tripnameval)
        &&
        (edge1 === "ALL" || tripdata[i].bpname1.substr(0, 3) === edge1)
        &&
        (orival1 === "all" || orival1 === tripdata[i].bpname1.substr(3, 1))
        &&
        (edge2 === "ALL" || tripdata[i].bpname23.substr(0, 3) === edge2)
        &&
        (orival2 === "all" || orival2 === tripdata[i].bpname23.substr(3, 1))
      ) {
        //str = str + "<tr><td>"+tripdata[i].accn + "</td><td>" + tripdata[i].tripname + " </td><td>  " + tripdata[i].edgeinfo + " </td><td> [<a  href=\"javascript:void(0);\" onclick=\"runjsmol('" + tripdata[i].accn + "', ' select " +tripdata[i].resid1+":"+tripdata[i].chain1+","+tripdata[i].resid2+":"+tripdata[i].chain2+","+tripdata[i].resid3+":"+tripdata[i].chain3+"' );\">Full</a>]       [<a  href=\"javascript:void(0);\" onclick=\"runjsmol('" + tripdata[i].accn + "', 'restrict within(15.0, " +tripdata[i].resid1+":"+tripdata[i].chain1+ "); select " +tripdata[i].resid1+":"+tripdata[i].chain1+","+tripdata[i].resid2+":"+tripdata[i].chain2+","+tripdata[i].resid3+":"+tripdata[i].chain3+"' );\">Within 15A</a>]" + "</td><td> <a href=\"javascript:void(0);\" onclick=\"modal_disp("+i+");\">Show details</a> </td></tr>";

        str = str + "<tr><td>" + tripdata[i].accn + "</td><td>" + tripdata[i].tripname + " </td><td>  " + tripdata[i].edgeinfo + " </td><td> [<a  href=\"javascript:void(0);\" onclick=\"runjsmol('" + tripdata[i].accn + "', " + i + ", 'FULL');\">Full</a>]       [<a  href=\"javascript:void(0);\" onclick=\"runjsmol('" + tripdata[i].accn + "', " + i + ", 'WITHIN15A');\">Within 15A</a>]" + "  [<a href=\"javascript:void(0);\" onclick=\"runjsmol('" + tripdata[i].accn + "', " + i + ", 'TRIPLETONLY');\">Triplet Only</a>]</td> <td><a  href=\"javascript:void(0);\" onclick=\"show_details('" + tripdata[i].accn + "', " + i + ");\">Details</a></tr>";
        gen_download_data(i);
        count = count + 1;

      }

    }
  }
  str = str + "</table>";
  str = "<h3>Total Cases Found:" + count + "&nbsp;&nbsp;<button id=\"generateBtn\">Download</button></h3>" + str;


  add_lintener_to_download_button();
}

function add_lintener_to_download_button() {
  // This part is for adding the code for download button.

  document.getElementById("generateBtn").addEventListener("click", function () {
    // Get the data from the textarea


    // Create a Blob object with the data
    const blob = new Blob([global_download_data], { type: "text/plain" });

    // Generate a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a hidden <a> element to trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `triplet-data-${Date.now()}.txt`; // File name

    // Programmatically click the link
    downloadLink.click();

    // Revoke the Blob URL after the download starts
    URL.revokeObjectURL(url);
  });
}



function gen_position_pie_chart(canvas, column, chart_type, title) {
  // Get the canvas element
/*  const canvas1 = document.getElementById(canvas);
  if (canvas1) {
    canvas1.remove();
    console.log("Canvas deleted successfully.");
  } */
  const ctx = document.getElementById(canvas).getContext('2d');
  console.log(global_data.length);
  if(global_data.length === 0){
    document.getElementById(canvas).innerHTML = "<h4>No Data Fetchet by your Query</h4>";

    return;
  }
  

  // Data for the chart
  const chart_data = {
    labels: Object.keys(global_count_data[column]),
    datasets: [{
      data: Object.values(global_count_data[column])
    }
    ]

  };

  // Configuration for the chart
  const config = {
    type: chart_type, // Chart type (e.g., 'bar', 'line', 'pie', etc.)
    data: chart_data,
    legend: "abc",
    options: {
      responsive: false,
      maintainAspectRatio: false, // Allow independent width and height
      plugins: {
        legend: {
          position: 'right', // Place legend on the right
        },
        title: {
          display: true,
          text: title,
          position: 'bottom', // Place title at the bottom
        }
      }
      /*scales: {
        y: {
          beginAtZero: true // Y-axis starts at 0
        }
      }*/
    }
  };

  // Create and render the chart


  chart_var = new Chart(ctx, config);
  return chart_var;
}

function display_all_charts() {
  filterData();
  const cells = document.querySelectorAll("td.chart");

  // Loop through and add border to each cell
  cells.forEach(cell => {
    cell.style.border = "1px solid red"; // Add red border
  });


  

  if (global_chart1) {
    global_chart1.destroy(); // Destroy the existing chart
  }
  if (global_chart2) {
    global_chart2.destroy(); // Destroy the existing chart
  }
  if (global_chart3) {
    global_chart3.destroy(); // Destroy the existing chart
  }
  if (global_chart4) {
    global_chart4.destroy(); // Destroy the existing chart
  }
  if (global_chart5) {
    global_chart5.destroy(); // Destroy the existing chart
  }
  if (global_chart6) {
    global_chart6.destroy(); // Destroy the existing chart
  }
  
  global_chart1 = gen_position_pie_chart("pos_pie_chart", "position", "pie", "Attaching location");
  global_chart2 = gen_position_pie_chart("pos_attaching_base_chart", "attaching_nuc", "pie", "Attaching residue preference");
  global_chart3 = gen_position_pie_chart("pos_attaching_atom_chart", "attaching_atom", "pie", "Attaching atom preference");
  global_chart4 = gen_position_pie_chart("pos_orientation_chart", "orien", "pie", "Attaching orientation preference");
  global_chart5 = gen_position_pie_chart("pos_link_chart", "link", "pie", "Number of valency found");
  global_chart6 = gen_position_pie_chart("pos_edge_chart", "edge1", "pie", "base pair edge preference");
  //global_chart7 = gen_position_pie_chart("pos_edge_chart", "edge1", "bar", "base pair edge preference");
  
}


