const axios = require("axios");

const facebookRegex = axios
  .get("http://www.pizzaitaliaarad.ro/")
  .then((res) => {
    const pageSrcStr = res.data;
    const regex = /(http[s]?\:\/\/)(w{3})\.(facebook)\.com\/(pages)\/(coandi\-italia)\/[0-9]*/gim;
    console.log(pageSrcStr.match(regex));
  });

const allHrefRegex = axios.get("http://www.pizzaitaliaarad.ro/").then((res) => {
  let matches = [];
  const pageSrcStr = res.data;
  const regex = /(?<id>href\=")(?<http>http[s]?\:)\/\/(?<www>[w]{3}\.)(?<domain>\w+\.\w{1,3})\/\S+?\"/gim;
  pageSrcStr.replace(regex, (match) => {
    matches.push(match);
  });
  console.log(matches);
  console.log(matches.length);
});

const linkuriMancare = axios
  .get("http://www.pizzaitaliaarad.ro/")
  .then((res) => {
    let matches = [];
    const pageSrcStr = res.data;
    const regex = /(?:href\=\")(?<http>http[s]?\:)\/\/(?<www>[w]{3}\.)(?<domain>\w+\.\w{1,3})\/(meniu\-)\S+\-\S+\/\"/gim;
    pageSrcStr.replace(regex, (match) => {
      console.log(match);
      matches.push(match);
    });
    console.log(matches);
    console.log(matches.length);
  });

const aHrefLinkuriMancare = axios
  .get("http://www.pizzaitaliaarad.ro/")
  .then((res) => {
    let matches = [];
    const pageSrcStr = res.data;
    const regex = /(\<a\sclass="mfn-link\smfn-link\-[0-9]\ ")\s(?<id>href\=")(?<http>http[s]?\:)\/\/(?<www>[w]{3}\.)(?<domain>\w+\.\w{1,3})\/(meniu\-)\S+\-.+/gim;
    pageSrcStr.replace(regex, (match) => {
      matches.push(match);
    });
    console.log(matches);
    console.log(matches.length);
  });
