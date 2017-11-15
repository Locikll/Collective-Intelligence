var steemws = 'wss://steemd.pevo.science';
var postids = '';
var website = 'http://www.steemit.com';
var initfeedlimit = 50;
var loaddatalim = 25;


if(localStorage.getItem('feedmode') !== null) {
    var feedmode = localStorage.getItem('feedmode');
}
else {
     var feedmode = 'cardmode';
}


$( document ).ready(function() {

    steem.config.set('websocket',steemws);
    



    $('.curator-postview').hide();
    $(".curatormode, .cardmode").hide();
    $("."+feedmode).show()    
    
    
    
    $(".curatormode, .cardmode").click(function(e){
        e.preventDefault();
        $(".curatormode, .cardmode").toggle();
        if(feedmode == 'cardmode') {
            feedmode = 'curatormode';
        } else {
            feedmode = 'cardmode';
            closePost();
        }
        
        localStorage.setItem('feedmode',feedmode);
        
        $('.postfeed').html("");
        feed();
    });
    
    

    //deltascroll = ($('.postfeed')[0].scrollHeight - $('.postfeed').scrollTop());
    
    //$('.postfeed').on('scroll',postfeedscroll);
    
    
    $(window).on('scroll',postfeedscroll);
    
     
    feed();
    
    // SETUP SLIDERS
    $( function() {
     $( "#slider-range" ).slider({range: true, min: 0, max: 100, values: [ 30 , 63 ],width: 50, slide: function( event, ui ) {
         $( "#amount" ).val( "Reputation: " + ui.values[ 0 ] + " - " + ui.values[ 1 ] );}});
     $( "#amount" ).val( "Reputation: " + $( "#slider-range" ).slider( "values", 0 ) + " - " + $( "#slider-range" ).slider( "values", 1 ) );
   } );
    
   $( function() {
     $( "#slider-range1" ).slider({range: true, min: 0, max: 6.5, step: 0.25, values: [ 0 , 2.5 ],width: 50, slide: function( event, uii ) {
         $( "#amount1" ).val( "Age (days): " + uii.values[ 0 ] + " - " + uii.values[ 1 ] );}});
     $( "#amount1" ).val( "Age (days): " + $( "#slider-range1" ).slider( "values", 0 ) + " - " + $( "#slider-range1" ).slider( "values", 1 ) );
   } );
    
    
    
    
});



var feed = function() {
    
    steem.api.getDiscussionsByCreated({"tag":"","limit":initfeedlimit}, function(err, result) {
        console.log(err, result);
        
        $('.postfeed').html("");
        
        var feedmode = localStorage.getItem('feedmode');
        
        for(posts in result) {
            
            DATA = postdata(result,posts);
            
            title = DATA[0];
            author = DATA[1];
            tags = DATA[2];
            postname = DATA[3];
            blurb = DATA[4];
            link = DATA[5];
            url = DATA[6];
            postage = DATA[7];
            agedeno = DATA[8];
            permlink = DATA[9];
            identifier = DATA[10];
            
            if(posts == (initfeedlimit-1)){
                startauthor = author;
                startpermlink = permlink;
            }
            
            
            if(feedmode == 'cardmode') {
            //$('#Tagdata').html(postids);
                $(".postfeed").append('<div class="feedbox"><div class="feedbox-cell feedbox-cell-top"><ul><li><span><a href="'+website+"/"+"@"+author+'"><img class="Avatar" src="https://steemitimages.com/u/'+author+'/avatar/small" style="min-width: 40px; width:40px; height:40px;"></img></a></span> <div class="hidden-xs-usr"> <a href="'+website+"/"+"@"+author+'"> '+" "+author+' </a><br><a style="font-size:0.75em;" href="#">'+postage+agedeno+'</a></div> <span class="hidden-xs"> <a href="'+website+"/hot/"+category+'">#'+category+'</a></span></li> </ul></div> <div class="feedbox-cell feedbox-cell-body"><a href="'+link+'">'+postname+'</a></div>   <div class="feedbox-thumbnail"><a href="'+link+'"><img src="https://steemitimages.com/1280x720/'+image+'" /></a></div> <div class="feedbox-cell feedbox-cell-text"><span><span>'+blurb+'</span></span></div>     </div>').fadeIn();
            }
            if(feedmode=='curatormode') {
                $(".postfeed").append('<div class="feedcurator-avatar"></div><div class="feedcurator"><a href="'+website+"/"+"@"+author+'"><span class="feedcurator-thumbcont"><img src="https://steemitimages.com/1280x720/'+image+'" style=""></span></img></a><p><a href="'+website+"/"+"@"+author+'"><span class=feedcuratorrep>'+repscore+'</span> '+" "+author+' </a> &#9679; in <a href="'+website+"/hot/"+category+'">#'+category+'</a> &#9679; <a>'+postage+agedeno+'</a> &#9679; pending payout: $'+pendingpayout+' <br><b><a onclick="openPost(\'' + permlink + '\' '+","+' \''+author+'\')">'+title+'</a><br></b><span>'+blurb+'</span> </p></div>');
                
                
            }
            
            
            
        }
    });
    
}





