(()=>{let t=null,a=100;self.onmessage=function(e){"start"===e.data?t=setInterval((()=>{postMessage("tick")}),a):e.data.interval?(a=e.data.interval,t&&(clearInterval(t),t=setInterval((()=>{postMessage("tick")}),a))):"stop"===e.data&&(clearInterval(t),t=null)}})();