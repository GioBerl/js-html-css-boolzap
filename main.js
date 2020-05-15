$(document).ready(function () {
    //INVIO MESSAGGIO TRAMITE Enter
    $(".write-msg input").keypress(function (event) {
        //MANDO IL MESSAGGIO QUANDO PREME Enter E QUANDO IL MESSAGGIO NON E' VUOTO
        if (event.key == "Enter" && $(".write-msg input").val().trim()) {
            sendMsg();
        }
    });

    //RICERCA NOME
    // ? SUL KEYPRESS NON MI PRENDE LA PRIMA LETTERA (SE PROVI A CERCARE oracolo fino a 'ora' trova sia oracolo che morpheus perche' non legge ancora la a) e non mi prende caratteri come canc delete ecc
    $(".header-left-bottom input").keyup(function () {
        var ricerca = $(this).val().trim().toLowerCase();

        // vado a ciclare tutti i nomi dei contatti
        $(".user-box .name div").each(function () {
            var nomiUtenti = $(this).text().toLowerCase();
            //se ricerca esiste come sottostringa del nome, mostro il suo 'blocco' e nascondo gli altri
            if (nomiUtenti.indexOf(ricerca) != -1) {
                $(this).closest(".user-box").show();
            } else {
                $(this).closest(".user-box").hide();
            }
        });
    });

    //ASSEGNAZIONE ORARIO RANDOM AI CONTATTI
    $(".container-left .name span").each(function () {
        $(this).text(orarioRandom());
    });
    //PRENDO QUELLO DEL PRIMO CONTATTO(quello visibile quando si apre la pagina) E LO METTO NELL HEADER A DESTRA
    $(".header-right .message span.old-time").text($(".primo-orario").text());

    //CLICK SU CONTATTO
    $(".user-box").click(function () {
        //CAMBIO BLOCCO HEADER
        //prendo le specifiche del contatto (a sinistra)
        var immagineContatto = $(this).find("img").attr("src"); //immagine
        var nomeContatto = $(this).find(".name div").text(); //il nome
        var fraseContatto = $(this).find(".message").text(); //la frase
        var oraContatto = $(this).find(".name span").text(); //e l'ora
        //immagine e nome li porto sull'header (a destra)
        $(".header-right .user-img img").attr("src", immagineContatto);
        $(".header-right .name div").text(nomeContatto);
        $(".header-right .message span.old-time").text(oraContatto);

        //ricavo l'indice del contatto
        var contactIndex = $(this).index();
        //seleziono il body-right (la chat) corrispondente all'indice del contatto
        var conversation = $(".body-right").eq(contactIndex);
        //alla chat corrente rimuovo la classe active
        $(".body-right.active").removeClass("active");
        //e metto la classe active alla chat corrispondente al contatto clickato
        conversation.addClass("active");
    });

    //COMPARSA SEND ICON AL FOCUS SULL'INPUT
    $(".write-msg input").focus(function () {
        $(".mic i").toggleClass("fa-microphone fa-paper-plane");
    });
    $(".write-msg input").blur(function () {
        $(".mic i").toggleClass("fa-paper-plane fa-microphone");
    });

    //una volta comparsa l'icona fa-paper-plane posso mandare il mex e tornare alla classe microphone
    $(".mic").click(function () {
        sendMsg();
    });

    //COMPARSA icona dentro .destroy
    //!!!ATTENZIONE non puoi usare direttamente div.body-message come selettore
    //questo selettore non va bene perche non considera gli elementi dinamici inseriti successivamente
    $(".body-right")
        .on("mouseenter", "div.body-message", function () {
            $(this).find(".destroy i").fadeIn();
        })
        .on("mouseleave", "div.body-message", function () {
            $(this).find(".destroy i").fadeOut();
            $(this).find(".destroy-actions").fadeOut();
        });
    // ? se volessi che, a menu aperto, al click su un qualsiasi punto della pagina, il menu si chiudesse devo per forza selezionare il document?

    // $(document).on("blur", "body", function() {
    //     $(this).find(".destroy i").fadeOut();
    //     $(this).find(".destroy-actions").fadeOut();
    // });

    //COMPARSA MENU AL CLICK SULL'ICONA DI .body-message
    $(".body-right")
        .on("click", ".body-message i", function (e) {
            var target = $(e.target);
            if (target.hasClass("fa-chevron-down")) {
                $(this).next(".destroy-actions").toggle();
            }
        })
        .on("click", ".delete", function () {
            // $(this).closest(".body-message").remove();
            $(this)
                .closest(".body-message")
                .html(
                    `questo messaggio e' stato cancellato <i class="fas fa-ban"></i>`
                )
                .css({
                    "border-radius": "0",
                    padding: "10px",
                    "background-color": "red",
                    color: "white",
                });
        });

    //SNACK---> AL CLICK SU fa-comment-alt FAI APPARIRE L'EASTER EGG
    $("i.fa-comment-alt").click(function () {
        $(".second").hide();
        $(".matrix").css({
            display: "flex",
            // "align-items": "center",
        });
        //aspetta il tempo della prima animazione e faccio partire la seconda
        setTimeout(function () {
            $(".second").show();
            $(".start-animation").removeClass("start-animation");
            $(".second").addClass("start-animation");
            $(".first").remove();
        }, 6000);
        //dopo le due animazioni distruggo tutto
        setTimeout(function () {
            $(".matrix").remove();
        }, 12000);
    });
    //FAI APPARIRE MENU MODALITA VISUALIZZAZIONE PAGINA
    $(".fa-exchange-alt").click(function () {
        $(".matrix-menu").fadeToggle();
    });
    // SCELTA MODALITA NORMALE
    $(".normal").click(function () {
        $(".body-right").css({
            "background-image": "url(img/wallpaper.jpg)",
            "background-size": "contain",
        });
        $(".arrow-left, .arrow-right").show();
        $("div, i, input").removeClass("matrix-mode");
        $(this).closest(".matrix-menu").hide();
    });
    // SCELTA MODALITA MATRIX
    $(".modded").click(function () {
        $(".body-right").css({
            "background-image": "url(img/source.jpg)",
            "background-size": "cover",
        });
        $(".arrow-left, .arrow-right").hide();
        $("div, i, input").addClass("matrix-mode");
        $(this).closest(".matrix-menu").hide();
    });

    //CLICK PER APRIRE MENU SMILES
    $(".fa-laugh").click(function () {
        //cambio icona sul footer
        $(this).toggleClass("fa-laugh fa-times");
        //faccio comparire il menu delle faccine
        $(".smiles").toggleClass("smile-active");
    });

    //CLICK SUGLI SMILE
    $(".single-smile").click(function () {
        var faccina = $(this).text();
        //vado nell'input e copio quello che c'e' scritto
        var testo = $(".write-msg input").val();
        //al nuovoTesto aggiungo la faccina
        var nuovoTesto = testo + faccina;
        //e lo reiserisco nell'input
        $(".write-msg input").val(nuovoTesto);
        //facendo tornare il focus sull'input
        $(".write-msg input").focus();
    });
});

