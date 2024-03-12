var forces = 1

var p3 = document.querySelector("#p3")

let btn1 = document.querySelector("#btnconfirm")
btn1.addEventListener("click",genLine)

function genLine(){
    forces = document.querySelector("select").value
    if(forces == '2'){
        let el1 = document.createElement("p")
        let p1 = document.querySelector("#p1")
        el1.innerHTML = '<p id="p2">Distance from extreme left and Magnitude of second force<input type="text" placeholder="in m" id="f2" class="inputBox"><input type="text" placeholder="in N" id="F2" class="inputBox"></p><br>'
        p1.after(el1)
        document.querySelector("#pF1").style.visibility = "visible"
        document.querySelector("#pF2").style.visibility = "visible"
        document.querySelector("#pF3").style.visibility = "hidden"
        btn1.disabled = true        
    }
    if(forces == '3'){
        let el1 = document.createElement("p")
        let p1 = document.querySelector("#p1")
        el1.innerHTML = '<p id="p2">Distance from extreme left and Magnitude of second force<input type="text" placeholder="in m" id="f2" class="inputBox"><input type="text" placeholder="in N" id="F2" class="inputBox"></p><br>'
        p1.after(el1)
        let el2 = document.createElement("p")
        let p2 = document.querySelector("#p2")
        el2.innerHTML = '<p id="p3">Distance from extreme left and Magnitude of third force<input type="text" placeholder="in m" id="f3" class="inputBox"><input type="text" placeholder="in N" id="F3" class="inputBox"></p><br>'
        p2.after(el2)
        document.querySelector("#pF1").style.visibility = "visible"
        document.querySelector("#pF2").style.visibility = "visible"
        document.querySelector("#pF3").style.visibility = "visible"
        btn1.disabled = true
    }
}


let button = document.querySelector("#btn");
button.addEventListener("click",getVals)


