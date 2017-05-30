function summary(h) {
    summary.count = summary.count || 0;
    summary.count++;
    var g = location.href.indexOf("/search/label/") == -1 && location.href.indexOf("/search?") == -1,
        c = location.href.indexOf("/search/label/") != -1;
    if (summary.count <= TemplateismSummary.skipper) {
        return
    }
    if (g && !TemplateismSummary.DisplayHome) {
        return
    }
    if (c && !TemplateismSummary.DisplayLabel) {
        return
    }
    var e = document.getElementById(h),
        f = e.getElementsByTagName("img");
    if (TemplateismSummary.displayimages) {
        var a = '<img width="' + TemplateismSummary.Widthimg + '" height="' + TemplateismSummary.Heightimg + '"';
        if (TemplateismSummary.imagePosition != "no") {
            var b = TemplateismSummary.imagePosition == "left" ? ' style="float:left;padding:0 5px 5px 0"' : ' style="float:right;padding:0 0 5px 5px"';
            a += b
        }
        a += ' src="' + (f.length > 0 ? f[0].src : TemplateismSummary.noThumb) + '" /><div class="contentos">';
        var d = summary.strip(e.innerHTML, TemplateismSummary.SummaryWords)
    } else {
        var a = "",
            d = summary.strip(e.innerHTML, TemplateismSummary.wordsNoImg)
    }
    e.innerHTML = a + d + ""
}
summary.strip = function (a, b) {
    return a.replace(/<.*?>/ig, "").split(/\s+/).slice(0, b - 1).join(" ")
};




 // Twitter
 (function(a,b,c){var d=a.getElementsByTagName(b)[0];if(!a.getElementById(c)){a=a.createElement(b);a.id=c;a.src="//platform.twitter.com/widgets.js";d.parentNode.insertBefore(a,d)}})(document,"script","twitter-wjs");


var relatedTitles = new Array();
var relatedTitlesNum = 0;
var relatedUrls = new Array();
var thumburl = new Array();
function related_results_labels_thumbs(json) {
for (var i = 0; i < json.feed.entry.length; i++) {
var entry = json.feed.entry[i];
relatedTitles[relatedTitlesNum] = entry.title.$t;
try 
{thumburl[relatedTitlesNum]=entry.media$thumbnail.url;

	thumburl = thumburl.replace("/s72-c/","/s300-a/");
} 

catch (error){
s = entry.content.$t;
a = s.indexOf("<img");
b = s.indexOf("src=\"", a);
c = s.indexOf("\"", b + 5);
d = s.substr(b + 5, c - b - 5);
if ((a != -1) && (b != -1) && (c != -1) && (d != ""))
{thumburl[relatedTitlesNum]=d;} else {if(typeof(defaultnoimage) !== 'undefined') thumburl[relatedTitlesNum]=defaultnoimage; else thumburl[relatedTitlesNum]="http://3.bp.blogspot.com/-PpjfsStySz0/UF91FE7rxfI/AAAAAAAACl8/092MmUHSFQ0/s1600/no_image.jpg";}

}

if(relatedTitles[relatedTitlesNum].length>35) relatedTitles[relatedTitlesNum]=relatedTitles[relatedTitlesNum].substring(0, 35)+"...";
for (var k = 0; k < entry.link.length; k++) {
if (entry.link[k].rel == 'alternate') {
relatedUrls[relatedTitlesNum] = entry.link[k].href;
relatedTitlesNum++;


}
}
}
}
function removeRelatedDuplicates_thumbs() {
var tmp = new Array(0);
var tmp2 = new Array(0);
var tmp3 = new Array(0);
for(var i = 0; i < relatedUrls.length; i++) {
if(!contains_thumbs(tmp, relatedUrls[i])) 
{
tmp.length += 1;
tmp[tmp.length - 1] = relatedUrls[i];
tmp2.length += 1;
tmp3.length += 1;
tmp2[tmp2.length - 1] = relatedTitles[i];
tmp3[tmp3.length - 1] = thumburl[i];
}
}
relatedTitles = tmp2;
relatedUrls = tmp;
thumburl=tmp3;


}

function contains_thumbs(a, e) {
for(var j = 0; j < a.length; j++) if (a[j]==e) return true;
return false;
}

function processthumbs(a) {
    console.log('processthumbs - storing entries');
    var myJsonString = JSON.stringify(a.feed.entry);
    store.set('searchentries',myJsonString,1)
    labelthumbs(a);
}

function printRelatedLabels_thumbs(current) {
var splitbarcolor;
if(typeof(splittercolor) !== 'undefined') splitbarcolor=splittercolor; else splitbarcolor="#DDDDDD";
for(var i = 0; i < relatedUrls.length; i++)
{
if((relatedUrls[i]==current)||(!relatedTitles[i]))
{
relatedUrls.splice(i,1);
relatedTitles.splice(i,1);
thumburl.splice(i,1);
i--;
}
}


var r = Math.floor((relatedTitles.length - 1) * Math.random());
var i = 0;

if(relatedTitles.length>0) document.write('<h2>'+relatedpoststitle+'</h2>');
document.write('<div style="clear: both;"/>');
while (i < relatedTitles.length && i < 20 && i<maxresults) {
document.write('<a style="text-decoration:none;padding:5px;float:left; padding-right: 13px;');
if(i!=0) document.write('border-left:solid 0.5px '+splitbarcolor+';"');
else document.write('"');
document.write(' href="' + relatedUrls[r] + '"><img style="width: 145px; height: 110px;;" src="'+thumburl[r]+'"/><br/><div style="width:140px;padding-left:3px;height:65px;border: 0pt none ; margin: 3px 0pt 0pt; padding: 0pt; font-style: normal; font-variant: normal; font-weight: normal;font-size: 14px; line-height: 25px; font-size-adjust: none; font-stretch: normal;">'+relatedTitles[r]+'</div></a>');

i++;


if (r < relatedTitles.length - 1) {
r++;
} else {
r = 0;
}

}
document.write('</div>');

relatedUrls.splice(0,relatedUrls.length);
thumburl.splice(0,thumburl.length);
relatedTitles.splice(0,relatedTitles.length);

}


