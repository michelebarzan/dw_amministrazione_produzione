var lotti=[];
var commesse=[];
var itemsCreazioneLotto="cabine";
var filtriCabine;
var sortableDropHelper=
{
    origin:null,
    target:null,
    item:null
};
var cabine;
var cabineLotto;
var cabineFiltrate=[];
var view;

async function getAnagraficaLotti(button)
{
    view="anagrafica_lotti";

    $(".in-page-nav-bar-button").css({"border-bottom-color":"","font-weight":""});
    button.style.borderBottomColor="#4C91CB";
    button.style.fontWeight="bold";

    document.getElementById("actionBarGestioneLotti").style.display="flex";
    document.getElementById("actionBarGestioneLotti").innerHTML="";
    
    document.getElementById("gestioneLottiContainer").style.display="flex";
    document.getElementById("gestioneLottiContainer").innerHTML="";

    var actionBar=document.getElementById("actionBarGestioneLotti");

    var actionBarItem=document.createElement("div");
    actionBarItem.setAttribute("class","rcb-text-container");

    var span=document.createElement("span");
    span.setAttribute("style","margin-right:5px");
    span.innerHTML="Righe:";
    actionBarItem.appendChild(span);

    var span=document.createElement("span");
    span.setAttribute("id","rowsNumEditableTable");
    span.setAttribute("style","font-weight:normal;color:black");
    span.innerHTML="0";
    actionBarItem.appendChild(span);
    
    actionBar.appendChild(actionBarItem);

    var buttonRipristina=document.createElement("button");
    buttonRipristina.setAttribute("class","rcb-button-text-icon");
    buttonRipristina.setAttribute("onclick","resetFilters();getTable(selectetTable)");
    buttonRipristina.innerHTML='<span>Ripristina</span><i style="margin-left:5px" class="fal fa-filter"></i>';
    
    actionBar.appendChild(buttonRipristina);

    getTable("view_lotti");
}
function getLottiGeneralNumbering()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getLottiGeneralNumbering.php",
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                    resolve([]);
                }
                else
                {
                    try {
                        resolve(JSON.parse(response));
                    } catch (error) {
                        Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                        console.log(response);
                        resolve([]);
                    }
                }
            }
        });
    });
}
function getTable(table,orderBy,orderType)
{
    if(table=="view_lotti")
    {
        getEditableTable
        ({
            table:'view_lotti',
            editable: true,
            primaryKey: "id_lotto",
            container:'gestioneLottiContainer',
            readOnlyColumns:['id_lotto','dataCreazione','utente','commessa'],
            noFilterColumns:["dataCreazione"],
            orderBy:orderBy,
            orderType:orderType
        });
    }
}
function editableTableLoad()
{

}
async function getMascheraCreazioneLotto(button)
{
    view="creazione_lotto";

    Swal.fire
    ({
        width:"100%",
        background:"transparent",
        title:"Caricamento in corso...",
        html:'<i class="fad fa-spinner-third fa-spin fa-3x" style="color:white"></i>',
        allowOutsideClick:false,
        showCloseButton:false,
        showConfirmButton:false,
        allowEscapeKey:false,
        showCancelButton:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
    });

    $(".in-page-nav-bar-button").css({"border-bottom-color":"","font-weight":""});
    button.style.borderBottomColor="#4C91CB";
    button.style.fontWeight="bold";

    document.getElementById("actionBarGestioneLotti").style.display="flex";
    document.getElementById("actionBarGestioneLotti").innerHTML="";
    
    document.getElementById("gestioneLottiContainer").style.display="flex";
    document.getElementById("gestioneLottiContainer").innerHTML="";

    var actionBar=document.getElementById("actionBarGestioneLotti");

    var actionBarItem=document.createElement("div");
    actionBarItem.setAttribute("class","rcb-select-container");
    
    var span=document.createElement("span");
    span.innerHTML="Commessa";
    actionBarItem.appendChild(span);

    var selectCommessa=document.createElement("select");
    selectCommessa.setAttribute("onchange","creaSelectLotto()");
    selectCommessa.setAttribute("id","selectCommessaGestioneLotti");
    selectCommessa.setAttribute("style","text-decoration:none");

    commesse=await getCommesse();

    commesse.forEach(function (commessa)
    {
        var option=document.createElement("option");
        option.setAttribute("value",commessa.id_commessa);
        option.innerHTML=commessa.commessa;
        selectCommessa.appendChild(option);
    });
    
    actionBarItem.appendChild(selectCommessa);
    actionBar.appendChild(actionBarItem);

    await creaSelectLotto();

    var buttonAggiungiLotto=document.createElement("button");
    buttonAggiungiLotto.setAttribute("class","rcb-button-text-icon");
    buttonAggiungiLotto.setAttribute("id","buttonAggiungiLotto");
    buttonAggiungiLotto.setAttribute("onclick","getPopupAggiungiLotto()");
    buttonAggiungiLotto.innerHTML='<span>Aggiungi lotto</span><i style="margin-left:5px" class="fad fa-layer-plus"></i>';
    
    actionBar.appendChild(buttonAggiungiLotto);

    var actionBarItem=document.createElement("div");
    actionBarItem.setAttribute("class","rcb-select-container");
    
    var span=document.createElement("span");
    span.innerHTML="Importa lotto";
    actionBarItem.appendChild(span);

    var selectLottoGeneralNumbering=document.createElement("select");
    selectLottoGeneralNumbering.setAttribute("onchange","importaLottoGeneralNumbering()");
    selectLottoGeneralNumbering.setAttribute("id","selectLottoGeneralNumbering");

    var option=document.createElement("option");
    option.setAttribute("value","");
    option.setAttribute("disabled","disabled");
    option.setAttribute("selected","selected");
    option.innerHTML="Scegli";
    selectLottoGeneralNumbering.appendChild(option);

    var lottiGeneralNumbering=await getLottiGeneralNumbering();

    var dirty_commesse=[];
    lottiGeneralNumbering.forEach(function (lotto)
    {
        dirty_commesse.push(lotto.commessa);
    });
    var commesse = [];
    $.each(dirty_commesse, function(i, el){
        if($.inArray(el, commesse) === -1) commesse.push(el);
    });
    commesse.forEach(function (commessa)
    {
        var optgroup=document.createElement("optgroup");
        optgroup.setAttribute("label",commessa);
        lottiGeneralNumbering.forEach(function (lotto)
        {
            if(lotto.commessa==commessa)
            {
                var option=document.createElement("option");
                option.setAttribute("value",lotto.id_lotto+'|'+lotto.profilo+'|'+lotto.lotto+'|'+lotto.id_commessa);
                option.innerHTML=lotto.lotto + " ("+lotto.profilo+")";
                optgroup.appendChild(option);
            }
        });
        selectLottoGeneralNumbering.appendChild(optgroup);
    });
    
    actionBarItem.appendChild(selectLottoGeneralNumbering);
    actionBar.appendChild(actionBarItem);

    $("#selectLottoGeneralNumbering").multipleSelect(
    {
        single:true,
        onAfterCreate: function () 
                {
                    $(".ms-choice").css({"height":"20px","line-height":"21px","background-color":"transparent","border":"none"});
                    $(".ms-parent").css({"max-width":"70px"});
                },
        onOpen:function()
        {
            $(".ms-search input").css({"font-family":"'Montserrat',sans-serif","font-size":"12px","text-align":"left"});
            $(".optgroup").css({"font-family":"'Montserrat',sans-serif","font-size":"12px"});
            $(".ms-drop label").css({"text-align":"right"});
            $(".group label").css({"text-align":"left"});
        },
        filter:true,
        filterPlaceholder:"Cerca...",
        locale:"it-IT"
    });

    var container=document.getElementById("gestioneLottiContainer");

    //-------------------------------------------
    var pannelliLottoContainer=document.createElement("div");
    pannelliLottoContainer.setAttribute("class","container-pannelli-gestione-lotti");
    pannelliLottoContainer.setAttribute("style","min-width:calc(50% - 120px);max-width:calc(50% - 120px);width:calc(50% - 120px);");

    var pannelliLottoTitleContainer=document.createElement("div");
    pannelliLottoTitleContainer.setAttribute("class","title-container-pannelli-gestione-lotti");

    var span=document.createElement("span");
    span.setAttribute("class","title-span-pannelli-gestione-lotti");
    span.setAttribute("id","labelAggiunti");
    pannelliLottoTitleContainer.appendChild(span);
    /*var span=document.createElement("span");
    span.setAttribute("class","title-span-pannelli-gestione-lotti");
    span.setAttribute("id","nPannelliLotto");
    pannelliLottoTitleContainer.appendChild(span);*/

    pannelliLottoContainer.appendChild(pannelliLottoTitleContainer);

    var pannelliLottoFilterContainer=document.createElement("div");
    pannelliLottoFilterContainer.setAttribute("class","filter-container-pannelli-gestione-lotti");
    pannelliLottoContainer.appendChild(pannelliLottoFilterContainer);

    var pannelliLottoInnerContainer=document.createElement("div");
    pannelliLottoInnerContainer.setAttribute("class","inner-container-pannelli-gestione-lotti connectedSortable");
    pannelliLottoInnerContainer.setAttribute("id","pannelliLottoContainer");
    pannelliLottoContainer.appendChild(pannelliLottoInnerContainer);

    container.appendChild(pannelliLottoContainer);

    var label=document.createElement("div");
    label.setAttribute("class","container-pannelli-gestione-lotti-label");
    label.innerHTML="<i class='fad fa-layer-plus'></i><span id='labelTrascina'></span><i class='fad fa-sort-alt'></i>";
    container.appendChild(label);

    var pannelliContainer=document.createElement("div");
    pannelliContainer.setAttribute("class","container-pannelli-gestione-lotti");
    pannelliContainer.setAttribute("style","min-width:calc(50% - 120px);max-width:calc(50% - 120px);width:calc(50% - 120px);");

    var pannelliTitleContainer=document.createElement("div");
    pannelliTitleContainer.setAttribute("class","title-container-pannelli-gestione-lotti");

    var span=document.createElement("span");
    span.setAttribute("class","title-span-pannelli-gestione-lotti");
    span.setAttribute("id","labelDisponibili");
    pannelliTitleContainer.appendChild(span);
    /*var span=document.createElement("span");
    span.setAttribute("class","title-span-pannelli-gestione-lotti");
    span.setAttribute("id","nPannelli");
    pannelliTitleContainer.appendChild(span);*/

    var button=document.createElement("button");
    button.setAttribute("class","title-icon-button-pannelli-gestione-lotti");
    button.setAttribute("title","Aggiungi tutto");
    button.setAttribute("onclick","aggiungiTuttoAlLotto()");
    var i=document.createElement("i");
    i.setAttribute("class","fad fa-layer-plus");
    button.appendChild(i);
    pannelliTitleContainer.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","title-button-pannelli-gestione-lotti");
    button.setAttribute("style","margin-left:auto");
    button.setAttribute("disabled","disabled");
    button.setAttribute("id","btnItemsCreazioneLottoPannelli");
    button.setAttribute("onclick","itemsCreazioneLotto='pannelli';getInfoLotto()");
    var span=document.createElement("span");
    span.innerHTML="Pannelli";
    button.appendChild(span);
    pannelliTitleContainer.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","title-button-pannelli-gestione-lotti");
    button.setAttribute("onclick","itemsCreazioneLotto='cabine';getInfoLotto()");
    button.setAttribute("id","btnItemsCreazioneLottoCabine");
    //button.setAttribute("style","background-color:rgb(76, 145, 203);color:#ddd");
    var span=document.createElement("span");
    span.innerHTML="Cabine";
    button.appendChild(span);
    pannelliTitleContainer.appendChild(button);

    pannelliContainer.appendChild(pannelliTitleContainer);

    var pannelliFilterContainer=document.createElement("div");
    pannelliFilterContainer.setAttribute("class","filter-container-pannelli-gestione-lotti");
    pannelliFilterContainer.setAttribute("id","filterContainerGestioneLotti");
    pannelliContainer.appendChild(pannelliFilterContainer);

    var pannelliInnerContainer=document.createElement("div");
    pannelliInnerContainer.setAttribute("class","inner-container-pannelli-gestione-lotti connectedSortable");
    pannelliInnerContainer.setAttribute("id","pannelliContainer");
    pannelliContainer.appendChild(pannelliInnerContainer);

    container.appendChild(pannelliContainer);

    Swal.close();

    $( ".connectedSortable" ).sortable
    ({
        connectWith: ".connectedSortable",
        start: function( event, ui )
        {
            var elements=document.getElementsByClassName("inner-container-pannelli-gestione-lotti");
            for (let index = 0; index < elements.length; index++)
            {
                var element = elements[index];
                element.style.backgroundColor="#4c92cb11";
                element.style.borderColor="#4C91CB";
            }

            var item=ui.item;

            sortableDropHelper.origin=null;
            sortableDropHelper.target=null;
            sortableDropHelper.item=null;

            sortableDropHelper.origin=item.parent()[0].id;
            sortableDropHelper.item=item;
        },
        stop: function( event, ui )
        {
            var elements=document.getElementsByClassName("inner-container-pannelli-gestione-lotti");
            for (let index = 0; index < elements.length; index++)
            {
                var element = elements[index];
                element.style.backgroundColor="";
                element.style.borderColor="";
            }

            var item=ui.item;
            var numero_cabina=sortableDropHelper.item.attr("numero_cabina");

            sortableDropHelper.target=item.parent()[0].id;

            if(sortableDropHelper.origin=="pannelliLottoContainer" && sortableDropHelper.target=="pannelliContainer")
            {
                rimuoviCabinaLotto(numero_cabina);
            }

            if(sortableDropHelper.origin=="pannelliContainer" && sortableDropHelper.target=="pannelliLottoContainer")
            {
                aggiungiCabinaLotto(numero_cabina);
            }
        }
    }).disableSelection();
    //-------------------------------------------
    Swal.close();
}
function aggiungiCabinaLotto(numero_cabina)
{
    var id_commessa=document.getElementById("selectCommessaGestioneLotti").value;
    var id_lotto=document.getElementById("selectLottoGestioneLotti").value;
	
	console.log(id_commessa+" "+id_lotto+" "+numero_cabina);

    $.post("aggiungiCabinaLottoGestioneLotti.php",{id_commessa,id_lotto,numero_cabina},
    function(response, status)
    {
        if(status=="success")
        {
            console.log(response);
            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
            }
        }
    });
}
function rimuoviCabinaLotto(numero_cabina)
{
    var id_commessa=document.getElementById("selectCommessaGestioneLotti").value;
    var id_lotto=document.getElementById("selectLottoGestioneLotti").value;

    $.post("rimuoviCabinaLottoGestioneLotti.php",{id_commessa,id_lotto,numero_cabina},
    function(response, status)
    {
        if(status=="success")
        {
            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
            }
        }
    });
}
function getLotti()
{
    return new Promise(function (resolve, reject) 
    {
        var id_commessa=document.getElementById("selectCommessaGestioneLotti").value;
        $.get("getLottiCommessaGestioneLotti.php",{id_commessa},
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                    resolve([]);
                }
                else
                {
                    try {
                        resolve(JSON.parse(response));
                    } catch (error) {
                        Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                        console.log(response);
                        resolve([]);
                    }
                }
            }
        });
    });
}
async function getPopupAggiungiLotto()
{
    var outerContainer=document.createElement("div");
    outerContainer.setAttribute("class","popup-lotti-outer-container");

    var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;color:#ddd;font-size: 12px;text-align:left;font-weight: normal;font-family: 'Quicksand',sans-serif;margin-bottom:5px;");
    row.innerHTML="Lotto";
    outerContainer.appendChild(row);

    var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;margin-bottom:5px;justify-content:flex-start");

    var input=document.createElement("input");
    input.setAttribute("class","popup-lotti-input");input.setAttribute("type","text");
    input.setAttribute("id","popupNuovoLottoLotto");
    
    row.appendChild(input);

    outerContainer.appendChild(row);

    var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;color:#ddd;font-size: 12px;text-align:left;font-weight: normal;font-family: 'Quicksand',sans-serif;margin-bottom:5px;");
    row.innerHTML="Descrizione";
    outerContainer.appendChild(row);

    var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;margin-bottom:5px;justify-content:flex-start");

    var textarea=document.createElement("textarea");
    textarea.setAttribute("class","popup-lotti-input");
    textarea.setAttribute("id","popupNuovoLottoDescrizione");
    
    row.appendChild(textarea);

    outerContainer.appendChild(row);

    var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;color:#ddd;font-size: 12px;text-align:left;font-weight: normal;font-family: 'Quicksand',sans-serif;margin-bottom:5px;");
    row.innerHTML="Note";
    outerContainer.appendChild(row);

    var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;margin-bottom:5px;justify-content:flex-start");

    var textarea=document.createElement("textarea");
    textarea.setAttribute("class","popup-lotti-input");
    textarea.setAttribute("id","popupNuovoLottoNote");
    
    row.appendChild(textarea);

    outerContainer.appendChild(row);

    /*var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;color:#ddd;font-size: 12px;text-align:left;font-weight: normal;font-family: 'Quicksand',sans-serif;margin-bottom:5px;");
    row.innerHTML="Commessa";
    outerContainer.appendChild(row);

    var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;margin-bottom:5px;justify-content:flex-start");

    var select=document.createElement("select");
    select.setAttribute("class","popup-lotti-select");
    select.setAttribute("style","width:100%");
    select.setAttribute("id","popupNuovoLottoCommessa");

    commesse=await getCommesse();
    commesse.forEach(commessa =>
    {
        var option=document.createElement("option");
        option.setAttribute("value",commessa.id_commessa);
        option.innerHTML=commessa.commessa;
        select.appendChild(option);
    });

    row.appendChild(select);

    outerContainer.appendChild(row);*/

    var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;color:#ddd;font-size: 12px;text-align:left;font-weight: normal;font-family: 'Quicksand',sans-serif;margin-bottom:5px;");
    row.innerHTML="Wbs";
    outerContainer.appendChild(row);

    var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;margin-bottom:5px;justify-content:flex-start");

    var input=document.createElement("input");
    input.setAttribute("class","popup-lotti-input");input.setAttribute("type","text");
    input.setAttribute("id","popupNuovoLottoWbs");
    
    row.appendChild(input);

    outerContainer.appendChild(row);

    var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;color:#ddd;font-size: 12px;text-align:left;font-weight: normal;font-family: 'Quicksand',sans-serif;margin-bottom:5px;");
    row.innerHTML="Id materiale";
    outerContainer.appendChild(row);

    var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;margin-bottom:5px;justify-content:flex-start");

    var input=document.createElement("input");
    input.setAttribute("class","popup-lotti-input");input.setAttribute("type","text");
    input.setAttribute("id","popupNuovoLottoId_materiale");
    
    row.appendChild(input);

    outerContainer.appendChild(row);
    
    var row=document.createElement("div");
    row.setAttribute("class","popup-lotti-row");
    row.setAttribute("style","width:100%;flex-direction:row;align-items:center;justify-content:space-between;flex-direction:row;margin-top:10px");

    var confirmButton=document.createElement("button");
    confirmButton.setAttribute("class","popup-lotti-button");
    confirmButton.setAttribute("style","width:100%;");
    confirmButton.setAttribute("onclick","creaNuovoLotto()");
    confirmButton.innerHTML='<span>Conferma</span><i class="fal fa-check-circle"></i>';
    row.appendChild(confirmButton);    

    outerContainer.appendChild(row);

    Swal.fire
    ({
        background:"#404040",
        title:"Crea nuovo lotto",
        html:outerContainer.outerHTML,
        allowOutsideClick:true,
        showCloseButton:true,
        showConfirmButton:true,
        allowEscapeKey:true,
        showCancelButton:false,
        onOpen : function()
                {
                    document.getElementsByClassName("swal2-title")[0].style.fontWeight="normal";
                    document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";
                    document.getElementsByClassName("swal2-title")[0].style.color="#ddd";
                    document.getElementsByClassName("swal2-title")[0].style.width="100%";
                    document.getElementsByClassName("swal2-title")[0].style.textDecoration="underline";
                    document.getElementsByClassName("swal2-close")[0].style.width="40px";
                    document.getElementsByClassName("swal2-close")[0].style.height="40px";
                    document.getElementsByClassName("swal2-title")[0].style.margin="0px";
                    document.getElementsByClassName("swal2-title")[0].style.marginTop="5px";
                    document.getElementsByClassName("swal2-title")[0].style.fontFamily="'Quicksand',sans-serif";
                    document.getElementsByClassName("swal2-title")[0].style.textAlign="left";
                    document.getElementsByClassName("swal2-confirm")[0].style.display="none";
                    document.getElementsByClassName("swal2-popup")[0].style.paddingBottom="0px";
                    document.getElementsByClassName("swal2-popup")[0].style.paddingRight="0px";
                    document.getElementsByClassName("swal2-popup")[0].style.paddingLeft="0px";
                    document.getElementsByClassName("swal2-popup")[0].style.paddingTop="10px";
                    document.getElementsByClassName("swal2-header")[0].style.paddingLeft="20px";
                    document.getElementsByClassName("swal2-content")[0].style.padding="0px";
                    document.getElementsByClassName("swal2-actions")[0].style.margin="0px";
                }
    });
}
function getCommesse()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getCommesseGestioneLotti.php",
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                    resolve([]);
                }
                else
                {
                    try {
                        resolve(JSON.parse(response));
                    } catch (error) {
                        Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                        console.log(response);
                        resolve([]);
                    }
                }
            }
        });
    });
}
async function creaNuovoLotto()
{
    document.getElementById("popupNuovoLottoLotto").style.border="2px solid #4d4d4d";

    var lotto=document.getElementById("popupNuovoLottoLotto").value.replace("'","''");
    var descrizione=document.getElementById("popupNuovoLottoDescrizione").value.replace("'","''");
    var note=document.getElementById("popupNuovoLottoNote").value.replace("'","''");
    var commessa=document.getElementById("selectCommessaGestioneLotti").value;
    var wbs=document.getElementById("popupNuovoLottoWbs").value.replace("'","''");
    var id_materiale=document.getElementById("popupNuovoLottoId_materiale").value.replace("'","''");

    if(lotto=="" || lotto==null)
        document.getElementById("popupNuovoLottoLotto").style.border="2px solid #DA6969";
    else
    {
        Swal.fire
        ({
            width:"100%",
            background:"transparent",
            title:"Caricamento in corso...",
            html:'<i class="fad fa-spinner-third fa-spin fa-3x" style="color:white"></i>',
            allowOutsideClick:false,
            showCloseButton:false,
            showConfirmButton:false,
            allowEscapeKey:false,
            showCancelButton:false,
            onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
        });

        var lottoDuplicato=await checkLottoDuplicato(lotto,commessa);
        if(lottoDuplicato)
        {
            Swal.fire
            ({
                icon:"warning",
                title: "Esiste gia un lotto con questo nome",
                background:"#404040",
                showCloseButton:true,
                showConfirmButton:true,
                showCancelButton:true,
                showDenyButton: true,
                confirmButtonText:"Rinomina",
                cancelButtonText:"Annulla",
                denyButtonText:"Sovrascrivi",
                onOpen : function()
                        {
                            document.getElementsByClassName("swal2-title")[0].style.color="white";
                            document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";
                            document.getElementsByClassName("swal2-title")[0].style.fontWeight="normal";
                            document.getElementsByClassName("swal2-title")[0].style.fontFamily="'Montserrat',sans-serif";
                            document.getElementsByClassName("swal2-close")[0].style.boxShadow="none";

                            document.getElementsByClassName("swal2-confirm")[0].style.fontSize="14px";
                            document.getElementsByClassName("swal2-confirm")[0].style.fontWeight="normal";
                            document.getElementsByClassName("swal2-confirm")[0].style.fontFamily="'Montserrat',sans-serif";
                            
                            document.getElementsByClassName("swal2-deny")[0].style.fontSize="14px";
                            document.getElementsByClassName("swal2-deny")[0].style.fontWeight="normal";
                            document.getElementsByClassName("swal2-deny")[0].style.fontFamily="'Montserrat',sans-serif";

                            document.getElementsByClassName("swal2-cancel")[0].style.fontSize="14px";
                            document.getElementsByClassName("swal2-cancel")[0].style.fontWeight="normal";
                            document.getElementsByClassName("swal2-cancel")[0].style.fontFamily="'Montserrat',sans-serif";
                        }
            }).then((result) =>
            {
                switch (result.value)
                {
                    case true:
                        getPopupAggiungiLotto();
                    break;
                    case false:
                        Swal.fire
                        ({
                            width:"100%",
                            background:"transparent",
                            title:"Caricamento in corso...",
                            html:'<i class="fad fa-spinner-third fa-spin fa-3x" style="color:white"></i>',
                            allowOutsideClick:false,
                            showCloseButton:false,
                            showConfirmButton:false,
                            allowEscapeKey:false,
                            showCancelButton:false,
                            onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
                        });
                        $.post("eliminaLottoGestioneLotti.php",
                        {
                            lotto,commessa
                        },
                        function(response, status)
                        {
                            if(status=="success")
                            {
                                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                                {
                                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                                    console.log(response);
                                }
                                else
                                {
                                    $.post("creaNuovoLottoGestioneLotti.php",
                                    {
                                        lotto,descrizione,note,commessa,wbs,id_materiale
                                    },
                                    function(response, status)
                                    {
                                        if(status=="success")
                                        {
                                            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                                            {
                                                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                                                console.log(response);
                                            }
                                            else
                                            {
                                                console.log(response);
                                                let timerInterval;
                                                Swal.fire
                                                ({
                                                    icon:"success",
                                                    title: "Lotto creato",
                                                    background:"#404040",
                                                    showCloseButton:true,
                                                    showConfirmButton:false,
                                                    timer: 2000,
                                                    timerProgressBar: true,
                                                    onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.boxShadow="none";},
                                                    onClose: () => {clearInterval(timerInterval)}
                                                }).then((result) =>
                                                {
                                                    //getMascheraCreazioneLotto(document.getElementById("btnCreazioneLotto"));
                                                    document.getElementById("selectCommessaGestioneLotti").value=commessa;

                                                    creaECambiaSelectLotto(response);
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    break;
                    case undefined:
                        Swal.close();
                    break;
                }
            });
        }
        else
        {
            $.post("creaNuovoLottoGestioneLotti.php",
            {
                lotto,descrizione,note,commessa,wbs,id_materiale
            },
            function(response, status)
            {
                if(status=="success")
                {
                    if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                    {
                        Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                        console.log(response);
                    }
                    else
                    {
                        console.log(response);
                        let timerInterval;
                        Swal.fire
                        ({
                            icon:"success",
                            title: "Lotto creato",
                            background:"#404040",
                            showCloseButton:true,
                            showConfirmButton:false,
                            timer: 2000,
                            timerProgressBar: true,
                            onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.boxShadow="none";},
                            onClose: () => {clearInterval(timerInterval)}
                        }).then((result) =>
                        {
                            //getMascheraCreazioneLotto(document.getElementById("btnCreazioneLotto"));
                            document.getElementById("selectCommessaGestioneLotti").value=commessa;

                            creaECambiaSelectLotto(response);
                        });
                    }
                }
            });
        }
    }
}
function checkLottoDuplicato(lotto,id_commessa)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("checkLottoDuplicatoGestioneLotti.php",{id_commessa,lotto},
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                    resolve(true);
                }
                else
                {
                    try {
                        resolve(JSON.parse(response));
                    } catch (error) {
                        Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                        console.log(response);
                        resolve(true);
                    }
                }
            }
        });
    });
}
async function aggiungiTuttoAlLotto()
{
    Swal.fire
    ({
        width:"100%",
        background:"transparent",
        title:"Caricamento in corso...",
        html:'<i class="fad fa-spinner-third fa-spin fa-3x" style="color:white"></i>',
        allowOutsideClick:false,
        showCloseButton:false,
        showConfirmButton:false,
        allowEscapeKey:false,
        showCancelButton:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
    });
    if(itemsCreazioneLotto=="pannelli")
    {
        
    }
    else
    {
        console.log(cabineFiltrate);
        for (let index = 0; index < cabineFiltrate.length; index++)
        {
            const cabina = cabineFiltrate[index];
            var response=await asyncAggiungiCabinaLotto(cabina.numero_cabina);
            console.log(response);
        }
    }
    Swal.close();
    getInfoLotto();
}
function asyncAggiungiCabinaLotto(numero_cabina)
{
    return new Promise(function (resolve, reject) 
    {
        var id_commessa=document.getElementById("selectCommessaGestioneLotti").value;
        var id_lotto=document.getElementById("selectLottoGestioneLotti").value;

        $.post("aggiungiCabinaLottoGestioneLotti.php",{id_commessa,id_lotto,numero_cabina},
        function(response, status)
        {
            if(status=="success")
            {
                resolve(response);
            }
        });
    });
}
async function getInfoLotto()
{
    var id_lotto=document.getElementById("selectLottoGestioneLotti").value;
    if(id_lotto!=="")
    {
        cabineFiltrate=[];
        Swal.fire
        ({
            width:"100%",
            background:"transparent",
            title:"Caricamento in corso...",
            html:'<i class="fad fa-spinner-third fa-spin fa-3x" style="color:white"></i>',
            allowOutsideClick:false,
            showCloseButton:false,
            showConfirmButton:false,
            allowEscapeKey:false,
            showCancelButton:false,
            onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
        });

        var lotto=getFirstObjByPropValue(lotti,"id_lotto",id_lotto);

        document.getElementById("btnItemsCreazioneLottoCabine").style.backgroundColor="";
        document.getElementById("btnItemsCreazioneLottoCabine").style.color="";
        document.getElementById("btnItemsCreazioneLottoPannelli").style.backgroundColor="";
        document.getElementById("btnItemsCreazioneLottoPannelli").style.color="";

        if(itemsCreazioneLotto=="pannelli")
        {
            document.getElementById("labelDisponibili").innerHTML="Pannelli disponibili";
            document.getElementById("labelAggiunti").innerHTML="Pannelli aggiunti al lotto";
            document.getElementById("labelTrascina").innerHTML="Trascina i pannelli";

            document.getElementById("btnItemsCreazioneLottoPannelli").style.backgroundColor="rgb(76, 145, 203)";
            document.getElementById("btnItemsCreazioneLottoPannelli").style.color="#ddd";
            /*var pannelliLotto=await getPannelliLotto(id_lotto);
            console.log(pannelliLotto);*/
        }
        else
        {
            if(filtriCabine==null)
                filtriCabine=await getFiltriCabine();

            document.getElementById("labelDisponibili").innerHTML="Cabine disponibili";
            document.getElementById("labelAggiunti").innerHTML="Cabine aggiunte al lotto";
            document.getElementById("labelTrascina").innerHTML="Trascina le cabine";

            var pannelliContainer=document.getElementById("pannelliContainer");
            pannelliContainer.innerHTML="";

            document.getElementById("btnItemsCreazioneLottoCabine").style.backgroundColor="rgb(76, 145, 203)";
            document.getElementById("btnItemsCreazioneLottoCabine").style.color="#ddd";

            var filterContainerGestioneLotti=document.getElementById("filterContainerGestioneLotti");
            filterContainerGestioneLotti.innerHTML="";

            var button=document.createElement("button");
            button.setAttribute("class","filter-button-pannelli-gestione-lotti");
            button.setAttribute("onclick","getPupupFiltro(this,event,'ponte')");
            var span=document.createElement("span");
            span.innerHTML="Ponte";
            button.appendChild(span);
            var i=document.createElement("i");
            i.setAttribute("class","fas fa-filter");
            button.appendChild(i);
            filterContainerGestioneLotti.appendChild(button);

            var button=document.createElement("button");
            button.setAttribute("class","filter-button-pannelli-gestione-lotti");
            button.setAttribute("onclick","getPupupFiltro(this,event,'firezone')");
            var span=document.createElement("span");
            span.innerHTML="Firezone";
            button.appendChild(span);
            var i=document.createElement("i");
            i.setAttribute("class","fas fa-filter");
            button.appendChild(i);
            filterContainerGestioneLotti.appendChild(button);

            var button=document.createElement("button");
            button.setAttribute("class","filter-button-pannelli-gestione-lotti");
            button.setAttribute("onclick","getPupupFiltro(this,event,'kit_cabina')");
            var span=document.createElement("span");
            span.innerHTML="Codice cabina";
            button.appendChild(span);
            var i=document.createElement("i");
            i.setAttribute("class","fas fa-filter");
            button.appendChild(i);
            filterContainerGestioneLotti.appendChild(button);

            var button=document.createElement("button");
            button.setAttribute("class","filter-button-pannelli-gestione-lotti");
            button.setAttribute("onclick","getPupupFiltro(this,event,'famiglia')");
            var span=document.createElement("span");
            span.innerHTML="Famiglia";
            button.appendChild(span);
            var i=document.createElement("i");
            i.setAttribute("class","fas fa-filter");
            button.appendChild(i);
            filterContainerGestioneLotti.appendChild(button);

            var button=document.createElement("button");
            button.setAttribute("class","filter-button-pannelli-gestione-lotti");
            button.setAttribute("onclick","getPupupFiltro(this,event,'tipo')");
            var span=document.createElement("span");
            span.innerHTML="Tipo";
            button.appendChild(span);
            var i=document.createElement("i");
            i.setAttribute("class","fas fa-filter");
            button.appendChild(i);
            filterContainerGestioneLotti.appendChild(button);

            var button=document.createElement("button");
            button.setAttribute("class","filter-button-pannelli-gestione-lotti");
            button.setAttribute("onclick","getPupupFiltro(this,event,'verso')");
            var span=document.createElement("span");
            span.innerHTML="Verso";
            button.appendChild(span);
            var i=document.createElement("i");
            i.setAttribute("class","fas fa-filter");
            button.appendChild(i);
            filterContainerGestioneLotti.appendChild(button);

            var button=document.createElement("button");
            button.setAttribute("class","filter-button-pannelli-gestione-lotti");
            button.setAttribute("onclick","getPupupFiltro(this,event,'lato_nave')");
            var span=document.createElement("span");
            span.innerHTML="Lato nave";
            button.appendChild(span);
            var i=document.createElement("i");
            i.setAttribute("class","fas fa-filter");
            button.appendChild(i);
            filterContainerGestioneLotti.appendChild(button);

            var button=document.createElement("button");
            button.setAttribute("class","filter-button-pannelli-gestione-lotti");
            button.setAttribute("onclick","getPupupFiltro(this,event,'finitura_A')");
            var span=document.createElement("span");
            span.innerHTML="Finitura A";
            button.appendChild(span);
            var i=document.createElement("i");
            i.setAttribute("class","fas fa-filter");
            button.appendChild(i);
            filterContainerGestioneLotti.appendChild(button);

            var button=document.createElement("button");
            button.setAttribute("class","filter-button-pannelli-gestione-lotti");
            button.setAttribute("onclick","getPupupFiltro(this,event,'finitura_B')");
            var span=document.createElement("span");
            span.innerHTML="Finitura B";
            button.appendChild(span);
            var i=document.createElement("i");
            i.setAttribute("class","fas fa-filter");
            button.appendChild(i);
            filterContainerGestioneLotti.appendChild(button);

            var button=document.createElement("button");
            button.setAttribute("class","filter-button-pannelli-gestione-lotti");
            button.setAttribute("onclick","getPupupFiltro(this,event,'finitura_C')");
            var span=document.createElement("span");
            span.innerHTML="Finitura C";
            button.appendChild(span);
            var i=document.createElement("i");
            i.setAttribute("class","fas fa-filter");
            button.appendChild(i);
            filterContainerGestioneLotti.appendChild(button);

            var button=document.createElement("button");
            button.setAttribute("class","filter-button-pannelli-gestione-lotti");
            button.setAttribute("onclick","getPupupFiltro(this,event,'settimana')");
            var span=document.createElement("span");
            span.innerHTML="Settimana";
            button.appendChild(span);
            var i=document.createElement("i");
            i.setAttribute("class","fas fa-filter");
            button.appendChild(i);
            filterContainerGestioneLotti.appendChild(button);

            var button=document.createElement("button");
            button.setAttribute("class","filter-button-pannelli-gestione-lotti");
            button.setAttribute("onclick","getPupupFiltro(this,event,'piano_montaggio')");
            var span=document.createElement("span");
            span.innerHTML="Piano montaggio";
            button.appendChild(span);
            var i=document.createElement("i");
            i.setAttribute("class","fas fa-filter");
            button.appendChild(i);
            filterContainerGestioneLotti.appendChild(button);

            cabine=await getCabine();
            console.log(cabine);

            var count=0;
            cabine.forEach(cabina =>
            {
                var keep=true;
                for (var colonna in cabina)
                {
                    if (Object.prototype.hasOwnProperty.call(cabina, colonna))
                    {
                        if(filtriCabine[colonna]!=undefined)
                        {
                            var valori=[];
                            filtriCabine[colonna].forEach(filtro =>
                            {
                                if(filtro.checked)
                                {
                                    valori.push(filtro.valore);
                                }
                            });
                            if(!valori.includes(cabina[colonna]))
                                keep=false;
                        }
                    }
                }
                if(keep)
                {
                    cabineFiltrate.push(cabina);
                    count++;
                    var item=document.createElement("div");
                    item.setAttribute("class","pannelli-item");
                    if(count==cabine.length-1)
                    {
                        item.setAttribute("style","margin-bottom:0px");
                    }

                    item.setAttribute("numero_cabina",cabina.numero_cabina);
                    item.setAttribute("kit_cabina",cabina.kit_cabina);
                    item.setAttribute("id_gn",cabina.id_gn);

                    var span=document.createElement("span");
                    span.innerHTML=cabina.numero_cabina;
                    item.appendChild(span);

                    var span=document.createElement("span");
                    span.setAttribute("style","margin-left:10px");
                    span.innerHTML=cabina.kit_cabina;
                    item.appendChild(span);

                    /*var button=document.createElement("button");
                    button.setAttribute("onclick","rimuoviStazionePercorso("+stazione.id_stazione+",true)");
                    button.setAttribute("title","Rimuovi stazione");
                    button.innerHTML='<i class="fas fa-minus"></i>';
                    item.appendChild(button);*/

                    pannelliContainer.appendChild(item);
                }
            });

            var pannelliLottoContainer=document.getElementById("pannelliLottoContainer");
            pannelliLottoContainer.innerHTML="";

            cabineLotto=await getCabineLotto();
            console.log(cabineLotto);

            var count=0;
            cabineLotto.forEach(cabina =>
            {
                count++;
                var item=document.createElement("div");
                item.setAttribute("class","pannelli-lotto-item");
                if(count==cabineLotto.length-1)
                {
                    item.setAttribute("style","margin-bottom:0px");
                }

                item.setAttribute("numero_cabina",cabina.numero_cabina);
                item.setAttribute("kit_cabina",cabina.kit_cabina);
                item.setAttribute("id_gn",cabina.id_gn);

                var span=document.createElement("span");
                span.innerHTML=cabina.numero_cabina;
                item.appendChild(span);

                var span=document.createElement("span");
                span.setAttribute("style","margin-left:10px");
                span.innerHTML=cabina.kit_cabina;
                item.appendChild(span);

                /*var button=document.createElement("button");
                button.setAttribute("onclick","rimuoviStazionePercorso("+stazione.id_stazione+",true)");
                button.setAttribute("title","Rimuovi stazione");
                button.innerHTML='<i class="fas fa-minus"></i>';
                item.appendChild(button);*/

                pannelliLottoContainer.appendChild(item);
            });
        }
        Swal.close();
    }
}
function getCabineLotto()
{
    return new Promise(function (resolve, reject) 
    {
        var id_commessa=document.getElementById("selectCommessaGestioneLotti").value;
        var id_lotto=document.getElementById("selectLottoGestioneLotti").value;
        $.get("getCabineLottoGestioneLotti.php",{id_commessa,id_lotto},
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                    resolve([]);
                }
                else
                {
                    try {
                        resolve(JSON.parse(response));
                    } catch (error) {
                        Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                        console.log(response);
                        resolve([]);
                    }
                }
            }
        });
    });
}
function getCabine()
{
    return new Promise(function (resolve, reject) 
    {
        var id_commessa=document.getElementById("selectCommessaGestioneLotti").value;
        var id_lotto=document.getElementById("selectLottoGestioneLotti").value;
        $.get("getCabineGestioneLotti.php",{id_commessa,id_lotto},
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                    resolve([]);
                }
                else
                {
                    try {
                        resolve(JSON.parse(response));
                    } catch (error) {
                        Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                        console.log(response);
                        resolve([]);
                    }
                }
            }
        });
    });
}
function getPupupFiltro(button,event,colonna)
{
    closePopupFiltro();

    var rect = button.getBoundingClientRect();
    var outerContainer=document.createElement("div");
    outerContainer.setAttribute("class","popup-filtro-outer-container popup-filtro-item");
    outerContainer.setAttribute("id","popupFiltroOuterContainer"+colonna);
    outerContainer.setAttribute("style","min-width:"+button.offsetWidth+"px");

    var row=document.createElement("button");
    row.setAttribute("class","popup-filtro-row popup-filtro-item");
    row.setAttribute("onclick","this.getElementsByTagName('input')[0].checked=!this.getElementsByTagName('input')[0].checked;checkCheckboxTutti(this.getElementsByTagName('input')[0].checked,'"+colonna+"')");

    var checkbox=document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    checkbox.setAttribute("id","popupFiltroCheckboxTutti"+colonna);
    checkbox.setAttribute("onclick","stopCheckboxPropagation(event);checkCheckboxTutti(this.checked,'"+colonna+"')");
    row.appendChild(checkbox);

    var span=document.createElement("span");
    span.setAttribute("class","popup-filtro-item");
    span.innerHTML="Tutti";
    row.appendChild(span);

    outerContainer.appendChild(row);

    filtriCabine[colonna].forEach(filtro =>
    {
        var row=document.createElement("button");
        row.setAttribute("class","popup-filtro-row popup-filtro-item");
        row.setAttribute("onclick","this.getElementsByTagName('input')[0].checked=!this.getElementsByTagName('input')[0].checked;checkCheckbox(this.getElementsByTagName('input')[0],'"+colonna+"','"+filtro.valore+"')");

        var checkbox=document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("class","popup-filtro-item popup-filtro-checkbox"+colonna);
        /*if(colonna="kit_cabina")
        console.log(filtro.valore);*/
        checkbox.setAttribute("valore",filtro.valore);
        checkbox.setAttribute("onclick","stopCheckboxPropagation(event);checkCheckbox(this,'"+colonna+"','"+filtro.valore+"')");
        if(filtro.checked)
            checkbox.setAttribute("checked","checked");
        row.appendChild(checkbox);

        var span=document.createElement("span");
        span.setAttribute("class","popup-filtro-item");
        if(filtro.valore=="" || filtro.valore=="NULL" || filtro.valore==null)
            span.innerHTML="Vuoto";
        else
            span.innerHTML=filtro.valore;
        row.appendChild(span);

        outerContainer.appendChild(row);
    });

    var button=document.createElement("button");
    button.setAttribute("class","popup-filtro-button popup-filtro-item");
    button.setAttribute("onclick","getValoriFiltriCabine('"+colonna+"')");
    var span=document.createElement("span");
    span.setAttribute("class","popup-filtro-item");
    span.innerHTML="Conferma";
    button.appendChild(span);
    var i=document.createElement("i");
    i.setAttribute("class","fad fa-check-double popup-filtro-item");
    button.appendChild(i);
    outerContainer.appendChild(button);

    document.body.appendChild(outerContainer);

    var all=true;
    var checkboxes=document.getElementsByClassName("popup-filtro-checkbox"+colonna);
    for (let index = 0; index < checkboxes.length; index++)
    {
        const checkbox = checkboxes[index];
        if(!checkbox.checked)
            all=false;
    }
    document.getElementById("popupFiltroCheckboxTutti"+colonna).checked=all;

    $("#popupFiltroOuterContainer"+colonna).css({"left":rect.left+"px","top":(rect.top+32.5)+"px"});
}
function closePopupFiltro()
{
    $(".popup-filtro-outer-container").remove();
}
function getValoriFiltriCabine(colonna)
{
    var checkboxes=document.getElementsByClassName("popup-filtro-checkbox"+colonna);
    for (let index = 0; index < checkboxes.length; index++)
    {
        const checkbox = checkboxes[index];
        var valore=checkbox.getAttribute("valore");

        filtriCabine[colonna].forEach(filtro =>
        {
            if(filtro.valore==valore)
                filtro.checked=checkbox.checked;
        });
    }
    closePopupFiltro();
    getInfoLotto();
}
function checkCheckboxTutti(checked,colonna)
{
    var all=true;
    var checkboxes=document.getElementsByClassName("popup-filtro-checkbox"+colonna);
    for (let index = 0; index < checkboxes.length; index++)
    {
        const checkbox = checkboxes[index];
        checkbox.checked=checked;
    }
}
function checkCheckbox(checkbox,colonna,valore)
{
    var all=true;
    var checkboxes=document.getElementsByClassName("popup-filtro-checkbox"+colonna);
    for (let index = 0; index < checkboxes.length; index++)
    {
        const checkbox = checkboxes[index];
        if(!checkbox.checked)
            all=false;
    }
    document.getElementById("popupFiltroCheckboxTutti"+colonna).checked=all;
}
function getPannelliLotto(id_lotto)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getPannelliLottoGestioneLotti.php",{id_lotto},
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                    resolve([]);
                }
                else
                {
                    try {
                        resolve(JSON.parse(response));
                    } catch (error) {
                        Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                        console.log(response);
                        resolve([]);
                    }
                }
            }
        });
    });
}
async function creaSelectLotto()
{
    try {
        document.getElementById("pannelliLottoContainer").innerHTML="";
        document.getElementById("pannelliContainer").innerHTML="";
    } catch (error) {}

    var actionBar=document.getElementById("actionBarGestioneLotti");

    var actionBarItem=document.createElement("div");
    actionBarItem.setAttribute("class","rcb-select-container");
    
    var span=document.createElement("span");
    span.innerHTML="Lotto";
    actionBarItem.appendChild(span);

    var selectLotto=document.createElement("select");
    selectLotto.setAttribute("onchange","getInfoLotto()");
    selectLotto.setAttribute("id","selectLottoGestioneLotti");
    selectLotto.setAttribute("style","text-decoration:none");

    var option=document.createElement("option");
    option.setAttribute("value","");
    option.setAttribute("disabled","disabled");
    option.setAttribute("selected","selected");
    option.innerHTML="Scegli";
    selectLotto.appendChild(option);

    lotti=await getLotti();
    
    lotti.forEach(function (lotto)
    {
        var option=document.createElement("option");
        option.setAttribute("value",lotto.id_lotto);
        option.innerHTML=lotto.lotto;
        selectLotto.appendChild(option);
    });
    
    actionBarItem.appendChild(selectLotto);

    if(document.getElementById("selectLottoGestioneLotti")==null)
        actionBar.appendChild(actionBarItem);
    else
    {
        document.getElementById("selectLottoGestioneLotti").parentElement.remove();
        actionBar.insertBefore(actionBarItem, actionBar.childNodes[1]); 
    }

    /*$("#selectLottoGestioneLotti").multipleSelect(
    {
        single:true,
        onAfterCreate: function () 
                {
                    $(".ms-choice").css({"height":"20px","line-height":"21px","background-color":"transparent","border":"none"});
                    $(".ms-parent").css({"max-width":"70px"});
                    $(".ms-choice").css({"outline":"none"});
                },
        onOpen:function()
        {
            $(".ms-search input").css({"font-family":"'Montserrat',sans-serif","font-size":"12px","text-align":"left"});
            $(".optgroup").css({"font-family":"'Montserrat',sans-serif","font-size":"12px"});
            $(".ms-drop label").css({"text-align":"right"});
            $(".group label").css({"text-align":"left"});
        },
        filter:true,
        filterPlaceholder:"Cerca...",
        locale:"it-IT"
    });*/
}
async function creaECambiaSelectLotto(id_lotto)
{
    var actionBar=document.getElementById("actionBarGestioneLotti");

    var actionBarItem=document.createElement("div");
    actionBarItem.setAttribute("class","rcb-select-container");
    
    var span=document.createElement("span");
    span.innerHTML="Lotto";
    actionBarItem.appendChild(span);

    var selectLotto=document.createElement("select");
    selectLotto.setAttribute("onchange","getInfoLotto()");
    selectLotto.setAttribute("id","selectLottoGestioneLotti");
    selectLotto.setAttribute("style","text-decoration:none");

    lotti=await getLotti();
    
    lotti.forEach(function (lotto)
    {
        var option=document.createElement("option");
        option.setAttribute("value",lotto.id_lotto);
        if(id_lotto==lotto.id_lotto)
            option.setAttribute("selected","selected");
        option.innerHTML=lotto.lotto;
        selectLotto.appendChild(option);
    });
    
    actionBarItem.appendChild(selectLotto);

    if(document.getElementById("selectLottoGestioneLotti")==null)
        actionBar.appendChild(actionBarItem);
    else
    {
        document.getElementById("selectLottoGestioneLotti").parentElement.remove();
        actionBar.insertBefore(actionBarItem, actionBar.childNodes[1]); 
    }

    /*$("#selectLottoGestioneLotti").multipleSelect(
    {
        single:true,
        onAfterCreate: function () 
                {
                    $(".ms-choice").css({"height":"20px","line-height":"21px","background-color":"transparent","border":"none"});
                    $(".ms-parent").css({"max-width":"70px"});
                    $(".ms-choice").css({"outline":"none"});
                },
        onOpen:function()
        {
            $(".ms-search input").css({"font-family":"'Montserrat',sans-serif","font-size":"12px","text-align":"left"});
            $(".optgroup").css({"font-family":"'Montserrat',sans-serif","font-size":"12px"});
            $(".ms-drop label").css({"text-align":"right"});
            $(".group label").css({"text-align":"left"});
        },
        filter:true,
        filterPlaceholder:"Cerca...",
        locale:"it-IT"
    });*/
    getInfoLotto();
}
function getFiltriCabine()
{
    return new Promise(function (resolve, reject) 
    {
        var id_commessa=document.getElementById("selectCommessaGestioneLotti").value;
        $.get("getFiltriCabineGestioneLotti.php",{id_commessa},
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                    resolve([]);
                }
                else
                {
                    try {
                        resolve(JSON.parse(response));
                    } catch (error) {
                        Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                        console.log(response);
                        resolve([]);
                    }
                }
            }
        });
    });
}
function stopCheckboxPropagation(event)
{
    event.stopPropagation();
}
window.addEventListener("click", windowClick, false);
function windowClick(e)
{
    try
    {
        if(e.target.className!="filter-button-pannelli-gestione-lotti" && e.target.parentElement.className!="filter-button-pannelli-gestione-lotti" && e.target.className.indexOf("popup-filtro-item")==-1 && e.target.className!="popup-filtro-outer-container")
            closePopupFiltro();
    }
    catch (error) {}
}
async function importaLottoGeneralNumbering()
{
    var selects=$('#selectLottoGeneralNumbering').multipleSelect('getSelects')[1].split("|");
    var id_lottoOld=selects[0];
    var profilo=selects[1];
    var lottoOld=selects[2];
    var commessa=selects[3];

    Swal.fire
    ({
        width:"100%",
        background:"transparent",
        title:"Caricamento in corso...",
        html:'<i class="fad fa-spinner-third fa-spin fa-3x" style="color:white"></i>',
        allowOutsideClick:false,
        showCloseButton:false,
        showConfirmButton:false,
        allowEscapeKey:false,
        showCancelButton:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
    });

    var lottoDuplicato=await checkLottoDuplicato(lottoOld,commessa);
    if(lottoDuplicato)
    {
        Swal.fire
        ({
            icon:"warning",
            title: "Esiste gia un lotto con questo nome",
            background:"#404040",
            showCloseButton:true,
            showConfirmButton:false,
            showCancelButton:true,
            showDenyButton: true,
            cancelButtonText:"Annulla",
            denyButtonText:"Sovrascrivi",
            onOpen : function()
                    {
                        document.getElementsByClassName("swal2-title")[0].style.color="white";
                        document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";
                        document.getElementsByClassName("swal2-title")[0].style.fontWeight="normal";
                        document.getElementsByClassName("swal2-title")[0].style.fontFamily="'Montserrat',sans-serif";
                        document.getElementsByClassName("swal2-close")[0].style.boxShadow="none";

                        document.getElementsByClassName("swal2-confirm")[0].style.fontSize="14px";
                        document.getElementsByClassName("swal2-confirm")[0].style.fontWeight="normal";
                        document.getElementsByClassName("swal2-confirm")[0].style.fontFamily="'Montserrat',sans-serif";
                        
                        document.getElementsByClassName("swal2-deny")[0].style.fontSize="14px";
                        document.getElementsByClassName("swal2-deny")[0].style.fontWeight="normal";
                        document.getElementsByClassName("swal2-deny")[0].style.fontFamily="'Montserrat',sans-serif";

                        document.getElementsByClassName("swal2-cancel")[0].style.fontSize="14px";
                        document.getElementsByClassName("swal2-cancel")[0].style.fontWeight="normal";
                        document.getElementsByClassName("swal2-cancel")[0].style.fontFamily="'Montserrat',sans-serif";
                    }
        }).then((result) =>
        {
            switch (result.value)
            {
                case false:
                    Swal.fire
                    ({
                        width:"100%",
                        background:"transparent",
                        title:"Caricamento in corso...",
                        html:'<i class="fad fa-spinner-third fa-spin fa-3x" style="color:white"></i>',
                        allowOutsideClick:false,
                        showCloseButton:false,
                        showConfirmButton:false,
                        allowEscapeKey:false,
                        showCancelButton:false,
                        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
                    });
                    $.post("eliminaLottoGestioneLotti.php",
                    {
                        lotto:lottoOld,commessa
                    },
                    function(response, status)
                    {
                        if(status=="success")
                        {
                            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                            {
                                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                                console.log(response);
                            }
                            else
                            {
                                $.get("importaLottoGeneralNumbering.php",{id_lottoOld,profilo},
                                function(response, status)
                                {
                                    if(status=="success")
                                    {
                                        if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                                        {
                                            Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                                            console.log(response);
                                        }
                                        else
                                        {
                                            let timerInterval;
                                            Swal.fire
                                            ({
                                                icon:"success",
                                                title: "Lotto importato",
                                                background:"#404040",
                                                showCloseButton:false,
                                                showConfirmButton:false,
                                                allowOutsideClick:false,
                                                timer: 2000,
                                                timerProgressBar: true,
                                                onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";},
                                                onClose: () => {clearInterval(timerInterval)}
                                            }).then((result) =>
                                            {
                                                var responseObj=JSON.parse(response);
                                                console.log(responseObj);
                                                var id_commessa=responseObj.id_commessa;
                                                var id_lotto=responseObj.id_lotto;
                                                var lotto=responseObj.lotto;
                                                document.getElementById("selectCommessaGestioneLotti").value=id_commessa;

                                                creaECambiaSelectLotto(id_lotto);
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                break;
                case undefined:
                    Swal.close();
                break;
            }
        });
    }
    else
    {
        $.get("importaLottoGeneralNumbering.php",{id_lottoOld,profilo},
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                }
                else
                {
                    let timerInterval;
                    Swal.fire
                    ({
                        icon:"success",
                        title: "Lotto importato",
                        background:"#404040",
                        showCloseButton:false,
                        showConfirmButton:false,
                        allowOutsideClick:false,
                        timer: 2000,
                        timerProgressBar: true,
                        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";},
                        onClose: () => {clearInterval(timerInterval)}
                    }).then((result) =>
                    {
                        var responseObj=JSON.parse(response);
                        console.log(responseObj);
                        var id_commessa=responseObj.id_commessa;
                        var id_lotto=responseObj.id_lotto;
                        var lotto=responseObj.lotto;
                        document.getElementById("selectCommessaGestioneLotti").value=id_commessa;

                        creaECambiaSelectLotto(id_lotto);
                    });
                }
            }
        });
    }
}