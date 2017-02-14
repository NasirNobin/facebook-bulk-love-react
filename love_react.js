// love react to all fb friends
var i = 0;

var interval;
var xx = 0;

interval = setInterval(function(){
	xx++;
	console.log(xx)
},500);

var main_loop = setInterval(function(){

	console.log('Page: '+ i.toString() );

	var fb = 'https://mbasic.facebook.com';
	var root_url = fb+"/nasir7.bd/friends?startindex=" + i.toString();
	$.get(root_url,function(root_data){

		$(root_data).find("#root .bf .bk > .v.bm").each(function(){
			var url = $(this).find("a.bo").attr('href');
			var name = $(this).find("a.bo").text();

			if(url){
				url = fb+url;
				$.get(url,function(data){
					var profilePicUrl = $(data).find("[id^='u_0']").first().attr('href');

					if(profilePicUrl){
						$.get(fb+profilePicUrl, function(data){
							var reactUrl = $(data).find(":contains('React')").closest('a').attr('href');

							if(reactUrl){
								$.get(fb+reactUrl, function(data){
									var loveReactUrl = $(data).find(":contains('Love')").closest('a').attr('href');

									if(loveReactUrl){
										$.get(fb+loveReactUrl,function(d){
											console.log(name + " - Loved!");
										});
									}else{
										console.log(name + " - loveReactUrl not found!");
									}
								})

							}else{
								console.log(name + " - reactUrl not found!");
							}
		
						})
			
					}
					else{
						console.log(name + " - Pic not found!");
					}
				});

			}
		});
	})

	i+= 36;
	
	clearInterval(interval);

	if(i > 5000) clearInterval(main_loop);
	
	return;

	xx = 0;

	interval = setInterval(function(){
		xx++;
		console.log(xx)
	},500);


},2000)