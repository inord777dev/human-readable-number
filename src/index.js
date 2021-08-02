module.exports = function toReadable(number) {
    if (number == 0) {
        return "zero";
    }
    let digits = [];
    for (let i = 1; i <= 3; i++) {
        let digit = getDigit(number, i);
        switch (digit) {
            case 0:
                digits.push("zero");
                break;
            case 1:
                digits.push("one");
                break;
            case 2:
                digits.push("two");
                break;
            case 3:
                digits.push("three");
                break;
            case 4:
                digits.push("four");
                break;
            case 5:
                digits.push("five");
                break;
            case 6:
                digits.push("six");
                break;
            case 7:
                digits.push("seven");
                break;
            case 8:
                digits.push("eight");
                break;
            case 9:
                digits.push("nine");
                break;
        }
        number = Math.floor(number / 10);
        if (number == 0) {
            break;
        }
    }

    let result = [];

    if (digits.length > 2) {
        result.push(digits[2] + " hundred");
        digits.pop();
        if (digits[1] == "zero") {
            digits.pop();
        }
        if (digits[0] == "zero") {
            digits.pop();
        }
        if ((digits[1] != "zero") && (digits[0] != "zero")) {
            result.push(" ");
        }
    }

    if (digits.length > 1) {
        let subtext;
        if (digits[1] == "one") {
            if (digits[0] == "zero") {
                subtext = "ten";
            } else if (digits[0] == "one") {
                subtext = "eleven";
            } else if (digits[0] == "two") {
                subtext = "twelve";
            } else if (digits[0] == "three") {
                subtext = "thirteen";
            } else if (digits[0] == "five") {
                subtext = "fifteen";
            } else if (digits[0] == "eight") {
                subtext = "eighteen";
            } else {
                subtext = digits[0] + "teen";
            }
            result.push(subtext);
            digits.pop();
        } else if (digits[1] == "two") {
            result.push("twenty");
            if (digits[0] == "zero") {
                digits.pop();
            } else {
                result.push(" ");
            }
        } else if (digits[1] == "three") {
            result.push("thirty");
            if (digits[0] == "zero") {
                digits.pop();
            } else {
                result.push(" ");
            }
        } else if (digits[1] == "four") {
            result.push("forty");
            if (digits[0] == "zero") {
                digits.pop();
            } else {
                result.push(" ");
            }
        } else if (digits[1] == "five") {
            result.push("fifty");
            if (digits[0] == "zero") {
                digits.pop();
            } else {
                result.push(" ");
            }
        } else if (digits[1] == "eight") {
            result.push("eighty");
            if (digits[0] == "zero") {
                digits.pop();
            } else {
                result.push(" ");
            }
        }
        else {
            result.push(digits[1] + "ty");
            if (digits[0] == "zero") {
                digits.pop();
            } else {
                result.push(" ");
            }
        }
        digits.pop();
    }

    if (digits.length > 0) {
        result.push(digits[0]);
    }

    let text = "";
    let index = 0;

    while (index < result.length) {
        text += result[index];
        index = index + 1;
    }

    return text;
}

function getDigit(number, n) {
    return number % Math.pow(10, 1);
}
