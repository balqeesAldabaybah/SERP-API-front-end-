
var searchWord;
var key='a9d8b6c0-aa13-11e9-8dd0-d13f773d2d26'

document.getElementById('search').onclick = (e)=>{
    e.preventDefault()
    searchWord = document.getElementById('value');
    if(!searchWord.value){
      //  $('[data-toggle="popover"]').popover(); 
        $(".error").html("<div style=\"color:red\"> please enter valid search element</div>");
    }else{
        var url = 'https://app.zenserp.com/api/v2/search?q='+searchWord.value+'&hl=en&gl=US&location=United%20States&search_engine=google.com&apikey='+key
        var request = new XMLHttpRequest()
        request.open('GET', url , true)
        request.onload = function (){
            var data = JSON.parse(this.response)
            console.log(data)
            if(request.status>=200 && request.status <=400){
               allTheWork(data)
            }else{
                $(".error").html("<div style=\"color:red\"> <b> Bad Request! Try again </b></div>");
            }
        }
        request.send()
    }
}

function allTheWork(data){
    var cards = [];
    $(".showResults").html("");
   
   data.organic.forEach(element => {
       console.log(element.url)
       const card = document.createElement("div")
       card.setAttribute ("class","card  bg-light text-dark")
       
       const cardBody = document.createElement("div")
       cardBody.setAttribute ("class","card-body")
      

       const cardTitle = document.createElement("h4")
       cardTitle.setAttribute ("class","card-header")

       const cardLink = document.createElement("a")
       cardLink.setAttribute ("class","card-link")
       cardLink.setAttribute ("href",element.url)
       cardLink.textContent = element.title
    
       const cardText = document.createElement("p")
       cardText.setAttribute ("class","card-text")
       cardText.textContent =  element.description

       card.appendChild(cardBody)
       cardTitle.appendChild(cardLink)
       cardBody.appendChild(cardTitle)
       cardBody.appendChild(cardText)

       element.url!=undefined?cards.push(card): console.log("undefined"); 
     //  $(".showResults").append(card);
   });

   console.log(cards.length)
    var size =cards.length;
    var rows = Math.ceil(size/3);
    console.log(rows)
    var cardTrack =0;

    for(var i=0;i<rows;i++){
        const row = document.createElement("div")
        row.setAttribute("class","row")
        for(var j=0;j<3;j++){
            if(cardTrack == size) break
            const col= document.createElement("div")
            col.setAttribute("class","col-sm-4")

            col.appendChild(cards[cardTrack])
            row.appendChild(col)

            cardTrack++
        }
        $(".showResults").append(row);

    }

    if(data.related_searches){ 
        const h5 = document.createElement("h5")
        h5.setAttribute("id","rl")
        const b = document.createElement("b")
        b.textContent = "Related Links:"
        h5.appendChild(b)
        $(".rel-links").append(h5);
        data.related_searches.forEach(element => {
            console.log(element.url)
            const h5 = document.createElement("h5")
            const a = document.createElement("a")
            a.setAttribute ("href",element.url)

            a.textContent = element.title

            h5.appendChild(a)

            $(".rel-links").append(h5);
        });
    }
}