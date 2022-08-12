var img;
var x;
var y;

try {
    img = chrome.storage.local.get('img');
    x = chrome.storage.local.get('x');
    y = chrome.storage.local.get('y');
} catch (error) {
    img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kb9LQlEUxz9poZRhUFBDg4Q1ZZiB1NJglAXVYAb9WvT5K1B7vKdEtAatQkHU0q+h/oJag+YgKIogGqO5qKXkdZ4KSuS53HM/93vPOdx7LljCaSWjN3ohk81poWDAtbC45LK9YsdBAx10RhRdnZmbCFPXvh4kUuzOY9aqH/evtcTiugINduFRRdVywpPC0+s51eRd4Q4lFYkJnwv3a3JB4XtTj5b5zeRkmX9M1sKhMbC0CbuSNRytYSWlZYTl5bgz6bxSuY/5Ekc8Oz8na4/MbnRCBAngYopxxvAzyIh4Px58DMiOOvneUv4sa5KriFfZQGOVJCly9Iual+pxWROix2Wk2TD7/7evemLIV67uCEDTi2F89IJtB4oFw/g+NoziCVif4SpbzV87guFP0QtVzX0Izi24uK5q0T243IauJzWiRUqSVaYlkYD3M2hdhPZbaF4u96xyzukjhDflq25g/wD6JN658gsgz2fGZAMRVwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAMdJREFUKJGdk7EOgjAQhv8jzF11c5PROPV1TCQxPgXhKVggcfZN+giwuenaF6hDCz3BVuxNl/T/el+uACQVATBK/MdInaVNy5c3fc3NjD4wktpURUCs52TGDoIMAFMVXCRbwyxJL7m7HOIYANT9XBLA43j/2Tg7jFsiqc0mNolePukkSer2uu9Y6Hx6Tn132wJoAZKDJZ2kUaJsBn63jfKmbIbpDZzkmk0CoLq3YT+Nxi3FGdv7BzBKkIyR/CvJQwfxSvwDEusNtyNRhijSZdYAAAAASUVORK5CYII=";
    x = 106;
    y = 116;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.sender == 1) {
        img = message.img;
        x = message.x;
        y = message.y;

        //chrome.storage.local.set({img: img}, () => {});
        console.log(x);
        console.log(y);
        console.log(img);

        sendResponse("Success!");
        return;
    }

    sendResponse({
        img: img,
        x: x,
        y: y
    });
    
});