void keyPressed(KeyEvent event) {
  try {
    nashorn.eval("for(var prop in pApplet) {if(!this.isReservedFunction(prop)) {globalSketch[prop] = pApplet[prop]}}");

    nashorn.eval("var pAppletEvent = {};");
    Object pAppletEvent = nashorn.eval("this.pAppletEvent");
    Object jsObject = nashorn.eval("Object");
    ((Invocable)nashorn).invokeMethod(jsObject, "bindProperties", pAppletEvent, event);

    nashorn.eval("if(globalSketch.keyPressed != null) globalSketch.keyPressed(this.pAppletEvent)");
  }
  catch (Exception e) {
    e.printStackTrace();
  }
}

void keyReleased(KeyEvent event) {
  try {
    nashorn.eval("for(var prop in pApplet) {if(!this.isReservedFunction(prop)) {globalSketch[prop] = pApplet[prop]}}");

    nashorn.eval("var pAppletEvent = {};");
    Object pAppletEvent = nashorn.eval("this.pAppletEvent");
    Object jsObject = nashorn.eval("Object");
    ((Invocable)nashorn).invokeMethod(jsObject, "bindProperties", pAppletEvent, event);

    nashorn.eval("if(globalSketch.keyReleased != null) globalSketch.keyReleased(this.pAppletEvent)");
  }
  catch (Exception e) {
    e.printStackTrace();
  }
}

void keyTyped(KeyEvent event) {
  try {
    nashorn.eval("for(var prop in pApplet) {if(!this.isReservedFunction(prop)) {globalSketch[prop] = pApplet[prop]}}");

    nashorn.eval("var pAppletEvent = {};");
    Object pAppletEvent = nashorn.eval("this.pAppletEvent");
    Object jsObject = nashorn.eval("Object");
    ((Invocable)nashorn).invokeMethod(jsObject, "bindProperties", pAppletEvent, event);

    nashorn.eval("if(globalSketch.keyTyped != null) globalSketch.keyTyped(this.pAppletEvent)");
  }
  catch (Exception e) {
    e.printStackTrace();
  }
}

void mouseClicked(MouseEvent event) {
  try {
    nashorn.eval("for(var prop in pApplet) {if(!this.isReservedFunction(prop)) {globalSketch[prop] = pApplet[prop]}}");

    nashorn.eval("var pAppletEvent = {};");
    Object pAppletEvent = nashorn.eval("this.pAppletEvent");
    Object jsObject = nashorn.eval("Object");
    ((Invocable)nashorn).invokeMethod(jsObject, "bindProperties", pAppletEvent, event);

    nashorn.eval("if(globalSketch.mouseClicked != null) globalSketch.mouseClicked(this.pAppletEvent)");
  }
  catch (Exception e) {
    e.printStackTrace();
  }
}

void mouseDragged(MouseEvent event) {
  try {
    nashorn.eval("for(var prop in pApplet) {if(!this.isReservedFunction(prop)) {globalSketch[prop] = pApplet[prop]}}");

    nashorn.eval("var pAppletEvent = {};");
    Object pAppletEvent = nashorn.eval("this.pAppletEvent");
    Object jsObject = nashorn.eval("Object");
    ((Invocable)nashorn).invokeMethod(jsObject, "bindProperties", pAppletEvent, event);

    nashorn.eval("if(globalSketch.mouseDragged != null) globalSketch.mouseDragged(this.pAppletEvent)");
  }
  catch (Exception e) {
    e.printStackTrace();
  }
}

void mouseMoved(MouseEvent event) {
  try {
    nashorn.eval("for(var prop in pApplet) {if(!this.isReservedFunction(prop)) {globalSketch[prop] = pApplet[prop]}}");

    nashorn.eval("var pAppletEvent = {};");
    Object pAppletEvent = nashorn.eval("this.pAppletEvent");
    Object jsObject = nashorn.eval("Object");
    ((Invocable)nashorn).invokeMethod(jsObject, "bindProperties", pAppletEvent, event);

    nashorn.eval("if(globalSketch.mouseMoved != null) globalSketch.mouseMoved(this.pAppletEvent)");
  }
  catch (Exception e) {
    e.printStackTrace();
  }
}

void mouseReleased(MouseEvent event) {
  try {
    nashorn.eval("for(var prop in pApplet) {if(!this.isReservedFunction(prop)) {globalSketch[prop] = pApplet[prop]}}");

    nashorn.eval("var pAppletEvent = {};");
    Object pAppletEvent = nashorn.eval("this.pAppletEvent");
    Object jsObject = nashorn.eval("Object");
    ((Invocable)nashorn).invokeMethod(jsObject, "bindProperties", pAppletEvent, event);

    nashorn.eval("if(globalSketch.mouseReleased != null) globalSketch.mouseReleased(this.pAppletEvent)");
  }
  catch (Exception e) {
    e.printStackTrace();
  }
}

void mouseWheel(MouseEvent event) {
  try {
    nashorn.eval("for(var prop in pApplet) {if(!this.isReservedFunction(prop)) {globalSketch[prop] = pApplet[prop]}}");

    nashorn.eval("var pAppletEvent = {};");
    Object pAppletEvent = nashorn.eval("this.pAppletEvent");
    Object jsObject = nashorn.eval("Object");
    ((Invocable)nashorn).invokeMethod(jsObject, "bindProperties", pAppletEvent, event);

    nashorn.eval("if(globalSketch.mouseWheel != null) globalSketch.mouseWheel(this.pAppletEvent)");
  }
  catch (Exception e) {
    e.printStackTrace();
  }
}

void mousePressed(MouseEvent event) {
  try {
    nashorn.eval("for(var prop in pApplet) {if(!this.isReservedFunction(prop)) {globalSketch[prop] = pApplet[prop]}}");

    nashorn.eval("var pAppletEvent = {};");
    Object pAppletEvent = nashorn.eval("this.pAppletEvent");
    Object jsObject = nashorn.eval("Object");
    ((Invocable)nashorn).invokeMethod(jsObject, "bindProperties", pAppletEvent, event);

    nashorn.eval("if(globalSketch.mousePressed != null) globalSketch.mousePressed(this.pAppletEvent)");
  }
  catch (Exception e) {
    e.printStackTrace();
  }
}

void oscEvent(OscMessage theOscMessage) {
  try {
    nashorn.eval("for(var prop in pApplet) {if(!this.isReservedFunction(prop)) {globalSketch[prop] = pApplet[prop]}}");

    nashorn.eval("var theOscMessage = {}");
    Object theOscMessageObject = nashorn.eval("this.theOscMessage");
    Object jsObject = nashorn.eval("Object");
    ((Invocable)nashorn).invokeMethod(jsObject, "bindProperties", theOscMessageObject, (OscMessage)theOscMessage);

    nashorn.eval("if(globalSketch.oscEvent != null) globalSketch.oscEvent(this.theOscMessage)");
  }
  catch (Exception e) {
    e.printStackTrace();
  }
}