export function identifyCardIssuer(cardNumber: string) {
    cardNumber = cardNumber.replace(/\D/g, '');

    switch (true) {
        case /^4\d{15}$/.test(cardNumber):
            return "Visa";
        case /^5[1-5]\d{14}$/.test(cardNumber):
            return "MasterCard";
        case /^3[47]\d{13}$/.test(cardNumber):
            return "Amex";
        case /^62\d+$/.test(cardNumber):
            return "UnionPay";
        case /^6011\d{12}$/.test(cardNumber):
            return "Discover";
        case /^3(?:0[0-5]|[68]\d)\d{11,}$/.test(cardNumber):
            return "Diners";
        default:
            return "Unknown";
    }
}