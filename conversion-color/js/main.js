 // Función para actualizar el color del DIV y los valores de los formatos de color
 function actualizarColor() {
    // Obtener el valor del input color
    var colorSeleccionado = document.getElementById("colorPicker").value;
    
    // Aplicar el color al DIV
    document.getElementById("colorDiv").style.backgroundColor = colorSeleccionado;
    
    // Actualizar el valor en formato HEX
    document.getElementById("hexColor").value = colorSeleccionado;
    
    // Convertir el color seleccionado a formato RGB
    var colorEnRGB = hexToRgb(colorSeleccionado);
    document.getElementById("rgbColor").value = colorEnRGB;

    // Convertir el color seleccionado a formato HSL
    var colorEnHSL = rgbToHsl(colorEnRGB);
    document.getElementById("hslColor").value = colorEnHSL;

    // Convertir el color seleccionado a formato HSLA
    var colorEnHSLA = colorEnHSL + ', 1.0';
    document.getElementById("hslaColor").value = colorEnHSLA;

    // Convertir el color seleccionado a formato HWB
    var colorEnHWB = rgbToHwb(colorEnRGB);
    document.getElementById("hwbColor").value = colorEnHWB;

    // Convertir el color seleccionado a formato CMYK
    var colorEnCMYK = rgbToCmyk(colorEnRGB);
    document.getElementById("cmykColor").value = colorEnCMYK;

    // Convertir el color seleccionado a formato RYB (aproximado)
    var colorEnRYB = rgbToRyb(colorEnRGB);
    document.getElementById("rybColor").value = colorEnRYB;
}

// Asociar la función al evento "change" del input color
document.getElementById("colorPicker").addEventListener("change", actualizarColor);

// Función para convertir un color en formato HEX a formato RGB
function hexToRgb(hex) {
    // Eliminar el símbolo #, si está presente
    hex = hex.replace(/^#/, '');

    // Separar el valor en los componentes RGB
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);

    // Devolver el color en formato RGB
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

// Función para convertir un color en formato RGB a formato HSL
function rgbToHsl(rgb) {
    // Eliminar "rgb(" y ")" y dividir los valores
    var parts = rgb.substring(4, rgb.length - 1).split(",");
    var r = parseFloat(parts[0]);
    var g = parseFloat(parts[1]);
    var b = parseFloat(parts[2]);

    // Normalizar los valores a [0, 1]
    r /= 255;
    g /= 255;
    b /= 255;

    // Calcular los componentes HSL
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var delta = max - min;
    var h, s, l;

    if (delta === 0) {
        h = 0;
    } else if (max === r) {
        h = ((g - b) / delta) % 6;
    } else if (max === g) {
        h = (b - r) / delta + 2;
    } else {
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);
    if (h < 0) {
        h += 360;
    }

    l = (max + min) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Devolver el color en formato HSL
    return 'hsl(' + h + ', ' + (s * 100) + '%, ' + (l * 100) + '%)';
}

// Función para convertir un color en formato RGB a formato HWB
function rgbToHwb(rgb) {
    var parts = rgb.substring(4, rgb.length - 1).split(",");
    var r = parseFloat(parts[0]) / 255;
    var g = parseFloat(parts[1]) / 255;
    var b = parseFloat(parts[2]) / 255;
    
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var wh = max;
    var bl = 1 - min;
    var s = (wh - min) / wh;

    wh = Math.round(wh * 100);
    bl = Math.round(bl * 100);
    s = Math.round(s * 100);

    return 'hwb(' + wh + ', ' + bl + ', ' + s + ')';
}

// Función para convertir un color en formato RGB a formato CMYK
function rgbToCmyk(rgb) {
    var parts = rgb.substring(4, rgb.length - 1).split(",");
    var r = parseFloat(parts[0]) / 255;
    var g = parseFloat(parts[1]) / 255;
    var b = parseFloat(parts[2]) / 255;
    
    var k = 1 - Math.max(r, g, b);
    var c = (1 - r - k) / (1 - k);
    var m = (1 - g - k) / (1 - k);
    var y = (1 - b - k) / (1 - k);

    c = Math.round(c * 100);
    m = Math.round(m * 100);
    y = Math.round(y * 100);
    k = Math.round(k * 100);

    return 'cmyk(' + c + '%, ' + m + '%, ' + y + '%, ' + k + '%)';
}

// Función para convertir un color en formato RGB a formato RYB (aproximado)
function rgbToRyb(rgb) {
    var parts = rgb.substring(4, rgb.length - 1).split(",");
    var r = parseFloat(parts[0]) / 255;
    var g = parseFloat(parts[1]) / 255;
    var b = parseFloat(parts[2]) / 255;

    var w = Math.min(r, g, b);
    r -= w;
    g -= w;
    b -= w;

    var mg = Math.max(r, g, b);
    var y = Math.min(r, g, b);
    b -= y;
    mg -= y;
    y += b / 2;
    w += b / 2;

    if (mg) {
        r = (r - w) / mg;
        g = (g - w) / mg;
        b = (b - w) / mg;
    } else {
        r = g = b = 0;
    }

    r = Math.round(r * 100);
    g = Math.round(g * 100);
    b = Math.round(b * 100);
    y = Math.round(y * 100);
    w = Math.round(w * 100);

    return 'ryb(' + r + '%, ' + y + '%, ' + b + '%, ' + w + '%)';
}