function rispondi() {
    var date = new Date();
    //per i minuti
    if (date.getMinutes() < 10) {
        var fixedMinutes = `0${date.getMinutes()}`;
    } else {
        fixedMinutes = date.getMinutes();
    }
    //per le ore
    if (date.getHours() < 10) {
        var fixedHours = `0${date.getHours()}`;
    } else {
        fixedHours = date.getHours();
    }
    var time = fixedHours + ":" + fixedMinutes;
    //per scrivere il nome dentro le frasi
    // var mittente = $(".header-right .name div").text();
    var mittente = "Giovanni";
    var frasi = [
        "Hai mai fatto un sogno tanto realistico da sembrarti vero? E se da un sogno così non ti dovessi più svegliare? Come potresti distinguere il mondo dei sogni da quello della realtà?",
        "Benvenuto nel mondo vero.",
        "allacciati la cintura, Alice, che da adesso di meraviglie ne vedrai un bel po'.",
        `Tu sei l'Eletto, ${mittente}. Vedi, tu hai passato gli ultimi anni a cercare me, ma io... è una vita... una vita intera che cerco te.`,
        `Svegliati, ${mittente}. Matrix... ha te... Segui il Coniglio Bianco...`,
        `Questo è Struttura, il nostro programma di caricamento. Possiamo caricare di tutto: vestiti, equipaggiamento, armi, addestramento simulato. Tutto quello di cui abbiamo bisogno.`,
        `C'eravamo dati una regola: mai liberare un individuo che ha raggiunto una certa età.`,
        `Quando Matrix era in costruzione, c'era un uomo nato al suo interno che aveva la capacità di fare, di cambiare quello che voleva, di reimpostare Matrix a suo piacimento. Fu lui che riuscì a liberare i primi di noi, a insegnarci la verità.`,
    ];
    //SCELGO UNA FRASE RANDOM DA POSTARE
    var fraseRandom = frasi[Math.floor(Math.random() * frasi.length)];
    //dentro il template.risposta metto la frase di risposta e l'ora
    $(".template.risposta .text").text(fraseRandom);
    $(".template.risposta .time").text(time);
    //clono la struttura dentro il template
    var templateRisposta = $(".template.risposta").clone();

    $(".body-right.active").animate({
        scrollTop: $(".body-right.active").prop("scrollHeight"),
    });
    //e la aggiungo a body-right ACTIVE come risposta
    $(".body-right.active").append(templateRisposta.html());
    $(".body-right.active").animate({
        scrollTop: $(".body-right.active").prop("scrollHeight"),
    });
}

