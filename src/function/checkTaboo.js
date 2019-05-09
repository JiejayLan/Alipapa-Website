import axios from 'axios';

//compared with taboolist and covert the invalid words with ***
export const convertTaboo = (word, [...tabooList]) => {
    console.log("convert taboo",word);
    for (let taboo in tabooList) {
        word = word.replace(tabooList[taboo], "*".repeat(taboo.length))
        console.log("convert taboo",word," ",taboo);
    }
    console.log("convert taboo",word,tabooList);
    return word;
}

//return taboolist
export const checkTaboo = () => {
    return(  
        axios.get('/taboo')
            .then(function (response) {
                // console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            }))
}



