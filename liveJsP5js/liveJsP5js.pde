import javax.script.ScriptEngineManager;
import javax.script.ScriptEngine;
import javax.script.ScriptContext;
import javax.script.ScriptException;
import javax.script.Invocable;

import java.lang.NoSuchMethodException;
import java.lang.reflect.*;

import java.util.ArrayList;
import java.util.List;

import java.io.IOException;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;
import processing.awt.PSurfaceAWT;

import peasy.PeasyCam;

import oscP5.*;
import netP5.*;

OscP5 oscP5;
NetAddress myRemoteLocation;

private static ScriptEngineManager engineManager;
private static ScriptEngine nashorn;

public static String VERSION = "0.1";

private static ArrayList<String> scriptPaths = new ArrayList<String>();
private static long prevModified;

public String drawMode = "p2d"; // "p2d" / "webgl"
public int newWidth, newHeight;

public PApplet that = this;

float frameRate() {
  return frameRate;
}

void setup() {
  oscP5 = new OscP5(this, 7000);

  size(400, 400, P3D);
  surface.setResizable(true);
  frameRate(60);

  scriptPaths.add(sketchPath("../CC_09_SolarSystemGenerator3D_texture/Planet.js"));
  scriptPaths.add(sketchPath("../CC_09_SolarSystemGenerator3D_texture/sketch.js"));

  initNashorn();
}

void initNashorn() {
  engineManager = new ScriptEngineManager();
  nashorn = engineManager.getEngineByName("nashorn");

  try {
    // init placehoders
    nashorn.eval("var pApplet = {}; var globalSketch = {};");
    Object global = nashorn.eval("this.pApplet");
    Object jsObject = nashorn.eval("Object");
    // calling Object.bindProperties(global, this);
    // which will "bind" properties of the PApplet object
    ((Invocable)nashorn).invokeMethod(jsObject, "bindProperties", global, (PApplet)this);

    // console.log is print
    nashorn.eval("var console = {}; console.log = print;");

    nashorn.eval("var alternateSketch = new function(){};");

    // PConstants
    nashorn.eval("var PConstantsFields = Packages.processing.core.PConstants.class.getFields();");
    nashorn.eval("for(var i = 0; i < PConstantsFields.length; i++) {alternateSketch[PConstantsFields[i].getName()] = PConstantsFields[i].get({})}");

    // **_ARROW in p5.js
    nashorn.eval("alternateSketch.UP_ARROW = alternateSketch.UP");
    nashorn.eval("alternateSketch.DOWN_ARROW = alternateSketch.DOWN");
    nashorn.eval("alternateSketch.LEFT_ARROW = alternateSketch.LEFT");
    nashorn.eval("alternateSketch.RIGHT_ARROW = alternateSketch.RIGHT");

    // static methods
    nashorn.eval("var PAppletFields = pApplet.class.getMethods();");
    nashorn.eval(
      "for(var i = 0; i < PAppletFields.length; i++) {" +
      "var found = false;" +
      "  for(var prop in pApplet) {" +
      "    if(prop == PAppletFields[i].getName() ) found = true;" +
      "  }" +
      "  if(!found){"+
      "    alternateSketch[PAppletFields[i].getName()] = PAppletFields[i];" +
      "    eval('alternateSketch[PAppletFields[i].getName()] = function() {" +
      "      if(arguments.length == 0) return Packages.processing.core.PApplet.'+PAppletFields[i].getName()+'();" +
      "      if(arguments.length == 1) return Packages.processing.core.PApplet.'+PAppletFields[i].getName()+'(arguments[0]);" +
      "      if(arguments.length == 2) return Packages.processing.core.PApplet.'+PAppletFields[i].getName()+'(arguments[0], arguments[1]);" +
      "      if(arguments.length == 3) return Packages.processing.core.PApplet.'+PAppletFields[i].getName()+'(arguments[0], arguments[1], arguments[2]);" +
      "      if(arguments.length == 4) return Packages.processing.core.PApplet.'+PAppletFields[i].getName()+'(arguments[0], arguments[1], arguments[2], arguments[3]);" +
      "      if(arguments.length == 5) return Packages.processing.core.PApplet.'+PAppletFields[i].getName()+'(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);" +
      "    }')" +
      "  }" +
      "}");

    // overwrite random
    nashorn.eval("alternateSketch.random = function() {" +
      "  if(arguments.length == 1) return Math.random() * arguments[0];" +
      "  if(arguments.length == 2) return sketch.map(Math.random(), 0, 1, arguments[0], arguments[1]);" +
      "}");

    // overwrite constrain (int/float arity signature problem)
    nashorn.eval("alternateSketch.constrain = function(x, xl, xh) {" +
      "  return Math.min(Math.max(x, xl), xh);" +
      "}");

    // overwrite ellipse for short handed circle
    nashorn.eval("alternateSketch.ellipse = function() {" +
      "  if(arguments.length == 3) return pApplet.ellipse(arguments[0], arguments[1], arguments[2], arguments[2]);" +
      "  if(arguments.length == 4) return pApplet.ellipse(arguments[0], arguments[1], arguments[2], arguments[3]);" +
      "}");

    // createVector
    nashorn.eval("alternateSketch.createVector = function(x, y, z) { return new Packages.processing.core.PVector(x, y, z); }");

    // push / pop
    nashorn.eval("alternateSketch.push = function() {alternateSketch.pushMatrix(); alternateSketch.pushStyle();}");
    nashorn.eval("alternateSketch.pop = function() {alternateSketch.popMatrix(); alternateSketch.popStyle();}");

    // createCanvas reads draw mode
    nashorn.eval("alternateSketch.P2D = 'p2d';");
    nashorn.eval("alternateSketch.WEBGL = 'webgl';");
    nashorn.eval("alternateSketch.createCanvas = function(w, h, mode) {"+
      "  alternateSketch.width = w; alternateSketch.height = h;" +
      "  pApplet.newWidth = w; pApplet.newHeight = h; pApplet.drawMode = mode;" +
      "}");

    // utility
    // avoids standard functions like setup/draw/... as they will be overwritten in the script
    // also avoids ellipse, color to define separately
    nashorn.eval("this.isReservedFunction = function (str) {" +
      "  var isArgument_ = function (element) { return str === element; };" +
      "  return ['ellipse', 'color', 'setup', 'draw', 'keyPressed', 'keyReleased', 'keyTyped', 'mouseClicked', 'mouseDragged', 'mouseMoved', 'mousePressed', 'mouseReleased', 'mouseWheel', 'oscEvent'].some(isArgument_);" +
      "}");

    // p5js entry point
    nashorn.eval("var p5 = function(sketch) {sketch(alternateSketch); globalSketch = alternateSketch;}");

    // p5.Vector
    nashorn.eval("p5.Vector = {};");
    // random2D dirty fix - all the PVector functions should be bound to p5.Vector
    nashorn.eval("p5.Vector.random2D = function() { return Packages.processing.core.PVector.random2D(); }");
    // random3D dirty fix
    nashorn.eval("p5.Vector.random3D = function() { return Packages.processing.core.PVector.random3D(); }");

    // overwrite color (int/float arity signature problem)
    // does not support hex/string colors
    nashorn.eval("alternateSketch.color = function() {" +
      "  if(arguments.length == 1) return pApplet.color(new java.lang.Float(arguments[0]));" +
      "  else if(arguments.length == 2) return pApplet.color(new java.lang.Float(arguments[0]), new java.lang.Float(arguments[1]));" +
      "  else if(arguments.length == 3) return pApplet.color(new java.lang.Float(arguments[0]), new java.lang.Float(arguments[1]), new java.lang.Float(arguments[2]));" +
      "  else if(arguments.length == 4) return pApplet.color(new java.lang.Float(arguments[0]), new java.lang.Float(arguments[1]), new java.lang.Float(arguments[2]), new java.lang.Float(arguments[3]));" +
      "}");
  }
  catch (Exception e) {
    e.printStackTrace();
  }
}

