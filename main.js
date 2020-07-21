const database=[
    {
       barcode: 'ITEM000000',
       name: 'Coca-Cola',
       price: 3
     },
     {
       barcode: 'ITEM000001',
       name: 'Sprite',
       price: 3
     },
     {
       barcode: 'ITEM000002',
       name: 'Apple',
       price: 5
     },
     {
       barcode: 'ITEM000003',
       name: 'Litchi',
       price: 15
     },
     {
       barcode: 'ITEM000004',
       name: 'Battery',
       price: 2
     },
     {
       barcode: 'ITEM000005',
       name: 'Instant Noodles',
       price: 4
     }
 ];

function getUniqueItemAndSum(barcodes){             //将重复的商品合并
    let temp=barcodes;
    let uniqueItems=[];
    while(temp.length>0){
        let itemCode=temp.shift();
        let sum=1;
        for(let i=0;i<temp.length;i++){
            if(temp[i]===itemCode){
                temp.splice(i,1);
                i--;
                sum++;
            }
        }
        uniqueItems.push({code:itemCode,num:sum});
    }
    return uniqueItems;
}

function getItemInfo(uniqueItem){                 //获取每个合并后的商品信息
    let itemInfo={};
    for(let i=0;i<database.length;i++){
        if(uniqueItem.code===database[i].barcode){
            itemInfo={name:database[i].name,quantity:uniqueItem.num,unitPrice:database[i].price,subTotal:uniqueItem.num*parseInt(database[i].price)};
        }
    }
    return itemInfo;
}

function getAllItemsInfo(uniqueItems){                  //将所有的商品信息合并
    let allItemsInfo=[];
    for(let i=0;i<uniqueItems.length;i++){
        allItemsInfo.push(getItemInfo(uniqueItems[i]));
    }
    return allItemsInfo;
}

function integrateItemInfoIntoReceiptArray(allItemsInfo){
    let receiptArray=[];
    for(let i=0;i<allItemsInfo.length;i++){
        let temp="Name: "+allItemsInfo[i].name+", Quantity: "+allItemsInfo[i].quantity+", Unit price: "+allItemsInfo[i].unitPrice+" (yuan), Subtotal: "+allItemsInfo[i].subTotal+" (yuan)";
        receiptArray.push(temp);
    }
    return receiptArray;
}

function getTotalMoney(allItemsInfo){
    let money=0;
    for(let i=0;i<allItemsInfo.length;i++){
        money+=allItemsInfo[i].subTotal;
    }
    return money;
}

function printReceipt(barcodes) {
    let uniqueItems=getUniqueItemAndSum(barcodes);
    let allItemsInfo=getAllItemsInfo(uniqueItems);
    let receiptArray=integrateItemInfoIntoReceiptArray(allItemsInfo);
    let result="\n***<store earning no money>Receipt ***\n";
    for(let i=0;i<receiptArray.length;i++){
        result+=receiptArray[i];
        result+='\n';
    }
    result+="----------------------\n";
    result+="Total: "+getTotalMoney(allItemsInfo)+" (yuan)\n";
    result+="**********************";
    console.log(result);
    return result;
}

module.exports = {
    printReceipt
};