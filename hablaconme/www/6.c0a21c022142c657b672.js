(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{yDmo:function(t,n,e){"use strict";e.r(n),e.d(n,"KEYBOARD_DID_CLOSE",(function(){return o})),e.d(n,"KEYBOARD_DID_OPEN",(function(){return i})),e.d(n,"copyLayoutViewport",(function(){return K})),e.d(n,"copyVisualViewport",(function(){return E})),e.d(n,"keyboardDidClose",(function(){return y})),e.d(n,"keyboardDidOpen",(function(){return g})),e.d(n,"keyboardDidResize",(function(){return b})),e.d(n,"resetKeyboardAssist",(function(){return f})),e.d(n,"setKeyboardClose",(function(){return w})),e.d(n,"setKeyboardOpen",(function(){return p})),e.d(n,"startKeyboardAssist",(function(){return s})),e.d(n,"trackViewportChanges",(function(){return k}));var i="ionKeyboardDidShow",o="ionKeyboardDidHide",r={},u={},d={},a={},c=!1,f=function(){r={},u={},d={},a={},c=!1},s=function(t){h(t),t.visualViewport&&(u=E(t.visualViewport),a=K(t),t.visualViewport.onresize=function(){k(t),g()||b(t)?p(t):y(t)&&w(t)})},h=function(t){t.addEventListener("keyboardDidShow",(function(n){return p(t,n)})),t.addEventListener("keyboardDidHide",(function(){return w(t)}))},p=function(t,n){v(t,n),c=!0},w=function(t){l(t),c=!1},g=function(){return!c&&r.width===u.width&&(r.height-u.height)*u.scale>150&&!D()},b=function(t){return c&&!y(t)},y=function(t){return c&&u.height===t.innerHeight},D=function(){return a.width!==d.width||a.height!==d.height},v=function(t,n){var e=new CustomEvent(i,{detail:{keyboardHeight:n?n.keyboardHeight:t.innerHeight-u.height}});t.dispatchEvent(e)},l=function(t){var n=new CustomEvent(o);t.dispatchEvent(n)},k=function(t){r=Object.assign({},u),u=E(t.visualViewport),d=Object.assign({},a),a=K(t)},E=function(t){return{width:Math.round(t.width),height:Math.round(t.height),offsetTop:t.offsetTop,offsetLeft:t.offsetLeft,pageTop:t.pageTop,pageLeft:t.pageLeft,scale:t.scale}},K=function(t){return{width:t.innerWidth,height:t.innerHeight}}}}]);