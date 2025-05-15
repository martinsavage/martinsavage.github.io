"use strict";

// The QED programming language (library)
// Copyright (C) 2025  Hocus Codus Software
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
;
let RefreshLevelNONE = 0;
let RefreshLevelPAINT = 1;
let RefreshLevelRESIZE = 2;
let RefreshLevelREGENERATE = 3;

function _bindHandler(obj, handlerObj, handlerFn) {
  obj._HandlerCall_ = handlerFn ? [handlerObj, handlerFn] : null;
  return obj;
}

function _qedCallback(obj, value) {
  if (obj._HandlerCall_) {
    obj._HandlerCall_[1].call(obj._HandlerCall_[0], value);
    executeEvents_();
  }
}
let postHandler = null;
;
let MainObj = null;

class QEDBasicArray extends Array {
  oldLength = 0;

  constructor() {
    super();
  }

  _refreshModels = function() {
    let length = this.size();
    let level = length != this.oldLength ? RefreshLevelRESIZE : RefreshLevelNONE;

    this.oldLength = length;

    for (let index = 0; index < length; index++)
      level = Math.max(level, this[index]._refreshModels());

    return level;
  }
}
;
let refreshCount = 1;
let autoResize = true;
let autoInit = false;
let qedWindows = null;
let QED_TAG_OUT = 0;
let QED_TAG_SIZE = 1;
let QED_TAG_ID = 2;
let QED_TAG_AREA_HERITABLE = 3;
let QED_TAG_FONT = 4;
let QED_TAG_FONT_SIZE = 5;
let QED_TAG_SPACING = 6;
let QED_TAG_AREA_END = 7;
let QED_TAG_ALIGN = 8;
let QED_TAG_EXPAND = 9;
let QED_TAG_POS = 10;
let QED_TAG_HERITABLE = 11;
let QED_TAG_FILL_STYLE = 12;
let QED_TAG_STROKE_STYLE = 13;
let QED_TAG_LINE_WIDTH = 14;
let QED_TAG_OPACITY = 15;
let QED_TAG_RADIUS = 16;
let QED_TAG_ROTATION = 17;
let QED_TAG_END = 18;
let _spacing = 0.000000;
let _fontSize = 20;

var canvas = document.getElementById("canvas");
var bgCanvas = document.createElement("canvas");
let attributeStacks = [];
let canvasCtx = null;
let bgCtx = null;
let origCtx = null;
let ctx = null;
const pointerSupported = !!window.PointerEvent

initCtxs();

function initCtxs() {
  canvasCtx = canvas.getContext("2d");

  if (canvas.width != bgCanvas.width || canvas.height != bgCanvas.height) {
    bgCanvas.width = canvas.width;
    bgCanvas.height = canvas.height;
  }

  bgCtx = bgCanvas.getContext("2d");
  origCtx = bgCtx;
  ctx = origCtx;
}

canvas.addEventListener(pointerSupported ? "pointerdown" : "mouseDown", function(ev) {
  var rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  const canvasX = mouseX * canvas.width / canvas.clientWidth;
  const canvasY = mouseY * canvas.height / canvas.clientHeight;

  onGlobalEvent(0, [canvasX, canvasY]);
});
canvas.addEventListener(pointerSupported ? "pointerup" : "mouseUp", function(ev) {
  var rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  const canvasX = mouseX * canvas.width / canvas.clientWidth;
  const canvasY = mouseY * canvas.height / canvas.clientHeight;

  onGlobalEvent(1, [canvasX, canvasY]);
});
canvas.addEventListener("click", function(ev) {
  var rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  const canvasX = mouseX * canvas.width / canvas.clientWidth;
  const canvasY = mouseY * canvas.height / canvas.clientHeight;

  onGlobalEvent(2, [canvasX, canvasY]);
});
if (pointerSupported)
  canvas.addEventListener("pointercancel", function(ev) {
    var rect = canvas.getBoundingClientRect();
    onGlobalEvent(1, [ev.clientX - rect.left, ev.clientY - rect.top]);
  });
canvas.onselectstart = function () { return false; }

