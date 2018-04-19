// import du framework "express"
var express = require("express");
var bodyParser = require("body-parser");

// création d'un objet "express"
var app = express();
app.listen(8181, "192.168.1.59");
console.log("Server Open...");

var listeDeMenus = [
    {
        id: 1,
        nom: "menu A",
        entree: {
            nom: "entrée A",
            prix: 0.00
        },
        plat: {
            nom: "plat A",
            prix: 0.00
        },
        dessert: {
            nom: "dessert A",
            prix: 0.00
        }
    },
    {
        id: 2,
        nom: "menu B",
        entree: {
            nom: "entrée B",
            prix: 0.00
        },
        plat: {
            nom: "plat B",
            prix: 0.00
        },
        dessert: {
            nom: "dessert B",
            prix: 0.00
        }
    },
    {
        id: 3,
        nom: "menu C",
        entree: {
            nom: "entrée C",
            prix: 0.00
        },
        plat: {
            nom: "plat C",
            prix: 0.00
        },
        dessert: {
            nom: "dessert C",
            prix: 0.00
        }
    }

];

var listeDeCartes = [
    {
        id: 1,
        nom: "carte 1",
        menu: [1, 2]
    },
    {
        id: 2,
        nom: "carte 2",
        menu: [3, 2]
    },
    {
        id: 3,
        nom: "carte 2",
        menu: [1]
    }

];

/////////////////////////////////////////////////////////////////////////////////////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// retourne toutes les cartes
app.get("/cartes/get", function (request, response) {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader("content-Type", "application/json");
    response.status(200).json(listeDeCartes);
});

/////////////////////////////////////////////////////////////////////////////////////

// génération de l'id d'une Carte
function generateIdCarte() {
    var idMax = 0;
    for (var i in listeDeCartes) {
        if (listeDeCartes[i].id > idMax) {
            idMax = listeDeCartes[i].id;
        }
    }
    return idMax + 1;
}

/////////////////////////////////////////////////////////////////////////////////////

// retourne une carte par son id
app.get("/cartes/:id/get", function (request, response) {

    response.setHeader('Access-Control-Allow-Origin', '*');
            let idCarte = parseInt(request.params.id);
            let
    aCarte;
            for (var i = 0; i < listeDeCartes.length; i++) {
        aCarte = listeDeCartes[i];
        if (idCarte === listeDeCartes[i].id) {
            response.setHeader("content-Type", "application/json");
            response.status(200).json(aCarte);
        }
    }
    response.status(404).send("carte inconnue");
});

/////////////////////////////////////////////////////////////////////////////////////

// ajoute une nouvelle carte et retourne son id   
app.post("/cartes/add", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
            let
    bCarte = req.body;
            bCarte["id"] = generateIdCarte();

    listeDeCartes.push(bCarte);
    res.status(200).json(req.body);

});

/////////////////////////////////////////////////////////////////////////////////////

// supprime la carte sélectionnée et tous les menus correspondants
app.get("/cartes/:id/remove", function (request, response) {

    response.setHeader('Access-Control-Allow-Origin', '*');
            let idCarte = parseInt(request.params.id);
            let
    aCarte;
            for (var i = 0; i < listeDeCartes.length; i++) {
        aCarte = listeDeCartes[i];
        if (idCarte === listeDeCartes[i].id) {
            listeDeCartes.splice(i, 1);
            response.status(200).json(aCarte);
            response.setHeader("content-Type", "application/json");
            break;

        }
    }

});

/////////////////////////////////////////////////////////////////////////////////////

// retourne tous les menus de toutes les cartes
app.get("/menus/get", function (request, response) {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader("content-Type", "application/json");
    response.status(200).json(listeDeMenus);
});

/////////////////////////////////////////////////////////////////////////////////////

// retourne le menu sélectionné
app.get("/cartes/menus/:id/get", function (request, response) {

    response.setHeader('Access-Control-Allow-Origin', '*');
            let idMenu = parseInt(request.params.id);
            let
    aMenu;
            for (var i = 0; i < listeDeMenus.length; i++) {
        aMenu = listeDeMenus[i];
        if (idMenu === listeDeMenus[i].id) {
            response.setHeader("content-Type", "application/json");
            response.status(200).json(aMenu);
        }
    }
    response.status(404).send("carte inconnue");
});

/////////////////////////////////////////////////////////////////////////////////////

// génération de l'id d'un Menu
function generateIdMenu() {
    var idMax = 0;
    for (var i in listeDeMenus) {
        if (listeDeMenus[i].id > idMax) {
            idMax = listeDeMenus[i].id;
        }
    }
    return idMax + 1;
}

/////////////////////////////////////////////////////////////////////////////////////

// ajoute un menu et retourne l’id du menu créé   
app.post("/menus/add", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var bMenu = req.body;
    bMenu["id"] = generateIdMenu();

    listeDeMenus.push(bMenu);
    res.status(200).json();

});

/////////////////////////////////////////////////////////////////////////////////////

// supprime le menu sélectionnée 
app.get("/cartes/menus/:id/remove", function (request, response) {

    response.setHeader('Access-Control-Allow-Origin', '*');
            let idMenu = parseInt(request.params.id);
            let aMenu;
            for (var i = 0; i < listeDeMenus.length; i++) {
        aMenu = listeDeMenus[i];
        if (idMenu === listeDeMenus[i].id) {
            listeDeMenus.splice(i, 1);
            response.status(200).json();
            break;

        }
    }

});

/////////////////////////////////////////////////////////////////////////////////////

// supprime le menu d'une carte 
app.get("/cartes/:id/menus/:idMenu/remove", function (request, response) {

    response.setHeader('Access-Control-Allow-Origin', '*');
            let idCarte = parseInt(request.params.id);
            let idMenu = parseInt(request.params.idMenu);
            
    for (var j = 0; j < listeDeCartes.length; j++) {

        for (var i = 0; i < listeDeCartes[j].menu.length; i++) {
            
            if (idMenu === listeDeCartes[j].menu[i].id) {
                listeDeCartes[j].menu[i].splice(i, 1);
                response.status(200).json();
            }
        }
    }



});


/////////////////////////////////////////////////////////////////////////////////////

// retourne tous les menus de la carte sélectionnée
app.get("/cartes/:id/menus/get", function (request, response) {

    response.setHeader('Access-Control-Allow-Origin', '*');
            let idCarte = parseInt(request.params.id);
            let
    aCarte;
            for (var i = 0; i < listeDeCartes.length; i++) {
        aCarte = listeDeCartes[i];
        if (idCarte === aCarte.id) {
            response.setHeader("content-Type", "application/json");
            console.log(aCarte.listeDeMenus);
            response.status(200).json(aCarte.menu);
        }
    }
    response.status(404).send("carte inconnue");
});

/////////////////////////////////////////////////////////////////////////////////////

