const minNum: number = 0;
const maxNum: number = 99;
let currentNum: number = 0;
let hold: number = 1000;
let length: number = 28;
const pasek: neopixel.Strip = neopixel.create(DigitalPin.P8, length, NeoPixelMode.RGB);
let buttonBHoldStart: number = 0;
let buttonAHoldStart: number = 0;

function setupLEDs() {

    let modra = neopixel.hsl(10, 99, 50);
    let oranzova = neopixel.hsl(250, 99, 50);
    let zelena = neopixel.hsl(125, 99, 50);
    let ruzova = neopixel.hsl(300, 99, 30);
    let zluta = neopixel.hsl(50, 100, 50);

    for (let i = 0; i < length; i += 5) {
        pasek.setPixelColor(i, modra);
        pasek.setPixelColor(i + 1, oranzova);
        pasek.setPixelColor(i + 2, zelena);
        pasek.setPixelColor(i + 3, ruzova);
        pasek.setPixelColor(i + 4, zluta);
    }
    pasek.show();
}

// input.onButtonPressed(Button.A, function () {
//     if (currentNum < maxNum) {
//         currentNum += 1;
//         hold = ((maxNum + 1) - (currentNum)) * 10;
//         whaleysans.showNumber(currentNum);

//     } else {
//         console.log("max");
//     }
// })

// input.onButtonPressed(Button.B, function () {
//     if (currentNum > minNum) {
//         currentNum -= 1;
//         hold = ((maxNum + 1) - (currentNum)) * 10;
//         whaleysans.showNumber(currentNum);
//         //console.log(hold);
//     } else {
//         console.log("min");
//     }
// })


basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        if (buttonAHoldStart === 0) {
            buttonAHoldStart = control.millis();
        } else if (control.millis() - buttonAHoldStart > 400) {

            if (currentNum < maxNum) {
                currentNum += 1;
                hold = ((maxNum + 1) - currentNum) * 10;
                console.log(hold);
                basic.pause(80);
            }
        }
    } else {
        buttonAHoldStart = 0;
    }

    if (input.buttonIsPressed(Button.B)) {
        if (buttonBHoldStart === 0) {
            buttonBHoldStart = control.millis();
        } else if (control.millis() - buttonBHoldStart > 400) {

            if (currentNum > minNum) {
                currentNum -= 1;
                hold = ((maxNum + 1) - currentNum) * 10;
                console.log(hold);
            }
            basic.pause(80);
        }
    } else {
        buttonBHoldStart = 0;
    }
    console.logValue("hold", hold);
    basic.pause(20)
})







setupLEDs();

basic.forever(function () {
    pasek.rotate(1);
    pasek.show();
    basic.pause(hold)
})