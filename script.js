class Song {
    constructor(group, url, title, listeners,genre) {
        this.group = group;
        this.url = url;
        this.title = title;
        this.listeners = listeners;
        this.genre = genre;
    }

    setItemLi() {
        let li = document.createElement("li");
        li.classList.add("far");
        li.classList.add("fa-play-circle");
        return li;
    }
    setItemGroupName(group, url) {
        let grupo = document.createElement("a");
        grupo.classList.add("group-name");
        grupo.title = "Ir al Grupo";
        grupo.setAttribute("href", url);
        grupo.innerHTML = group;
        return grupo;
    }
    setItemSongTitle(title) {
        let titulo = document.createElement("a");
        titulo.classList.add("song-title");
        titulo.innerHTML = title;
        return titulo;
    }
    setListeners(listeners) {
        let lis = document.createElement("div");
        lis.classList.add("listeners");
        lis.innerHTML = listeners;
        return lis;
    }
    //group,url,title,listeners
    getNewElement() {
        let item = this.setItemLi();
        item.appendChild(this.setItemGroupName(this.group, this.url));
        item.appendChild(this.setItemSongTitle(this.title));
        item.appendChild(this.setListeners(this.listeners));
        return item;
    }

}
let songs = [];

const loadGenero = (e)=>{
    changeFocus(e); 
    let temp =[]; 
    songs.forEach((i)=>{
        if(i.genre.toLowerCase() == e.path[0].innerHTML.toLowerCase()){
            temp.push(i);
        }
    });
    console.log(temp);
    loadSongs(temp);
}

const loadSongs = (lista) => {
    let div = document.querySelector(".lista");
    div.innerHTML = "";
    lista.forEach(i => {
        div.appendChild(i.getNewElement());
    });

}

const loadOverview = () => {
    let overview = document.querySelector('[href="#Overview"]');
    overview.focus();
    document.querySelector(".menu-item-selected").innerHTML = overview.innerHTML;

    loadSongs(songs);
}

const loadTenListened = (e) => {

    changeFocus(e);

    let temp = [];
    temp = [...songs];
    temp.sort((a, b) => {
        if (a.listeners > b.listeners) {
            return 1;
        }
        if (a.listeners < b.listeners) {
            return -1;
        }
        return 0;
    });
    temp.length = 10;
    loadSongs(temp);
}

const loadBiggest = (e) => {
    changeFocus(e);

    //sumar escuchas por artista
    let artistas = [];
    let add = true;
    let temp =[];

    songs.map((e)=>{
        add = true;
        artistas.forEach((i)=>{
            
            if(i.group ==e.group){
                i.listeners =parseInt(i.listeners)+parseInt(e.listeners);
                add =false;
            }
        })
        if(add){

            artistas.push(new Song(e.group,e.url,e.title,e.listeners));
        }
    }); 

    artistas.sort((a,b)=>{
        if (a.listeners < b.listeners) {
            return 1;
        }
        if (a.listeners > b.listeners) {
            return -1;
        }
        return 0;
    }); 

    songs.map((e)=>{
        if(e.group == artistas[0].group){
            temp.push(e);
        }
    });
    loadSongs(temp);

}

const init = () => {
    //cargamos datos, creamos objetos propios, focus OverView
    fetch("./music.json")
        .then(data => data.json())
        .then(json => {
            json.forEach(i => {
                songs.push(new Song(i.artist.name, i.artist.url, i.name, i.listeners,i.genre));
            });
            loadOverview();
        });

    //asignamos eventos onClick
    document.querySelector('[href="#Overview"]').addEventListener("click", loadOverview);
    document.querySelector('[href="#Top10Listened"]').addEventListener("click", loadTenListened);
    document.querySelector('[href="#Thebiggest"]').addEventListener("click", loadBiggest);
    document.querySelector('[href="#Rock"]').addEventListener("click", loadGenero);
    document.querySelector('[href="#hip-hop"]').addEventListener("click", loadGenero);
    document.querySelector('[href="#indie"]').addEventListener("click", loadGenero);
    document.querySelector('[href="#jazz"]').addEventListener("click", loadGenero);
    document.querySelector('[href="#reggae"]').addEventListener("click", loadGenero);


}


window.onload = init;

function changeFocus(e) {
    e.path[0].focus();
    document.querySelector(".menu-item-selected").innerHTML = e.path[0].innerHTML;

}
function test() {
    const obj = [
        { "order_number": "9427",
         "brand_name": "Romance",
          "product_name": "Test Brightness",
           "price": "54900",
            "quantity": "1",
             "total_discount": "0",
              "seller_commission_percent": "0.15", "logistic_cost": "3500", "seller_id": "1" }, 
              { "order_number": "9426", "brand_name": "Daytona", "product_name": "Test Finesse", "price": "32000", "quantity": "1", "total_discount": "0", "seller_commission_percent": "0.2", "logistic_cost": "3500", "seller_id": "2" }, 
              { "order_number": "9425", "brand_name": "Romance", "product_name": "Test Rover", "price": "47900", "quantity": "1", "total_discount": "0", "seller_commission_percent": "0.15", "logistic_cost": "3500", "seller_id": "1" }]


    const res = obj.reduce((p, c) => {
        p[c.brand_name] = (p[c.brand_name] || 0) + (c.price * c.quantity) + 1 + c.seller_commission_percent * 1
        return p;
    }, {});


    console.log(res);
}