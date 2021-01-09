/**
 * https://github.com/rubiety/irealb_parser/blob/master/lib/irealb/parser.rb
 */
function parseUrl(url) {
    const raw = decodeURI(url).split('=')[6].trim(),
        changes = raw.match(/[^\|\{\}\[\]]*(S|Y|Q|U|s|l|LZ|T\d\d|.*)/)[1],
        tokens = changes.match(/([\|\{\}\[\]])|(LZ)|(?=[^\|\{\}\[\])]*T\d\d)|([ABCDEFG7\-\^]*)/g),
        chart = tokens.filter(element => element.length > 0),
        formatted = chart.map(token => token === 'LZ' ? '|' : token);

    return formatted;
}

parseUrl('%54%65%73%74%20%53%6F%6E%67=%61%6C%61%67%6F%64%69%63%68==%46%75%6E%6B=%43==%31%72%33%34%4C%62%4B%63%75%37%5B%43%58%79%51%7C%44%2D%58%79%51%5D%20==%30=%30');