const colorThief = new ColorThief();

// Espera que una imagen cargue
function waitForImage(img) {
    return new Promise((resolve, reject) => {
    if (img.complete) resolve(img);
    else {
        img.onload = () => resolve(img);
        img.onerror = reject;
    }
    });
}

async function getAccentColorFromImage(img) {
    return await colorThief.getColor(img);
}

function getComplementaryColor(rgbColor) {
    const [r, g, b] = rgbColor;
    const rOpp = 255 - r;
    const gOpp = 255 - g;
    const bOpp = 255 - b;
    return [rOpp, gOpp,  bOpp]
}


function applyColorsToContainer(container, accent, complement) {
    const accentRgbStr = `rgb(${accent.join(',')})`;
    const complementRgbStr = `rgb(${complement.join(',')})`;
    container.style.backgroundColor = accentRgbStr;
    container.style.color = complementRgbStr;
}

function applyColorsToImg(img, accent, complement) {
    const complementRgbStr = `rgb(${complement.join(',')})`;
    img.style.boxShadow = `.5px .5px 5px 1px ${complementRgbStr})`; /* sombra difusa */
}


async function setColorFromImg(container) {
    const img = container.querySelector("img");
    await waitForImage(img);
    const accentColor = await getAccentColorFromImage(img);
    const complementaryColor = getComplementaryColor(accentColor);
    applyColorsToContainer(container, accentColor, complementaryColor);
    applyColorsToImg(img, accentColor, complementaryColor);
}

async function processAllImages() {
    const targets = Array.from(document.querySelectorAll(".review"));
    await Promise.all(targets.map(setColorFromImg));
}

// Ejecutar cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', processAllImages);