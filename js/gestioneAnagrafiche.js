function getMascheraNomiPannelliMadre(button)
{
    $(".in-page-nav-bar-button").css({"border-bottom-color":"","font-weight":""});
    button.style.borderBottomColor="#4C91CB";
    button.style.fontWeight="bold";

    document.getElementById("actionBarGestioneAnagrafiche").style.display="flex";
    
    var actionBar=document.getElementById("actionBarGestioneAnagrafiche");

    var actionBarItem=document.createElement("div");
    actionBarItem.setAttribute("class","rcb-text-container");

    var span=document.createElement("span");
    span.setAttribute("style","margin-right:5px");
    span.innerHTML="Righe:";
    actionBarItem.appendChild(span);

    var i=document.createElement("i");
    i.setAttribute("class","fa");
    actionBarItem.appendChild(i);
    
    actionBar.appendChild(actionBarItem);

    getTabellaNomiPannelliMadre();
}
async function getTabellaNomiPannelliMadre()
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

    var nomiPannelliMadre=await getNomiPannelliMadre();

    Swal.close();

    if(nomiPannelliMadre.data.length>0)
    {
        hot = new Handsontable
        (
            container,
            {
                data: nomiPannelliMadre.data,
                rowHeaders: true,
                manualColumnResize: true,
                colHeaders: nomiPannelliMadre.colHeaders,
                className: "htMiddle",
                filters: true,
                dropdownMenu: true,
                headerTooltips: true,
                language: 'it-IT',
                contextMenu: true,
                height:"100%",
                columns:nomiPannelliMadre.columns,
                afterChange: (changes) =>
                {
                    if(changes!=null)
                    {
                        changes.forEach(([row, prop, oldValue, newValue]) =>
                        {
                            if(prop!="id_nome_pannello_madre")
                            {
                                var id_nome_pannello_madre=hot.getDataAtCell(row, 0);
                                aggiornaRigaNomiPannelliMadre(id_nome_pannello_madre,prop,newValue);
                            }
                        });
                    }
                },
                afterCreateRow: (index,amount,source) =>
                {
                    creaRigaNomiPannelliMadre(index);
                },
                beforeRemoveRow: (index,amount,physicalRows,source)  =>
                {
                    for (let i = 0; i < physicalRows.length; i++)
                    {
                        const indice = physicalRows[i];
                        var id_nome_pannello_madre=hot.getDataAtCell(indice, 0);
                        eliminaRigaNomiPannelliMadre(id_nome_pannello_madre);
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
function aggiornaRigaNomiPannelliMadre(id_nome_pannello_madre,colonna,valore)
{
    $.get("aggiornaRigaNomiPannelliMadre.php",{id_nome_pannello_madre,colonna,valore},
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
function creaRigaNomiPannelliMadre(index)
{
    $.get("creaRigaNomiPannelliMadre.php",
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
function eliminaRigaNomiPannelliMadre(id_nome_pannello_madre)
{
    $.get("eliminaRigaNomiPannelliMadre.php",{id_nome_pannello_madre},
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
function getNomiPannelliMadre()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getNomiPannelliMadre.php",{},
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