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
// Mappage des noms de nœuds XML aux balises d'ouverture HTML
const openTagMap = {
    bookstore: `<section class="bookstore">`,
    book: (node) => `<article class="book" data-category="${node.getAttribute('category')}" ${node.hasAttribute('cover') ? `data-cover="${node.getAttribute('cover')}"` : ''}>`,
    title: (node) => `<h2 class="title" lang="${node.getAttribute('lang')}">`,
    author: `<p class="author">`,
    year: `<p class="year">`,
    price: `<p class="price">`
};

// Mappage des noms de nœuds XML aux balises de fermeture HTML
const closingTagMap = {
    bookstore: `</section>`,
    book: `</article>`,
    title: `</h2>`,
    author: `</p>`,
    year: `</p>`,
    price: `</p>`
};

function nodeToHtml(node) {
    let html = ''; // L'attribut qui contiendra le code html

    if (node.nodeType == 1) { // Si le noeud est un élément
        const nodeName = node.nodeName.toLowerCase();

        // Utiliser openTagMap pour ouvrir la balise, avec gestion des fonctions pour les cas spéciaux
        const openTag = typeof openTagMap[nodeName] === 'function' ? openTagMap[nodeName](node) : openTagMap[nodeName] || `<div>`;
        html += openTag;

        for (let i = 0; i < node.childNodes.length; i++) {
            html += nodeToHtml(node.childNodes[i]); // Convertir le noeud en html
        }

        // Utiliser closingTagMap pour fermer la balise
        const closingTag = closingTagMap[nodeName] || `</div>`;
        html += closingTag;
    } else if (node.nodeType == 3) { // Si le noeud est un texte
        html += node.nodeValue; // Ajouter le texte directement
    }

    return html;
}
