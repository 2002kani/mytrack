
let heute = new Date();
let monat = heute.getMonth();
let jahr = heute.getFullYear();

// DOM Manipulations Dashboard (Features etc..)
const ladeBildschirm = document.querySelector(".ladebildschirm");
const webseite = document.querySelector(".webseite");

const kalender = document.querySelector(".kalender-section");
const features = document.querySelectorAll(".features p");
const sidebar = document.querySelector(".sidebar");

const kalenderBtn = document.querySelector(".features-kalender");
const notizenBtn = document.querySelector(".features-notizen");
const erinnerungenBtn = document.querySelector(".features-erinnerungen");
const einstellungBtn = document.querySelector(".features-einstellung");
const einstelllungSection = document.querySelector(".einstellung-section");
const notizenSection = document.querySelector(".notizen-section");

ladeBildschirm.addEventListener("click", function(){
    ladeBildschirm.style.display = "none";
    webseite.style.display = "flex";
})

features.forEach(function(feature){
    feature.addEventListener("click", function(){
        features.forEach(function(f){
            f.classList.remove("aktiv");
        });
        feature.classList.toggle("aktiv");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const features = document.querySelector(".features");

    hamburger.addEventListener("click", () => {
        features.style.display = features.style.display === "flex" ? "none" : "flex";
    });
});

/* dashboardBtn.addEventListener("click", function(){
    kalender.style.display = "none";
    dashboard.style.display = "block";
    erinnerungenSection.style.display = "none";
    einstelllungSection.style.display = "none";
    notizenSection.style.display = "none";
}); */

kalenderBtn.addEventListener("click", function(){
    kalender.style.display = "block";
    erinnerungenSection.style.display = "none";
    einstelllungSection.style.display = "none";
    notizenSection.style.display = "none";
});

erinnerungenBtn.addEventListener("click", function(){
    erinnerungenSection.style.display = "block";
    kalender.style.display = "none";
    einstelllungSection.style.display = "none";
    notizenSection.style.display = "none";
})

einstellungBtn.addEventListener("click", function(){
    einstelllungSection.style.display = "block";
    kalender.style.display = "none";
    erinnerungenSection.style.display = "none";
    notizenSection.style.display = "none";
})

notizenBtn.addEventListener("click", function(){
    notizenSection.style.display = "block";
    kalender.style.display = "none";
    erinnerungenSection.style.display = "none";
    einstelllungSection.style.display = "none";
})


// Kalender Section
const monatsAnzeige = document.querySelector(".monatsAnzeige .datum");
const kalenderTage = document.querySelector(".kalender-tage");
const alteTage = document.querySelector(".alt");
const neueTage = document.querySelector(".neu");

let aktiverTag;

const monate = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
];

// Tage und Monat Hinzufügen
function initKalender(){
    const ersterTag = new Date(jahr, monat, 1);
    const letzterTag = new Date(jahr, monat + 1, 0);
    const prevLastDay = new Date(jahr, monat, 0);
    const vorherigeTage = prevLastDay.getDate();
    const letztesDatum = letzterTag.getDate();
    
    // Anpassung des ersten Tages, sodass Montag als 0 zählt
    let tag = ersterTag.getDay() - 1;
    if (tag === -1) {
        tag = 6; // Wenn der Tag -1 ist, ist der erste Tag ein Sonntag, also 6
    }

    monatsAnzeige.innerHTML = monate[monat] + " " + jahr;

    let tage = "";
    
    const nächstenTage = (7 - letzterTag.getDay() + 1) % 7;

    let events = JSON.parse(localStorage.getItem("events")) || {};

    // Tage aus vergangenen Monat hinzufügen
    for(let i = tag; i > 0; i--){
        tage += `<div class="tag alt"> ${vorherigeTage - i +1}</div>`;
    }

    // Tage aus den aktuellen Monat
    for(let i = 1; i <= letztesDatum; i++){

        const datumKey = `${jahr}-${monat + 1}-${i}`;
        const hatEvent = events[datumKey] && events[datumKey].length > 0;

        const eventKlasse = hatEvent ? "event" : "";

        if(
            i === new Date().getDate() &&
            jahr === new Date().getFullYear() &&
            monat === new Date().getMonth()
        ) {
            tage += `<div class="tag heute ${eventKlasse}"> ${i}</div>`;
        } 
        else{
            tage += `<div class="tag ${eventKlasse}"> ${i}</div>`;
        } 
    }

    // Tage aus den neuen Monat
    for(let j = 1; j < nächstenTage; j++){
        tage += `<div class="tag neu"> ${j}</div>`;
    }

    kalenderTage.innerHTML = tage;

    const alleTage = document.querySelectorAll(".kalender-tage .tag");
    alleTage.forEach(function(tag){
        tag.addEventListener("click", function(){
            zeigeGewähltenTag(tag.textContent);
        });
    });
}

function zeigeGewähltenTag(tagNummer){
    aktiverTag = tagNummer;
    const datum = new Date(jahr, monat, tagNummer);
    const wochentage = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    const tagName = wochentage[datum.getDay()];
    const formatDatum = `${tagNummer}. ${monate[monat]} ${jahr}`;

    eventTag.innerHTML = `<h3>${tagName}</h3>`;
    eventDatum.innerHTML = `<p>${formatDatum}</p>`;

    eventsAnzeigen();
}

window.addEventListener("load", function() {
    // Hole das heutige Datum
    const heutigerTag = new Date().getDate();

    // Setze die Anzeige auf den heutigen Tag
    zeigeGewähltenTag(heutigerTag);
});

initKalender();

const monatLinks = document.querySelector(".monatsAnzeige .material-icons.left");
const monatRechts = document.querySelector(".monatsAnzeige .material-icons.right");

monatLinks.addEventListener("click", function(){
    monat--;
    if(monat < 0){
        monat = 11;
        jahr--;
    }
    initKalender();
})

monatRechts.addEventListener("click", function(){
    monat++;;
    if(monat > 11){
        monat = 0;
        jahr++;
    }
    initKalender();
})

// Bei klick auf tag soll Hintergrundfarbe bleiben
kalenderTage.addEventListener("click", function(event){
    if (event.target.classList.contains("tag") && !event.target.classList.contains("alt") && !event.target.classList.contains("neu")) {
        
        // Entfernt die aktive Klasse von allen Tagen
        document.querySelectorAll(".kalender-tage .tag").forEach(function (tag) {
            tag.classList.remove("aktiv");
        });
        
        // Fügt die aktive Klasse zum geklickten Tag hinzu
        event.target.classList.add("aktiv");
    }
});


// Events Section
const eventTag = document.querySelector(".datumAnzeige .tag");
const eventDatum = document.querySelector(".datumAnzeige .picked-datum");


// Pop-up
const eventPopup = document.querySelector(".event-popup");
const eventHinzufügen = document.querySelector(".eventHinzufügen");

const eventAnzeige = document.querySelector(".eventAnzeige");

eventHinzufügen.addEventListener("click", function() {
    eventPopup.classList.toggle("zeige-popup");
    eventHinzufügen.classList.toggle("schließen");
});

const eventNotizInput = document.getElementById("eventNotiz");
const anfangsZeitInput = document.getElementById("anfangsZeit");
const endZeitInput = document.getElementById("endZeit");
const addBtn = document.querySelector(".add-button");


function speicherEvent(){
    const eventNotiz = eventNotizInput.value;
    const anfangsZeit = anfangsZeitInput.value;
    const endZeit = endZeitInput.value;

    if(eventNotiz === "" | anfangsZeit === "" | endZeit === ""){
        alert("Bitte fülle alle Angaben korrekt aus.");
        return
    } 

    const datumKey = `${jahr}-${monat + 1}-${aktiverTag}`;
    
    // Event Objekt erstellen
    const event = {
        notiz: eventNotiz,
        anfang: anfangsZeit,
        ende: endZeit
    };

    let events = JSON.parse(localStorage.getItem("events")) || {};
    
    // Fallback falls events kein Array ist
    if (typeof events !== "object") {
        events = {};
    }
    if (!events[datumKey]) {
        events[datumKey] = [];
    }

    events[datumKey].push(event);
    localStorage.setItem("events", JSON.stringify(events));
    eventsAnzeigen();

    eventNotizInput.value = "";
    anfangsZeitInput.value = "";
    endZeitInput.value = "";
};

function eventsAnzeigen(){

    let events = JSON.parse(localStorage.getItem("events")) || {};

    // Fallback wenn events kein Array ist
    if (typeof events !== "object") {
        events = {};
    }

    const datumKey = `${jahr}-${monat + 1}-${aktiverTag}`;

    const eventsObj = events[datumKey] || [];

    eventAnzeige.innerHTML = eventsObj.map(function(event, index){
        return `<div class="event">
        <div class="eventHeader">
            <i class="fa-solid fa-circle"></i>
            <div class="eventNotiz">${event.notiz}</div>
        </div>
            <div class="button-part">
                <div class="eventZeit">${event.anfang} - ${event.ende}</div>
                <div class="remove-event"> <i class="fa-solid fa-xmark"></i> </div>
            </div>
        </div>`
    }).join("");

    // Eventlistener für die löschbuttons
    const entfernBtn = document.querySelectorAll(".remove-event");
    entfernBtn.forEach(function(button, index){
        button.addEventListener("click", function(){
            entferneEvent(index);
        });
    });
}

// Events löschen function
function entferneEvent(index){

    const datumKey = `${jahr}-${monat + 1}-${aktiverTag}`;

    let events = JSON.parse(localStorage.getItem("events")) ||{};

    if (typeof events !== "object") {
        events = {};
    }

    const eventsObj = events[datumKey] || [];

    eventsObj.splice(index, 1); // Entfernt an angegebener Stelle
    
    if (eventsObj.length === 0) {
        delete events[datumKey]; // Entfernt den Eintrag, wenn keine Events mehr vorhanden sind
    } else {
        events[datumKey] = eventsObj; // Aktualisiert die Events-Liste für das Datum
    }

    localStorage.setItem("events", JSON.stringify(events)); // Aktualisiert localstorage

    eventsAnzeigen();
}

addBtn.addEventListener("click", function(){
    speicherEvent();
    eventPopup.classList.toggle("zeige-popup");
    initKalender();
});


// Beim laden der Seite anzeigen (Veränderung bald..?)
window.addEventListener("load", eventsAnzeigen);



// -- Erinnerungen Section --
const erinnerungenSection = document.querySelector(".erinnerungen-section");
const erinnerungenInput = document.getElementById('erinnerung-input');
const inputBtn = document.getElementById('input-btn');
const erinnerungenUl = document.querySelector(".erinnerung-liste");

const fertigeZahlen = document.querySelector(".fertige-zahlen");

let aktuellesLi = null;
let totalErinnerungen = 0;
let erledigteErinnerungen = 0;


document.addEventListener("DOMContentLoaded", function() {
    const gespeicherteErinnerungen = JSON.parse(localStorage.getItem("erinnerungen")) || [];
    const gespeicherteTotal = JSON.parse(localStorage.getItem("totalErinnerungen")) || 0;

    // Reset `erledigteErinnerungen` to count only the checked items from localStorage
    totalErinnerungen = gespeicherteTotal;
    erledigteErinnerungen = 0;

    gespeicherteErinnerungen.forEach(({ text, checked}) => {
        erstelleLi(text, checked);
        if (checked) {
            erledigteErinnerungen++;
        }
    });
    aktualisiereAnzeige();
});


inputBtn.addEventListener("click", function(){
    const eingabe = erinnerungenInput.value;

    if(erinnerungenUl.children.length >= 5){
        alert("Es können maximal 5 Erinnerungen hinzugefügt werden.")
        return;
    }
    if(eingabe == ""){
        alert("Bitte gib eine gültige Erinnerung ein.")
        return;
    }
    if (aktuellesLi) {
        aktuellesLi.querySelector("p").textContent = eingabe;
        aktualisiereLocalStorage();
        aktuellesLi = null;  
        erinnerungenInput.value = "";
        return;
    }

    erstelleLi(eingabe, false);
    totalErinnerungen++;
    erinnerungenInput.value = "";
    aktualisiereLocalStorage();
    aktualisiereAnzeige();
});

function erstelleLi(text, checked){
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;

    if (checked) {
        erledigteErinnerungen++;
    }

    const p = document.createElement("p");
    p.textContent = text;

    const iconsDiv = document.createElement("div");
    iconsDiv.classList.add("icons");

    const editIcon = document.createElement("i");
    editIcon.classList.add("material-icons", "left");
    editIcon.textContent = "edit";

    editIcon.addEventListener("click", function(){
        erinnerungenInput.value = p.textContent;
        aktuellesLi = li;
    });

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("material-icons", "left");
    deleteIcon.textContent = "delete";

    deleteIcon.addEventListener("click", function() {
        erinnerungenUl.removeChild(li);
        totalErinnerungen--;
        if(checkbox.checked){
            erledigteErinnerungen--;
        }
        aktualisiereLocalStorage();
        aktualisiereAnzeige()
    });

    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            erledigteErinnerungen++;
        } else {
            erledigteErinnerungen--;
        }
        aktualisiereAnzeige();
        aktualisiereLocalStorage();
    });

    li.appendChild(checkbox);
    li.appendChild(p);
    iconsDiv.appendChild(editIcon);
    iconsDiv.appendChild(deleteIcon);
    li.appendChild(iconsDiv);
    erinnerungenUl.appendChild(li);
}

