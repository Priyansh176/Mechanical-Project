var forces = 1

var p3 = document.querySelector("#p3")

let btn1 = document.querySelector("#btnconfirm")
btn1.addEventListener("click",genLine)

function genLine(){
    forces = document.querySelector("select").value
    if(forces == '2'){
        let el1 = document.createElement("p")
        let p1 = document.querySelector("#p1")
        el1.innerHTML = '<p id="p2">Distance of second force from extreme left<input type="text" placeholder="in m" id="f2" class="inputBox"></p><br>'
        p1.after(el1)
        btn1.disabled = true        
    }
    if(forces == '3'){
        let el1 = document.createElement("p")
        let p1 = document.querySelector("#p1")
        el1.innerHTML = '<p id="p2">Distance of second force from extreme left<input type="text" placeholder="in m" id="f2" class="inputBox"></p><br>'
        p1.after(el1)
        let el2 = document.createElement("p")
        let p2 = document.querySelector("#p2")
        el2.innerHTML = '<p id="p3">Distance of third force from extreme left<input type="text" placeholder="in m" id="f3" class="inputBox"></p><br>'
        p2.after(el2)
        btn1.disabled = true
    }
}


let button = document.querySelector("#btn");
button.onclick = () => {
    if(forces=='1'){
        var dist1 = document.querySelector("#f1").value
    }
    else if(forces=='2'){
        var dist1 = document.querySelector("#f1").value
        var dist2 = document.querySelector("#f2").value
    }
    else if(forces=='3'){
        var dist1 = document.querySelector("#f1").value
        var dist2 = document.querySelector("#f2").value
        var dist3 = document.querySelector("#f3").value
    }
}
