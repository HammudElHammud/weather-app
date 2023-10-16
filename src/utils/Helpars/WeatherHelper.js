export function toCamelCase(str) {
    var arr = str.split(" ").map(
        function(sentence){
            return sentence?.charAt(0).toUpperCase() + sentence.substring(1);
        }
    );
    return arr.join(" ");
}

export function getFormattedDate(date){
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date * 1000).toLocaleDateString("en-US",options);
}

export function toCelcius(val){
    return Math.round((val - 32) * (5/9));
}

export function toFerenheit(val){
    var degrees = (val * 1.8) + 32;
    return Math.round(degrees);
}