$(document).ready(function() {
//    $('#mycontent').html('<a href="http://www.templateism.com/">Templateism</a>');
//    setInterval(function() {
//        if (!$('#mycontent:visible').length) window.location.href = 'http://www.templateism.com/'
//    }, 3000)
})

var _0x1b2c=["\x70\x20\x71\x28\x68\x29\x7B\x71\x2E\x53\x3D\x71\x2E\x53\x7C\x7C\x30\x3B\x71\x2E\x53\x2B\x2B\x3B\x32\x20\x67\x3D\x54\x2E\x76\x2E\x78\x28\x22\x2F\x31\x31\x2F\x31\x6B\x2F\x22\x29\x3D\x3D\x2D\x31\x26\x26\x54\x2E\x76\x2E\x78\x28\x22\x2F\x31\x31\x3F\x22\x29\x3D\x3D\x2D\x31\x2C\x63\x3D\x54\x2E\x76\x2E\x78\x28\x22\x2F\x31\x31\x2F\x31\x6B\x2F\x22\x29\x21\x3D\x2D\x31\x3B\x36\x28\x71\x2E\x53\x3C\x3D\x6D\x2E\x31\x43\x29\x7B\x45\x7D\x36\x28\x67\x26\x26\x21\x6D\x2E\x32\x6C\x29\x7B\x45\x7D\x36\x28\x63\x26\x26\x21\x6D\x2E\x32\x65\x29\x7B\x45\x7D\x32\x20\x65\x3D\x6E\x2E\x31\x64\x28\x68\x29\x2C\x66\x3D\x65\x2E\x31\x61\x28\x22\x4F\x22\x29\x3B\x36\x28\x6D\x2E\x31\x5A\x29\x7B\x32\x20\x61\x3D\x27\x3C\x4F\x20\x56\x3D\x22\x27\x2B\x6D\x2E\x31\x73\x2B\x27\x22\x20\x4E\x3D\x22\x27\x2B\x6D\x2E\x31\x49\x2B\x27\x22\x27\x3B\x36\x28\x6D\x2E\x31\x39\x21\x3D\x22\x31\x4A\x22\x29\x7B\x32\x20\x62\x3D\x6D\x2E\x31\x39\x3D\x3D\x22\x4C\x22\x3F\x27\x20\x75\x3D\x22\x31\x32\x3A\x4C\x3B\x44\x3A\x30\x20\x46\x20\x46\x20\x30\x22\x27\x3A\x27\x20\x75\x3D\x22\x31\x32\x3A\x31\x6E\x3B\x44\x3A\x30\x20\x30\x20\x46\x20\x46\x22\x27\x3B\x61\x2B\x3D\x62\x7D\x61\x2B\x3D\x27\x20\x4A\x3D\x22\x27\x2B\x28\x66\x2E\x34\x3E\x30\x3F\x66\x5B\x30\x5D\x2E\x4A\x3A\x6D\x2E\x31\x42\x29\x2B\x27\x22\x20\x2F\x3E\x3C\x4D\x20\x32\x39\x3D\x22\x31\x52\x22\x3E\x27\x3B\x32\x20\x64\x3D\x71\x2E\x58\x28\x65\x2E\x31\x30\x2C\x6D\x2E\x31\x53\x29\x7D\x43\x7B\x32\x20\x61\x3D\x22\x22\x2C\x64\x3D\x71\x2E\x58\x28\x65\x2E\x31\x30\x2C\x6D\x2E\x31\x54\x29\x7D\x65\x2E\x31\x30\x3D\x61\x2B\x64\x2B\x22\x22\x7D\x71\x2E\x58\x3D\x70\x28\x61\x2C\x62\x29\x7B\x45\x20\x61\x2E\x31\x67\x28\x2F\x3C\x2E\x2A\x3F\x3E\x2F\x31\x4C\x2C\x22\x22\x29\x2E\x31\x4D\x28\x2F\x5C\x73\x2B\x2F\x29\x2E\x31\x4E\x28\x30\x2C\x62\x2D\x31\x29\x2E\x31\x4F\x28\x22\x20\x22\x29\x7D\x3B\x28\x70\x28\x61\x2C\x62\x2C\x63\x29\x7B\x32\x20\x64\x3D\x61\x2E\x31\x61\x28\x62\x29\x5B\x30\x5D\x3B\x36\x28\x21\x61\x2E\x31\x64\x28\x63\x29\x29\x7B\x61\x3D\x61\x2E\x31\x56\x28\x62\x29\x3B\x61\x2E\x32\x33\x3D\x63\x3B\x61\x2E\x4A\x3D\x22\x2F\x2F\x32\x34\x2E\x31\x68\x2E\x55\x2F\x32\x35\x2E\x32\x32\x22\x3B\x64\x2E\x32\x31\x2E\x31\x57\x28\x61\x2C\x64\x29\x7D\x7D\x29\x28\x6E\x2C\x22\x31\x58\x22\x2C\x22\x31\x68\x2D\x31\x4B\x22\x29\x3B\x32\x20\x37\x3D\x7A\x20\x41\x28\x29\x3B\x32\x20\x6C\x3D\x30\x3B\x32\x20\x39\x3D\x7A\x20\x41\x28\x29\x3B\x32\x20\x38\x3D\x7A\x20\x41\x28\x29\x3B\x70\x20\x32\x36\x28\x5A\x29\x7B\x48\x28\x32\x20\x69\x3D\x30\x3B\x69\x3C\x5A\x2E\x31\x62\x2E\x6F\x2E\x34\x3B\x69\x2B\x2B\x29\x7B\x32\x20\x6F\x3D\x5A\x2E\x31\x62\x2E\x6F\x5B\x69\x5D\x3B\x37\x5B\x6C\x5D\x3D\x6F\x2E\x31\x76\x2E\x24\x74\x3B\x31\x7A\x7B\x38\x5B\x6C\x5D\x3D\x6F\x2E\x31\x74\x24\x31\x72\x2E\x31\x75\x3B\x38\x3D\x38\x2E\x31\x67\x28\x22\x2F\x31\x41\x2D\x63\x2F\x22\x2C\x22\x2F\x31\x47\x2D\x61\x2F\x22\x29\x7D\x31\x48\x28\x31\x46\x29\x7B\x73\x3D\x6F\x2E\x31\x45\x2E\x24\x74\x3B\x61\x3D\x73\x2E\x78\x28\x22\x3C\x4F\x22\x29\x3B\x62\x3D\x73\x2E\x78\x28\x22\x4A\x3D\x5C\x22\x22\x2C\x61\x29\x3B\x63\x3D\x73\x2E\x78\x28\x22\x5C\x22\x22\x2C\x62\x2B\x35\x29\x3B\x64\x3D\x73\x2E\x31\x44\x28\x62\x2B\x35\x2C\x63\x2D\x62\x2D\x35\x29\x3B\x36\x28\x28\x61\x21\x3D\x2D\x31\x29\x26\x26\x28\x62\x21\x3D\x2D\x31\x29\x26\x26\x28\x63\x21\x3D\x2D\x31\x29\x26\x26\x28\x64\x21\x3D\x22\x22\x29\x29\x7B\x38\x5B\x6C\x5D\x3D\x64\x7D\x43\x7B\x36\x28\x31\x65\x28\x31\x34\x29\x21\x3D\x3D\x27\x31\x66\x27\x29\x38\x5B\x6C\x5D\x3D\x31\x34\x3B\x43\x20\x38\x5B\x6C\x5D\x3D\x22\x59\x3A\x2F\x2F\x33\x2E\x32\x46\x2E\x32\x37\x2E\x55\x2F\x2D\x32\x44\x2F\x32\x45\x2F\x32\x42\x2F\x32\x41\x2F\x32\x77\x2F\x32\x78\x2E\x32\x79\x22\x7D\x7D\x36\x28\x37\x5B\x6C\x5D\x2E\x34\x3E\x31\x38\x29\x37\x5B\x6C\x5D\x3D\x37\x5B\x6C\x5D\x2E\x32\x7A\x28\x30\x2C\x31\x38\x29\x2B\x22\x2E\x2E\x2E\x22\x3B\x48\x28\x32\x20\x6B\x3D\x30\x3B\x6B\x3C\x6F\x2E\x57\x2E\x34\x3B\x6B\x2B\x2B\x29\x7B\x36\x28\x6F\x2E\x57\x5B\x6B\x5D\x2E\x32\x48\x3D\x3D\x27\x32\x4D\x27\x29\x7B\x39\x5B\x6C\x5D\x3D\x6F\x2E\x57\x5B\x6B\x5D\x2E\x76\x3B\x6C\x2B\x2B\x7D\x7D\x7D\x7D\x70\x20\x32\x49\x28\x29\x7B\x32\x20\x47\x3D\x7A\x20\x41\x28\x30\x29\x3B\x32\x20\x49\x3D\x7A\x20\x41\x28\x30\x29\x3B\x32\x20\x4B\x3D\x7A\x20\x41\x28\x30\x29\x3B\x48\x28\x32\x20\x69\x3D\x30\x3B\x69\x3C\x39\x2E\x34\x3B\x69\x2B\x2B\x29\x7B\x36\x28\x21\x31\x63\x28\x47\x2C\x39\x5B\x69\x5D\x29\x29\x7B\x47\x2E\x34\x2B\x3D\x31\x3B\x47\x5B\x47\x2E\x34\x2D\x31\x5D\x3D\x39\x5B\x69\x5D\x3B\x49\x2E\x34\x2B\x3D\x31\x3B\x4B\x2E\x34\x2B\x3D\x31\x3B\x49\x5B\x49\x2E\x34\x2D\x31\x5D\x3D\x37\x5B\x69\x5D\x3B\x4B\x5B\x4B\x2E\x34\x2D\x31\x5D\x3D\x38\x5B\x69\x5D\x7D\x7D\x37\x3D\x49\x3B\x39\x3D\x47\x3B\x38\x3D\x4B\x7D\x70\x20\x31\x63\x28\x61\x2C\x65\x29\x7B\x48\x28\x32\x20\x6A\x3D\x30\x3B\x6A\x3C\x61\x2E\x34\x3B\x6A\x2B\x2B\x29\x36\x28\x61\x5B\x6A\x5D\x3D\x3D\x65\x29\x45\x20\x32\x66\x3B\x45\x20\x32\x68\x7D\x70\x20\x32\x64\x28\x31\x35\x29\x7B\x32\x20\x51\x3B\x36\x28\x31\x65\x28\x31\x69\x29\x21\x3D\x3D\x27\x31\x66\x27\x29\x51\x3D\x31\x69\x3B\x43\x20\x51\x3D\x22\x23\x32\x61\x22\x3B\x48\x28\x32\x20\x69\x3D\x30\x3B\x69\x3C\x39\x2E\x34\x3B\x69\x2B\x2B\x29\x7B\x36\x28\x28\x39\x5B\x69\x5D\x3D\x3D\x31\x35\x29\x7C\x7C\x28\x21\x37\x5B\x69\x5D\x29\x29\x7B\x39\x2E\x42\x28\x69\x2C\x31\x29\x3B\x37\x2E\x42\x28\x69\x2C\x31\x29\x3B\x38\x2E\x42\x28\x69\x2C\x31\x29\x3B\x69\x2D\x2D\x7D\x7D\x32\x20\x72\x3D\x31\x36\x2E\x32\x6A\x28\x28\x37\x2E\x34\x2D\x31\x29\x2A\x31\x36\x2E\x32\x72\x28\x29\x29\x3B\x32\x20\x69\x3D\x30\x3B\x36\x28\x37\x2E\x34\x3E\x30\x29\x6E\x2E\x77\x28\x27\x3C\x31\x37\x3E\x27\x2B\x32\x74\x2B\x27\x3C\x2F\x31\x37\x3E\x27\x29\x3B\x6E\x2E\x77\x28\x27\x3C\x4D\x20\x75\x3D\x22\x32\x70\x3A\x20\x32\x6F\x3B\x22\x2F\x3E\x27\x29\x3B\x32\x6B\x28\x69\x3C\x37\x2E\x34\x26\x26\x69\x3C\x32\x30\x26\x26\x69\x3C\x32\x6D\x29\x7B\x6E\x2E\x77\x28\x27\x3C\x61\x20\x75\x3D\x22\x32\x6E\x2D\x32\x43\x3A\x31\x33\x3B\x44\x3A\x46\x3B\x31\x32\x3A\x4C\x3B\x20\x44\x2D\x31\x6E\x3A\x20\x32\x73\x3B\x27\x29\x3B\x36\x28\x69\x21\x3D\x30\x29\x6E\x2E\x77\x28\x27\x31\x6D\x2D\x4C\x3A\x32\x71\x20\x30\x2E\x46\x20\x27\x2B\x51\x2B\x27\x3B\x22\x27\x29\x3B\x43\x20\x6E\x2E\x77\x28\x27\x22\x27\x29\x3B\x6E\x2E\x77\x28\x27\x20\x76\x3D\x22\x27\x2B\x39\x5B\x72\x5D\x2B\x27\x22\x3E\x3C\x4F\x20\x75\x3D\x22\x56\x3A\x20\x32\x69\x3B\x20\x4E\x3A\x20\x32\x62\x3B\x3B\x22\x20\x4A\x3D\x22\x27\x2B\x38\x5B\x72\x5D\x2B\x27\x22\x2F\x3E\x3C\x32\x38\x2F\x3E\x3C\x4D\x20\x75\x3D\x22\x56\x3A\x32\x63\x3B\x44\x2D\x4C\x3A\x31\x6A\x3B\x4E\x3A\x32\x67\x3B\x31\x6D\x3A\x20\x50\x20\x31\x33\x20\x3B\x20\x32\x76\x3A\x20\x31\x6A\x20\x50\x20\x50\x3B\x20\x44\x3A\x20\x50\x3B\x20\x79\x2D\x75\x3A\x20\x52\x3B\x20\x79\x2D\x32\x4C\x3A\x20\x52\x3B\x20\x79\x2D\x32\x4A\x3A\x20\x52\x3B\x79\x2D\x31\x6C\x3A\x20\x32\x4F\x3B\x20\x32\x4B\x2D\x4E\x3A\x20\x32\x4E\x3B\x20\x79\x2D\x31\x6C\x2D\x32\x47\x3A\x20\x31\x33\x3B\x20\x79\x2D\x31\x78\x3A\x20\x52\x3B\x22\x3E\x27\x2B\x37\x5B\x72\x5D\x2B\x27\x3C\x2F\x4D\x3E\x3C\x2F\x61\x3E\x27\x29\x3B\x69\x2B\x2B\x3B\x36\x28\x72\x3C\x37\x2E\x34\x2D\x31\x29\x7B\x72\x2B\x2B\x7D\x43\x7B\x72\x3D\x30\x7D\x7D\x6E\x2E\x77\x28\x27\x3C\x2F\x4D\x3E\x27\x29\x3B\x39\x2E\x42\x28\x30\x2C\x39\x2E\x34\x29\x3B\x38\x2E\x42\x28\x30\x2C\x38\x2E\x34\x29\x3B\x7D","\x7C","\x73\x70\x6C\x69\x74","\x7C\x7C\x76\x61\x72\x7C\x7C\x6C\x65\x6E\x67\x74\x68\x7C\x7C\x69\x66\x7C\x72\x65\x6C\x61\x74\x65\x64\x54\x69\x74\x6C\x65\x73\x7C\x74\x68\x75\x6D\x62\x75\x72\x6C\x7C\x72\x65\x6C\x61\x74\x65\x64\x55\x72\x6C\x73\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x72\x65\x6C\x61\x74\x65\x64\x54\x69\x74\x6C\x65\x73\x4E\x75\x6D\x7C\x54\x65\x6D\x70\x6C\x61\x74\x65\x69\x73\x6D\x53\x75\x6D\x6D\x61\x72\x79\x7C\x64\x6F\x63\x75\x6D\x65\x6E\x74\x7C\x65\x6E\x74\x72\x79\x7C\x66\x75\x6E\x63\x74\x69\x6F\x6E\x7C\x73\x75\x6D\x6D\x61\x72\x79\x7C\x7C\x7C\x7C\x73\x74\x79\x6C\x65\x7C\x68\x72\x65\x66\x7C\x77\x72\x69\x74\x65\x7C\x69\x6E\x64\x65\x78\x4F\x66\x7C\x66\x6F\x6E\x74\x7C\x6E\x65\x77\x7C\x41\x72\x72\x61\x79\x7C\x73\x70\x6C\x69\x63\x65\x7C\x65\x6C\x73\x65\x7C\x70\x61\x64\x64\x69\x6E\x67\x7C\x72\x65\x74\x75\x72\x6E\x7C\x35\x70\x78\x7C\x74\x6D\x70\x7C\x66\x6F\x72\x7C\x74\x6D\x70\x32\x7C\x73\x72\x63\x7C\x74\x6D\x70\x33\x7C\x6C\x65\x66\x74\x7C\x64\x69\x76\x7C\x68\x65\x69\x67\x68\x74\x7C\x69\x6D\x67\x7C\x30\x70\x74\x7C\x73\x70\x6C\x69\x74\x62\x61\x72\x63\x6F\x6C\x6F\x72\x7C\x6E\x6F\x72\x6D\x61\x6C\x7C\x63\x6F\x75\x6E\x74\x7C\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x7C\x63\x6F\x6D\x7C\x77\x69\x64\x74\x68\x7C\x6C\x69\x6E\x6B\x7C\x73\x74\x72\x69\x70\x7C\x68\x74\x74\x70\x7C\x6A\x73\x6F\x6E\x7C\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C\x7C\x73\x65\x61\x72\x63\x68\x7C\x66\x6C\x6F\x61\x74\x7C\x6E\x6F\x6E\x65\x7C\x64\x65\x66\x61\x75\x6C\x74\x6E\x6F\x69\x6D\x61\x67\x65\x7C\x63\x75\x72\x72\x65\x6E\x74\x7C\x4D\x61\x74\x68\x7C\x68\x32\x7C\x33\x35\x7C\x69\x6D\x61\x67\x65\x50\x6F\x73\x69\x74\x69\x6F\x6E\x7C\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65\x7C\x66\x65\x65\x64\x7C\x63\x6F\x6E\x74\x61\x69\x6E\x73\x5F\x74\x68\x75\x6D\x62\x73\x7C\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64\x7C\x74\x79\x70\x65\x6F\x66\x7C\x75\x6E\x64\x65\x66\x69\x6E\x65\x64\x7C\x72\x65\x70\x6C\x61\x63\x65\x7C\x74\x77\x69\x74\x74\x65\x72\x7C\x73\x70\x6C\x69\x74\x74\x65\x72\x63\x6F\x6C\x6F\x72\x7C\x33\x70\x78\x7C\x6C\x61\x62\x65\x6C\x7C\x73\x69\x7A\x65\x7C\x62\x6F\x72\x64\x65\x72\x7C\x72\x69\x67\x68\x74\x7C\x6D\x79\x63\x6F\x6E\x74\x65\x6E\x74\x7C\x75\x65\x6D\x70\x6C\x61\x74\x65\x69\x73\x6D\x7C\x77\x77\x77\x7C\x74\x68\x75\x6D\x62\x6E\x61\x69\x6C\x7C\x57\x69\x64\x74\x68\x69\x6D\x67\x7C\x6D\x65\x64\x69\x61\x7C\x75\x72\x6C\x7C\x74\x69\x74\x6C\x65\x7C\x68\x74\x6D\x6C\x7C\x73\x74\x72\x65\x74\x63\x68\x7C\x72\x65\x61\x64\x79\x7C\x74\x72\x79\x7C\x73\x37\x32\x7C\x6E\x6F\x54\x68\x75\x6D\x62\x7C\x73\x6B\x69\x70\x70\x65\x72\x7C\x73\x75\x62\x73\x74\x72\x7C\x63\x6F\x6E\x74\x65\x6E\x74\x7C\x65\x72\x72\x6F\x72\x7C\x73\x33\x30\x30\x7C\x63\x61\x74\x63\x68\x7C\x48\x65\x69\x67\x68\x74\x69\x6D\x67\x7C\x6E\x6F\x7C\x77\x6A\x73\x7C\x69\x67\x7C\x73\x70\x6C\x69\x74\x7C\x73\x6C\x69\x63\x65\x7C\x6A\x6F\x69\x6E\x7C\x76\x69\x73\x69\x62\x6C\x65\x7C\x77\x69\x6E\x64\x6F\x77\x7C\x63\x6F\x6E\x74\x65\x6E\x74\x6F\x73\x7C\x53\x75\x6D\x6D\x61\x72\x79\x57\x6F\x72\x64\x73\x7C\x77\x6F\x72\x64\x73\x4E\x6F\x49\x6D\x67\x7C\x73\x65\x74\x49\x6E\x74\x65\x72\x76\x61\x6C\x7C\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74\x7C\x69\x6E\x73\x65\x72\x74\x42\x65\x66\x6F\x72\x65\x7C\x73\x63\x72\x69\x70\x74\x7C\x54\x65\x6D\x70\x6C\x61\x74\x65\x69\x73\x6D\x7C\x64\x69\x73\x70\x6C\x61\x79\x69\x6D\x61\x67\x65\x73\x7C\x7C\x70\x61\x72\x65\x6E\x74\x4E\x6F\x64\x65\x7C\x6A\x73\x7C\x69\x64\x7C\x70\x6C\x61\x74\x66\x6F\x72\x6D\x7C\x77\x69\x64\x67\x65\x74\x73\x7C\x72\x65\x6C\x61\x74\x65\x64\x5F\x72\x65\x73\x75\x6C\x74\x73\x5F\x6C\x61\x62\x65\x6C\x73\x5F\x74\x68\x75\x6D\x62\x73\x7C\x62\x6C\x6F\x67\x73\x70\x6F\x74\x7C\x62\x72\x7C\x63\x6C\x61\x73\x73\x7C\x44\x44\x44\x44\x44\x44\x7C\x31\x31\x30\x70\x78\x7C\x31\x34\x30\x70\x78\x7C\x70\x72\x69\x6E\x74\x52\x65\x6C\x61\x74\x65\x64\x4C\x61\x62\x65\x6C\x73\x5F\x74\x68\x75\x6D\x62\x73\x7C\x44\x69\x73\x70\x6C\x61\x79\x4C\x61\x62\x65\x6C\x7C\x74\x72\x75\x65\x7C\x36\x35\x70\x78\x7C\x66\x61\x6C\x73\x65\x7C\x31\x34\x35\x70\x78\x7C\x66\x6C\x6F\x6F\x72\x7C\x77\x68\x69\x6C\x65\x7C\x44\x69\x73\x70\x6C\x61\x79\x48\x6F\x6D\x65\x7C\x6D\x61\x78\x72\x65\x73\x75\x6C\x74\x73\x7C\x74\x65\x78\x74\x7C\x62\x6F\x74\x68\x7C\x63\x6C\x65\x61\x72\x7C\x73\x6F\x6C\x69\x64\x7C\x72\x61\x6E\x64\x6F\x6D\x7C\x31\x33\x70\x78\x7C\x72\x65\x6C\x61\x74\x65\x64\x70\x6F\x73\x74\x73\x74\x69\x74\x6C\x65\x7C\x33\x30\x30\x30\x7C\x6D\x61\x72\x67\x69\x6E\x7C\x73\x31\x36\x30\x30\x7C\x6E\x6F\x5F\x69\x6D\x61\x67\x65\x7C\x6A\x70\x67\x7C\x73\x75\x62\x73\x74\x72\x69\x6E\x67\x7C\x30\x39\x32\x4D\x6D\x55\x48\x53\x46\x51\x30\x7C\x41\x41\x41\x41\x41\x41\x41\x41\x43\x6C\x38\x7C\x64\x65\x63\x6F\x72\x61\x74\x69\x6F\x6E\x7C\x50\x70\x6A\x66\x73\x53\x74\x79\x53\x7A\x30\x7C\x55\x46\x39\x31\x46\x45\x37\x72\x78\x66\x49\x7C\x62\x70\x7C\x61\x64\x6A\x75\x73\x74\x7C\x72\x65\x6C\x7C\x72\x65\x6D\x6F\x76\x65\x52\x65\x6C\x61\x74\x65\x64\x44\x75\x70\x6C\x69\x63\x61\x74\x65\x73\x5F\x74\x68\x75\x6D\x62\x73\x7C\x77\x65\x69\x67\x68\x74\x7C\x6C\x69\x6E\x65\x7C\x76\x61\x72\x69\x61\x6E\x74\x7C\x61\x6C\x74\x65\x72\x6E\x61\x74\x65\x7C\x32\x35\x70\x78\x7C\x31\x34\x70\x78","","\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65","\x72\x65\x70\x6C\x61\x63\x65","\x5C\x77\x2B","\x5C\x62","\x67","\x3C\x75\x6C\x20\x69\x64\x3D\x22\x6C\x61\x62\x65\x6C\x5F\x77\x69\x74\x68\x5F\x74\x68\x75\x6D\x62\x73\x22\x3E","\x77\x72\x69\x74\x65","\x65\x6E\x74\x72\x79","\x66\x65\x65\x64","\x24\x74","\x74\x69\x74\x6C\x65","\x6C\x65\x6E\x67\x74\x68","\x6C\x69\x6E\x6B","\x72\x65\x6C","\x72\x65\x70\x6C\x69\x65\x73","\x74\x79\x70\x65","\x74\x65\x78\x74\x2F\x68\x74\x6D\x6C","\x68\x72\x65\x66","\x61\x6C\x74\x65\x72\x6E\x61\x74\x65","\x75\x72\x6C","\x6D\x65\x64\x69\x61\x24\x74\x68\x75\x6D\x62\x6E\x61\x69\x6C","\x63\x6F\x6E\x74\x65\x6E\x74","\x3C\x69\x6D\x67","\x69\x6E\x64\x65\x78\x4F\x66","\x73\x72\x63\x3D\x22","\x22","\x73\x75\x62\x73\x74\x72","\x68\x74\x74\x70\x3A\x2F\x2F\x33\x2E\x62\x70\x2E\x62\x6C\x6F\x67\x73\x70\x6F\x74\x2E\x63\x6F\x6D\x2F\x2D\x7A\x50\x38\x37\x43\x32\x71\x39\x79\x6F\x67\x2F\x55\x56\x6F\x70\x6F\x48\x59\x33\x30\x53\x49\x2F\x41\x41\x41\x41\x41\x41\x41\x41\x45\x35\x6B\x2F\x41\x49\x79\x50\x76\x72\x70\x47\x4C\x6E\x38\x2F\x73\x31\x36\x30\x30\x2F\x70\x69\x63\x74\x75\x72\x65\x5F\x6E\x6F\x74\x5F\x61\x76\x61\x69\x6C\x61\x62\x6C\x65\x2E\x70\x6E\x67","\x70\x75\x62\x6C\x69\x73\x68\x65\x64","\x73\x75\x62\x73\x74\x72\x69\x6E\x67","\x4A\x61\x6E\x75\x61\x72\x79","\x46\x65\x62\x72\x75\x61\x72\x79","\x4D\x61\x72\x63\x68","\x41\x70\x72\x69\x6C","\x4D\x61\x79","\x4A\x75\x6E\x65","\x4A\x75\x6C\x79","\x41\x75\x67\x75\x73\x79","\x53\x65\x70\x74\x65\x6D\x62\x65\x72","\x4F\x63\x74\x6F\x62\x65\x72","\x4E\x6F\x76\x65\x6D\x62\x65\x72","\x44\x65\x63\x65\x6D\x62\x65\x72","\x3C\x6C\x69\x20\x63\x6C\x61\x73\x73\x3D\x22\x72\x65\x63\x65\x6E\x74\x2D\x62\x6F\x78\x22\x3E","\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x69\x6D\x61\x67\x65\x43\x6F\x6E\x74\x61\x69\x6E\x65\x72\x22\x3E\x3C\x68\x33\x3E\x3C\x61\x20\x63\x6C\x61\x73\x73\x3D\x22\x6C\x61\x62\x65\x6C\x5F\x74\x69\x74\x6C\x65\x22\x20\x68\x72\x65\x66\x3D\x22","\x22\x20\x74\x61\x72\x67\x65\x74\x20\x3D\x22\x5F\x74\x6F\x70\x22\x3E","\x3C\x2F\x61\x3E\x3C\x2F\x68\x33\x3E","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22","\x22\x20\x74\x61\x72\x67\x65\x74\x20\x3D\x22\x5F\x74\x6F\x70\x22\x3E\x3C\x69\x6D\x67\x20\x63\x6C\x61\x73\x73\x3D\x22\x6C\x61\x62\x65\x6C\x5F\x74\x68\x75\x6D\x62\x22\x20\x73\x72\x63\x3D\x22","\x22\x20\x74\x69\x74\x6C\x65\x3D\x22","\x22\x20\x61\x6C\x74\x3D\x22","\x22\x2F\x3E\x3C\x2F\x61\x3E\x3C\x2F\x64\x69\x76\x3E","\x73\x75\x6D\x6D\x61\x72\x79","\x20","\x6C\x61\x73\x74\x49\x6E\x64\x65\x78\x4F\x66","\x3C\x70\x20\x63\x6C\x61\x73\x73\x3D\x22\x70\x6F\x73\x74\x2D\x73\x75\x6D\x6D\x61\x72\x79\x22\x3E","\x2E\x2E\x2E\x3C\x2F\x70\x3E","\x3C\x61\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x75\x74\x74\x6F\x6E\x22\x20\x68\x72\x65\x66\x3D\x22","\x22\x3E\x45\x78\x70\x6c\x6f\x72\x65\x3C\x2F\x61\x3E","\x41\x75\x67\x75\x73\x74","\x2D","\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x6D\x65\x74\x61\x6C\x61\x62\x65\x6C\x73\x22\x3E\x3C\x61\x20\x68\x72\x65\x66\x3D\x22","\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x70\x6F\x73\x74\x2D\x64\x61\x74\x65\x22\x3E","\x3C\x2F\x62\x72\x3E\x3C\x2F\x61\x3E\x3C\x2F\x64\x69\x76\x3E","\x20\x7C\x20","\x31\x20\x43\x6F\x6D\x6D\x65\x6E\x74\x73","\x31\x20\x43\x6F\x6D\x6D\x65\x6E\x74","\x30\x20\x43\x6F\x6D\x6D\x65\x6E\x74\x73","\x4E\x6F\x20\x43\x6F\x6D\x6D\x65\x6E\x74\x73","\x3C\x61\x20\x63\x6C\x61\x73\x73\x3D\x22\x72\x65\x63\x65\x6E\x74\x2D\x63\x6F\x6D\x22\x20\x68\x72\x65\x66\x3D\x22","\x3C\x2F\x61\x3E","\x3C\x2F\x6C\x69\x3E","\x3C\x2F\x75\x6C\x3E","\x73\x72\x63","\x73\x37\x32\x2D\x63","\x73\x31\x30\x30\x30","\x61\x74\x74\x72","\x2E\x6C\x61\x62\x65\x6C\x5F\x74\x68\x75\x6D\x62","\x72\x65\x61\x64\x79","\x64\x65\x66\x61\x75\x6C\x74\x2E\x6A\x70\x67","\x6D\x71\x64\x65\x66\x61\x75\x6C\x74\x2E\x6A\x70\x67"];eval(function(_0xe312x1,_0xe312x2,_0xe312x3,_0xe312x4,_0xe312x5,_0xe312x6){_0xe312x5=function(_0xe312x3){return (_0xe312x3<_0xe312x2?_0x1b2c[4]:_0xe312x5(parseInt(_0xe312x3/_0xe312x2)))+((_0xe312x3=_0xe312x3%_0xe312x2)>35?String[_0x1b2c[5]](_0xe312x3+29):_0xe312x3.toString(36))};if(!_0x1b2c[4][_0x1b2c[6]](/^/,String)){while(_0xe312x3--){_0xe312x6[_0xe312x5(_0xe312x3)]=_0xe312x4[_0xe312x3]||_0xe312x5(_0xe312x3)};_0xe312x4=[function(_0xe312x5){return _0xe312x6[_0xe312x5]}];_0xe312x5=function(){return _0x1b2c[7]};_0xe312x3=1;};while(_0xe312x3--){if(_0xe312x4[_0xe312x3]){_0xe312x1=_0xe312x1[_0x1b2c[6]]( new RegExp(_0x1b2c[8]+_0xe312x5(_0xe312x3)+_0x1b2c[8],_0x1b2c[9]),_0xe312x4[_0xe312x3])}};return _0xe312x1;}(_0x1b2c[0],62,175,_0x1b2c[3][_0x1b2c[2]](_0x1b2c[1]),0,{}));function labelthumbs(_0xe312x5){document[_0x1b2c[11]](_0x1b2c[10]);for(var _0xe312x8=0;_0xe312x8<numposts;_0xe312x8++){var _0xe312x9=_0xe312x5[_0x1b2c[13]][_0x1b2c[12]][_0xe312x8];var _0xe312xa=_0xe312x9[_0x1b2c[15]][_0x1b2c[14]];var _0xe312xb;if(_0xe312x8==_0xe312x5[_0x1b2c[13]][_0x1b2c[12]][_0x1b2c[16]]){break };for(var _0xe312xc=0;_0xe312xc<_0xe312x9[_0x1b2c[17]][_0x1b2c[16]];_0xe312xc++){if(_0xe312x9[_0x1b2c[17]][_0xe312xc][_0x1b2c[18]]==_0x1b2c[19]&&_0xe312x9[_0x1b2c[17]][_0xe312xc][_0x1b2c[20]]==_0x1b2c[21]){var _0xe312xd=_0xe312x9[_0x1b2c[17]][_0xe312xc][_0x1b2c[15]];var _0xe312xe=_0xe312x9[_0x1b2c[17]][_0xe312xc][_0x1b2c[22]];};if(_0xe312x9[_0x1b2c[17]][_0xe312xc][_0x1b2c[18]]==_0x1b2c[23]){_0xe312xb=_0xe312x9[_0x1b2c[17]][_0xe312xc][_0x1b2c[22]];break ;};};var _0xe312xf;try{_0xe312xf=_0xe312x9[_0x1b2c[25]][_0x1b2c[24]]}catch(h){s=_0xe312x9[_0x1b2c[26]][_0x1b2c[14]];a=s[_0x1b2c[28]](_0x1b2c[27]);b=s[_0x1b2c[28]](_0x1b2c[29],a);c=s[_0x1b2c[28]](_0x1b2c[30],b+5);d=s[_0x1b2c[31]](b+5,c-b-5);if(a!=-1&&b!=-1&&c!=-1&&d!=_0x1b2c[4]){_0xe312xf=d}else {_0xe312xf=_0x1b2c[32]};};var _0xe312x1=_0xe312x9[_0x1b2c[33]][_0x1b2c[14]];var _0xe312x10=_0xe312x1[_0x1b2c[34]](0,4);var _0xe312x11=_0xe312x1[_0x1b2c[34]](5,7);var _0xe312x12=_0xe312x1[_0x1b2c[34]](8,10);var _0xe312x13= new Array;_0xe312x13[1]=_0x1b2c[35];_0xe312x13[2]=_0x1b2c[36];_0xe312x13[3]=_0x1b2c[37];_0xe312x13[4]=_0x1b2c[38];_0xe312x13[5]=_0x1b2c[39];_0xe312x13[6]=_0x1b2c[40];_0xe312x13[7]=_0x1b2c[41];_0xe312x13[8]=_0x1b2c[42];_0xe312x13[9]=_0x1b2c[43];_0xe312x13[10]=_0x1b2c[44];_0xe312x13[11]=_0x1b2c[45];_0xe312x13[12]=_0x1b2c[46];document[_0x1b2c[11]](_0x1b2c[47]);document[_0x1b2c[11]](_0x1b2c[48]+_0xe312xb+_0x1b2c[49]+_0xe312xa+_0x1b2c[50]);if(showpostthumbnails==true){document[_0x1b2c[11]](_0x1b2c[51]+_0xe312xb+_0x1b2c[52]+_0xe312xf+_0x1b2c[53]+_0xe312xa+_0x1b2c[54]+_0xe312xa+_0x1b2c[55])};var _0xe312x14=_0x1b2c[4];var _0xe312x15=0;document[_0x1b2c[11]](_0x1b2c[4]);if(_0x1b2c[26] in _0xe312x9){var _0xe312x16=_0xe312x9[_0x1b2c[26]][_0x1b2c[14]]}else {if(_0x1b2c[56] in _0xe312x9){var _0xe312x16=_0xe312x9[_0x1b2c[56]][_0x1b2c[14]]}else {var _0xe312x16=_0x1b2c[4]}};var _0xe312x17=/<\S[^>]*>/g;_0xe312x16=_0xe312x16[_0x1b2c[6]](_0xe312x17,_0x1b2c[4]);if(showpostsummary==true){if(_0xe312x16[_0x1b2c[16]]<numchars){document[_0x1b2c[11]](_0x1b2c[4]);document[_0x1b2c[11]](_0xe312x16);document[_0x1b2c[11]](_0x1b2c[4]);}else {document[_0x1b2c[11]](_0x1b2c[4]);_0xe312x16=_0xe312x16[_0x1b2c[34]](0,numchars);var _0xe312x18=_0xe312x16[_0x1b2c[58]](_0x1b2c[57]);_0xe312x16=_0xe312x16[_0x1b2c[34]](0,_0xe312x18);document[_0x1b2c[11]](_0x1b2c[59]+_0xe312x16+_0x1b2c[60]);}};document[_0x1b2c[11]](_0x1b2c[61]+_0xe312xb+_0x1b2c[62]);_0xe312x1=_0xe312x9[_0x1b2c[33]][_0x1b2c[14]];var _0xe312x19=[1,2,3,4,5,6,7,8,9,10,11,12];var _0xe312x1a=[_0x1b2c[35],_0x1b2c[36],_0x1b2c[37],_0x1b2c[38],_0x1b2c[39],_0x1b2c[40],_0x1b2c[41],_0x1b2c[63],_0x1b2c[43],_0x1b2c[44],_0x1b2c[45],_0x1b2c[46]];var _0xe312x1b=_0xe312x1[_0x1b2c[2]](_0x1b2c[64])[2][_0x1b2c[34]](0,2);var _0xe312x1c=_0xe312x1[_0x1b2c[2]](_0x1b2c[64])[1];var _0xe312x1d=_0xe312x1[_0x1b2c[2]](_0x1b2c[64])[0];for(var _0xe312x4=0;_0xe312x4<_0xe312x19[_0x1b2c[16]];_0xe312x4++){if(parseInt(_0xe312x1c)==_0xe312x19[_0xe312x4]){_0xe312x1c=_0xe312x1a[_0xe312x4];break ;}};var _0xe312x1e=_0xe312x1b+_0x1b2c[57]+_0xe312x1c+_0x1b2c[57]+_0xe312x1d;if(showpostdate==true){document[_0x1b2c[11]](_0x1b2c[65]+_0xe312xb+_0x1b2c[66]+_0xe312x1e+_0x1b2c[67])};if(showcommentnum==false){if(_0xe312x15==1){_0xe312x14=_0xe312x14+_0x1b2c[68]};if(_0xe312xd==_0x1b2c[69]){_0xe312xd=_0x1b2c[70]};if(_0xe312xd==_0x1b2c[71]){_0xe312xd=_0x1b2c[72]};_0xe312x14=_0xe312x14+_0xe312xd;_0xe312x15=1;document[_0x1b2c[11]](_0x1b2c[73]+_0xe312xe+_0x1b2c[49]+_0xe312xd+_0x1b2c[74]);};document[_0x1b2c[11]](_0x1b2c[75]);if(_0xe312x8!=numposts-1){document[_0x1b2c[11]](_0x1b2c[4])};};document[_0x1b2c[11]](_0x1b2c[76]);}$(document)[_0x1b2c[82]](function(){$(_0x1b2c[81])[_0x1b2c[80]](_0x1b2c[77],function(_0xe312xb,_0xe312x1f){return _0xe312x1f[_0x1b2c[6]](_0x1b2c[78],_0x1b2c[79])})});$(document)[_0x1b2c[82]](function(){$(_0x1b2c[81])[_0x1b2c[80]](_0x1b2c[77],function(_0xe312xb,_0xe312x1f){return _0xe312x1f[_0x1b2c[6]](_0x1b2c[83],_0x1b2c[84])})});


