<!doctype html>
<%@page language="java" pageEncoding="UTF-8"%>
<html xmlns="http://www.king-test.com">
<%@include file="/default/include/form.jsp"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>音乐播放器</title>
<script type="text/javascript" src="${ctx}/js/jquery-qrcode/jquery.qrcode.js"> </script>
<script type="text/javascript" src="${ctx}/js/jquery-qrcode/qrcode.js"> </script>
<link rel="stylesheet" href="${ctx}/css/musicPlayer/musicPlayer.css">
<script type="text/javascript">
	$(function (){
		$('#2Dcode').qrcode("http://192.168.1.112:8082/demo/");
	});
	
</script>

</head>
<body>
	<div id="div1">
		<img src="${ctx}/media/musicPlayer/images/background_2.jpg" />
	</div>
	<div class="bo">
		<div class="bo1">
			<div id="player">
				<div class="cover"></div>
				<div class="ctrl">
					<div class="tag">
						<strong>Title</strong> <span class="artist">Artist</span> <span
							class="album">Album</span>
					</div>
					<div class="control">
						<div class="left">
							<div class="rewind icon"></div>
							<div class="playback icon"></div>
							<div class="fastforward icon"></div>
						</div>
						<div class="volume right">
							<div class="mute icon left"></div>
							<div class="slider left">
								<div class="pace"></div>
							</div>
						</div>
					</div>
					<div class="progress">
						<div class="slider">
							<div class="loaded"></div>
							<div class="pace"></div>
						</div>
						<div class="timer left">0:00</div>
						<div class="right">
							<div class="repeat icon"></div>
							<div class="shuffle icon"></div>
						</div>
					</div>
				</div>
			</div>
			<ul id="playlist"></ul>
		</div>
		<div style="width:100%;padding-top: 10px;">
			<div style="width:300px;margin: 0 auto; padding: 0;text-align: center;">
				<span id="2Dcode"></span>
			</div>
		</div>
	</div>
	<script src="${ctx}/js/jquery-ui-1.8.17/jquery-ui.min.js"></script>
	<script src="${ctx}/js/musicPlayer/musicPlayer.js"></script>
</body>
</html>