$(document).ready(function(){
    
    var debug = false;

    var words;
    
    var vowels = ["a", "e", "ə", "i", "ı",  "ö", "o", "ü", "u"];
    
    function getSyllables(word) {
     
        var syllables = new Array();
        
        var c = word.length; // length of the word
        var i = c-1; // cursor
        var l = 1; // last syllable length
        var vowelFound = false;
        
        while (i > -1) {
            
            var _i = '', _i_1 = '', _s = '', _c = '', _c_1 = '', _l = l;
            
            var push = false;
            
            if ( i == 0) { // latest letter: push 
                push = true;
                
            } else {
                
                var currentIsVowel = _.contains(vowels, word[i].toLowerCase());
                var previousIsVowel = _.contains(vowels, word[i-1].toLowerCase());
                
                _i = currentIsVowel;
                _i_1 = previousIsVowel;
                
                if ( currentIsVowel ) vowelFound = true;

                if ( currentIsVowel && previousIsVowel) {
                    push = true;
                }

                if ( (!currentIsVowel) && previousIsVowel && l > 1 && vowelFound) {
                    push = true;
                }

                if ( (!currentIsVowel) && (!previousIsVowel) && l > 1 && vowelFound) {
                    push = true;
                }
                
                
            }

            
            if (push) {
                
                var s = word.substr(i, l);
                syllables.unshift(s);
                
                l = 0;
                vowelFound = false;
                
                _s = s;
                
            }
            
            if (debug)
                alert('i=' + i + ' (' + previousIsVowel + ', ' + currentIsVowel + '), (' + _c_1 + ', ' + _c  +'), l=' + _l + ', s: ' + _s )
            
            l++; // syllable is goind on
            i--; // move cursor
        }
        
        return syllables;
        
    }
    
    $.getJSON( "words.json", function( data ) {
        words = data;
    });
    
    $("#search").click(function(){
        
        var query = $("#query").val();
        var syllables = getSyllables(query);
        var result = _.filter(words, function(word){ return word.match( _.last(syllables) + "$" ); });
        
        $("#results").text("");
        $.each(result, function(num, word) {
            $("#results").append('<span>' + word + "</span> ");
        });
        
        
        
    });
    
});