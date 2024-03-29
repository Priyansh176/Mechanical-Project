let btn1 = document.querySelector("#btnconfirm")
btn1.addEventListener("click",confirmVals1)

let btn2 = document.querySelector("#btncalculate")
btn2.addEventListener("click",calculateShearForceAndBendingMoment)

function confirmVals1(){
    let forces = Number(document.querySelector("#force").value)
    let length = Number(document.querySelector("#length").value)

    if(forces <= 0 || length <= 0){
        alert("Enter a positive value")
    }
    else{
        generateArrows(forces)
    }
}

function generateArrows(n){
    let beam = document.querySelector("#beam")
    let beamlength = beam.offsetWidth
    let distanceBetweenArrows = beamlength/(n+1)

    for(let i = 1; i<=n; i++){
        let arrow = document.createElement('i')
        arrow.className = 'arrow fa-solid fa-down-long'
        let position = i * distanceBetweenArrows
        arrow.style.left = position + 'px'
        beam.parentElement.appendChild(arrow)

        let distanceHolder = document.createElement('input')
        distanceHolder.className = 'inputBox2'
        distanceHolder.id = "dist" + i
        distanceHolder.style.left = position + 'px'
        distanceHolder.style.top = 'calc(50% - 100px)'
        distanceHolder.placeholder = 'in m'
        beam.parentElement.appendChild(distanceHolder)

        let forceHolder = document.createElement('input')
        forceHolder.className = 'inputBox2'
        forceHolder.id = "force" + i
        forceHolder.style.left = position + 'px'
        forceHolder.style.top = 'calc(50% - 140px)'
        forceHolder.placeholder = 'in kN'
        beam.parentElement.appendChild(forceHolder)
    }
}


function calculateShearForceAndBendingMoment() {
    let forces = Number(document.querySelector("#force").value) 
    let length = Number(document.querySelector("#length").value)

    //Array to store values -- [distance,magnitude] of forces
    let loads_unsorted = []
    for (let c = 1; c <= forces; c++) {
        loads_unsorted[c-1] = [Number(document.getElementById("dist" + c).value) , Number(document.getElementById("force" + c).value)]
    }

    //Sort above array on the basis of distance 
    loads = loads_unsorted.sort (
        function (a,b) {
            if (a[0] === b[0]) {
                return 0;
            } else {
                return (a[0] < b[0]) ? -1 : 1;
            }
        }
    )

    //Empty arrays to store shear force and bending moment values for ploting graph
    let shearForce = []
    let bendingMoment = []
    let xValues = []

    //Reactions at supports
    let i = 0
    let reactionA = 0
    let reactionB = 0

    for(i in loads){
        reactionA += loads[i][1] * (length - loads[i][0]) / length
        reactionB += loads[i][1] * loads[i][0] / length
    } 

    //Calculate shear force and bending moment at particular points on the beam
    for (let x = 0; x <= length; x+=0.001) {
        //Shear force
        let j = 0
        let shear = reactionA
        for(j in loads){
            if (loads[j][0] < x) {
                shear -= loads[j][1]
            }
        }
        shearForce.push(shear)

        //Bending moment at x
        let moment = reactionA * x
        let k = 0
        for(k in loads){
            if (loads[k][0] < x) {
                moment -= loads[k][1] * (x - loads[k][0])
            }
        }
        bendingMoment.push(moment)
        
        xValues.push(x)
    }

    plotGraph(shearForce, bendingMoment, xValues)
}


function plotGraph(shearForce, bendingMoment, xValues){
    const data1 = [{
        x: xValues,
        y: shearForce,
        mode: "lines",
      }]
      
      const data2 = [{
          x: xValues,
          y: bendingMoment,
          mode: "lines",
        }]
      
      const layout1 = {title: "SFD"}
      const layout2 = {title: "BMD"}
      
      Plotly.newPlot("SFD", data1, layout1)
      Plotly.newPlot("BMD", data2, layout2)
}