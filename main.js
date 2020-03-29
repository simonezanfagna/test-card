// seleziono tutte le a contenute in "card-trigger"
var a = document.querySelectorAll('ul li a');
// faccio un ciclo for che mi permette di aggiungere a tutte le a l'evento click
for (var i = 0; i < a.length; i++) {
  // aggiungo l'evento click alla a nella posizione i
  a[i].addEventListener('click', function () {
    // prendo l'attributo data-sku della a che è stata cliccata
    var data_sku = this.getAttribute('data-sku');
    // avvio una chiamata api per recuperare il contenuto della card associata al data-sku
    var request = new XMLHttpRequest();
    request.open('GET', 'https://jsonplaceholder.typicode.com/posts/'+ data_sku, true);
    request.onload = function() {

      var data = JSON.parse(this.response)
      if (request.status >= 200 && request.status < 400) {
        // prendo i dati contenuti
        var title = data.title;
        var body = data.body;
        // prima di mostrare la card, faccio un controllo per vedere se la card è già presente del div con id = "cards-holder"
        var allCards = document.querySelectorAll('#cards-holder div');

        // imposto una variabile che mi servirà da contatore
        // questa variabile verrà incrementata solo se nel "cards-holder" la card è già presente
        var c = 0;
        // faccio un ciclo che mi permette di capire,
        // attraverso un confronto tra l'attributo della card presente nel "cards-holder" e
        // l'attributo data-sku della a,
        // se la card è già presente del "cards-holder"
        // (l'attributo data-sku lo assegno succesivamente perchè di sicuro
        // al primo click sulla a , non sono presenti card nel "cards-holder")
        for (var i = 0; i < allCards.length; i++) {
          var attribute = allCards[i].getAttribute('data');
          if (attribute == data_sku) {
            c++;
          }
        }
        // se la variabile c è uguale a 0 allora creo la card
        if (c == 0) {
          // creo la card e le assegno la classe "card" e il data "data_sku"
          var card = document.createElement('div');
          card.setAttribute('class', 'card');
          card.setAttribute('data', data_sku);
          // creo un h3 e gli assegno la variabile title creata in precedenza
          var h3 = document.createElement('h3');
          h3.textContent = title;
          // creo un p e gli assegno la variabile body creata in precedenza
          var p = document.createElement('p');
          p.textContent = body;
          // creo un button con attributo onclick=elimina(data_sku)
          // (permette di eliminare solo la card che contiene il button su cui si clicca)
          var button = document.createElement('button');
          button.textContent = 'Elimina';
          button.setAttribute('onclick', 'elimina('+ data_sku + ')');
          // faccio append dei vari elemeti
          document.getElementById('cards-holder').appendChild(card);
          card.appendChild(h3);
          card.appendChild(p);
          card.appendChild(button);
        }

      } else {
        alert('errore');
      }
    }

    request.send()
  });
}

// aggiungo alla a con id = "remover" l'evento click per svotare il "cards-holder"
// la funzione associata al click avvia un ciclo while che elimina tutte le card
document.querySelector('#remover').addEventListener('click', function () {

  var containerCards = document.getElementById("cards-holder");
  while (containerCards.firstChild) {
    containerCards.removeChild(containerCards.lastChild);
  }

})

// questa funzione permette di eliminare solo la card scelta attraverso il click
// sul button 'eminina' della card stessa
function elimina(n) {
  document.querySelector('.card[data="'+ n +'"]').remove('div.card');
}

// aggiungo l'evento click sull'icona per la gestione del menu in modalità mobile
document.querySelector('i').addEventListener('click', function () {
  var menu = document.getElementById("card-trigger");
  menu.classList.toggle("active")
})
