var steemws = 'wss://steemd.pevo.science';
var postids = '';
var website = 'http://www.steemit.com';
var initfeedlimit = 50;
var loaddatalim = 25;

$( document ).ready(function() {

    steem.config.set('websocket',steemws);

    //deltascroll = ($('.postfeed')[0].scrollHeight - $('.postfeed').scrollTop());
    
    //$('.postfeed').on('scroll',postfeedscroll);
    
    $(window).on('scroll',postfeedscroll);
    
    currentdatetime = new Date();
    datetimeoffset = (currentdatetime.getTimezoneOffset()*60000);
    
    ctime = (Date.parse(currentdatetime) + datetimeoffset);
    
  
    
    feed();   
    
    
});


var feed = function() {
    
    
    
    steem.api.getDiscussionsByCreated({"tag":"","limit":initfeedlimit}, function(err, result) {
        console.log(err, result);
        
        $('.postfeed').html("");
        
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
            
            //$('#Tagdata').html(postids);
            $(".postfeed").append('<div class="feedbox"><div class="feedbox-cell feedbox-cell-top"><ul><li><span><a href="'+website+"/"+"@"+author+'"><img class="Avatar" src="https://steemitimages.com/u/'+author+'/avatar/small" style="min-width: 40px; width:40px; height:40px;"></img></a></span> <div class="hidden-xs-usr"> <a href="'+website+"/"+"@"+author+'"> '+" "+author+' </a><br><a style="font-size:0.75em;" href="#">'+postage+agedeno+'</a></div> <span class="hidden-xs"> <a href="'+website+"/hot/"+category+'">#'+category+'</a></span></li> </ul></div> <div class="feedbox-cell feedbox-cell-body"><a href="'+link+'">'+postname+'</a></div>   <div class="feedbox-thumbnail"><a href="'+link+'"><img src="https://steemitimages.com/256x512/'+image+'" /></a></div> <div class="feedbox-cell feedbox-cell-text"><span><span>'+blurb+'</span></span></div>     </div>').fadeIn();
            
        }
    });
    
}





var loaddata = function() {
    
    if(startauthor !== undefined) {
        
        steem.api.getDiscussionsByCreated({"tag":"","limit":loaddatalim+1,"start_permlink":startpermlink,"start_author":startauthor}, function(err, result) {
            
            console.log(err, result);
            
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
                    
                    if(posts == (loaddatalim)){
                        startauthor = author;
                        startpermlink = permlink;
                    }
                    
                    $(".postfeed").append('<div class="feedbox"><div class="feedbox-cell feedbox-cell-top"><ul><li><span><a href="'+website+"/"+"@"+author+'"><img class="Avatar" src="https://steemitimages.com/u/'+author+'/avatar/small" style="min-width: 40px; width:40px; height:40px;"></img></a></span> <div class="hidden-xs-usr"> <a href="'+website+"/"+"@"+author+'"> '+" "+author+' </a><br><a style="font-size:0.75em;" href="#">'+postage+agedeno+'</a></div> <span class="hidden-xs"> <a href="'+website+"/hot/"+category+'">#'+category+'</a></span></li> </ul></div> <div class="feedbox-cell feedbox-cell-body"><a href="'+link+'">'+postname+'</a></div>   <div class="feedbox-thumbnail"><a href="'+link+'"><img src="https://steemitimages.com/256x512/'+image+'" /></a></div> <div class="feedbox-cell feedbox-cell-text"><span><span>'+blurb+'</span></span></div>     </div>').fadeIn();
                    
                       
                }
                else {
                    
                }
                
            }
            
        });
    }
}



var postdata = function(result,posts) {
    
        //postids = (postids + ', ' + result[posts]['url']);
        metadata = JSON.parse(result[posts]['json_metadata']);
            
        if(metadata.image === undefined) {
            image = 'http://files.coinmarketcap.com.s3-website-us-east-1.amazonaws.com/static/img/coins/200x200/steem.png';//'http://files.coinmarketcap.com.s3-website-us-east-1.amazonaws.com/static/img/coins/200x200/steem.png';
        }
        else {
            image = metadata.image[0];
        }
        
        tags = metadata.tags;
            
        author = result[posts]['author'];
        category = result[posts]['category'];
        title = result[posts]['title'];
        permlink = result[posts]['permlink'];
        identifier = ('@'+author+'/'+permlink);
        //BODY STUFF
        bodywithMD = jQuery('<p>'+result[posts]['body']+'</p>').text();
        bodyNOMD = (removeMd(bodywithMD)).replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
            
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
    
    return([title,author,tags,postname,blurb,link,url,postage,agedeno,permlink,identifier]);
    
}




loading = false;
  
function postfeedscroll(e) {
    
    var elem = $(e.currentTarget);
    if(!loading && ( $(document).height() - elem.scrollTop() == elem.outerHeight() ) ) {
        loading = true;
        loaddata();
        loading = false;
    } 
}   
