
obj1 = JSON.stringify(MG);

var global_metal_data = JSON.parse(obj1);
var  global_data = [];
var global_count_data = [];

function filterData() {
  // Get input values from HTML fields
  const pdbidInput = document.getElementById("accn").value;
  const metalInput = document.getElementById("metal").value;
  const positionInput = document.getElementById("position").value;
  // Add more fields as needed

  // Filter data based on input values
  global_data = global_metal_data.filter(item =>
      (!pdbidInput || pdbidInput === "ALL" ||item.pdbid === pdbidInput) &&
      (!metalInput || metalInput === "ALL" || item.metal === metalInput) &&
      (!positionInput || positionInput === "ALL" || item.position === positionInput)
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








function show_details(accn, i){
      var detdata = document.getElementById("detaildata");
      var mainstr = "<strong> Showing The Details of<br>ACCN: "+ accn+"</strong><br>";
      mainstr =  mainstr + "Residue Names="+tripdata[i].resname1+"-"+tripdata[i].resname2+"-"+tripdata[i].resname3+",  <br>";
      mainstr =  mainstr + "mmCIF residue details ["+ tripdata[i].resname1 +"-"+tripdata[i].chain1+":"+tripdata[i].resid1+tripdata[i].ins1+", ";
      mainstr =  mainstr + tripdata[i].resname2 +"-"+ tripdata[i].chain2+":"+tripdata[i].resid2+tripdata[i].ins2+", ";
      mainstr =  mainstr + tripdata[i].resname3 +"-"+ tripdata[i].chain3+":"+tripdata[i].resid3+tripdata[i].ins3+"]<br> ";
      mainstr =  mainstr + "Base pair Stability Value for " + tripdata[i].resname1 +":"+ tripdata[i].resname2 + "  "+tripdata[i].bpname1+  " is "+tripdata[i].eval12 +"<br>";
      mainstr =  mainstr + "Base pair Stability Value for " + tripdata[i].resname2 +":"+ tripdata[i].resname3 + "  "+tripdata[i].bpname23+ " is "+tripdata[i].eval23;
      detdata.innerHTML = mainstr;
      }
      
function gen_download_data(i){
       global_download_data += tripdata[i].accn+", "+tripdata[i].tripname+", " + tripdata[i].resname1+", "+tripdata[i].bpname1+", "+tripdata[i].resname2 +", "+tripdata[i].bpname23+", "+tripdata[i].resname3+ ", [ ( "+tripdata[i].chain1+", "+tripdata[i].resid1+", "+tripdata[i].ins1+" ), ( "+ tripdata[i].chain2+", "+tripdata[i].resid2+", "+tripdata[i].ins2+" ), ( "+tripdata[i].chain3+", "+tripdata[i].resid3+", "+tripdata[i].ins3+" ) ]\n";
      }

function show_trip_details_proto(bptype){
      
      var accnval = document.getElementById("accn").value;
      var tripnameval = document.getElementById("tripname").value;
      var edge1 = document.getElementById("edge1").value;
      var ori1 = document.getElementsByName("orient1");
      var orival1;
      global_download_data = global_download_data_header;
      for(var i = 0; i < ori1.length; i++){
	    if(ori1[i].checked === true){
		  orival1 = ori1[i].value;
	    }
      }

      var edge2 = document.getElementById("edge2").value;
      var ori2 = document.getElementsByName("orient2");
      var orival2;
      for(var i = 0; i < ori2.length; i++){
	    if(ori2[i].checked === true){
		  orival2 = ori2[i].value;
	    }
      }
//      window.alert(orival2);
//      var ori2 = document.getElementByName("orient2").value;
      var str = "<table id=\"resulttable\"><tr><td>ACCN</td><td>TRP</td><td>EDG1-EDG2</td><td>  View in JsMol</td><td>Detail Only</td></tr>";
        var count = 0;
         for(var i=0; i<tripdata.length; ++i){
	    if(tripdata[i].compname === "T1" && (get_bptype_proto(tripdata[i].bpname1, tripdata[i].rescls1, tripdata[i].rescls2) === bptype || get_bptype_proto(tripdata[i].bpname23, tripdata[i].rescls2, tripdata[i].rescls3) === bptype)){
		  if((accnval.length === 0 || tripdata[i].accn === accnval.toLowerCase())  
			&& 
			(tripnameval.length === 0 || tripdata[i].tripname === tripnameval)
			&&
			(edge1 === "ALL" || tripdata[i].bpname1.substr(0,3) === edge1)
			&&
			(orival1 === "all"|| orival1 === tripdata[i].bpname1.substr(3,1))
			&&
			(edge2 === "ALL" || tripdata[i].bpname23.substr(0,3) === edge2)
			&&
			(orival2 === "all"|| orival2 === tripdata[i].bpname23.substr(3,1))
		  ){
			//str = str + "<tr><td>"+tripdata[i].accn + "</td><td>" + tripdata[i].tripname + " </td><td>  " + tripdata[i].edgeinfo + " </td><td> [<a  href=\"javascript:void(0);\" onclick=\"runjsmol('" + tripdata[i].accn + "', ' select " +tripdata[i].resid1+":"+tripdata[i].chain1+","+tripdata[i].resid2+":"+tripdata[i].chain2+","+tripdata[i].resid3+":"+tripdata[i].chain3+"' );\">Full</a>]       [<a  href=\"javascript:void(0);\" onclick=\"runjsmol('" + tripdata[i].accn + "', 'restrict within(15.0, " +tripdata[i].resid1+":"+tripdata[i].chain1+ "); select " +tripdata[i].resid1+":"+tripdata[i].chain1+","+tripdata[i].resid2+":"+tripdata[i].chain2+","+tripdata[i].resid3+":"+tripdata[i].chain3+"' );\">Within 15A</a>]" + "</td><td> <a href=\"javascript:void(0);\" onclick=\"modal_disp("+i+");\">Show details</a> </td></tr>";

             str = str + "<tr><td>"+tripdata[i].accn + "</td><td>" + tripdata[i].tripname + " </td><td>  " + tripdata[i].edgeinfo + " </td><td> [<a  href=\"javascript:void(0);\" onclick=\"runjsmol('" + tripdata[i].accn + "', "+ i +", 'FULL');\">Full</a>]       [<a  href=\"javascript:void(0);\" onclick=\"runjsmol('" + tripdata[i].accn + "', "+ i +", 'WITHIN15A');\">Within 15A</a>]" + "  [<a href=\"javascript:void(0);\" onclick=\"runjsmol('" + tripdata[i].accn + "', "+ i +", 'TRIPLETONLY');\">Triplet Only</a>]</td> <td><a  href=\"javascript:void(0);\" onclick=\"show_details('" + tripdata[i].accn + "', "+ i +");\">Details</a></tr>";
             gen_download_data(i);
                 count = count + 1;
		  
		  }

	    }
      }
      str = str + "</table>";
      str = "<h3>Total Cases Found:"+count+"&nbsp;&nbsp;<button id=\"generateBtn\">Download</button></h3>" + str;
      

      add_lintener_to_download_button();
}

function add_lintener_to_download_button(){
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



      function gen_position_pie_chart(canvas, column, chart_type, title){
        // Get the canvas element
        const ctx = document.getElementById(canvas).getContext('2d');
    
        // Data for the chart
        const chart_data = {
          labels:  Object.keys(global_count_data[column]),
          datasets:[ {
            data :  Object.values(global_count_data[column])
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


        myChart = new Chart(ctx, config);
    }
    
    function display_all_charts(){
      filterData();
      const cells = document.querySelectorAll("td.chart");

            // Loop through and add border to each cell
            cells.forEach(cell => {
                cell.style.border = "1px solid red"; // Add red border
            });
      gen_position_pie_chart("pos_pie_chart", "position", "pie", "Attaching location");
      gen_position_pie_chart("pos_attaching_base_chart", "attaching_nuc", "pie", "Attaching residue preference");
      gen_position_pie_chart("pos_attaching_atom_chart", "attaching_atom", "bar", "Attaching atom preference");
      gen_position_pie_chart("pos_orientation_chart", "orien", "pie", "Attaching orientation preference");
      gen_position_pie_chart("pos_link_chart", "link", "pie", "base pair number of nuc attached");
      gen_position_pie_chart("pos_edge_chart", "edge1", "bar", "base pair edge preference");
    }


