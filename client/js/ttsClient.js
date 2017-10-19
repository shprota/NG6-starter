// TTSClient JS
// JavaScript client for Aharon's SAPI based TTS server
// author:	Dragan Knezevic tomaja@uns.ac.rs
//
// ver 1.09
//    - Default language added
// ver 1.08
//    - Timeout check added
//    - IE bug resolved (onload event not being called)
// ver 1.07
//    - logging added
// ver: 1.06
//    - '=' handled.
// ver:	1.05
//    - CrashTest added.
// ver: 1.04
//    - URL characters replaced by special marks to enable their safe transport

function JSLogger( append ) {

	this.Message = null;
	this.Append = append;
	this.loggingEnabled = true;

	this.InstallLogger = function( ) {
		if( this.loggingEnabled == false )
			return;

		var logElement = document.createElement( 'div' );
		logElement.style.cssText = "position:absolute; top:0; right:0; width:50%; border: solid 0.2em red; font-size:0.75em; padding: 1em; background-color:grey";

		logElement.id = "log-surface";

		document.getElementsByTagName('BODY')[0].appendChild( logElement );
		this.Message = document.createElement( 'span' );
		document.getElementById('log-surface').appendChild( this.Message );
	}

	this.ClearLog = function( ) {
		if( this.loggingEnabled == false )
			return;
		if( this.Message == null )
		{
			this.InstallLogger( );
		}

		this.Message.innerHTML = "";
	}

	this.LogMessage = function ( message ) {
		if( this.loggingEnabled == false )
			return;

		if( this.Message == null )
		{
			this.InstallLogger( );
		}

		if( this.Append )
		{
			this.Message.innerHTML = this.Message.innerHTML + message + "<br />\n";
		}
		else
		{
			this.Message.innerHTML = message;
		}
	}
}

// Global logger
var __globalTtsLogger = new JSLogger( true );
var timerIE;
var bRequestProcessed = false;

var ErrorNotify = function( msg ) {
	__globalTtsLogger.LogMessage( msg );
}

var checkResponse = function( c ) {
	var elem = document.getElementById( 'TTS-Request' );
	if( bRequestProcessed )
	{
		return;
	}
	if( elem.readyState != 'loaded' && c >= 15 )
	{
		__globalTtsLogger.LogMessage( "TTS request timeout!" );
		clearTimeout( timerIE );
		document.getElementsByTagName('HEAD')[ 0 ].removeChild( elem );
		return;
	}
	if( elem.readyState == 'loaded' )
	{
		__globalTtsLogger.LogMessage( "TTS request timeout!" );
		clearTimeout( timerIE );
		document.getElementsByTagName('HEAD')[ 0 ].removeChild( elem );
		return;
	}
	c++;
	timerIE = setTimeout( 'checkResponse( ' + c.toString() + ' )', 500 );
};

window.requestProcessed = function ( chunk_number ) {
	bRequestProcessed = true;
	clearTimeout( timerIE );
	var elem = document.getElementById( 'TTS-Request' );
	__globalTtsLogger.LogMessage( "TTS request sent! (chunk: " + chunk_number.toString( ) + ")" );
	document.getElementsByTagName('HEAD')[ 0 ].removeChild( elem );
	return;
}

