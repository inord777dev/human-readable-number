module.exports = function toReadable(number) {
    if (number == 0) {
        return "zero";
    }
    let digits = [];
    let result = [];
    let rank = 0;
    let value;
    let groupName = "";
    while (number > 0) {
        let digit = getDigit(number, rank);
        let hundreds = 0, tens = 0, ones = 0;
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


        if (rank == 1 || rank % 4 == 0) {
            ones = digit;
            result.push(digitToText(0, 0, ones, groupName));
        } else if (rank % 2 == 0) {
            tens = digit;
            result.pop();
            result.push(digitToText(0, tens, ones, groupName));
        } else if (rank % 3 == 0) {
            hundreds = digit;
            result.push(digitToText(hundreds, tens, ones, groupName));
            ones = 0;
            tens = 0;
            hundreds = 0;
        }
        if (rank >= 7 ) {
            groupName = "million";
        } else if (rank >= 4) {
            groupName = "thousand";
        } 

        number = Math.floor(number / 10);

        rank = rank + 1;
        digits.push([]);
        result.push([]);
    }

    let text = "";
    let index = 0;
    while (index < result.length) {
        if (result[index] != "zero") {
            text += (index == 0 ? "" : " ") + result[index];
        }
        index = index + 1;
    }

    return text;
}

function getDigit(number, n) {
    return number % Math.pow(10, 1);
}

function digitToText(hundreds, tens, ones, groupName = "") {
    let text = "";

    if (hundreds > 0) {
        text = hundreds + " hundred";
    }

    if (tens > 1) {
        let subtext;
        if (tens == "one") {
            if (ones == "zero") {
                subtext = "ten";
            } else if (ones == "one") {
                subtext = "eleven";
            } else if (ones == "two") {
                subtext = "twelve";
            } else if (ones == "three") {
                subtext = "thirteen";
            } else if (ones == "five") {
                subtext = "fifteen";
            } else if (ones == "eight") {
                subtext = "eighteen";
            } else {
                subtext = ones + "teen";
            }
        } else if (tens == "two") {
            subtext = "twenty";
        } else if (digits[rank][1] == "three") {
            subtext = "thirty";
        } else if (digits[rank][1] == "four") {
            subtext = "forty";
        } else if (digits[rank][1] == "five") {
            subtext = "fifty";
        } else if (digits[1] == "eight") {
            subtext = "eighty";
        }
        else {
            subtext = tens + "ty";
        }
        subtext = (text == "" ? "" : " ") + subtext;
    }

    if (ones > 0) {
        text = (text == "" ? "" : " ") + ones;
    }

    return text;
}
