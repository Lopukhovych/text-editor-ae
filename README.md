# Simple text editor
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Initial setup
Run `npm install` in order to setup application

## Development server
Run `npm start` for a dev server.

## Notes
+ Text sample is given in `text.service.js`
+ Given files structure is not obligatory and could be changed

###Approaches
There were two approaches how to solve this task.
+ Using `document.execCommand` in ControlPanel component;
+ Wrapping every styled word in `span` with necessary class;

After trying to implement the second solution, was chosen make the first as easier one.

###Idea
The idea of solution is to get position and content of chosen word, and with changing styles
or text on a synonym, add new content instead on the old one. 

###Problem
The problem is that when we have structure like this  
`<b><i>some text</i> qwer</b>`, wanna change `qwer` 
to synonym, when we click on synonym we change `some text` content instead of `qwer`
This happen because `range.startOffset` and `range.endOffset` from `range` in 

```sh
const selection = window.getSelection();
range = selection.getRangeAt(0);
return {range: range, parentNode: selection.rangeCount > 0 
    ? range.startContainer.parentNode : null};
```
return position of `ome `, not `qwer`.



