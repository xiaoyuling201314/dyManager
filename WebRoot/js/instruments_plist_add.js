$(function(){
	 $(".deletFile").attr("style","display:none");
	 $("#btnSave").on("click", function() {
			var packingListName = $("[name=packingListName]").val();
			var packingListVersion = $("[name=packingListVersion]").val();
			if(validate()){
				$.ajax({
					url : "packlingService/checkFileVersion.do",
					type : "POST",
					dataType : "json",
					data : {
						"packingListName" : packingListName,
						"packingListVersion" : packingListVersion
					},
					success : function(data) {
						if (data.isExit == 'true') {// 存在
							alert("装箱单" + packingListVersion + "版本已存在,请确认BOM单名或版本号是否有误");
						} else {
							//$("[name=plistForm]").submit();
							 var formData = new FormData($("[name=plistForm]")[0]);  // 要求使用的html对象
						     $.ajax({  
						          async: false, 
						          url: 'packlingService/addPacking.do' ,  
						          type: 'POST',  
						          data: formData, 
						          cache: false,  
						          processData: false, 
						          contentType: false,  
						          dataType:"json", 
						          success: function (returndata) { 
						            if(returndata.count>0){
						            	 alert("导入成功"+returndata.count+"条数据");
						            	 location.href=basePath+"packlingService/packingList.do";
						            }else if(returndata.count==0){
						            	location.href=basePath+"packlingService/packingList.do";
						            }
						            else{
						            	 alert("导入数据出错,请检查数据文件是否有误");
						            	 location.href=basePath+"packlingService/packingList.do";
						            }
				                    
						          },  
						          error: function (returndata) {  
						              alert("操作失败");  
						          }  
						     }); 
						}
					},
					error : function() {
						alert("操作失败");
					}
				});
			}
		
		});
	 $("#returnbtn").on("click",function(){
	     if($("[name=packingListName]").val()!='' || $("[name=packingListVersion]").val()!='' || $("[name=createPerson]").val()!=''){
	        if(confirm("确定放弃编辑返回吗？")){
	           location.href=basePath+"packlingService/packingList.do?sapNo=${instruSapNo }";
	        }
	       }else{
	          location.href=basePath+"packlingService/packingList.do?sapNo=${instruSapNo }";
	       }
     });
});
//显示/隐藏删除图标
function showDeletepic(){
	  $(".deletFile").attr("style","display:block");
}
function hiddelDeletepic(){
	  $(".deletFile").attr("style","display:none");
}
//删除文件
function deleteFile(){
	     $(".deletFile").attr("style","display:none");
	     $(".fileicon").attr("style","display:none");
	     $("[name=myFile]").val("");
	     $("[name=fileName]").val("");
	     $(".fileNameMessage").html("");
}
function validate(){
	  var packingListName=$("[name=packingListName]").val();
	  var packingListVersion=$("[name=packingListVersion]").val();
	  var createPerson=$("[name=createPerson]").val();
	  var revisedRecord=$("[name=revisedRecord]").val();
	  var fileName=$("[name=fileName]").val();
	  var myFile=$("[name=myFile]").val();
	  //var reg=/^(\w|[.-]|[\u4e00-\u9fa5]|\s){1,255}$/;
	  var reg=/^[^*\/\\|:<>?\"]*$/;
	  var count=0;
	  if (fileName!='' ){
			 if(!reg.test(fileName)){
				 $(".fileNameMessage").html("装箱清单文件名称不能包含<br/>下列任何字符： \ / \\: * ? \" < > |");
				 count+=1;
			 }else{
				 $(".fileNameMessage").html("");
			 }
		  }
	  if(myFile=='' && fileName!=''){
			 $(".fileNameMessage").html("请选择装箱清单文件");
			 count+=1;
		 }
		if(packingListName==''){
			$(".packingListNameMessage").html("装箱清单名称不能为空");
			count+=1;
		}else{
			if(!reg.test(packingListName)){
				$(".packingListNameMessage").html("装箱清单名称不能包含下列任何字符：\ / \\ : * ? \" < > |");
				count+=1;
			}else{
			  $(".packingListNameMessage").html("");
			}
		}
		
		if(packingListVersion==''){
			$(".packingListVersionMessage").html("版本号不能为空");
			count+=1;
		}else{
			$(".packingListVersionMessage").html("");
		}
		if(createPerson==''){
			$(".createPersonMessage").html("修订人不能为空");
			count+=1;
		}else{
			$(".createPersonMessage").html("");
		}
		if(revisedRecord==''){
			$(".revisedRecordMessage").html("修订记录不能为空");
			count+=1;
		}else{
			$(".revisedRecordMessage").html("");
		}
		 if(count>0){
			     return false;
		}else{
			    return true;
		}
}