module.exports = function(path, method, callbacks) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.open(method, path, true);
  xmlhttp.setRequestHeader("Connection", "close");

  if (typeof callbacks !== 'undefined') {
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        if (typeof callbacks[xmlhttp.status] !== 'undefined') {
          callbacks[xmlhttp.status].call(callbacks.context, xmlhttp);
        } else if (typeof callbacks.failure === 'undefined') {
          console.error("Cannot callback after finishing request.", xmlhttp);
        } else {
          callbacks.failure.call(callbacks.context, xmlhttp);
        }
      }
    };
  }

  return xmlhttp;
};
