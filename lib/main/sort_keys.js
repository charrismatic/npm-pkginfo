

const sort_keys = (data) => {
  var shortest_key = 999;
  var longest_key = 0;
  var _sorted = data.sort(function(a, b){
    if(a[0].length > longest_key) { longest_key =  a[0].length; }
    if(b[0].length > longest_key) { longest_key =  b[0].length; }
    if(a[0].length < shortest_key) { shortest_key =  a[0].length; }
    if(b[0].length < shortest_key) { shortest_key =  b[0].length; }
    return a[0].localeCompare( b[0], { caseFirst: false, numeric: true })
  });

  return {
    sorted:_sorted,
    long: longest_key,
    short: shortest_key,
  };
};

export { sort_keys };