var loaddata = function() {
    

    
    if(startauthor !== undefined) {
        
        steem.api.getDiscussionsByCreated({"tag":"","limit":loaddatalim+1,"start_permlink":startpermlink,"start_author":startauthor}, function(err, result) {
            
            console.log(err, result);
            
            var feedmode = localStorage.getItem('feedmode');
            
            for(posts in result) {
                
                if(posts>0) {
                    
                    DATA = postdata(result,posts);
            
                    title = DATA[0];
                    author = DATA[1];
                    tags = DATA[2];
                    postname = DATA[3];
                    blurb = DATA[4];
                    link = DATA[5];
                    url = DATA[6];
                    postage = DATA[7];
                    agedeno = DATA[8];
                    permlink = DATA[9];
                    identifier = DATA[10];
                    
                    pendingpayout = DATA[13];
                    repscore = DATA[14];
                    
                    if(posts == (loaddatalim)){
                        startauthor = author;
                        startpermlink = permlink;
                    }
                    
                    if(feedmode == 'cardmode') {
                        $(".postfeed").append('<div class="feedbox"><div class="feedbox-cell feedbox-cell-top"><ul><li><span><a href="'+website+"/"+"@"+author+'"><img class="Avatar" src="https://steemitimages.com/u/'+author+'/avatar/small" style="min-width: 40px; width:40px; height:40px;"></img></a></span> <div class="hidden-xs-usr"> <a href="'+website+"/"+"@"+author+'"> '+" "+author+' </a><br><a style="font-size:0.75em;" href="#">'+postage+agedeno+'</a></div> <span class="hidden-xs"> <a href="'+website+"/hot/"+category+'">#'+category+'</a></span></li> </ul></div> <div class="feedbox-cell feedbox-cell-body"><a href="'+link+'">'+postname+'</a></div>   <div class="feedbox-thumbnail"><a href="'+link+'"><img src="https://steemitimages.com/1280x720/'+image+'" /></a></div> <div class="feedbox-cell feedbox-cell-text"><span><span>'+blurb+'</span></span></div>     </div>').fadeIn();
                    }
                    if(feedmode=='curatormode') {
                        $(".postfeed").append('<div class="feedcurator-avatar"></div><div class="feedcurator"><a href="'+website+"/"+"@"+author+'"><span class="feedcurator-thumbcont"><img src="https://steemitimages.com/1280x720/'+image+'" style=""></span></img></a><p><a href="'+website+"/"+"@"+author+'"><span class=feedcuratorrep>'+repscore+'</span> '+" "+author+' </a> &#9679; in <a href="'+website+"/hot/"+category+'">#'+category+'</a> &#9679; <a>'+postage+agedeno+'</a> &#9679; pending payout: $'+pendingpayout+' <br><b><a onclick="openPost(\'' + permlink + '\' '+","+' \''+author+'\')">'+title+'</a><br></b><span>'+blurb+'</span> </p></div>');
                
                    }
                    
                }
                else {
                    
                }
                
            }
            
        });
    }
}



