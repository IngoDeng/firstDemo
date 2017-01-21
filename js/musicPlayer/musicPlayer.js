$(function (){
	// Settings
	var repeat = localStorage.repeat || 2,
		continous = true,
		autoplay = false,
		playlist = [
		{
			title: '钢琴曲 - 海阔天空',
			artist: '',
			album: '海阔天空.mp3',
			cover:'media/musicPlayer/images/singer/beyond.jpg',
			mp3: 'media/musicPlayer/music/钢琴曲 - 海阔天空.mp3',
			ogg: ''
			},
		{
			title: 'Hita - 昔言',
			artist: '',
			album: 'Hita - 昔言.mp3',
			cover:'media/musicPlayer/images/singer/Hita.jpg',
			mp3: 'media/musicPlayer/music/Hita - 昔言.mp3',
			ogg: ''
			},
		{
			title: 'Carpenters - Yesterday Once More',
			artist: '',
			album: 'Carpenters - Yesterday Once More.mp3',
			cover:'media/musicPlayer/images/singer/Carpenters.jpg',
			mp3: 'media/musicPlayer/music/Carpenters - Yesterday Once More.mp3',
			ogg: ''
			},
		{
			title: 'Alan Walker - Faded',
			artist: '',
			album: 'Alan Walker - Faded.mp3',
			cover:'media/musicPlayer/images/singer/faded.jpg',
			mp3: 'media/musicPlayer/music/Alan Walker - Faded.mp3',
			ogg: ''
			}
		];

	// Load playlist
	for (var i=0; i<playlist.length; i++){
		var item = playlist[i];
		$('#playlist').append('<li>'+item.artist+' '+item.title+'</li>');
	}

	var time = new Date(),
		currentTrack,
		trigger = false,
		audio, timeout, isPlaying, playCounts;
	if(repeat == 3){
		currentTrack = time.getTime() % playlist.length 
	}else{
		currentTrack = 0;
	}	
	var play = function(){
		$('.playback').addClass('playing');
		timeout = setInterval(updateProgress, 500);
		isPlaying = true;
		setTimeout(function(){audio.play()},500);
	}

	var pause = function(){
		audio.pause();
		$('.playback').removeClass('playing');
		clearInterval(updateProgress);
		isPlaying = false;
	}

	// Update progress
	var setProgress = function(value){
		var currentSec = parseInt(value%60) < 10 ? '0' + parseInt(value%60) : parseInt(value%60),
			ratio = value / audio.duration * 100;

		$('.timer').html(parseInt(value/60)+':'+currentSec);
		$('.progress_1 .pace').css('width', ratio + '%');
		$('.progress_1 .slider a').css('left', ratio + '%');
	}

	var updateProgress = function(){
		setProgress(audio.currentTime);
	}

	// Progress slider
	$('.progress_1 .slider').slider({step: 0.1, slide: function(event, ui){
		$(this).addClass('enable');
		setProgress(audio.duration * ui.value / 100);
		clearInterval(timeout);
	}, stop: function(event, ui){
		audio.currentTime = audio.duration * ui.value / 100;
		$(this).removeClass('enable');
		timeout = setInterval(updateProgress, 500);
	}});

	// Volume slider
	var setVolume = function(value){
		audio.volume = localStorage.volume = value;
		$('.volume .pace').css('width', value * 100 + '%');
		$('.volume .slider a').css('left', value * 100 + '%');
	}

	var volume = localStorage.volume || 0.5;
	$('.volume .slider').slider({max: 1, min: 0, step: 0.01, value: volume, slide: function(event, ui){
		setVolume(ui.value);
		$(this).addClass('enable');
		$('.mute').removeClass('enable');
	}, stop: function(){
		$(this).removeClass('enable');
	}}).children('.pace').css('width', volume * 100 + '%');


	$('.mute').click(function(){
		if ($(this).hasClass('enable')){
			setVolume($(this).data('volume'));
			$(this).removeClass('enable');
		} else {
			$(this).data('volume', audio.volume).addClass('enable');
			setVolume(0);
		}
	});

	// Switch track
	var switchTrack = function(i){
		if (i < 0){
			track = currentTrack = playlist.length - 1;
		} else if (i >= playlist.length){
			track = currentTrack = 0;
		} else {
			track = i;
		}

		$('audio').remove();
		loadMusic(track);
		/*if (isPlaying == true) */
		play();
	}

	// Shuffle随机播放
	var shufflePlay = function(){
		var time = new Date(),
			lastTrack = currentTrack;
		currentTrack = time.getTime() % playlist.length;
		if (lastTrack == currentTrack) ++currentTrack;
		switchTrack(currentTrack);
	}

	// Fire when track ended
	var ended = function(){
		pause();
		audio.currentTime = 0;
		playCounts++;
		if (continous == true) isPlaying = true;
		if (repeat == 1){
			play();
		} else if(repeat == 3){
			shufflePlay();
		} else {
			if (repeat == 2){
				switchTrack(++currentTrack);
			} else {
				if (currentTrack < playlist.length) switchTrack(++currentTrack);
			}
		}
	}

	var beforeLoad = function(){
		var endVal = this.seekable && this.seekable.length ? this.seekable.end(0) : 0;
		$('.progress_1 .loaded').css('width', (100 / (this.duration || 1) * endVal) +'%');
	}

	// Fire when track loaded completely
	var afterLoad = function(){
		if (autoplay == true) play();
	}

	// Load track
	var loadMusic = function(i){
		var item = playlist[i],
			newaudio = $('<audio>').html('<source  src="'+item.mp3+'"><source src="'+item.ogg+'">').appendTo('#player');
		
		//$('.cover').html('<img src="'+item.cover+'" alt="'+item.album+'">');
		$('.tag strong').html(item.title);
		$('#playlist li').removeClass('playing').eq(i).addClass('playing');
		//$('#playlist').css("background", "url("+item.cover+") rgba(0, 0, 0, 0.3)");
		audio = newaudio[0];
		audio.volume = $('.mute').hasClass('enable') ? 0 : volume;
		audio.addEventListener('progress_1', beforeLoad, false);
		audio.addEventListener('durationchange', beforeLoad, false);
		audio.addEventListener('canplay', afterLoad, false);
		audio.addEventListener('ended', ended, false);
	}

	loadMusic(currentTrack);
	$('.playback').on('click', function(){
		if ($(this).hasClass('playing')){
			pause();
		} else {
			play();
		}
	});
	$('.rewind').on('click', function(){
		if (repeat == 3){
			shufflePlay();
		} else {
			switchTrack(--currentTrack);
		}
	});
	$('.fastforward').on('click', function(){
		if (repeat == 3){
			shufflePlay();
		} else {
			switchTrack(++currentTrack);
		}
	});
	$('#playlist li').each(function(i){
		var _i = i;
		$(this).on('click', function(){
			switchTrack(_i);
		});
	});

	$('.musiclist').on('click', function(){
		$(".playListBox").toggle()
	});
	
	if (repeat == 1){
		$('.repeat').addClass('once');
	} else if (repeat == 2){
		$('.repeat').addClass('all');
	} else if (repeat == 3){
		$('.repeat').addClass('enable');
	}

	$('.repeat').on('click', function(){
		if ($(this).hasClass('once')){
			repeat = localStorage.repeat = 2;
			$(this).removeClass('once').addClass('all');
		} else if ($(this).hasClass('all')){
			repeat = localStorage.repeat = 3;
			$(this).removeClass('all').addClass('enable');
		} else if($(this).hasClass('enable')){
			repeat = localStorage.repeat = 1;
			$(this).removeClass('enable').addClass('once');
		}
	});
})