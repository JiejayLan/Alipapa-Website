import database from '../firebase/firebase';

export const addItem = (
    {
        priceNature= "",
        title= "",
        keyWord="",
        price=0
    } = {}
  ) => ({
    type: 'add_item',
    item: {
        priceNature,
        title,
        keyWord,
        price
    }
  });
  

// export const startAddItem  = (item) => {  
//     console.log("gfg");
//     database.ref('itemApplication').push(item).then((ref) => {
//         dispatch(addItem({
//             id: ref.key,
//             ...item
//         }));
//     });
// };