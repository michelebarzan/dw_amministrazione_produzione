var data;
var lotti;

/*function getComposizioneLotti(button)
{
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

    getTable("view_lotti_pannelli");
}
function getTable(table,orderBy,orderType)
{
    if(table=="view_lotti_pannelli")
    {
        getEditableTable
        ({
            table:'view_lotti_pannelli',
            editable: false,
            primaryKey:"codice_pannello",
            container:'gestioneLottiContainer',
            noFilterColumns:['data'],
            orderBy:orderBy,
            orderType:orderType
        });
    }
}
function editableTableLoad()
{

}*/
window.addEventListener("load", async function(event)
{
    //getIntervalCheckFileLineaCarpenteria();
});
async function getIntervalCheckFileLineaCarpenteria()
{
    var intervalCheckFileLineaCarpenteria=await getParametro("intervalCheckFileLineaCarpenteria");
    setInterval(() => 
    {
        checkFileLineaCarpenteria();
    }, intervalCheckFileLineaCarpenteria);
}
function checkFileLineaCarpenteria()
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
    $.post("checkFileLineaCarpenteria.php",
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
                try 
                {
                    console.log(JSON.parse(response));
                    Swal.fire
                    ({
                        icon:"success",
                        title: "File di risposta linea carpenteria registrato",
                        background:"#404040",
                        showCloseButton:true,
                        showConfirmButton:false,
                        allowOutsideClick:true,
                        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";},
                    });
                } 
                catch (error)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                }
            }
        }
    });
}
function getParametro(nome)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getParametro.php",{nome},
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
                    resolve(response);
            }
        });
    });
}
async function getMascheraMessaInProduzione(button)
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

    document.getElementById("actionBarGestioneLotti").style.display="flex";
    document.getElementById("actionBarGestioneLotti").innerHTML="";
    
    document.getElementById("gestioneLottiContainer").style.display="flex";
    document.getElementById("gestioneLottiContainer").innerHTML="";

    var actionBar=document.getElementById("actionBarGestioneLotti");

    var actionBarItem=document.createElement("div");
    actionBarItem.setAttribute("class","rcb-select-container");
    
    var span=document.createElement("span");
    span.innerHTML="Lotto";
    actionBarItem.appendChild(span);

    var selectLotto=document.createElement("select");
    selectLotto.setAttribute("onchange","getPannelliLotto()");
    selectLotto.setAttribute("id","selectLottoGestioneLotti");

    lotti=await getLotti();

    var dirty_commesse=[];
    lotti.forEach(function (lotto)
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
        lotti.forEach(function (lotto)
        {
            if(lotto.commessa==commessa)
            {
                var option=document.createElement("option");
                option.setAttribute("value",lotto.id_lotto);
                option.innerHTML=lotto.lotto;
                optgroup.appendChild(option);
            }
        });
        selectLotto.appendChild(optgroup);
    });
    
    actionBarItem.appendChild(selectLotto);
    actionBar.appendChild(actionBarItem);

    var buttonMettiInProduzione=document.createElement("button");
    buttonMettiInProduzione.setAttribute("class","rcb-button-text-icon");
    buttonMettiInProduzione.setAttribute("id","buttonMettiInProduzione");
    buttonMettiInProduzione.setAttribute("disabled","disabled");
    buttonMettiInProduzione.setAttribute("onclick","getPopupMettiInProduzione()");
    buttonMettiInProduzione.innerHTML='<span>Metti in produzione</span><i style="margin-left:5px" class="fas fa-check-circle"></i>';
    
    actionBar.appendChild(buttonMettiInProduzione);

    var buttonControllaRispostaLineaCarpenteria=document.createElement("button");
    buttonControllaRispostaLineaCarpenteria.setAttribute("class","rcb-button-text-icon");
    buttonControllaRispostaLineaCarpenteria.setAttribute("id","buttonControllaRispostaLineaCarpenteria");
    buttonControllaRispostaLineaCarpenteria.setAttribute("onclick","checkFileLineaCarpenteria()");
    buttonControllaRispostaLineaCarpenteria.innerHTML='<span>Controlla risposta linea carpenteria</span><i style="margin-left:5px" class="fad fa-search"></i>';
    
    actionBar.appendChild(buttonControllaRispostaLineaCarpenteria);

    $("#selectLottoGestioneLotti").multipleSelect(
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
    Swal.close();
}
function getLotti()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getLottiGestioneLotti.php",
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
async function getPannelliLotto()
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

    var producibile=true;

    var gestioneLottiContainer=document.getElementById("gestioneLottiContainer");
    gestioneLottiContainer.innerHTML="";

    var id_lotto=$('#selectLottoGestioneLotti').multipleSelect('getSelects')[0];

    data=await getViewMessaInProduzioneLotti(id_lotto);
    console.log(data);

    var containerTotaliPercorsi=document.createElement("div");
    containerTotaliPercorsi.setAttribute("class","container-totali-percorsi");

    var totaliPercorsiTitle=document.createElement("div");
    totaliPercorsiTitle.setAttribute("class","totali-percorsi-title-container");

    var span=document.createElement("span");
    span.setAttribute("class","totali-percorsi-title");
    span.setAttribute("style","margin-left: 15px;");
    span.innerHTML="Percorsi trovati";
    totaliPercorsiTitle.appendChild(span);

    var pannelli=[];
    data.forEach(row =>
    {
        pannelli.push(row.numero_pannello);
    });
    var n_pannelli=pannelli.length;
    var n_pannelli_lotto=await getNPannelliLotto(id_lotto);
    if(n_pannelli_lotto<n_pannelli)
    {
        var div=document.createElement("div");
        div.setAttribute("style","display:flex;flex-direction:row;align-items:center;justify-content:flex-start;box-sizing: border-box;margin-left: auto;margin-right: 15px;");

        var icon=document.createElement("i");
        icon.setAttribute("class","fas fa-exclamation-triangle");
        icon.setAttribute("style","color:#DA6969;margin-right:5px;font-size:14px");
        div.appendChild(icon);

        var span=document.createElement("span");
        span.setAttribute("style","color:#ddd;font-family: 'Montserrat',sans-serif;font-size:12px;text-align: left;");
        span.innerHTML='<b style="font-weight:bold;color:#DA6969;">Errore nei filtri.</b> Pannelli assengati: '+n_pannelli+'. Pannelli lotto: '+n_pannelli_lotto;
        div.appendChild(span);
        
        totaliPercorsiTitle.appendChild(div);

        producibile=false;
    }
    if(n_pannelli_lotto>n_pannelli)
    {
        var div=document.createElement("div");
        div.setAttribute("style","display:flex;flex-direction:row;align-items:center;justify-content:flex-start;box-sizing: border-box;margin-left: auto;margin-right: 15px;");

        var icon=document.createElement("i");
        icon.setAttribute("class","fas fa-exclamation-triangle");
        icon.setAttribute("style","color:#DA6969;margin-right:5px;font-size:14px");
        div.appendChild(icon);

        var span=document.createElement("span");
        span.setAttribute("style","color:#ddd;font-family: 'Montserrat',sans-serif;font-size:12px;text-align: left;");
        span.innerHTML='<b style="font-weight:bold;color:#DA6969;">Errore generale.</b> Pannelli assengati: '+n_pannelli+'. Pannelli lotto: '+n_pannelli_lotto;
        div.appendChild(span);
        
        totaliPercorsiTitle.appendChild(div);

        producibile=false;
    }
    if(n_pannelli_lotto==n_pannelli)
    {
        var span=document.createElement("span");
        span.setAttribute("class","totali-percorsi-title");
        span.setAttribute("style","margin-left: auto;margin-right:15px");
        span.innerHTML=n_pannelli_lotto+" pannelli";
        totaliPercorsiTitle.appendChild(span);
    }

    containerTotaliPercorsi.appendChild(totaliPercorsiTitle);

    var totaliPercorsiInnerContainer=document.createElement("div");
    totaliPercorsiInnerContainer.setAttribute("class","inner-container-totali-percorsi");

    var infoPercorsiDuplicates=[];
    data.forEach(row =>
    {
        var infoPercorso=
        {
            id_percorso:row.id_percorso,
            nome_percorso:row.nome_percorso,
            descrizione_percorso:row.descrizione_percorso,
            attivo:row.attivo,
            priorita:row.priorita,
            id_filtro:row.id_filtro,
            nome_filtro:row.nome_filtro,
            descrizione_filtro:row.descrizione_filtro
        };
        infoPercorsiDuplicates.push(infoPercorso);
    });

    var infoPercorsi=[];
    
    infoPercorsiDuplicates.forEach(infoPercorsoDuplicates =>
    {
        var push=true;
        infoPercorsi.forEach(infoPercorso =>
        {
            if(infoPercorso.id_filtro==infoPercorsoDuplicates.id_filtro)
                push=false;
        });
        if(push)
            infoPercorsi.push(infoPercorsoDuplicates);
    });

    infoPercorsi.forEach(infoPercorso =>
    {
        var n_pannelli=0;
        infoPercorsiDuplicates.forEach(infoPercorsoDuplicates =>
        {
            if(JSON.stringify(infoPercorso) === JSON.stringify(infoPercorsoDuplicates))
            {
                n_pannelli++;
            }
        });
        infoPercorso.n_pannelli=n_pannelli;
    });

    infoPercorsi.forEach(infoPercorso =>
    {
        var totaliPercorsiItem=document.createElement("div");
        totaliPercorsiItem.setAttribute("class","totali-percorsi-item");

        var infoFiltroContainer=document.createElement("div");
        infoFiltroContainer.setAttribute("class","totali-percorsi-item-inner-container");
        infoFiltroContainer.setAttribute("style","border-top-left-radius:4px;width:35%");

        var title=document.createElement("div");
        title.setAttribute("class","totali-percorsi-item-inner-container-title");
        title.setAttribute("style","border-top-left-radius:4px");
        var icon=document.createElement("i");
        icon.setAttribute("class","fas fa-filter totali-percorsi-item-inner-container-title-i");
        title.appendChild(icon);
        var span=document.createElement("span");
        span.setAttribute("class","totali-percorsi-item-inner-container-title-span");
        span.innerHTML="Filtro applicato";
        title.appendChild(span);

        if(infoPercorso.id_filtro==null)
        {
            var button=document.createElement("button");
            button.setAttribute("onclick","window.location.href='gestionePercorsi.php?btnToClick=btnAnagraficaFiltri';");
            var span=document.createElement("span");
            span.innerHTML="Crea filtro";
            button.appendChild(span);
            var icon=document.createElement("i");
            icon.setAttribute("class","fad fa-plus-circle");
            button.appendChild(icon);
            title.appendChild(button);
        }

        infoFiltroContainer.appendChild(title);

        if(infoPercorso.id_filtro!=null)
        {
            var span=document.createElement("span");
            span.setAttribute("class","totali-percorsi-item-inner-container-span");
            span.setAttribute("style","font-weight:bold");
            span.setAttribute("title",infoPercorso.nome_filtro);
            span.innerHTML=infoPercorso.nome_filtro;
            infoFiltroContainer.appendChild(span);
        }
        else
        {
            var div=document.createElement("div");
            div.setAttribute("style","display:flex;flex-direction:row;align-items:center;justify-content:flex-start;box-sizing: border-box;padding-left:10px;padding-bottom:10px;padding-right:10px;width: 100%;");

            var icon=document.createElement("i");
            icon.setAttribute("class","fas fa-exclamation-triangle");
            icon.setAttribute("style","color:#DA6969;margin-right:5px;font-size:14px");
            div.appendChild(icon);

            var span=document.createElement("span");
            span.setAttribute("style","font-weight:bold;color:#DA6969;font-family: 'Montserrat',sans-serif;font-size:12px;text-align: left;");
            span.innerHTML='Nessun filtro applicabile';
            div.appendChild(span);
            
            infoFiltroContainer.appendChild(div);

            producibile=false;
        }

        if(infoPercorso.descrizione_filtro!="" && infoPercorso.descrizione_filtro!=null)
        {
            var span=document.createElement("span");
            span.setAttribute("class","totali-percorsi-item-inner-container-span");
            span.setAttribute("title",infoPercorso.descrizione_filtro);
            span.innerHTML=infoPercorso.descrizione_filtro;
            infoFiltroContainer.appendChild(span);
        }

        totaliPercorsiItem.appendChild(infoFiltroContainer);

        var infoNPannelliContainer=document.createElement("div");
        infoNPannelliContainer.setAttribute("class","totali-percorsi-item-inner-container");
        infoNPannelliContainer.setAttribute("style","border-top-right-radius:4px;width:20%;border-left:1px solid #ddd;border-right:1px solid #ddd;");

        var title=document.createElement("div");
        title.setAttribute("class","totali-percorsi-item-inner-container-title");

        var icon=document.createElement("i");
        icon.setAttribute("class","fad fa-sigma totali-percorsi-item-inner-container-title-i");
        title.appendChild(icon);
        var span=document.createElement("span");
        span.setAttribute("class","totali-percorsi-item-inner-container-title-span");
        span.innerHTML="Pannelli";
        title.appendChild(span);

        var button=document.createElement("button");
        button.setAttribute("onclick","getDettagliPannelli("+infoPercorso.id_filtro+")");
        var span=document.createElement("span");
        span.innerHTML="Dettagli";
        button.appendChild(span);
        var icon=document.createElement("i");
        icon.setAttribute("class","fad fa-info-circle");
        button.appendChild(icon);
        title.appendChild(button);

        infoNPannelliContainer.appendChild(title);

        var span=document.createElement("span");
        span.setAttribute("class","totali-percorsi-item-inner-container-span");
        span.setAttribute("style","font-weight:bold");
        span.innerHTML=infoPercorso.n_pannelli;
        infoNPannelliContainer.appendChild(span);

        totaliPercorsiItem.appendChild(infoNPannelliContainer);

        var infoPercorsoContainer=document.createElement("div");
        infoPercorsoContainer.setAttribute("class","totali-percorsi-item-inner-container");
        infoPercorsoContainer.setAttribute("style","border-top-right-radius:4px;width:45%");

        var title=document.createElement("div");
        title.setAttribute("class","totali-percorsi-item-inner-container-title");
        title.setAttribute("style","border-top-right-radius:4px");
        var icon=document.createElement("i");
        icon.setAttribute("class","fad fa-network-wired totali-percorsi-item-inner-container-title-i");
        title.appendChild(icon);
        var span=document.createElement("span");
        span.setAttribute("class","totali-percorsi-item-inner-container-title-span");
        span.innerHTML="Percorso scelto";
        title.appendChild(span);

        if(infoPercorso.id_percorso!=null)
        {
            var input=document.createElement("input");
            input.setAttribute("id","idPercorsoFiltro"+infoPercorso.id_filtro);
            input.setAttribute("type","hidden");
            input.setAttribute("value",infoPercorso.id_percorso);
            title.appendChild(input);

            var button=document.createElement("button");
            button.setAttribute("onclick","getPopupCambiaPercorso("+infoPercorso.id_filtro+")");
            var span=document.createElement("span");
            span.innerHTML="Cambia";
            button.appendChild(span);
            var icon=document.createElement("i");
            icon.setAttribute("class","fad fa-repeat-alt");
            button.appendChild(icon);
            title.appendChild(button);
        }
        
        infoPercorsoContainer.appendChild(title);

        if(infoPercorso.id_percorso!=null)
        {
            var span=document.createElement("span");
            span.setAttribute("class","totali-percorsi-item-inner-container-span");
            span.setAttribute("id","nomePercorsoFiltro"+infoPercorso.id_filtro);
            span.setAttribute("style","font-weight:bold");
            span.setAttribute("title",infoPercorso.nome_percorso);
            span.innerHTML=infoPercorso.nome_percorso;
            infoPercorsoContainer.appendChild(span);
        }
        
        else
        {
            var div=document.createElement("div");
            div.setAttribute("style","display:flex;flex-direction:row;align-items:center;justify-content:flex-start;box-sizing: border-box;padding-left:10px;padding-bottom:10px;padding-right:10px;width: 100%;");

            var icon=document.createElement("i");
            icon.setAttribute("class","fas fa-exclamation-triangle");
            icon.setAttribute("style","color:#DA6969;margin-right:5px;font-size:14px");
            div.appendChild(icon);

            var span=document.createElement("span");
            span.setAttribute("style","font-weight:bold;color:#DA6969;font-family: 'Montserrat',sans-serif;font-size:12px;text-align: left;");
            span.innerHTML='Nessun percorso trovato';
            div.appendChild(span);
            
            infoPercorsoContainer.appendChild(div);

            producibile=false;
        }

        if(infoPercorso.descrizione_percorso!="" && infoPercorso.descrizione_percorso!=null)
        {
            var span=document.createElement("span");
            span.setAttribute("class","totali-percorsi-item-inner-container-span");
            span.setAttribute("id","descrizionePercorsoFiltro"+infoPercorso.id_filtro);
            span.setAttribute("title",infoPercorso.descrizione_percorso);
            span.innerHTML=infoPercorso.descrizione_percorso;
            infoPercorsoContainer.appendChild(span);
        }

        totaliPercorsiItem.appendChild(infoPercorsoContainer);

        totaliPercorsiInnerContainer.appendChild(totaliPercorsiItem);
    });

    containerTotaliPercorsi.appendChild(totaliPercorsiInnerContainer);

    gestioneLottiContainer.append(containerTotaliPercorsi);

    setTimeout(() =>
    {
        document.getElementById("buttonMettiInProduzione").disabled=!producibile;
        if(producibile)
        {
            document.getElementById("buttonMettiInProduzione").style.backgroundColor="#70B085";

            setTimeout(() => {
                document.getElementById("buttonMettiInProduzione").style.backgroundColor="";
            }, 500);
        }
    }, 1000);
    
    //-----------------------------------------------------------------------------------

    var containerDettaglioPannelli=document.createElement("div");
    containerDettaglioPannelli.setAttribute("class","container-dettaglio-pannelli");
    containerDettaglioPannelli.setAttribute("id","containerDettaglioPannelli");

    var dettaglioPannelliTitle=document.createElement("div");
    dettaglioPannelliTitle.setAttribute("class","dettaglio-pannelli-title-container");

    var span=document.createElement("span");
    span.setAttribute("class","dettaglio-pannelli-title");
    span.innerHTML="Dettagli pannelli";
    dettaglioPannelliTitle.appendChild(span);

    containerDettaglioPannelli.appendChild(dettaglioPannelliTitle);

    var innerContainerDettaglioPannelli=document.createElement("div");
    innerContainerDettaglioPannelli.setAttribute("class","inner-container-dettaglio-pannelli");
    innerContainerDettaglioPannelli.setAttribute("id","innerContainerDettaglioPannelli");
    containerDettaglioPannelli.appendChild(innerContainerDettaglioPannelli);

    var label=document.createElement("div");
    label.setAttribute("id","dettaglioPannelliLabel");
    label.innerHTML="<i class='fal fa-info-circle'></i><span>Clicca un pulsante dettagli</span><i class='fal fa-mouse-pointer'></i>";
    innerContainerDettaglioPannelli.appendChild(label);

    gestioneLottiContainer.append(containerDettaglioPannelli);

    Swal.close();
}
async function getDettagliPannelli(id_filtro)
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
    
    var pannelli=[];
    data.forEach(row =>
    {
        if(row.id_filtro==id_filtro)
            pannelli.push(row.numero_pannello);
    });

    var infoPannelli=await getInfoPannelli(pannelli);

    var innerContainerDettaglioPannelli=document.getElementById("innerContainerDettaglioPannelli");
    innerContainerDettaglioPannelli.innerHTML="";
    
    var tableDettagliPannelli=document.createElement("table");
    tableDettagliPannelli.setAttribute("id","tableDettagliPannelli");

    var tr=document.createElement("tr");

    var th=document.createElement("th");th.innerHTML="Codice";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Tipo";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Configurazione";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Tipo pannello";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Forato";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Elettrificato";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Rinforzato";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Piegato";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Lunghezza 1";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Lunghezza 2";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Angolo";tr.appendChild(th);

    tableDettagliPannelli.appendChild(tr);

    infoPannelli.forEach(pannello =>
    {
        var tr=document.createElement("tr");

        var td=document.createElement("td");td.innerHTML=pannello.codice_pannello;tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=pannello.tipo;tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=pannello.configurazione;tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=pannello.pannello;tr.appendChild(td);
        var td=document.createElement("td");var icon=document.createElement("i");if(pannello.forato){icon.setAttribute("class","fas fa-check-square");icon.setAttribute("style","color:rgb(48, 133, 214)");}else{icon.setAttribute("class","far fa-square");}td.appendChild(icon);tr.appendChild(td);
        var td=document.createElement("td");var icon=document.createElement("i");if(pannello.elettrificato){icon.setAttribute("class","fas fa-check-square");icon.setAttribute("style","color:rgb(48, 133, 214)");}else{icon.setAttribute("class","far fa-square");}td.appendChild(icon);tr.appendChild(td);
        var td=document.createElement("td");var icon=document.createElement("i");if(pannello.rinforzato){icon.setAttribute("class","fas fa-check-square");icon.setAttribute("style","color:rgb(48, 133, 214)");}else{icon.setAttribute("class","far fa-square");}td.appendChild(icon);tr.appendChild(td);
        var td=document.createElement("td");var icon=document.createElement("i");if(pannello.piegato){icon.setAttribute("class","fas fa-check-square");icon.setAttribute("style","color:rgb(48, 133, 214)");}else{icon.setAttribute("class","far fa-square");}td.appendChild(icon);tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=pannello.lunghezza_1;tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=pannello.lunghezza_2;tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","border-right:0px solid transparent;");td.innerHTML=pannello.angolo;tr.appendChild(td);

        tableDettagliPannelli.appendChild(tr);
    });

    innerContainerDettaglioPannelli.appendChild(tableDettagliPannelli);

    Swal.close();
}
function getInfoPannelli(pannelli)
{
    return new Promise(function (resolve, reject) 
    {
        var JSONpannelli=JSON.stringify(pannelli);
        $.post("getInfoPannelliGestioneLotti.php",
        {
            JSONpannelli
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
function getViewMessaInProduzioneLotti(id_lotto)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getViewMessaInProduzioneLottiGestioneLotti.php",
        {
            id_lotto
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
function getNPannelliLotto(id_lotto)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getNPannelliLottoGestioneLotti.php",
        {
            id_lotto
        },
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                    resolve(0);
                }
                else
                    resolve(response);
            }
        });
    });
}
async function getPopupCambiaPercorso(id_filtro)
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

    var percorsiAlternativi=await getPercorsiAlternativi(id_filtro);
    /*console.log(percorsiAlternativi);*/

    var outerContainer=document.createElement("div");
    outerContainer.setAttribute("class","popup-cambia-percorso-outer-container");

    var i=0;
    percorsiAlternativi.forEach(percorso => 
    {
        var percorsoItem=document.createElement("button");
        percorsoItem.setAttribute("class","popup-cambia-percorso-item");
        /*if(i==percorsiAlternativi.length)
            percorsoItem.setAttribute("style","margin-bottom:0px");*/
        percorsoItem.setAttribute("onclick","cambiaPercorso("+percorso.filtro+","+percorso.id_percorso+",'"+percorso.nome+"','"+percorso.descrizione+"')");

        var div=document.createElement("div");

        var span=document.createElement("span");
        span.setAttribute("style","font-weight:bold");
        span.innerHTML=percorso.nome;
        div.appendChild(span);

        var span=document.createElement("span");
        span.setAttribute("style","margin-left:auto;font-weight:bold");
        span.innerHTML="#"+percorso.priorita;
        div.appendChild(span);

        percorsoItem.appendChild(div);

        if(percorso.descrizione!="" && percorso.descrizione!=null)
        {
            var div=document.createElement("div");

            var span=document.createElement("span");
            span.innerHTML=percorso.descrizione;
            div.appendChild(span);

            percorsoItem.appendChild(div);
        }
        
        outerContainer.appendChild(percorsoItem);
        i++;
    });

    Swal.fire
    ({
        background:"#404040",
        title:"Cambia percorso",
        html:outerContainer.outerHTML,
        allowOutsideClick:true,
        showCloseButton:true,
        showConfirmButton:true,
        allowEscapeKey:true,
        showCancelButton:false,
        onOpen : function()
                {
                    document.getElementsByClassName("swal2-title")[0].style.fontWeight="normal";
                    document.getElementsByClassName("swal2-title")[0].style.fontSize="12px";
                    document.getElementsByClassName("swal2-title")[0].style.color="#ddd";
                    document.getElementsByClassName("swal2-title")[0].style.width="100%";
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
function cambiaPercorso(id_filtro,id_percorso,nome,descrizione)
{
    document.getElementById("idPercorsoFiltro"+id_filtro).value=id_percorso;
    document.getElementById("nomePercorsoFiltro"+id_filtro).innerHTML=nome;
    document.getElementById("descrizionePercorsoFiltro"+id_filtro).innerHTML=descrizione;

    Swal.close();
}
function getPercorsiAlternativi(id_filtro)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getPercorsiAlternativiGestioneLotti.php",
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
function getPopupMettiInProduzione()
{
    var id_lotto=$('#selectLottoGestioneLotti').multipleSelect('getSelects')[0];
    var lotto=getFirstObjByPropValue(lotti,"id_lotto",id_lotto);

    var outerContainer=document.createElement("div");
    outerContainer.setAttribute("class","popup-messa-in-produzione-outer-container");

    var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;color:#ddd;font-size: 12px;text-align:left;font-weight: normal;font-family: 'Quicksand',sans-serif;margin-bottom:5px;");
    row.innerHTML="Nome";
    outerContainer.appendChild(row);

    var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;margin-bottom:5px;justify-content:flex-start");

    var input=document.createElement("input");
    input.setAttribute("class","popup-messa-in-produzione-input");input.setAttribute("type","text");
    input.setAttribute("id","popupMettiInProduzioneNome");
    
    row.appendChild(input);

    outerContainer.appendChild(row);

    var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;color:#ddd;font-size: 12px;text-align:left;font-weight: normal;font-family: 'Quicksand',sans-serif;margin-bottom:5px;");
    row.innerHTML="Note";
    outerContainer.appendChild(row);

    var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;margin-bottom:5px;justify-content:flex-start");

    var textarea=document.createElement("textarea");
    textarea.setAttribute("class","popup-messa-in-produzione-input");
    textarea.setAttribute("id","popupMettiInProduzioneNote");
    
    row.appendChild(textarea);

    outerContainer.appendChild(row);

    var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;color:#ddd;font-size: 12px;text-align:left;font-weight: normal;font-family: 'Quicksand',sans-serif;margin-bottom:5px;");
    row.innerHTML="Data inizio produzione";
    outerContainer.appendChild(row);

    var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;margin-bottom:5px;justify-content:flex-start");

    var input=document.createElement("input");
    input.setAttribute("class","popup-messa-in-produzione-input");input.setAttribute("type","date");
    input.setAttribute("id","popupMettiInProduzioneDataInizioProduzione");
    
    row.appendChild(input);

    outerContainer.appendChild(row);

    var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;color:#ddd;font-size: 12px;text-align:left;font-weight: normal;font-family: 'Quicksand',sans-serif;margin-bottom:5px;");
    row.innerHTML="Finestra";
    outerContainer.appendChild(row);

    var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;margin-bottom:5px;justify-content:flex-start");

    var input=document.createElement("input");
    input.setAttribute("class","popup-messa-in-produzione-input");input.setAttribute("type","number");
    input.setAttribute("id","popupMettiInProduzioneFinestra");
    
    row.appendChild(input);

    outerContainer.appendChild(row);

    var row=document.createElement("div");
    row.setAttribute("style","display:flex;flex-direction:row;width:100%;margin-top:10px;justify-content:flex-start;align-items:center;margin-bottom:5px");

    var checkbox=document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    checkbox.setAttribute("id","popupMettiInProduzioneProduzionePerCabina");
    checkbox.setAttribute("onchange","if(this.checked){$('.popup-messa-in-produzione-assemblyID-items').hide();}else{$('.popup-messa-in-produzione-assemblyID-items').show();}");
    checkbox.setAttribute("checked","checked");
    checkbox.setAttribute("style","margin:0px;margin-right:5px;");
    row.appendChild(checkbox);

    var label=document.createElement("span");
    label.setAttribute("style","width:100%;color:#ddd;text-align:left;font-size:12px;font-family: 'Quicksand',sans-serif;margin-left:7px");
    label.innerHTML="Produzione per cabina";
    row.appendChild(label);

    outerContainer.appendChild(row);

    var row=document.createElement("div");
    
    row.setAttribute("style","width:100%;color:#ddd;font-size: 12px;text-align:left;font-weight: normal;font-family: 'Quicksand',sans-serif;margin-bottom:5px;display:none;margin-top:5px");
    row.setAttribute("class","popup-messa-in-produzione-assemblyID-items");
    row.innerHTML="Assembly ID";
    outerContainer.appendChild(row);

    var row=document.createElement("div");
    row.setAttribute("class","popup-messa-in-produzione-assemblyID-items");
    row.setAttribute("style","width:100%;margin-bottom:5px;justify-content:flex-start;display:none");

    var input=document.createElement("input");
    input.setAttribute("class","popup-messa-in-produzione-input");input.setAttribute("type","text");
    input.setAttribute("id","popupMettiInProduzioneAssemblyID");
    
    row.appendChild(input);

    outerContainer.appendChild(row);

    var row=document.createElement("div");
    row.setAttribute("class","popup-messa-in-produzione-row");
    row.setAttribute("style","width:100%;flex-direction:row;align-items:center;justify-content:space-between;flex-direction:row;margin-top:10px");

    var confirmButton=document.createElement("button");
    confirmButton.setAttribute("class","popup-messa-in-produzione-button");
    confirmButton.setAttribute("style","width:100%;");
    confirmButton.setAttribute("onclick","mettiInProduzione()");
    confirmButton.innerHTML='<span>Conferma</span><i class="fal fa-check-circle"></i>';
    row.appendChild(confirmButton);    

    outerContainer.appendChild(row);

    Swal.fire
    ({
        background:"#404040",
        title:"Nuovo ordine di produzione per il lotto "+lotto.lotto,
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
function mettiInProduzione()
{
    var id_lotto=$('#selectLottoGestioneLotti').multipleSelect('getSelects')[0];
    var note=document.getElementById("popupMettiInProduzioneNote").value;
    var data_inizio_produzione=document.getElementById("popupMettiInProduzioneDataInizioProduzione").value;
    var finestra=document.getElementById("popupMettiInProduzioneFinestra").value;
    var nome=document.getElementById("popupMettiInProduzioneNome").value;
    var produzionePerCabina=document.getElementById("popupMettiInProduzioneProduzionePerCabina").checked;
    var assemblyID=document.getElementById("popupMettiInProduzioneAssemblyID").value;

    if(nome=="" || data_inizio_produzione=="" || finestra=="")
    {
        Swal.fire
        ({
            icon:"error",
            title: "Compila i campi nome, data inizio produzione e finestra",
            background:"#404040",
            showCloseButton:true,
            showConfirmButton:false,
            allowOutsideClick:false,
            onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
        }).then((result) =>
        {
            getPopupMettiInProduzione();
        });
    }
    else
    {
        if(produzionePerCabina==false && assemblyID=="")
        {
            Swal.fire
            ({
                icon:"error",
                title: "Compila il campo assembly ID",
                background:"#404040",
                showCloseButton:true,
                showConfirmButton:false,
                allowOutsideClick:false,
                onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
            }).then((result) =>
            {
                getPopupMettiInProduzione();
            });
        }
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

            $.get("mettiInProduzioneLottoGestioneLotti.php",
            {
                id_lotto,
                note,
                data_inizio_produzione,
                finestra,
                nome
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
                        var arrayResponse=JSON.parse(response);
                        var id_ordine_di_produzione=arrayResponse.id_ordine_di_produzione;

                        let timerInterval;
                        Swal.fire
                        ({
                            icon:"success",
                            title: "Lotto messo in produzione",
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
                            Swal.fire
                            ({
                                width:"100%",
                                background:"transparent",
                                title:"Creazione file linea carpenteria in corso...",
                                html:'<i class="fad fa-spinner-third fa-spin fa-3x" style="color:white"></i>',
                                allowOutsideClick:false,
                                showCloseButton:false,
                                showConfirmButton:false,
                                allowEscapeKey:false,
                                showCancelButton:false,
                                onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
                            });

                            $.get("creaFileLineaCarpenteriaGestioneLotti.php",
                            {
                                id_ordine_di_produzione,
                                nome:arrayResponse.nome,
                                produzionePerCabina,
                                assemblyID
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
                                            title: "File linea carpenteria creato",
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
                                        });
                                    }
                                }
                            });
                        });
                    }
                }
            });
        }
    }
}