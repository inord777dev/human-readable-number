module.exports = function toReadable(number) {
    if (number == 0) {
        return "zero";
    }
    let digits = [];
    let result = [];
    let rank = 1;
    let value;
    let groupName = "";
    let hundreds = 0, tens = 0, ones = 0;
    while (number > 0) {
        let digit = getDigit(number, rank);
        if (rank == 1 || rank > 3 && rank % 3 == 1) {
            ones = digit;
            value = digitsToText(0, 0, ones, groupName);
            result.push(value);
        } else if (rank == 2 || rank > 3 && rank % 3 == 2) {
            tens = digit;
            value = digitsToText(0, tens, ones, groupName);
            result.pop();
            result.push(value);
        } else if (rank == 3 || rank > 3 && rank % 3 == 0) {
            hundreds = digit;
            value = digitsToText(hundreds, tens, ones, groupName);
            result.pop();
            result.push(value);
            ones = 0;
            tens = 0;
            hundreds = 0;
        }

        number = Math.floor(number / 10);

        switch(rank){
            case 3: 
                groupName = "thousand";
                break;
            case 6: 
                groupName = "million";
                break;
            case 9: 
                groupName = "trillion";
                break;
        }
        rank = rank + 1;
    }

    let text = "";
    let index = result.length - 1;
    while (index >= 0) {
        if (result[index] != "zero") {
            text += (index == result.length - 1 ? "" : " ") + result[index];
        }
        index = index - 1;
    }

    return text.trim();
}

function getDigit(number, n) {
    return number % Math.pow(10, 1);
}

function digitToText(digit) {
    let value;

    switch (digit) {
        case 0:
            value = "zero";
            break;
        case 1:
            value = "one";
            break;
        case 2:
            value = "two";
            break;
        case 3:
            value = "three";
            break;
        case 4:
            value = "four";
            break;
        case 5:
            value = "five";
            break;
        case 6:
            value = "six";
            break;
        case 7:
            value = "seven";
            break;
        case 8:
            value = "eight";
            break;
        case 9:
            value = "nine";
            break;
    }
    return value;
}


function digitsToText(hundreds, tens, ones, groupName = "") {
    let text = "";
    let subtext = "";

    if (hundreds > 0) {
        text = digitToText(hundreds) + " hundred";
    }

    if (tens > 0) {
        if (tens == 1) {
            if (ones == 0) {
                subtext = "ten";
            } else if (ones == 1) {
                subtext = "eleven";
            } else if (ones == 2) {
                subtext = "twelve";
            } else if (ones == 3) {
                subtext = "thirteen";
            } else if (ones == 5) {
                subtext = "fifteen";
            } else if (ones == 8) {
                subtext = "eighteen";
            } else {
                subtext = digitToText(ones) + "teen";
            }
        } else if (tens == 2) {
            subtext = "twenty";
        } else if (tens == 3) {
            subtext = "thirty";
        } else if (tens == 4) {
            subtext = "forty";
        } else if (tens == 5) {
            subtext = "fifty";
        } else if (tens == 8) {
            subtext = "eighty";
        }
        else {
            subtext = digitToText(tens) + "ty";
        }
        text += (text == "" ? "" : " ") + subtext;
    } 

    if (ones > 0 && tens != 1) {
        text += (text == "" ? "" : " ") + digitToText(ones);
    }

    return text + (groupName == "" ||  text == "" ? "": " " + groupName);
}
