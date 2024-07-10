var xhttp = new XMLHttpRequest(); // Créer un objet XMLHttpRequest
xhttp.onreadystatechange = function() { // Quand l'état de la requête change
    if (this.readyState == 4 && this.status == 200) { // Si la requête est terminée et que le statut est 200
        var xml = this.responseText; // Récupérer le contenu de la réponse
        var html = xmlparserToHtml(xml); // Convertir le xml en html
        document.getElementById("content").innerHTML = html; // Afficher le html dans la balise avec l'id "content"
    }
}
xhttp.open("GET", "./xml/mix.xml", true); // Ouvrir une requête GET pour le fichier book.xml
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
        const nodeName = node.nodeName.toLowerCase();

        // Traiter les différents éléments de formulaire
        // Si l'élément est un bouton
        if (nodeName === 'button') {
            const id = node.getAttribute('id');
            const text = node.getAttribute('text');
            const action = node.getAttribute('action');
            html += `<button id="${id}" onclick="${action}">${text}</button>`;
        } 
        // Si l'élément est un menu déroulant
        else if (nodeName === 'select') {
            const id = node.getAttribute('id');
            html += `<select id="${id}">`;
            for (let i = 0; i < node.childNodes.length; i++) {
                if (node.childNodes[i].nodeType === 1) {
                    html += nodeToHtml(node.childNodes[i]);
                }
            }
            html += `</select>`;
        } 
        // Si l'élément est une option
        else if (nodeName === 'option') {
            const value = node.getAttribute('value');
            html += `<option value="${value}">${node.textContent}</option>`;
        } 
        // Si l'élément est un input
        else if (nodeName === 'input') {
            const id = node.getAttribute('id');
            const type = node.getAttribute('type');
            const placeholder = node.getAttribute('placeholder');
            html += `<input id="${id}" type="${type}" placeholder="${placeholder}" />`;
        } 
        // Si l'élément est un label
        else {
            // Ouvrir la balise en utilisant le nom de l'élément XML et ses attributs
            html += `<div class="${nodeName}" ${attributesToHtml(node.attributes)}>`;

            for (let i = 0; i < node.childNodes.length; i++) {
                html += nodeToHtml(node.childNodes[i]); // Convertir le noeud en html
            }

            // Fermer la balise
            html += `</div>`;
        }
    } 
    // Si le noeud est un texte
    else if (node.nodeType == 3) { 
        html += node.nodeValue; // Ajouter le texte directement
    }

    return html;
}

function attributesToHtml(attributes) {
    let html = '';
    for (let i = 0; i < attributes.length; i++) {
        html += ` data-${attributes[i].name}="${attributes[i].value}"`;
    }
    return html;
}
