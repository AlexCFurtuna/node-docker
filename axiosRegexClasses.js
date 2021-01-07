const axios = require("axios");
const fs = require("file-system");

class RegexScraper {
  constructor(regex) {
    this.regex = regex;
  }
  getLinkSocialId() {
    const link = "http://www.pizzaitaliaarad.ro/";

    const htmlSource = axios
      .get(link)
      .then((res) => {
        let resultsArray = [];
        const resString = res.data;
        const match = resString.match(this.regex);
        const results = JSON.stringify(match);
        resultsArray.push(results);
        return resultsArray;
      })
      .catch((err) => {
        console.log(err);
      });

    return new Promise((resolve, reject) => {
      resolve(htmlSource);
    });
  }
}

const regex1 = /(http[s]?\:\/\/)(w{3})\.(facebook)\.com\/(pages)\/(coandi\-italia)\/[0-9]*/gim;
const facebook = new RegexScraper(regex1);
const res1 = facebook.getLinkSocialId();

// Child Class
class AllHrefs extends RegexScraper {}
const regex2 = /(?<id>href\=")(?<http>http[s]?\:)\/\/(?<www>[w]{3}\.)(?<domain>\w+\.\w{1,3})\/\S+?\"/gim;
const allHrefs = new AllHrefs(regex2);
const res2 = allHrefs.getLinkSocialId();

//Child Class
class FoodLinks extends RegexScraper {}
const regex3 = /(?:href\=\")(?<http>http[s]?\:)\/\/(?<www>[w]{3}\.)(?<domain>\w+\.\w{1,3})\/(meniu\-)\S+\-\S+\/\"/gim;
const foodLinks = new FoodLinks(regex3);
const res3 = foodLinks.getLinkSocialId();

//Child class
class FoodLinksHTML extends RegexScraper {}
const regex4 = /(\<a\sclass="mfn-link\smfn-link\-[0-9]\ ")\s(?<id>href\=")(?<http>http[s]?\:)\/\/(?<www>[w]{3}\.)(?<domain>\w+\.\w{1,3})\/(meniu\-)\S+\-.+/gim;
const foodLinksHTML = new FoodLinksHTML(regex4);
const res4 = foodLinksHTML.getLinkSocialId();

Promise.all([res1, res2, res3, res4]).then((resultsArray) => {
  fs.writeFile("results.json", resultsArray, (err) => {
    if (err) throw err;
  });
});
