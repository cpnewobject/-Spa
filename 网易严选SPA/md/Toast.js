var Toast = {
	makeText(str,time){
		$("#toast").show();
		$("#toast").html(str);
		setTimeout(function(){
			$("#toast").hide();
		},time);
	}
};

export default Toast;