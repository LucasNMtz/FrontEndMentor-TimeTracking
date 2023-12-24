const optionButtons = document.querySelectorAll(".option-button");
const textContainers = document.querySelectorAll(".section-text-container__bottom-div");
let date = "";
let timeframeDate = "";

optionButtons.forEach((button, buttonIndex) => {
    button.addEventListener("click", () => {
        optionButtons.forEach(otherButton => {
            otherButton.style.color = "var(--Desaturated-blue)";
        });
        switch (buttonIndex) {
            case 0:
                date = "Day";
                timeframeDate = "daily";                
                break;
            case 1:
                date = "Week";
                timeframeDate = "weekly";        
                break;
            case 2:
                date = "Month";
                timeframeDate = "monthly";        
                break;
            default:
                break;
        }
        button.style.color = "#fff";
        fetch("data.json")
            .then(res => res.json())
            .then(data => {
                textContainers.forEach((container, containerIndex) => {
                    const timeframe = data[containerIndex].timeframes[timeframeDate];
                    container.children.item(0).textContent = `${timeframe ? timeframe.current : 'N/A'}hrs`;
                    container.children.item(1).textContent = `Last ${date} - ${timeframe ? timeframe.previous : 'N/A'}hrs`;
                });
            })
            .catch(error => console.error("Error fetching data:", error));
    })
})