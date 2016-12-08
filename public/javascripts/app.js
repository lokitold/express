$(document).ready(function () {
	$("#siguiente").click(siguientePagina);

	function siguientePagina() {
		$("#siguiente").attr("href", "users/segunda");
	}

	var state = {
		vote: {
			pair: [
				'peli1',
				'peli2',
			],
			tally: {
				peli1: 1, 
				peli2: 2,
			},
		},
		hasVoted:  'peli1'
	};

	function renderVote(state) {
		var pair = state.vote.pair;

		var options = '';

		pair.forEach(function (ele) {
			options += (
				'<button type="button" class="opciones">' +
				ele +
				'</button>'
			);
		});
		var mount = $('#options-mount');
		var button = mount.append(options);
		var optionsbuttons = $('.opciones');
		if(optionsbuttons.click(function(){

			var divcheck = $('#check');
			var check = '<div class="check"></div>';
			divcheck.append(check);
			$(this).append(divcheck);
			$(optionsbuttons).attr('disabled',true);
			window.localStorage.setItem('vote',$(this)[0].textContent);
			setTimeout(secondoptions, 2000);

			function secondoptions(){
				$(optionsbuttons).hide("slow", function(){
					var contenedorCaja = $('#next-option');
					var caja = '<button type="button" class="next"></button>';
					contenedorCaja.append(caja);
					var botones2= $(".next");
					botones2[0].textContent='peli3';
					botones2[1].textContent=window.localStorage.getItem('vote');

					var buttonsecond = $('.next');
					if(buttonsecond.click(function(){

						var divcheck = $('#check');
						var check = '<div class="check"></div>';
						divcheck.append(check);
						$(this).append(divcheck);
						$(buttonsecond).attr('disabled',true);
					}));
				});
			};
		}));
	};
	renderVote(state);
});