function TTSClient( bEnableLogging ) {

	if (bEnableLogging == null){
		bEnableLogging = false;
	}

	this.LoggingEnabled = bEnableLogging;
	__globalTtsLogger.loggingEnabled = bEnableLogging;
	if( this.LoggingEnabled )
	{
		__globalTtsLogger.LogMessage( "Creating TTSClient..." );
	}

	this.ServerAddress = "http://localhost";
	this.ServerPort = 8080;

	this.Pitch = 0;
	this.SetPitch = function ( pitch ) { this.Pitch = pitch; };

	this.Rate = 0;
	this.SetRate = function ( rate ) { this.Rate = rate; };

	this.Volume = 100;
	this.SetVolume = function ( volume ) { this.Volume = volume; };

	this.DefaultLanguage = "Hebrew";

	this.SetDefaultLanguage = function ( language ) {
		this.DefaultLanguage = language;
	}

	this.SplitText = function( text ) {
		var chunks = new Array();

		var nMaximumChunkSize = 250;

		var nInputTextLength = text.length;
		var nNumberOfChunks = Math.ceil( nInputTextLength / nMaximumChunkSize );
		var i = 0;
		while( i < nNumberOfChunks )
		{
			chunks[ i ] = text.substr( i * nMaximumChunkSize, nMaximumChunkSize );
			i++;
		}

		return chunks;
	}

	this.Speak = function ( text, forcedLanguage ) {

		__globalTtsLogger.ClearLog( );
		__globalTtsLogger.LogMessage( "Entering Speak..." );
		bRequestProcessed = false;

		if( text == "" )
			text = " ";

		text = text.replace( /\t/g, " " );
		text = text.replace( /\n/g, " " );
		text = text.replace( /\r/g, "" );


		text = text.replace( /\//g, "_JS_S_" );
		text = text.replace( /#/g, "_JS_CN_" );
		text = text.replace( /=/g, "_JS_EQ_" );
		text = text.replace( /\?/g, "_JS_QM_" );
		text = text.replace( /&/g, "_JS_AMP_" );
		text = text.replace( /"/g, "_JS_QUM_" );
		text = text.replace( /%/g, "_JS_PER_" );

		__globalTtsLogger.LogMessage( "Input text secured." );

		var d = new Date( );
		var hash = d.getTime( ).toString( );

		var aTextChunks = this.SplitText( text );

		var i = 0;
		for( i = 0; i < aTextChunks.length; i++ )
		{
			var flLine = "";
			if( forcedLanguage != "" )
			{
				flLine = "&fl=" + forcedLanguage;
			}
			var url = this.ServerAddress + ":" + this.ServerPort.toString() + "/" +
					"command=speak" +
					"&text=" + aTextChunks[ i ] +
					"&dl=" + this.DefaultLanguage +
					"&pitch=" + this.Pitch.toString() +
					"&rate=" + this.Rate.toString() +
					"&volume=" + this.Volume.toString() +
					"&cc=" + i.toString() +
					"&tc=" + aTextChunks.length.toString() +
					flLine +
					"&r=" + hash.toString();


			var s = document.createElement('SCRIPT');
			s.charset = 'UTF-8';
			s.src = url;
			s.id = 'TTS-Request';

			__globalTtsLogger.LogMessage( "Sending chunk: <i>" + i.toString() + "</i>" );
			//__globalTtsLogger.LogMessage( "Sending speak request..." );
			document.getElementsByTagName( 'HEAD' )[ 0 ].appendChild( s );
		}

		checkResponse( 0 );

		return true;
	};

	this.Stop = function ( ) {

		__globalTtsLogger.ClearLog( );
		__globalTtsLogger.LogMessage( "Entering Stop..." );
		bRequestProcessed = false;

		var d = new Date();
		var hash = d.getTime();

		var url = this.ServerAddress + ":" + this.ServerPort.toString() + "/command=stop?r=" + hash.toString();

		var s = document.createElement('SCRIPT');
		s.charset = 'UTF-8';
		s.src = url;
		s.id = 'TTS-Request';
		//s.onload = function(){
		//		__globalTtsLogger.LogMessage( "Stop request sent!" );
		//		var e = document.getElementById( 'TTS-Request' );
		//		document.getElementsByTagName('HEAD')[ 0 ].removeChild( e );
		//	};

		__globalTtsLogger.LogMessage( "Sending speak request..." );
		document.getElementsByTagName('HEAD')[ 0 ].appendChild(s);

		checkResponse( 0 );

		return true;
	};

	this.checkLastSynthesisStatus = function( ) {


		var httpRequest;
		var status;

		httpRequest = createCORSRequest("GET", this.ServerAddress + ":" + this.ServerPort.toString() + "/command=is_synthesis_finished" + "?t=" + Math.random());

		if(httpRequest == null) {
			__globalTtsLogger.LogMessage( "Sending synthesis status request error" );
			return -1;
		}

		__globalTtsLogger.LogMessage( "Sending synthesis status request..." );
		status = -1;
		try {
			httpRequest.send();
		} catch(e) {
			__globalTtsLogger.LogMessage( "Sending synthesis status request error" );
			return -1;
		}

		__globalTtsLogger.LogMessage( "Synthesis request finished..." );
		if (httpRequest.status === 200) {
			var responseText = httpRequest.responseText;
			if(responseText == "Synthesis status: synthesis_finished") {
				status = 0;
			} else if(responseText == "Synthesis status: synthesis_not_finished") {
				status = 1;
			} else if(responseText == "Synthesis status: synthesis_stopped"){
				status = 2;
			}
		} else {
			status = -1;
		}
		return status;
	};

	var createCORSRequest = function (method, url) {
		var xhr;
		if (window.XMLHttpRequest) { // Mozilla, Safari, ...
			xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) { // IE 8 and older
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		if ("withCredentials" in xhr){
			xhr.open(method, url, false);
		} else if (typeof XDomainRequest != "undefined"){
			xhr = new XDomainRequest();
			xhr.open(method, url);
		} else {
			xhr = null;
		}
		return xhr;
	}


	this.CrashTest = function ( ) {

		__globalTtsLogger.ClearLog( );
		__globalTtsLogger.LogMessage( "Entering CrashTest..." );
		bRequestProcessed = false;

		var d = new Date();
		var hash = d.getTime();

		var url = this.ServerAddress + ":" + this.ServerPort.toString() + "/command=__crash_test__?r=" + hash.toString();

		var s = document.createElement('SCRIPT');
		s.charset = 'UTF-8';
		s.src = url;
		s.id = 'TTS-Request';
		//s.onload = function(){
		//		__globalTtsLogger.LogMessage( "CrashTest request sent!" );
		//		var e = document.getElementById( 'TTS-Request' );
		//		document.getElementsByTagName('HEAD')[ 0 ].removeChild( e );
		//	};

		__globalTtsLogger.LogMessage( "Sending CrashTest request..." );
		document.getElementsByTagName('HEAD')[ 0 ].appendChild(s);

		checkResponse( 0 );

		return true;
	};

	this.CrashTest2 = function ( ) {

		__globalTtsLogger.ClearLog( );
		__globalTtsLogger.LogMessage( "Entering CrashTest2..." );
		bRequestProcessed = false;

		var d = new Date();
		var hash = d.getTime();

		var url = this.ServerAddress + ":" + this.ServerPort.toString() + "/command=__crash_test_2__?r=" + hash.toString();

		var s = document.createElement('SCRIPT');
		s.charset = 'UTF-8';
		s.src = url;
		s.id = 'TTS-Request';
		//s.onload = function(){
		//		__globalTtsLogger.LogMessage( "CrashTest2 request sent!" );
		//		var e = document.getElementById( 'TTS-Request' );
		//		document.getElementsByTagName('HEAD')[ 0 ].removeChild( e );
		//	};

		__globalTtsLogger.LogMessage( "Sending CrashTest2 request..." );
		document.getElementsByTagName('HEAD')[ 0 ].appendChild(s);

		checkResponse( 0 );

		return true;
	};
}
