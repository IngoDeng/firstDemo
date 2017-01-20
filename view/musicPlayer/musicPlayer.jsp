<!DOCTYPE html>
<%@page language="java" pageEncoding="UTF-8"%>
<html xmlns="http://www.king-test.com">
<%@include file="/default/include/form.jsp"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width,initial-scale=1,user-scalable=0">
<title>音乐播放器</title>
<script type="text/javascript"
	src="${ctx}/js/jquery-qrcode/jquery.qrcode.js"> </script>
<script type="text/javascript" src="${ctx}/js/jquery-qrcode/qrcode.js"> </script>
<link rel="stylesheet" href="${ctx}/css/bootstrap/bootstrap.min.css">
<link rel="stylesheet" href="${ctx}/css/musicPlayer/musicPlayer.css">
<script src="${ctx}/js/jquery-ui-1.8.17/jquery-ui.min.js"></script>
<script src="${ctx}/js/musicPlayer/musicPlayer.js"></script>
<script type="text/javascript">
	/* $(function (){
		$('#2Dcode').qrcode("http://192.168.1.112:8082/demo/");
	}); */
	
</script>
</head>
<body>
	<div class="main_div">
	</div>
	<fieldset>
		<div class="bo">
			<div class="playListBox" style="display: none;">
				<div>
					<ul id="playlist"></ul>
				</div>
			</div>
			<div class="ctrlbox">
				<div class="ctrPlay" id="player">
					<div class="ctrl">
						<div class="control">
							<div class="repeatShuffleBox left">
								<div class="musiclist icon" title="音乐列表"></div>
								<div class="repeat icon" title="播放模式"></div>
							</div>
							<div class="left RewindBackFrowardBox">
								<div class="rewind icon" title="上一首"></div>
								<div class="playback icon"></div>
								<div class="fastforward icon" title="下一首"></div>
							</div>
							<div class="left volume volumeBox">
								<div class="mute icon left"></div>
								<div class="slider left">
									<div class="pace"></div>
								</div>
							</div>
						</div>
						<div class="progress_1" >
							<div class="slider">
								<div class="loaded"></div>
								<div class="pace"></div>
							</div>
						</div>
						<div class="tag">
							<div class="left">
								<strong class="title">Title</strong> 
							</div>
							<div class="timer right">0:00</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <div style="width:100%;padding-top: 10px;">
				<div style="width:300px;margin: 0 auto; padding: 0;text-align: center;">
					<span id="2Dcode"></span>
				</div>
			</div> -->
		</div>
	</fieldset>
</body>
</html>