const jwt = require("jsonwebtoken");

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function getFutureDate(minYear, maxYear) {
    let futureDate = new Date();
    futureDate.setFullYear(
        Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear
    );
    futureDate.setMonth(Math.floor(Math.random() * (11 - 0 + 1)) + 0);
    futureDate.setDate(
        Math.floor(
            Math.random() *
            (getDaysInMonth(futureDate.getFullYear(), futureDate.getMonth()) -
                1 +
                1)
        ) + 1
    );
    futureDate.setHours(Math.floor(Math.random() * (23 - 0 + 1)) + 0);
    futureDate.setMinutes(Math.floor(Math.random() * (59 - 0 + 1)) + 0);
    let isoDate = futureDate.toISOString();
    return isoDate;
}

const generateToken = (user, isRefreshToken) => {
    if (isRefreshToken) {
        return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "200m" });
    } else {
        return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "1500m" });
    }
}

module.exports = { getFutureDate, generateToken };