function aktualisiereAnzeige() {
    fertigeZahlen.textContent = `${erledigteErinnerungen} / ${totalErinnerungen}`;
    let progressAnzeige = document.querySelector(".progress");
    let progressBar = document.querySelector(".progress-bar");

    if(erledigteErinnerungen === 0){
        progressAnzeige.style.width = "0%"
    }
    let progressWidth = (erledigteErinnerungen / totalErinnerungen) * 100;
    progressAnzeige.style.width = `${progressWidth}%`;
}

function aktualisiereLocalStorage() {
    const erinnerungen = [];
    // Hier stellen wir sicher, dass wir nur die erwarteten Elemente bearbeiten
    document.querySelectorAll(".erinnerung-liste li").forEach(li => {
        const textElement = li.querySelector("p");
        const checkbox = li.querySelector("input[type='checkbox']");
        
        // Überprüfen, ob die Elemente vorhanden sind, bevor darauf zugegriffen wird
        if (textElement && checkbox) {
            const text = textElement.textContent;
            const checked = checkbox.checked;
            erinnerungen.push({ text, checked });
        }
    });
    localStorage.setItem("erinnerungen", JSON.stringify(erinnerungen));
    localStorage.setItem("totalErinnerungen", JSON.stringify(totalErinnerungen));
    localStorage.setItem("erledigteErinnerungen", JSON.stringify(erledigteErinnerungen));
}


