var input = document.getElementById("myFile");
var output = document.getElementById("output");

input.addEventListener("change", function () {
  if (this.files && this.files[0]) {
    var myFile = this.files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function (e) {
      fullFileText = e.target.result;
      lines = fullFileText.split(/[\r]+/g); //!bujhi nai mane ki

      let codeBetweenFooter = `</font>
      </div>
     </td>
     <td  colspan="1"  width="50%"  rowspan="1"  valign="center" >
      <div style="text-align:right;padding-right:48px; border-width:1px 1px 1px 1px; border-style:none none none none;">
      <font style="font-size:8pt;color:#296DC1;text-align:right;font-family:'Arial',Times,serif;">`;

      footerValue = document.getElementById("footer").value;
      temp =
        footerValue.split("Page")[0] + codeBetweenFooter + "Page&nbsp;&nbsp;";
      console.log("Temp", temp);

      newarr = [];
      for (i = 0; i < lines.length; i++) {
        newarr.push(lines[i] + "\n");
      }

      let header1 = document.getElementById("header1").value;
      let header2 = document.getElementById("header2").value;
      let header3 = document.getElementById("header3").value;
      let header4 = document.getElementById("header4").value;
      // header = "";

      var updatedHeader1 = header1.replace(/&/g, "&amp;");
      var updatedHeader2 = header2.replace(/&/g, "&amp;");
      var updatedHeader3 = header3.replace(/&/g, "&amp;");
      var updatedHeader4 = header4.replace(/&/g, "&amp;");

      var finalHeader1 = updatedHeader1.replace(/®/g, "<sup>&reg;</sup>");
      var finalHeader2 = updatedHeader2.replace(/®/g, "<sup>&reg;</sup>");
      var finalHeader3 = updatedHeader3.replace(/®/g, "<sup>&reg;</sup>");
      var finalHeader4 = updatedHeader4.replace(/®/g, "<sup>&reg;</sup>");

      let header = `
        <hr size='5' noshade width='100%' style='page-break-before: always;' > 
        <div style="text-align:right; border-width:1px 1px 1px 1px; border-style:none none none none;">
        <font style="font-size:14pt;color:#808080;font-family:'Arial';">${finalHeader1}</font>
        </div>
    
        <div style="text-align:left; border-color:#296DC1;padding-left:-78px; margin-top:4px;border-width:1px 1px 1px 1px; border-style:solid none none none;">
        <font style="font-size:10pt;color:#296DC1;font-family:'Arial';">${finalHeader2}</font>
        </div>
    
        <div style="text-align:left;padding-left:-78px; border-width:1px 1px 1px 1px; border-style:none none none none;">
        <font style="font-size:8pt;color:#808080;font-family:'Arial';">${finalHeader3}</font>
        </div>
    
        <div style="text-align:left;padding-left:-78px; margin-bottom:4px;border-width:1px 1px 1px 1px; border-style:none none none none;">
        <font style="font-size:7.5pt;color:#808080;font-family:'Arial';"><b>${finalHeader4}</b></font>
        </div>
    
        <div style="text-align:left; border-width:1px 1px 1px 1px; border-style:none none none none;">
        <font style="font-size:6.5pt;font-family:'Arial';"></font>
        </div>
        
        `;

      let footer = `
      <table  width="100%"  align="center"  cellpadding = "0"  cellspacing = ".0"  style = " border-collapse:collapse;padding-top:0.75px ;padding-bottom:0.75px ;padding-left:0.75px ;padding-right:0.75px ;margin-top: 8px; " >
      <tr>
       <td  colspan="1"  width="50%"  rowspan="1"  valign="center" >
       <div style="text-align:left;padding-left:48px; border-width:1px 1px 1px 1px; border-style:none none none none;"><font style="font-size:8pt;color:#296DC1;font-family:'Arial',Times,serif;">${footerValue}</font>
       </div>
      </td>
     </tr></table>
        
        `;

      /* =============starts=============== */
      seq = 0;
      let seqbottom = "<!-- Field: /Page -->";
      checker = 0;

      for (i = 0; i < newarr.length; i++) {
        if (newarr[i].includes("<!-- Field: Page;") == true) {
          seq++;
          checker = 1;
          if (seq == 1) {
            newarr[i] =
              `<!-- Field: Page; Sequence: ${seq} -->` + header + seqbottom;
          } else {
            newarr[i] =
              `<!-- Field: Page; Sequence: ${seq} -->` +
              footer +
              header +
              seqbottom;
          }
        } else if (newarr[i].includes("<!-- Field: /Page -->") == true) {
          newarr[i] = "";
          checker = 0;
        } else if (checker == 1) {
          newarr[i] = "";
        }
      }

      for (i = newarr.length - 1; i > 0; i--) {
        if (newarr[i].includes("</BODY>") == true) {
          seq++;
          newarr[i] =
            `<!-- Field: Page; Sequence: ${seq} -->` +
            footer +
            seqbottom +
            `<hr size='5' noshade width='100%' style='page-break-before: always;' >` +
            "</BODY>";
        }
      }

      c = 1;
      anarr = [];
      for (i = 0; i < newarr.length; i++) {
        if (newarr[i].includes(footerValue) == true) {
          c++;
          anarr.push(newarr[i].replace(footerValue, temp + c));
        } else {
          anarr.push(newarr[i]);
        }
      }

      for (i = 0; i < anarr.length; i++) {
        if (anarr[i].includes("<!-- Field: Page;") == true) {
          c = 0;
          cn = 1;
          while (c == 0) {
            if (
              anarr[i - cn].length > 5 &&
              anarr[i - cn][2] == "P" &&
              anarr[i - cn].includes("&nbsp;") == true
            ) {
              anarr[i - cn] = " ";
              cn++;
            }
            if (anarr[i - cn].trim() == "" || anarr[i - cn] == "\n") {
              cn++;
            } else {
              c = 1;
            }
          }
        }

        //.........................

        if (anarr[i].includes("<!-- Field: /Page -->") == true) {
          c = 0;
          cn = 1;
          while (c == 0) {
            if (
              anarr[i + cn].length > 5 &&
              anarr[i + cn][2] == "P" &&
              anarr[i + cn].includes("&nbsp;") == true
            ) {
              anarr[i + cn] = " ";
              cn++;
            }
            if (anarr[i + cn].trim() == "" || anarr[i + cn] == "\n") {
              if (i + cn + 1 <= anarr.length) {
                cn += 1;
              }
            } else {
              c = 1;
            }
          }
        }
      }

      farr = [];
      for (i = 0; i < anarr.length; i++) {
        farr += anarr[i];
      }
      /* =============ends=============== */

      output.textContent = farr;
    });

    reader.readAsBinaryString(myFile);
  }
});

function doDL(s) {
  function saveTextAsFile(textToWrite, fileNameToSaveAs) {
    var textFileAsBlob = new Blob([textToWrite], { type: "text/plain" });
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
      downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
      downloadLink.onclick = destroyClickedElement;
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
    }
    downloadLink.click();
  }

  window.open(saveTextAsFile(s, "form424b2.htm"));
}
