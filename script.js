const defaultColor = "Purple";
const colors = {
    Purple: "#903c84",
    Blue: "#3c5e90",
    Red: "#903c3c"
};
let currentColor = defaultColor;
const information = {
    firstname: "Lucas",
    lastname: "GOSGNACH",
    job: "DevOps - FullStack Web developer",
    imageProfil: "profil.png",
    iconMedal: "&#129351;",
    textMedal: "WorldSkills France, 2023"
};

const main = () => {
    const generateInfoCard = (data) => {
        const template = document.querySelector('template#card').content.cloneNode(true).firstElementChild;
        let cardContent = template.innerHTML;
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                cardContent = cardContent.replace(`{${key}}`, data[key]);
            }
        }
        template.innerHTML = cardContent;
        document.querySelector('#contentCard').appendChild(template);
    };

    generateInfoCard(information);

    const $select = document.querySelector('#select');
    const $element = document.querySelector('.bottom');

    for (const colorName in colors) {
        const option = document.createElement('option');
        option.value = colorName;
        option.textContent = colorName;
        $select.appendChild(option);
    }

    $select.addEventListener('change', () => {
        currentColor = colors[$select.value];
        $element.style.backgroundColor = currentColor;
        drawCanvas(currentColor,information["lastname"])
    });


    $element.style.backgroundColor = colors[defaultColor];
    drawCanvas(defaultColor,information["lastname"])
};

function drawCanvas(template,lastname){
    const canvas = document.getElementById("monCanvas");
    const context = canvas.getContext("2d");
    const borderRadius = 5;
    context.imageSmoothingEnabled = true;
    context.beginPath();
    context.lineWidth = 2
    context.strokeStyle = "grey"

    context.lineTo(canvas.width - borderRadius, 0);
    context.arcTo(canvas.width, 0, canvas.width, borderRadius, borderRadius);

    context.lineTo(canvas.width, canvas.height - borderRadius);
    context.arcTo(canvas.width, canvas.height, canvas.width - borderRadius, canvas.height, borderRadius);

    context.lineTo(borderRadius, canvas.height);
    context.arcTo(0, canvas.height, 0, canvas.height - borderRadius, borderRadius);

    context.lineTo(0, borderRadius);
    context.arcTo(0, 0, borderRadius, 0, borderRadius);

    context.font = "bold 30px Raleway"
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("Lucas GOSGNACH", 300, 55);

    context.font = "16px Raleway"
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("DevOps - FullStack Web developer", 299, 80);

    context.font = "16px Raleway"
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("🥇 WorldSkills France, 2023", 250, 150);

    context.closePath();
    context.stroke();


    context.beginPath();
    context.moveTo(0, 125);
    context.lineTo(500, 125);
    context.strokeStyle = 'grey';
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(0, 197);
    context.lineTo(500, 197);
    context.strokeStyle = template;
    context.lineWidth = 4;
    context.stroke();
    context.closePath();

    const image = new Image();
    image.src = "profil.png";
    image.onload = function() {
        const x = 50;
        const y = 15;
        context.save();
        context.beginPath();
        context.arc(x + 100 / 2, y + 100 / 2, 100 / 2, 0, Math.PI * 2);
        context.closePath();
        context.clip();
        context.drawImage(image, x, y, 100, 100);
        context.restore();
    };

    const $export = document.querySelector('#exportButton');
    $export.addEventListener('click',()=>{
        const image = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = image;
        a.download = `card_${lastname}.png`;
        a.click();
    })
}

document.addEventListener('DOMContentLoaded', main);
