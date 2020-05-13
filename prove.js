$(document).ready(function () {
    //INVIO MESSAGGIO TRAMITE Enter
    $(".write-msg input").keypress(function (event) {
        //MANDO IL MESSAGGIO QUANDO PREME Enter E QUANDO IL MESSAGGIO NON E' VUOTO
        if (event.key == "Enter" && $(".write-msg input").val().trim()) {
            sendMsg();
        }
    });

    //PER PULIRE LA CHAT (solo per test da cancellare dopo..)
    $(".fa-microphone").click(function () {
        $(".body-right").html("");
    });

    //RICERCA NOME
    // ? SUL KEYPRESS NON MI PRENDE LA PRIMA LETTERA (SE PROVI A CERCARE oracolo fino a 'ora' trova sia oracolo che morpheus perche' non legge ancora la a) e non mi prende caratteri come canc delete ecc
    $(".header-left-bottom input").keyup(function () {
        var ricerca = $(this).val().trim().toLowerCase();

        // vado a ciclare tutti i nomi dei contatti
        $(".user-box .name div").each(function () {
            var nomiUtenti = $(this).text().toLowerCase();
            //se ricerca esiste come sottostringa del nome mostro il suo 'blocco' e nascondo gli altri
            if (nomiUtenti.indexOf(ricerca) != -1) {
                $(this).closest(".user-box").show();
            } else {
                $(this).closest(".user-box").hide();
            }
        });
    });

    //CLICK SU CONTATTO
    $(".user-box").click(function () {
        //CAMBIO BLOCCO HEADER
        //prendo le specifiche del contatto (a sinistra)
        var immagineContatto = $(this).find("img").attr("src"); //immagine
        var nomeContatto = $(this).find(".name div").text(); //il nome
        var fraseContatto = $(this).find(".message").text(); // e la frase
        //immagine e nome li porto sull'header (a destra)
        $(".header-right .user-img img").attr("src", immagineContatto);
        $(".header-right .name div").text(nomeContatto);
        //dentro il template.risposta metto la frase e l'ora(fittizia)
        $(".template.risposta .text").text(fraseContatto);
        $(".template.risposta .time").text("12:00");
        //clono la struttura dentro il template
        var templateRisposta = $(
            ".template.risposta .body-message.answer"
        ).clone();
        //se c'e' bisogno faccio lo scroll
        $(".body-right").animate({
            scrollTop: $(".body-right").prop("scrollHeight"),
        });
        //pulisco la chat dagli altri eventuali messaggi
        // $(".body-right").html("");
        //e la aggiungo a body-right
        $(".body-right").append(templateRisposta);
    });

    //COMPARSA SEND ICON AL FOCUS SULL'INPUT
    $(".write-msg input").focus(function () {
        $("i.fa-microphone").hide();
        $("i.fa-paper-plane").fadeIn();
    });
    //una volta comparsa l'icona fa-paper-plane posso mandare il mex e tornare alla classe microphone
    $("i.fa-paper-plane").click(function () {
        if ($(".write-msg input").val().trim()) {
            sendMsg();
            $("i.fa-paper-plane").hide();
            $("i.fa-microphone").fadeIn();
        }
    });

    //COMPARSA icona dentro .destroy
    //!!!ATTENZIONE non puoi usare direttamente div.body-message come selettore
    //questo selettore non va bene perche non considera gli elementi dinamici
    $(".body-right")
        .on("mouseenter", "div.body-message", function () {
            $(this).find(".destroy i").fadeIn();
        })
        .on("mouseleave", "div.body-message", function () {
            $(this).find(".destroy i").fadeOut();
        });

    //COMPARSA MENU AL CLICK SULL'ICONA DI .body-message
    $(".body-right").on("click", ".body-message", function (e) {
        // var target = $(e.target);
        // console.log(target);
        // if (target.hasClass("fa-chevron-down")) {
        //     //faccio apparire il menu
        //     $(this).find(".destroy-actions").show();
        // } else {
        //     $(this).find(".destroy-actions").hide();
        // }

        //una volta aaparso voglio che quando tolgo il focus scompaia
        $(this).find("i");
    });
    // QUESTA VA BENE PER IL CLICK SUL SECONDO h3
    // $(this).find(".destroy-actions h3:nth-child(2)").blur($(this).hide());
});

function rispondi() {
    var date = new Date();
    var time = date.getHours() + ":" + date.getMinutes();
    //per scrivere il nome dentro le frasi
    var mittente = $(".header-right .name div").text();
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

    $(".body-right").animate({
        scrollTop: $(".body-right").prop("scrollHeight"),
    });
    //e la aggiungo a body-right come risposta
    $(".body-right").append(templateRisposta.html());
    $(".body-right").animate({
        scrollTop: $(".body-right").prop("scrollHeight"),
    });
}

function sendMsg() {
    var date = new Date();
    var time = date.getHours() + ":" + date.getMinutes();

    var str = $(".write-msg input").val();
    $(".write-msg input").val(""); //azzera input

    //dentro il template.domanda metto l'input dell'utente e l'ora
    $(".template.domanda .text").text(str);
    $(".template.domanda .time").text(time);
    //clono la struttura dentro il template (quello che c' e' dentro body-message)
    var template = $(".template.domanda").clone();
    // console.log(template.html());

    //e la aggiungo a body-right come domanda
    $(".body-right").append(template.html());
    // console.log($(".body-right").append(template).html());

    setTimeout(rispondi, 1000);
    $(".body-right").animate({
        scrollTop: $(".body-right").prop("scrollHeight"),
    });
}
