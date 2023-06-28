var L = [1, 2, 3, 5];

for (let i = 0; i < L.length; i++) {
   
    while (i < 4 - i) {
      x = L[i];
      L[i] = L[4 - i];
      L[4 - i] = x;
    }
    
    console.log(L)
    
}
