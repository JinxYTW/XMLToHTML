# XML To HTML
Voici un petit projet personnel que j'ai réalisé afin de comprendre le format XML dans un premier temps à l'aide du site W3schools.
Par la suite, ayant entendu lors d'un stage la possibilité de créer une page HTML en partant d'un fichier XML, je m'y suis essayé avec des XML assez basiques.

# Progrès
Voici l'avancement et l'évolution du projet :

## Book_Version

Cette version est celle avec laquelle j'ai commencé, et qui a connu certaines optimisations, où j'avoue avoir utilisé l'intelligence artificielle pour obtenir la forme qui se trouve sur mon GitHub.
En effet, la version précédente comportait énormément de *case*, ce qui rendait le tout peu lisible et peu extensible.

## Universal_Version

Ici, je suis parti de la book_version, et j'ai essayé d'en faire quelque chose de plus universelle comme l'indique le titre.
En effet, avant j'ai essayé des nouvelles balises html, avec un peu plus de personnalisation avancée.
Cependant, je trouvais que l'intérêt de passer d'un fichier XML à de l'HTML était simplement de créer quelque chose rapidement sans trop être permissif.
Je suis donc parvenu à coder cette version qui fonctionne dans pas mal de cas, même si du côté du css *styleun.css*, il manque un petit quelque chose.

# Prise en charge

 1. Balise simple
 2. Bouton (si le nom de la balise XML est button)
 3. Input (si le nom de la balise XML est input)
 4. Select (si le nom de la balise XML est select)
 5. Option ((si le nom de la balise XML est option)
 6. Gestion des Attributs
 7. Gestion du texte

## How to use
On *xmlparsertohtml.js*, replace book.html in line 9.
 

```