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
        <script type="text/javascript" src="js/showdown.min.js"></script>
        <script type="text/javascript" src="js/markdown.js"></script>
        
        <script type="text/javascript" src="js/jquery-ui.min.js"></script>
        
        <script type="text/javascript" src="js/app.js"></script>

	</head>
</html>

<html>

	<body>
  
  <header class="text-center">

    <h1 class="page-logo">Collective Intelligence</h1>
      

    <!--<div class="login" id="login_link"><i class="material-icons small">vpn_key</i> <a href="#login_modal" data-toggle="login_modal">Log in with your steem account</a></div>-->

    <!--<p id="signup_link" class="small signup">
      <a href="https://steemit.com/enter_email">New to steem?</a>
    </p>-->

    <span id="logged_in_message">
      Logged in as <span class="username"></span><br />
      <a href="#logout" id="logout" class="small">Logout</a>    
    </span>
      
    <div class="topnav" id="navbartop">
        <a href="#home">Home</a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
    </div>
      
  </header>
        
    <div class="filterparameters">
        
        
        <div id="slider-range"></div>
        <div id="slider-range1"></div>
        
        
        <!--<p><b> Filter Parameters:</b></p>
        <br>
        <span>
        <input name="ignoredtags" placeholder="Ignored Tags">
        <input name="test2"> 
        </span>-->
        <span class="curatormode"><span>Card Mode</span></span>
        <span class="cardmode"><span>Curator Mode</span></span>
    </div>
        
    
    <div class="papacontainer">

        
        
    <div class="postfeed">

    </div>      
        
        
    <div class="curator-postview">
    </div> 
        
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
        <strong>Isn't this unsafe?</strong>
        <div class="small">
          Like on steemit.com, your key is not sent to a server. Transactions are signed in your browser, and only the hashed signature is transmitted to a steemd node to broadcast it on the steem network. No second party will ever get your key!
        </div>
      </p>

    </div>
  </div>


    </body>   
</html>