// ==UserScript==
// @name         encaminhar_atestado_Open
// @namespace    http://tampermonkey.net/
// @version      v1.0
// @description  try to take over the world!
// @author       Lucas Monteiro
// @match        http://sigeduca.seduc.mt.gov.br/ged/hwmgedatestado.aspx
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gov.br
// @grant        none
// @updateURL    https://github.com/lksoumon/encaminhaAtestadosOpen/raw/refs/heads/main/encaminhar_atestado_Open.user.js
// @downloadURL  https://github.com/lksoumon/encaminhaAtestadosOpen/raw/refs/heads/main/encaminhar_atestado_Open.user.js
// ==/UserScript==

//CSS DOS BOTÕES //       2158729
var styleSCT = document.createElement('style');
styleSCT.type = 'text/css';
styleSCT.innerHTML = 'span.button-like{display:inline-block;padding:10px 20px;background-color:#007bff;color:#fff;border:1px solid #007bff;border-radius:4px;cursor:pointer;text-align:center;text-decoration:none}span.button-like:hover{background-color:#0056b3;border-color:#0056b3}';
document.getElementsByTagName('head')[0].appendChild(styleSCT);

//Variáveis
var vetAluno = [0];
var n = 0;
var a = "";
var k = 0;
var cabecalho;
var codigo;

var divCorpo = document.createElement('div');
document.getElementsByTagName('body')[0].appendChild(divCorpo);
var ifrIframe1 = document.createElement("iframe");
ifrIframe1.setAttribute("id","iframe1");
ifrIframe1.setAttribute("src","about:blank");
ifrIframe1.setAttribute("style","height: 100px; width: 355px;display:none");
divCorpo.appendChild(ifrIframe1);
parent.frames.document.getElementById('MAINFORM').removeAttribute("action");

function coletaDados1() {
  var output = [];
  var tabela_atestados = document.getElementById("GriddetalhesContainerTbl").getElementsByTagName("tr");

  if (tabela_atestados.length > 1) {

      for (var j = 1; j < tabela_atestados.length; j++){
          let num = ("0000" + j).slice(-4);
          output.push([
              document.getElementById("span_vGEDATECOD_"+num).innerText,
              document.getElementById("span_vGEDALUNOM_"+num).innerText,
              document.getElementById("span_vGEDATEPERINI_"+num).innerText,
              document.getElementById("span_vGEDATEPERFIN_"+num).innerText,
              document.getElementById("span_vGEDATETIPO_"+num).innerText,
          ])
      }

      //alert (output);
      console.log(output);
      //submit_post_via_hidden_form('https://open4school.com.br/open/secretaria/importa_sigeduca.php',output);
  }else{
  alert("Aluno sem atestado / Atestados não carregados");
  }




}
function submit_post_via_hidden_form(url, params) {
    console.log(params);
    var f = $("<form target='_blank' method='POST' style='display:none;'></form>").attr({
        action: url
    }).appendTo(document.body);

    //for (var i in params) {
        //if (params.hasOwnProperty(i)) {
            $('<input type="hidden" />').attr({
                value: params,
                name: 'data'
            }).appendTo(f);
        //}
   // }

    f.submit();

    f.remove();
}
function addCopyBtn() {
    //console.log('as');
    var botao = document.createElement("span");
    botao.innerHTML = "Encaminhar dados para Open";
    botao.className = "button-like";
    botao.onclick = () => {
        if(document.getElementById('GriddetalhesContainerTbl')){
            coletaDados1();
        }else{alert('Pesquise um aluno pelo código antes de clicar em enviar.')}
    }
    var tabela = document.getElementById("TABLE4");
    tabela.parentNode.insertBefore(botao, tabela.nextSibling);
}
(function() {
'use strict';

    addCopyBtn()

})();