// -- Notizen Section --
const notizBtn = document.querySelector(".neue-notiz");
const textArea = document.querySelector(".notizen-display textarea");
const notizListe = document.querySelector(".notiz-liste");
const löschNotizBtn = document.querySelector(".notiz button");

let notizenCounter = 0;

function erstelleNotiz(text, index){

    const h3Text = text.slice(0, 10);
    const pText = text.slice(10, 30);

    const notizDiv = document.createElement("div");
    notizDiv.classList.add("notiz");
    notizDiv.setAttribute("data-index", index);

    const textDiv = document.createElement("div");
    textDiv.classList.add("text-div");

    const h3 = document.createElement("h3");
    h3.textContent = h3Text;

    const p = document.createElement("p");
    p.textContent = pText;

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button-div");

    const xBtn = document.createElement("button");
    xBtn.textContent = "x";

    textDiv.appendChild(h3);
    textDiv.appendChild(p);

    notizDiv.appendChild(textDiv);
    notizDiv.appendChild(buttonDiv);
    notizDiv.appendChild(xBtn);

    xBtn.addEventListener("click", function(){
        löscheNotizStorage(index);
        notizDiv.remove();
    });

    notizListe.appendChild(notizDiv);
}

function löscheNotizStorage(index){
    let notizen = JSON.parse(localStorage.getItem("notizen")) || [];
    notizen.splice(index, 1);
    localStorage.setItem("notizen", JSON.stringify(notizen));
    notizenCounter--;
}

function ladeNotizenStorage(){
    const notizen = JSON.parse(localStorage.getItem("notizen")) || [];
    notizen.forEach(function(notiz, index){
        erstelleNotiz(notiz, index);
        notizenCounter++;
    });
}

notizBtn.addEventListener("click", function() {
    if(notizenCounter >= 5){
        alert("Du hast die maximale Anzahl an Notizen erreicht. Lösche eine Notiz um eine neue hinzuzufügen.")
        return;
    }
    textArea.style.display = "block";
    textArea.focus();
});

textArea.addEventListener("blur", function() {
    const text = textArea.value.trim();

    if (text && notizenCounter < 5) {
        const notizen = JSON.parse(localStorage.getItem("notizen")) || [];
        notizen.push(text);
        localStorage.setItem("notizen", JSON.stringify(notizen));
        
        erstelleNotiz(text, notizen.length -1);
        notizenCounter++;
    }

    console.log(notizenCounter);
    textArea.style.display = "none";
    textArea.value = "";
});

window.addEventListener("load", ladeNotizenStorage);
