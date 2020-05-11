$(document).ready(function () {
    $(".write-msg input").keypress(function (event) {
        //MANDO IL MESSAGGIO QUANDO PREME Enter E QUANDO IL MESSAGGIO NON E' VUOTO
        if (event.key == "Enter" && $(".write-msg input").val()) {
            var date = new Date();
            var time = date.getHours() + ":" + date.getMinutes();

            var str = $(".write-msg input").val();
            $(".write-msg input").val(""); //azzera input

            //dentro il template metto l'input dell'utente e l'ora
            $(".template.domanda .text").text(str);
            $(".template.domanda .time").text(time);
            //clono la struttura dentro il template
            var template = $(".template.domanda .body-message").clone();

            //e la aggiungo a body-right
            $(".body-right").append(template);
            setTimeout(rispondi, 1000);
            $(".body-right").animate({
                scrollTop: $(".body-right").prop("scrollHeight"),
            });
        }
    });

    $(".fa-microphone").click(function () {
        $(".body-right").html("");
    });

    //RICERCA NOME
    // ? SUL KEYPRESS NON MI PRENDE LA PRIMA LETTERA (SE PROVI A CERCARE oracolo fino a 'ora' trova sia oracolo che morpheus perche' non legge ancora la a)
    $(".header-left-bottom input").keyup(function () {
        var ricerca = $(this).val().toLowerCase();

        // console.log(ricerca);
        $(".user-box .name div").each(function () {
            var nomiUtenti = $(this).text().toLowerCase();
            if (nomiUtenti.indexOf(ricerca) != -1) {
                $(this).closest(".user-box").show();
            } else {
                $(this).closest(".user-box").hide();
            }
        });
    });
});

function rispondi() {
    var date = new Date();
    var time = date.getHours() + ":" + date.getMinutes();
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

    $(".body-right").append(`<div class="body-message answer">
                                    <div class="arrow-right"></div>
                                    ${fraseRandom} <span class="time">${time}</span>
                            </div>`);
    $(".body-right").animate({
        scrollTop: $(".body-right").prop("scrollHeight"),
    });
}
