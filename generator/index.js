const axios = require('axios').default;
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const randomEmailDomains = [
    "gmail.com", "yahoo.com", "hotmail.com", "msn.com"
]

try {
    axios({
        method: "GET",
        url: "https://randomuser.me/api/"
    }).then(({ data }) => {
        const user = data.results[0];
        const texts = [];
        user.email = user.email.replace(/example\.com/g, randomEmailDomains[Math.floor(Math.random() * randomEmailDomains.length)]);
        
        texts.push([" ", user.gender == "male" ? "M." : "Mme.", user.name.first, user.name.last, "(" + user.nat + ")"]);
        texts.push([": ", "Email", user.email]);
        texts.push([": ", "Username", user.login.username]);
        texts.push([": ", "Password", user.login.password]);
        texts.push([": ", "Phone", user.phone]);
        texts.push([", ", user.dob.age + " ans", moment(user.dob.date).format("DD/MM/YYYY à HH:mm")]);
        texts.push([", ", user.location.street.number + " " + user.location.street.name, user.location.city, user.location.postcode, user.location.state, "(" + user.location.coordinates.latitude, user.location.coordinates.longitude + ")"]);
        texts.push(["\n", "large: " + user.picture.large, "medium: " + user.picture.medium, "small: " + user.picture.thumbnail])

        fs.writeFileSync(path.resolve(process.cwd(),"list", `${user.name.first}-${user.name.last}.txt`), texts.map(t => t.slice(1).join(t[0])).join("\n"));
    });
} catch (err) {
    throw err;
};