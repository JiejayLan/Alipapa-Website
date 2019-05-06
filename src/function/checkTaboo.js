let checkTaboo = (word, tabooList)=>{
    for(let taboo in tabooList){
        word = word.replace(taboo, "*".repeat(taboo.length))
    }
    return word;
}

export default checkTaboo;

