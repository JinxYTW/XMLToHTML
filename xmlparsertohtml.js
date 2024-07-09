
var xhttp = new XMLHttpRequest(); // Créer un objet XMLHttpRequest
xhttp.onreadystatechange = function() { // Quand l'état de la requête change
    if (this.readyState == 4 && this.status == 200) { // Si la requête est terminée et que le statut est 200
        var xml = this.responseText; // Récupérer le contenu de la réponse
        var html = xmlparserToHtml(xml); // Convertir le xml en html
        document.getElementById("content").innerHTML = html; // Afficher le html dans la balise avec l'id "content"
    }
}
xhttp.open("GET", "book.xml", true); // Ouvrir une requête GET pour le fichier book.xml
xhttp.send(); // Envoyer la requête

function xmlparserToHtml(xml) {
    var html = ''; // L'attribut qui contiendra le code html
    var parser = new DOMParser(); // L'XML parser
    var xmlDoc = parser.parseFromString(xml, "text/xml"); // Parse le xml
    var nodes = xmlDoc.documentElement.childNodes; // Récupère les noeuds du document,c'est à dire les noeuds enfants du noeud racine genre les <>
    for (var i = 0; i < nodes.length; i++) {

        html += nodeToHtml(nodes[i]);// Convertir le noeud en html

    }
    console.log(html);
    return html;

}

function nodeToHtml(node) {
    let html = ''; // L'attribut qui contiendra le code html

    if (node.nodeType == 1) { // Si le noeud est un élément
        // Choisir la balise HTML en fonction du nodeName
        switch (node.nodeName.toLowerCase()) {
            case 'bookstore':
                html += `<section class="bookstore">`;
                break;
            case 'book':
                html += `<article class="book" data-category="${node.getAttribute('category')}" ${node.hasAttribute('cover') ? `data-cover="${node.getAttribute('cover')}"` : ''}>`;
                break;
            case 'title':
                html += `<h2 class="title" lang="${node.getAttribute('lang')}">`;
                break;
            case 'author':
            case 'year':
            case 'price':
                html += `<p class="${node.nodeName.toLowerCase()}">`;
                break;
            default:
                html += `<div>`;
        }

        for (let i = 0; i < node.childNodes.length; i++) {
            html += nodeToHtml(node.childNodes[i]); // Convertir le noeud en html
        }

        // Fermer la balise HTML appropriée
        switch (node.nodeName.toLowerCase()) {
            case 'bookstore':
                html += `</section>`;
                break;
            case 'book':
                html += `</article>`;
                break;
            case 'title':
                html += `</h2>`;
                break;
            case 'author':
            case 'year':
            case 'price':
                html += `</p>`;
                break;
            default:
                html += `</div>`;
        }
    } else if (node.nodeType == 3) { // Si le noeud est un texte
        html += node.nodeValue; // Ajouter le texte directement
    }
    return html;
}

