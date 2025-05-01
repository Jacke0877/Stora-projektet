function redirectDashboard() {
    window.location.replace("../dashboard/");
}

let totalSets = 0;
let totalReps = 0;
let totalWeight = 0;

document.getElementById("addExerciseButton").addEventListener("click", function() {
    // Skapa en ny div för övningen
    const exerciseContainer = document.getElementById("exercisecontainer");
    const newExercise = document.createElement("div");
    const setArray = [];
    newExercise.className = "exercise";
    newExercise.innerHTML = `
    <input class="exerciseNameInput" type="text" placeholder="Övningens namn">
    <div class="setsContainer"></div>
    <button class="addSetButton"><strong>Lägg till set<strong/></button>
    <button class="removeExerciseButton"><strong>Ta bort<strong/></button>
    `;
    // Lägg till den nya övningen i containern
    exerciseContainer.appendChild(newExercise);

    // Gör så att knappen för att lägga till set fungerar
    const setsContainer = newExercise.querySelector(".setsContainer");
    const addSetButton = newExercise.querySelector(".addSetButton");
    let setCount = 0;
    
    // Lägg till en event listener för knappen lägg till set
    addSetButton.addEventListener("click", function() {
        setCount++;
        totalSets++;
        document.getElementById("totalSets").textContent = `${totalSets}`;
        console.log(totalSets);
        // Skapa en ny div för set
        const setDiv = document.createElement("div");
        setDiv.className = "set";
        setDiv.innerHTML = `
            <span class="setCount">Set ${setCount}:</span>
            <input class="repInput" type="number" placeholder="Reps">
            <input class="weightInput" type="number" placeholder="Vikt">
            <button class="removeSetButton">Ta bort set</button>
        `;
        // Lägg till den nya set-diven i setsContainer
        setsContainer.appendChild(setDiv);
        // Lägger till setDiv i setArray
        setArray.push(setDiv);

        previousReps = 0;

        // Lägger till event listener för reps input
        setDiv.querySelector(".repInput").addEventListener("input", function() {
            // Hämta värdet från inputfältet och konvertera det till ett heltal
            const reps = parseInt(this.value);
            // Om värdet är ett giltigt heltal, lägg till det i totalReps
            if (!isNaN(reps)) {
                if (previousReps !== 0) {
                    // Tar bort tidigare reps från totalReps
                    totalReps -= previousReps;
                }
                previousReps = reps;
                totalReps += reps;
                // Uppdatera totalReps i sidan
                document.getElementById("totalReps").textContent = `${totalReps}`;
                console.log(`totalreps ${totalReps}`);
            }
        }
        );

        previousWeight = 0;
        // Lägger till event listener för vikt input
        setDiv.querySelector(".weightInput").addEventListener("input", function() {
            const weight = parseInt(this.value);
            // Hämta antal reps från reps input
            const reps = parseInt(setDiv.querySelector(".repInput").value);
            if (!isNaN(weight)) {
                if (previousWeight >= 0) {
                    totalWeight -= previousWeight * reps;
                }
                previousWeight = weight;
                totalWeight += weight * reps;
                document.getElementById("totalWeight").textContent = `${totalWeight} kg`;
                console.log(totalWeight);

            }
        }
        );

        setDiv.querySelector(".removeSetButton").addEventListener("click", function() {
            totalSets--;
            console.log(totalSets);
            // Hittar index av setDiv som man har klickat på
            const index = setArray.indexOf(setDiv);
            // Tar bort setDiv från DOM och från setArray
            setArray.splice(index, 1);
            setsContainer.removeChild(setDiv);
            
            // Updatera setCount för de som är kvar
            setArray.forEach((set, i) => {
                set.querySelector(".setCount").textContent = `Set ${i + 1}:`;
            });
            setCount = setArray.length;
        });
    });

    newExercise.querySelector(".removeExerciseButton").addEventListener("click", function() {
        exerciseContainer.removeChild(newExercise);
        totalReps = totalReps - setCount;
    })



});