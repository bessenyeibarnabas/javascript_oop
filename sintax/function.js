const muvelet = (a, b, callback) => {
    const result = callback(a, b);
    return {result}; //rövid property ({result : result})
}
 
const muveletLetrehoz = (jel) => {
    if (jel === "+");
    return (a, b) =>{
        return a + b;
    }
}

export {muvelet, muveletLetrehoz}