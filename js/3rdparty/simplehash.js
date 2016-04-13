/**
 * Decimal to Binary
 * Source: http://www.hscripts.com/scripts/JavaScript/decimal-binary-convertor.php
 */
function deciToBin(arg) {
  res1 = 999;
  args = arg;
  while(args>1) {
    arg1 = parseInt(args/2);
    arg2 = args%2;
    args = arg1;
    if(res1 == 999) {
      res1 = arg2.toString();
    } else {
      res1 = arg2.toString()+res1.toString();
    }
  }
  if(args == 1 && res1 != 999) {
    res1 = args.toString()+res1.toString();
  } else if(args == 0 && res1 == 999) {
    res1 = 0;
  } else if(res1 == 999) {
    res1 = 1;
  }
  var ll = res1.length;
  while(ll%4 != 0) {
    res1 = "0"+res1;
    ll = res1.length;
  }	
  return res1;
}


/**
 * djb2 Hash
 * Source: http://www.cse.yorku.ca/~oz/hash.html
 */
function djb2(s, tableSize) {
  var b = '', i, hash = 5381;

  for (i = 0; i < s.length; i++) {
    b += deciToBin(s[i].charCodeAt());
  }

  for (i = 0; i < b.length; i++) {
    if (b[i] == '1') {
      hash = ((hash << 5) + hash) + 1;
    } else {
      hash = ((hash << 5) + hash) + 0;
    }
  }

  return Math.abs(hash) % tableSize;
}


/**
 * Universal Hash
 */
function universalHash(s, tableSize) {
  var b = 27183, h = 0, a = 31415;

  if (tableSize > 1) {
    for (i = 0; i < s.length; i++) {
      h = (a * h + s[i].charCodeAt()) % tableSize;
      a = ((a % tableSize) * (b % tableSize)) % (tableSize);
    }
  }

  return h;
}


/**
 * Simple Hash
 */
function simpleHash(s, tableSize) {
  var i, hash = 0;

  for (i = 0; i < s.length; i++) {
    hash += (s[i].charCodeAt() * (i+1));
  }

  return Math.abs(hash) % tableSize;
}


/**
 * Division Hash Function
 */
function divisionHash(s, tableSize) {
  return s.length % tableSize;
}

/**
 *
 */
function main() {

  CHARS = 'qwertyuiopasdfghjklzxcvbnm';

  function randomKey() {
    var s, i, stringSize = Math.floor(Math.random()*65) + 1;
    
    for (i = 0; i < stringSize; i++) {
      s += CHARS[Math.floor(Math.random()*CHARS.length)]
    }

    return s;
  }

  var maxElements = document.getElementById('maxElements').value, tableSize = document.getElementById('tableSize').value;
  var i, k, hashTable = [], hashCode = [], html = '';

  hashCode[0] = {};
  hashCode[0].value = 0;
  hashCode[0].name = 'djb2';

  hashCode[1] = {};
  hashCode[1].value = 0;
  hashCode[1].name = 'Universal';

  hashCode[2] = {};
  hashCode[2].value = 0;
  hashCode[2].name = 'Simple';

  hashCode[3] = {};
  hashCode[3].value = 0;
  hashCode[3].name = 'Division';

  for (i = 0; i < maxElements; i++) {

    hashCode[0].value = djb2(randomKey(), tableSize);
    hashCode[1].value = universalHash(randomKey(), tableSize);
    hashCode[2].value = simpleHash(randomKey(), tableSize);
    hashCode[3].value = divisionHash(randomKey(), tableSize);

    for (k = 0; k < hashCode.length; k++) {
      try {
       hashTable[k][0]
      } catch (e) {
       hashTable[k] = [];
      }

      if (hashTable[k][hashCode[k].value] == undefined) {
        hashTable[k][hashCode[k].value] = 1;
      } else {
        hashTable[k][hashCode[k].value]++;
      }
    }
  }

  html += '<p class="b">Number of Elements: '+maxElements+' / Hash Table Size: '+tableSize+'</p>';

  for (k = 0; k < hashCode.length; k++) {
    html += '<div class="box">';
    html += '<h2>'+hashCode[k].name+'</h2>';
    html += '<div class="inside">';
    for (i = 0; i < tableSize; i++) {
      html += '<p style="background: red; padding: 2px; width: ' + (hashTable[k][i] == undefined ? 0 : ((hashTable[k][i]/maxElements) * 1000)) + 'px;">'+(hashTable[k][i] == undefined ? 0 : hashTable[k][i])+'</p>';
    }
    html += '</div>';
    html += '</div>';
  }

  document.getElementById('output').innerHTML = html;
}