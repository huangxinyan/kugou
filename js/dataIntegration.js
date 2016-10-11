var integration = {
	add:function(str1,str2){
	     var arr1 = [],arr2 = [];
		  arr2 = str2.split("#");
		  var flag = true;
		  //var count2 = parseInt(arr2[arr2.length-1]);
		  var rows = str1.split("|");
		  //console.log(rows);
		  //console.log(arr2);
		  for(var i=0;i<rows.length;i++){
				var colsArr = rows[i].split("#");
				//console.log(colsArr);
				//var count1 = parseInt(colsArr[colsArr.length-1]);
				if(colsArr[0]==arr2[0]){
					flag = false;
					//colsArr[colsArr.length-1] = count1 + count2;
					//console.log(colsArr[colsArr.length-1]);
					rows[i] = colsArr.join("#");
					//console.log(rows[i]);
					break;
				}
		  }
		  if(flag){
			  rows.push(str2);
		  }
          return rows.join("|");
	},
	change:function(str){
		 str = str.split("|");
		 var newArr = [];
		 for(var i=0;i<str.length;i++){
			 var colsStr = str[i].split("#");
			 var obj = {id:colsStr[0],name:colsStr[1],singer:colsStr[2],img:colsStr[3]};
             newArr.push(obj);
		 }
		 return newArr;
	},
    del:function(str,id){
		var newArr = [];
		str = str.split("|");
		for(var i=0;i<str.length;i++){
			var colsStr = str[i].split("#");
			if(colsStr[0]!=id){
                newArr.push(colsStr.join("#"));
			}
		}
		return newArr.join("|");
	}
 
   
}