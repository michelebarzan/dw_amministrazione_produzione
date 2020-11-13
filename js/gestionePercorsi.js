var percorsi=[];
var sortableDropHelper=
{
    origin:null,
    target:null,
    item:null
};

window.addEventListener("load", function(event)
{
    try {
        document.getElementById(document.getElementById("btnToClick").value).click();
    } catch (error) {}
});
function getAnagraficaStazioni(button)
{
    $(".in-page-nav-bar-button").css({"border-bottom-color":"","font-weight":""});
    button.style.borderBottomColor="#4C91CB";
    button.style.fontWeight="bold";

    document.getElementById("actionBarGestionePercorsi").style.display="flex";
    document.getElementById("actionBarGestionePercorsi").innerHTML="";
    
    document.getElementById("gestionePercorsiContainer").style.display="flex";
    document.getElementById("gestionePercorsiContainer").innerHTML="";

    var actionBar=document.getElementById("actionBarGestionePercorsi");

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

    getTable("stazioni");
}
function getAnagraficaPercorsi(button)
{
    $(".in-page-nav-bar-button").css({"border-bottom-color":"","font-weight":""});
    button.style.borderBottomColor="#4C91CB";
    button.style.fontWeight="bold";

    document.getElementById("actionBarGestionePercorsi").style.display="flex";
    document.getElementById("actionBarGestionePercorsi").innerHTML="";
    
    document.getElementById("gestionePercorsiContainer").style.display="flex";
    document.getElementById("gestionePercorsiContainer").innerHTML="";

    var actionBar=document.getElementById("actionBarGestionePercorsi");

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

    getTable("view_percorsi");
}
function getAnagraficaFiltri(button)
{
    $(".in-page-nav-bar-button").css({"border-bottom-color":"","font-weight":""});
    button.style.borderBottomColor="#4C91CB";
    button.style.fontWeight="bold";

    document.getElementById("actionBarGestionePercorsi").style.display="flex";
    document.getElementById("actionBarGestionePercorsi").innerHTML="";
    
    document.getElementById("gestionePercorsiContainer").style.display="flex";
    document.getElementById("gestionePercorsiContainer").innerHTML="";

    var actionBar=document.getElementById("actionBarGestionePercorsi");

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

    getTable("filtri_materiali_percorsi");
}
function getTable(table,orderBy,orderType)
{
    if(table=="stazioni")
    {
        getEditableTable
        ({
            table:'stazioni',
            editable: true,
            primaryKey: "id_stazione",
            container:'gestionePercorsiContainer',
            readOnlyColumns:['id_stazione'],
            noInsertColumns:['id_stazione'],
            orderBy:orderBy,
            orderType:orderType
        });
    }
    if(table=="view_percorsi")
    {
        getEditableTable
        ({
            table:'view_percorsi',
            editable: true,
            primaryKey: "id_percorso",
            container:'gestionePercorsiContainer',
            readOnlyColumns:['id_percorso'],
            noInsertColumns:['id_percorso'],
            orderBy:orderBy,
            orderType:orderType
        });
    }
    if(table=="filtri_materiali_percorsi")
    {
        getEditableTable
        ({
            table:'filtri_materiali_percorsi',
            editable: true,
            primaryKey: "id_filtro",
            container:'gestionePercorsiContainer',
            readOnlyColumns:['id_filtro'],
            noInsertColumns:['id_filtro'],
            orderBy:orderBy,
            orderType:orderType
        });
    }
}
function editableTableLoad()
{

}
async function getMascheraComposizionePercorsi(button)
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

    $(".in-page-nav-bar-button").css({"border-bottom-color":"","font-weight":""});
    button.style.borderBottomColor="#4C91CB";
    button.style.fontWeight="bold";

    document.getElementById("actionBarGestionePercorsi").style.display="flex";
    document.getElementById("actionBarGestionePercorsi").innerHTML="";
    
    document.getElementById("gestionePercorsiContainer").style.display="flex";
    document.getElementById("gestionePercorsiContainer").innerHTML="";

    var actionBar=document.getElementById("actionBarGestionePercorsi");

    percorsi=await getPercorsi();

    var actionBarItem=document.createElement("div");
    actionBarItem.setAttribute("class","rcb-select-container");

    var span=document.createElement("span");
    span.innerHTML="Scegli percorso";
    actionBarItem.appendChild(span);

    var selectPercorso=document.createElement("select");
    //selectPercorso.setAttribute("style","margin-left:5px");
    selectPercorso.setAttribute("id","selectPercorsoGestionePercorsi");
    selectPercorso.setAttribute("onchange","getComposizionePercorso()");

    var option=document.createElement("option");
    option.setAttribute("value","");
    option.setAttribute("disabled","disabled");
    option.setAttribute("selected","selected");
    option.innerHTML="Seleziona";
    selectPercorso.appendChild(option);

    percorsi.forEach(function (percorso)
    {
        var option=document.createElement("option");
        option.setAttribute("value",percorso.id_percorso);
        option.innerHTML=percorso.nome;
        selectPercorso.appendChild(option);
    });
    
    actionBarItem.appendChild(selectPercorso);
    actionBar.appendChild(actionBarItem);

    var container=document.getElementById("gestionePercorsiContainer");

    //-------------------------------------------
    var stazioniPercorsoContainer=document.createElement("div");
    stazioniPercorsoContainer.setAttribute("class","container-stazioni-gestione-percorsi");

    var stazioniPercorsoTitleContainer=document.createElement("div");
    stazioniPercorsoTitleContainer.setAttribute("class","title-container-stazioni-gestione-percorsi");
    stazioniPercorsoTitleContainer.innerHTML="<span>Stazioni aggiunte al percorso</span><span id='nStazioniPercorso'></span>";
    stazioniPercorsoContainer.appendChild(stazioniPercorsoTitleContainer);

    var stazioniPercorsoSearchContainer=document.createElement("div");
    stazioniPercorsoSearchContainer.setAttribute("class","search-container-stazioni-gestione-percorsi");
    
    var search=document.createElement("input");
    search.setAttribute("type","search");
    search.setAttribute("onkeyup","searchStazioni(this.value,'stazioni-percorso-item')");
    search.setAttribute("onsearch","searchStazioni(this.value,'stazioni-percorso-item')");
    search.setAttribute("placeholder","Cerca...");
    stazioniPercorsoSearchContainer.appendChild(search);

    stazioniPercorsoContainer.appendChild(stazioniPercorsoSearchContainer);

    var stazioniPercorsoInnerContainer=document.createElement("div");
    stazioniPercorsoInnerContainer.setAttribute("class","inner-container-stazioni-gestione-percorsi connectedSortable");
    stazioniPercorsoInnerContainer.setAttribute("id","stazioniPercorsoContainer");
    stazioniPercorsoContainer.appendChild(stazioniPercorsoInnerContainer);

    container.appendChild(stazioniPercorsoContainer);

    var label=document.createElement("div");
    label.setAttribute("class","container-stazioni-gestione-percorsi-label");
    label.innerHTML="<i class='fad fa-layer-plus'></i><span>Trascina le stazioni</span><i class='fad fa-sort-alt'></i>";
    container.appendChild(label);

    var stazioniContainer=document.createElement("div");
    stazioniContainer.setAttribute("class","container-stazioni-gestione-percorsi");

    var stazioniTitleContainer=document.createElement("div");
    stazioniTitleContainer.setAttribute("class","title-container-stazioni-gestione-percorsi");
    stazioniTitleContainer.innerHTML="<span>Stazioni disponibili</span><span id='nStazioni'></span>";
    stazioniContainer.appendChild(stazioniTitleContainer);

    var stazioniSearchContainer=document.createElement("div");
    stazioniSearchContainer.setAttribute("class","search-container-stazioni-gestione-percorsi");
    
    var search=document.createElement("input");
    search.setAttribute("type","search");
    search.setAttribute("onkeyup","searchStazioni(this.value,'stazioni-item')");
    search.setAttribute("onsearch","searchStazioni(this.value,'stazioni-item')");
    search.setAttribute("placeholder","Cerca...");
    stazioniSearchContainer.appendChild(search);

    stazioniContainer.appendChild(stazioniSearchContainer);

    var stazioniInnerContainer=document.createElement("div");
    stazioniInnerContainer.setAttribute("class","inner-container-stazioni-gestione-percorsi connectedSortable");
    stazioniInnerContainer.setAttribute("id","stazioniContainer");
    stazioniContainer.appendChild(stazioniInnerContainer);

    container.appendChild(stazioniContainer);

    Swal.close();

    $( ".connectedSortable" ).sortable
    ({
        connectWith: ".connectedSortable",
        start: function( event, ui )
        {
            var elements=document.getElementsByClassName("inner-container-stazioni-gestione-percorsi");
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
            var elements=document.getElementsByClassName("inner-container-stazioni-gestione-percorsi");
            for (let index = 0; index < elements.length; index++)
            {
                var element = elements[index];
                element.style.backgroundColor="";
                element.style.borderColor="";
            }

            var item=ui.item;
            var id_stazione=sortableDropHelper.item.attr("id_stazione");

            sortableDropHelper.target=item.parent()[0].id;

            if(sortableDropHelper.target=="stazioniPercorsoContainer" && sortableDropHelper.target==sortableDropHelper.origin)
            {
                aggiornaPosizioneStazioni(false);
            }

            if(sortableDropHelper.origin=="stazioniPercorsoContainer" && sortableDropHelper.target=="stazioniContainer")
            {
                rimuoviStazionePercorso(id_stazione,false);
            }

            if(sortableDropHelper.origin=="stazioniContainer" && sortableDropHelper.target=="stazioniPercorsoContainer")
            {
                aggiungiStazionePercorso(id_stazione,false);
            }
        }
    }).disableSelection();
    //-------------------------------------------
    Swal.close();
}
function assegnaFiltroPercorso()
{
    var id_percorso=document.getElementById("selectPercorsoGestionePercorsi").value;
    var id_filtro=document.getElementById("selectFiltroGestionePercorsi").value;

    if(id_filtro=="rimuovi_filtro")
        id_filtro="NULL";

    $.post("assegnaFiltroPercorsoGestionePercorsi.php",
    {
        id_percorso,
        id_filtro
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
        }
    });
}
function aggiornaPosizioneStazioni(refresh)
{
    var id_percorso=document.getElementById("selectPercorsoGestionePercorsi").value;
    var posizioni=[];

    var stazioniPercorsoContainer=document.getElementById("stazioniPercorsoContainer");
    for (let index = 0; index < stazioniPercorsoContainer.children.length; index++)
    {
        const element = stazioniPercorsoContainer.children[index];

        posizione=
        {
            id_stazione:element.getAttribute("id_stazione"),
            posizione:index
        }
        posizioni.push(posizione);
    }
    
    var JSONposizioni=JSON.stringify(posizioni);
    $.post("aggiornaPosizioneStazioniGestionePercorsi.php",
    {
        id_percorso,
        JSONposizioni
    },
    function(response, status)
    {
        if(status=="success")
        {
            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
                getComposizionePercorso();
            }
            else
            {
                if(refresh)
                    getComposizionePercorso();
            }
        }
    });
}
function aggiungiStazionePercorso(id_stazione,refresh)
{
    var id_percorso=document.getElementById("selectPercorsoGestionePercorsi").value;

    $.post("aggiungiStazionePercorsoGestionePercorsi.php",
    {
        id_stazione,
        id_percorso
    },
    function(response, status)
    {
        if(status=="success")
        {
            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
                getComposizionePercorso();
            }
            else
                aggiornaPosizioneStazioni(refresh);
        }
    });
}
function rimuoviStazionePercorso(id_stazione,refresh)
{
    var id_percorso=document.getElementById("selectPercorsoGestionePercorsi").value;

    $.post("rimuoviStazionePercorsoGestionePercorsi.php",
    {
        id_stazione,
        id_percorso
    },
    function(response, status)
    {
        if(status=="success")
        {
            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
                getComposizionePercorso();
            }
            else
                aggiornaPosizioneStazioni(refresh);
        }
    });
}
async function getComposizionePercorso()
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

    try {
        document.getElementById("selectFiltroGestionePercorsi").parentElement.remove();
    } catch (error) {}

    var id_percorso=document.getElementById("selectPercorsoGestionePercorsi").value;
    percorsi=await getPercorsi();
    var percorso=getFirstObjByPropValue(percorsi,"id_percorso",id_percorso);

    console.log(percorso.filtro);

    filtri=await getFiltri();

    var actionBar=document.getElementById("actionBarGestionePercorsi");

    var actionBarItem=document.createElement("div");
    actionBarItem.setAttribute("class","rcb-select-container");

    var span=document.createElement("span");
    span.innerHTML="Filtro assegnato";
    actionBarItem.appendChild(span);

    var selectFiltro=document.createElement("select");
    selectFiltro.setAttribute("id","selectFiltroGestionePercorsi");
    selectFiltro.setAttribute("onchange","assegnaFiltroPercorso()");

    var option=document.createElement("option");
    option.setAttribute("value","rimuovi_filtro");
    option.setAttribute("selected","selected");
    option.innerHTML="Nessuno";
    selectFiltro.appendChild(option);

    filtri.forEach(function (filtro)
    {
        var option=document.createElement("option");
        if(percorso.filtro==filtro.id_filtro)
        {
            option.setAttribute("selected","selected");
        }
        option.setAttribute("value",filtro.id_filtro);
        option.innerHTML=filtro.nome;
        selectFiltro.appendChild(option);
    });
    
    actionBarItem.appendChild(selectFiltro);
    actionBar.appendChild(actionBarItem);

    //--------------------------------------------------------------
    var stazioni_percorso=await getStazioniPercorso(id_percorso);

    var stazioniPercorsoInnerContainer=document.getElementById("stazioniPercorsoContainer");
    stazioniPercorsoInnerContainer.innerHTML="";

    stazioni_percorso.forEach(function(stazione)
    {
        var item=document.createElement("div");
        item.setAttribute("class","stazioni-percorso-item");

        item.setAttribute("id_stazione",stazione.id_stazione);
        item.setAttribute("nome",stazione.nome);
        item.setAttribute("descrizione",stazione.descrizione);
        item.setAttribute("operativa",stazione.operativa);
        item.setAttribute("percorso",stazione.percorso);

        var span=document.createElement("span");
        span.innerHTML=stazione.nome;
        item.appendChild(span);

        if(stazione.operativa=="false")
        {
            var i=document.createElement("i");
            i.setAttribute("class","fad fa-exclamation-circle");
            i.setAttribute("title","Stazione non operativa");
            item.appendChild(i);
        }

        var button=document.createElement("button");
        button.setAttribute("onclick","rimuoviStazionePercorso("+stazione.id_stazione+",true)");
        button.setAttribute("title","Rimuovi stazione");
        button.innerHTML='<i class="fas fa-minus"></i>';
        item.appendChild(button);

        stazioniPercorsoInnerContainer.appendChild(item);
    });

    var stazioniInnerContainer=document.getElementById("stazioniContainer");
    stazioniInnerContainer.innerHTML="";

    var stazioni=await getStazioni(id_percorso);

    stazioni.forEach(function(stazione)
    {
        var item=document.createElement("div");
        item.setAttribute("class","stazioni-item");

        item.setAttribute("id_stazione",stazione.id_stazione);
        item.setAttribute("nome",stazione.nome);
        item.setAttribute("descrizione",stazione.descrizione);
        item.setAttribute("operativa",stazione.operativa);

        var span=document.createElement("span");
        span.innerHTML=stazione.nome;
        item.appendChild(span);

        if(stazione.operativa=="false")
        {
            var i=document.createElement("i");
            i.setAttribute("class","fad fa-exclamation-circle");
            i.setAttribute("title","Stazione non operativa");
            item.appendChild(i);
        }

        var button=document.createElement("button");
        button.setAttribute("onclick","aggiungiStazionePercorso("+stazione.id_stazione+",true)");
        button.setAttribute("title","Aggiungi stazione");
        button.innerHTML='<i class="fas fa-plus"></i>';
        item.appendChild(button);

        stazioniInnerContainer.appendChild(item);
    });
    Swal.close();
}
function getPercorsi()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getPercorsiGestionePercorsi.php",
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
function getStazioni(id_percorso)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getStazioniGestionePercorsi.php",
        {
            id_percorso
        },
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
function getStazioniPercorso(id_percorso)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getStazioniPercorsoGestionePercorsi.php",
        {
            id_percorso
        },
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
function searchStazioni(value,itemClass)
{
    $("."+itemClass).filter(function()
    {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}
async function getMascheraComposizioneFiltri(button)
{
    $(".in-page-nav-bar-button").css({"border-bottom-color":"","font-weight":""});
    button.style.borderBottomColor="#4C91CB";
    button.style.fontWeight="bold";

    document.getElementById("actionBarGestionePercorsi").style.display="flex";
    document.getElementById("actionBarGestionePercorsi").innerHTML="";
    
    document.getElementById("gestionePercorsiContainer").style.display="flex";
    document.getElementById("gestionePercorsiContainer").innerHTML="";

    var actionBar=document.getElementById("actionBarGestionePercorsi");

    var buttonNuovoFiltro=document.createElement("button");
    buttonNuovoFiltro.setAttribute("class","rcb-button-text-icon");
    buttonNuovoFiltro.setAttribute("onclick","document.getElementById('btnAnagraficaFiltri').click()");
    buttonNuovoFiltro.innerHTML='<span>Crea nuovo filtro</span><i style="margin-left:5px" class="fas fa-plus"></i>';
    
    actionBar.appendChild(buttonNuovoFiltro);

    filtri=await getFiltri();

    var actionBarItem=document.createElement("div");
    actionBarItem.setAttribute("class","rcb-select-container");

    var span=document.createElement("span");
    span.innerHTML="Scegli filtro";
    actionBarItem.appendChild(span);

    var selectFiltro=document.createElement("select");
    selectFiltro.setAttribute("id","selectFiltroGestionePercorsi");
    selectFiltro.setAttribute("onchange","getTabellaRigheFiltro()");

    var option=document.createElement("option");
    option.setAttribute("value","");
    option.setAttribute("disabled","disabled");
    option.setAttribute("selected","selected");
    option.innerHTML="Seleziona";
    selectFiltro.appendChild(option);

    filtri.forEach(function (filtro)
    {
        var option=document.createElement("option");
        option.setAttribute("value",filtro.id_filtro);
        option.innerHTML=filtro.nome;
        selectFiltro.appendChild(option);
    });
    
    actionBarItem.appendChild(selectFiltro);
    actionBar.appendChild(actionBarItem);
}
function getPopupNuovoFiltro()
{
    var outerContainer=document.createElement("div");
    outerContainer.setAttribute("class","popup-percorsi-outer-container");

    var row=document.createElement("div");
    row.setAttribute("class","popup-foto-ordini-row");
    row.setAttribute("style","width:100%;color:#ddd;font-size: 12px;text-align:left;font-weight: normal;font-family: 'Quicksand',sans-serif;margin-bottom:5px;");
    row.innerHTML="Nome";
    outerContainer.appendChild(row);

    var row=document.createElement("div");
    row.setAttribute("class","popup-foto-ordini-row");
    row.setAttribute("style","width:100%;margin-bottom:5px;justify-content:flex-start");

    var textarea=document.createElement("textarea");
    textarea.setAttribute("class","popup-percorsi-input");
    textarea.setAttribute("id","popupNuovoFiltroNome");
    
    row.appendChild(textarea);

    outerContainer.appendChild(row);

    var row=document.createElement("div");
    row.setAttribute("class","popup-foto-ordini-row");
    row.setAttribute("style","width:100%;color:#ddd;font-size: 12px;text-align:left;font-weight: normal;font-family: 'Quicksand',sans-serif;margin-bottom:5px;");
    row.innerHTML="Descrizione";
    outerContainer.appendChild(row);

    var row=document.createElement("div");
    row.setAttribute("class","popup-foto-ordini-row");
    row.setAttribute("style","width:100%;margin-bottom:5px;justify-content:flex-start");

    var textarea=document.createElement("textarea");
    textarea.setAttribute("class","popup-percorsi-input");
    textarea.setAttribute("id","popupNuovoFiltroDescrizione");
    
    row.appendChild(textarea);

    outerContainer.appendChild(row);
    
    var row=document.createElement("div");
    row.setAttribute("class","popup-percorsi-row");
    row.setAttribute("style","width:100%;flex-direction:row;align-items:center;justify-content:space-between;flex-direction:row;margin-top:10px");

    var confirmButton=document.createElement("button");
    confirmButton.setAttribute("class","popup-percorsi-button");
    confirmButton.setAttribute("style","width:100%;");
    confirmButton.setAttribute("onclick","creaNuovoFiltro()");
    confirmButton.innerHTML='<span>Conferma</span><i class="fal fa-check-circle"></i>';
    row.appendChild(confirmButton);    

    outerContainer.appendChild(row);

    Swal.fire
    ({
        //position:"top",
        background:"#404040",
        title:"Crea nuovo filtro",
        allowOutsideClick:false,
        onOpen : function()
                {
                    document.getElementsByClassName("swal2-title")[0].style.fontWeight="normal";
                    document.getElementsByClassName("swal2-title")[0].style.maxWidth="70%";
                    document.getElementsByClassName("swal2-title")[0].style.boxSizing="border-box";
                    document.getElementsByClassName("swal2-title")[0].style.marginLeft="10px";
                    document.getElementsByClassName("swal2-title")[0].style.marginTop="15px";
                    document.getElementsByClassName("swal2-title")[0].style.marginRight="10px";
                    document.getElementsByClassName("swal2-title")[0].style.whiteSpace="nowrap";
                    document.getElementsByClassName("swal2-title")[0].style.overflow="hidden";
                    document.getElementsByClassName("swal2-title")[0].style.textOverflow="ellipsis";
                    document.getElementsByClassName("swal2-popup")[0].style.padding="0px";
                    document.getElementsByClassName("swal2-close")[0].style.outline="none";
                    document.getElementsByClassName("swal2-content")[0].style.padding="0px";

                    document.getElementsByClassName("swal2-title")[0].style.color="white";
                    document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";
                },
        showCloseButton:true,
        showConfirmButton:false,
        showCancelButton:false,
        html:outerContainer.outerHTML
    });
}
function getFiltri()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getFiltriGestionePercorsi.php",
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
function creaNuovoFiltro()
{
    var nome=document.getElementById("popupNuovoFiltroNome").value;
    var descrizione=document.getElementById("popupNuovoFiltroDescrizione").value;

    $.post("aggiungiFiltroGestionePercorsi.php",
    {
        nome,
        descrizione
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
                let timerInterval;
                Swal.fire
                ({
                    icon:"success",
                    title: "Filtro creato",
                    background:"#404040",
                    showCloseButton:true,
                    showConfirmButton:false,
                    timer: 2000,
                    timerProgressBar: true,
                    onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";},
                    onClose: () => {clearInterval(timerInterval)}
                }).then((result) =>
                {
                    getMascheraComposizioneFiltri(document.getElementById("btnComposizioneFiltri"));
                });
            }
        }
    });
}
function getRigheFiltro(id_filtro)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getRigheFiltroGestionePercorsi.php",
        {
            id_filtro
        },
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
async function getTabellaRigheFiltro()
{
    var id_filtro=document.getElementById("selectFiltroGestionePercorsi").value;

    var righe_filtro=await getRigheFiltro(id_filtro);

    var gestionePercorsiContainer=document.getElementById("gestionePercorsiContainer");
    gestionePercorsiContainer.innerHTML="";

    var tableRigheFiltri=document.createElement("table");
    tableRigheFiltri.setAttribute("id","tableRigheFiltri");

    var tr=document.createElement("tr");

    var th=document.createElement("th");th.setAttribute("style","border-top-left-radius:4px;");th.innerHTML="Tipo";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Configurazione";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Tipo pannello";tr.appendChild(th);
    var th=document.createElement("th");th.setAttribute("style","");th.innerHTML="Forato";tr.appendChild(th);
    var th=document.createElement("th");th.setAttribute("style","");th.innerHTML="Elettrificato";tr.appendChild(th);
    var th=document.createElement("th");th.setAttribute("style","");th.innerHTML="Rinforzato";tr.appendChild(th);
    var th=document.createElement("th");th.setAttribute("style","");th.innerHTML="Piegato";tr.appendChild(th);
    var th=document.createElement("th");th.setAttribute("style","width:120px;min-width:120px;");th.innerHTML="Range lunghezza 1";tr.appendChild(th);
    var th=document.createElement("th");th.setAttribute("style","width:120px;min-width:120px;");th.innerHTML="Range lunghezza 2";tr.appendChild(th);
    var th=document.createElement("th");th.setAttribute("style","width:120px;min-width:120px;");th.innerHTML="Range angolo";tr.appendChild(th);
    var th=document.createElement("th");
    th.setAttribute("style","text-align:center;width:55px;min-width:65px;max-width:55px;border-top-right-radius:4px;border-right:0px solid transparent");
    var button=document.createElement("button");
    button.setAttribute("title","Aggiungi filtro");
    button.setAttribute("onclick","aggiungiRigaFiltro()");
    button.innerHTML='<i class="far fa-plus"></i>';
    th.appendChild(button);
    tr.appendChild(th);

    tableRigheFiltri.appendChild(tr);

    righe_filtro.forEach(riga =>
    {
        var tr=document.createElement("tr");

        var td=document.createElement("td");
        td.setAttribute("style","border-bottom-left-radius:4px;");
        var textarea=document.createElement("textarea");
        textarea.setAttribute("class","input-riga-filtro"+riga.id_riga_filtro);
        textarea.setAttribute("colonna","tipo");
        textarea.value=riga.tipo;
        td.appendChild(textarea);
        tr.appendChild(td);

        var td=document.createElement("td");
        var textarea=document.createElement("textarea");
        textarea.setAttribute("class","input-riga-filtro"+riga.id_riga_filtro);
        textarea.setAttribute("colonna","configurazione");
        textarea.value=riga.configurazione;
        td.appendChild(textarea);
        tr.appendChild(td);

        var td=document.createElement("td");
        var textarea=document.createElement("textarea");
        textarea.setAttribute("class","input-riga-filtro"+riga.id_riga_filtro);
        textarea.setAttribute("colonna","tipo_pannello");
        textarea.value=riga.tipo_pannello;
        td.appendChild(textarea);
        tr.appendChild(td);

        var td=document.createElement("td");
        td.setAttribute("style","text-align:center");
        var div=document.createElement("div");
        div.setAttribute("class","checkbox-container");
        var checkbox=document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("class","input-riga-filtro"+riga.id_riga_filtro);
        checkbox.setAttribute("colonna","forato");
        if(riga.forato=="true" || riga.forato=="both")
            checkbox.setAttribute("checked","checked");
        div.appendChild(checkbox);
        var span=document.createElement("span");
        span.innerHTML="Si";
        div.appendChild(span);
        td.appendChild(div);
        var div=document.createElement("div");
        div.setAttribute("class","checkbox-container");
        var checkbox=document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("class","input-riga-filtro"+riga.id_riga_filtro);
        checkbox.setAttribute("colonna","forato");
        if(riga.forato=="false" || riga.forato=="both")
            checkbox.setAttribute("checked","checked");
        div.appendChild(checkbox);
        var span=document.createElement("span");
        span.innerHTML="No";
        div.appendChild(span);
        td.appendChild(div);
        tr.appendChild(td);

        /*var td=document.createElement("td");
        td.setAttribute("style","text-align:center");
        var checkbox=document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("class","input-riga-filtro"+riga.id_riga_filtro);
        checkbox.setAttribute("colonna","elettrificato");
        if(riga.elettrificato)
            checkbox.setAttribute("checked","checked");
        td.appendChild(checkbox);
        tr.appendChild(td);*/
        var td=document.createElement("td");
        td.setAttribute("style","text-align:center");
        var div=document.createElement("div");
        div.setAttribute("class","checkbox-container");
        var checkbox=document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("class","input-riga-filtro"+riga.id_riga_filtro);
        checkbox.setAttribute("colonna","elettrificato");
        if(riga.elettrificato=="true" || riga.elettrificato=="both")
            checkbox.setAttribute("checked","checked");
        div.appendChild(checkbox);
        var span=document.createElement("span");
        span.innerHTML="Si";
        div.appendChild(span);
        td.appendChild(div);
        var div=document.createElement("div");
        div.setAttribute("class","checkbox-container");
        var checkbox=document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("class","input-riga-filtro"+riga.id_riga_filtro);
        checkbox.setAttribute("colonna","elettrificato");
        if(riga.elettrificato=="false" || riga.elettrificato=="both")
            checkbox.setAttribute("checked","checked");
        div.appendChild(checkbox);
        var span=document.createElement("span");
        span.innerHTML="No";
        div.appendChild(span);
        td.appendChild(div);
        tr.appendChild(td);

        /*var td=document.createElement("td");
        td.setAttribute("style","text-align:center");
        var checkbox=document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("class","input-riga-filtro"+riga.id_riga_filtro);
        checkbox.setAttribute("colonna","rinforzato");
        if(riga.rinforzato)
            checkbox.setAttribute("checked","checked");
        td.appendChild(checkbox);
        tr.appendChild(td);*/
        var td=document.createElement("td");
        td.setAttribute("style","text-align:center");
        var div=document.createElement("div");
        div.setAttribute("class","checkbox-container");
        var checkbox=document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("class","input-riga-filtro"+riga.id_riga_filtro);
        checkbox.setAttribute("colonna","rinforzato");
        if(riga.rinforzato=="true" || riga.rinforzato=="both")
            checkbox.setAttribute("checked","checked");
        div.appendChild(checkbox);
        var span=document.createElement("span");
        span.innerHTML="Si";
        div.appendChild(span);
        td.appendChild(div);
        var div=document.createElement("div");
        div.setAttribute("class","checkbox-container");
        var checkbox=document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("class","input-riga-filtro"+riga.id_riga_filtro);
        checkbox.setAttribute("colonna","rinforzato");
        if(riga.rinforzato=="false" || riga.rinforzato=="both")
            checkbox.setAttribute("checked","checked");
        div.appendChild(checkbox);
        var span=document.createElement("span");
        span.innerHTML="No";
        div.appendChild(span);
        td.appendChild(div);
        tr.appendChild(td);

        /*var td=document.createElement("td");
        td.setAttribute("style","text-align:center");
        var checkbox=document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("class","input-riga-filtro"+riga.id_riga_filtro);
        checkbox.setAttribute("colonna","piegato");
        if(riga.piegato)
            checkbox.setAttribute("checked","checked");
        td.appendChild(checkbox);
        tr.appendChild(td);*/
        var td=document.createElement("td");
        td.setAttribute("style","text-align:center");
        var div=document.createElement("div");
        div.setAttribute("class","checkbox-container");
        var checkbox=document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("class","input-riga-filtro"+riga.id_riga_filtro);
        checkbox.setAttribute("colonna","piegato");
        if(riga.piegato=="true" || riga.piegato=="both")
            checkbox.setAttribute("checked","checked");
        div.appendChild(checkbox);
        var span=document.createElement("span");
        span.innerHTML="Si";
        div.appendChild(span);
        td.appendChild(div);
        var div=document.createElement("div");
        div.setAttribute("class","checkbox-container");
        var checkbox=document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("class","input-riga-filtro"+riga.id_riga_filtro);
        checkbox.setAttribute("colonna","piegato");
        if(riga.piegato=="false" || riga.piegato=="both")
            checkbox.setAttribute("checked","checked");
        div.appendChild(checkbox);
        var span=document.createElement("span");
        span.innerHTML="No";
        div.appendChild(span);
        td.appendChild(div);
        tr.appendChild(td);

        var td=document.createElement("td");
        var input=document.createElement("input");
        input.setAttribute("type","number");
        input.setAttribute("style","margin-right:1px");
        input.setAttribute("class","input-riga-filtro"+riga.id_riga_filtro);
        input.setAttribute("colonna","lunghezza1_min");
        input.setAttribute("value",riga.lunghezza1_min);
        td.appendChild(input);
        var input=document.createElement("input");
        input.setAttribute("type","number");
        input.setAttribute("style","margin-left:1px");
        input.setAttribute("class","input-riga-filtro"+riga.id_riga_filtro);
        input.setAttribute("colonna","lunghezza1_max");
        input.setAttribute("value",riga.lunghezza1_max);
        td.appendChild(input);
        tr.appendChild(td);

        var td=document.createElement("td");
        var input=document.createElement("input");
        input.setAttribute("type","number");
        input.setAttribute("style","margin-right:1px");
        input.setAttribute("class","input-riga-filtro"+riga.id_riga_filtro);
        input.setAttribute("colonna","lunghezza2_min");
        input.setAttribute("value",riga.lunghezza2_min);
        td.appendChild(input);
        var input=document.createElement("input");
        input.setAttribute("type","number");
        input.setAttribute("style","margin-left:1px");
        input.setAttribute("class","input-riga-filtro"+riga.id_riga_filtro);
        input.setAttribute("colonna","lunghezza2_max");
        input.setAttribute("value",riga.lunghezza2_max);
        td.appendChild(input);
        tr.appendChild(td);

        var td=document.createElement("td");
        var input=document.createElement("input");
        input.setAttribute("type","number");
        input.setAttribute("style","margin-right:1px");
        input.setAttribute("class","input-riga-filtro"+riga.id_riga_filtro);
        input.setAttribute("colonna","angolo_min");
        input.setAttribute("value",riga.angolo_min);
        td.appendChild(input);
        var input=document.createElement("input");
        input.setAttribute("type","number");
        input.setAttribute("style","margin-left:1px");
        input.setAttribute("class","input-riga-filtro"+riga.id_riga_filtro);
        input.setAttribute("colonna","angolo_max");
        input.setAttribute("value",riga.angolo_max);
        td.appendChild(input);
        tr.appendChild(td);

        var td=document.createElement("td");
        td.setAttribute("style","border-right:0px solid transparent;border-bottom-right-radius:4px;");
        var button=document.createElement("button");
        button.setAttribute("style","margin-right:10px");
        button.setAttribute("title","Elimina filtro");
        button.setAttribute("onclick","eliminaRigaFiltro("+riga.id_riga_filtro+")");
        button.innerHTML='<i class="fad fa-trash"></i>';
        td.appendChild(button);
        var button=document.createElement("button");
        button.setAttribute("title","Duplica filtro");
        button.setAttribute("style","margin-right:10px");
        button.setAttribute("onclick","copiaRigaFiltro("+riga.id_riga_filtro+")");
        button.innerHTML='<i class="fad fa-copy"></i>';
        td.appendChild(button);
        var button=document.createElement("button");
        button.setAttribute("title","Salva modifiche");
        button.setAttribute("onclick","salvaRigaFiltro("+riga.id_riga_filtro+",this)");
        button.innerHTML='<i class="fad fa-save"></i>';
        td.appendChild(button);
        tr.appendChild(td);

        tableRigheFiltri.appendChild(tr);
    });

    gestionePercorsiContainer.appendChild(tableRigheFiltri);
}
function aggiungiRigaFiltro()
{
    var id_filtro=document.getElementById("selectFiltroGestionePercorsi").value;
    $.post("aggiungiRigaFiltroGestionePercorsi.php",
    {
        id_filtro
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
                getTabellaRigheFiltro();
        }
    });
}
function eliminaRigaFiltro(id_riga_filtro)
{
    $.post("eliminaRigaFiltroGestionePercorsi.php",
    {
        id_riga_filtro
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
                getTabellaRigheFiltro()
        }
    });
}
function copiaRigaFiltro(id_riga_filtro)
{
    $.post("copiaRigaFiltroGestionePercorsi.php",
    {
        id_riga_filtro
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
                getTabellaRigheFiltro()
        }
    });
}
function salvaRigaFiltro(id_riga_filtro,button)
{
    var icon=button.getElementsByTagName("i")[0];
    icon.setAttribute("class","fad fa-spinner-third fa-spin");
    button.disabled=true;

    var error=false;
    var errorMessage="";

    var data=[];

    var elements=document.getElementsByClassName("input-riga-filtro"+id_riga_filtro);
    for (let index = 0; index < elements.length; index++)
    {
        const element = elements[index];
        
        var value="";
        switch (element.getAttribute("type"))
        {
            case null:value=element.value;break;
            case "checkbox":value=element.checked.toString();break;
            case "number":value=element.value;break;
        }

        var column=
        {
            name:element.getAttribute("colonna"),
            value,
            type:element.getAttribute("type")
        };
        data.push(column);
    }
    var checkboxes=["forato","elettrificato","rinforzato","piegato"];
    var checkboxesData=[];
    checkboxes.forEach(column =>
    {
        var values=[];
        data.forEach(col => 
        {
            if(col.name==column)
                values.push(col.value);
        });
        var value="";
        if(values[0]=="true" && values[1]=="true")
            value="both";
        if(values[0]=="true" && values[1]=="false")
            value="true";
        if(values[0]=="false" && values[1]=="true")
            value="false";
        if(values[0]=="false" && values[1]=="false")
        {
            error=true;
            errorMessage="Compila la colonna "+column;
        }
            
        var newCol=
        {
            name:column,
            value,
            type:"checkbox"
        }
        checkboxesData.push(newCol);
    });
    
    for (let index = 0; index < data.length; index++) 
    {
        const col = data[index];
        if(checkboxes.includes(col.name))
        {
            data.splice(index, 1);
        }
    }
    checkboxesData.forEach(column =>
    {
        data.forEach(col =>
        {
            if(col.name==column.name)
                col.value=column.value;
        });
    });

    console.log(data);

    if(error)
    {
        Swal.fire
        ({
            icon:"error",
            title: errorMessage,
            onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}
        });
        icon.setAttribute("class","fad fa-save");
        button.disabled=false;
    }
    else
    {
        var JSONdata=JSON.stringify(data);
        $.post("salvaRigaFiltroGestionePercorsi.php",
        {
            id_riga_filtro,
            JSONdata
        },
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                    icon.setAttribute("class","fad fa-save");
                    button.disabled=false;
                    getTabellaRigheFiltro();
                }
                else
                {
                    icon.setAttribute("class","fas fa-check");

                    setTimeout(() => 
                    {
                        icon.setAttribute("class","fad fa-save");
                        button.disabled=false;
                    }, 3000);
                }
            }
        });
    }

    
}