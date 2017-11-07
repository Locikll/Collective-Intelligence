<html>
	<head>
		<!--<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />-->
		<title>Collective Intelligence</title>
        
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="STEEM Collective Intelligence">

        <link href="https://fonts.googleapis.com/css?family=Lato:400,900" rel="stylesheet">
        <!--<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">-->
        <link rel="stylesheet" href="css/index.css">

 
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/jquery.mousewheel.min.js"></script>  
        <script type="text/javascript" src="js/steem.min.js"></script>
        <script type="text/javascript" src="js/mdremove.js"></script>
        
        <script type="text/javascript" src="js/app.js"></script>
<!-- dual slider scripts -->		
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script>
$( function() {
    $( "#slider-range" ).slider({range: true, min: 0, max: 100, values: [ 30 , 63 ],width: 50, slide: function( event, ui ) {
        $( "#amount" ).val( "Reputation: " + ui.values[ 0 ] + " - " + ui.values[ 1 ] );}});
    $( "#amount" ).val( "Reputation: " + $( "#slider-range" ).slider( "values", 0 ) + " - " + $( "#slider-range" ).slider( "values", 1 ) );
  } );
  </script>
  <script>
  $( function() {
    $( "#slider-range1" ).slider({range: true, min: 0, max: 6.5, step: 0.25, values: [ 0 , 2.5 ],width: 50, slide: function( event, uii ) {
        $( "#amount1" ).val( "Age (days): " + uii.values[ 0 ] + " - " + uii.values[ 1 ] );}});
    $( "#amount1" ).val( "Age (days): " + $( "#slider-range1" ).slider( "values", 0 ) + " - " + $( "#slider-range1" ).slider( "values", 1 ) );
  } );
  </script>
	
<script> //This section is for the HD pictures button
	var SD = 'https://steemitimages.com/256x512/'; var HD = 'https://steemitimages.com/1280x720/';
	function gotohd(){var img = document.querySelectorAll('.feedbox-thumbnail img'); for (var i = 0; i < img.length; i++) { img[i].src = img[i].src.replace('https://steemitimages.com/256x512/', 'https://steemitimages.com/1280x720/');}; document.getElementById('sdhd').style.display = 'none';document.getElementById('hdsd').style.display = 'block'; };
	function gotosd(){var img = document.querySelectorAll('.feedbox-thumbnail img'); for (var i = 0; i < img.length; i++) { img[i].src = img[i].src.replace('https://steemitimages.com/1280x720/', 'https://steemitimages.com/256x512/');}; document.getElementById('hdsd').style.display = 'none';document.getElementById('sdhd').style.display = 'block'; };
</script>	
	
	</head>
</html>

<html>
	<body>
  
  <header class="text-center">


      

    <!--<div class="login" id="login_link"><i class="material-icons small">vpn_key</i> <a href="#login_modal" data-toggle="login_modal">Log in with your steem account</a></div>-->

    <!--<p id="signup_link" class="small signup">
      <a href="https://steemit.com/enter_email">New to steem?</a>
    </p>-->

    <span id="logged_in_message">
      Logged in as <span class="username"></span><br />
      <a href="#logout" id="logout" class="small">Logout</a>    
    </span>
      
    
      
  </header>
  <div id='gra' class='pull-left'>      
    <h1 class="page-logo">Collective Intelligence</h1>		
	
	<div class="topnav" id="navbartop">
        <a href="#home">Home</a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
    	</div>		
<input type="text" id="amount" readonly style="border:0; color:#aaaaaa; font-weight:bold;">
<div id="slider-range"></div><hr>
<input type="text" id="amount1" readonly style="border:0; color:#aaaaaa; font-weight:bold;">
<div id="slider-range1"></div>	
    <div class="filterparameters">
        
    	   <input name="keywords" placeholder="Keywords">
    	   <input name="ignoredtags" placeholder="Ignore">
	   <input type="number" min="250" name="wordcountmin" placeholder="Word #">
	   <input type="number" min="0" name="payout" placeholder="$Payout$">
		  <table>
		  <tr><td> Has Picture?</td><td> <input type="checkbox" id="pic" name="photo"></td></tr>
		  <tr><td> Show NSFW?</td><td> <input type="checkbox" id="nsfw" name="nsfw"></td></tr>
		  </table>
	<div id='sdhd' style='display:block'><input type=button onclick="gotohd();" value='Show HD Pics?'></div>	
	<div id='hdsd' style='display:none'><input type=button onclick="gotosd();" value='Show SD Pics?'></div>	
	<input style='background-color: #cccccc;' name='filtersubmit' type='submit' value='Apply Filters'></div>
    </div>
        
    <div class="postfeed">

    </div>      
        
        
    
    

  <!--<footer class="page-footer text-center smaller">    
    <p>
      <a href="#about" data-toggle="about_modal">about</a> |
      <a href="http://www.github.com/locikll" target="_blank">github</a> |
      <a href="http://www.steemit.com/@locikll">support</a> |
      <a href="#">daily reports</a>
    </p>
  </footer>-->

  <div id="login_modal" class="modal" data-toggle="login_modal">
    <div class="modal__inner box">

      <h2>Login</h2>
      <p>
        <label for="username">Account Name</label>
        <input type="text" name="username" id="username" />
      </p>
      <p>
        <label for="username">Password or WIF <a href="#about" data-toggle="about_modal">(?)</a></label>
        <input type="password" name="password" id="password" />
      </p>
      <div id="login_error" class="error">Error logging in. Please try again.</div>
      <button id="login_button">Login</button>
      <span id="busy_indicator">Logging in...</span>   
    </div>
  </div>

  <div id="about_modal" class="modal" data-toggle="about_modal">
    <div class="modal__inner box">

      <h2>About</h2>

      <p>About Collective Intelligence</p>

      <p>
        <strong>Is this safe?</strong>
        <div class="small">
          Like on steemit.com, your key is not sent to a server. Transactions are signed in your browser, and only the hashed signature is transmitted to a steemd node to broadcast it on the steem network. No second party will ever get your key!
        </div>
      </p>

    </div>
  </div>


    </body>   
</html>