function getVals(){
    if(forces=='1'){
        var dist1 = document.querySelector("#f1").value
        var force1 = document.querySelector("#F1").value
        var length = document.querySelector("#f0").value
        let load = [[dist1,-force1]]
        
        function reactions_sfbdCalc(){
            let Vb = (-load[0][0]*load[0][1])/length
            let Va = -load[0][1]-Vb
            
            let sf_1 = Va
            let m_1 = Va*load[0][0]
            let sf_2 = -Vb
        
            let reactions_sfbd = [Va,Vb,sf_1,sf_2,m_1]
            return reactions_sfbd
        }

        let valuesForPlot = reactions_sfbdCalc()

        const xValues1 = []
        const yValues1 = []
        const xValues2 = [0,load[0][0],length]
        const yValues2 = [0,valuesForPlot[4],0]

        for (let x = 0; x <= length; x += 0.001) {
            if(x <= load[0][0]){
                yValues1.push(valuesForPlot[2])
                xValues1.push(x);
            }
            else if(x >= load[0][0]){
                yValues1.push(valuesForPlot[3])
                xValues1.push(x)
            }
        }       

        const data1 = [{
            x: xValues1,
            y: yValues1,
            mode: "lines"
        }]

        const data2 = [{
            x:xValues2,
            y:yValues2,
            mode: "lines"
        }]

        const layout1 = {title: "SFD"}
        const layout2 = {title: "BMD"}

        Plotly.newPlot("SFD", data1, layout1)
        Plotly.newPlot("BMD", data2, layout2)

        document.querySelector("#SFD").style.border = "2px solid black"
        document.querySelector("#BMD").style.border = "2px solid black"

    }

    else if(forces=='2'){
        var length = document.querySelector("#f0").value
        var dist1 = document.querySelector("#f1").value
        var dist2 = document.querySelector("#f2").value
        var force1 = document.querySelector("#F1").value
        var force2 = document.querySelector("#F2").value
        let load = [[dist1,-force1],[dist2,-force2]]
        
        function reactions_sfbdCalc(){
            let Vb = ((-load[0][0]*load[0][1])+(-load[1][0]*load[1][1]))/length
            let Va = -load[0][1]-load[1][1]-Vb
        
            let sf_1 = Va
            let sf_2 = Va + load[0][1]
            let sf_3 = -Vb
            let m_1 = Va*load[0][0]
            let m_2 = Vb*(length-load[1][0])
        
            let reactions_sfbd = [Va,Vb,sf_1,sf_2,sf_3,m_1,m_2]
            return reactions_sfbd
        }

        let valuesForPlot = reactions_sfbdCalc()

        const xValues1 = []
        const yValues1 = []
        const xValues2 = [0,load[0][0],load[1][0],length]
        const yValues2 = [0,valuesForPlot[5],valuesForPlot[6],0]

        for (let x = 0; x <= length; x += 0.001) {
            if(x <= load[0][0]){
                yValues1.push(valuesForPlot[2])
                xValues1.push(x);
            }
            else if(x >= load[0][0] && x<=load[1][0]){
                yValues1.push(valuesForPlot[3])
                xValues1.push(x)
            }
            else if(x >= load[1][0]){
                yValues1.push(valuesForPlot[4])
                xValues1.push(x)
            }
        }       

        const data1 = [{
            x: xValues1,
            y: yValues1,
            mode: "lines"
        }]

        const data2 = [{
            x:xValues2,
            y:yValues2,
            mode: "lines"
        }]

        const layout1 = {title: "SFD"}
        const layout2 = {title: "BMD"}

        Plotly.newPlot("SFD", data1, layout1)
        Plotly.newPlot("BMD", data2, layout2)

        document.querySelector("#SFD").style.border = "2px solid black"
        document.querySelector("#BMD").style.border = "2px solid black"

    }

    else if(forces=='3'){
        var length = document.querySelector("#f0").value
        var dist1 = document.querySelector("#f1").value
        var dist2 = document.querySelector("#f2").value
        var dist3 = document.querySelector("#f3").value
        var force1 = document.querySelector("#F1").value
        var force2 = document.querySelector("#F2").value
        var force3 = document.querySelector("#F3").value
        let load = [[dist1,-force1],[dist2,-force2],[dist3,-force3]]
        
        function reactions_sfbdCalc(){
            let Vb = ((-load[0][0]*load[0][1])+(-load[1][0]*load[1][1])+(-load[2][0]*load[2][1]))/length
            let Va = -load[0][1]-load[1][1]-load[2][1]-Vb
        
            let sf_1 = Va
            let sf_2 = Va + load[0][1]
            let sf_3 = -load[2][1] - Vb
            let sf_4 = -Vb
            let m_1 = Va*load[0][0]
            let m_2 = Va*load[1][0] + load[0][1]*(load[1][0]-load[0][0])
            let m_3 = Vb*(length-load[2][0])
        
            let reactions_sfbd = [Va,Vb,sf_1,sf_2,sf_3,sf_4,m_1,m_2,m_3]
            return reactions_sfbd
        }

        let valuesForPlot = reactions_sfbdCalc()

        const xValues1 = []
        const yValues1 = []
        const xValues2 = [0,load[0][0],load[1][0],load[2][0],length]
        const yValues2 = [0,valuesForPlot[6],valuesForPlot[7],valuesForPlot[8],0]

        for (let x = 0; x <= length; x += 0.001) {
            if(x <= load[0][0]){
                yValues1.push(valuesForPlot[2])
                xValues1.push(x);
            }
            else if(x >= load[0][0] && x<=load[1][0]){
                yValues1.push(valuesForPlot[3])
                xValues1.push(x)
            }
            else if(x >= load[1][0] && x<=load[2][0]){
                yValues1.push(valuesForPlot[4])
                xValues1.push(x)
            }
            else if(x >= load[2][0]){
                yValues1.push(valuesForPlot[5])
                xValues1.push(x)
            }
        }       

        const data1 = [{
        x: xValues1,
        y: yValues1,
        mode: "lines"
        }]

        const data2 = [{
            x:xValues2,
            y:yValues2,
            mode: "lines"
        }]

        const layout1 = {title: "SFD"}
        const layout2 = {title: "BMD"}

        Plotly.newPlot("SFD", data1, layout1)
        Plotly.newPlot("BMD", data2, layout2)

        document.querySelector("#SFD").style.border = "2px solid black"
        document.querySelector("#BMD").style.border = "2px solid black"
    }
}