void draw() {
  try {
    readFiles(scriptPaths);
  }
  catch (IOException e) {
    e.printStackTrace();
  }
  stroke(255);
  background(0);

  try {
    nashorn.eval("for(var prop in pApplet) {if(!this.isReservedFunction(prop)) {alternateSketch[prop] = pApplet[prop]}}");
    if (drawMode == "webgl") {
      translate(width / 2, height / 2);
    }
    nashorn.eval("alternateSketch.draw();");
  }
  catch (ScriptException e) {
    e.printStackTrace();
  }
}

private static byte[] encoded;
public static String readFile(String path) throws IOException {
  long lastModified = Files.getLastModifiedTime(Paths.get(path)).toMillis();
  if (prevModified < lastModified || encoded == null) {
    encoded = Files.readAllBytes(Paths.get(path));
    println("updated at " + lastModified);
    prevModified = lastModified;

    try {
      nashorn.eval("for(var prop in pApplet) {if(!this.isReservedFunction(prop)) {alternateSketch[prop] = pApplet[prop]}}");
      nashorn.eval(new String(encoded, StandardCharsets.UTF_8));
      nashorn.eval("alternateSketch.setup();");
      print("script loaded in java");
    }
    catch (ScriptException e) {
      e.printStackTrace();
    }
  }
  return new String(encoded, StandardCharsets.UTF_8);
}

public void readFiles(ArrayList<String> paths) throws IOException {
  long lastModified = 0;
  for (String path : paths) {
    long modified = Files.getLastModifiedTime(Paths.get(path)).toMillis();
    if (modified > lastModified) lastModified = modified;
  }
  if (prevModified < lastModified || encoded == null) {
    println("updated at " + lastModified);
    prevModified = lastModified;

    try {
      nashorn.eval("for(var prop in pApplet) {if(!this.isReservedFunction(prop)) {alternateSketch[prop] = pApplet[prop]}}");
    }
    catch (ScriptException e) {
      e.printStackTrace();
    }
    for (String path : paths) {
      encoded = Files.readAllBytes(Paths.get(path));

      try {
        nashorn.eval(new String(encoded, StandardCharsets.UTF_8));
      }
      catch (ScriptException e) {
        e.printStackTrace();
      }
    }
    try {
      nashorn.eval("alternateSketch.setup();");
      surface.setSize(newWidth, newHeight);
    }
    catch (ScriptException e) {
      e.printStackTrace();
    }
  }
}