var postdata = function(result,posts) {
    
        currentdatetime = new Date();
        datetimeoffset = (currentdatetime.getTimezoneOffset()*60000);
    
        ctime = (Date.parse(currentdatetime) + datetimeoffset);
    
        //postids = (postids + ', ' + result[posts]['url']);
        
        // IF Statements reduce errors due to metadata not stored properly, etc
        if(result[posts]['json_metadata'] != "") {
            metadata = JSON.parse(result[posts]['json_metadata']);
        }
        else{
            metadata = {tags:"none",image:"",links:""};
        }
    
    
        if(metadata.image === undefined) {
            image = '';//'http://files.coinmarketcap.com.s3-website-us-east-1.amazonaws.com/static/img/coins/200x200/steem.png';
        }
        else {
            image = metadata.image[0];
        }
    
    
        if(metadata.tags === undefined) {
            tags = "none"
        }
        else { 
            tags = metadata.tags;
        }
        
        
            
        author = result[posts]['author'];
        category = result[posts]['category'];
        title = result[posts]['title'];
        permlink = result[posts]['permlink'];
        identifier = ('@'+author+'/'+permlink);
    
        pendingpayout = result[posts]['pending_payout_value'];
    
        
        //REPUTATION
        authorrep = result[posts]['author_reputation'];
        
    
        if(authorrep < 1500000000) {
            authorrep2 = -Math.ceil(Math.max(Math.log10(Math.abs(parseFloat(authorrep)))-9,0)*9) + 25;
        }
        if(authorrep > 1500000000) {
            authorrep2 = Math.ceil(Math.max(Math.log10(Math.abs(parseFloat(authorrep)))-9,0)*9) + 25;
        }

        
        repscore = String(authorrep2);
    
    
        //BODY STUFF
        bodywithMD = jQuery('<p>'+result[posts]['body']+'</p>').text();
        bodyNOMD = (removeMd(bodywithMD)).replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    
        bodyFull = result[posts]['body'];
            
        if(bodyNOMD.length > 140) {
            blurb = ( (bodyNOMD.slice(0,140))+'...');
        }
        else {
            blurb = (bodyNOMD.slice(0,140));
        }
        
        // TITLE STUFF
        if(title.length > 62) {
            postname = (result[posts]['title'].slice(0,62)+'...');
        }
        else {
            postname = result[posts]['title'].slice(0,62);
        }
        
        
        
        url = result[posts]['url'];
        
        link = (website+url);
        
        posttime = Date.parse(result[posts]['created']);
        
        timedelta = (ctime - posttime)/(1000);
        
        // Second(s) denomination
        if(timedelta < 60) {
            postage = String(Math.round(timedelta));
            
            if(timedelta < 1) {
            agedeno = ' second ago';
            }
            else{
                agedeno = ' seconds ago';
            }
            
        } 
        //Minute(s) Denomination
        if(timedelta > 60) {
            
            postage = String(Math.round(timedelta/60));
            
            if(postage < 2){
                agedeno = ' minute ago';
            }
            else{
                agedeno = ' minutes ago';
            }
        }
        if(timedelta > 3600) {
            postage = String(Math.round(timedelta/3600));
            
            if(postage < 2){
                agedeno = ' hour ago';
            }
            else{
                agedeno = ' hours ago';
            }
        }
        if(timedelta > 86400) {
            postage = String(Math.round(timedelta/86400));
            
            if(postage < 2){
                agedeno = ' day ago';
            }
            else{
                agedeno = ' days ago';
            }
        }
        if(timedelta > 604800) {
            postage = String(Math.round(timedelta/604800));

            if(postage < 2){
                agedeno = ' week ago';
            }
            else{
                agedeno = ' weeks ago';
            }
        }
        if(timedelta > 2419200) {
            postage = String(Math.round(timedelta/2419200));
            
            if(postage < 2){
                agedeno = ' month ago';
            }
            else{
                agedeno = ' months ago';
            }
        }
        if(timedelta > 220903200) {
            postage = String(Math.round(timedelta/220903200));
            
            if(postage < 2){
                agedeno = ' year ago';
            }
            else{
                agedeno = ' years ago';
            }
        }
    
    return([title,author,tags,postname,blurb,link,url,postage,agedeno,permlink,identifier,bodyNOMD,bodyFull,pendingpayout,repscore]);
    
}





function closePost() {
    $(".curator-postview").html("");
    $(".curator-postview").hide();
    
}



function openPost(pid,pauthor) {
    
    
    
    
    steem.api.getDiscussionsByCreated({"tag":"","limit":1,"start_permlink":pid,"start_author":pauthor}, function(err, result) {
        
        pDATA = postdata(result,0);
        
        title = pDATA[0];
        author = pDATA[1];
        tags = pDATA[2];
        postname = pDATA[3];
        blurb = pDATA[4];
        link = pDATA[5];
        url = pDATA[6];
        postage = pDATA[7];
        agedeno = pDATA[8];
        permlink = pDATA[9];
        identifier = pDATA[10];
        pbodyNoMD = pDATA[11];
        pbody = pDATA[12];
        pendingpayout = pDATA[13];
        repscore = pDATA[14];
        
        // Convert Markdown to HTML
        //pbody = markdown.toHTML(pbody);
        
        var converter = new showdown.Converter();
        
        converter.setFlavor('github');
        
        hbody = converter.makeHtml(pbody);
        
        $(".curator-postview").html("");
        
        $(".curator-postview").append('<div class="feedcurator-postbox"><div class="feedcurator-postbox-close" onclick="closePost();">&#x2715;</div><div class="feedcurator-postbox-title"><p>'+title+'<br><hr style="margin-top:0.75em;"></p></div>' +hbody+ '</div>');
        
        
        $(".curator-postview").show();
        
    });
    
}



loading = false;
  
function postfeedscroll(e) {
    
    var elem = $(e.currentTarget);
    
    
    
    if(feedmode=='curatormode') {
        
        origY = $('.feedcurator').offset().top;
        
        if(loading == false) {
            $(".curator-postview").stop().animate({"marginTop": ($(window).scrollTop()) < origY ? 25 : ($(window).scrollTop()) - origY + 100}, "fast" );
        }
        else {
        
        }
    }
    
    
    if(!loading && ( $(document).height() - elem.scrollTop() == elem.outerHeight() ) ) {
        loading = true;
        loaddata();
        loading = false;
    } 
}   