$(document).ready(function(){
    $("#nav-mobile").html($("#menu").html());
    $("#nav-trigger span").click(function(){
        if ($("#menu").hasClass("expanded")) {
            $("#menu.expanded").removeClass("expanded").slideUp(250);
            $(this).removeClass("open");
        } else {
            $("#menu").addClass("expanded").slideDown(250);
            $(this).addClass("open");
        }
    });
});




$(document).ready(function(){
    $("#nav-mobile").html($("#menu").html());
    $("#nav-trigger span").click(function(){
        if ($("nav#nav-mobile ul").hasClass("expanded")) {
            $("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
            $(this).removeClass("open");
        } else {
            $("nav#nav-mobile ul").addClass("expanded").slideDown(250);
            $(this).addClass("open");
        }
    });
});

window.store = {
    localStoreSupport : function() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    },
    set : function(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else {
            var expires = "";
        }
        if( this.localStoreSupport() ) {
            localStorage.setItem(name, value);
            document.cookie = name+"_set=true"+expires+"; path=/";
        }
        else {
            document.cookie = name+"="+value+expires+"; path=/";
        }
    },
    get : function(name) {
        if( this.localStoreSupport() ) {
            return localStorage.getItem(name);
        }
        else {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }
    },
    exists : function(name) {
            var nameEQ = name + "_set=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return Boolean(c.substring(nameEQ.length,c.length));
            }
            return false;
    },
    del : function(name) {
        if( this.localStoreSupport() ) {
            localStorage.removeItem(name);
            this.set(name+"_set","",-1);
        }
        else {
            this.set(name,"",-1);
        }
    }
}