function sendMsg() {
    var date = new Date();
    //per i minuti
    if (date.getMinutes() < 10) {
        var fixedMinutes = `0${date.getMinutes()}`;
    } else {
        fixedMinutes = date.getMinutes();
    }
    //per le ore
    if (date.getHours() < 10) {
        var fixedHours = `0${date.getHours()}`;
    } else {
        fixedHours = date.getHours();
    }
    var time = fixedHours + ":" + fixedMinutes;

    var str = $(".write-msg input").val();
    if (str.trim() != 0) {
        $(".write-msg input").val(""); //azzera input

        //dentro il template.domanda metto l'input dell'utente e l'ora
        $(".template.domanda .text").text(str);
        $(".template.domanda .time").text(time);
        //clono la struttura dentro il template (quello che c' e' dentro body-message)
        var template = $(".template.domanda").clone();
        // console.log(template.html());

        //e la aggiungo a body-right visibile(ACTIVE) come domanda
        $(".body-right.active").append(template.html());
        // console.log($(".body-right").append(template).html());

        setTimeout(rispondi, 1000);
        $(".body-right.active").animate({
            scrollTop: $(".body-right.active").prop("scrollHeight"),
        });
    }
    //reimposto l'icona iniziale sul footer di destra
    $(".smile i").attr("class", "fas fa-laugh");
    //se il menu delle faccine e' visibile lo nascondo
    if ($(".smiles").is(":visible")) {
        $(".smiles").removeClass("smile-active");
    }
}

//genero un orario random
function orarioRandom() {
    // le ore da 0 a 23
    var ore = Math.floor(Math.random() * 24);
    // i minuti da 0 a 59
    var minuti = Math.floor(Math.random() * 60);
    //imposto la condizione per vedere un formato 00:00
    if (ore < 10) {
        var normalOre = `0${ore}`;
    } else {
        var normalOre = ore;
    }
    if (minuti < 10) {
        var normalMinuti = `0${minuti}`;
    } else {
        var normalMinuti = minuti;
    }
    return `${normalOre}:${normalMinuti}`;
}
