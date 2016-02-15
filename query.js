(function(win){
    'use strict';

    var doc = win.document, 
    simpleRe = /^(#?[\w-]+|\.[\w-.]+)$/, 
    periodRe = /\./g, 
    slice = [].slice,
    classes;

    win.query = function(selector, context){
        context = context || doc;
        // Redirect simple selectors to the more performant function
        if(simpleRe.test(selector)){
            switch(selector.charAt(0)){
                case '#':
                    // Handle ID-based selectors
                    return [context.getElementById(selector.substr(1))];
                case '.':
                    // Handle class-based selectors
                    // Query by multiple classes by converting the selector 
                    // string into single spaced class names
                    classes = selector.substr(1).replace(periodRe, ' ');
                    return slice.call(context.getElementsByClassName(classes));
                default:
                    // Handle tag-based selectors
                    return slice.call(context.getElementsByTagName(selector));
            }
        }
        // Default to `querySelectorAll`
        return slice.call(context.querySelectorAll(selector));
    };
    
})(this);