let _currentRadius = 3.0;
let _strokeFlag = false;
let _fillFlag = true;
let _lineFlag = false;
;
let cvCount = 0;
this.QEDExplicitArray = class QEDExplicitArray extends QEDBasicArray {
  constructor(...args) {
    super();
    for (const arg of args)
      this.push(arg);
  }

  getNumDirs() {return 1;}
  getDirs(childDir) {return [childDir & 1, (childDir & 2) ? 1 : 0];}
  size() {return this.length;}
};
let potentialFocus = null;
let qedFocus = new QEDExplicitArray();
function getInt() {
}
function max(a, b) {
  return a > b ? a : b;
}
function min(a, b) {
  return a < b ? a : b;
}
class QEDObject {
  constructor(context__Call) {
    this.refreshLevel = RefreshLevelNONE;
    this.context__Call = context__Call;
    this.blocking__Call = null;
    this.active = true;
  }
  _qedSetBlockingCall(call) {
    if (!this.blocking__Call) {
      this.blocking__Call = call;
      this.blocking__Call.refreshLevel = RefreshLevelREGENERATE;
    }

  }
  _qedKill() {
    if (this.active) {
      this.active = false;
      this._qedEndCall();
    }

  }
  _qedEndCall() {
    if (this.blocking__Call) {
      this.blocking__Call._qedKill();
      this.refreshLevel = (this.blocking__Call.refresh_Model_ ? RefreshLevelPAINT : RefreshLevelNONE);
      this.blocking__Call = null;
    }

  }
  _isActive() {
    return (this.active && (this.context__Call === null || this.context__Call._isActive()));
  }
  _refreshModels() {
    this.refreshLevel = (this.refresh_Model_ ? max(this.refreshLevel, this.refresh_Model_()) : RefreshLevelNONE);
    if (this.blocking__Call) {
      let blockingLevel = this.blocking__Call._refreshModels();
      if (blockingLevel !== RefreshLevelNONE && blockingLevel !== RefreshLevelREGENERATE)
        this.refreshLevel = max(this.refreshLevel, RefreshLevelPAINT);

      return (max(this.refreshLevel, blockingLevel));
    }
    else
      return (this.refreshLevel);

  }
}
function voidHandler_() {
}
class VoidHandler_ {
  constructor() {
  }
}
function anyHandler_(value) {
}
function intHandler_(value) {
}
function floatHandler_(value) {
}
function boolHandler_(value) {
}
function stringHandler_(value) {
}
function post_(obj, ret) {
  if (postHandler != null)
    console.log("postHandler not null");

  postHandler = [obj, ret];
}
function post__$(handler) {
  if (postHandler != null)
    console.log("postHandler not null");

  postHandler = handler;
}
function executeEvents_() {
  let mainObjActive = MainObj && MainObj.active;

  while (MainObj && MainObj.active && postHandler != null)
    if (postHandler instanceof Array) {
      const obj = postHandler[0];
      const ret = postHandler[1];

      postHandler = null;

      if (obj._HandlerCall_)
        if (ret !== null && ret !== undefined)
          obj._HandlerCall_[1].call(obj._HandlerCall_[0], ret);
        else
          obj._HandlerCall_[1].call(obj._HandlerCall_[0]);
    } else {
      const handler = postHandler;

      postHandler = null;
      handler();
    }

  if (MainObj && MainObj.active)
    _refresh(MainObj, 0, 0, canvas.width, canvas.height);
  else
    if (mainObjActive)
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);;
}
function start_(args, returnFn) {
  MainObj = _bindHandler(new Main(args, null), null, (function Lambda_(_ret) {
    MainObj._qedKill();
    MainObj = null;

    if (returnFn)
      returnFn(_ret);
  }));
  executeEvents_();
  return (MainObj);
}
function println(str) {
  console.log(str);
}
function logFast(str, fast) {
  if (fast)
    println(str);

}
class QedRect extends QEDObject {
  constructor(x, y, width, height, context__Call) {
    super(context__Call);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
function newQedRect(width, height) {
  return (new QedRect(0, 0, width, height, null));
}
function _refresh(obj, x, y, width, height) {
  let level = obj._refreshModels();
  let debugFast = false;
  let fastFlag = debugFast && level <= RefreshLevelRESIZE;

  logFast("" + refreshCount++ + "- Refresh Level: " + level, debugFast);

  if (level != RefreshLevelNONE) {
    canvasCtx.globalAlpha = bgCtx.globalAlpha = 1.0;

    if (!fastFlag || level >= RefreshLevelRESIZE) {
      if (!fastFlag || !qedWindows)// || !qedWindows.length)
        qedWindows = _refreshViews(obj, []);

      if (qedWindows.length) {
        qedWindows[0].recalcLayout();
        width = qedWindows[0].size[0];
        height = qedWindows[0].size[1];
      }
      else
        width = height = 0;
    }
;
  if (!autoInit) {
    autoResize = canvas.width == 0 && canvas.height == 0;
    autoInit = true;
  }

  if (autoResize && (canvas.width != width || canvas.height != height)) {
          canvas.width = width;
      canvas.height = height;
      initCtxs();;
  }

  
    canvasCtx.font = bgCtx.font = "20px 'Arial'";
    canvasCtx.fillStyle = bgCtx.fillStyle = "black";
    canvasCtx.strokeStyle = bgCtx.strokeStyle = "black";
    canvasCtx.globalAlpha = bgCtx.globalAlpha = 1.0;
    origCtx = ctx = fastFlag ? bgCtx : canvasCtx;

//    if (!fastFlag)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (debugFast) {
      canvasCtx.save();
      canvasCtx.globalAlpha = .1;
      canvasCtx.fillStyle = "yellow";
      canvasCtx.rect(0, 0, canvas.width, canvas.height);
      canvasCtx.fill();
      canvasCtx.restore();
    }

    if (qedWindows.length)
      qedWindows[0].paint(x, y, canvas.width, canvas.height, fastFlag);
  };
}
class QedYield extends QEDObject {
  constructor(context__Call) {
    super(context__Call);
  }
  processFn() {
    if (this._HandlerCall_)
      this._HandlerCall_[1].call(this._HandlerCall_[0], true);
  }
}
function qedResume(obj) {
  if (obj instanceof Array) {
    let size = obj.size();
    let oneItem = false;

    for (let index = 0; index < size; index++)
      oneItem |= qedResume(obj[index]);

    return oneItem;
  }
  else
    if (obj.blocking__Call)
      return qedResume(obj.blocking__Call)
    else
      if (obj.processFn) {
        obj.processFn();
        return true;
      }
      else
        return false;;
}
function pushCanvas(pos0, pos1, size0, size1) {
  if (!cvCount++) {
    ctx = canvasCtx
    canvasCtx.drawImage(bgCanvas, pos0, pos1, size0, size1, pos0, pos1, size0, size1);
  }

}
function popCanvas() {
  if (! -- cvCount)
    ctx = origCtx;

}
function abs(a) {
  return Math.abs(a);
}
function rand() {
  return Math.random();
}
function trunc(n) {
  return Math.trunc(n);
}
function clock() {
}
function saveContext() {
  canvasCtx.save();
  canvasCtx.clip();
  bgCtx.save();
  bgCtx.clip();;
}
function restoreContext() {
  canvasCtx.restore()
  bgCtx.restore();
}
function qedEqual(value1, value2) {
  let equal = value1 === value2;
  if (!equal && value1 instanceof Array && value2 instanceof Array) {
    function fn(element, index) {
      return (qedEqual(element, value2[index]));
    }
    equal = value1.length == value2.length && value1.every(fn);
  }

  return (equal);
}
function rotate(x, y, width, height, angle) {
  ctx.save();
  ctx.translate(x + width / 2, y + height / 2);
  ctx.rotate(angle);
}
function qedDraw() {
  if (_fillFlag)
    ctx.fill();

  if (_strokeFlag && _lineFlag)
    ctx.stroke();

}
function drawFn(x, y, width, height) {
}
function oval(x, y, width, height) {
  ctx.beginPath();
  ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, 2*Math.PI);
  qedDraw();
}
function rect(x, y, width, height) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  qedDraw();
}
function roundRect(x, y, width, height) {
  let radius = _currentRadius;/*
  let radiusy = Math.min(radius, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.quadraticCurveTo(x, y, x, y + radiusy);
  if (height > 2 * radiusy)
    ctx.lineTo(x, y + height - radiusy)
  ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
  ctx.lineTo(x + width - radius, y + height)
  ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radiusy);
  if (height > 2 * radiusy)
    ctx.lineTo(x + width, y + radiusy);
  ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
  ctx.lineTo(x + radius, y);*/
ctx.beginPath();
ctx.moveTo(x + radius, y);
ctx.lineTo(x + width - radius, y);
ctx.arcTo(x + width, y, x + width, y + radius, radius);
ctx.lineTo(x + width, y + height - radius);
ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
ctx.lineTo(x + radius, y + height);
ctx.arcTo(x, y + height, x, y + height - radius, radius);
ctx.lineTo(x, y + radius);
ctx.arcTo(x, y, x + radius, y, radius);
  qedDraw();
}
function getAttribute(index) {
  return attributeStacks[index][attributeStacks[index].length - 1];
}
function _qedPushAttribute(index, value) {
  let oldValue;

  switch(index) {
    case QED_TAG_FONT:
      oldValue = ctx.font;
      canvasCtx.font = bgCtx.font = value;
      break;

    case QED_TAG_FONT_SIZE:
      oldValue = [ctx.font, _fontSize];
      _fontSize = value;
      canvasCtx.font = bgCtx.font = value + "px Arial";
      break;

    case QED_TAG_SPACING:
      oldValue = _spacing;
      _spacing = value;
      break;

    case QED_TAG_FILL_STYLE:
      oldValue = [_fillFlag, ctx.fillStyle];
      _fillFlag = value !== "none"

      if (_fillFlag)
        canvasCtx.fillStyle = bgCtx.fillStyle = value;
      break;

    case QED_TAG_STROKE_STYLE:
      oldValue = [_strokeFlag, ctx.strokeStyle];
      _strokeFlag = value !== "none"

      if (_strokeFlag)
        canvasCtx.strokeStyle = bgCtx.strokeStyle = value;
      break;

    case QED_TAG_LINE_WIDTH:
      oldValue = [_lineFlag, ctx.lineWidth];
      _lineFlag = value !== "none"

      if (_lineFlag)
        canvasCtx.lineWidth = bgCtx.lineWidth = value;
      break;

    case QED_TAG_OPACITY:
      oldValue = ctx.globalAlpha;
      canvasCtx.globalAlpha = bgCtx.globalAlpha = value;
      break;

    case QED_TAG_RADIUS:
      oldValue = _currentRadius;
      _currentRadius = value;
      break;

    case QED_TAG_ROTATION:
      break;
  }

  if (attributeStacks[index] == undefined)
    attributeStacks[index] = [];

  attributeStacks[index].push(oldValue);
}
function pushAttribute(index, value) {
  _qedPushAttribute(index, value);
}
function pushAttribute_$(index, value) {
  _qedPushAttribute(index, value);
}
function pushAttribute_$_$(index, value) {
  _qedPushAttribute(index, value);
}
function popAttribute(index) {
  const value = attributeStacks[index].pop();

  switch(index) {
    case QED_TAG_FONT:
      canvasCtx.font = bgCtx.font = value;
      break;

    case QED_TAG_FONT_SIZE:
      _fontSize = value[1];
      canvasCtx.font = bgCtx.font = value[0];
      break;

    case QED_TAG_SPACING:
      _spacing = value;
      break;

    case QED_TAG_FILL_STYLE:
      _fillFlag = value[0];

      if (_fillFlag)
        canvasCtx.fillStyle = bgCtx.fillStyle = value[1];
      break;

    case QED_TAG_STROKE_STYLE:
      _strokeFlag = value[0];

      if (_strokeFlag)
        canvasCtx.strokeStyle = bgCtx.strokeStyle = value[1];
      break;

    case QED_TAG_LINE_WIDTH:
      _lineFlag = value[0]

      if (_lineFlag)
        canvasCtx.lineWidth = bgCtx.lineWidth = value;
      break;

    case QED_TAG_OPACITY:
      canvasCtx.globalAlpha = bgCtx.globalAlpha = value;
      break;

    case QED_TAG_RADIUS:
      _currentRadius = value;
      break;

    case QED_TAG_ROTATION:
      break;
  };
}
function getTextSize(text) {
  const textSize = ctx.measureText(text);
  const height = textSize.fontBoundingBoxAscent + textSize.fontBoundingBoxDescent;
  return [textSize.width, height];
}
function displayText(text, x, y, width, height) {
  ctx.textBaseline = "top";
  if (_fillFlag)
    ctx.fillText(text, x, y)

  if (_strokeFlag && _lineFlag)
    ctx.strokeText(text, x, y);
}
class QedImage extends QEDObject {
  constructor(context__Call) {
    super(context__Call);
    this.img = new Image();
  }
}
function getImageSize(image) {
  return [image.img.naturalWidth, image.img.naturalHeight];
}
function displayImage(image, x, y, width, height) {
  if (image && image.img.complete && image.img.naturalWidth > 0)
  ctx.drawImage(image.img, x, y);
}
class QedTimer extends QEDObject {
  constructor(timeoutMillis, context__Call) {
    super(context__Call);
    this.timeoutMillis = timeoutMillis;
    setTimeout(function() {
    _qedCallback(this, true);
  }.bind(this), timeoutMillis);
  }
  reset() {
  }
}
class Time extends QEDObject {
  constructor(Func, context__Call) {
    super(context__Call);
    this.Func = Func;
    console.time("Time");
  new Func(() => {
    console.timeEnd("Time");
    _qedCallback(this, null);
  });
  }
}
function time(func) {
    console.time("time");
  func();
  console.timeEnd("time");
}
class QedAnimation extends QEDObject {
  constructor(context__Call) {
    super(context__Call);
    this.requestId = requestAnimationFrame(function(timeStampMs) {
    _qedCallback(this, timeStampMs);
  }.bind(this));
  }
  cancel() {
    cancelAnimationFrame(requestId);
  }
}
class QEDBaseArray_ {
  constructor() {
    this.qedModel = null;
  }
  getNumDirs() {
    return (0);
  }
  getDirs(childDir) {
    return (new QEDExplicitArray(0, 0));
  }
  size() {
    return (0);
  }
  insert(pos, size) {
  }
  static Insert = class extends QEDObject {
    constructor(pos, size, context__Call) {
      super(context__Call);
      this.pos = pos;
      this.size = size;
    }
  }
  remove(pos, size) {
  }
  push() {
  }
  static Push = class extends QEDObject {
    constructor(context__Call) {
      super(context__Call);
    }
  }
  pop() {
  }
  get(pos) {
  }
  set(pos, value) {
  }
  get_$(index) {
  }
  set_$(index, value) {
  }
  refresh_Model_() {
  }
}
class InitFn extends QEDObject {
  constructor(pos, context__Call) {
    super(context__Call);
    this.pos = pos;
  }
}
class Qui_ {
  constructor(array, dims) {
    this.array = array;
    this.dims = dims;
  }
}
class SQEDArray extends QEDBasicArray {
  constructor(Init, numDim, dirs, Ui_) {
    super();
    this.Init = Init;
    this.numDim = numDim;
    this.dirs = dirs;
    this.Ui_ = Ui_;
    this.dims = new Array(numDim).fill(0);
  }
  size() {
    let s = 1;
    {
      let index = this.dims.length - 1;
      while(index >= 0) {
        s *= this.dims[index];
        index--;
      }

    }
    return (s);
  }
  insert(pos, size) {
    return (null);
  }
  static Insert = class extends QEDObject {
    constructor(pos, size, context__Call, SQEDArray$this) {
      super(context__Call);
      this.pos = pos;
      this.size = size;
      this.SQEDArray$this = SQEDArray$this;
      this.newSize = [...this.size];
      {
        let index = this.SQEDArray$this.dims.length - 1;
        while(index >= 0) {
          this.newSize[index] += this.SQEDArray$this.dims[index];
          index--;
        }

      }
      this._qedSetBlockingCall(_bindHandler(new SQEDArray.InsertLevel(this.SQEDArray$this, this.SQEDArray$this.dims, this.pos, this.size, this.newSize, new Array(this.size.length).fill(0), 0, this.context__Call, this.SQEDArray$this), this, this.cont$2));
    }
    cont$2() {
      if (!this._isActive()) return;
      this._qedEndCall();
      this.SQEDArray$this.dims = this.newSize;
      return post_(this, this.SQEDArray$this);
    }
  }
  remove(pos, size) {
    let newSize = [...this.dims];
    {
      let index = this.dims.length - 1;
      while(index >= 0) {
        newSize[index] -= size[index];
        index--;
      }

    }
    this.removeLevel(this, this.dims, pos, size, newSize, new Array(size.length).fill(0), 0);
    this.dims = newSize;
    return (this);
  }
  static InsertLevel = class extends QEDObject {
    constructor(array, dims, pos, size, newSize, pp, level, context__Call, SQEDArray$this) {
      super(context__Call);
      this.array = array;
      this.dims = dims;
      this.pos = pos;
      this.size = size;
      this.newSize = newSize;
      this.pp = pp;
      this.level = level;
      this.SQEDArray$this = SQEDArray$this;
      if (this.level < this.SQEDArray$this.dims.length - 1) {
        this.pp[this.level] = 0;
        this.while$10();
      }
      else {
        if (this.size[this.level] !== 0) {
          this.pp[this.level] = this.dims[this.level] - 1;
          while(this.pp[this.level] >= this.pos[this.level]) {
            this.array[this.pp[this.level] + this.size[this.level]] = this.array[this.pp[this.level]];
            this.pp[this.level]--;
          }

        }

        this.pp[this.level] = this.pos[this.level];
        this.while$13();
      }

    }
    cont$2() {
      if (!this._isActive()) return;
      this._qedEndCall();
      this.pp[this.level]++;
      this.while$10();
    }
    cont$4() {
      if (!this._isActive()) return;
      this._qedEndCall();
      this.pp[this.level]++;
      this.while$9();
    }
    cont$6() {
      if (!this._isActive()) return;
      this._qedEndCall();
      this.pp[this.level]++;
      this.while$8();
    }
    while$8() {
      if (this.pp[this.level] < this.newSize[this.level])
        this._qedSetBlockingCall(_bindHandler(new SQEDArray.InsertLevel(this.array[this.pp[this.level]], this.dims, this.pos, this.size, this.newSize, this.pp, this.level + 1, this.context__Call, this.SQEDArray$this), this, this.cont$6));
      else
        this.endIf$7();

    }
    while$9() {
      if (this.pp[this.level] < this.pos[this.level] + this.size[this.level]) {
        this.array[this.pp[this.level]] = [];
        this._qedSetBlockingCall(_bindHandler(new SQEDArray.InsertLevel(this.array[this.pp[this.level]], new Array(this.size.length).fill(0), new Array(this.size.length).fill(0), this.newSize, this.newSize, this.pp, this.level + 1, this.context__Call, this.SQEDArray$this), this, this.cont$4));
      }
      else {
        this.pp[this.level] = this.pos[this.level] + this.size[this.level];
        this.while$8();
      }

    }
    while$10() {
      if (this.pp[this.level] < this.pos[this.level])
        this._qedSetBlockingCall(_bindHandler(new SQEDArray.InsertLevel(this.array[this.pp[this.level]], this.dims, this.pos, this.size, this.newSize, this.pp, this.level + 1, this.context__Call, this.SQEDArray$this), this, this.cont$2));
      else {
        if (this.size[this.level] !== 0) {
          this.pp[this.level] = this.dims[this.level] - 1;
          while(this.pp[this.level] >= this.pos[this.level]) {
            this.array[this.pp[this.level] + this.size[this.level]] = this.array[this.pp[this.level]];
            this.pp[this.level]--;
          }

        }

        this.pp[this.level] = this.pos[this.level];
        this.while$9();
      }

    }
    cont$12(_ret$11) {
      if (!this._isActive()) return;
      this._qedEndCall();
      this.array[this.pp[this.level]] = _ret$11;
      this.pp[this.level]++;
      this.while$13();
    }
    while$13() {
      if (this.pp[this.level] < this.pos[this.level] + this.size[this.level])
        this._qedSetBlockingCall(_bindHandler(this.SQEDArray$this.Init(this.pp, this.context__Call), this, this.cont$12));
      else
        this.endIf$7();

    }
    endIf$7() {
      return post_(this, null);
    }
  }
  removeLevel(array, dims, pos, size, newSize, pp, level) {
    if (level < this.SQEDArray$this.dims.length - 1) {
      {
        pp[level] = dims[level] - 1;
        while(pp[level] >= pos[level] + size[level]) {
          this.removeLevel(array[pp[level]], dims, pos, size, newSize, pp, level + 1);
          pp[level]--;
        }

      }
      if (size[level] !== 0) {
        pp[level] = pos[level];
        while(pp[level] < newSize[level]) {
          array[pp[level]] = array[pp[level] + size[level]];
          pp[level]++;
        }

      }

      {
        pp[level] = pos[level] - 1;
        while(pp[level] >= 0) {
          this.removeLevel(array[pp[level]], dims, pos, size, newSize, pp, level + 1);
          pp[level]--;
        }

      }
    }
    else
      if (size[level] !== 0) {
        pp[level] = pos[level];
        while(pp[level] < newSize[level]) {
          array[pp[level]] = array[pp[level] + size[level]];
          pp[level]++;
        }

      }


    return;
  }
  push() {
    return (null);
  }
  static Push = class extends QEDObject {
    constructor(context__Call, SQEDArray$this) {
      super(context__Call);
      this.SQEDArray$this = SQEDArray$this;
      this.pos = new Array(this.SQEDArray$this.dims.length).fill(0);
      this.size = new Array(this.SQEDArray$this.dims.length).fill(0);
      this.pos[0] = this.SQEDArray$this.dims[0];
      this.size[0] = 1;
      this._qedSetBlockingCall(_bindHandler(new SQEDArray.Insert(this.pos, this.size, this.context__Call, this.SQEDArray$this), this, this.cont$2));
    }
    cont$2(_ret$1) {
      if (!this._isActive()) return;
      this._qedEndCall();
      return post_(this, this.SQEDArray$this);
    }
  }
  pop() {
    let pos = new Array(this.dims.length).fill(0);
    let size = new Array(this.dims.length).fill(0);
    pos[0] = this.dims[0] - 1;
    size[0] = 1;
    this.remove(pos, size);
    return (this);
  }
}
class VInitFn extends QEDObject {
  constructor(pos, context__Call) {
    super(context__Call);
    this.pos = pos;
  }
}
class VSQEDArray extends QEDBasicArray {
  constructor(Init, numDim) {
    super();
    this.Init = Init;
    this.numDim = numDim;
    this.dims = new Array(numDim).fill(0);
  }
  size() {
    let s = 1;
    {
      let index = this.dims.length - 1;
      while(index >= 0) {
        s *= this.dims[index];
        index--;
      }

    }
    return (s);
  }
  insert(pos, size) {
    return (null);
  }
  static Insert = class extends QEDObject {
    constructor(pos, size, context__Call, VSQEDArray$this) {
      super(context__Call);
      this.pos = pos;
      this.size = size;
      this.VSQEDArray$this = VSQEDArray$this;
      this.newSize = [...this.size];
      {
        let index = this.VSQEDArray$this.dims.length - 1;
        while(index >= 0) {
          this.newSize[index] += this.VSQEDArray$this.dims[index];
          index--;
        }

      }
      this._qedSetBlockingCall(_bindHandler(new VSQEDArray.InsertLevel(this.VSQEDArray$this.dims, this.pos, this.size, this.newSize, new Array(this.size.length).fill(0), 0, this.context__Call, this.VSQEDArray$this), this, this.cont$2));
    }
    cont$2() {
      if (!this._isActive()) return;
      this._qedEndCall();
      this.VSQEDArray$this.dims = this.newSize;
      return post_(this, this);
    }
  }
  static InsertLevel = class extends QEDObject {
    constructor(dims, pos, size, newSize, pp, level, context__Call, VSQEDArray$this) {
      super(context__Call);
      this.dims = dims;
      this.pos = pos;
      this.size = size;
      this.newSize = newSize;
      this.pp = pp;
      this.level = level;
      this.VSQEDArray$this = VSQEDArray$this;
      if (this.level < this.VSQEDArray$this.dims.length - 1) {
        this.pp[this.level] = 0;
        this.while$10();
      }
      else {
        this.pp[this.level] = pos[this.level];
        this.while$13();
      }

    }
    cont$2() {
      if (!this._isActive()) return;
      this._qedEndCall();
      this.pp[this.level]++;
      this.while$10();
    }
    cont$4() {
      if (!this._isActive()) return;
      this._qedEndCall();
      this.pp[this.level]++;
      this.while$9();
    }
    cont$6() {
      if (!this._isActive()) return;
      this._qedEndCall();
      this.pp[this.level]++;
      this.while$8();
    }
    while$8() {
      if (this.pp[this.level] < newSize[this.level])
        this._qedSetBlockingCall(_bindHandler(new VSQEDArray.InsertLevel(this.dims, this.pos, this.size, this.newSize, this.pp, this.level + 1, this.context__Call, this.VSQEDArray$this), this, this.cont$6));
      else
        this.endIf$7();

    }
    while$9() {
      if (this.pp[this.level] < pos[this.level] + this.size[this.level]) {
        array[this.pp[this.level]] = [];
        this._qedSetBlockingCall(_bindHandler(new VSQEDArray.InsertLevel(new Array(this.size.length).fill(0), new Array(this.size.length).fill(0), this.newSize, this.newSize, this.pp, this.level + 1, this.context__Call, this.VSQEDArray$this), this, this.cont$4));
      }
      else {
        this.pp[this.level] = pos[this.level] + this.size[this.level];
        this.while$8();
      }

    }
    while$10() {
      if (this.pp[this.level] < pos[this.level])
        this._qedSetBlockingCall(_bindHandler(new VSQEDArray.InsertLevel(this.dims, this.pos, this.size, this.newSize, this.pp, this.level + 1, this.context__Call, this.VSQEDArray$this), this, this.cont$2));
      else {
        this.pp[this.level] = pos[this.level];
        this.while$9();
      }

    }
    cont$12() {
      if (!this._isActive()) return;
      this._qedEndCall();
      this.pp[this.level]++;
      this.while$13();
    }
    while$13() {
      if (this.pp[this.level] < pos[this.level] + this.size[this.level])
        this._qedSetBlockingCall(_bindHandler(this.VSQEDArray$this.Init(this.pp, this.context__Call), this, this.cont$12));
      else
        this.endIf$7();

    }
    endIf$7() {
      return post_(this, null);
    }
  }
}
function sInitFn(pos) {
}
class QEDArray extends QEDBasicArray {
  constructor(init, numDim, dirs, Ui_) {
    super();
    this.init = init;
    this.numDim = numDim;
    this.dirs = dirs;
    this.Ui_ = Ui_;
    this.dims = new Array(numDim).fill(0);
  }
  getNumDirs() {
    return (this.numDim);
  }
  getDirs(childDir) {
    return (this.dirs);
  }
  size() {
    let s = 1;
    {
      let index = this.dims.length - 1;
      while(index >= 0) {
        s *= this.dims[index];
        index--;
      }

    }
    return (s);
  }
  insert(pos, size) {
    let newSize = [...size];
    {
      let index = this.dims.length - 1;
      while(index >= 0) {
        newSize[index] += this.dims[index];
        index--;
      }

    }
    this.insertLevel(this, this.dims, pos, size, newSize, new Array(size.length).fill(0), 0);
    this.dims = newSize;
    return (this);
  }
  remove(pos, size) {
    let newSize = [...this.dims];
    {
      let index = this.dims.length - 1;
      while(index >= 0) {
        newSize[index] -= size[index];
        index--;
      }

    }
    this.removeLevel(this, this.dims, pos, size, newSize, new Array(size.length).fill(0), 0);
    this.dims = newSize;
    return (this);
  }
  insertLevel(array, dims, pos, size, newSize, pp, level) {
    if (level < this.dims.length - 1) {
      {
        pp[level] = 0;
        while(pp[level] < pos[level]) {
          this.insertLevel(array[pp[level]], dims, pos, size, newSize, pp, level + 1);
          pp[level]++;
        }

      }
      if (size[level] !== 0) {
        pp[level] = dims[level] - 1;
        while(pp[level] >= pos[level]) {
          array[pp[level] + size[level]] = array[pp[level]];
          pp[level]--;
        }

      }

      {
        pp[level] = pos[level];
        while(pp[level] < pos[level] + size[level]) {
          array[pp[level]] = [];
          this.insertLevel(array[pp[level]], new Array(size.length).fill(0), new Array(size.length).fill(0), newSize, newSize, pp, level + 1);
          pp[level]++;
        }

      }
      {
        pp[level] = pos[level] + size[level];
        while(pp[level] < newSize[level]) {
          this.insertLevel(array[pp[level]], dims, pos, size, newSize, pp, level + 1);
          pp[level]++;
        }

      }
    }
    else {
      if (size[level] !== 0) {
        pp[level] = dims[level] - 1;
        while(pp[level] >= pos[level]) {
          array[pp[level] + size[level]] = array[pp[level]];
          pp[level]--;
        }

      }

      {
        pp[level] = pos[level];
        while(pp[level] < pos[level] + size[level]) {
          let index = pp[level];
          array[pp[level]] = this.init(pp);
          pp[level]++;
        }

      }
    }

    return;
  }
  removeLevel(array, dims, pos, size, newSize, pp, level) {
    if (level < this.dims.length - 1) {
      {
        pp[level] = dims[level] - 1;
        while(pp[level] >= pos[level] + size[level]) {
          this.removeLevel(array[pp[level]], dims, pos, size, newSize, pp, level + 1);
          pp[level]--;
        }

      }
      if (size[level] !== 0) {
        pp[level] = pos[level];
        while(pp[level] < newSize[level]) {
          array[pp[level]] = array[pp[level] + size[level]];
          pp[level]++;
        }

      }

      {
        pp[level] = pos[level] - 1;
        while(pp[level] >= 0) {
          this.removeLevel(array[pp[level]], dims, pos, size, newSize, pp, level + 1);
          pp[level]--;
        }

      }
    }
    else
      if (size[level] !== 0) {
        pp[level] = pos[level];
        while(pp[level] < newSize[level]) {
          array[pp[level]] = array[pp[level] + size[level]];
          pp[level]++;
        }

      }


    return;
  }
  push() {
    let pos = new Array(this.dims.length).fill(0);
    let size = new Array(this.dims.length).fill(0);
    pos[0] = this.dims[0];
    size[0] = 1;
    this.insert(pos, size);
    return (this);
  }
  static Push = class extends QEDObject {
    constructor(context__Call) {
      super(context__Call);
      return post_(this, this.QEDArray$this.push());
    }
  }
  pop() {
    let pos = new Array(this.dims.length).fill(0);
    let size = new Array(this.dims.length).fill(0);
    pos[0] = this.dims[0] - 1;
    size[0] = 1;
    this.remove(pos, size);
    return (this);
  }
}
function vInitFn(pos) {
}
class VQEDArray extends QEDBasicArray {
  constructor(init, numDim) {
    super();
    this.init = init;
    this.numDim = numDim;
    this.dims = new Array(numDim).fill(0);
  }
  size() {
    let s = 1;
    {
      let index = this.dims.length - 1;
      while(index >= 0) {
        s *= this.dims[index];
        index--;
      }

    }
    return (s);
  }
  insert(pos, size) {
    let newSize = [...size];
    {
      let index = this.dims.length - 1;
      while(index >= 0) {
        newSize[index] += this.dims[index];
        index--;
      }

    }
    this.insertLevel(this.dims, pos, size, newSize, new Array(size.length).fill(0), 0);
    this.dims = newSize;
    return (this);
  }
  insertLevel(dims, pos, size, newSize, pp, level) {
    if (level < this.dims.length - 1) {
      {
        pp[level] = 0;
        while(pp[level] < pos[level]) {
          this.insertLevel(dims, pos, size, newSize, pp, level + 1);
          pp[level]++;
        }

      }
      {
        pp[level] = pos[level];
        while(pp[level] < pos[level] + size[level]) {
          this.insertLevel(new Array(size.length).fill(0), new Array(size.length).fill(0), newSize, newSize, pp, level + 1);
          pp[level]++;
        }

      }
      {
        pp[level] = pos[level] + size[level];
        while(pp[level] < newSize[level]) {
          this.insertLevel(dims, pos, size, newSize, pp, level + 1);
          pp[level]++;
        }

      }
    }
    else {
      pp[level] = pos[level];
      while(pp[level] < pos[level] + size[level]) {
        this.init(pp);
        pp[level]++;
      }

    }

    return;
  }
}
class QedWait extends QEDObject {
  constructor(array, context__Call) {
    super(context__Call);
    this.array = array;
    this.count = this.array.size();
    {
      let index = 0;
      while(index < this.count) {
        const handler$1 = function() {
          if (!this._isActive()) return;
          if (oldHandler)
            oldHandler[1].call(oldHandler[0]);

          if ( -- this.count === 0)
            return post_(this, null);

        }.bind(this);
        let obj = this.array[index];
        let oldHandler = obj._HandlerCall_;
        _bindHandler(obj, this, handler$1);
        index++;
      }

    }
  }
}
class QedWaitValues extends QEDObject {
  constructor(array, context__Call) {
    super(context__Call);
    this.array = array;
    this.count = this.array.size();
    if (!this.count)
      return post_(this, new QEDExplicitArray());

    this.outputs = this.group$2();
    {
      let index = 0;
      while(index < this.count) {
        const handler$3 = function(_ret) {
          if (!this._isActive()) return;
          this.outputs[ndx] = _ret;
          if (oldHandler)
            this.oldHandler[1].call(this.oldHandler[0], _ret);

          if ( -- this.count === 0)
            return post_(this, this.outputs);

        }.bind(this);
        let ndx = index;
        let obj = this.array[index];
        let oldHandler = obj._HandlerCall_;
        _bindHandler(obj, this, handler$3);
        index++;
      }

    }
  }
  arrayElement$1(pos) {
    return (0);
  }
  group$2() {
    let _d0 = this.count;
    return (new QEDArray(this.arrayElement$1.bind(this), 1, new QEDExplicitArray(0, 0), function(array, dims, context__Call) {
      return new Qui_(array, dims);
    }.bind(this)).insert(new QEDExplicitArray(0), new QEDExplicitArray(_d0)));
  }
}
class VoidFn extends QEDObject {
  constructor(context__Call) {
    super(context__Call);
  }
}
class QedAudioLoader extends QEDObject {
  constructor(url, context__Call) {
    super(context__Call);
    this.url = url;
    this.audio = new Audio(url);
    const audioListener = function(event) {
    this.audio.removeEventListener("canplaythrough", audioListener);
    _qedCallback(this, function() {
      return new QedAudioLoader.Aud(this.context__Call, this);
    }.bind(this));
  }.bind(this);
  this.audio.addEventListener("canplaythrough", audioListener);
  }
  static Aud = class extends QEDObject {
    constructor(context__Call, QedAudioLoader$this) {
      super(context__Call);
      this.QedAudioLoader$this = QedAudioLoader$this;
      this.QedAudioLoader$this.audio.play();
      this.QedAudioLoader$this.audio.onended = function(event) {
        _qedCallback(this, null);
      }.bind(this);
    }
  }
}
function sin(a) {
  return (Math.sin(a));
}
function cos(a) {
  return (Math.cos(a));
}
class QedInterval extends QEDObject {
  constructor(timeoutMillis, context__Call) {
    super(context__Call);
    this.timeoutMillis = timeoutMillis;
    setInterval(function() {
    _qedCallback(this, null);
  }.bind(this), timeoutMillis);
  }
}
class QedKeyEvent extends QEDObject {
  constructor(context__Call) {
    super(context__Call);
    this.keyCode = 0;
    this.trigger = null;
    canvas.tabIndex = 1;
  canvas.onkeydown = function keyDown(e) {
    this.fetchKeyCode(e.keyCode);
  }.bind(this);
    this.waitUserTrigger_();
  }
  waitUserTrigger_() {
    const handler$1 = function(_ret) {
      if (!this._isActive()) return;
      this.waitUserTrigger_();
      return post_(this, this.keyCode);
    }.bind(this);
    this.trigger = _bindHandler(new QedYield(this), this, handler$1);
  }
  fetchKeyCode(code) {
    this.keyCode = code;
    qedResume(this.trigger);
  }
}
function getBounds(path, index) {
  return qedWindows.length ? qedWindows[0].getBoundsRect(path, index, 0, 0, canvas.width, canvas.height, 0, 0) : [];
}
function resizeView(unit) {
}
function paintView(viewObj, posx, posy, sizex, sizey, fast) {
}
function onViewEvent(viewObj, event, posx, posy, sizex, sizey) {
}
function getViewElementRect(viewObj, path, index, posx, posy, sizex, sizey, level, dLevel) {
}
class ViewArray_ {
  constructor(array, dirs, resizeViewFn, paintViewFn, onViewEventFn, getViewElementRectFn) {
    this.array = array;
    this.dirs = dirs;
    this.resizeViewFn = resizeViewFn;
    this.paintViewFn = paintViewFn;
    this.onViewEventFn = onViewEventFn;
    this.getViewElementRectFn = getViewElementRectFn;
    this.posSet = [];
    this.size = new QEDExplicitArray(0, 0);
  }
  recalcLayout() {
    let length = this.array.size();
    let space = _spacing;
    {
      let index = 0;
      while(index < length) {
        let elementSize = this.resizeViewFn(this.array[index]);
        this.posSet[index] = new QEDExplicitArray(0, 0);
        {
          let dir = 0;
          while(dir < 2) {
            this.posSet[index][dir] = (this.dirs[dir] ? ((index ? this.size[dir] + space : 0)) + elementSize[dir] : max(this.size[dir], elementSize[dir]));
            this.size[dir] = this.posSet[index][dir];
            dir++;
          }

        }
        index++;
      }

    }
  }
  paint(pos0, pos1, size0, size1, fast) {
    let length = this.array.size();
    let space = _spacing;
    let newPos = new QEDExplicitArray(pos0, pos1);
    let pos = new QEDExplicitArray(pos0, pos1);
    let size = new QEDExplicitArray(size0, size1);
    {
      let index = 0;
      while(index < length) {
        {
          let dir = 0;
          while(dir < 2) {
            if (this.dirs[dir]) {
              let relPos = (index ? this.posSet[index - 1][dir] + space : 0);
              pos[dir] = newPos[dir] + relPos;
              size[dir] = this.posSet[index][dir] - relPos;
            }

            dir++;
          }

        }
        this.paintViewFn(this.array[index], pos[0], pos[1], size[0], size[1], fast);
        index++;
      }

    }
  }
  onEvent(event, pos0, pos1, size0, size1) {
    let length = this.array.size();
    let space = _spacing;
    let pos = new QEDExplicitArray(0, 0);
    let size = new QEDExplicitArray(size0, size1);
    {
      let index = length - 1;
      while(index >= 0) {
        {
          let dir = 0;
          while(dir < 2) {
            if (this.dirs[dir]) {
              pos[dir] = (index ? this.posSet[index - 1][dir] + space : 0);
              size[dir] = this.posSet[index][dir] - pos[dir];
            }

            dir++;
          }

        }
        if (pos0 >= pos[0] && pos0 < pos[0] + size[0] && pos1 >= pos[1] && pos1 < pos[1] + size[1]) {
          pos0 -= pos[0];
          pos1 -= pos[1];
          return (this.onViewEventFn(this.array[index], event, pos0, pos1, size[0], size[1]));
        }

        index--;
      }

    }
    return (false);
  }
  getBoundsRect(path, index, pos0, pos1, size0, size1, level, dLevel) {
    let space = _spacing;
    let ndx = index[0];
    let relPos = (ndx ? this.posSet[ndx - 1][0] + space : 0);
    let posx = pos0 + relPos;
    let posy = pos1;
    let sizex = this.posSet[ndx][0] - relPos;
    let sizey = size1;
    dLevel++;
    if (level < path.size() || dLevel < index.size())
      return (this.getViewElementRectFn(this.array[ndx], path, index, posx, posy, sizex, sizey, level, dLevel));
    else
      return (new QEDExplicitArray(posx, posy, sizex, sizey));

  }
}
function resizeViewObj(unit) {
  let windows = unit;
  windows[0].recalcLayout();
  return ((windows.size() ? windows[0].size : new QEDExplicitArray(0, 0)));
}
function paintViewObj(viewObj, posx, posy, sizex, sizey, fast) {
  let window = viewObj;
  if (window.size())
    window[0].paint(posx, posy, sizex, sizey, fast);

}
function onViewEventObj(viewObj, event, posx, posy, sizex, sizey) {
  let window = viewObj;
  return (window.size() !== 0 && window[0].onEvent(event, new QEDExplicitArray(posx, posy), new QEDExplicitArray(sizex, sizey)));
}
function getViewElementRectObj(viewObj, path, index, pos0, pos1, size0, size1, level, dLevel) {
  let window = viewObj;
  return ((window.size() ? window[0].getBoundsRect(path, index, pos0, pos1, size0, size1, level, dLevel) : new QEDExplicitArray()));
}
function resizeViewString(unit) {
  return (getTextSize(unit));
}
function paintViewString(viewObj, posx, posy, sizex, sizey, fast) {
  displayText(viewObj, posx, posy, sizex, sizey);
}
function onViewEventString(viewObj, event, posx, posy, sizex, sizey) {
  return (true);
}
function getViewElementRectString(viewObj, path, index, posx, posy, sizex, sizey, level, dLevel) {
  let size = viewObj;
  return (size);
}
function resizeViewImage(unit) {
  return (getImageSize(unit));
}
function paintViewImage(viewObj, posx, posy, sizex, sizey, fast) {
  displayImage(viewObj, posx, posy, sizex, sizey);
}
function onViewEventImage(viewObj, event, posx, posy, sizex, sizey) {
  return (true);
}
function getViewElementRectImage(viewObj, path, index, posx, posy, sizex, sizey, level, dLevel) {
  let size = viewObj;
  return (size);
}
class Attr_ {
  constructor(code, outNumDim, outType, value) {
    this.code = code;
    this.outNumDim = outNumDim;
    this.outType = outType;
    this.value = value;
  }
}
class Directive_ {
  constructor(direction, atts, children) {
    this.direction = direction;
    this.atts = atts;
    this.children = children;
    this.sizeAttr = new QEDExplicitArray();
    this.outAttr = new QEDExplicitArray();
    this.viewIndex = 0;
    this.childrenViewFlag = false;
    this.changeLevel = RefreshLevelNONE;
    this.subChangeLevel = RefreshLevelNONE;
    this.outType = -1;
    this.outNumDim = 0;
    {
      let ndx = 0;
      while(ndx < this.atts.size()) {
        let attr = this.atts[ndx];
        if (attr.code === QED_TAG_SIZE)
          this.sizeAttr = new QEDExplicitArray(attr);

        if (attr.code === QED_TAG_OUT) {
          this.outAttr = new QEDExplicitArray(attr);
          this.outNumDim = attr.outNumDim;
          this.outType = attr.outType;
        }

        ndx++;
      }

    }
    if (this.sizeAttr.size() !== 0 || (!this.outNumDim !== 0 && this.outType > 0))
      this.viewIndex = 1;
    else
      if (this.outType >= 0)
        this.viewIndex = -1;


    {
      let ndx = 0;
      while(!this.childrenViewFlag && ndx < this.children.size()) {
        this.childrenViewFlag = hasAreas(this.children[ndx]);
        ndx++;
      }

    }
  }
  clearChange() {
    this.changeLevel = RefreshLevelNONE;
    {
      let index = 0;
      while(index < this.children.size()) {
        this.children[index].clearChange();
        index++;
      }

    }
  }
  refreshChange() {
    this.subChangeLevel = 0;
    {
      let index = 0;
      while(index < this.children.size()) {
        this.subChangeLevel = max(this.subChangeLevel, this.children[index].refreshChange());
        index++;
      }

    }
    return (max(this.changeLevel, (this.sizeAttr.size() ? min(this.subChangeLevel, RefreshLevelPAINT) : this.subChangeLevel)));
  }
  setAtt(index, value) {
    let att = this.atts[index];
    if (!qedEqual(value, att.value)) {
      this.changeLevel = max(this.changeLevel, (att.code > QED_TAG_HERITABLE ? RefreshLevelPAINT : (att.code > QED_TAG_AREA_HERITABLE ? RefreshLevelRESIZE : RefreshLevelREGENERATE)));
      this.atts[index].value = value;
    }

  }
  findAttr(code) {
    {
      let index = 0;
      while(index < this.atts.size()) {
        if (this.atts[index].code === code)
          return (new QEDExplicitArray(this.atts[index]));

        index++;
      }

    }
    return (new QEDExplicitArray());
  }
  getChangeLevel() {
    return (this.changeLevel);
  }
  refreshOutModel() {
    let outModel = this.outAttr[0].value;
    if (outModel != null) {
      let objChangeLevel = outModel._refreshModels();
      objChangeLevel = min(RefreshLevelRESIZE, objChangeLevel);
      this.changeLevel = max(this.changeLevel, objChangeLevel);
    }

  }
}
function hasAreas(directive) {
  return (directive.childrenViewFlag || directive.viewIndex !== 0);
}
function isAreaHeritable(code) {
  return (code > QED_TAG_AREA_HERITABLE && code < QED_TAG_AREA_END);
}
function isHeritable(code) {
  return (isAreaHeritable(code) || (code > QED_TAG_HERITABLE && code < QED_TAG_END));
}
class QedImageLoader extends QEDObject {
  constructor(url, context__Call) {
    super(context__Call);
    this.url = url;
    this.image = new QedImage(this);
    this.image.img.onload = function() {
    _qedCallback(this, this.image);
  }.bind(this);
  this.image.img.onerror = function(event){
    _qedCallback(this, this.image);
  }.bind(this);
  this.image.img.src = url;
  }
}
class Widget_ {
  constructor(directive) {
    this.directive = directive;
    this.group = new QEDExplicitArray();
    this.expandArray = this.group$2();
    this.count = 0;
    this.subWidgets = this.group$4();
    this.size = new QEDExplicitArray(0, 0);
    this.outWidget = new QEDExplicitArray();
    this.outType = (this.directive.outAttr.size() ? this.directive.outAttr[0].outType : -1);
    this.outNumDim = (this.outType >= 0 ? this.directive.outAttr[0].outNumDim : 0);
    this.directive.changeLevel = RefreshLevelRESIZE;
  }
  recalcLayout() {
    const arrayElement$5 = function(pos) {
      let i = pos[0];
      return (getDirVar(i, this.directive.sizeAttr[0].value));
    }.bind(this);
    const group$6 = function() {
      let _d0 = 2;
      return (new QEDArray(arrayElement$5, 1, new QEDExplicitArray(0, 0), function(array, dims, context__Call) {
        return new Qui_(array, dims);
      }.bind(this)).insert(new QEDExplicitArray(0), new QEDExplicitArray(_d0)));
    }.bind(this);
    if (this.directive.changeLevel >= RefreshLevelRESIZE && this.outType >= 0) {
      let outModel = this.directive.outAttr[0].value;
      if (outModel != null)
        if (this.outNumDim) {
          if (this.outType === 0) {
            let array = outModel;
            if (!this.outWidget.size()) {
              const l = function() {
                return (new QEDExplicitArray());
              }.bind(this);
              const arrayElement$1 = function(pos) {
                return (l);
              }.bind(this);
              const group$2 = function() {
                let _d0 = array.size();
                return (new QEDArray(arrayElement$1, 1, new QEDExplicitArray(0, 0), function(array, dims, context__Call) {
                  return new Qui_(array, dims);
                }.bind(this)).insert(new QEDExplicitArray(0), new QEDExplicitArray(_d0)));
              }.bind(this);
              let windows = group$2();
              this.outWidget = new QEDExplicitArray(new ViewArray_(windows, array.getDirs(this.directive.direction), resizeViewObj, paintViewObj, onViewEventObj, getViewElementRectObj));
            }

            let viewArray = this.outWidget[0];
            let arraySize = array.size();
            while(arraySize < viewArray.array.size())
              viewArray.array.pop();

            let viewSize = viewArray.array.size();
            {
              let index = 0;
              while(index < arraySize) {
                if (index >= viewSize)
                  viewArray.array.push();

                viewArray.array[index] = _refreshViews(array[index], viewArray.array[index]);
                index++;
              }

            }
          }
          else
            if (this.outType === 1) {
              let viewArray = new ViewArray_(outModel, new QEDExplicitArray(this.directive.direction & 1, (this.directive.direction & 2 ? 1 : 0)), resizeViewString, paintViewString, onViewEventString, getViewElementRectString);
              this.outWidget = new QEDExplicitArray(viewArray);
            }
            else
              if (this.outType === 2) {
                let viewArray = new ViewArray_(outModel, new QEDExplicitArray(this.directive.direction & 1, (this.directive.direction & 2 ? 1 : 0)), resizeViewImage, paintViewImage, onViewEventImage, getViewElementRectImage);
                this.outWidget = new QEDExplicitArray(viewArray);
              }



        }
        else
          if (this.outType === 0) {
            let window = _refreshViews(outModel, this.outWidget);
            this.outWidget = window;
          }



    }
    else
      if (this.outType >= 0)
        this.outType += 1 + 3 - 4;


    {
      let ndx = 0;
      while(ndx < this.directive.atts.size()) {
        if (isAreaHeritable(this.directive.atts[ndx].code))
          pushAttribute_$_$(this.directive.atts[ndx].code, this.directive.atts[ndx].value);

        ndx++;
      }

    }
    if (this.subWidgets.size()) {
      let previous = new QEDExplicitArray();
      this.count = 0;
      {
        let index = 0;
        while(index < this.subWidgets.size()) {
          let sub = this.subWidgets[index];
          sub.recalcLayout();
          if (hasAreas(sub.directive)) {
            const arrayElement$3 = function(pos) {
              let dir = pos[0];
              return (((this.directive.direction & (1 << dir) ? previousSize[dir] + sub.size[dir] : max(previousSize[dir], sub.size[dir]))));
            }.bind(this);
            const group$4 = function() {
              let _d0 = 2;
              return (new QEDArray(arrayElement$3, 1, new QEDExplicitArray(0, 0), function(array, dims, context__Call) {
                return new Qui_(array, dims);
              }.bind(this)).insert(new QEDExplicitArray(0), new QEDExplicitArray(_d0)));
            }.bind(this);
            let previousSize = (previous.size() ? previous[0].group : new QEDExplicitArray(0, 0));
            sub.group = group$4();
            previous = new QEDExplicitArray(sub);
          }

          let att = this.directive.children[index].findAttr(QED_TAG_EXPAND);
          if (att.size()) {
            {
              let dir = 0;
              while(dir < 2) {
                if (this.directive.direction & (1 << dir)) {
                  let dirVar = getDirVar(dir, att[0].value);
                  this.expandArray[dir][this.count] = dirVar + ((this.count ? this.expandArray[dir][this.count - 1] : 0));
                }

                dir++;
              }

            }
            this.count++;
          }

          index++;
        }

      }
      this.size = this.subWidgets[this.subWidgets.size() - 1].group;
    }
    else
      this.size = new QEDExplicitArray(0, 0);

    if (this.outType >= 0) {
      let outModel = this.directive.outAttr[0].value;
      if (outModel != null)
        if (this.outNumDim) {
          let viewArray = this.outWidget[0];
          if (this.outType === 0) {
            viewArray.recalcLayout();
            this.size = viewArray.size;
          }
          else
            if (this.outType === 1) {
              viewArray.recalcLayout();
              this.size = viewArray.size;
            }
            else
              if (this.outType === 2) {
                viewArray.recalcLayout();
                this.size = viewArray.size;
              }



        }
        else
          if (this.outType === 0) {
            let window = this.outWidget;
            if (window.size()) {
              window[0].recalcLayout();
              this.size = window[0].size;
            }
            else
              this.size = new QEDExplicitArray(0, 0);

          }
          else
            if (this.outType === 1)
              this.size = getTextSize(outModel);
            else
              if (this.outType === 2)
                this.size = getImageSize(outModel);





    }

    if (this.directive.sizeAttr.size())
      this.size = group$6();

    {
      let ndx = this.directive.atts.size() - 1;
      while(ndx >= 0) {
        if (isAreaHeritable(this.directive.atts[ndx].code))
          popAttribute(this.directive.atts[ndx].code);

        ndx--;
      }

    }
  }
  paint(pos0, pos1, size0, size1, fast) {
    {
      let ndx = 0;
      while(ndx < this.directive.atts.size()) {
        let att = this.directive.atts[ndx];
        if (isHeritable(att.code)) {
          let value = att.value;
          if (!isAreaHeritable(att.code) && att.outType > 2)
            value = value();

          if (att.code === QED_TAG_ROTATION) {
            rotate(pos0, pos1, size0, size1, value);
            pos0 = -size0 / 2;
            pos1 = -size1 / 2;
          }
          else
            pushAttribute_$_$(att.code, value);

        }

        ndx++;
      }

    }
    let changeCtx = false;
    if (!fast || this.directive.changeLevel !== RefreshLevelNONE || this.directive.subChangeLevel !== RefreshLevelNONE) {
      let outType = (this.directive.outAttr.size() ? this.directive.outAttr[0].outType : -1);
      if (outType >= 0 && this.directive.outAttr[0].value !== null) {
        let outNumDim = (outType >= 0 ? this.directive.outAttr[0].outNumDim : 0);
        let subFast = fast && outType === 0 && this.directive.changeLevel <= RefreshLevelRESIZE;
        changeCtx = fast && !subFast;
        if (changeCtx)
          pushCanvas(pos0, pos1, size0, size1);

        if (outNumDim) {
          let viewArray = this.outWidget[0];
          if (viewArray)
            viewArray.paint(pos0, pos1, size0, size1, subFast);

        }
        else
          if (outType === 0) {
            let window = this.outWidget;
            if (window.size())
              window[0].paint(pos0, pos1, size0, size1, subFast);

          }
          else
            if (outType === 1)
              displayText(this.directive.outAttr[0].value, pos0, pos1, size0, size1);
            else
              if (outType === 2)
                displayImage(this.directive.outAttr[0].value, pos0, pos1, size0, size1);
              else {
                let fn = this.directive.outAttr[0].value;
                let lineWidth = _lineFlag ? ctx.lineWidth : 0;
                let offset = lineWidth / 2;
                fn(pos0 + offset, pos1 + offset, size0 - lineWidth, size1 - lineWidth);
              }




      }

    }

    if (!fast || this.directive.subChangeLevel !== RefreshLevelNONE) {
      let subSize = this.subWidgets.size();
      let extraSpace = this.getExtraSpace(new QEDExplicitArray(size0, size1));
      if (!this.outNumDim !== 0 && this.outType >= 1)
        saveContext();

      {
        let index = 0;
        while(index < subSize) {
          let sub = this.subWidgets[index];
          if (sub && sub.size) {
            let rect = this.getChildArea(index, size0, size1, extraSpace);
            let subFast = fast;
            if (subFast && this.directive.direction === 0)
              subFast = sub.directive.changeLevel !== RefreshLevelNONE || sub.directive.subChangeLevel !== RefreshLevelNONE;

            this.subWidgets[index].paint(pos0 + rect[0], pos1 + rect[1], rect[2], rect[3], subFast);
          }

          index++;
        }

      }
      if (!this.outNumDim !== 0 && this.outType >= 1)
        restoreContext();

    }

    if (changeCtx)
      popCanvas();

    {
      let ndx = this.directive.atts.size() - 1;
      while(ndx >= 0) {
        if (isHeritable(this.directive.atts[ndx].code))
          if (this.directive.atts[ndx].code === QED_TAG_ROTATION)
            restoreContext();
          else
            popAttribute(this.directive.atts[ndx].code);


        ndx--;
      }

    }
  }
  onEvent(event, location, size) {
    let flag = false;
    let locationFlag = true;
    {
      let dir = 0;
      while(locationFlag && dir < 2) {
        locationFlag = location[dir] >= 0 && location[dir] < size[dir];
        dir++;
      }

    }
    if (locationFlag) {
      let subSize = this.subWidgets.size();
      if (subSize) {
        let extraSpace = this.getExtraSpace(size);
        let parse = true;
        {
          let index = subSize - 1;
          while(!flag && parse && index >= 0) {
            let sub = this.subWidgets[index];
            if (sub && sub.size) {
              let rect = this.getChildArea(index, size[0], size[1], extraSpace);
              flag = sub.onEvent(event, new QEDExplicitArray(location[0] - rect[0], location[1] - rect[1]), new QEDExplicitArray(rect[2], rect[3]));
              if (!flag && index !== 0 && this.directive.direction !== 0) {
                let inRect = true;
                {
                  let dir = 0;
                  while(inRect && dir < 2) {
                    inRect = location[dir] >= rect[dir] && location[dir] < rect[dir] + rect[2 + dir];
                    dir++;
                  }

                }
                parse = !inRect;
              }

            }

            index--;
          }

        }
      }

      if (!flag && this.directive.outAttr.size() !== 0)
        if (this.directive.outAttr[0].outNumDim) {
          let viewArray = this.outWidget[0];
          flag = viewArray.onEvent(event, location[0], location[1], size[0], size[1]);
        }
        else
          if (this.directive.outAttr[0].outType === 0) {
            let window = this.outWidget;
            if (window.size())
              flag = window[0].onEvent(event, location, size);

          }



      if (!flag) {
        let eventIndex = this.getEventIndex(event);
        if (eventIndex !== -1) {
          let focus = potentialFocus;
          focus.adjust(this, location, size);
          post__$(this.directive.atts[eventIndex].value);
          flag = true;
        }

      }

    }

    return (flag);
  }
  getBoundsRect(path, index, pos0, pos1, size0, size1, level, dLevel) {
    let tagName = this.directive.findAttr(QED_TAG_ID);
    if (tagName.size())
      if (path[level] === tagName[0].value) {
        level++;
        if (level === path.size() && dLevel === index.size())
          return (new QEDExplicitArray(pos0, pos1, size0, size1));
        else {
          if (this.directive.outAttr.size())
            if (this.directive.outAttr[0].outNumDim) {
              let viewArray = this.outWidget[0];
              return (viewArray.getBoundsRect(path, index, pos0, pos1, size0, size1, level, dLevel));
            }
            else
              if (this.directive.outAttr[0].outType === 0) {
                let window = this.outWidget;
                if (window.size())
                  return (window[0].getBoundsRect(path, index, pos0, pos1, size0, size1, level, dLevel));

              }



          return (new QEDExplicitArray());
        }

      }


    let subSize = this.subWidgets.size();
    if (subSize) {
      let extraSpace = this.getExtraSpace(new QEDExplicitArray(size0, size1));
      {
        let ndx = 0;
        while(ndx < subSize) {
          let sub = this.subWidgets[ndx];
          if (sub && sub.size) {
            let rect = this.getChildArea(ndx, this.size[0], this.size[1], extraSpace);
            let bounds = sub.getBoundsRect(path, index, pos0 + rect[0], pos1 + rect[1], rect[2], rect[3], level, dLevel);
            if (bounds.size())
              return (bounds);

          }

          ndx++;
        }

      }
    }

    return (new QEDExplicitArray());
  }
  getEventIndex(event) {
    {
      let index = 0;
      while(index < this.directive.atts.size()) {
        let code = this.directive.atts[index].code;
        if (code < 0 && event === -code - 1)
          return (index);

        index++;
      }

    }
    return (-1);
  }
  getExtraSpace(totalSize) {
    let extraSpace = new QEDExplicitArray(0, 0);
    {
      let dir = 0;
      while(dir < 2) {
        if (this.directive.direction & (1 << dir)) {
          extraSpace[dir] = totalSize[dir] - ((this.subWidgets.size() ? this.subWidgets[this.subWidgets.size() - 1].group[dir] : 0));
          if (this.directive.children.size() >= 2 && this.count !== 0 && this.expandArray[dir][this.count - 1] > 1)
            extraSpace[dir] /= this.expandArray[dir][this.count - 1];

        }

        dir++;
      }

    }
    return (extraSpace);
  }
  getChildArea(index, size0, size1, extraSpace) {
    let rect = new QEDExplicitArray(0, 0);
    {
      let dir = 0;
      while(dir < 2) {
        if ((this.directive.direction & (1 << dir)) !== 0) {
          let ndx = -1;
          {
            let count = 0;
            while(count < index) {
              if (this.subWidgets[count].directive.findAttr(QED_TAG_EXPAND).size())
                ndx++;

              count++;
            }

          }
          if (ndx >= 0)
            rect[dir] = this.expandArray[dir][ndx] * extraSpace[dir];

        }

        dir++;
      }

    }
    return (getChildArea2(this.subWidgets, this.directive.direction, index, rect[0], rect[1], size0, size1, extraSpace));
  }
  arrayElement$1(pos) {
    return (0);
  }
  group$2() {
    let _d0 = 2;
    let _d1 = 32;
    return (new QEDArray(this.arrayElement$1.bind(this), 2, new QEDExplicitArray(0, 0), function(array, dims, context__Call) {
      return new Qui_(array, dims);
    }.bind(this)).insert(new QEDExplicitArray(0, 0), new QEDExplicitArray(_d0, _d1)));
  }
  arrayElement$3(pos) {
    let i = pos[0];
    return (new Widget_(this.directive.children[i]));
  }
  group$4() {
    let _d0 = this.directive.children.size();
    return (new QEDArray(this.arrayElement$3.bind(this), 1, new QEDExplicitArray(0, 0), function(array, dims, context__Call) {
      return new Qui_(array, dims);
    }.bind(this)).insert(new QEDExplicitArray(0), new QEDExplicitArray(_d0)));
  }
}
function getChildArea2(subWidgets, direction, index, pos0, pos1, size0, size1, extraSpace) {
  let rect = new QEDExplicitArray(pos0, pos1, size0, size1);
  let subWidget = subWidgets[index];
  let expandAttr = subWidget.directive.findAttr(QED_TAG_EXPAND);
  let alignAttr = subWidget.directive.findAttr(QED_TAG_ALIGN);
  let posAttr = subWidget.directive.findAttr(QED_TAG_POS);
  {
    let dir = 0;
    while(dir < 2) {
      if ((direction & (1 << dir)) !== 0) {
        rect[2 + dir] = subWidget.group[dir];
        if (index) {
          let diff = subWidgets[index - 1].group[dir];
          rect[dir] += diff;
          rect[2 + dir] -= diff;
        }

        if (expandAttr.size())
          rect[2 + dir] += extraSpace[dir] * getDirVar(dir, expandAttr[0].value);

      }
      else {
        let originalSize = rect[2 + dir];
        let expansion = (expandAttr.size() ? min(getDirVar(dir, expandAttr[0].value), 1) : (subWidget.directive.findAttr(QED_TAG_SIZE).size() !== 0 || alignAttr.size() !== 0 ? 0 : 1));
        rect[2 + dir] = subWidget.size[dir];
        if (expansion)
          rect[2 + dir] += (originalSize - rect[2 + dir]) * expansion;

        if (alignAttr.size())
          rect[dir] += (originalSize - rect[2 + dir]) * getDirVar(dir, alignAttr[0].value);

      }

      if (posAttr.size())
        rect[dir] += getDirVar(dir, posAttr[0].value);

      dir++;
    }

  }
  return (rect);
}
class QEDFocus_ {
  constructor(widget, rect) {
    this.widget = widget;
    this.rect = rect;
  }
  adjust(w, location, size) {
    this.widget = w;
    this.rect[0] -= location[0];
    this.rect[1] -= location[1];
    this.rect[2] = size[0];
    this.rect[3] = size[1];
  }
}
function _captureFocus() {
  qedFocus = new QEDExplicitArray(potentialFocus);
}
function _releaseFocus() {
  qedFocus = new QEDExplicitArray();
}
function onGlobalEvent(event, location) {
  if (!MainObj)
    return;

  if (qedFocus.size()) {
    let eventIndex = qedFocus[0].widget.getEventIndex(event);
    if (eventIndex !== -1) {
      post__$(qedFocus[0].widget.directive.atts[eventIndex].value);
    }

  }
  else {
    potentialFocus = new QEDFocus_(null, new QEDExplicitArray(location[0], location[1], 0, 0), null);
    if (qedWindows.length)
      qedWindows[0].onEvent(event, location, [canvas.width, canvas.height]);
  }

  if (postHandler)
    executeEvents_();

}
function getDirVar(dir, value) {
  return value instanceof Array ? value[dir] : value;
}
class Window_ {
  constructor(obj, dialog) {
    this.obj = obj;
    this.dialog = dialog;
    this.ui = obj.qedModel;
    this.widgets = this.group$2();
    this.size = new QEDExplicitArray(0, 0);
  }
  recalcLayout() {
    const arrayElement$3 = function(pos) {
      let i = pos[0];
      return (max(this.size[i], this.dialog[0].size[i]));
    }.bind(this);
    const group$4 = function() {
      let _d0 = 2;
      return (new QEDArray(arrayElement$3, 1, new QEDExplicitArray(0, 0), function(array, dims, context__Call) {
        return new Qui_(array, dims);
      }.bind(this)).insert(new QEDExplicitArray(0), new QEDExplicitArray(_d0)));
    }.bind(this);
    if (this.dialog.size())
      this.dialog[0].recalcLayout();

    let previous = new QEDExplicitArray();
    {
      let index = 0;
      while(index < this.widgets.size()) {
        let sub = this.widgets[index];
        sub.recalcLayout();
        if (hasAreas(sub.directive)) {
          const arrayElement$1 = function(pos) {
            let dir = pos[0];
            return (max(previousSize[dir], sub.size[dir]));
          }.bind(this);
          const group$2 = function() {
            let _d0 = 2;
            return (new QEDArray(arrayElement$1, 1, new QEDExplicitArray(0, 0), function(array, dims, context__Call) {
              return new Qui_(array, dims);
            }.bind(this)).insert(new QEDExplicitArray(0), new QEDExplicitArray(_d0)));
          }.bind(this);
          let previousSize = (previous.size() ? previous[0].group : new QEDExplicitArray(0, 0));
          sub.group = group$2();
          previous = new QEDExplicitArray(sub);
        }

        index++;
      }

    }
    this.size = (this.widgets.size() ? this.widgets[this.widgets.size() - 1].group : new QEDExplicitArray(0, 0));
    if (this.dialog.size())
      this.size = group$4();

  }
  paint(pos0, pos1, size0, size1, fast) {
    this.obj.refreshLevel = RefreshLevelNONE;;
    {
      let index = 0;
      while(index < this.widgets.size()) {
        let sub = this.widgets[index];
        if (sub && sub.size) {
          let rect = getChildArea2(this.widgets, 0, index, pos0, pos1, size0, size1, null);
          sub.paint(rect[0], rect[1], rect[2], rect[3], fast);
        }

        index++;
      }

    }
    if (this.dialog.size())
      this.dialog[0].paint(pos0, pos1, size0, size1, fast);

  }
  onEvent(event, location, size) {
    let flag = false;
    if (this.dialog.size())
      flag = this.dialog[0].onEvent(event, location, size);
    else {
      let index = this.widgets.size() - 1;
      while(!flag && index >= 0) {
        let sub = this.widgets[index];
        if (sub && sub.size) {
          let rect = getChildArea2(this.widgets, 0, index, 0, 0, size[0], size[1], null);
          flag = sub.onEvent(event, new QEDExplicitArray(location[0] - rect[0], location[1] - rect[1]), new QEDExplicitArray(rect[2], rect[3]));
        }

        index--;
      }

    }

    return (flag);
  }
  getBoundsRect(path, index, pos0, pos1, size0, size1, level, dLevel) {
    {
      let ndx = 0;
      while(ndx < this.widgets.size()) {
        let sub = this.widgets[ndx];
        if (sub && sub.size) {
          let rect = getChildArea2(this.widgets, 0, ndx, pos0, pos1, size0, size1, null);
          let bounds = sub.getBoundsRect(path, index, rect[0], rect[1], rect[2], rect[3], level, dLevel);
          if (bounds.size())
            return (bounds);

        }

        ndx++;
      }

    }
    return ((this.dialog.size() ? this.dialog[0].getBoundsRect(path, index, pos0, pos1, size0, size1, level, dLevel) : new QEDExplicitArray()));
  }
  arrayElement$1(pos) {
    let i = pos[0];
    return (new Widget_(this.ui[i]));
  }
  group$2() {
    let _d0 = this.ui.size();
    return (new QEDArray(this.arrayElement$1.bind(this), 1, new QEDExplicitArray(0, 0), function(array, dims, context__Call) {
      return new Qui_(array, dims);
    }.bind(this)).insert(new QEDExplicitArray(0), new QEDExplicitArray(_d0)));
  }
}
function _refreshViews(obj, window) {
  if (obj.qedModel) {
    if (!window.length || window[0].obj !== obj)
      window = new QEDExplicitArray(new Window_(obj, new QEDExplicitArray(), null));

    if (obj.blocking__Call)
      window[0].dialog = _refreshViews(obj.blocking__Call, window[0].dialog);

    return (window);
  }
  else
    if (obj.blocking__Call)
      return (_refreshViews(obj.blocking__Call, window));
    else
      return (new QEDExplicitArray());


}
class QedButtonContent extends QEDObject {
  constructor(pressed, context__Call) {
    super(context__Call);
    this.pressed = pressed;
    this.qedModel = null;
  }
  refresh_Model_() {
    if (!this.qedModel) {
      let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null)), new QEDExplicitArray());
      this.qedModel = new QEDExplicitArray(u1);
    }

    let u1 = this.qedModel[0];
    u1.clearChange();
    u1.setAtt(0, "");
    let lvl = u1.refreshChange();
    let _level = lvl;
    return _level;
  }
}
class QedGenericButton extends QEDObject {
  constructor(ContentFn, context__Call) {
    super(context__Call);
    this.ContentFn = ContentFn;
    this.pressed = new QEDExplicitArray(false);
    this.content = this.ContentFn(this.pressed, this);
    this.qedModel = null;
  }
  u$1() {
    this.pressed[0] = true;
    _captureFocus();
  }
  u$2() {
    this.pressed[0] = false;
    _releaseFocus();
    return post_(this, null);
  }
  refresh_Model_() {
    if (!this.qedModel) {
      let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null), new Attr_(-1, 0, -1, this.u$1.bind(this)), new Attr_(-2, 0, -1, this.u$2.bind(this))), new QEDExplicitArray());
      this.qedModel = new QEDExplicitArray(u1);
    }

    let u1 = this.qedModel[0];
    u1.clearChange();
    u1.setAtt(0, this.content);
    u1.refreshOutModel();
    let lvl = u1.refreshChange();
    let _level = lvl;
    return _level;
  }
}
class QedLinkButton extends QEDObject {
  constructor(text, context__Call) {
    super(context__Call);
    this.text = text;
    this.button = _bindHandler(new QedGenericButton(this.group$1(), this), this, this.handler$2);
    this.qedModel = null;
  }
  group$1() {
    class L extends QEDObject {
      constructor(pressed, context__Call, QedLinkButton$this) {
        super(context__Call);
        this.pressed = pressed;
        this.QedLinkButton$this = QedLinkButton$this;
        this.qedModel = null;
      }
      refresh_Model_() {
        if (!this.qedModel) {
          let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(15, 0, 1, null)), new QEDExplicitArray());
          this.qedModel = new QEDExplicitArray(u1);
        }

        let u1 = this.qedModel[0];
        u1.clearChange();
        u1.setAtt(0, this.QedLinkButton$this.text);
        u1.setAtt(1, (this.pressed[0] ? ((35) / 100) : ((100) / 100)));
        let lvl = u1.refreshChange();
        let _level = lvl;
        return _level;
      }
    }
    return (function(pressed, context__Call) {
      return new L(pressed, context__Call, this);
    }.bind(this));
  }
  handler$2() {
    if (!this._isActive()) return;
    return post_(this, this.text);
  }
  refresh_Model_() {
    if (!this.qedModel) {
      let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null)), new QEDExplicitArray());
      this.qedModel = new QEDExplicitArray(u1);
    }

    let u1 = this.qedModel[0];
    u1.clearChange();
    u1.setAtt(0, this.button);
    u1.refreshOutModel();
    let lvl = u1.refreshChange();
    let _level = lvl;
    return _level;
  }
}
class QedRectButton extends QEDObject {
  constructor(ContentFn, context__Call) {
    super(context__Call);
    this.ContentFn = ContentFn;
    this.content = this.ContentFn();
    this.button = _bindHandler(new QedGenericButton(this.group$1(), this), this, this.handler$2);
    this.qedModel = null;
  }
  group$1() {
    class L extends QEDObject {
      constructor(pressed, context__Call, QedRectButton$this) {
        super(context__Call);
        this.pressed = pressed;
        this.QedRectButton$this = QedRectButton$this;
        this.qedModel = null;
      }
      refresh_Model_() {
        if (!this.qedModel) {
          let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 3, null), new Attr_(15, 0, 1, null), new Attr_(12, 0, 1, null)), new QEDExplicitArray());
          let u2 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null)), new QEDExplicitArray());
          let u3 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 3, null)), new QEDExplicitArray(u1, u2));
          this.qedModel = new QEDExplicitArray(u3);
        }

        let u1 = this.qedModel[0];
        u1.clearChange();
        u1.setAtt(0, roundRect);
        let u3 = u1.children[0];
        u3.setAtt(0, rect);
        u3.setAtt(1, (this.pressed[0] ? ((35) / 100) : ((0) / 100)));
        u3.setAtt(2, "black");
        let u2 = u1.children[1];
        u2.setAtt(0, this.QedRectButton$this.content);
        u2.refreshOutModel();
        let lvl = u1.refreshChange();
        let _level = lvl;
        return _level;
      }
    }
    return (function(pressed, context__Call) {
      return new L(pressed, context__Call, this);
    }.bind(this));
  }
  handler$2() {
    if (!this._isActive()) return;
    return post_(this, null);
  }
  refresh_Model_() {
    if (!this.qedModel) {
      let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null)), new QEDExplicitArray());
      this.qedModel = new QEDExplicitArray(u1);
    }

    let u1 = this.qedModel[0];
    u1.clearChange();
    u1.setAtt(0, this.button);
    u1.refreshOutModel();
    let lvl = u1.refreshChange();
    let _level = lvl;
    return _level;
  }
}
class QedTextButton extends QEDObject {
  constructor(text, context__Call) {
    super(context__Call);
    this.text = text;
    this._textStyle = "white";
    this._textOpacity = 1;
    this.button = _bindHandler(new QedRectButton(this.group$1(), this), this, this.handler$2);
    this.qedModel = null;
  }
  textStyle(style) {
    this._textStyle = style;
    return (this);
  }
  textOpacity(opacity) {
    this._textOpacity = opacity;
    return (this);
  }
  group$1() {
    class L extends QEDObject {
      constructor(context__Call, QedTextButton$this) {
        super(context__Call);
        this.QedTextButton$this = QedTextButton$this;
        this.qedModel = null;
      }
      refresh_Model_() {
        if (!this.qedModel) {
          let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null), new Attr_(9, 0, 1, null)), new QEDExplicitArray());
          let u2 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(12, 0, 1, null), new Attr_(15, 0, 1, null)), new QEDExplicitArray());
          let u3 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null), new Attr_(9, 0, 1, null)), new QEDExplicitArray());
          let u4 = new Directive_(3, new QEDExplicitArray(new Attr_(9, 0, 1, null)), new QEDExplicitArray(u1, u2, u3));
          this.qedModel = new QEDExplicitArray(u4);
        }

        let u1 = this.qedModel[0];
        u1.clearChange();
        u1.setAtt(0, ((100) / 100));
        let u4 = u1.children[0];
        u4.setAtt(0, (_fontSize) * 0.200000);
        u4.setAtt(1, 1);
        let u3 = u1.children[1];
        u3.setAtt(0, this.QedTextButton$this.text);
        u3.setAtt(1, this.QedTextButton$this._textStyle);
        u3.setAtt(2, this.QedTextButton$this._textOpacity);
        let u2 = u1.children[2];
        u2.setAtt(0, (_fontSize) * 0.200000);
        u2.setAtt(1, 1);
        let lvl = u1.refreshChange();
        let _level = lvl;
        return _level;
      }
    }
    return (function(context__Call) {
      return new L(context__Call, this);
    }.bind(this));
  }
  handler$2() {
    if (!this._isActive()) return;
    return post_(this, this.text);
  }
  refresh_Model_() {
    if (!this.qedModel) {
      let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null)), new QEDExplicitArray());
      this.qedModel = new QEDExplicitArray(u1);
    }

    let u1 = this.qedModel[0];
    u1.clearChange();
    u1.setAtt(0, this.button);
    u1.refreshOutModel();
    let lvl = u1.refreshChange();
    let _level = lvl;
    return _level;
  }
}
class Main extends QEDObject {
  constructor(argv, context__Call) {
    super(context__Call);
    this.argv = argv;
    this.exitHandler = new QEDExplicitArray();
    this.emptyWidget = new Main.Widget(this, this);
    this.exit = _bindHandler(new QedTextButton("Exit", this), this, this.handler$1);
    this.application = new Main.Application(this, this);
    this.qedModel = null;
  }
  displaySlider(x, y, width, height) {
    const radius = 15;
  const radiusy = Math.min(radius, height / 2);

  ctx.beginPath();
  ctx.moveTo(x - radius, y);
  ctx.quadraticCurveTo(x, y, x, y + radiusy);
  if (height > 2 * radius)
    ctx.lineTo(x, y + height - radiusy)
  ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
  ctx.lineTo(x + width - radius, y + height)
  ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radiusy);
  if (height > 2 * radius)
    ctx.lineTo(x + width, y + radiusy);
  ctx.quadraticCurveTo(x + width, y, x + width + radius, y);
  ctx.lineTo(x - radius, y);
    qedDraw();
  }
  displayTacos(x, y, width, height, count) {
    const scale = height / 80;
  const pos = (width - height * 1.25) / 2;

  // Scaled rectangle
  ctx.translate(x + pos, y);
  ctx.scale(scale, scale);

  function renderTaco(y) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(50, 50 + y, 50, 190/360 * 2 * Math.PI, -10/360 * 2 * Math.PI);
    ctx.fill();

    if (y < 60) {
      ctx.fillStyle = attributeStacks[QED_TAG_FILL_STYLE][attributeStacks[QED_TAG_FILL_STYLE].length - 1][1];
      ctx.beginPath();
      ctx.arc(50, 70 + y, 53, 190/360 * 2 * Math.PI, -10/360 * 2 * Math.PI);
      ctx.fill();
    }

    ctx.restore();
  }

  for (let i = 4 - count; i < 4; i++)
    renderTaco(i * 20)

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  showTwoTacos(x, y, width, height) {
    this.displayTacos(x, y, width, height, 2);
  }
  static ObjectOverTextButton = class extends QEDObject {
    constructor(drawObject, text, context__Call, Main$this) {
      super(context__Call);
      this.drawObject = drawObject;
      this.text = text;
      this.Main$this = Main$this;
      this.button = _bindHandler(new QedRectButton(this.group$1(), this), this, this.handler$2);
      this.qedModel = null;
    }
    group$1() {
      class L extends QEDObject {
        constructor(context__Call, ObjectOverTextButton$this, Main$this) {
          super(context__Call);
          this.ObjectOverTextButton$this = ObjectOverTextButton$this;
          this.Main$this = Main$this;
          this.qedModel = null;
        }
        refresh_Model_() {
          if (!this.qedModel) {
            let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 3, null), new Attr_(1, 1, -1, null), new Attr_(12, 0, 1, null), new Attr_(8, 0, 1, null), new Attr_(12, 0, 1, null), new Attr_(10, 1, -1, null)), new QEDExplicitArray());
            let u2 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null)), new QEDExplicitArray());
            let u3 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(8, 0, 1, null), new Attr_(12, 0, 1, null)), new QEDExplicitArray());
            let u4 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 1, -1, null)), new QEDExplicitArray(u3));
            let u5 = new Directive_(2, new QEDExplicitArray(new Attr_(8, 0, 1, null)), new QEDExplicitArray(u1, u2, u4));
            this.qedModel = new QEDExplicitArray(u5);
          }

          let u1 = this.qedModel[0];
          u1.clearChange();
          u1.setAtt(0, ((50) / 100));
          let u4 = u1.children[0];
          u4.setAtt(0, this.ObjectOverTextButton$this.drawObject);
          u4.setAtt(1, new QEDExplicitArray(240, 160));
          u4.setAtt(2, "none");
          u4.setAtt(3, ((50) / 100));
          u4.setAtt(4, "white");
          u4.setAtt(5, new QEDExplicitArray(0, -40));
          let u3 = u1.children[1];
          u3.setAtt(0, 10);
          let u2 = u1.children[2];
          u2.setAtt(0, new QEDExplicitArray(300, 50));
          let u5 = u2.children[0];
          u5.setAtt(0, this.ObjectOverTextButton$this.text);
          u5.setAtt(1, ((50) / 100));
          u5.setAtt(2, "white");
          let lvl = u1.refreshChange();
          let _level = lvl;
          return _level;
        }
      }
      return (function(context__Call) {
        return new L(context__Call, this, this.Main$this);
      }.bind(this));
    }
    handler$2() {
      if (!this._isActive()) return;
      return post_(this, null);
    }
    refresh_Model_() {
      if (!this.qedModel) {
        let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null)), new QEDExplicitArray());
        this.qedModel = new QEDExplicitArray(u1);
      }

      let u1 = this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, this.button);
      u1.refreshOutModel();
      let lvl = u1.refreshChange();
      let _level = lvl;
      return _level;
    }
  }
  static ObjectBeforeTextButton = class extends QEDObject {
    constructor(drawObject, text, context__Call, Main$this) {
      super(context__Call);
      this.drawObject = drawObject;
      this.text = text;
      this.Main$this = Main$this;
      this.button = _bindHandler(new QedRectButton(this.group$1(), this), this, this.handler$2);
      this.qedModel = null;
    }
    group$1() {
      class L extends QEDObject {
        constructor(context__Call, ObjectBeforeTextButton$this, Main$this) {
          super(context__Call);
          this.ObjectBeforeTextButton$this = ObjectBeforeTextButton$this;
          this.Main$this = Main$this;
          this.qedModel = null;
        }
        refresh_Model_() {
          if (!this.qedModel) {
            let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null)), new QEDExplicitArray());
            let u2 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 3, null), new Attr_(1, 0, 1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray());
            let u3 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null)), new QEDExplicitArray());
            let u4 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(8, 1, -1, null)), new QEDExplicitArray());
            let u5 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 1, -1, null)), new QEDExplicitArray(u4));
            let u6 = new Directive_(1, new QEDExplicitArray(new Attr_(8, 1, -1, null), new Attr_(12, 0, 1, null)), new QEDExplicitArray(u1, u2, u3, u5));
            this.qedModel = new QEDExplicitArray(u6);
          }

          let u1 = this.qedModel[0];
          u1.clearChange();
          u1.setAtt(0, new QEDExplicitArray(0, ((50) / 100)));
          u1.setAtt(1, "white");
          let u5 = u1.children[0];
          u5.setAtt(0, 30);
          let u4 = u1.children[1];
          u4.setAtt(0, this.ObjectBeforeTextButton$this.drawObject);
          u4.setAtt(1, 60);
          u4.setAtt(2, ((50) / 100));
          let u3 = u1.children[2];
          u3.setAtt(0, 20);
          let u2 = u1.children[3];
          u2.setAtt(0, new QEDExplicitArray(200, 50));
          let u6 = u2.children[0];
          u6.setAtt(0, this.ObjectBeforeTextButton$this.text);
          u6.setAtt(1, new QEDExplicitArray(0, ((50) / 100)));
          let lvl = u1.refreshChange();
          let _level = lvl;
          return _level;
        }
      }
      return (function(context__Call) {
        return new L(context__Call, this, this.Main$this);
      }.bind(this));
    }
    handler$2() {
      if (!this._isActive()) return;
      return post_(this, null);
    }
    refresh_Model_() {
      if (!this.qedModel) {
        let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null)), new QEDExplicitArray());
        this.qedModel = new QEDExplicitArray(u1);
      }

      let u1 = this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, this.button);
      u1.refreshOutModel();
      let lvl = u1.refreshChange();
      let _level = lvl;
      return _level;
    }
  }
  static KeyButton = class extends QEDObject {
    constructor(text, context__Call, Main$this) {
      super(context__Call);
      this.text = text;
      this.Main$this = Main$this;
      this.button = _bindHandler(new QedTextButton(this.text, this), this, this.handler$1);
      this.qedModel = null;
    }
    handler$1(_ret) {
      if (!this._isActive()) return;
      return post_(this, this.text);
    }
    refresh_Model_() {
      if (!this.qedModel) {
        let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null)), new QEDExplicitArray());
        let u2 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null), new Attr_(5, 0, 1, null)), new QEDExplicitArray());
        this.qedModel = new QEDExplicitArray(u1, u2);
      }

      let u2 = this.qedModel[0];
      u2.clearChange();
      u2.setAtt(0, (_fontSize) * 1.500000);
      let lvl = u2.refreshChange();
      let _level = lvl;
      let u1 = this.qedModel[1];
      u1.clearChange();
      u1.setAtt(0, this.button);
      u1.setAtt(1, ((_fontSize) * (((this.text.length) > 1 ? 0.500000 : 1))));
      pushAttribute_$_$(5, u1.atts[1].value);
      u1.refreshOutModel();
      popAttribute(5);
      let lvl_$ = u1.refreshChange();
      _level = max(_level, lvl_$);
      return _level;
    }
  }
  static NumericKeyboardWidget = class extends QEDObject {
    constructor(context__Call, Main$this) {
      super(context__Call);
      this.Main$this = Main$this;
      this.typedText = "";
      this.numKeyboardRows = new QEDExplicitArray("789", "456", "123");
      this.rows = this.group$2();
      this.lastRow = new QEDExplicitArray(_bindHandler(new Main.KeyButton("Clear", this, this.Main$this), this, this.handler$3), _bindHandler(new Main.KeyButton("0", this, this.Main$this), this, this.handler$4), _bindHandler(new Main.KeyButton("Del", this, this.Main$this), this, this.handler$5));
      this.qedModel = null;
    }
    static Row = class extends QEDObject {
      constructor(row, context__Call, NumericKeyboardWidget$this, Main$this) {
        super(context__Call);
        this.row = row;
        this.NumericKeyboardWidget$this = NumericKeyboardWidget$this;
        this.Main$this = Main$this;
        this.buttons = this.group$2();
        this.qedModel = null;
      }
      arrayElement$1(pos) {
        const handler$1 = function(_ret) {
          if (!this._isActive()) return;
          return post_(this, _ret);
        }.bind(this);
        let index = pos[0];
        return (_bindHandler(new Main.KeyButton(this.NumericKeyboardWidget$this.numKeyboardRows[this.row].charAt(index), this, this.Main$this), this, handler$1));
      }
      group$2() {
        let _d0 = this.NumericKeyboardWidget$this.numKeyboardRows[this.row].length;
        return (new QEDArray(this.arrayElement$1.bind(this), 1, new QEDExplicitArray(1, 0), function(array, dims, context__Call) {
          return new Qui_(array, dims);
        }.bind(this)).insert(new QEDExplicitArray(0), new QEDExplicitArray(_d0)));
      }
      refresh_Model_() {
        if (!this.qedModel) {
          let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 1, 0, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray());
          this.qedModel = new QEDExplicitArray(u1);
        }

        let u1 = this.qedModel[0];
        u1.clearChange();
        u1.setAtt(0, this.buttons);
        u1.setAtt(1, ((50) / 100));
        u1.refreshOutModel();
        let lvl = u1.refreshChange();
        let _level = lvl;
        return _level;
      }
    }
    arrayElement$1(pos) {
      const handler$1 = function(_ret) {
        if (!this._isActive()) return;
        this.typedText += _ret;
        return post_(this, this.typedText);
      }.bind(this);
      let i = pos[0];
      return (_bindHandler(new Main.NumericKeyboardWidget.Row(i, this, this, this.Main$this), this, handler$1));
    }
    group$2() {
      let _d0 = this.numKeyboardRows.size();
      return (new QEDArray(this.arrayElement$1.bind(this), 1, new QEDExplicitArray(0, 1), function(array, dims, context__Call) {
        return new Qui_(array, dims);
      }.bind(this)).insert(new QEDExplicitArray(0), new QEDExplicitArray(_d0)));
    }
    handler$3(_ret) {
      if (!this._isActive()) return;
      this.typedText = "";
      return post_(this, this.typedText);
    }
    handler$4(_ret) {
      if (!this._isActive()) return;
      this.typedText += "0";
      return post_(this, this.typedText);
    }
    handler$5(_ret) {
      if (!this._isActive()) return;
      this.typedText = this.typedText.slice(0, -1);
      return post_(this, this.typedText);
    }
    refresh_Model_() {
      if (!this.qedModel) {
        let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 1, 0, null)), new QEDExplicitArray());
        let u2 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null)), new QEDExplicitArray());
        let u3 = new Directive_(1, new QEDExplicitArray(new Attr_(0, 1, 0, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray());
        let u4 = new Directive_(2, new QEDExplicitArray(), new QEDExplicitArray(u1, u2, u3));
        this.qedModel = new QEDExplicitArray(u4);
      }

      let u1 = this.qedModel[0];
      u1.clearChange();
      let u4 = u1.children[0];
      u4.setAtt(0, this.rows);
      u4.refreshOutModel();
      let u3 = u1.children[1];
      u3.setAtt(0, 15);
      let u2 = u1.children[2];
      u2.setAtt(0, this.lastRow);
      u2.setAtt(1, ((50) / 100));
      u2.refreshOutModel();
      let lvl = u1.refreshChange();
      let _level = lvl;
      return _level;
    }
  }
  static AlphaKeyboardWidget = class extends QEDObject {
    constructor(context__Call, Main$this) {
      super(context__Call);
      this.Main$this = Main$this;
      this.typedText = "";
      this.alphaKeyboardRows = new QEDExplicitArray("1234567890", "QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM");
      this.rows = this.group$2();
      this.lastRow = new QEDExplicitArray(_bindHandler(new Main.KeyButton("Clear", this, this.Main$this), this, this.handler$3), _bindHandler(new QedRectButton(function(context__Call) {
        return new Main.AlphaKeyboardWidget.SpaceFunc(context__Call, this, this.Main$this);
      }.bind(this), this), this, this.handler$4), _bindHandler(new Main.KeyButton("Del", this, this.Main$this), this, this.handler$5));
      this.qedModel = null;
    }
    static Row = class extends QEDObject {
      constructor(row, context__Call, AlphaKeyboardWidget$this, Main$this) {
        super(context__Call);
        this.row = row;
        this.AlphaKeyboardWidget$this = AlphaKeyboardWidget$this;
        this.Main$this = Main$this;
        this.buttons = this.group$2();
        this.qedModel = null;
      }
      arrayElement$1(pos) {
        const handler$1 = function(_ret) {
          if (!this._isActive()) return;
          return post_(this, _ret);
        }.bind(this);
        let index = pos[0];
        return (_bindHandler(new Main.KeyButton(this.AlphaKeyboardWidget$this.alphaKeyboardRows[this.row].charAt(index), this, this.Main$this), this, handler$1));
      }
      group$2() {
        let _d0 = this.AlphaKeyboardWidget$this.alphaKeyboardRows[this.row].length;
        return (new QEDArray(this.arrayElement$1.bind(this), 1, new QEDExplicitArray(1, 0), function(array, dims, context__Call) {
          return new Qui_(array, dims);
        }.bind(this)).insert(new QEDExplicitArray(0), new QEDExplicitArray(_d0)));
      }
      refresh_Model_() {
        if (!this.qedModel) {
          let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 1, 0, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray());
          this.qedModel = new QEDExplicitArray(u1);
        }

        let u1 = this.qedModel[0];
        u1.clearChange();
        u1.setAtt(0, this.buttons);
        u1.setAtt(1, ((50) / 100));
        u1.refreshOutModel();
        let lvl = u1.refreshChange();
        let _level = lvl;
        return _level;
      }
    }
    static SpaceFunc = class extends QEDObject {
      constructor(context__Call, AlphaKeyboardWidget$this, Main$this) {
        super(context__Call);
        this.AlphaKeyboardWidget$this = AlphaKeyboardWidget$this;
        this.Main$this = Main$this;
        this.qedModel = null;
      }
      refresh_Model_() {
        if (!this.qedModel) {
          let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 1, -1, null)), new QEDExplicitArray());
          this.qedModel = new QEDExplicitArray(u1);
        }

        let u1 = this.qedModel[0];
        u1.clearChange();
        u1.setAtt(0, new QEDExplicitArray(200, 1));
        let lvl = u1.refreshChange();
        let _level = lvl;
        return _level;
      }
    }
    arrayElement$1(pos) {
      const handler$1 = function(_ret) {
        if (!this._isActive()) return;
        this.typedText += _ret;
        return post_(this, this.typedText);
      }.bind(this);
      let i = pos[0];
      return (_bindHandler(new Main.AlphaKeyboardWidget.Row(i, this, this, this.Main$this), this, handler$1));
    }
    group$2() {
      let _d0 = this.alphaKeyboardRows.size();
      return (new QEDArray(this.arrayElement$1.bind(this), 1, new QEDExplicitArray(0, 1), function(array, dims, context__Call) {
        return new Qui_(array, dims);
      }.bind(this)).insert(new QEDExplicitArray(0), new QEDExplicitArray(_d0)));
    }
    handler$3(_ret) {
      if (!this._isActive()) return;
      this.typedText = "";
      return post_(this, this.typedText);
    }
    handler$4() {
      if (!this._isActive()) return;
      this.typedText += " ";
      return post_(this, this.typedText);
    }
    handler$5(_ret) {
      if (!this._isActive()) return;
      this.typedText = this.typedText.slice(0, -1);
      return post_(this, this.typedText);
    }
    refresh_Model_() {
      if (!this.qedModel) {
        let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 1, 0, null)), new QEDExplicitArray());
        let u2 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null)), new QEDExplicitArray());
        let u3 = new Directive_(1, new QEDExplicitArray(new Attr_(0, 1, 0, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray());
        let u4 = new Directive_(2, new QEDExplicitArray(), new QEDExplicitArray(u1, u2, u3));
        this.qedModel = new QEDExplicitArray(u4);
      }

      let u1 = this.qedModel[0];
      u1.clearChange();
      let u4 = u1.children[0];
      u4.setAtt(0, this.rows);
      u4.refreshOutModel();
      let u3 = u1.children[1];
      u3.setAtt(0, 10);
      let u2 = u1.children[2];
      u2.setAtt(0, this.lastRow);
      u2.setAtt(1, ((50) / 100));
      u2.refreshOutModel();
      let lvl = u1.refreshChange();
      let _level = lvl;
      return _level;
    }
  }
  static SpinnerWidget = class extends QEDObject {
    constructor(context__Call, Main$this) {
      super(context__Call);
      this.Main$this = Main$this;
      this.angle = 0;
      this.numCircles = 7;
      this.circles = this.group$2();
      this.while$5();
    }
    static Circle = class extends QEDObject {
      constructor(index, context__Call, SpinnerWidget$this, Main$this) {
        super(context__Call);
        this.index = index;
        this.SpinnerWidget$this = SpinnerWidget$this;
        this.Main$this = Main$this;
        this.qedModel = null;
      }
      refresh_Model_() {
        if (!this.qedModel) {
          let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 3, null), new Attr_(1, 1, -1, null), new Attr_(8, 1, -1, null)), new QEDExplicitArray());
          let u2 = new Directive_(0, new QEDExplicitArray(new Attr_(17, 0, 1, null)), new QEDExplicitArray(u1));
          this.qedModel = new QEDExplicitArray(u2);
        }

        let u1 = this.qedModel[0];
        u1.clearChange();
        u1.setAtt(0, (this.SpinnerWidget$this.angle + this.index) * 2 * 3.141593 / this.SpinnerWidget$this.numCircles);
        let u2 = u1.children[0];
        u2.setAtt(0, oval);
        u2.setAtt(1, new QEDExplicitArray(30, 15));
        u2.setAtt(2, new QEDExplicitArray(((100) / 100), ((50) / 100)));
        let lvl = u1.refreshChange();
        let _level = lvl;
        return _level;
      }
    }
    arrayElement$1(pos) {
      let index = pos[0];
      return (new Main.SpinnerWidget.Circle(index, this, this, this.Main$this));
    }
    group$2() {
      let _d0 = this.numCircles;
      return (new QEDArray(this.arrayElement$1.bind(this), 1, new QEDExplicitArray(0, 0), function(array, dims, context__Call) {
        return new Qui_(array, dims);
      }.bind(this)).insert(new QEDExplicitArray(0), new QEDExplicitArray(_d0)));
    }
    refresh_Model_() {
      if (!this.qedModel) {
        let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 1, 0, null)), new QEDExplicitArray());
        let u2 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray(u1));
        this.qedModel = new QEDExplicitArray(u2);
      }

      let u1 = this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, 100);
      u1.setAtt(1, ((50) / 100));
      let u2 = u1.children[0];
      u2.setAtt(0, this.circles);
      u2.refreshOutModel();
      let lvl = u1.refreshChange();
      let _level = lvl;
      return _level;
    }
    cont$4(_ret$3) {
      if (!this._isActive()) return;
      this._qedEndCall();
      this.angle = _ret$3 / 2000 * 2 * 3.141593;
      this.while$5();
    }
    while$5() {
      if (true)
        this._qedSetBlockingCall(_bindHandler(new QedAnimation(this.context__Call), this, this.cont$4));
      else {
        this.qedModel = null;
      }

    }
  }
  getTimestamp() {
    const date = new Date();
    let minutes = date.getMinutes();
    return ((date.getHours()) + ":" + ((minutes < 10 ? "0" : "")) + minutes);
  }
  formatMoney(amount) {
    let dollars = Math.trunc(amount);
    let cents = Math.round((amount - dollars) * 100);
    return ("$" + dollars + "." + ((cents < 10 ? "0" : "")) + cents);
  }
  static NumTacosWidget = class extends QEDObject {
    constructor(context__Call, Main$this) {
      super(context__Call);
      this.Main$this = Main$this;
      this.numTacosButtonArray = this.group$2();
      this.qedModel = null;
    }
    static NumButton = class extends QEDObject {
      constructor(num, context__Call, NumTacosWidget$this, Main$this) {
        super(context__Call);
        this.num = num;
        this.NumTacosWidget$this = NumTacosWidget$this;
        this.Main$this = Main$this;
        this.button = _bindHandler(new QedRectButton(this.group$1(), this), this, this.handler$2);
        this.qedModel = null;
      }
      showTacos(x, y, width, height) {
        this.Main$this.displayTacos(x, y, width, height, this.num);
      }
      group$1() {
        class L extends QEDObject {
          constructor(context__Call, NumButton$this, NumTacosWidget$this, Main$this) {
            super(context__Call);
            this.NumButton$this = NumButton$this;
            this.NumTacosWidget$this = NumTacosWidget$this;
            this.Main$this = Main$this;
            this.qedModel = null;
          }
          refresh_Model_() {
            if (!this.qedModel) {
              let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null)), new QEDExplicitArray());
              let u2 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 3, null), new Attr_(1, 0, 1, null), new Attr_(8, 0, 1, null), new Attr_(12, 0, 1, null), new Attr_(10, 1, -1, null)), new QEDExplicitArray());
              let u3 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 1, -1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray(u2));
              let u4 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(5, 0, 1, null), new Attr_(8, 0, 1, null), new Attr_(12, 0, 1, null)), new QEDExplicitArray());
              let u5 = new Directive_(0, new QEDExplicitArray(), new QEDExplicitArray(u3, u4));
              let u6 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null)), new QEDExplicitArray());
              let u7 = new Directive_(2, new QEDExplicitArray(), new QEDExplicitArray(u1, u5, u6));
              this.qedModel = new QEDExplicitArray(u7);
            }

            let u1 = this.qedModel[0];
            u1.clearChange();
            let u4 = u1.children[0];
            u4.setAtt(0, 15);
            let u3 = u1.children[1];
            let u6 = u3.children[0];
            u6.setAtt(0, new QEDExplicitArray(175, 70));
            u6.setAtt(1, ((50) / 100));
            let u7 = u6.children[0];
            u7.setAtt(0, this.NumButton$this.showTacos.bind(this.NumButton$this));
            u7.setAtt(1, 70);
            u7.setAtt(2, ((50) / 100));
            u7.setAtt(3, "#D0D6CA");
            u7.setAtt(4, new QEDExplicitArray(0, -20));
            let u5 = u3.children[1];
            u5.setAtt(0, this.NumButton$this.num);
            u5.setAtt(1, 100);
            u5.setAtt(2, ((50) / 100));
            u5.setAtt(3, "white");
            let u2 = u1.children[2];
            u2.setAtt(0, 15);
            let lvl = u1.refreshChange();
            let _level = lvl;
            return _level;
          }
        }
        return (function(context__Call) {
          return new L(context__Call, this, this.NumTacosWidget$this, this.Main$this);
        }.bind(this));
      }
      handler$2() {
        if (!this._isActive()) return;
        return post_(this, null);
      }
      refresh_Model_() {
        if (!this.qedModel) {
          let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null)), new QEDExplicitArray());
          this.qedModel = new QEDExplicitArray(u1);
        }

        let u1 = this.qedModel[0];
        u1.clearChange();
        u1.setAtt(0, this.button);
        u1.refreshOutModel();
        let lvl = u1.refreshChange();
        let _level = lvl;
        return _level;
      }
    }
    arrayElement$1(pos) {
      const handler$1 = function() {
        if (!this._isActive()) return;
        return post_(this, index + 1);
      }.bind(this);
      let index = pos[0];
      return (_bindHandler(new Main.NumTacosWidget.NumButton(index + 1, this, this, this.Main$this), this, handler$1));
    }
    group$2() {
      let _d0 = 4;
      return (new QEDArray(this.arrayElement$1.bind(this), 1, new QEDExplicitArray(1, 0), function(array, dims, context__Call) {
        return new Qui_(array, dims);
      }.bind(this)).insert(new QEDExplicitArray(0), new QEDExplicitArray(_d0)));
    }
    refresh_Model_() {
      if (!this.qedModel) {
        let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null)), new QEDExplicitArray());
        let u2 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray());
        let u3 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null)), new QEDExplicitArray());
        let u4 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 1, 0, null), new Attr_(6, 0, 1, null), new Attr_(16, 0, 1, null), new Attr_(5, 0, 1, null), new Attr_(12, 0, 1, null)), new QEDExplicitArray());
        let u5 = new Directive_(2, new QEDExplicitArray(new Attr_(8, 1, -1, null)), new QEDExplicitArray(u1, u2, u3, u4));
        this.qedModel = new QEDExplicitArray(u5);
      }

      let u1 = this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, new QEDExplicitArray(((50) / 100), 0));
      let u5 = u1.children[0];
      u5.setAtt(0, 50);
      let u4 = u1.children[1];
      u4.setAtt(0, "How many tacos do you want?");
      u4.setAtt(1, ((50) / 100));
      let u3 = u1.children[2];
      u3.setAtt(0, 50);
      let u2 = u1.children[3];
      u2.setAtt(0, this.numTacosButtonArray);
      u2.setAtt(1, 15);
      u2.setAtt(2, 15);
      u2.setAtt(3, 15);
      u2.setAtt(4, "#B1BBA8");
      pushAttribute_$_$(6, u2.atts[1].value);
      pushAttribute_$_$(5, u2.atts[3].value);
      u2.refreshOutModel();
      popAttribute(5);
      popAttribute(6);
      let lvl = u1.refreshChange();
      let _level = lvl;
      return _level;
    }
  }
  static RoomNumberWidget = class extends QEDObject {
    constructor(context__Call, Main$this) {
      super(context__Call);
      this.Main$this = Main$this;
      this.roomNumber = "";
      this.numericKeyboard = _bindHandler(new Main.NumericKeyboardWidget(this, this.Main$this), this, this.handler$1);
      this.nextButton = _bindHandler(new QedTextButton("Next", this), this, this.handler$2);
      this.qedModel = null;
    }
    handler$1(_ret) {
      if (!this._isActive()) return;
      this.roomNumber = _ret;
    }
    handler$2(_ret) {
      if (!this._isActive()) return;
      return post_(this, this.roomNumber);
    }
    refresh_Model_() {
      if (!this.qedModel) {
        let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray());
        let u2 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(5, 0, 1, null), new Attr_(12, 0, 1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray());
        let u3 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 3, null), new Attr_(1, 1, -1, null), new Attr_(12, 0, 1, null), new Attr_(16, 0, 1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray(u2));
        let u4 = new Directive_(2, new QEDExplicitArray(new Attr_(8, 1, -1, null)), new QEDExplicitArray(u1, u3));
        let u5 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null), new Attr_(9, 1, -1, null)), new QEDExplicitArray(u4));
        let u6 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null), new Attr_(5, 0, 1, null), new Attr_(6, 0, 1, null), new Attr_(16, 0, 1, null), new Attr_(12, 0, 1, null), new Attr_(8, 1, -1, null)), new QEDExplicitArray());
        let u7 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null), new Attr_(9, 1, -1, null)), new QEDExplicitArray(u6));
        let u8 = new Directive_(1, new QEDExplicitArray(), new QEDExplicitArray(u5, u7));
        let u9 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null), new Attr_(5, 0, 1, null), new Attr_(12, 0, 1, null), new Attr_(8, 0, 1, null), new Attr_(10, 0, 1, null), new Attr_(9, 0, 1, null)), new QEDExplicitArray());
        this.qedModel = new QEDExplicitArray(u8, u9);
      }

      let u2 = this.qedModel[0];
      u2.clearChange();
      let u4 = u2.children[0];
      u4.setAtt(0, 0);
      u4.setAtt(1, new QEDExplicitArray(((50) / 100), ((100) / 100)));
      let u5 = u4.children[0];
      u5.setAtt(0, new QEDExplicitArray(((90) / 100), ((30) / 100)));
      let u7 = u5.children[0];
      u7.setAtt(0, "Type your room number");
      u7.setAtt(1, ((50) / 100));
      let u6 = u5.children[1];
      u6.setAtt(0, roundRect);
      u6.setAtt(1, new QEDExplicitArray(300, 40));
      u6.setAtt(2, "#DDD1E7");
      u6.setAtt(3, 20);
      u6.setAtt(4, ((50) / 100));
      let u8 = u6.children[0];
      u8.setAtt(0, this.roomNumber);
      u8.setAtt(1, 30);
      u8.setAtt(2, "#58535C");
      u8.setAtt(3, ((50) / 100));
      let u3 = u2.children[1];
      u3.setAtt(0, 0);
      u3.setAtt(1, new QEDExplicitArray(((50) / 100), ((100) / 100)));
      let u9 = u3.children[0];
      u9.setAtt(0, this.numericKeyboard);
      u9.setAtt(1, 40);
      u9.setAtt(2, 10);
      u9.setAtt(3, 20);
      u9.setAtt(4, "#AB8EC4");
      u9.setAtt(5, new QEDExplicitArray(((10) / 100), ((30) / 100)));
      pushAttribute_$_$(5, u9.atts[1].value);
      pushAttribute_$_$(6, u9.atts[2].value);
      u9.refreshOutModel();
      popAttribute(6);
      popAttribute(5);
      let lvl = u2.refreshChange();
      let _level = lvl;
      let u1 = this.qedModel[1];
      u1.clearChange();
      u1.setAtt(0, this.nextButton);
      u1.setAtt(1, 25);
      u1.setAtt(2, "#98C694");
      u1.setAtt(3, ((100) / 100));
      u1.setAtt(4, -25);
      u1.setAtt(5, ((5) / 100));
      pushAttribute_$_$(5, u1.atts[1].value);
      u1.refreshOutModel();
      popAttribute(5);
      let lvl_$ = u1.refreshChange();
      _level = max(_level, lvl_$);
      return _level;
    }
  }
  static GuestNameWidget = class extends QEDObject {
    constructor(context__Call, Main$this) {
      super(context__Call);
      this.Main$this = Main$this;
      this.zipCode = "";
      this.alphaKeyboard = _bindHandler(new Main.AlphaKeyboardWidget(this, this.Main$this), this, this.handler$1);
      this.nextButton = _bindHandler(new QedTextButton("Next", this), this, this.handler$2);
      this.qedModel = null;
    }
    handler$1(_ret) {
      if (!this._isActive()) return;
      this.zipCode = _ret;
    }
    handler$2(_ret) {
      if (!this._isActive()) return;
      return post_(this, this.zipCode);
    }
    refresh_Model_() {
      if (!this.qedModel) {
        let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null)), new QEDExplicitArray());
        let u2 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(5, 0, 1, null), new Attr_(12, 0, 1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray());
        let u3 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 3, null), new Attr_(1, 1, -1, null), new Attr_(12, 0, 1, null), new Attr_(16, 0, 1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray(u2));
        let u4 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null)), new QEDExplicitArray());
        let u5 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null), new Attr_(5, 0, 1, null), new Attr_(6, 0, 1, null), new Attr_(16, 0, 1, null), new Attr_(12, 0, 1, null)), new QEDExplicitArray());
        let u6 = new Directive_(2, new QEDExplicitArray(), new QEDExplicitArray(u1, u3, u4, u5));
        let u7 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null), new Attr_(5, 0, 1, null), new Attr_(12, 0, 1, null), new Attr_(8, 0, 1, null), new Attr_(10, 0, 1, null), new Attr_(9, 0, 1, null)), new QEDExplicitArray());
        this.qedModel = new QEDExplicitArray(u6, u7);
      }

      let u2 = this.qedModel[0];
      u2.clearChange();
      let u6 = u2.children[0];
      u6.setAtt(0, 25);
      let u5 = u2.children[1];
      u5.setAtt(0, roundRect);
      u5.setAtt(1, new QEDExplicitArray(430, 40));
      u5.setAtt(2, "#B4CFFA");
      u5.setAtt(3, 20);
      u5.setAtt(4, ((50) / 100));
      let u7 = u5.children[0];
      u7.setAtt(0, (this.zipCode.length ? this.zipCode : "Enter the guest's family name"));
      u7.setAtt(1, 30);
      u7.setAtt(2, "#7D90AF");
      u7.setAtt(3, ((50) / 100));
      let u4 = u2.children[2];
      u4.setAtt(0, 25);
      let u3 = u2.children[3];
      u3.setAtt(0, this.alphaKeyboard);
      u3.setAtt(1, 30);
      u3.setAtt(2, 10);
      u3.setAtt(3, 6);
      u3.setAtt(4, "#7D90AF");
      pushAttribute_$_$(5, u3.atts[1].value);
      pushAttribute_$_$(6, u3.atts[2].value);
      u3.refreshOutModel();
      popAttribute(6);
      popAttribute(5);
      let lvl = u2.refreshChange();
      let _level = lvl;
      let u1 = this.qedModel[1];
      u1.clearChange();
      u1.setAtt(0, this.nextButton);
      u1.setAtt(1, 25);
      u1.setAtt(2, "#98C694");
      u1.setAtt(3, ((100) / 100));
      u1.setAtt(4, -25);
      u1.setAtt(5, ((5) / 100));
      pushAttribute_$_$(5, u1.atts[1].value);
      u1.refreshOutModel();
      popAttribute(5);
      let lvl_$ = u1.refreshChange();
      _level = max(_level, lvl_$);
      return _level;
    }
  }
  static Widget = class extends QEDObject {
    constructor(context__Call, Main$this) {
      super(context__Call);
      this.Main$this = Main$this;
      this.qedModel = null;
    }
    refresh_Model_() {
      if (!this.qedModel) {
        let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null)), new QEDExplicitArray());
        this.qedModel = new QEDExplicitArray(u1);
      }

      let u1 = this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, "");
      let lvl = u1.refreshChange();
      let _level = lvl;
      return _level;
    }
  }
  static TransactionEntry = class extends QEDObject {
    constructor(context__Call, Main$this) {
      super(context__Call);
      this.Main$this = Main$this;
      this.numTacos = 0;
      this.tacoPrice = 3.050000;
      this.guestName = "";
      this.roomNumber = "";
    }
    getPrice() {
      return (this.Main$this.formatMoney(this.tacoPrice));
    }
    getTotal() {
      return (this.Main$this.formatMoney(this.numTacos * this.tacoPrice));
    }
  }
  static SummaryWidget = class extends QEDObject {
    constructor(entry, context__Call, Main$this) {
      super(context__Call);
      this.entry = entry;
      this.Main$this = Main$this;
      this.nextButton = _bindHandler(new QedTextButton("Confirm", this), this, this.handler$1);
      this.qedModel = null;
    }
    handler$1(_ret) {
      if (!this._isActive()) return;
      return post_(this, null);
    }
    refresh_Model_() {
      if (!this.qedModel) {
        let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 3, null), new Attr_(9, 0, 1, null), new Attr_(12, 0, 1, null)), new QEDExplicitArray());
        let u2 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null)), new QEDExplicitArray());
        let u3 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null)), new QEDExplicitArray());
        let u4 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null)), new QEDExplicitArray());
        let u5 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null)), new QEDExplicitArray());
        let u6 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null)), new QEDExplicitArray());
        let u7 = new Directive_(2, new QEDExplicitArray(), new QEDExplicitArray(u2, u3, u4, u5, u6));
        let u8 = new Directive_(0, new QEDExplicitArray(), new QEDExplicitArray(u1, u7));
        let u9 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 3, null), new Attr_(9, 0, 1, null), new Attr_(12, 0, 1, null)), new QEDExplicitArray());
        let u10 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray());
        let u11 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray());
        let u12 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray());
        let u13 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray());
        let u14 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray());
        let u15 = new Directive_(2, new QEDExplicitArray(), new QEDExplicitArray(u10, u11, u12, u13, u14));
        let u16 = new Directive_(0, new QEDExplicitArray(), new QEDExplicitArray(u9, u15));
        let u17 = new Directive_(1, new QEDExplicitArray(new Attr_(8, 0, 1, null), new Attr_(5, 0, 1, null), new Attr_(12, 0, 1, null)), new QEDExplicitArray(u8, u16));
        let u18 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null), new Attr_(5, 0, 1, null), new Attr_(12, 0, 1, null), new Attr_(8, 0, 1, null), new Attr_(10, 0, 1, null), new Attr_(9, 0, 1, null)), new QEDExplicitArray());
        this.qedModel = new QEDExplicitArray(u17, u18);
      }

      let u2 = this.qedModel[0];
      u2.clearChange();
      u2.setAtt(0, ((50) / 100));
      u2.setAtt(1, 30);
      u2.setAtt(2, "white");
      pushAttribute_$_$(5, u2.atts[1].value);
      let u4 = u2.children[0];
      let u6 = u4.children[0];
      u6.setAtt(0, rect);
      u6.setAtt(1, ((100) / 100));
      u6.setAtt(2, "#97726F");
      let u5 = u4.children[1];
      let u11 = u5.children[0];
      u11.setAtt(0, "Guest: ");
      let u10 = u5.children[1];
      u10.setAtt(0, "Room: ");
      let u9 = u5.children[2];
      u9.setAtt(0, "Number of tacos: ");
      let u8 = u5.children[3];
      u8.setAtt(0, "Taco price: ");
      let u7 = u5.children[4];
      u7.setAtt(0, "Total Price: ");
      let u3 = u2.children[1];
      let u13 = u3.children[0];
      u13.setAtt(0, rect);
      u13.setAtt(1, ((100) / 100));
      u13.setAtt(2, "#AC837F");
      let u12 = u3.children[1];
      let u18 = u12.children[0];
      u18.setAtt(0, this.entry.guestName);
      u18.setAtt(1, ((100) / 100));
      let u17 = u12.children[1];
      u17.setAtt(0, this.entry.roomNumber);
      u17.setAtt(1, ((100) / 100));
      let u16 = u12.children[2];
      u16.setAtt(0, this.entry.numTacos);
      u16.setAtt(1, ((100) / 100));
      let u15 = u12.children[3];
      u15.setAtt(0, this.entry.getPrice());
      u15.setAtt(1, ((100) / 100));
      let u14 = u12.children[4];
      u14.setAtt(0, this.entry.getTotal());
      u14.setAtt(1, ((100) / 100));
      popAttribute(5);
      let lvl = u2.refreshChange();
      let _level = lvl;
      let u1 = this.qedModel[1];
      u1.clearChange();
      u1.setAtt(0, this.nextButton);
      u1.setAtt(1, 25);
      u1.setAtt(2, "#98C694");
      u1.setAtt(3, ((100) / 100));
      u1.setAtt(4, -25);
      u1.setAtt(5, ((5) / 100));
      pushAttribute_$_$(5, u1.atts[1].value);
      u1.refreshOutModel();
      popAttribute(5);
      let lvl_$ = u1.refreshChange();
      _level = max(_level, lvl_$);
      return _level;
    }
  }
  static GetTransactionEntry = class extends QEDObject {
    constructor(entry, context__Call, Main$this) {
      super(context__Call);
      this.entry = entry;
      this.Main$this = Main$this;
      this.oldIndex = 0;
      this.paneIndex = 0;
      this.maxIndex = this.paneIndex;
      this.bounds = new QEDExplicitArray(0, 0, 0, 0);
      this.ntw = _bindHandler(new Main.NumTacosWidget(this, this.Main$this), this, this.handler$1);
      this.room = _bindHandler(new Main.RoomNumberWidget(this, this.Main$this), this, this.handler$2);
      this.guest = _bindHandler(new Main.GuestNameWidget(this, this.Main$this), this, this.handler$3);
      this.summary = _bindHandler(new Main.SummaryWidget(this.entry, this, this.Main$this), this, this.handler$4);
      this.panes = new QEDExplicitArray(new Main.GetTransactionEntry.Pane("Count", this.ntw, this, this, this.Main$this), new Main.GetTransactionEntry.Pane("Room", this.room, this, this, this.Main$this), new Main.GetTransactionEntry.Pane("Guest", this.guest, this, this, this.Main$this), new Main.GetTransactionEntry.Pane("Summary", this.summary, this, this, this.Main$this));
      this.titles = this.group$6();
      this.Main$this.exitHandler[0] = _bindHandler(new QedYield(this), this, this.handler$7);
      this._qedSetBlockingCall(_bindHandler(new Main.GetTransactionEntry.SetPane(0, this.context__Call, this, this.Main$this), this, this.cont$15));
    }
    static Pane = class extends QEDObject {
      constructor(title, widget, context__Call, GetTransactionEntry$this, Main$this) {
        super(context__Call);
        this.title = title;
        this.widget = widget;
        this.GetTransactionEntry$this = GetTransactionEntry$this;
        this.Main$this = Main$this;
        this.qedModel = null;
      }
      refresh_Model_() {
        if (!this.qedModel) {
          let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null)), new QEDExplicitArray());
          this.qedModel = new QEDExplicitArray(u1);
        }

        let u1 = this.qedModel[0];
        u1.clearChange();
        u1.setAtt(0, this.widget);
        u1.refreshOutModel();
        let lvl = u1.refreshChange();
        let _level = lvl;
        return _level;
      }
    }
    static TabLabel = class extends QEDObject {
      constructor(pane, context__Call, GetTransactionEntry$this, Main$this) {
        super(context__Call);
        this.pane = pane;
        this.GetTransactionEntry$this = GetTransactionEntry$this;
        this.Main$this = Main$this;
        this.text = "    " + (this.pane + 1) + "." + this.GetTransactionEntry$this.panes[this.pane].title + "    ";
        this.button = _bindHandler(new QedGenericButton(this.group$1(), this), this, this.handler$2);
        this.qedModel = null;
      }
      group$1() {
        class L extends QEDObject {
          constructor(pressed, context__Call, TabLabel$this, GetTransactionEntry$this, Main$this) {
            super(context__Call);
            this.pressed = pressed;
            this.TabLabel$this = TabLabel$this;
            this.GetTransactionEntry$this = GetTransactionEntry$this;
            this.Main$this = Main$this;
            this.qedModel = null;
          }
          refresh_Model_() {
            if (!this.qedModel) {
              let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(15, 0, 1, null)), new QEDExplicitArray());
              this.qedModel = new QEDExplicitArray(u1);
            }

            let u1 = this.qedModel[0];
            u1.clearChange();
            u1.setAtt(0, this.TabLabel$this.text);
            u1.setAtt(1, (this.TabLabel$this.pane > this.GetTransactionEntry$this.maxIndex ? ((50) / 100) : (this.pressed[0] ? ((35) / 100) : ((100) / 100))));
            let lvl = u1.refreshChange();
            let _level = lvl;
            return _level;
          }
        }
        return (function(pressed, context__Call) {
          return new L(pressed, context__Call, this, this.GetTransactionEntry$this, this.Main$this);
        }.bind(this));
      }
      handler$2() {
        if (!this._isActive()) return;
        if (this.pane <= this.GetTransactionEntry$this.maxIndex)
          return post_(this, null);

      }
      refresh_Model_() {
        if (!this.qedModel) {
          let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null)), new QEDExplicitArray());
          this.qedModel = new QEDExplicitArray(u1);
        }

        let u1 = this.qedModel[0];
        u1.clearChange();
        u1.setAtt(0, this.button);
        u1.refreshOutModel();
        let lvl = u1.refreshChange();
        let _level = lvl;
        return _level;
      }
    }
    static NextPane = class extends QEDObject {
      constructor(context__Call, GetTransactionEntry$this, Main$this) {
        super(context__Call);
        this.GetTransactionEntry$this = GetTransactionEntry$this;
        this.Main$this = Main$this;
        this._qedSetBlockingCall(_bindHandler(new Main.GetTransactionEntry.SetPane(this.GetTransactionEntry$this.paneIndex + 1, this.context__Call, this.GetTransactionEntry$this, this.Main$this), this, this.cont$2));
      }
      cont$2() {
        if (!this._isActive()) return;
        this._qedEndCall();
        return post_(this, null);
      }
    }
    static SetPane = class extends QEDObject {
      constructor(index, context__Call, GetTransactionEntry$this, Main$this) {
        super(context__Call);
        this.index = index;
        this.GetTransactionEntry$this = GetTransactionEntry$this;
        this.Main$this = Main$this;
        this.GetTransactionEntry$this.bounds = getBounds(new QEDExplicitArray("application", "titles"), new QEDExplicitArray(this.index));
        this.GetTransactionEntry$this.paneIndex = this.index;
        this.GetTransactionEntry$this.maxIndex = max(this.GetTransactionEntry$this.maxIndex, this.GetTransactionEntry$this.paneIndex);
        return post_(this, null);
      }
    }
    handler$1(_ret) {
      if (!this._isActive()) return;
      const cont$9 = function() {
        if (!this._isActive()) return;
        this._qedEndCall();
      }.bind(this);
      this.entry.numTacos = _ret;
      this._qedSetBlockingCall(_bindHandler(new Main.GetTransactionEntry.NextPane(this.context__Call, this, this.Main$this), this, cont$9));
    }
    handler$2(_ret) {
      if (!this._isActive()) return;
      const cont$11 = function() {
        if (!this._isActive()) return;
        this._qedEndCall();
      }.bind(this);
      this.entry.roomNumber = _ret;
      this._qedSetBlockingCall(_bindHandler(new Main.GetTransactionEntry.NextPane(this.context__Call, this, this.Main$this), this, cont$11));
    }
    handler$3(_ret) {
      if (!this._isActive()) return;
      const cont$13 = function() {
        if (!this._isActive()) return;
        this._qedEndCall();
      }.bind(this);
      this.entry.guestName = _ret;
      this._qedSetBlockingCall(_bindHandler(new Main.GetTransactionEntry.NextPane(this.context__Call, this, this.Main$this), this, cont$13));
    }
    handler$4() {
      if (!this._isActive()) return;
      this.Main$this.exitHandler.pop();
      return post_(this, true);
    }
    arrayElement$5(pos) {
      const handler$1 = function() {
        if (!this._isActive()) return;
        const cont$3 = function() {
          if (!this._isActive()) return;
          this._qedEndCall();
        }.bind(this);
        this._qedSetBlockingCall(_bindHandler(new Main.GetTransactionEntry.SetPane(pane, this.context__Call, this, this.Main$this), this, cont$3));
      }.bind(this);
      let pane = pos[0];
      return (_bindHandler((new Main.GetTransactionEntry.TabLabel(pane, this, this, this.Main$this)), this, handler$1));
    }
    group$6() {
      let _d0 = this.panes.size();
      return (new QEDArray(this.arrayElement$5.bind(this), 1, new QEDExplicitArray(1, 0), function(array, dims, context__Call) {
        return new Qui_(array, dims);
      }.bind(this)).insert(new QEDExplicitArray(0), new QEDExplicitArray(_d0)));
    }
    handler$7(_ret) {
      if (!this._isActive()) return;
      this.Main$this.exitHandler.pop();
      return post_(this, false);
    }
    refresh_Model_() {
      if (!this.qedModel) {
        let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 3, null), new Attr_(10, 1, -1, null), new Attr_(1, 1, -1, null), new Attr_(12, 0, 1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray());
        let u2 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 1, 0, null), new Attr_(12, 0, 1, null), new Attr_(5, 0, 1, null), new Attr_(2, 0, 1, null)), new QEDExplicitArray());
        let u3 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null), new Attr_(9, 0, 1, null)), new QEDExplicitArray());
        let u4 = new Directive_(2, new QEDExplicitArray(), new QEDExplicitArray(u2, u3));
        this.qedModel = new QEDExplicitArray(u1, u4);
      }

      let u2 = this.qedModel[0];
      u2.clearChange();
      u2.setAtt(0, this.Main$this.displaySlider.bind(this));
      u2.setAtt(1, new QEDExplicitArray(this.bounds[0], -1));
      u2.setAtt(2, new QEDExplicitArray(this.bounds[2], this.bounds[3] + 1));
      u2.setAtt(3, "#BEB8B0");
      u2.setAtt(4, 0);
      let lvl = u2.refreshChange();
      let _level = lvl;
      let u1 = this.qedModel[1];
      u1.clearChange();
      let u4 = u1.children[0];
      u4.setAtt(0, this.titles);
      u4.setAtt(1, "#77736E");
      u4.setAtt(2, 20);
      u4.setAtt(3, "titles");
      pushAttribute_$_$(5, u4.atts[2].value);
      u4.refreshOutModel();
      popAttribute(5);
      let u3 = u1.children[1];
      u3.setAtt(0, this.panes[this.paneIndex]);
      u3.setAtt(1, ((100) / 100));
      u3.refreshOutModel();
      let lvl_$ = u1.refreshChange();
      _level = max(_level, lvl_$);
      return _level;
    }
    cont$15() {
      if (!this._isActive()) return;
      this._qedEndCall();
      this.qedModel = null;
    }
  }
  static OrderTacos = class extends QEDObject {
    constructor(transactionEntry, context__Call, Main$this) {
      super(context__Call);
      this.transactionEntry = transactionEntry;
      this.Main$this = Main$this;
      this.spinner = new Main.SpinnerWidget(this, this.Main$this);
      this._qedSetBlockingCall(_bindHandler(new QedTimer(5000, this.context__Call), this, this.cont$2));
    }
    refresh_Model_() {
      if (!this.qedModel) {
        let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray());
        let u2 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null)), new QEDExplicitArray());
        let u3 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray());
        let u4 = new Directive_(2, new QEDExplicitArray(new Attr_(12, 0, 1, null), new Attr_(15, 0, 1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray(u1, u2, u3));
        this.qedModel = new QEDExplicitArray(u4);
      }

      let u1 = this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, "black");
      u1.setAtt(1, ((60) / 100));
      u1.setAtt(2, ((50) / 100));
      let u4 = u1.children[0];
      u4.setAtt(0, this.spinner);
      u4.setAtt(1, ((50) / 100));
      u4.refreshOutModel();
      let u3 = u1.children[1];
      u3.setAtt(0, 25);
      let u2 = u1.children[2];
      u2.setAtt(0, "Ordering tacos... please wait.");
      u2.setAtt(1, ((50) / 100));
      let lvl = u1.refreshChange();
      let _level = lvl;
      return _level;
    }
    cont$2(_ret$1) {
      if (!this._isActive()) return;
      this._qedEndCall();
      return post_(this, true);
      this.qedModel = null;
    }
  }
  static DisplaySuccess = class extends QEDObject {
    constructor(total, context__Call, Main$this) {
      super(context__Call);
      this.total = total;
      this.Main$this = Main$this;
      this._qedSetBlockingCall(_bindHandler(new QedTimer(5000, this.context__Call), this, this.cont$2));
    }
    refresh_Model_() {
      if (!this.qedModel) {
        let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray());
        let u2 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null)), new QEDExplicitArray());
        let u3 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray());
        let u4 = new Directive_(2, new QEDExplicitArray(new Attr_(12, 0, 1, null), new Attr_(15, 0, 1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray(u1, u2, u3));
        this.qedModel = new QEDExplicitArray(u4);
      }

      let u1 = this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, "black");
      u1.setAtt(1, ((60) / 100));
      u1.setAtt(2, ((50) / 100));
      let u4 = u1.children[0];
      u4.setAtt(0, "A total of " + this.total + " has been added to your hotel invoice.");
      u4.setAtt(1, ((50) / 100));
      let u3 = u1.children[1];
      u3.setAtt(0, 25);
      let u2 = u1.children[2];
      u2.setAtt(0, "Thank you for choosing the Taco Hotel for your stay.");
      u2.setAtt(1, ((50) / 100));
      let lvl = u1.refreshChange();
      let _level = lvl;
      return _level;
    }
    cont$2(_ret$1) {
      if (!this._isActive()) return;
      this._qedEndCall();
      return post_(this, null);
      this.qedModel = null;
    }
  }
  static MainScreen = class extends QEDObject {
    constructor(context__Call, Main$this) {
      super(context__Call);
      this.Main$this = Main$this;
      this.buyTacosButton = _bindHandler(new Main.ObjectOverTextButton(this.Main$this.showTwoTacos.bind(this.Main$this), "Order tacos!!", this, this.Main$this), this, this.handler$1);
      this.roomServiceButton = _bindHandler(new Main.ObjectBeforeTextButton(this.Main$this.displaySlider.bind(this.Main$this), "Room service", this, this.Main$this), this, this.handler$2);
      this.moreTowelsButton = _bindHandler(new Main.ObjectBeforeTextButton(this.Main$this.displaySlider.bind(this.Main$this), "Late checkout", this, this.Main$this), this, this.handler$3);
      this.qedModel = null;
    }
    handler$1() {
      if (!this._isActive()) return;
      return post_(this, 1);
    }
    handler$2() {
      if (!this._isActive()) return;
      return post_(this, 2);
    }
    handler$3() {
      if (!this._isActive()) return;
      return post_(this, 3);
    }
    refresh_Model_() {
      if (!this.qedModel) {
        let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null)), new QEDExplicitArray());
        let u2 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null), new Attr_(9, 0, 1, null)), new QEDExplicitArray());
        let u3 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null)), new QEDExplicitArray());
        let u4 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null), new Attr_(9, 0, 1, null)), new QEDExplicitArray());
        let u5 = new Directive_(2, new QEDExplicitArray(new Attr_(5, 0, 1, null), new Attr_(9, 0, 1, null)), new QEDExplicitArray(u2, u3, u4));
        let u6 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null)), new QEDExplicitArray());
        let u7 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null), new Attr_(5, 0, 1, null), new Attr_(9, 0, 1, null)), new QEDExplicitArray());
        let u8 = new Directive_(1, new QEDExplicitArray(new Attr_(9, 0, 1, null), new Attr_(16, 0, 1, null)), new QEDExplicitArray(u5, u6, u7));
        let u9 = new Directive_(0, new QEDExplicitArray(new Attr_(1, 0, 1, null)), new QEDExplicitArray());
        let u10 = new Directive_(3, new QEDExplicitArray(new Attr_(12, 0, 1, null)), new QEDExplicitArray(u1, u8, u9));
        this.qedModel = new QEDExplicitArray(u10);
      }

      let u1 = this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, "#7CB0C7");
      let u4 = u1.children[0];
      u4.setAtt(0, 15);
      let u3 = u1.children[1];
      u3.setAtt(0, ((100) / 100));
      u3.setAtt(1, 10);
      let u7 = u3.children[0];
      u7.setAtt(0, 20);
      u7.setAtt(1, ((100) / 100));
      pushAttribute_$_$(5, u7.atts[0].value);
      let u10 = u7.children[0];
      u10.setAtt(0, this.roomServiceButton);
      u10.setAtt(1, ((100) / 100));
      u10.refreshOutModel();
      let u9 = u7.children[1];
      u9.setAtt(0, 15);
      let u8 = u7.children[2];
      u8.setAtt(0, this.moreTowelsButton);
      u8.setAtt(1, ((100) / 100));
      u8.refreshOutModel();
      popAttribute(5);
      let u6 = u3.children[1];
      u6.setAtt(0, 15);
      let u5 = u3.children[2];
      u5.setAtt(0, this.buyTacosButton);
      u5.setAtt(1, 30);
      u5.setAtt(2, ((100) / 100));
      pushAttribute_$_$(5, u5.atts[1].value);
      u5.refreshOutModel();
      popAttribute(5);
      let u2 = u1.children[2];
      u2.setAtt(0, 15);
      let lvl = u1.refreshChange();
      let _level = lvl;
      return _level;
    }
  }
  static Application = class extends QEDObject {
    constructor(context__Call, Main$this) {
      super(context__Call);
      this.Main$this = Main$this;
      this.while$21();
    }
    u$1() {
      0;
    }
    u$2() {
      0;
    }
    refresh_Model_() {
      if (!this.qedModel) {
        let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(9, 0, 1, null), new Attr_(-1, 0, -1, this.u$1.bind(this)), new Attr_(-2, 0, -1, this.u$2.bind(this))), new QEDExplicitArray());
        this.qedModel = new QEDExplicitArray(u1);
      }

      let u1 = this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, "");
      u1.setAtt(1, ((100) / 100));
      let lvl = u1.refreshChange();
      let _level = lvl;
      return _level;
    }
    static Group$19 = class extends QEDObject {
      constructor(context__Call, Application$this, Main$this) {
        super(context__Call);
        this.Application$this = Application$this;
        this.Main$this = Main$this;
        this._qedSetBlockingCall(_bindHandler(new Main.MainScreen(this.context__Call, this.Main$this), this, this.cont$4));
      }
      cont$4(_ret$3) {
        if (!this._isActive()) return;
        this._qedEndCall();
        class Group$15 extends QEDObject {
          constructor(context__Call, Group$19$this, Application$this, Main$this) {
            super(context__Call);
            this.Group$19$this = Group$19$this;
            this.Application$this = Application$this;
            this.Main$this = Main$this;
            this.entry = new Main.TransactionEntry(this, this.Main$this);
            this._qedSetBlockingCall(_bindHandler(new Main.GetTransactionEntry(this.entry, this.context__Call, this.Main$this), this, this.cont$6));
          }
          cont$6(_ret$5) {
            if (!this._isActive()) return;
            this._qedEndCall();
            const cont$8 = function(_ret$7) {
              if (!this._isActive()) return;
              this._qedEndCall();
              const cont$10 = function() {
                if (!this._isActive()) return;
                this._qedEndCall();
                endIf$11();
              }.bind(this);
              const endIf$11 = function() {
                endIf$13();
              }.bind(this);
              if (_ret$7)
                this._qedSetBlockingCall(_bindHandler(new Main.DisplaySuccess(this.entry.getTotal(), this.context__Call, this.Main$this), this, cont$10));
              else {
                endIf$11();
              }

            }.bind(this);
            const endIf$13 = function() {
              return post_(this, null);
            }.bind(this);
            if (_ret$5)
              this._qedSetBlockingCall(_bindHandler(new Main.OrderTacos(this.entry, this.context__Call, this.Main$this), this, cont$8));
            else
              endIf$13();

          }
        }
        const cont$16 = function() {
          if (!this._isActive()) return;
          this._qedEndCall();
          endIf$17();
        }.bind(this);
        const endIf$17 = function() {
          return post_(this, null);
        }.bind(this);
        this.choice = _ret$3;
        if (this.choice === 1)
          this._qedSetBlockingCall(_bindHandler(new Group$15(this.context__Call, this, this.Application$this, this.Main$this), this, cont$16));
        else {
          if (this.choice === 2) {
          }
          else {
          }

          endIf$17();
        }

      }
    }
    cont$20() {
      if (!this._isActive()) return;
      this._qedEndCall();
      this.while$21();
    }
    while$21() {
      if (true)
        this._qedSetBlockingCall(_bindHandler(new Main.Application.Group$19(this.context__Call, this, this.Main$this), this, this.cont$20));
      else {
        this.qedModel = null;
      }

    }
  }
  handler$1(_ret) {
    if (!this._isActive()) return;
    qedResume(this.exitHandler[0]);
  }
  refresh_Model_() {
    if (!this.qedModel) {
      let u1 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(5, 0, 1, null), new Attr_(12, 0, 1, null), new Attr_(8, 1, -1, null), new Attr_(10, 1, -1, null)), new QEDExplicitArray());
      let u2 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 1, null), new Attr_(5, 0, 1, null), new Attr_(12, 0, 1, null), new Attr_(8, 0, 1, null)), new QEDExplicitArray());
      let u3 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null), new Attr_(12, 0, 1, null), new Attr_(8, 1, -1, null), new Attr_(10, 1, -1, null), new Attr_(9, 1, -1, null)), new QEDExplicitArray());
      let u4 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 3, null), new Attr_(1, 1, -1, null), new Attr_(12, 0, 1, null), new Attr_(9, 1, -1, null)), new QEDExplicitArray(u1, u2, u3));
      let u5 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 3, null), new Attr_(12, 0, 1, null)), new QEDExplicitArray());
      let u6 = new Directive_(0, new QEDExplicitArray(new Attr_(0, 0, 0, null), new Attr_(2, 0, 1, null), new Attr_(12, 0, 1, null)), new QEDExplicitArray());
      let u7 = new Directive_(0, new QEDExplicitArray(new Attr_(9, 0, 1, null)), new QEDExplicitArray(u5, u6));
      let u8 = new Directive_(2, new QEDExplicitArray(new Attr_(1, 1, -1, null)), new QEDExplicitArray(u4, u7));
      this.qedModel = new QEDExplicitArray(u8);
    }

    let u1 = this.qedModel[0];
    u1.clearChange();
    u1.setAtt(0, new QEDExplicitArray(800, 480));
    let u3 = u1.children[0];
    u3.setAtt(0, rect);
    u3.setAtt(1, new QEDExplicitArray(0, 60));
    u3.setAtt(2, "#BEB8B0");
    u3.setAtt(3, new QEDExplicitArray(((100) / 100), 0));
    let u6 = u3.children[0];
    u6.setAtt(0, this.getTimestamp());
    u6.setAtt(1, 30);
    u6.setAtt(2, "#77736E");
    u6.setAtt(3, new QEDExplicitArray(((0) / 100), ((50) / 100)));
    u6.setAtt(4, new QEDExplicitArray(15, 0));
    let u5 = u3.children[1];
    u5.setAtt(0, "Taco Hotel");
    u5.setAtt(1, 35);
    u5.setAtt(2, "#77736E");
    u5.setAtt(3, ((50) / 100));
    let u4 = u3.children[2];
    u4.setAtt(0, (this.exitHandler.size() ? this.exit : this.emptyWidget));
    u4.setAtt(1, "#973543");
    u4.setAtt(2, new QEDExplicitArray(((100) / 100), ((50) / 100)));
    u4.setAtt(3, new QEDExplicitArray(-15, 0));
    u4.setAtt(4, new QEDExplicitArray(((10) / 100), ((50) / 100)));
    u4.refreshOutModel();
    let u2 = u1.children[1];
    u2.setAtt(0, ((100) / 100));
    let u8 = u2.children[0];
    u8.setAtt(0, rect);
    u8.setAtt(1, "#EEE6DD");
    let u7 = u2.children[1];
    u7.setAtt(0, this.application);
    u7.setAtt(1, "application");
    u7.setAtt(2, "#5F5C58");
    u7.refreshOutModel();
    let lvl = u1.refreshChange();
    let _level = lvl;
    return _level;
  }
}