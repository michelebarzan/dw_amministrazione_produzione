var hot;

function getMascheraSpessoriMadre(button)
{
    $(".in-page-nav-bar-button").css({"border-bottom-color":"","font-weight":""});
    button.style.borderBottomColor="#4C91CB";
    button.style.fontWeight="bold";

    document.getElementById("actionBarGestioneAnagrafiche").style.display="flex";
    
    var actionBar=document.getElementById("actionBarGestioneAnagrafiche");
    actionBar.innerHTML="";

    var btn=document.createElement("button");
    btn.setAttribute("class","rcb-button-text-icon");
    btn.setAttribute("onclick","esportaHot()");
    var span=document.createElement("span");
    span.innerHTML="Esporta";
    btn.appendChild(span);
    var i=document.createElement("i");
    i.setAttribute("class","fad fa-file-excel");
    i.setAttribute("style","margin-left: 5px;");
    btn.appendChild(i);
    actionBar.appendChild(btn);

    getHot("nomi_pannelli_madre");
}
function getMascheraParametriLineaCarpenteria(button)
{
    $(".in-page-nav-bar-button").css({"border-bottom-color":"","font-weight":""});
    button.style.borderBottomColor="#4C91CB";
    button.style.fontWeight="bold";

    document.getElementById("actionBarGestioneAnagrafiche").style.display="flex";
    
    var actionBar=document.getElementById("actionBarGestioneAnagrafiche");
    actionBar.innerHTML="";

    var btn=document.createElement("button");
    btn.setAttribute("class","rcb-button-text-icon");
    btn.setAttribute("onclick","esportaHot()");
    var span=document.createElement("span");
    span.innerHTML="Esporta";
    btn.appendChild(span);
    var i=document.createElement("i");
    i.setAttribute("class","fad fa-file-excel");
    i.setAttribute("style","margin-left: 5px;");
    btn.appendChild(i);
    actionBar.appendChild(btn);

    getHot("parametri_linea_carpenteria");
}
function getMascheraParametriApplicazione(button)
{
    $(".in-page-nav-bar-button").css({"border-bottom-color":"","font-weight":""});
    button.style.borderBottomColor="#4C91CB";
    button.style.fontWeight="bold";

    document.getElementById("actionBarGestioneAnagrafiche").style.display="flex";
    
    var actionBar=document.getElementById("actionBarGestioneAnagrafiche");
    actionBar.innerHTML="";

    var btn=document.createElement("button");
    btn.setAttribute("class","rcb-button-text-icon");
    btn.setAttribute("onclick","esportaHot()");
    var span=document.createElement("span");
    span.innerHTML="Esporta";
    btn.appendChild(span);
    var i=document.createElement("i");
    i.setAttribute("class","fad fa-file-excel");
    i.setAttribute("style","margin-left: 5px;");
    btn.appendChild(i);
    actionBar.appendChild(btn);

    getHot("parametri");
}
function getMascheraSpessoriMadre(button)
{
    $(".in-page-nav-bar-button").css({"border-bottom-color":"","font-weight":""});
    button.style.borderBottomColor="#4C91CB";
    button.style.fontWeight="bold";

    document.getElementById("actionBarGestioneAnagrafiche").style.display="flex";
    
    var actionBar=document.getElementById("actionBarGestioneAnagrafiche");
    actionBar.innerHTML="";

    var btn=document.createElement("button");
    btn.setAttribute("class","rcb-button-text-icon");
    btn.setAttribute("onclick","esportaHot()");
    var span=document.createElement("span");
    span.innerHTML="Esporta";
    btn.appendChild(span);
    var i=document.createElement("i");
    i.setAttribute("class","fad fa-file-excel");
    i.setAttribute("style","margin-left: 5px;");
    btn.appendChild(i);
    actionBar.appendChild(btn);

    getHotSpessoriMadre();
}
async function getHot(table)
{
    var container = document.getElementById('gestioneAnagraficheContainer');
    container.innerHTML="";

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

    var response=await getHotData(table);

    Swal.close();

    var height=container.offsetHeight;

    if(response.data.length>0)
    {
		if(hot!=undefined)
			hot.destroy();
        hot = new Handsontable
        (
            container,
            {
                data: response.data,
                rowHeaders: true,
                manualColumnResize: true,
                colHeaders: response.colHeaders,
                className: "htMiddle",
                filters: true,
                dropdownMenu: true,
                headerTooltips: true,
                language: 'it-IT',
                contextMenu: true,
                width:"100%",
                columnSorting: true,
                height,
                columns:response.columns,
                afterChange: (changes) =>
                {
                    if(changes!=null)
                    {
                        changes.forEach(([row, prop, oldValue, newValue]) =>
                        {
                            if(prop!=response.primaryKey)
                            {
                                var id=hot.getDataAtCell(row, 0);
                                aggiornaRigaHot(id,prop,newValue,table,response.primaryKey);
                            }
                        });
                    }
                },
                afterCreateRow: (index,amount,source) =>
                {
                    creaRigaHot(index,table,response.primaryKey);
                },
                beforeRemoveRow: (index,amount,physicalRows,source)  =>
                {
                    for (let i = 0; i < physicalRows.length; i++)
                    {
                        const indice = physicalRows[i];
                        var id=hot.getDataAtCell(indice, 0);
                        eliminaRigaHot(id,table,response.primaryKey);
                    }
                }
            }
        );
        document.getElementById("hot-display-license-info").remove();
        $(".handsontable .changeType").css
        ({
            "background": "#eee",
            "border-radius": "0",
            "border": "none",
            "color": "#404040",
            "font-size": "14px",
            "line-height": "normal",
            "padding": "0px",
            "margin": "0px",
            "float": "right"
        });
    }
}
function aggiornaRigaHot(id,colonna,valore,table,primaryKey)
{
    $.get("aggiornaRigaHot.php",{id,colonna,valore,table,primaryKey},
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
function creaRigaHot(index,table,primaryKey)
{
    $.get("creaRigaHot.php",{table,primaryKey},
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
                hot.setDataAtCell(index, 0, response);
        }
    });
}
function eliminaRigaHot(id,table,primaryKey)
{
    $.get("eliminaRigaHot.php",{id,table,primaryKey},
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
function getHotData(table)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getHotData.php",{table},
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
async function getHotSpessoriMadre()
{
    var container = document.getElementById('gestioneAnagraficheContainer');
    container.innerHTML="";

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

    var spessoriMadre=await getSpessoriMadre();

    Swal.close();

    var height=container.offsetHeight;

    if(spessoriMadre.data.length>0)
    {
		if(hot!=undefined)
			hot.destroy();
        hot = new Handsontable
        (
            container,
            {
                data: spessoriMadre.data,
                rowHeaders: true,
                manualColumnResize: true,
                colHeaders: spessoriMadre.colHeaders,
                className: "htMiddle",
                filters: true,
                dropdownMenu: true,
                headerTooltips: true,
                language: 'it-IT',
                contextMenu: true,
                width:"100%",
                height,
                columns:spessoriMadre.columns,
                afterChange: (changes) =>
                {
                    if(changes!=null)
                    {
                        changes.forEach(([row, prop, oldValue, newValue]) =>
                        {
                            if(prop!="id_spessore_madre")
                            {
                                var id_spessore_madre=hot.getDataAtCell(row, 0);
                                aggiornaRigaSpessoriMadre(id_spessore_madre,prop,newValue);
                            }
                        });
                    }
                },
                afterCreateRow: (index,amount,source) =>
                {
                    creaRigaSpessoriMadre(index);
                },
                beforeRemoveRow: (index,amount,physicalRows,source)  =>
                {
                    for (let i = 0; i < physicalRows.length; i++)
                    {
                        const indice = physicalRows[i];
                        var id_spessore_madre=hot.getDataAtCell(indice, 0);
                        eliminaRigaSpessoriMadre(id_spessore_madre);
                    }
                }
            }
        );
        document.getElementById("hot-display-license-info").remove();
        $(".handsontable .changeType").css
        ({
            "background": "#eee",
            "border-radius": "0",
            "border": "none",
            "color": "#404040",
            "font-size": "14px",
            "line-height": "normal",
            "padding": "0px",
            "margin": "0px",
            "float": "right"
        });
    }
}
function aggiornaRigaSpessoriMadre(id_spessore_madre,colonna,valore)
{
    $.get("aggiornaRigaSpessoriMadre.php",{id_spessore_madre,colonna,valore},
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
function creaRigaSpessoriMadre(index)
{
    $.get("creaRigaSpessoriMadre.php",
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
                hot.setDataAtCell(index, 0, response);
        }
    });
}
function eliminaRigaSpessoriMadre(id_spessore_madre)
{
    $.get("eliminaRigaSpessoriMadre.php",{id_spessore_madre},
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
function getSpessoriMadre()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getSpessoriMadre.php",{},
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