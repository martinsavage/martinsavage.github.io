"use strict";
const Main_$this = this;
class QEDObject {
  blocking__Call = null;
  active = true;

  constructor(context__Call) {
    this.context__Call = context__Call;
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
      this.blocking__Call = null;
    }
  }

  _isActive() {
    return this.active && (!this.context__Call || this.context__Call._isActive());
  }

  _refreshModels() {
    let level = this.refresh_Model_ ? this.refresh_Model_() : 0;

    if (this.blocking__Call)
      level = Math.max(level, this.blocking__Call._refreshModels());

    return level;
  }
}

class QEDBasicArray extends Array {
  constructor() {
    super();
  }

  _refreshModels = function() {
    let level = 0;

    for (let index = 0; index < this.length; index++)
      level = Math.max(level, this[index]._refreshModels());

    return level;
  }
}

var canvas = document.getElementById("canvas");
let postHandler = null;
let attributeStacks = [];
let ctx = canvas.getContext("2d");
const pointerSupported = !!window.PointerEvent

canvas.addEventListener(pointerSupported ? "pointerdown" : "mouseDown", function(ev) {
  var rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  const canvasX = mouseX * canvas.width / canvas.clientWidth;
  const canvasY = mouseY * canvas.height / canvas.clientHeight;

  Main_$this.onGlobalEvent(0, [canvasX, canvasY]);
});
canvas.addEventListener(pointerSupported ? "pointerup" : "mouseUp", function(ev) {
  var rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  const canvasX = mouseX * canvas.width / canvas.clientWidth;
  const canvasY = mouseY * canvas.height / canvas.clientHeight;

  Main_$this.onGlobalEvent(1, [canvasX, canvasY]);
});
if (pointerSupported)
  canvas.addEventListener("pointercancel", function(ev) {
    var rect = canvas.getBoundingClientRect();
    Main_$this.onGlobalEvent(1, [ev.clientX - rect.left, ev.clientY - rect.top]);
  });
canvas.onselectstart = function () { return false; };
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
    padString = String(padString || ' ');
    if (this.length > targetLength) {
        return String(this);
    } else {
        targetLength = targetLength - this.length;
        if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
        }
        return padString.slice(0, targetLength) + String(this);
    }
}
}

let _currentRadius = 3.0;
let _strokeFlag = false;
let _fillFlag = true;
let _lineFlag = false;
ctx.font = "20px 'Arial'";
ctx.fillStyle = "black";
ctx.strokeStyle = "black";
ctx.globalAlpha = 1.0;;
function _bindHandler(obj, handler) {
  obj._HandlerFn_ = handler;
  return obj;
}

function _qedCallback(obj, value) {
  if (obj._HandlerFn_) {
    obj._HandlerFn_(value);
    Main_$this.executeEvents_();
  }
};
this.voidHandler_ = function () {
};
this.VoidHandler_ = function () {
};
this.anyHandler_ = function (value) {
};
this.intHandler_ = function (value) {
};
this.floatHandler_ = function (value) {
};
this.boolHandler_ = function (value) {
};
this.stringHandler_ = function (value) {
};
this.QedYield = class QedYield extends QEDObject {
  constructor(context__Call) {
    super(context__Call);
    const QedYield$this = this;
    this.processFn = (function l () {
      QedYield$this.processFn = null;
    if (QedYield$this._HandlerFn_)
      QedYield$this._HandlerFn_(true);
    });
  }
};
this.qedResume = function (obj) {
  if (obj instanceof Array) {
    let size = obj.size();
    let oneItem = false;

    for (let index = 0; index < size; index++)
      oneItem |= this.qedResume(obj[index]);

    return oneItem;
  }
  else
    if (obj.blocking__Call)
      return this.qedResume(obj.blocking__Call)
    else
      if (obj.processFn) {
        obj.processFn();
        return true;
      }
      else
        return false;;
};
this.println = function (str) {
  console.log(str);
};
this.post_ = function (obj, ret) {
  if (postHandler != null)
    console.log("postHandler not null");

  postHandler = [obj, ret];
};
this.post__$ = function (handler) {
  if (postHandler != null)
    console.log("postHandler not null");

  postHandler = handler;
};
function _refresh (obj, x, y, width, height) {
  let level = obj._refreshModels();
//  console.log("" + refreshCount++ + "- Refresh Level: " + level);

  if (level) {
    ctx.globalAlpha = 1.0;

    if (level >= 2) {
      Main_$this.windows = _refreshViews(obj);

      if (Main_$this.windows.length) {
        width = Main_$this.windows[0].size[0];
        height = Main_$this.windows[0].size[1];
      }
      else
        width = height = 0;
    }

    if (!Main_$this.autoInit) {
      Main_$this.autoResize = canvas.width == 0 && canvas.height == 0;
      Main_$this.autoInit = true;
    }

    if (Main_$this.autoResize && (canvas.width != width || canvas.height != height)) {
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext("2d");
      ctx.font = "20px 'Arial'";
      ctx.fillStyle = "black";
      ctx.strokeStyle = "black";
      ctx.globalAlpha = 1.0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Main_$this.windows.length)
      Main_$this.windows[0].paint(x, y, canvas.width, canvas.height);
  }
;
};
this.getBounds = function (path, index) {
  return Main_$this.windows.length ? Main_$this.windows[0].getBoundsRect(path, index, 0, 0, canvas.width, canvas.height, 0, 0) : [];
};
this.executeEvents_ = function () {
  while (postHandler != null)
    if (postHandler instanceof Array) {
      const obj = postHandler[0];
      const ret = postHandler[1];
    
      postHandler = null;

      if (obj._HandlerFn_)
        obj._HandlerFn_(ret);
    } else {
      const handler = postHandler;
    
      postHandler = null;
      handler();
    }

  if (this.MainObj)
    _refresh(this.MainObj, 0, 0, canvas.width, canvas.height);
  else
    ctx.clearRect(0, 0, canvas.width, canvas.height);;
};
this.qedEqual = function (value1, value2) {
  let equal = value1 === value2;
    if (!equal && value1 instanceof Array && value2 instanceof Array) {
    equal = (value1.length == value2.length) && value1.every(function(element, index) {
        return Main_$this.qedEqual(element, value2[index]); 
    });
  };
  return (equal);
};
this.max = function (a, b) {
  return a > b ? a : b;
};
this.min = function (a, b) {
  return a < b ? a : b;
};
this.abs = function (a) {
  return Math.abs(a);
};
this.rand = function () {
  return Math.random();
};
this.trunc = function (n) {
  return Math.trunc(n);
};
this.clock = function () {
};
this.saveContext = function () {
  ctx.save();
  ctx.clip();;
};
this.restoreContext = function () {
  ctx.restore();
};
this.rotate = function (x, y, width, height, angle) {
  ctx.save();
  ctx.translate(x + width / 2, y + height / 2);
  ctx.rotate(angle);
};
this.qedDraw = function () {
  if (_fillFlag)
    ctx.fill();
  if (_strokeFlag && _lineFlag)
    ctx.stroke();
};
this.drawFn = function (x, y, width, height) {
};
this.oval = function (x, y, width, height) {
  ctx.beginPath();
  ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, 2*Math.PI);
  Main_$this.qedDraw();
};
this.rect = function (x, y, width, height) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  Main_$this.qedDraw();
};
this.roundRect = function (x, y, width, height) {
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
  Main_$this.qedDraw();
};
this.getAttribute = function (index) {
  return attributeStacks[index][attributeStacks[index].length - 1];
};
function _qedPushAttribute (index, value) {
  let oldValue;

  switch(index) {
    case Main_$this.QED_TAG_FONT:
      oldValue = ctx.font;
      ctx.font = value;
      break;

    case Main_$this.QED_TAG_FONT_SIZE:
      oldValue = [ctx.font, _fontSize];
      _fontSize = value;
      ctx.font = value + "px Arial";
      break;

    case Main_$this.QED_TAG_SPACING:
      oldValue = _spacing;
      _spacing = value;
      break;

    case Main_$this.QED_TAG_FILL_STYLE:
      oldValue = [_fillFlag, ctx.fillStyle];
      _fillFlag = value !== "none"

      if (_fillFlag)
        ctx.fillStyle = value;
      break;

    case Main_$this.QED_TAG_STROKE_STYLE:
      oldValue = [_strokeFlag, ctx.strokeStyle];
      _strokeFlag = value !== "none"

      if (_strokeFlag)
        ctx.strokeStyle = value;
      break;

    case Main_$this.QED_TAG_LINE_WIDTH:
      oldValue = [_lineFlag, ctx.lineWidth];
      _lineFlag = value !== "none"

      if (_lineFlag)
        ctx.lineWidth = value;
      break;

    case Main_$this.QED_TAG_OPACITY:
      oldValue = ctx.globalAlpha;
      ctx.globalAlpha = value;
      break;

    case Main_$this.QED_TAG_RADIUS:
      oldValue = _currentRadius;
      _currentRadius = value;
      break;

    case Main_$this.QED_TAG_ROTATION:
      break;
  }

  if (attributeStacks[index] == undefined)
    attributeStacks[index] = [];

  attributeStacks[index].push(oldValue);
};
this.pushAttribute = function (index, value) {
  _qedPushAttribute(index, value);
};
this.pushAttribute_$ = function (index, value) {
  _qedPushAttribute(index, value);
};
this.pushAttribute_$_$ = function (index, value) {
  _qedPushAttribute(index, value);
};
this.popAttribute = function (index) {
  const value = attributeStacks[index].pop();

  switch(index) {
    case Main_$this.QED_TAG_FONT:
      ctx.font = value;
      break;

    case Main_$this.QED_TAG_FONT_SIZE:
      _fontSize = value[1];
      ctx.font = value[0];
      break;

    case Main_$this.QED_TAG_SPACING:
      _spacing = value;
      break;

    case Main_$this.QED_TAG_FILL_STYLE:
      _fillFlag = value[0];

      if (_fillFlag)
        ctx.fillStyle = value[1];
      break;

    case Main_$this.QED_TAG_STROKE_STYLE:
      _strokeFlag = value[0];

      if (_strokeFlag)
        ctx.strokeStyle = value[1];
      break;

    case Main_$this.QED_TAG_LINE_WIDTH:
      _lineFlag = value[0]

      if (_lineFlag)
        ctx.lineWidth = value;
      break;

    case Main_$this.QED_TAG_OPACITY:
      ctx.globalAlpha = value;
      break;

    case Main_$this.QED_TAG_RADIUS:
      _currentRadius = value;
      break;

    case Main_$this.QED_TAG_ROTATION:
      break;
  };
};
this.getTextSize = function (text) {
  const textSize = ctx.measureText(text);
  const height = textSize.fontBoundingBoxAscent + textSize.fontBoundingBoxDescent;
  return [textSize.width, height];
};
this.displayText = function (text, x, y, width, height) {
  ctx.textBaseline = "top";
  ctx.fillText(text, x, y);
};
this.QedImage = class QedImage extends QEDObject {
  constructor(context__Call) {
    super(context__Call);
    const QedImage$this = this;
    this.img = new Image();
  }
};
this.getImageSize = function (image) {
  return [image.img.naturalWidth, image.img.naturalHeight];
};
this.displayImage = function (image, x, y, width, height) {
  if (image.img.complete && image.img.naturalWidth > 0)
  ctx.drawImage(image.img, x, y);
};
this.QedTimer = class QedTimer extends QEDObject {
  constructor(timeoutMillis, context__Call) {
    super(context__Call);
    this.timeoutMillis = timeoutMillis;
    const QedTimer$this = this;
    this.reset = function () {
    };
    setTimeout(function() {
    _qedCallback(QedTimer$this, true);
  }, timeoutMillis);
  }
};
this.Time = class Time extends QEDObject {
  constructor(Func, context__Call) {
    super(context__Call);
    this.Func = Func;
    const Time$this = this;
    console.time("Time");
  new Func(() => {
    console.timeEnd("Time");
    _qedCallback(Time$this, null);
  });
  }
};
this.time = function (func) {
    console.time("time");
  func();
  console.timeEnd("time");
};
this.QedAnimation = class QedAnimation extends QEDObject {
  constructor(context__Call) {
    super(context__Call);
    const QedAnimation$this = this;
    requestAnimationFrame((timeStampMs) => {
    _qedCallback(QedAnimation$this, timeStampMs);
  });
  }
};
this.QedButtonContent = class QedButtonContent extends QEDObject {
  constructor(pressed, context__Call) {
    super(context__Call);
    this.pressed = pressed;
    const QedButtonContent$this = this;
    this.refresh_Model_ = function () {
      if (!QedButtonContent$this.qedModel) {
        let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null)), new Main_$this.QEDExplicitArray());
        QedButtonContent$this.qedModel = new Main_$this.QEDExplicitArray(u1);
      }
      let u1 = QedButtonContent$this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, "");
      u1.refreshChange();
      let _level = u1.getChangeLevel();
      return _level;
    };
    this.qedModel = null;
  }
};
this.QedGenericButton = class QedGenericButton extends QEDObject {
  constructor(ContentFn, context__Call) {
    super(context__Call);
    this.ContentFn = ContentFn;
    const QedGenericButton$this = this;
    this.refresh_Model_ = function () {
      if (!QedGenericButton$this.qedModel) {
        let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null), new Main_$this.Attr_(-1, 0, -1, (function W1$_ () {
          {
            QedGenericButton$this.pressed[0] = true;
            _captureFocus();
          }
        })), new Main_$this.Attr_(-2, 0, -1, (function W2$_ () {
          {
            QedGenericButton$this.pressed[0] = false;
            _releaseFocus();
            {
              Main_$this.post_(QedGenericButton$this, null);
              return;
            }
          }
        }))), new Main_$this.QEDExplicitArray());
        QedGenericButton$this.qedModel = new Main_$this.QEDExplicitArray(u1);
      }
      let u1 = QedGenericButton$this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, QedGenericButton$this.content);
      u1.refreshSubModel();
      u1.refreshChange();
      let _level = u1.getChangeLevel();
      return _level;
    };
    this.pressed = new Main_$this.QEDExplicitArray(false);
    this.content = new this.ContentFn(this.pressed, QedGenericButton$this);
    this.qedModel = null;
  }
};
this.QedLinkButton = class QedLinkButton extends QEDObject {
  constructor(text, context__Call) {
    super(context__Call);
    this.text = text;
    const QedLinkButton$this = this;
    this.refresh_Model_ = function () {
      if (!QedLinkButton$this.qedModel) {
        let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null)), new Main_$this.QEDExplicitArray());
        QedLinkButton$this.qedModel = new Main_$this.QEDExplicitArray(u1);
      }
      let u1 = QedLinkButton$this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, QedLinkButton$this.button);
      u1.refreshSubModel();
      u1.refreshChange();
      let _level = u1.getChangeLevel();
      return _level;
    };
    this.button = _bindHandler(new Main_$this.QedGenericButton((class L  extends QEDObject {
      constructor(pressed, context__Call) {
        super(context__Call);
        this.pressed = pressed;
        const L$this = this;
        this.refresh_Model_ = function () {
          if (!L$this.qedModel) {
            let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(15, 0, 1, null)), new Main_$this.QEDExplicitArray());
            L$this.qedModel = new Main_$this.QEDExplicitArray(u1);
          }
          let u1 = L$this.qedModel[0];
          u1.clearChange();
          u1.setAtt(0, QedLinkButton$this.text);
          u1.setAtt(1, (L$this.pressed[0] ? ((35) / 100) : ((100) / 100)));
          u1.refreshChange();
          let _level = u1.getChangeLevel();
          return _level;
        };
        this.qedModel = null;
      }
    }), QedLinkButton$this), (function Lambda_ () {
      if (!QedLinkButton$this._isActive())
        return;
      {
        Main_$this.post_(QedLinkButton$this, QedLinkButton$this.text);
        return;
      }
    }));
    this.qedModel = null;
  }
};
this.QedRectButton = class QedRectButton extends QEDObject {
  constructor(ContentFn, context__Call) {
    super(context__Call);
    this.ContentFn = ContentFn;
    const QedRectButton$this = this;
    this.refresh_Model_ = function () {
      if (!QedRectButton$this.qedModel) {
        let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null)), new Main_$this.QEDExplicitArray());
        QedRectButton$this.qedModel = new Main_$this.QEDExplicitArray(u1);
      }
      let u1 = QedRectButton$this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, QedRectButton$this.button);
      u1.refreshSubModel();
      u1.refreshChange();
      let _level = u1.getChangeLevel();
      return _level;
    };
    this.content = new this.ContentFn();
    this.button = _bindHandler(new Main_$this.QedGenericButton((class L  extends QEDObject {
      constructor(pressed, context__Call) {
        super(context__Call);
        this.pressed = pressed;
        const L$this = this;
        this.refresh_Model_ = function () {
          if (!L$this.qedModel) {
            let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 3, null), new Main_$this.Attr_(15, 0, 1, null), new Main_$this.Attr_(12, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u2 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null)), new Main_$this.QEDExplicitArray());
            let u3 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 3, null)), new Main_$this.QEDExplicitArray(u1, u2));
            L$this.qedModel = new Main_$this.QEDExplicitArray(u3);
          }
          let u1 = L$this.qedModel[0];
          u1.clearChange();
          u1.setAtt(0, Main_$this.roundRect);
          let u3 = u1.children[0];
          u3.setAtt(0, Main_$this.rect);
          u3.setAtt(1, (L$this.pressed[0] ? ((35) / 100) : ((0) / 100)));
          u3.setAtt(2, "black");
          let u2 = u1.children[1];
          u2.setAtt(0, QedRectButton$this.content);
          u2.refreshSubModel();
          u1.refreshChange();
          let _level = u1.getChangeLevel();
          return _level;
        };
        this.qedModel = null;
      }
    }), QedRectButton$this), (function Lambda_ () {
      if (!QedRectButton$this._isActive())
        return;
      {
        Main_$this.post_(QedRectButton$this, null);
        return;
      }
    }));
    this.qedModel = null;
  }
};
this.QedTextButton = class QedTextButton extends QEDObject {
  constructor(text, context__Call) {
    super(context__Call);
    this.text = text;
    const QedTextButton$this = this;
    this.textStyle = function (style) {
      _textStyle = style;
      return (this);
    };
    this.textOpacity = function (opacity) {
      _textOpacity = opacity;
      return (this);
    };
    this.refresh_Model_ = function () {
      if (!QedTextButton$this.qedModel) {
        let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null)), new Main_$this.QEDExplicitArray());
        QedTextButton$this.qedModel = new Main_$this.QEDExplicitArray(u1);
      }
      let u1 = QedTextButton$this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, QedTextButton$this.button);
      u1.refreshSubModel();
      u1.refreshChange();
      let _level = u1.getChangeLevel();
      return _level;
    };
    let _textStyle = "white";
    let _textOpacity = 1;
    this.button = _bindHandler(new Main_$this.QedRectButton((class L  extends QEDObject {
      constructor(context__Call) {
        super(context__Call);
        const L$this = this;
        this.refresh_Model_ = function () {
          if (!L$this.qedModel) {
            let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null), new Main_$this.Attr_(9, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u2 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(12, 0, 1, null), new Main_$this.Attr_(15, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u3 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null), new Main_$this.Attr_(9, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u4 = new Main_$this.Directive_(3, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(9, 0, 1, null)), new Main_$this.QEDExplicitArray(u1, u2, u3));
            L$this.qedModel = new Main_$this.QEDExplicitArray(u4);
          }
          let u1 = L$this.qedModel[0];
          u1.clearChange();
          u1.setAtt(0, ((100) / 100));
          let u4 = u1.children[0];
          u4.setAtt(0, (_fontSize) * 0.200000);
          u4.setAtt(1, 1);
          let u3 = u1.children[1];
          u3.setAtt(0, QedTextButton$this.text);
          u3.setAtt(1, _textStyle);
          u3.setAtt(2, _textOpacity);
          let u2 = u1.children[2];
          u2.setAtt(0, (_fontSize) * 0.200000);
          u2.setAtt(1, 1);
          u1.refreshChange();
          let _level = u1.getChangeLevel();
          return _level;
        };
        this.qedModel = null;
      }
    }), QedTextButton$this), (function Lambda_ () {
      if (!QedTextButton$this._isActive())
        return;
      {
        Main_$this.post_(QedTextButton$this, QedTextButton$this.text);
        return;
      }
    }));
    this.qedModel = null;
  }
};
this.QEDBaseArray_ = function () {
  this.getNumDirs = function () {
    return (0);
  };
  this.getDirs = function (childDir) {
    return (new Main_$this.QEDExplicitArray(0, 0));
  };
  this.size = function () {
    return (0);
  };
  this.insert = function (pos, size) {
  };
  this.Insert = class Insert extends QEDObject {
    constructor(pos, size, context__Call) {
      super(context__Call);
      this.pos = pos;
      this.size = size;
      const Insert$this = this;
    }
  };
  this.push = function () {
  };
  this.Push = class Push extends QEDObject {
    constructor(context__Call) {
      super(context__Call);
      const Push$this = this;
    }
  };
  this.pop = function () {
  };
  this.get = function (pos) {
  };
  this.set = function (pos, value) {
  };
  this.get_$ = function (index) {
  };
  this.set_$ = function (index, value) {
  };
  this.refresh_Model_ = function () {
  };
  this.qedModel = null;
};
this.InitFn = class InitFn extends QEDObject {
  constructor(pos, context__Call) {
    super(context__Call);
    this.pos = pos;
    const InitFn$this = this;
  }
};
this.Qui_ = function (array, dims) {
  this.array = array;
  this.dims = dims;
};
this.SQEDArray = class SQEDArray extends QEDBasicArray {
  constructor(Init, numDim, dirs, Ui_) {
    super();
    this.Init = Init;
    this.numDim = numDim;
    this.dirs = dirs;
    this.Ui_ = Ui_;
    const SQEDArray$this = this;
    this.size = function () {
      let s = 1;
      {
        let index = this.dims.length - 1;
        while(index >= 0) {
          s *= this.dims[index];
          index--;
        }
      }
      return (s);
    };
    this.insert = function (pos, size) {
      return (null);
    };
    this.Insert = class Insert extends QEDObject {
      constructor(pos, size, context__Call) {
        super(context__Call);
        this.pos = pos;
        this.size = size;
        const Insert$this = this;
        this.newSize = [...this.size];
        {
          let index = SQEDArray$this.dims.length - 1;
          while(index >= 0) {
            this.newSize[index] += SQEDArray$this.dims[index];
            index--;
          }
        }
        Insert$this.blocking__Call = _bindHandler(new SQEDArray$this.InsertLevel(SQEDArray$this, SQEDArray$this.dims, this.pos, this.size, this.newSize, new Array(this.size.length).fill(0), 0, Insert$this.context__Call), (function Lambda_ () {
          if (!Insert$this._isActive())
            return;
          Insert$this._qedEndCall();
          SQEDArray$this.dims = Insert$this.newSize;
          {
            Main_$this.post_(Insert$this, this);
            return;
          }
        }));
      }
    };
    this.remove = function (pos, size) {
      let newSize = [...SQEDArray$this.dims];
      {
        let index = SQEDArray$this.dims.length - 1;
        while(index >= 0) {
          newSize[index] -= size[index];
          index--;
        }
      }
      SQEDArray$this.removeLevel(SQEDArray$this, SQEDArray$this.dims, pos, size, newSize, new Array(size.length).fill(0), 0);
      SQEDArray$this.dims = newSize;
      return (this);
    };
    this.InsertLevel = class InsertLevel extends QEDObject {
      constructor(array, dims, pos, size, newSize, pp, level, context__Call) {
        super(context__Call);
        this.array = array;
        this.dims = dims;
        this.pos = pos;
        this.size = size;
        this.newSize = newSize;
        this.pp = pp;
        this.level = level;
        const InsertLevel$this = this;
        new (function W29$_ (i21$_) {
          this.i21$_ = i21$_;
          if (InsertLevel$this.level < SQEDArray$this.dims.length - 1) {
            {
              pp[level] = 0;
              (function while22$_ () {
                if (pp[level] < pos[level]) {
                  InsertLevel$this.blocking__Call = _bindHandler(new SQEDArray$this.InsertLevel(array[pp[level]], InsertLevel$this.dims, InsertLevel$this.pos, InsertLevel$this.size, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1, InsertLevel$this.context__Call), (function Lambda_ () {
                    if (!InsertLevel$this._isActive())
                      return;
                    InsertLevel$this._qedEndCall();
                    pp[level]++;
                    while22$_();
                  }));
                }
                else {
                  if (InsertLevel$this.size[InsertLevel$this.level] !== 0) {
                    pp[level] = dims[level] - 1;
                    while(pp[level] >= pos[level]) {
                      array[pp[level] + InsertLevel$this.size[level]] = array[pp[level]];
                      pp[level]--;
                    }
                  }
                  {
                    pp[level] = pos[level];
                    (function while24$_ () {
                      if (pp[level] < pos[level] + InsertLevel$this.size[level]) {
                        array[pp[level]] = [];
                        InsertLevel$this.blocking__Call = _bindHandler(new SQEDArray$this.InsertLevel(array[pp[level]], new Array(InsertLevel$this.size.length).fill(0), new Array(InsertLevel$this.size.length).fill(0), InsertLevel$this.newSize, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1, InsertLevel$this.context__Call), (function Lambda_ () {
                          if (!InsertLevel$this._isActive())
                            return;
                          InsertLevel$this._qedEndCall();
                          pp[level]++;
                          while24$_();
                        }));
                      }
                      else {
                        pp[level] = pos[level] + InsertLevel$this.size[level];
                        (function while25$_ () {
                          if (pp[level] < newSize[level]) {
                            InsertLevel$this.blocking__Call = _bindHandler(new SQEDArray$this.InsertLevel(array[pp[level]], InsertLevel$this.dims, InsertLevel$this.pos, InsertLevel$this.size, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1, InsertLevel$this.context__Call), (function Lambda_ () {
                              if (!InsertLevel$this._isActive())
                                return;
                              InsertLevel$this._qedEndCall();
                              pp[level]++;
                              while25$_();
                            }));
                          }
                          else
                            i21$_();
                        })();
                      }
                    })();
                  }
                }
              })();
            }
          }
          else {
            if (InsertLevel$this.size[InsertLevel$this.level] !== 0) {
              pp[level] = dims[level] - 1;
              while(pp[level] >= pos[level]) {
                array[pp[level] + InsertLevel$this.size[level]] = array[pp[level]];
                pp[level]--;
              }
            }
            {
              pp[level] = pos[level];
              (function while27$_ () {
                if (pp[level] < pos[level] + InsertLevel$this.size[level]) {
                  InsertLevel$this.blocking__Call = _bindHandler(new SQEDArray$this.Init(InsertLevel$this.pp, InsertLevel$this.context__Call), (function Lambda_ (_ret) {
                    if (!InsertLevel$this._isActive())
                      return;
                    InsertLevel$this._qedEndCall();
                    array[pp[level]] = _ret;
                    pp[level]++;
                    while27$_();
                  }));
                }
                else
                  i21$_();
              })();
            }
          }
        })((function c28$_ () {
          {
            Main_$this.post_(InsertLevel$this, null);
            return;
          }
        }));
      }
    };
    this.removeLevel = function (array, dims, pos, size, newSize, pp, level) {
      if (level < SQEDArray$this.dims.length - 1) {
        {
          pp[level] = dims[level] - 1;
          while(pp[level] >= pos[level] + size[level]) {
            SQEDArray$this.removeLevel(array[pp[level]], dims, pos, size, newSize, pp, level + 1);
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
            SQEDArray$this.removeLevel(array[pp[level]], dims, pos, size, newSize, pp, level + 1);
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
    };
    this.push = function () {
      return (null);
    };
    this.Push = class Push extends QEDObject {
      constructor(context__Call) {
        super(context__Call);
        const Push$this = this;
        this.pos = new Array(SQEDArray$this.dims.length).fill(0);
        this.size = new Array(SQEDArray$this.dims.length).fill(0);
        this.pos[0] = SQEDArray$this.dims[0];
        this.size[0] = 1;
        Push$this.blocking__Call = _bindHandler(new SQEDArray$this.Insert(this.pos, this.size, Push$this.context__Call), (function Lambda_ (_ret) {
          if (!Push$this._isActive())
            return;
          Push$this._qedEndCall();
          {
            Main_$this.post_(Push$this, this);
            return;
          }
        }));
      }
    };
    this.pop = function () {
      let pos = new Array(SQEDArray$this.dims.length).fill(0);
      let size = new Array(SQEDArray$this.dims.length).fill(0);
      pos[0] = SQEDArray$this.dims[0] - 1;
      size[0] = 1;
      SQEDArray$this.remove(pos, size);
      return (this);
    };
    this.dims = new Array(numDim).fill(0);
    {
      Main_$this.post_(SQEDArray$this, SQEDArray$this);
      return;
    }
  }
};
this.VInitFn = class VInitFn extends QEDObject {
  constructor(pos, context__Call) {
    super(context__Call);
    this.pos = pos;
    const VInitFn$this = this;
  }
};
this.VSQEDArray = class VSQEDArray extends QEDBasicArray {
  constructor(Init, numDim) {
    super();
    this.Init = Init;
    this.numDim = numDim;
    const VSQEDArray$this = this;
    this.size = function () {
      let s = 1;
      {
        let index = this.dims.length - 1;
        while(index >= 0) {
          s *= this.dims[index];
          index--;
        }
      }
      return (s);
    };
    this.insert = function (pos, size) {
      return (null);
    };
    this.Insert = class Insert extends QEDObject {
      constructor(pos, size, context__Call) {
        super(context__Call);
        this.pos = pos;
        this.size = size;
        const Insert$this = this;
        this.newSize = [...this.size];
        {
          let index = VSQEDArray$this.dims.length - 1;
          while(index >= 0) {
            this.newSize[index] += VSQEDArray$this.dims[index];
            index--;
          }
        }
        Insert$this.blocking__Call = _bindHandler(new VSQEDArray$this.InsertLevel(VSQEDArray$this.dims, this.pos, this.size, this.newSize, new Array(this.size.length).fill(0), 0, Insert$this.context__Call), (function Lambda_ () {
          if (!Insert$this._isActive())
            return;
          Insert$this._qedEndCall();
          VSQEDArray$this.dims = Insert$this.newSize;
          {
            Main_$this.post_(Insert$this, this);
            return;
          }
        }));
      }
    };
    this.InsertLevel = class InsertLevel extends QEDObject {
      constructor(dims, pos, size, newSize, pp, level, context__Call) {
        super(context__Call);
        this.dims = dims;
        this.pos = pos;
        this.size = size;
        this.newSize = newSize;
        this.pp = pp;
        this.level = level;
        const InsertLevel$this = this;
        new (function W39$_ (i33$_) {
          this.i33$_ = i33$_;
          if (InsertLevel$this.level < VSQEDArray$this.dims.length - 1) {
            {
              pp[level] = 0;
              (function while34$_ () {
                if (pp[level] < pos[level]) {
                  InsertLevel$this.blocking__Call = _bindHandler(new VSQEDArray$this.InsertLevel(InsertLevel$this.dims, InsertLevel$this.pos, InsertLevel$this.size, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1, InsertLevel$this.context__Call), (function Lambda_ () {
                    if (!InsertLevel$this._isActive())
                      return;
                    InsertLevel$this._qedEndCall();
                    pp[level]++;
                    while34$_();
                  }));
                }
                else {
                  pp[level] = pos[level];
                  (function while35$_ () {
                    if (pp[level] < pos[level] + InsertLevel$this.size[level]) {
                      array[pp[level]] = [];
                      InsertLevel$this.blocking__Call = _bindHandler(new VSQEDArray$this.InsertLevel(new Array(InsertLevel$this.size.length).fill(0), new Array(InsertLevel$this.size.length).fill(0), InsertLevel$this.newSize, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1, InsertLevel$this.context__Call), (function Lambda_ () {
                        if (!InsertLevel$this._isActive())
                          return;
                        InsertLevel$this._qedEndCall();
                        pp[level]++;
                        while35$_();
                      }));
                    }
                    else {
                      pp[level] = pos[level] + InsertLevel$this.size[level];
                      (function while36$_ () {
                        if (pp[level] < newSize[level]) {
                          InsertLevel$this.blocking__Call = _bindHandler(new VSQEDArray$this.InsertLevel(InsertLevel$this.dims, InsertLevel$this.pos, InsertLevel$this.size, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1, InsertLevel$this.context__Call), (function Lambda_ () {
                            if (!InsertLevel$this._isActive())
                              return;
                            InsertLevel$this._qedEndCall();
                            pp[level]++;
                            while36$_();
                          }));
                        }
                        else
                          i33$_();
                      })();
                    }
                  })();
                }
              })();
            }
          }
          else {
            pp[level] = pos[level];
            (function while37$_ () {
              if (pp[level] < pos[level] + InsertLevel$this.size[level]) {
                InsertLevel$this.blocking__Call = _bindHandler(new VSQEDArray$this.Init(InsertLevel$this.pp, InsertLevel$this.context__Call), (function Lambda_ () {
                  if (!InsertLevel$this._isActive())
                    return;
                  InsertLevel$this._qedEndCall();
                  pp[level]++;
                  while37$_();
                }));
              }
              else
                i33$_();
            })();
          }
        })((function c38$_ () {
          {
            Main_$this.post_(InsertLevel$this, null);
            return;
          }
        }));
      }
    };
    this.dims = new Array(numDim).fill(0);
    {
      Main_$this.post_(VSQEDArray$this, VSQEDArray$this);
      return;
    }
  }
};
this.sInitFn = function (pos) {
};
this.QEDArray = class QEDArray extends QEDBasicArray {
  constructor(init, numDim, dirs, Ui_) {
    super();
    this.init = init;
    this.numDim = numDim;
    this.dirs = dirs;
    this.Ui_ = Ui_;
    const QEDArray$this = this;
    this.getNumDirs = function () {
      return (QEDArray$this.numDim);
    };
    this.getDirs = function (childDir) {
      return (QEDArray$this.dirs);
    };
    this.size = function () {
      let s = 1;
      {
        let index = this.dims.length - 1;
        while(index >= 0) {
          s *= this.dims[index];
          index--;
        }
      }
      return (s);
    };
    this.insert = function (pos, size) {
      let newSize = [...size];
      {
        let index = QEDArray$this.dims.length - 1;
        while(index >= 0) {
          newSize[index] += QEDArray$this.dims[index];
          index--;
        }
      }
      QEDArray$this.insertLevel(QEDArray$this, QEDArray$this.dims, pos, size, newSize, new Array(size.length).fill(0), 0);
      QEDArray$this.dims = newSize;
      return (this);
    };
    this.remove = function (pos, size) {
      let newSize = [...QEDArray$this.dims];
      {
        let index = QEDArray$this.dims.length - 1;
        while(index >= 0) {
          newSize[index] -= size[index];
          index--;
        }
      }
      QEDArray$this.removeLevel(QEDArray$this, QEDArray$this.dims, pos, size, newSize, new Array(size.length).fill(0), 0);
      QEDArray$this.dims = newSize;
      return (this);
    };
    this.insertLevel = function (array, dims, pos, size, newSize, pp, level) {
      if (level < QEDArray$this.dims.length - 1) {
        {
          pp[level] = 0;
          while(pp[level] < pos[level]) {
            QEDArray$this.insertLevel(array[pp[level]], dims, pos, size, newSize, pp, level + 1);
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
            QEDArray$this.insertLevel(array[pp[level]], new Array(size.length).fill(0), new Array(size.length).fill(0), newSize, newSize, pp, level + 1);
            pp[level]++;
          }
        }
        {
          pp[level] = pos[level] + size[level];
          while(pp[level] < newSize[level]) {
            QEDArray$this.insertLevel(array[pp[level]], dims, pos, size, newSize, pp, level + 1);
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
            array[pp[level]] = QEDArray$this.init(pp);
            pp[level]++;
          }
        }
      }
      return;
    };
    this.removeLevel = function (array, dims, pos, size, newSize, pp, level) {
      if (level < QEDArray$this.dims.length - 1) {
        {
          pp[level] = dims[level] - 1;
          while(pp[level] >= pos[level] + size[level]) {
            QEDArray$this.removeLevel(array[pp[level]], dims, pos, size, newSize, pp, level + 1);
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
            QEDArray$this.removeLevel(array[pp[level]], dims, pos, size, newSize, pp, level + 1);
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
    };
    this.push = function () {
      let pos = new Array(QEDArray$this.dims.length).fill(0);
      let size = new Array(QEDArray$this.dims.length).fill(0);
      pos[0] = QEDArray$this.dims[0];
      size[0] = 1;
      QEDArray$this.insert(pos, size);
      return (this);
    };
    this.Push = class Push extends QEDObject {
      constructor(context__Call) {
        super(context__Call);
        const Push$this = this;
        {
          Main_$this.post_(Push$this, QEDArray$this.push());
          return;
        }
      }
    };
    this.pop = function () {
      let pos = new Array(QEDArray$this.dims.length).fill(0);
      let size = new Array(QEDArray$this.dims.length).fill(0);
      pos[0] = QEDArray$this.dims[0] - 1;
      size[0] = 1;
      QEDArray$this.remove(pos, size);
      return (this);
    };
    this.dims = new Array(numDim).fill(0);
  }
};
this.vInitFn = function (pos) {
};
this.VQEDArray = class VQEDArray extends QEDBasicArray {
  constructor(init, numDim) {
    super();
    this.init = init;
    this.numDim = numDim;
    const VQEDArray$this = this;
    this.size = function () {
      let s = 1;
      {
        let index = this.dims.length - 1;
        while(index >= 0) {
          s *= this.dims[index];
          index--;
        }
      }
      return (s);
    };
    this.insert = function (pos, size) {
      let newSize = [...size];
      {
        let index = VQEDArray$this.dims.length - 1;
        while(index >= 0) {
          newSize[index] += VQEDArray$this.dims[index];
          index--;
        }
      }
      VQEDArray$this.insertLevel(VQEDArray$this.dims, pos, size, newSize, new Array(size.length).fill(0), 0);
      VQEDArray$this.dims = newSize;
      return (this);
    };
    this.insertLevel = function (dims, pos, size, newSize, pp, level) {
      if (level < VQEDArray$this.dims.length - 1) {
        {
          pp[level] = 0;
          while(pp[level] < pos[level]) {
            VQEDArray$this.insertLevel(dims, pos, size, newSize, pp, level + 1);
            pp[level]++;
          }
        }
        {
          pp[level] = pos[level];
          while(pp[level] < pos[level] + size[level]) {
            VQEDArray$this.insertLevel(new Array(size.length).fill(0), new Array(size.length).fill(0), newSize, newSize, pp, level + 1);
            pp[level]++;
          }
        }
        {
          pp[level] = pos[level] + size[level];
          while(pp[level] < newSize[level]) {
            VQEDArray$this.insertLevel(dims, pos, size, newSize, pp, level + 1);
            pp[level]++;
          }
        }
      }
      else {
        pp[level] = pos[level];
        while(pp[level] < pos[level] + size[level]) {
          VQEDArray$this.init(pp);
          pp[level]++;
        }
      }
      return;
    };
    this.dims = new Array(numDim).fill(0);
  }
};
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
this.resizeView = function (unit) {
};
this.getViewSize = function (viewObj) {
};
this.paintView = function (unit, viewObj, posx, posy, sizex, sizey) {
};
this.onViewEvent = function (viewObj, event, posx, posy, sizex, sizey) {
};
this.getViewElementRect = function (viewObj, path, index, posx, posy, sizex, sizey, level, dLevel) {
};
this.ViewArray_ = function (array, dirs, resizeViewFn, getViewSizeFn, paintViewFn, onViewEventFn, getViewElementRectFn) {
  this.array = array;
  this.dirs = dirs;
  this.resizeViewFn = resizeViewFn;
  this.getViewSizeFn = getViewSizeFn;
  this.paintViewFn = paintViewFn;
  this.onViewEventFn = onViewEventFn;
  this.getViewElementRectFn = getViewElementRectFn;
  const ViewArray_$this = this;
  this.paint = function (pos0, pos1, size0, size1) {
    let newPos = new Main_$this.QEDExplicitArray(pos0, pos1);
    let pos = new Main_$this.QEDExplicitArray(pos0, pos1);
    let size = new Main_$this.QEDExplicitArray(size0, size1);
    {
      let index = 0;
      while(index < ViewArray_$this.length) {
        {
          let dir = 0;
          while(dir < 2) {
            if (ViewArray_$this.dirs[dir]) {
              let relPos = (index ? ViewArray_$this.posSet[index - 1][dir] + ViewArray_$this.space : 0);
              pos[dir] = newPos[dir] + relPos;
              size[dir] = ViewArray_$this.posSet[index][dir] - relPos;
            }
            dir++;
          }
        }
        ViewArray_$this.paintViewFn(ViewArray_$this.array[index], ViewArray_$this.views[index], pos[0], pos[1], size[0], size[1]);
        index++;
      }
    }
  };
  this.onEvent = function (event, pos0, pos1, size0, size1) {
    let pos = new Main_$this.QEDExplicitArray(0, 0);
    let size = new Main_$this.QEDExplicitArray(size0, size1);
    {
      let index = ViewArray_$this.length - 1;
      while(index >= 0) {
        {
          let dir = 0;
          while(dir < 2) {
            if (ViewArray_$this.dirs[dir]) {
              pos[dir] = (index ? ViewArray_$this.posSet[index - 1][dir] + ViewArray_$this.space : 0);
              size[dir] = ViewArray_$this.posSet[index][dir] - pos[dir];
            }
            dir++;
          }
        }
        if (pos0 >= pos[0] && pos0 < pos[0] + size[0] && pos1 >= pos[1] && pos1 < pos[1] + size[1]) {
          pos0 -= pos[0];
          pos1 -= pos[1];
          return (ViewArray_$this.onViewEventFn(ViewArray_$this.views[index], event, pos0, pos1, size[0], size[1]));
        }
        index--;
      }
    }
    return (false);
  };
  this.getBoundsRect = function (path, index, pos0, pos1, size0, size1, level, dLevel) {
    let ndx = index[0];
    let relPos = (ndx ? ViewArray_$this.posSet[ndx - 1][0] + ViewArray_$this.space : 0);
    let posx = pos0 + relPos;
    let posy = pos1;
    let sizex = ViewArray_$this.posSet[ndx][0] - relPos;
    let sizey = size1;
    dLevel++;
    if (level < path.size() || dLevel < index.size())
      return (ViewArray_$this.getViewElementRectFn(ViewArray_$this.views[ndx], path, index, posx, posy, sizex, sizey, level, dLevel));
    else
      return (new Main_$this.QEDExplicitArray(posx, posy, sizex, sizey));
  };
  this.space = _spacing;
  this.length = this.array.size();
  this.views = [];
  this.posSet = [];
  this.size = new Main_$this.QEDExplicitArray(0, 0);
  {
    let index = 0;
    while(index < this.length) {
      this.views[index] = this.resizeViewFn(this.array[index]);
      this.posSet[index] = new Main_$this.QEDExplicitArray(0, 0);
      let elementSize = this.getViewSizeFn(this.views[index]);
      {
        let dir = 0;
        while(dir < 2) {
          this.posSet[index][dir] = (this.dirs[dir] ? ((index ? this.size[dir] + this.space : 0)) + elementSize[dir] : Main_$this.max(this.size[dir], elementSize[dir]));
          this.size[dir] = this.posSet[index][dir];
          dir++;
        }
      }
      index++;
    }
  }
};
this.resizeViewObj = function (unit) {
  let value = unit;
  return (_refreshViews(value));
};
this.getViewSizeObj = function (viewObj) {
  let window = viewObj;
  return ((window.size() ? window[0].size : new Main_$this.QEDExplicitArray(0, 0)));
};
this.paintViewObj = function (unit, viewObj, posx, posy, sizex, sizey) {
  let window = viewObj;
  if (window.size())
    window[0].paint(posx, posy, sizex, sizey);
};
this.onViewEventObj = function (viewObj, event, posx, posy, sizex, sizey) {
  let window = viewObj;
  return (window.size() !== 0 && window[0].onEvent(event, new Main_$this.QEDExplicitArray(posx, posy), new Main_$this.QEDExplicitArray(sizex, sizey)));
};
this.getViewElementRectObj = function (viewObj, path, index, pos0, pos1, size0, size1, level, dLevel) {
  let window = viewObj;
  return ((window.size() ? window[0].getBoundsRect(path, index, pos0, pos1, size0, size1, level, dLevel) : new Main_$this.QEDExplicitArray()));
};
this.resizeViewString = function (unit) {
  return (Main_$this.getTextSize(unit));
};
this.getViewSizeString = function (viewObj) {
  return (viewObj);
};
this.paintViewString = function (unit, viewObj, posx, posy, sizex, sizey) {
  let size = viewObj;
  Main_$this.displayText(unit, posx, posy, sizex, sizey);
};
this.onViewEventString = function (viewObj, event, posx, posy, sizex, sizey) {
  return (true);
};
this.getViewElementRectString = function (viewObj, path, index, posx, posy, sizex, sizey, level, dLevel) {
  let size = viewObj;
  return (size);
};
this.resizeViewImage = function (unit) {
  return (Main_$this.getImageSize(unit));
};
this.getViewSizeImage = function (viewObj) {
  return (viewObj);
};
this.paintViewImage = function (unit, viewObj, posx, posy, sizex, sizey) {
  let size = viewObj;
  Main_$this.displayImage(unit, posx, posy, sizex, sizey);
};
this.onViewEventImage = function (viewObj, event, posx, posy, sizex, sizey) {
  return (true);
};
this.getViewElementRectImage = function (viewObj, path, index, posx, posy, sizex, sizey, level, dLevel) {
  let size = viewObj;
  return (size);
};
this.Attr_ = function (code, outNumDim, outType, value) {
  this.code = code;
  this.outNumDim = outNumDim;
  this.outType = outType;
  this.value = value;
};
this.Directive_ = function (direction, atts, children) {
  this.direction = direction;
  this.atts = atts;
  this.children = children;
  const Directive_$this = this;
  this.clearChange = function () {
    Directive_$this.changeLevel = 0;
    {
      let index = 0;
      while(index < Directive_$this.children.size()) {
        Directive_$this.children[index].clearChange();
        index++;
      }
    }
  };
  this.refreshChange = function () {
    let subChangeLevel = 0;
    {
      let index = 0;
      while(index < Directive_$this.children.size()) {
        subChangeLevel = Main_$this.max(subChangeLevel, Directive_$this.children[index].refreshChange());
        index++;
      }
    }
    Directive_$this.changeLevel = Main_$this.max(Directive_$this.changeLevel, subChangeLevel);
    return (Directive_$this.changeLevel);
  };
  this.setAtt = function (index, value) {
    let att = Directive_$this.atts[index];
    if (!Main_$this.qedEqual(value, att.value)) {
      Directive_$this.changeLevel = Main_$this.max(Directive_$this.changeLevel, (att.code > Main_$this.QED_TAG_HERITABLE ? 1 : (att.code > Main_$this.QED_TAG_AREA_HERITABLE ? 2 : 3)));
      Directive_$this.atts[index].value = value;
    }
  };
  this.findAttr = function (code) {
    {
      let index = 0;
      while(index < Directive_$this.atts.size()) {
        if (Directive_$this.atts[index].code === code)
          return (new Main_$this.QEDExplicitArray(Directive_$this.atts[index]));
        index++;
      }
    }
    return (new Main_$this.QEDExplicitArray());
  };
  this.getChangeLevel = function () {
    return (Directive_$this.changeLevel);
  };
  this.refreshSubModel = function () {
    let subModel = Directive_$this.outAttr[0].value;
    if (subModel != null)
      Directive_$this.changeLevel = Main_$this.max(Directive_$this.changeLevel, subModel._refreshModels());
  };
  this.sizeAttr = new Main_$this.QEDExplicitArray();
  this.outAttr = new Main_$this.QEDExplicitArray();
  this.viewIndex = 0;
  this.childrenViewFlag = false;
  this.changeLevel = 0;
  this.outType = -1;
  this.outNumDim = 0;
  {
    let ndx = 0;
    while(ndx < this.atts.size()) {
      let attr = this.atts[ndx];
      if (attr.code === Main_$this.QED_TAG_SIZE)
        this.sizeAttr = new Main_$this.QEDExplicitArray(attr);
      if (attr.code === Main_$this.QED_TAG_OUT) {
        this.outAttr = new Main_$this.QEDExplicitArray(attr);
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
      this.childrenViewFlag = Main_$this.hasAreas(this.children[ndx]);
      ndx++;
    }
  }
};
this.hasAreas = function (directive) {
  return (directive.childrenViewFlag || directive.viewIndex !== 0);
};
this.isAreaHeritable = function (code) {
  return (code > Main_$this.QED_TAG_AREA_HERITABLE && code < Main_$this.QED_TAG_AREA_END);
};
this.isHeritable = function (code) {
  return (Main_$this.isAreaHeritable(code) || (code > Main_$this.QED_TAG_HERITABLE && code < Main_$this.QED_TAG_END));
};
this.QedImageLoader = class QedImageLoader extends QEDObject {
  constructor(url, context__Call) {
    super(context__Call);
    this.url = url;
    const QedImageLoader$this = this;
    this.image = new Main_$this.QedImage(QedImageLoader$this);
    QedImageLoader$this.image.img.onload = function() {
    _qedCallback(QedImageLoader$this, QedImageLoader$this.image);
  };
  QedImageLoader$this.image.img.onerror = function(event){
    _qedCallback(QedImageLoader$this, QedImageLoader$this.image);
  }
  QedImageLoader$this.image.img.src = url;
  }
};
this.Widget_ = function (directive) {
  this.directive = directive;
  const Widget_$this = this;
  this.recalcWidgets = function () {
    let subWidgets = (function init$Array () {
      let _d0 = Widget_$this.directive.children.size();
      return (new Main_$this.QEDArray((function l (pos) {
        let i = pos[0];
        return (new Main_$this.Widget_(Widget_$this.directive.children[i]));
      }), 1, new Main_$this.QEDExplicitArray(0, 0), Main_$this.Qui_).insert(new Main_$this.QEDExplicitArray(0), new Main_$this.QEDExplicitArray(_d0)));
    })();
    let previous = new Main_$this.QEDExplicitArray();
    {
      let index = 0;
      while(index < subWidgets.size()) {
        let sub = subWidgets[index];
        if (sub != null && sub.size && Main_$this.hasAreas(sub.directive)) {
          let previousSize = (previous.size() ? previous[0].group : new Main_$this.QEDExplicitArray(0, 0));
          sub.group = (function init$Array () {
            let _d0 = 2;
            return (new Main_$this.QEDArray((function l (pos) {
              let dir = pos[0];
              return (((Widget_$this.directive.direction & (1 << dir) ? previousSize[dir] + sub.size[dir] : Main_$this.max(previousSize[dir], sub.size[dir]))));
            }), 1, new Main_$this.QEDExplicitArray(0, 0), Main_$this.Qui_).insert(new Main_$this.QEDExplicitArray(0), new Main_$this.QEDExplicitArray(_d0)));
          })();
          previous = new Main_$this.QEDExplicitArray(sub);
        }
        let att = Widget_$this.directive.children[index].findAttr(Main_$this.QED_TAG_EXPAND);
        if (att.size()) {
          {
            let dir = 0;
            while(dir < 2) {
              if (Widget_$this.directive.direction & (1 << dir))
                Widget_$this.expandArray[dir][Widget_$this.count] = (Main_$this.getDirVar(dir, att[0].value)) + ((Widget_$this.count ? Widget_$this.expandArray[dir][Widget_$this.count - 1] : 0));
              dir++;
            }
          }
          Widget_$this.count++;
        }
        index++;
      }
    }
    return (subWidgets);
  };
  this.paint = function (pos0, pos1, size0, size1) {
    if (!Widget_$this.directive.changeLevel)
      return;
    {
      let ndx = 0;
      while(ndx < Widget_$this.directive.atts.size()) {
        let att = Widget_$this.directive.atts[ndx];
        if (Main_$this.isHeritable(att.code)) {
          let value = att.value;
          if (!Main_$this.isAreaHeritable(att.code) && att.outType > 2)
            value = value();
          if (att.code === Main_$this.QED_TAG_ROTATION) {
            Main_$this.rotate(pos0, pos1, size0, size1, value);
            pos0 = -size0 / 2;
            pos1 = -size1 / 2;
          }
          else
            Main_$this.pushAttribute_$_$(att.code, value);
        }
        ndx++;
      }
    }
    let outType = (Widget_$this.directive.outAttr.size() ? Widget_$this.directive.outAttr[0].outType : -1);
    let outNumDim = (outType >= 0 ? Widget_$this.directive.outAttr[0].outNumDim : 0);
    let subSize = Widget_$this.subWidgets.size();
    if (outType >= 0 && directive.outAttr[0].value != null)
      if (outNumDim) {
        let viewArray = Widget_$this.outWidget[0];
        if (viewArray)
          viewArray.paint(pos0, pos1, size0, size1);
      }
      else
        if (outType === 0) {
          let window = Widget_$this.outWidget[0];
          window.paint(pos0, pos1, size0, size1);
        }
        else
          if (outType === 1)
            Main_$this.displayText(Widget_$this.directive.outAttr[0].value, pos0, pos1, size0, size1);
          else
            if (outType === 2)
              Main_$this.displayImage(Widget_$this.directive.outAttr[0].value, pos0, pos1, size0, size1);
            else {
              let fn = Widget_$this.directive.outAttr[0].value;
              let lineWidth = _lineFlag ? ctx.lineWidth : 0;
              let offset = lineWidth / 2;
              fn(pos0 + offset, pos1 + offset, size0 - lineWidth, size1 - lineWidth);
            }
    if (subSize) {
      let extraSpace = Widget_$this.getExtraSpace(new Main_$this.QEDExplicitArray(size0, size1));
      if (!outNumDim !== 0 && outType >= 1)
        Main_$this.saveContext();
      {
        let index = 0;
        while(index < subSize) {
          let sub = Widget_$this.subWidgets[index];
          if (sub && sub.size) {
            let rect = Widget_$this.getChildArea(index, size0, size1, extraSpace);
            Widget_$this.subWidgets[index].paint(pos0 + rect[0], pos1 + rect[1], rect[2], rect[3]);
          }
          index++;
        }
      }
      if (!outNumDim !== 0 && outType >= 1)
        Main_$this.restoreContext();
    }
    {
      let ndx = Widget_$this.directive.atts.size() - 1;
      while(ndx >= 0) {
        if (Main_$this.isHeritable(Widget_$this.directive.atts[ndx].code))
          if (Widget_$this.directive.atts[ndx].code === Main_$this.QED_TAG_ROTATION)
            Main_$this.restoreContext();
          else
            Main_$this.popAttribute(Widget_$this.directive.atts[ndx].code);
        ndx--;
      }
    }
  };
  this.onEvent = function (event, location, size) {
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
      let subSize = Widget_$this.subWidgets.size();
      if (subSize) {
        let extraSpace = Widget_$this.getExtraSpace(size);
        let parse = true;
        {
          let index = subSize - 1;
          while(!flag && parse && index >= 0) {
            let sub = Widget_$this.subWidgets[index];
            if (sub && sub.size) {
              let rect = Widget_$this.getChildArea(index, size[0], size[1], extraSpace);
              flag = sub.onEvent(event, new Main_$this.QEDExplicitArray(location[0] - rect[0], location[1] - rect[1]), new Main_$this.QEDExplicitArray(rect[2], rect[3]));
              if (!flag && index !== 0 && Widget_$this.directive.direction !== 0) {
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
      if (!flag && Widget_$this.directive.outAttr.size() !== 0)
        if (Widget_$this.directive.outAttr[0].outNumDim) {
          let viewArray = Widget_$this.outWidget[0];
          flag = viewArray.onEvent(event, location[0], location[1], size[0], size[1]);
        }
        else
          if (Widget_$this.directive.outAttr[0].outType === 0) {
            let window = Widget_$this.outWidget[0];
            flag = window.onEvent(event, location, size);
          }
      if (!flag) {
        let eventIndex = Widget_$this.getEventIndex(event);
        if (eventIndex !== -1) {
          let focus = Main_$this.potentialFocus;
          focus.adjust(Widget_$this, location, size);
          Main_$this.post__$(Widget_$this.directive.atts[eventIndex].value);
          flag = true;
        }
      }
    }
    return (flag);
  };
  this.getBoundsRect = function (path, index, pos0, pos1, size0, size1, level, dLevel) {
    let tagName = Widget_$this.directive.findAttr(Main_$this.QED_TAG_ID);
    if (tagName.size())
      if (path[level] === tagName[0].value) {
        level++;
        if (level === path.size() && dLevel === index.size())
          return (new Main_$this.QEDExplicitArray(pos0, pos1, size0, size1));
        else {
          if (Widget_$this.directive.outAttr.size())
            if (Widget_$this.directive.outAttr[0].outNumDim) {
              let viewArray = Widget_$this.outWidget[0];
              return (viewArray.getBoundsRect(path, index, pos0, pos1, size0, size1, level, dLevel));
            }
            else
              if (Widget_$this.directive.outAttr[0].outType === 0) {
                let window = Widget_$this.outWidget[0];
                return (window.getBoundsRect(path, index, pos0, pos1, size0, size1, level, dLevel));
              }
          return (new Main_$this.QEDExplicitArray());
        }
      }
    let subSize = Widget_$this.subWidgets.size();
    if (subSize) {
      let extraSpace = Widget_$this.getExtraSpace(new Main_$this.QEDExplicitArray(size0, size1));
      {
        let ndx = 0;
        while(ndx < subSize) {
          let sub = Widget_$this.subWidgets[ndx];
          if (sub && sub.size) {
            let rect = Widget_$this.getChildArea(ndx, Widget_$this.size[0], Widget_$this.size[1], extraSpace);
            let bounds = sub.getBoundsRect(path, index, pos0 + rect[0], pos1 + rect[1], rect[2], rect[3], level, dLevel);
            if (bounds.size())
              return (bounds);
          }
          ndx++;
        }
      }
    }
    return (new Main_$this.QEDExplicitArray());
  };
  this.getEventIndex = function (event) {
    {
      let index = 0;
      while(index < Widget_$this.directive.atts.size()) {
        let code = Widget_$this.directive.atts[index].code;
        if (code < 0 && event === -code - 1)
          return (index);
        index++;
      }
    }
    return (-1);
  };
  this.getExtraSpace = function (totalSize) {
    let extraSpace = new Main_$this.QEDExplicitArray(0, 0);
    {
      let dir = 0;
      while(dir < 2) {
        if (Widget_$this.directive.direction & (1 << dir)) {
          extraSpace[dir] = totalSize[dir] - ((Widget_$this.subWidgets.size() ? Widget_$this.subWidgets[Widget_$this.subWidgets.size() - 1].group[dir] : 0));
          if (Widget_$this.directive.children.size() >= 2 && Widget_$this.count !== 0 && Widget_$this.expandArray[dir][Widget_$this.count - 1] > 1)
            extraSpace[dir] /= Widget_$this.expandArray[dir][Widget_$this.count - 1];
        }
        dir++;
      }
    }
    return (extraSpace);
  };
  this.getChildArea = function (index, size0, size1, extraSpace) {
    let rect = new Main_$this.QEDExplicitArray(0, 0);
    {
      let dir = 0;
      while(dir < 2) {
        if ((Widget_$this.directive.direction & (1 << dir)) !== 0) {
          let ndx = -1;
          {
            let count = 0;
            while(count < index) {
              if (Widget_$this.subWidgets[count].directive.findAttr(Main_$this.QED_TAG_EXPAND).size())
                ndx++;
              count++;
            }
          }
          if (ndx >= 0)
            rect[dir] = Widget_$this.expandArray[dir][ndx] * extraSpace[dir];
        }
        dir++;
      }
    }
    return (Main_$this.getChildArea2(Widget_$this.subWidgets, Widget_$this.directive.direction, index, rect[0], rect[1], size0, size1, extraSpace));
  };
  this.group = new Main_$this.QEDExplicitArray();
  this.expandArray = (function init$Array () {
    let _d0 = 2;
    let _d1 = 32;
    return (new Main_$this.QEDArray((function l (pos) {
      return (0);
    }), 2, new Main_$this.QEDExplicitArray(0, 0), Main_$this.Qui_).insert(new Main_$this.QEDExplicitArray(0, 0), new Main_$this.QEDExplicitArray(_d0, _d1)));
  })();
  this.count = 0;
  {
    let ndx = 0;
    while(ndx < this.directive.atts.size()) {
      if (Main_$this.isAreaHeritable(this.directive.atts[ndx].code))
        Main_$this.pushAttribute_$_$(this.directive.atts[ndx].code, this.directive.atts[ndx].value);
      ndx++;
    }
  }
  this.subWidgets = this.recalcWidgets();
  this.size = (this.subWidgets.size() ? this.subWidgets[this.subWidgets.size() - 1].group : new Main_$this.QEDExplicitArray(0, 0));
  this.outWidget = new Main_$this.QEDExplicitArray();
  this.outType = (this.directive.outAttr.size() ? this.directive.outAttr[0].outType : -1);
  this.outNumDim = (this.outType >= 0 ? this.directive.outAttr[0].outNumDim : 0);
  if (this.outType >= 0) {
    let subModel = this.directive.outAttr[0].value;
    if (subModel != null)
      if (this.outNumDim) {
        if (this.outType === 0) {
          let array = subModel;
          let viewArray = new Main_$this.ViewArray_(array, array.getDirs(this.directive.direction), Main_$this.resizeViewObj, Main_$this.getViewSizeObj, Main_$this.paintViewObj, Main_$this.onViewEventObj, Main_$this.getViewElementRectObj);
          this.outWidget = new Main_$this.QEDExplicitArray(viewArray);
          this.size = viewArray.size;
        }
        else
          if (this.outType === 1) {
            let viewArray = new Main_$this.ViewArray_(subModel, new Main_$this.QEDExplicitArray(this.directive.direction & 1, (this.directive.direction & 2 ? 1 : 0)), Main_$this.resizeViewString, Main_$this.getViewSizeString, Main_$this.paintViewString, Main_$this.onViewEventString, Main_$this.getViewElementRectString);
            this.outWidget = new Main_$this.QEDExplicitArray(viewArray);
            this.size = viewArray.size;
          }
          else
            if (this.outType === 2) {
              let viewArray = new Main_$this.ViewArray_(subModel, new Main_$this.QEDExplicitArray(this.directive.direction & 1, (this.directive.direction & 2 ? 1 : 0)), Main_$this.resizeViewImage, Main_$this.getViewSizeImage, Main_$this.paintViewImage, Main_$this.onViewEventImage, Main_$this.getViewElementRectImage);
              this.outWidget = new Main_$this.QEDExplicitArray(viewArray);
              this.size = viewArray.size;
            }
      }
      else
        if (this.outType === 0) {
          let window = _refreshViews(subModel);
          this.outWidget = window;
          this.size = (window.size() ? window[0].size : new Main_$this.QEDExplicitArray(0, 0));
        }
        else
          if (this.outType === 1)
            this.size = Main_$this.getTextSize(subModel);
          else
            if (this.outType === 2)
              this.size = Main_$this.getImageSize(subModel);
  }
  if (this.directive.sizeAttr.size())
    this.size = (function init$Array () {
      let _d0 = 2;
      return (new Main_$this.QEDArray((function l (pos) {
        let i = pos[0];
        return (Main_$this.getDirVar(i, Widget_$this.directive.sizeAttr[0].value));
      }), 1, new Main_$this.QEDExplicitArray(0, 0), Main_$this.Qui_).insert(new Main_$this.QEDExplicitArray(0), new Main_$this.QEDExplicitArray(_d0)));
    })();
  {
    let ndx = this.directive.atts.size() - 1;
    while(ndx >= 0) {
      if (Main_$this.isAreaHeritable(this.directive.atts[ndx].code))
        Main_$this.popAttribute(this.directive.atts[ndx].code);
      ndx--;
    }
  }
};
this.getChildArea2 = function (subWidgets, direction, index, pos0, pos1, size0, size1, extraSpace) {
  let rect = new Main_$this.QEDExplicitArray(pos0, pos1, size0, size1);
  let subWidget = subWidgets[index];
  let expandAttr = subWidget.directive.findAttr(Main_$this.QED_TAG_EXPAND);
  let alignAttr = subWidget.directive.findAttr(Main_$this.QED_TAG_ALIGN);
  let posAttr = subWidget.directive.findAttr(Main_$this.QED_TAG_POS);
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
          rect[2 + dir] += extraSpace[dir] * Main_$this.getDirVar(dir, expandAttr[0].value);
      }
      else {
        let originalSize = rect[2 + dir];
        let expansion = (expandAttr.size() ? Main_$this.min(Main_$this.getDirVar(dir, expandAttr[0].value), 1) : (subWidget.directive.findAttr(Main_$this.QED_TAG_SIZE).size() !== 0 || alignAttr.size() !== 0 ? 0 : 1));
        rect[2 + dir] = subWidget.size[dir];
        if (expansion)
          rect[2 + dir] += (originalSize - rect[2 + dir]) * expansion;
        if (alignAttr.size())
          rect[dir] += (originalSize - rect[2 + dir]) * Main_$this.getDirVar(dir, alignAttr[0].value);
      }
      if (posAttr.size())
        rect[dir] += Main_$this.getDirVar(dir, posAttr[0].value);
      dir++;
    }
  }
  return (rect);
};
this.QEDFocus_ = function (widget, rect) {
  this.widget = widget;
  this.rect = rect;
  const QEDFocus_$this = this;
  this.adjust = function (w, location, size) {
    QEDFocus_$this.widget = w;
    QEDFocus_$this.rect[0] -= location[0];
    QEDFocus_$this.rect[1] -= location[1];
    QEDFocus_$this.rect[2] = size[0];
    QEDFocus_$this.rect[3] = size[1];
  };
};
function _captureFocus () {
  Main_$this.qedFocus = new Main_$this.QEDExplicitArray(Main_$this.potentialFocus);
};
function _releaseFocus () {
  Main_$this.qedFocus = new Main_$this.QEDExplicitArray();
};
this.onGlobalEvent = function (event, location) {
  if (!this.MainObj)
    return;
  if (Main_$this.qedFocus.size()) {
    let eventIndex = Main_$this.qedFocus[0].widget.getEventIndex(event);
    if (eventIndex !== -1) {
      Main_$this.post__$(Main_$this.qedFocus[0].widget.directive.atts[eventIndex].value);
    }
  }
  else {
    Main_$this.potentialFocus = new Main_$this.QEDFocus_(null, new Main_$this.QEDExplicitArray(location[0], location[1], 0, 0));
    if (Main_$this.windows.length)
      Main_$this.windows[0].onEvent(event, location, [canvas.width, canvas.height]);
  }
  if (postHandler)
    Main_$this.executeEvents_();
};
this.getDirVar = function (dir, value) {
  return value instanceof Array ? value[dir] : value;
};
this.Window_ = function (ui, dialog) {
  this.ui = ui;
  this.dialog = dialog;
  const Window_$this = this;
  this.paint = function (pos0, pos1, size0, size1) {
    {
      let index = 0;
      while(index < Window_$this.widgets.size()) {
        let sub = Window_$this.widgets[index];
        if (sub && sub.size) {
          let rect = Main_$this.getChildArea2(Window_$this.widgets, 0, index, pos0, pos1, size0, size1, null);
          sub.paint(rect[0], rect[1], rect[2], rect[3]);
        }
        index++;
      }
    }
    if (Window_$this.dialog.size())
      Window_$this.dialog[0].paint(pos0, pos1, size0, size1);
  };
  this.onEvent = function (event, location, size) {
    let flag = false;
    if (Window_$this.dialog.size())
      flag = Window_$this.dialog[0].onEvent(event, location, size);
    else {
      let index = Window_$this.widgets.size() - 1;
      while(!flag && index >= 0) {
        let sub = Window_$this.widgets[index];
        if (sub && sub.size) {
          let rect = Main_$this.getChildArea2(Window_$this.widgets, 0, index, 0, 0, size[0], size[1], null);
          flag = sub.onEvent(event, new Main_$this.QEDExplicitArray(location[0] - rect[0], location[1] - rect[1]), new Main_$this.QEDExplicitArray(rect[2], rect[3]));
        }
        index--;
      }
    }
    return (flag);
  };
  this.getBoundsRect = function (path, index, pos0, pos1, size0, size1, level, dLevel) {
    {
      let ndx = 0;
      while(ndx < Window_$this.widgets.size()) {
        let sub = Window_$this.widgets[ndx];
        if (sub && sub.size) {
          let rect = Main_$this.getChildArea2(Window_$this.widgets, 0, ndx, pos0, pos1, size0, size1, null);
          let bounds = sub.getBoundsRect(path, index, rect[0], rect[1], rect[2], rect[3], level, dLevel);
          if (bounds.size())
            return (bounds);
        }
        ndx++;
      }
    }
    return ((Window_$this.dialog.size() ? Window_$this.dialog[0].getBoundsRect(path, index, pos0, pos1, size0, size1, level, dLevel) : new Main_$this.QEDExplicitArray()));
  };
  this.widgets = (function init$Array () {
    let _d0 = Window_$this.ui.size();
    return (new Main_$this.QEDArray((function l (pos) {
      let i = pos[0];
      return (new Main_$this.Widget_(Window_$this.ui[i]));
    }), 1, new Main_$this.QEDExplicitArray(0, 0), Main_$this.Qui_).insert(new Main_$this.QEDExplicitArray(0), new Main_$this.QEDExplicitArray(_d0)));
  })();
  this.previous = new Main_$this.QEDExplicitArray();
  {
    let index = 0;
    while(index < this.widgets.size()) {
      let sub = this.widgets[index];
      if (sub && sub.size && Main_$this.hasAreas(sub.directive)) {
        let previousSize = (this.previous.size() ? this.previous[0].group : new Main_$this.QEDExplicitArray(0, 0));
        sub.group = (function init$Array () {
          let _d0 = 2;
          return (new Main_$this.QEDArray((function l (pos) {
            let dir = pos[0];
            return (Main_$this.max(previousSize[dir], sub.size[dir]));
          }), 1, new Main_$this.QEDExplicitArray(0, 0), Main_$this.Qui_).insert(new Main_$this.QEDExplicitArray(0), new Main_$this.QEDExplicitArray(_d0)));
        })();
        this.previous = new Main_$this.QEDExplicitArray(sub);
      }
      index++;
    }
  }
  this.size = (this.widgets.size() ? this.widgets[this.widgets.size() - 1].group : new Main_$this.QEDExplicitArray(0, 0));
  if (this.dialog.size())
    this.size = (function init$Array () {
      let _d0 = 2;
      return (new Main_$this.QEDArray((function l (pos) {
        let i = pos[0];
        return (Main_$this.max(Window_$this.size[i], Window_$this.dialog[0].size[i]));
      }), 1, new Main_$this.QEDExplicitArray(0, 0), Main_$this.Qui_).insert(new Main_$this.QEDExplicitArray(0), new Main_$this.QEDExplicitArray(_d0)));
    })();
};
function _refreshViews (obj) {
  let dialog = (obj.blocking__Call ? _refreshViews(obj.blocking__Call) : new Main_$this.QEDExplicitArray());
  return ((obj.qedModel ? new Main_$this.QEDExplicitArray(new Main_$this.Window_(obj.qedModel, dialog)) : dialog));
};
this.QedWait = class QedWait extends QEDObject {
  constructor(array, context__Call) {
    super(context__Call);
    this.array = array;
    const QedWait$this = this;
    this.count = this.array.size();
    {
      let index = 0;
      while(index < this.count) {
        let obj = this.array[index];
        let oldHandler = obj._HandlerFn_;
        _bindHandler(obj, (function Lambda_ () {
          if (!QedWait$this._isActive())
            return;
          {
            if (oldHandler)
              oldHandler();
            if ( -- QedWait$this.count === 0) {
              Main_$this.post_(QedWait$this, null);
              return;
            }
          }
        }));
        index++;
      }
    }
  }
};
this.QedWaitValues = class QedWaitValues extends QEDObject {
  constructor(array, context__Call) {
    super(context__Call);
    this.array = array;
    const QedWaitValues$this = this;
    this.count = this.array.size();
    if (!this.count) {
      Main_$this.post_(QedWaitValues$this, new Main_$this.QEDExplicitArray());
      return;
    }
    this.outputs = (function init$Array () {
      let _d0 = QedWaitValues$this.count;
      return (new Main_$this.QEDArray((function l (pos) {
        return (0);
      }), 1, new Main_$this.QEDExplicitArray(0, 0), Main_$this.Qui_).insert(new Main_$this.QEDExplicitArray(0), new Main_$this.QEDExplicitArray(_d0)));
    })();
    {
      let index = 0;
      while(index < this.count) {
        let ndx = index;
        let obj = this.array[index];
        let oldHandler = obj._HandlerFn_;
        _bindHandler(obj, (function Lambda_ (_ret) {
          if (!QedWaitValues$this._isActive())
            return;
          {
            QedWaitValues$this.outputs[ndx] = _ret;
            if (oldHandler)
              oldHandler(_ret);
            if ( -- QedWaitValues$this.count === 0) {
              Main_$this.post_(QedWaitValues$this, QedWaitValues$this.outputs);
              return;
            }
          }
        }));
        index++;
      }
    }
  }
};
this.start_ = function (args, returnFn) {
  Main_$this.MainObj = _bindHandler(new this.Main(args, null), (function Lambda_(_ret) {
    Main_$this.MainObj._qedKill();
    Main_$this.MainObj = null;

    if (returnFn)
      returnFn(_ret);
  }));
  Main_$this.executeEvents_();
  return (Main_$this.MainObj);
};
this.Main = class Main extends QEDObject {
  constructor(argv, context__Call) {
    super(context__Call);
    this.argv = argv;
    const Main$this = this;
    this.displaySlider = function (x, y, width, height) {
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
      Main_$this.qedDraw();
    };
    this.displayTacos = function (x, y, width, height, count) {
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
      ctx.fillStyle = attributeStacks[Main_$this.QED_TAG_FILL_STYLE][attributeStacks[Main_$this.QED_TAG_FILL_STYLE].length - 1][1];
      ctx.beginPath();
      ctx.arc(50, 70 + y, 53, 190/360 * 2 * Math.PI, -10/360 * 2 * Math.PI);
      ctx.fill();
    }

    ctx.restore();
  }

  for (let i = 4 - count; i < 4; i++)
    renderTaco(i * 20)

  ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
    this.showTwoTacos = function (x, y, width, height) {
      Main$this.displayTacos(x, y, width, height, 2);
    };
    this.ObjectOverTextButton = class ObjectOverTextButton extends QEDObject {
      constructor(drawObject, text, context__Call) {
        super(context__Call);
        this.drawObject = drawObject;
        this.text = text;
        const ObjectOverTextButton$this = this;
        this.refresh_Model_ = function () {
          if (!ObjectOverTextButton$this.qedModel) {
            let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null)), new Main_$this.QEDExplicitArray());
            ObjectOverTextButton$this.qedModel = new Main_$this.QEDExplicitArray(u1);
          }
          let u1 = ObjectOverTextButton$this.qedModel[0];
          u1.clearChange();
          u1.setAtt(0, ObjectOverTextButton$this.button);
          u1.refreshSubModel();
          u1.refreshChange();
          let _level = u1.getChangeLevel();
          return _level;
        };
        this.button = _bindHandler(new Main_$this.QedRectButton((class L  extends QEDObject {
          constructor(context__Call) {
            super(context__Call);
            const L$this = this;
            this.refresh_Model_ = function () {
              if (!L$this.qedModel) {
                let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 3, null), new Main_$this.Attr_(1, 1, -1, null), new Main_$this.Attr_(12, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null), new Main_$this.Attr_(12, 0, 1, null), new Main_$this.Attr_(10, 1, -1, null)), new Main_$this.QEDExplicitArray());
                let u2 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null)), new Main_$this.QEDExplicitArray());
                let u3 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null), new Main_$this.Attr_(12, 0, 1, null)), new Main_$this.QEDExplicitArray());
                let u4 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 1, -1, null)), new Main_$this.QEDExplicitArray(u3));
                let u5 = new Main_$this.Directive_(2, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray(u1, u2, u4));
                L$this.qedModel = new Main_$this.QEDExplicitArray(u5);
              }
              let u1 = L$this.qedModel[0];
              u1.clearChange();
              u1.setAtt(0, ((50) / 100));
              let u4 = u1.children[0];
              u4.setAtt(0, ObjectOverTextButton$this.drawObject);
              u4.setAtt(1, new Main_$this.QEDExplicitArray(240, 160));
              u4.setAtt(2, "none");
              u4.setAtt(3, ((50) / 100));
              u4.setAtt(4, "white");
              u4.setAtt(5, new Main_$this.QEDExplicitArray(0, -40));
              let u3 = u1.children[1];
              u3.setAtt(0, 10);
              let u2 = u1.children[2];
              u2.setAtt(0, new Main_$this.QEDExplicitArray(300, 50));
              let u5 = u2.children[0];
              u5.setAtt(0, ObjectOverTextButton$this.text);
              u5.setAtt(1, ((50) / 100));
              u5.setAtt(2, "white");
              u1.refreshChange();
              let _level = u1.getChangeLevel();
              return _level;
            };
            this.qedModel = null;
          }
        }), ObjectOverTextButton$this), (function Lambda_ () {
          if (!ObjectOverTextButton$this._isActive())
            return;
          {
            Main_$this.post_(ObjectOverTextButton$this, null);
            return;
          }
        }));
        this.qedModel = null;
      }
    };
    this.ObjectBeforeTextButton = class ObjectBeforeTextButton extends QEDObject {
      constructor(drawObject, text, context__Call) {
        super(context__Call);
        this.drawObject = drawObject;
        this.text = text;
        const ObjectBeforeTextButton$this = this;
        this.refresh_Model_ = function () {
          if (!ObjectBeforeTextButton$this.qedModel) {
            let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null)), new Main_$this.QEDExplicitArray());
            ObjectBeforeTextButton$this.qedModel = new Main_$this.QEDExplicitArray(u1);
          }
          let u1 = ObjectBeforeTextButton$this.qedModel[0];
          u1.clearChange();
          u1.setAtt(0, ObjectBeforeTextButton$this.button);
          u1.refreshSubModel();
          u1.refreshChange();
          let _level = u1.getChangeLevel();
          return _level;
        };
        this.button = _bindHandler(new Main_$this.QedRectButton((class L  extends QEDObject {
          constructor(context__Call) {
            super(context__Call);
            const L$this = this;
            this.refresh_Model_ = function () {
              if (!L$this.qedModel) {
                let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null)), new Main_$this.QEDExplicitArray());
                let u2 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 3, null), new Main_$this.Attr_(1, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray());
                let u3 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null)), new Main_$this.QEDExplicitArray());
                let u4 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(8, 1, -1, null)), new Main_$this.QEDExplicitArray());
                let u5 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 1, -1, null)), new Main_$this.QEDExplicitArray(u4));
                let u6 = new Main_$this.Directive_(1, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(8, 1, -1, null), new Main_$this.Attr_(12, 0, 1, null)), new Main_$this.QEDExplicitArray(u1, u2, u3, u5));
                L$this.qedModel = new Main_$this.QEDExplicitArray(u6);
              }
              let u1 = L$this.qedModel[0];
              u1.clearChange();
              u1.setAtt(0, new Main_$this.QEDExplicitArray(0, ((50) / 100)));
              u1.setAtt(1, "white");
              let u5 = u1.children[0];
              u5.setAtt(0, 30);
              let u4 = u1.children[1];
              u4.setAtt(0, ObjectBeforeTextButton$this.drawObject);
              u4.setAtt(1, 60);
              u4.setAtt(2, ((50) / 100));
              let u3 = u1.children[2];
              u3.setAtt(0, 20);
              let u2 = u1.children[3];
              u2.setAtt(0, new Main_$this.QEDExplicitArray(200, 50));
              let u6 = u2.children[0];
              u6.setAtt(0, ObjectBeforeTextButton$this.text);
              u6.setAtt(1, new Main_$this.QEDExplicitArray(0, ((50) / 100)));
              u1.refreshChange();
              let _level = u1.getChangeLevel();
              return _level;
            };
            this.qedModel = null;
          }
        }), ObjectBeforeTextButton$this), (function Lambda_ () {
          if (!ObjectBeforeTextButton$this._isActive())
            return;
          {
            Main_$this.post_(ObjectBeforeTextButton$this, null);
            return;
          }
        }));
        this.qedModel = null;
      }
    };
    this.KeyButton = class KeyButton extends QEDObject {
      constructor(text, context__Call) {
        super(context__Call);
        this.text = text;
        const KeyButton$this = this;
        this.refresh_Model_ = function () {
          if (!KeyButton$this.qedModel) {
            let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u2 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null), new Main_$this.Attr_(5, 0, 1, null)), new Main_$this.QEDExplicitArray());
            KeyButton$this.qedModel = new Main_$this.QEDExplicitArray(u1, u2);
          }
          let u2 = KeyButton$this.qedModel[0];
          u2.clearChange();
          u2.setAtt(0, (_fontSize) * 1.500000);
          u2.refreshChange();
          let _level = u2.getChangeLevel();
          let u1 = KeyButton$this.qedModel[1];
          u1.clearChange();
          u1.setAtt(0, KeyButton$this.button);
          u1.setAtt(1, ((_fontSize) * (((text.length) > 1 ? 0.500000 : 1))));
          Main_$this.pushAttribute_$_$(5, u1.atts[1].value);
          u1.refreshSubModel();
          Main_$this.popAttribute(5);
          u1.refreshChange();
          _level = Main_$this.max(_level, u1.getChangeLevel());
          return _level;
        };
        this.button = _bindHandler(new Main_$this.QedTextButton(this.text, KeyButton$this), (function Lambda_ (_ret) {
          if (!KeyButton$this._isActive())
            return;
          {
            Main_$this.post_(KeyButton$this, KeyButton$this.text);
            return;
          }
        }));
        this.qedModel = null;
      }
    };
    this.NumericKeyboardWidget = class NumericKeyboardWidget extends QEDObject {
      constructor(context__Call) {
        super(context__Call);
        const NumericKeyboardWidget$this = this;
        this.Row = class Row extends QEDObject {
          constructor(row, context__Call) {
            super(context__Call);
            this.row = row;
            const Row$this = this;
            this.refresh_Model_ = function () {
              if (!Row$this.qedModel) {
                let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 1, 0, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray());
                Row$this.qedModel = new Main_$this.QEDExplicitArray(u1);
              }
              let u1 = Row$this.qedModel[0];
              u1.clearChange();
              u1.setAtt(0, Row$this.buttons);
              u1.setAtt(1, ((50) / 100));
              u1.refreshSubModel();
              u1.refreshChange();
              let _level = u1.getChangeLevel();
              return _level;
            };
            this.buttons = (function init$Array () {
              let _d0 = NumericKeyboardWidget$this.numKeyboardRows[Row$this.row].length;
              return (new Main_$this.QEDArray((function l (pos) {
                let index = pos[0];
                return (_bindHandler(new Main$this.KeyButton(NumericKeyboardWidget$this.numKeyboardRows[Row$this.row].charAt(index), Row$this), (function Lambda_ (_ret) {
                  if (!Row$this._isActive())
                    return;
                  {
                    Main_$this.post_(Row$this, _ret);
                    return;
                  }
                })));
              }), 1, new Main_$this.QEDExplicitArray(1, 0), Main_$this.Qui_).insert(new Main_$this.QEDExplicitArray(0), new Main_$this.QEDExplicitArray(_d0)));
            })();
            this.qedModel = null;
          }
        };
        this.refresh_Model_ = function () {
          if (!NumericKeyboardWidget$this.qedModel) {
            let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 1, 0, null)), new Main_$this.QEDExplicitArray());
            let u2 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u3 = new Main_$this.Directive_(1, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 1, 0, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u4 = new Main_$this.Directive_(2, new Main_$this.QEDExplicitArray(), new Main_$this.QEDExplicitArray(u1, u2, u3));
            NumericKeyboardWidget$this.qedModel = new Main_$this.QEDExplicitArray(u4);
          }
          let u1 = NumericKeyboardWidget$this.qedModel[0];
          u1.clearChange();
          let u4 = u1.children[0];
          u4.setAtt(0, NumericKeyboardWidget$this.rows);
          u4.refreshSubModel();
          let u3 = u1.children[1];
          u3.setAtt(0, 15);
          let u2 = u1.children[2];
          u2.setAtt(0, NumericKeyboardWidget$this.lastRow);
          u2.setAtt(1, ((50) / 100));
          u2.refreshSubModel();
          u1.refreshChange();
          let _level = u1.getChangeLevel();
          return _level;
        };
        this.typedText = "";
        this.numKeyboardRows = new Main_$this.QEDExplicitArray("789", "456", "123");
        this.rows = (function init$Array () {
          let _d0 = NumericKeyboardWidget$this.numKeyboardRows.size();
          return (new Main_$this.QEDArray((function l (pos) {
            let i = pos[0];
            return (_bindHandler(new NumericKeyboardWidget$this.Row(i, NumericKeyboardWidget$this), (function Lambda_ (_ret) {
              if (!NumericKeyboardWidget$this._isActive())
                return;
              {
                NumericKeyboardWidget$this.typedText += _ret;
                {
                  Main_$this.post_(NumericKeyboardWidget$this, NumericKeyboardWidget$this.typedText);
                  return;
                }
              }
            })));
          }), 1, new Main_$this.QEDExplicitArray(0, 1), Main_$this.Qui_).insert(new Main_$this.QEDExplicitArray(0), new Main_$this.QEDExplicitArray(_d0)));
        })();
        this.lastRow = new Main_$this.QEDExplicitArray(_bindHandler(new Main$this.KeyButton("Clear", NumericKeyboardWidget$this), (function Lambda_ (_ret) {
          if (!NumericKeyboardWidget$this._isActive())
            return;
          {
            NumericKeyboardWidget$this.typedText = "";
            {
              Main_$this.post_(NumericKeyboardWidget$this, NumericKeyboardWidget$this.typedText);
              return;
            }
          }
        })), _bindHandler(new Main$this.KeyButton("0", NumericKeyboardWidget$this), (function Lambda_ (_ret) {
          if (!NumericKeyboardWidget$this._isActive())
            return;
          {
            NumericKeyboardWidget$this.typedText += "0";
            {
              Main_$this.post_(NumericKeyboardWidget$this, NumericKeyboardWidget$this.typedText);
              return;
            }
          }
        })), _bindHandler(new Main$this.KeyButton("Del", NumericKeyboardWidget$this), (function Lambda_ (_ret) {
          if (!NumericKeyboardWidget$this._isActive())
            return;
          {
            NumericKeyboardWidget$this.typedText = NumericKeyboardWidget$this.typedText.slice(0, -1);
            {
              Main_$this.post_(NumericKeyboardWidget$this, NumericKeyboardWidget$this.typedText);
              return;
            }
          }
        })));
        this.qedModel = null;
      }
    };
    this.AlphaKeyboardWidget = class AlphaKeyboardWidget extends QEDObject {
      constructor(context__Call) {
        super(context__Call);
        const AlphaKeyboardWidget$this = this;
        this.Row = class Row extends QEDObject {
          constructor(row, context__Call) {
            super(context__Call);
            this.row = row;
            const Row$this = this;
            this.refresh_Model_ = function () {
              if (!Row$this.qedModel) {
                let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 1, 0, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray());
                Row$this.qedModel = new Main_$this.QEDExplicitArray(u1);
              }
              let u1 = Row$this.qedModel[0];
              u1.clearChange();
              u1.setAtt(0, Row$this.buttons);
              u1.setAtt(1, ((50) / 100));
              u1.refreshSubModel();
              u1.refreshChange();
              let _level = u1.getChangeLevel();
              return _level;
            };
            this.buttons = (function init$Array () {
              let _d0 = AlphaKeyboardWidget$this.alphaKeyboardRows[Row$this.row].length;
              return (new Main_$this.QEDArray((function l (pos) {
                let index = pos[0];
                return (_bindHandler(new Main$this.KeyButton(AlphaKeyboardWidget$this.alphaKeyboardRows[Row$this.row].charAt(index), Row$this), (function Lambda_ (_ret) {
                  if (!Row$this._isActive())
                    return;
                  {
                    Main_$this.post_(Row$this, _ret);
                    return;
                  }
                })));
              }), 1, new Main_$this.QEDExplicitArray(1, 0), Main_$this.Qui_).insert(new Main_$this.QEDExplicitArray(0), new Main_$this.QEDExplicitArray(_d0)));
            })();
            this.qedModel = null;
          }
        };
        this.SpaceFunc = class SpaceFunc extends QEDObject {
          constructor(context__Call) {
            super(context__Call);
            const SpaceFunc$this = this;
            this.refresh_Model_ = function () {
              if (!SpaceFunc$this.qedModel) {
                let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 1, -1, null)), new Main_$this.QEDExplicitArray());
                SpaceFunc$this.qedModel = new Main_$this.QEDExplicitArray(u1);
              }
              let u1 = SpaceFunc$this.qedModel[0];
              u1.clearChange();
              u1.setAtt(0, new Main_$this.QEDExplicitArray(200, 1));
              u1.refreshChange();
              let _level = u1.getChangeLevel();
              return _level;
            };
            this.qedModel = null;
          }
        };
        this.refresh_Model_ = function () {
          if (!AlphaKeyboardWidget$this.qedModel) {
            let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 1, 0, null)), new Main_$this.QEDExplicitArray());
            let u2 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u3 = new Main_$this.Directive_(1, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 1, 0, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u4 = new Main_$this.Directive_(2, new Main_$this.QEDExplicitArray(), new Main_$this.QEDExplicitArray(u1, u2, u3));
            AlphaKeyboardWidget$this.qedModel = new Main_$this.QEDExplicitArray(u4);
          }
          let u1 = AlphaKeyboardWidget$this.qedModel[0];
          u1.clearChange();
          let u4 = u1.children[0];
          u4.setAtt(0, AlphaKeyboardWidget$this.rows);
          u4.refreshSubModel();
          let u3 = u1.children[1];
          u3.setAtt(0, 10);
          let u2 = u1.children[2];
          u2.setAtt(0, AlphaKeyboardWidget$this.lastRow);
          u2.setAtt(1, ((50) / 100));
          u2.refreshSubModel();
          u1.refreshChange();
          let _level = u1.getChangeLevel();
          return _level;
        };
        this.typedText = "";
        this.alphaKeyboardRows = new Main_$this.QEDExplicitArray("1234567890", "QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM");
        this.rows = (function init$Array () {
          let _d0 = AlphaKeyboardWidget$this.alphaKeyboardRows.size();
          return (new Main_$this.QEDArray((function l (pos) {
            let i = pos[0];
            return (_bindHandler(new AlphaKeyboardWidget$this.Row(i, AlphaKeyboardWidget$this), (function Lambda_ (_ret) {
              if (!AlphaKeyboardWidget$this._isActive())
                return;
              {
                AlphaKeyboardWidget$this.typedText += _ret;
                {
                  Main_$this.post_(AlphaKeyboardWidget$this, AlphaKeyboardWidget$this.typedText);
                  return;
                }
              }
            })));
          }), 1, new Main_$this.QEDExplicitArray(0, 1), Main_$this.Qui_).insert(new Main_$this.QEDExplicitArray(0), new Main_$this.QEDExplicitArray(_d0)));
        })();
        this.lastRow = new Main_$this.QEDExplicitArray(_bindHandler(new Main$this.KeyButton("Clear", AlphaKeyboardWidget$this), (function Lambda_ (_ret) {
          if (!AlphaKeyboardWidget$this._isActive())
            return;
          {
            AlphaKeyboardWidget$this.typedText = "";
            {
              Main_$this.post_(AlphaKeyboardWidget$this, AlphaKeyboardWidget$this.typedText);
              return;
            }
          }
        })), _bindHandler(new Main_$this.QedRectButton(this.SpaceFunc, AlphaKeyboardWidget$this), (function Lambda_ () {
          if (!AlphaKeyboardWidget$this._isActive())
            return;
          {
            AlphaKeyboardWidget$this.typedText += " ";
            {
              Main_$this.post_(AlphaKeyboardWidget$this, AlphaKeyboardWidget$this.typedText);
              return;
            }
          }
        })), _bindHandler(new Main$this.KeyButton("Del", AlphaKeyboardWidget$this), (function Lambda_ (_ret) {
          if (!AlphaKeyboardWidget$this._isActive())
            return;
          {
            AlphaKeyboardWidget$this.typedText = AlphaKeyboardWidget$this.typedText.slice(0, -1);
            {
              Main_$this.post_(AlphaKeyboardWidget$this, AlphaKeyboardWidget$this.typedText);
              return;
            }
          }
        })));
        this.qedModel = null;
      }
    };
    this.SpinnerWidget = class SpinnerWidget extends QEDObject {
      constructor(context__Call) {
        super(context__Call);
        const SpinnerWidget$this = this;
        this.Circle = class Circle extends QEDObject {
          constructor(index, context__Call) {
            super(context__Call);
            this.index = index;
            const Circle$this = this;
            this.refresh_Model_ = function () {
              if (!Circle$this.qedModel) {
                let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 3, null), new Main_$this.Attr_(1, 1, -1, null), new Main_$this.Attr_(8, 1, -1, null)), new Main_$this.QEDExplicitArray());
                let u2 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(17, 0, 1, null)), new Main_$this.QEDExplicitArray(u1));
                Circle$this.qedModel = new Main_$this.QEDExplicitArray(u2);
              }
              let u1 = Circle$this.qedModel[0];
              u1.clearChange();
              u1.setAtt(0, (SpinnerWidget$this.angle + Circle$this.index) * 2 * 3.141593 / SpinnerWidget$this.numCircles);
              let u2 = u1.children[0];
              u2.setAtt(0, Main_$this.oval);
              u2.setAtt(1, new Main_$this.QEDExplicitArray(30, 15));
              u2.setAtt(2, new Main_$this.QEDExplicitArray(((100) / 100), ((50) / 100)));
              u1.refreshChange();
              let _level = u1.getChangeLevel();
              return _level;
            };
            this.qedModel = null;
          }
        };
        this.refresh_Model_ = function () {
          if (!SpinnerWidget$this.qedModel) {
            let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 1, 0, null)), new Main_$this.QEDExplicitArray());
            let u2 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray(u1));
            SpinnerWidget$this.qedModel = new Main_$this.QEDExplicitArray(u2);
          }
          let u1 = SpinnerWidget$this.qedModel[0];
          u1.clearChange();
          u1.setAtt(0, 100);
          u1.setAtt(1, ((50) / 100));
          let u2 = u1.children[0];
          u2.setAtt(0, SpinnerWidget$this.circles);
          u2.refreshSubModel();
          u1.refreshChange();
          let _level = u1.getChangeLevel();
          return _level;
        };
        this.angle = 0;
        this.numCircles = 7;
        this.circles = (function init$Array () {
          let _d0 = SpinnerWidget$this.numCircles;
          return (new Main_$this.QEDArray((function l (pos) {
            let index = pos[0];
            return (new SpinnerWidget$this.Circle(index, SpinnerWidget$this));
          }), 1, new Main_$this.QEDExplicitArray(0, 0), Main_$this.Qui_).insert(new Main_$this.QEDExplicitArray(0), new Main_$this.QEDExplicitArray(_d0)));
        })();
        (function while151$_ () {
          if (true) {
            SpinnerWidget$this.blocking__Call = _bindHandler(new Main_$this.QedAnimation(SpinnerWidget$this.context__Call), (function Lambda_ (_ret) {
              if (!SpinnerWidget$this._isActive())
                return;
              SpinnerWidget$this._qedEndCall();
              SpinnerWidget$this.angle = _ret / 2000 * 2 * 3.141593;
              while151$_();
            }));
          }
          else
            SpinnerWidget$this.qedModel = null;
        })();
      }
    };
    this.getTimestamp = function () {
      const date = new Date();
      let minutes = date.getMinutes();
      return ((date.getHours()) + ":" + ((minutes < 10 ? "0" : "")) + minutes);
    };
    this.formatMoney = function (amount) {
      let dollars = Math.trunc(amount);
      let cents = Math.round((amount - dollars) * 100);
      return ("$" + dollars + "." + ((cents < 10 ? "0" : "")) + cents);
    };
    this.NumTacosWidget = class NumTacosWidget extends QEDObject {
      constructor(context__Call) {
        super(context__Call);
        const NumTacosWidget$this = this;
        this.NumButton = class NumButton extends QEDObject {
          constructor(num, context__Call) {
            super(context__Call);
            this.num = num;
            const NumButton$this = this;
            this.showTacos = function (x, y, width, height) {
              Main$this.displayTacos(x, y, width, height, NumButton$this.num);
            };
            this.refresh_Model_ = function () {
              if (!NumButton$this.qedModel) {
                let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null)), new Main_$this.QEDExplicitArray());
                NumButton$this.qedModel = new Main_$this.QEDExplicitArray(u1);
              }
              let u1 = NumButton$this.qedModel[0];
              u1.clearChange();
              u1.setAtt(0, NumButton$this.button);
              u1.refreshSubModel();
              u1.refreshChange();
              let _level = u1.getChangeLevel();
              return _level;
            };
            this.button = _bindHandler(new Main_$this.QedRectButton((class L  extends QEDObject {
              constructor(context__Call) {
                super(context__Call);
                const L$this = this;
                this.refresh_Model_ = function () {
                  if (!L$this.qedModel) {
                    let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null)), new Main_$this.QEDExplicitArray());
                    let u2 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 3, null), new Main_$this.Attr_(1, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null), new Main_$this.Attr_(12, 0, 1, null), new Main_$this.Attr_(10, 1, -1, null)), new Main_$this.QEDExplicitArray());
                    let u3 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 1, -1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray(u2));
                    let u4 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(5, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null), new Main_$this.Attr_(12, 0, 1, null)), new Main_$this.QEDExplicitArray());
                    let u5 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(), new Main_$this.QEDExplicitArray(u3, u4));
                    let u6 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null)), new Main_$this.QEDExplicitArray());
                    let u7 = new Main_$this.Directive_(2, new Main_$this.QEDExplicitArray(), new Main_$this.QEDExplicitArray(u1, u5, u6));
                    L$this.qedModel = new Main_$this.QEDExplicitArray(u7);
                  }
                  let u1 = L$this.qedModel[0];
                  u1.clearChange();
                  let u4 = u1.children[0];
                  u4.setAtt(0, 15);
                  let u3 = u1.children[1];
                  let u6 = u3.children[0];
                  u6.setAtt(0, new Main_$this.QEDExplicitArray(175, 70));
                  u6.setAtt(1, ((50) / 100));
                  let u7 = u6.children[0];
                  u7.setAtt(0, NumButton$this.showTacos);
                  u7.setAtt(1, 70);
                  u7.setAtt(2, ((50) / 100));
                  u7.setAtt(3, "#D0D6CA");
                  u7.setAtt(4, new Main_$this.QEDExplicitArray(0, -20));
                  let u5 = u3.children[1];
                  u5.setAtt(0, NumButton$this.num);
                  u5.setAtt(1, 100);
                  u5.setAtt(2, ((50) / 100));
                  u5.setAtt(3, "white");
                  let u2 = u1.children[2];
                  u2.setAtt(0, 15);
                  u1.refreshChange();
                  let _level = u1.getChangeLevel();
                  return _level;
                };
                this.qedModel = null;
              }
            }), NumButton$this), (function Lambda_ () {
              if (!NumButton$this._isActive())
                return;
              {
                Main_$this.post_(NumButton$this, null);
                return;
              }
            }));
            this.qedModel = null;
          }
        };
        this.refresh_Model_ = function () {
          if (!NumTacosWidget$this.qedModel) {
            let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u2 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u3 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u4 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 1, 0, null), new Main_$this.Attr_(6, 0, 1, null), new Main_$this.Attr_(16, 0, 1, null), new Main_$this.Attr_(5, 0, 1, null), new Main_$this.Attr_(12, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u5 = new Main_$this.Directive_(2, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(8, 1, -1, null)), new Main_$this.QEDExplicitArray(u1, u2, u3, u4));
            NumTacosWidget$this.qedModel = new Main_$this.QEDExplicitArray(u5);
          }
          let u1 = NumTacosWidget$this.qedModel[0];
          u1.clearChange();
          u1.setAtt(0, new Main_$this.QEDExplicitArray(((50) / 100), 0));
          let u5 = u1.children[0];
          u5.setAtt(0, 50);
          let u4 = u1.children[1];
          u4.setAtt(0, "How many tacos do you want?");
          u4.setAtt(1, ((50) / 100));
          let u3 = u1.children[2];
          u3.setAtt(0, 50);
          let u2 = u1.children[3];
          u2.setAtt(0, NumTacosWidget$this.numTacosButtonArray);
          u2.setAtt(1, 15);
          u2.setAtt(2, 15);
          u2.setAtt(3, 15);
          u2.setAtt(4, "#B1BBA8");
          Main_$this.pushAttribute_$_$(6, u2.atts[1].value);
          Main_$this.pushAttribute_$_$(5, u2.atts[3].value);
          u2.refreshSubModel();
          Main_$this.popAttribute(5);
          Main_$this.popAttribute(6);
          u1.refreshChange();
          let _level = u1.getChangeLevel();
          return _level;
        };
        this.numTacosButtonArray = (function init$Array () {
          let _d0 = 4;
          return (new Main_$this.QEDArray((function l (pos) {
            let index = pos[0];
            return (_bindHandler(new NumTacosWidget$this.NumButton(index + 1, NumTacosWidget$this), (function Lambda_ () {
              if (!NumTacosWidget$this._isActive())
                return;
              {
                Main_$this.post_(NumTacosWidget$this, index + 1);
                return;
              }
            })));
          }), 1, new Main_$this.QEDExplicitArray(1, 0), Main_$this.Qui_).insert(new Main_$this.QEDExplicitArray(0), new Main_$this.QEDExplicitArray(_d0)));
        })();
        this.qedModel = null;
      }
    };
    this.RoomNumberWidget = class RoomNumberWidget extends QEDObject {
      constructor(context__Call) {
        super(context__Call);
        const RoomNumberWidget$this = this;
        this.refresh_Model_ = function () {
          if (!RoomNumberWidget$this.qedModel) {
            let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u2 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(5, 0, 1, null), new Main_$this.Attr_(12, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u3 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 3, null), new Main_$this.Attr_(1, 1, -1, null), new Main_$this.Attr_(12, 0, 1, null), new Main_$this.Attr_(16, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray(u2));
            let u4 = new Main_$this.Directive_(2, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(8, 1, -1, null)), new Main_$this.QEDExplicitArray(u1, u3));
            let u5 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null), new Main_$this.Attr_(9, 1, -1, null)), new Main_$this.QEDExplicitArray(u4));
            let u6 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null), new Main_$this.Attr_(5, 0, 1, null), new Main_$this.Attr_(6, 0, 1, null), new Main_$this.Attr_(16, 0, 1, null), new Main_$this.Attr_(12, 0, 1, null), new Main_$this.Attr_(8, 1, -1, null)), new Main_$this.QEDExplicitArray());
            let u7 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null), new Main_$this.Attr_(9, 1, -1, null)), new Main_$this.QEDExplicitArray(u6));
            let u8 = new Main_$this.Directive_(1, new Main_$this.QEDExplicitArray(), new Main_$this.QEDExplicitArray(u5, u7));
            let u9 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null), new Main_$this.Attr_(5, 0, 1, null), new Main_$this.Attr_(12, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null), new Main_$this.Attr_(10, 0, 1, null), new Main_$this.Attr_(9, 0, 1, null)), new Main_$this.QEDExplicitArray());
            RoomNumberWidget$this.qedModel = new Main_$this.QEDExplicitArray(u8, u9);
          }
          let u2 = RoomNumberWidget$this.qedModel[0];
          u2.clearChange();
          let u4 = u2.children[0];
          u4.setAtt(0, 0);
          u4.setAtt(1, new Main_$this.QEDExplicitArray(((50) / 100), ((100) / 100)));
          let u5 = u4.children[0];
          u5.setAtt(0, new Main_$this.QEDExplicitArray(((90) / 100), ((30) / 100)));
          let u7 = u5.children[0];
          u7.setAtt(0, "Type your room number");
          u7.setAtt(1, ((50) / 100));
          let u6 = u5.children[1];
          u6.setAtt(0, Main_$this.roundRect);
          u6.setAtt(1, new Main_$this.QEDExplicitArray(300, 40));
          u6.setAtt(2, "#DDD1E7");
          u6.setAtt(3, 20);
          u6.setAtt(4, ((50) / 100));
          let u8 = u6.children[0];
          u8.setAtt(0, RoomNumberWidget$this.roomNumber);
          u8.setAtt(1, 30);
          u8.setAtt(2, "#58535C");
          u8.setAtt(3, ((50) / 100));
          let u3 = u2.children[1];
          u3.setAtt(0, 0);
          u3.setAtt(1, new Main_$this.QEDExplicitArray(((50) / 100), ((100) / 100)));
          let u9 = u3.children[0];
          u9.setAtt(0, RoomNumberWidget$this.numericKeyboard);
          u9.setAtt(1, 40);
          u9.setAtt(2, 10);
          u9.setAtt(3, 20);
          u9.setAtt(4, "#AB8EC4");
          u9.setAtt(5, new Main_$this.QEDExplicitArray(((10) / 100), ((30) / 100)));
          Main_$this.pushAttribute_$_$(5, u9.atts[1].value);
          Main_$this.pushAttribute_$_$(6, u9.atts[2].value);
          u9.refreshSubModel();
          Main_$this.popAttribute(6);
          Main_$this.popAttribute(5);
          u2.refreshChange();
          let _level = u2.getChangeLevel();
          let u1 = RoomNumberWidget$this.qedModel[1];
          u1.clearChange();
          u1.setAtt(0, RoomNumberWidget$this.nextButton);
          u1.setAtt(1, 25);
          u1.setAtt(2, "#98C694");
          u1.setAtt(3, ((100) / 100));
          u1.setAtt(4, -25);
          u1.setAtt(5, ((5) / 100));
          Main_$this.pushAttribute_$_$(5, u1.atts[1].value);
          u1.refreshSubModel();
          Main_$this.popAttribute(5);
          u1.refreshChange();
          _level = Main_$this.max(_level, u1.getChangeLevel());
          return _level;
        };
        this.roomNumber = "";
        this.numericKeyboard = _bindHandler(new Main$this.NumericKeyboardWidget(RoomNumberWidget$this), (function Lambda_ (_ret) {
          if (!RoomNumberWidget$this._isActive())
            return;
          (RoomNumberWidget$this.roomNumber = _ret)
        }));
        this.nextButton = _bindHandler(new Main_$this.QedTextButton("Next", RoomNumberWidget$this), (function Lambda_ (_ret) {
          if (!RoomNumberWidget$this._isActive())
            return;
          {
            Main_$this.post_(RoomNumberWidget$this, RoomNumberWidget$this.roomNumber);
            return;
          }
        }));
        this.qedModel = null;
      }
    };
    this.GuestNameWidget = class GuestNameWidget extends QEDObject {
      constructor(context__Call) {
        super(context__Call);
        const GuestNameWidget$this = this;
        this.refresh_Model_ = function () {
          if (!GuestNameWidget$this.qedModel) {
            let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u2 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(5, 0, 1, null), new Main_$this.Attr_(12, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u3 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 3, null), new Main_$this.Attr_(1, 1, -1, null), new Main_$this.Attr_(12, 0, 1, null), new Main_$this.Attr_(16, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray(u2));
            let u4 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u5 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null), new Main_$this.Attr_(5, 0, 1, null), new Main_$this.Attr_(6, 0, 1, null), new Main_$this.Attr_(16, 0, 1, null), new Main_$this.Attr_(12, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u6 = new Main_$this.Directive_(2, new Main_$this.QEDExplicitArray(), new Main_$this.QEDExplicitArray(u1, u3, u4, u5));
            let u7 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null), new Main_$this.Attr_(5, 0, 1, null), new Main_$this.Attr_(12, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null), new Main_$this.Attr_(10, 0, 1, null), new Main_$this.Attr_(9, 0, 1, null)), new Main_$this.QEDExplicitArray());
            GuestNameWidget$this.qedModel = new Main_$this.QEDExplicitArray(u6, u7);
          }
          let u2 = GuestNameWidget$this.qedModel[0];
          u2.clearChange();
          let u6 = u2.children[0];
          u6.setAtt(0, 25);
          let u5 = u2.children[1];
          u5.setAtt(0, Main_$this.roundRect);
          u5.setAtt(1, new Main_$this.QEDExplicitArray(430, 40));
          u5.setAtt(2, "#B4CFFA");
          u5.setAtt(3, 20);
          u5.setAtt(4, ((50) / 100));
          let u7 = u5.children[0];
          u7.setAtt(0, (GuestNameWidget$this.zipCode.length ? GuestNameWidget$this.zipCode : "Enter the guest's family name"));
          u7.setAtt(1, 30);
          u7.setAtt(2, "#7D90AF");
          u7.setAtt(3, ((50) / 100));
          let u4 = u2.children[2];
          u4.setAtt(0, 25);
          let u3 = u2.children[3];
          u3.setAtt(0, GuestNameWidget$this.alphaKeyboard);
          u3.setAtt(1, 30);
          u3.setAtt(2, 10);
          u3.setAtt(3, 6);
          u3.setAtt(4, "#7D90AF");
          Main_$this.pushAttribute_$_$(5, u3.atts[1].value);
          Main_$this.pushAttribute_$_$(6, u3.atts[2].value);
          u3.refreshSubModel();
          Main_$this.popAttribute(6);
          Main_$this.popAttribute(5);
          u2.refreshChange();
          let _level = u2.getChangeLevel();
          let u1 = GuestNameWidget$this.qedModel[1];
          u1.clearChange();
          u1.setAtt(0, GuestNameWidget$this.nextButton);
          u1.setAtt(1, 25);
          u1.setAtt(2, "#98C694");
          u1.setAtt(3, ((100) / 100));
          u1.setAtt(4, -25);
          u1.setAtt(5, ((5) / 100));
          Main_$this.pushAttribute_$_$(5, u1.atts[1].value);
          u1.refreshSubModel();
          Main_$this.popAttribute(5);
          u1.refreshChange();
          _level = Main_$this.max(_level, u1.getChangeLevel());
          return _level;
        };
        this.zipCode = "";
        this.alphaKeyboard = _bindHandler(new Main$this.AlphaKeyboardWidget(GuestNameWidget$this), (function Lambda_ (_ret) {
          if (!GuestNameWidget$this._isActive())
            return;
          (GuestNameWidget$this.zipCode = _ret)
        }));
        this.nextButton = _bindHandler(new Main_$this.QedTextButton("Next", GuestNameWidget$this), (function Lambda_ (_ret) {
          if (!GuestNameWidget$this._isActive())
            return;
          {
            Main_$this.post_(GuestNameWidget$this, GuestNameWidget$this.zipCode);
            return;
          }
        }));
        this.qedModel = null;
      }
    };
    this.Widget = class Widget extends QEDObject {
      constructor(context__Call) {
        super(context__Call);
        const Widget$this = this;
        this.refresh_Model_ = function () {
          if (!Widget$this.qedModel) {
            let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null)), new Main_$this.QEDExplicitArray());
            Widget$this.qedModel = new Main_$this.QEDExplicitArray(u1);
          }
          let u1 = Widget$this.qedModel[0];
          u1.clearChange();
          u1.setAtt(0, "");
          u1.refreshChange();
          let _level = u1.getChangeLevel();
          return _level;
        };
        this.qedModel = null;
      }
    };
    this.TransactionEntry = class TransactionEntry extends QEDObject {
      constructor(context__Call) {
        super(context__Call);
        const TransactionEntry$this = this;
        this.getPrice = function () {
          return (Main$this.formatMoney(TransactionEntry$this.tacoPrice));
        };
        this.getTotal = function () {
          return (Main$this.formatMoney(TransactionEntry$this.numTacos * TransactionEntry$this.tacoPrice));
        };
        this.numTacos = 0;
        this.tacoPrice = 3.050000;
        this.guestName = "";
        this.roomNumber = "";
      }
    };
    this.SummaryWidget = class SummaryWidget extends QEDObject {
      constructor(entry, context__Call) {
        super(context__Call);
        this.entry = entry;
        const SummaryWidget$this = this;
        this.refresh_Model_ = function () {
          if (!SummaryWidget$this.qedModel) {
            let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 3, null), new Main_$this.Attr_(9, 0, 1, null), new Main_$this.Attr_(12, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u2 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u3 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u4 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u5 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u6 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u7 = new Main_$this.Directive_(2, new Main_$this.QEDExplicitArray(), new Main_$this.QEDExplicitArray(u2, u3, u4, u5, u6));
            let u8 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(), new Main_$this.QEDExplicitArray(u1, u7));
            let u9 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 3, null), new Main_$this.Attr_(9, 0, 1, null), new Main_$this.Attr_(12, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u10 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u11 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u12 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u13 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u14 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u15 = new Main_$this.Directive_(2, new Main_$this.QEDExplicitArray(), new Main_$this.QEDExplicitArray(u10, u11, u12, u13, u14));
            let u16 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(), new Main_$this.QEDExplicitArray(u9, u15));
            let u17 = new Main_$this.Directive_(1, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(8, 0, 1, null), new Main_$this.Attr_(5, 0, 1, null), new Main_$this.Attr_(12, 0, 1, null)), new Main_$this.QEDExplicitArray(u8, u16));
            let u18 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null), new Main_$this.Attr_(5, 0, 1, null), new Main_$this.Attr_(12, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null), new Main_$this.Attr_(10, 0, 1, null), new Main_$this.Attr_(9, 0, 1, null)), new Main_$this.QEDExplicitArray());
            SummaryWidget$this.qedModel = new Main_$this.QEDExplicitArray(u17, u18);
          }
          let u2 = SummaryWidget$this.qedModel[0];
          u2.clearChange();
          u2.setAtt(0, ((50) / 100));
          u2.setAtt(1, 30);
          u2.setAtt(2, "white");
          Main_$this.pushAttribute_$_$(5, u2.atts[1].value);
          let u4 = u2.children[0];
          let u6 = u4.children[0];
          u6.setAtt(0, Main_$this.rect);
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
          u13.setAtt(0, Main_$this.rect);
          u13.setAtt(1, ((100) / 100));
          u13.setAtt(2, "#AC837F");
          let u12 = u3.children[1];
          let u18 = u12.children[0];
          u18.setAtt(0, SummaryWidget$this.entry.guestName);
          u18.setAtt(1, ((100) / 100));
          let u17 = u12.children[1];
          u17.setAtt(0, SummaryWidget$this.entry.roomNumber);
          u17.setAtt(1, ((100) / 100));
          let u16 = u12.children[2];
          u16.setAtt(0, SummaryWidget$this.entry.numTacos);
          u16.setAtt(1, ((100) / 100));
          let u15 = u12.children[3];
          u15.setAtt(0, SummaryWidget$this.entry.getPrice());
          u15.setAtt(1, ((100) / 100));
          let u14 = u12.children[4];
          u14.setAtt(0, SummaryWidget$this.entry.getTotal());
          u14.setAtt(1, ((100) / 100));
          Main_$this.popAttribute(5);
          u2.refreshChange();
          let _level = u2.getChangeLevel();
          let u1 = SummaryWidget$this.qedModel[1];
          u1.clearChange();
          u1.setAtt(0, SummaryWidget$this.nextButton);
          u1.setAtt(1, 25);
          u1.setAtt(2, "#98C694");
          u1.setAtt(3, ((100) / 100));
          u1.setAtt(4, -25);
          u1.setAtt(5, ((5) / 100));
          Main_$this.pushAttribute_$_$(5, u1.atts[1].value);
          u1.refreshSubModel();
          Main_$this.popAttribute(5);
          u1.refreshChange();
          _level = Main_$this.max(_level, u1.getChangeLevel());
          return _level;
        };
        this.nextButton = _bindHandler(new Main_$this.QedTextButton("Confirm", SummaryWidget$this), (function Lambda_ (_ret) {
          if (!SummaryWidget$this._isActive())
            return;
          {
            Main_$this.post_(SummaryWidget$this, null);
            return;
          }
        }));
        this.qedModel = null;
      }
    };
    this.GetTransactionEntry = class GetTransactionEntry extends QEDObject {
      constructor(entry, context__Call) {
        super(context__Call);
        this.entry = entry;
        const GetTransactionEntry$this = this;
        this.Pane = class Pane extends QEDObject {
          constructor(title, widget, context__Call) {
            super(context__Call);
            this.title = title;
            this.widget = widget;
            const Pane$this = this;
            this.refresh_Model_ = function () {
              if (!Pane$this.qedModel) {
                let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null)), new Main_$this.QEDExplicitArray());
                Pane$this.qedModel = new Main_$this.QEDExplicitArray(u1);
              }
              let u1 = Pane$this.qedModel[0];
              u1.clearChange();
              u1.setAtt(0, Pane$this.widget);
              u1.refreshSubModel();
              u1.refreshChange();
              let _level = u1.getChangeLevel();
              return _level;
            };
            this.qedModel = null;
          }
        };
        this.TabLabel = class TabLabel extends QEDObject {
          constructor(pane, context__Call) {
            super(context__Call);
            this.pane = pane;
            const TabLabel$this = this;
            this.refresh_Model_ = function () {
              if (!TabLabel$this.qedModel) {
                let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null)), new Main_$this.QEDExplicitArray());
                TabLabel$this.qedModel = new Main_$this.QEDExplicitArray(u1);
              }
              let u1 = TabLabel$this.qedModel[0];
              u1.clearChange();
              u1.setAtt(0, TabLabel$this.button);
              u1.refreshSubModel();
              u1.refreshChange();
              let _level = u1.getChangeLevel();
              return _level;
            };
            this.text = "    " + (this.pane + 1) + "." + GetTransactionEntry$this.panes[this.pane].title + "    ";
            this.button = _bindHandler(new Main_$this.QedGenericButton((class L  extends QEDObject {
              constructor(pressed, context__Call) {
                super(context__Call);
                this.pressed = pressed;
                const L$this = this;
                this.refresh_Model_ = function () {
                  if (!L$this.qedModel) {
                    let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(15, 0, 1, null)), new Main_$this.QEDExplicitArray());
                    L$this.qedModel = new Main_$this.QEDExplicitArray(u1);
                  }
                  let u1 = L$this.qedModel[0];
                  u1.clearChange();
                  u1.setAtt(0, TabLabel$this.text);
                  u1.setAtt(1, (TabLabel$this.pane > GetTransactionEntry$this.maxIndex ? ((50) / 100) : (L$this.pressed[0] ? ((35) / 100) : ((100) / 100))));
                  u1.refreshChange();
                  let _level = u1.getChangeLevel();
                  return _level;
                };
                this.qedModel = null;
              }
            }), TabLabel$this), (function Lambda_ () {
              if (!TabLabel$this._isActive())
                return;
              if (TabLabel$this.pane <= GetTransactionEntry$this.maxIndex) {
                Main_$this.post_(TabLabel$this, null);
                return;
              }
            }));
            this.qedModel = null;
          }
        };
        this.NextPane = class NextPane extends QEDObject {
          constructor(context__Call) {
            super(context__Call);
            const NextPane$this = this;
            NextPane$this.blocking__Call = _bindHandler(new GetTransactionEntry$this.SetPane(GetTransactionEntry$this.paneIndex + 1, NextPane$this.context__Call), (function Lambda_ () {
              if (!NextPane$this._isActive())
                return;
              NextPane$this._qedEndCall();
              {
                Main_$this.post_(NextPane$this, null);
                return;
              }
            }));
          }
        };
        this.SetPane = class SetPane extends QEDObject {
          constructor(index, context__Call) {
            super(context__Call);
            this.index = index;
            const SetPane$this = this;
            GetTransactionEntry$this.bounds = Main_$this.getBounds(new Main_$this.QEDExplicitArray("application", "titles"), new Main_$this.QEDExplicitArray(this.index));
            GetTransactionEntry$this.paneIndex = this.index;
            GetTransactionEntry$this.maxIndex = Main_$this.max(GetTransactionEntry$this.maxIndex, GetTransactionEntry$this.paneIndex);
            {
              Main_$this.post_(SetPane$this, null);
              return;
            }
          }
        };
        this.refresh_Model_ = function () {
          if (!GetTransactionEntry$this.qedModel) {
            let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 3, null), new Main_$this.Attr_(10, 1, -1, null), new Main_$this.Attr_(1, 1, -1, null), new Main_$this.Attr_(12, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u2 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 1, 0, null), new Main_$this.Attr_(12, 0, 1, null), new Main_$this.Attr_(5, 0, 1, null), new Main_$this.Attr_(2, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u3 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null), new Main_$this.Attr_(9, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u4 = new Main_$this.Directive_(2, new Main_$this.QEDExplicitArray(), new Main_$this.QEDExplicitArray(u2, u3));
            GetTransactionEntry$this.qedModel = new Main_$this.QEDExplicitArray(u1, u4);
          }
          let u2 = GetTransactionEntry$this.qedModel[0];
          u2.clearChange();
          u2.setAtt(0, Main$this.displaySlider);
          u2.setAtt(1, new Main_$this.QEDExplicitArray(GetTransactionEntry$this.bounds[0], -1));
          u2.setAtt(2, new Main_$this.QEDExplicitArray(GetTransactionEntry$this.bounds[2], GetTransactionEntry$this.bounds[3] + 1));
          u2.setAtt(3, "#BEB8B0");
          u2.setAtt(4, 0);
          u2.refreshChange();
          let _level = u2.getChangeLevel();
          let u1 = GetTransactionEntry$this.qedModel[1];
          u1.clearChange();
          let u4 = u1.children[0];
          u4.setAtt(0, GetTransactionEntry$this.titles);
          u4.setAtt(1, "#77736E");
          u4.setAtt(2, 20);
          u4.setAtt(3, "titles");
          Main_$this.pushAttribute_$_$(5, u4.atts[2].value);
          u4.refreshSubModel();
          Main_$this.popAttribute(5);
          let u3 = u1.children[1];
          u3.setAtt(0, GetTransactionEntry$this.panes[GetTransactionEntry$this.paneIndex]);
          u3.setAtt(1, ((100) / 100));
          u3.refreshSubModel();
          u1.refreshChange();
          _level = Main_$this.max(_level, u1.getChangeLevel());
          return _level;
        };
        this.oldIndex = 0;
        this.paneIndex = 0;
        this.maxIndex = this.paneIndex;
        this.bounds = new Main_$this.QEDExplicitArray(0, 0, 0, 0);
        this.panes = new Main_$this.QEDExplicitArray(new this.Pane("Count", (_bindHandler(new Main$this.NumTacosWidget(GetTransactionEntry$this), (function Lambda_ (_ret) {
          if (!GetTransactionEntry$this._isActive())
            return;
          {
            GetTransactionEntry$this.entry.numTacos = _ret;
            GetTransactionEntry$this.blocking__Call = _bindHandler(new GetTransactionEntry$this.NextPane(GetTransactionEntry$this.context__Call), (function Lambda_ () {
              if (!GetTransactionEntry$this._isActive())
                return;
              GetTransactionEntry$this._qedEndCall();
            }));
          }
        }))), GetTransactionEntry$this), new this.Pane("Room", (_bindHandler(new Main$this.RoomNumberWidget(GetTransactionEntry$this), (function Lambda_ (_ret) {
          if (!GetTransactionEntry$this._isActive())
            return;
          {
            GetTransactionEntry$this.entry.roomNumber = _ret;
            GetTransactionEntry$this.blocking__Call = _bindHandler(new GetTransactionEntry$this.NextPane(GetTransactionEntry$this.context__Call), (function Lambda_ () {
              if (!GetTransactionEntry$this._isActive())
                return;
              GetTransactionEntry$this._qedEndCall();
            }));
          }
        }))), GetTransactionEntry$this), new this.Pane("Guest", (_bindHandler(new Main$this.GuestNameWidget(GetTransactionEntry$this), (function Lambda_ (_ret) {
          if (!GetTransactionEntry$this._isActive())
            return;
          {
            GetTransactionEntry$this.entry.guestName = _ret;
            GetTransactionEntry$this.blocking__Call = _bindHandler(new GetTransactionEntry$this.NextPane(GetTransactionEntry$this.context__Call), (function Lambda_ () {
              if (!GetTransactionEntry$this._isActive())
                return;
              GetTransactionEntry$this._qedEndCall();
            }));
          }
        }))), GetTransactionEntry$this), new this.Pane("Summary", (_bindHandler(new Main$this.SummaryWidget(this.entry, GetTransactionEntry$this), (function Lambda_ () {
          if (!GetTransactionEntry$this._isActive())
            return;
          {
            Main$this.exitHandler.pop();
            {
              Main_$this.post_(GetTransactionEntry$this, true);
              return;
            }
          }
        }))), GetTransactionEntry$this));
        this.titles = (function init$Array () {
          let _d0 = GetTransactionEntry$this.panes.size();
          return (new Main_$this.QEDArray((function l (pos) {
            let pane = pos[0];
            return (_bindHandler((new GetTransactionEntry$this.TabLabel(pane, GetTransactionEntry$this)), (function Lambda_ () {
              if (!GetTransactionEntry$this._isActive())
                return;
              GetTransactionEntry$this.blocking__Call = _bindHandler(new GetTransactionEntry$this.SetPane(pane, GetTransactionEntry$this.context__Call), (function Lambda_ () {
                if (!GetTransactionEntry$this._isActive())
                  return;
                GetTransactionEntry$this._qedEndCall();
              }));
            })));
          }), 1, new Main_$this.QEDExplicitArray(1, 0), Main_$this.Qui_).insert(new Main_$this.QEDExplicitArray(0), new Main_$this.QEDExplicitArray(_d0)));
        })();
        Main$this.exitHandler[0] = _bindHandler(new Main_$this.QedYield(GetTransactionEntry$this), (function Lambda_ (_ret) {
          if (!GetTransactionEntry$this._isActive())
            return;
          {
            Main$this.exitHandler.pop();
            {
              Main_$this.post_(GetTransactionEntry$this, false);
              return;
            }
          }
        }));
        GetTransactionEntry$this.blocking__Call = _bindHandler(new Main_$this.QedTimer(1, GetTransactionEntry$this.context__Call), (function Lambda_ (_ret) {
          if (!GetTransactionEntry$this._isActive())
            return;
          GetTransactionEntry$this._qedEndCall();
          GetTransactionEntry$this.blocking__Call = _bindHandler(new GetTransactionEntry$this.SetPane(0, GetTransactionEntry$this.context__Call), (function Lambda_ () {
            if (!GetTransactionEntry$this._isActive())
              return;
            GetTransactionEntry$this._qedEndCall();
            GetTransactionEntry$this.qedModel = null;
          }));
        }));
      }
    };
    this.OrderTacos = class OrderTacos extends QEDObject {
      constructor(transactionEntry, context__Call) {
        super(context__Call);
        this.transactionEntry = transactionEntry;
        const OrderTacos$this = this;
        this.refresh_Model_ = function () {
          if (!OrderTacos$this.qedModel) {
            let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u2 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u3 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u4 = new Main_$this.Directive_(2, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(12, 0, 1, null), new Main_$this.Attr_(15, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray(u1, u2, u3));
            OrderTacos$this.qedModel = new Main_$this.QEDExplicitArray(u4);
          }
          let u1 = OrderTacos$this.qedModel[0];
          u1.clearChange();
          u1.setAtt(0, "black");
          u1.setAtt(1, ((60) / 100));
          u1.setAtt(2, ((50) / 100));
          let u4 = u1.children[0];
          u4.setAtt(0, OrderTacos$this.spinner);
          u4.setAtt(1, ((50) / 100));
          u4.refreshSubModel();
          let u3 = u1.children[1];
          u3.setAtt(0, 25);
          let u2 = u1.children[2];
          u2.setAtt(0, "Ordering tacos... please wait.");
          u2.setAtt(1, ((50) / 100));
          u1.refreshChange();
          let _level = u1.getChangeLevel();
          return _level;
        };
        this.spinner = new Main$this.SpinnerWidget(OrderTacos$this);
        OrderTacos$this.blocking__Call = _bindHandler(new Main_$this.QedTimer(5000, OrderTacos$this.context__Call), (function Lambda_ (_ret) {
          if (!OrderTacos$this._isActive())
            return;
          OrderTacos$this._qedEndCall();
          {
            Main_$this.post_(OrderTacos$this, true);
            return;
          }
          OrderTacos$this.qedModel = null;
        }));
      }
    };
    this.DisplaySuccess = class DisplaySuccess extends QEDObject {
      constructor(total, context__Call) {
        super(context__Call);
        this.total = total;
        const DisplaySuccess$this = this;
        this.refresh_Model_ = function () {
          if (!DisplaySuccess$this.qedModel) {
            let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u2 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u3 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u4 = new Main_$this.Directive_(2, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(12, 0, 1, null), new Main_$this.Attr_(15, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray(u1, u2, u3));
            DisplaySuccess$this.qedModel = new Main_$this.QEDExplicitArray(u4);
          }
          let u1 = DisplaySuccess$this.qedModel[0];
          u1.clearChange();
          u1.setAtt(0, "black");
          u1.setAtt(1, ((60) / 100));
          u1.setAtt(2, ((50) / 100));
          let u4 = u1.children[0];
          u4.setAtt(0, "A total of " + DisplaySuccess$this.total + " has been added to your hotel invoice.");
          u4.setAtt(1, ((50) / 100));
          let u3 = u1.children[1];
          u3.setAtt(0, 25);
          let u2 = u1.children[2];
          u2.setAtt(0, "Thank you for choosing the Taco Hotel for your stay.");
          u2.setAtt(1, ((50) / 100));
          u1.refreshChange();
          let _level = u1.getChangeLevel();
          return _level;
        };
        DisplaySuccess$this.blocking__Call = _bindHandler(new Main_$this.QedTimer(5000, DisplaySuccess$this.context__Call), (function Lambda_ (_ret) {
          if (!DisplaySuccess$this._isActive())
            return;
          DisplaySuccess$this._qedEndCall();
          {
            Main_$this.post_(DisplaySuccess$this, null);
            return;
          }
          DisplaySuccess$this.qedModel = null;
        }));
      }
    };
    this.MainScreen = class MainScreen extends QEDObject {
      constructor(context__Call) {
        super(context__Call);
        const MainScreen$this = this;
        this.refresh_Model_ = function () {
          if (!MainScreen$this.qedModel) {
            let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u2 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null), new Main_$this.Attr_(9, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u3 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u4 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null), new Main_$this.Attr_(9, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u5 = new Main_$this.Directive_(2, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(5, 0, 1, null), new Main_$this.Attr_(9, 0, 1, null)), new Main_$this.QEDExplicitArray(u2, u3, u4));
            let u6 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u7 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null), new Main_$this.Attr_(5, 0, 1, null), new Main_$this.Attr_(9, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u8 = new Main_$this.Directive_(1, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(9, 0, 1, null), new Main_$this.Attr_(16, 0, 1, null)), new Main_$this.QEDExplicitArray(u5, u6, u7));
            let u9 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 0, 1, null)), new Main_$this.QEDExplicitArray());
            let u10 = new Main_$this.Directive_(3, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(12, 0, 1, null)), new Main_$this.QEDExplicitArray(u1, u8, u9));
            MainScreen$this.qedModel = new Main_$this.QEDExplicitArray(u10);
          }
          let u1 = MainScreen$this.qedModel[0];
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
          Main_$this.pushAttribute_$_$(5, u7.atts[0].value);
          let u10 = u7.children[0];
          u10.setAtt(0, MainScreen$this.roomServiceButton);
          u10.setAtt(1, ((100) / 100));
          u10.refreshSubModel();
          let u9 = u7.children[1];
          u9.setAtt(0, 15);
          let u8 = u7.children[2];
          u8.setAtt(0, MainScreen$this.moreTowelsButton);
          u8.setAtt(1, ((100) / 100));
          u8.refreshSubModel();
          Main_$this.popAttribute(5);
          let u6 = u3.children[1];
          u6.setAtt(0, 15);
          let u5 = u3.children[2];
          u5.setAtt(0, MainScreen$this.buyTacosButton);
          u5.setAtt(1, 30);
          u5.setAtt(2, ((100) / 100));
          Main_$this.pushAttribute_$_$(5, u5.atts[1].value);
          u5.refreshSubModel();
          Main_$this.popAttribute(5);
          let u2 = u1.children[2];
          u2.setAtt(0, 15);
          u1.refreshChange();
          let _level = u1.getChangeLevel();
          return _level;
        };
        this.buyTacosButton = _bindHandler(new Main$this.ObjectOverTextButton(Main$this.showTwoTacos, "Order tacos!!", MainScreen$this), (function Lambda_ () {
          if (!MainScreen$this._isActive())
            return;
          {
            Main_$this.post_(MainScreen$this, 1);
            return;
          }
        }));
        this.roomServiceButton = _bindHandler(new Main$this.ObjectBeforeTextButton(Main$this.displaySlider, "Room service", MainScreen$this), (function Lambda_ () {
          if (!MainScreen$this._isActive())
            return;
          {
            Main_$this.post_(MainScreen$this, 2);
            return;
          }
        }));
        this.moreTowelsButton = _bindHandler(new Main$this.ObjectBeforeTextButton(Main$this.displaySlider, "Late checkout", MainScreen$this), (function Lambda_ () {
          if (!MainScreen$this._isActive())
            return;
          {
            Main_$this.post_(MainScreen$this, 3);
            return;
          }
        }));
        this.qedModel = null;
      }
    };
    this.Application = class Application extends QEDObject {
      constructor(context__Call) {
        super(context__Call);
        const Application$this = this;
        this.refresh_Model_ = function () {
          if (!Application$this.qedModel) {
            let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(9, 0, 1, null), new Main_$this.Attr_(-1, 0, -1, (function W3$_ () {
              0;
            })), new Main_$this.Attr_(-2, 0, -1, (function W4$_ () {
              0;
            }))), new Main_$this.QEDExplicitArray());
            Application$this.qedModel = new Main_$this.QEDExplicitArray(u1);
          }
          let u1 = Application$this.qedModel[0];
          u1.clearChange();
          u1.setAtt(0, "");
          u1.setAtt(1, ((100) / 100));
          u1.refreshChange();
          let _level = u1.getChangeLevel();
          return _level;
        };
        (function while190$_ () {
          if (true) {
            Application$this.blocking__Call = _bindHandler(new Main$this.MainScreen(Application$this.context__Call), (function Lambda_ (_ret) {
              if (!Application$this._isActive())
                return;
              Application$this._qedEndCall();
              let choice = _ret;
              new (function W200$_ (i191$_) {
                this.i191$_ = i191$_;
                if (choice === 1) {
                  let entry = new Main$this.TransactionEntry(Application$this);
                  Application$this.blocking__Call = _bindHandler(new Main$this.GetTransactionEntry(entry, Application$this.context__Call), (function Lambda_ (_ret) {
                    if (!Application$this._isActive())
                      return;
                    Application$this._qedEndCall();
                    new (function W197$_ (i192$_) {
                      this.i192$_ = i192$_;
                      if (_ret) {
                        Application$this.blocking__Call = _bindHandler(new Main$this.OrderTacos(entry, Application$this.context__Call), (function Lambda_ (_ret) {
                          if (!Application$this._isActive())
                            return;
                          Application$this._qedEndCall();
                          new (function W195$_ (i193$_) {
                            this.i193$_ = i193$_;
                            if (_ret)
                              Application$this.blocking__Call = _bindHandler(new Main$this.DisplaySuccess(entry.getTotal(), Application$this.context__Call), (function Lambda_ () {
                                if (!Application$this._isActive())
                                  return;
                                Application$this._qedEndCall();
                                i193$_();
                              }));
                            else {
                              {
                              }
                              i193$_();
                            }
                          })((function c194$_ () {
                            i192$_();
                          }));
                        }));
                      }
                      else
                        i192$_();
                    })((function c196$_ () {
                      i191$_();
                    }));
                  }));
                }
                else {
                  if (choice === 2) {
                  }
                  else {
                  }
                  i191$_();
                }
              })((function c199$_ () {
                while190$_();
              }));
            }));
          }
          else
            Application$this.qedModel = null;
        })();
      }
    };
    this.refresh_Model_ = function () {
      if (!Main$this.qedModel) {
        let u1 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(5, 0, 1, null), new Main_$this.Attr_(12, 0, 1, null), new Main_$this.Attr_(8, 1, -1, null), new Main_$this.Attr_(10, 1, -1, null)), new Main_$this.QEDExplicitArray());
        let u2 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 1, null), new Main_$this.Attr_(5, 0, 1, null), new Main_$this.Attr_(12, 0, 1, null), new Main_$this.Attr_(8, 0, 1, null)), new Main_$this.QEDExplicitArray());
        let u3 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null), new Main_$this.Attr_(12, 0, 1, null), new Main_$this.Attr_(8, 1, -1, null), new Main_$this.Attr_(10, 1, -1, null), new Main_$this.Attr_(9, 1, -1, null)), new Main_$this.QEDExplicitArray());
        let u4 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 3, null), new Main_$this.Attr_(1, 1, -1, null), new Main_$this.Attr_(12, 0, 1, null), new Main_$this.Attr_(9, 1, -1, null)), new Main_$this.QEDExplicitArray(u1, u2, u3));
        let u5 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 3, null), new Main_$this.Attr_(12, 0, 1, null)), new Main_$this.QEDExplicitArray());
        let u6 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(0, 0, 0, null), new Main_$this.Attr_(2, 0, 1, null), new Main_$this.Attr_(12, 0, 1, null)), new Main_$this.QEDExplicitArray());
        let u7 = new Main_$this.Directive_(0, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(9, 0, 1, null)), new Main_$this.QEDExplicitArray(u5, u6));
        let u8 = new Main_$this.Directive_(2, new Main_$this.QEDExplicitArray(new Main_$this.Attr_(1, 1, -1, null)), new Main_$this.QEDExplicitArray(u4, u7));
        Main$this.qedModel = new Main_$this.QEDExplicitArray(u8);
      }
      let u1 = Main$this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, new Main_$this.QEDExplicitArray(800, 480));
      let u3 = u1.children[0];
      u3.setAtt(0, Main_$this.rect);
      u3.setAtt(1, new Main_$this.QEDExplicitArray(0, 60));
      u3.setAtt(2, "#BEB8B0");
      u3.setAtt(3, new Main_$this.QEDExplicitArray(((100) / 100), 0));
      let u6 = u3.children[0];
      u6.setAtt(0, Main$this.getTimestamp());
      u6.setAtt(1, 30);
      u6.setAtt(2, "#77736E");
      u6.setAtt(3, new Main_$this.QEDExplicitArray(((0) / 100), ((50) / 100)));
      u6.setAtt(4, new Main_$this.QEDExplicitArray(15, 0));
      let u5 = u3.children[1];
      u5.setAtt(0, "Taco Hotel");
      u5.setAtt(1, 35);
      u5.setAtt(2, "#77736E");
      u5.setAtt(3, ((50) / 100));
      let u4 = u3.children[2];
      u4.setAtt(0, (Main$this.exitHandler.size() ? Main$this.exit : Main$this.emptyWidget));
      u4.setAtt(1, "#973543");
      u4.setAtt(2, new Main_$this.QEDExplicitArray(((100) / 100), ((50) / 100)));
      u4.setAtt(3, new Main_$this.QEDExplicitArray(-15, 0));
      u4.setAtt(4, new Main_$this.QEDExplicitArray(((10) / 100), ((50) / 100)));
      u4.refreshSubModel();
      let u2 = u1.children[1];
      u2.setAtt(0, ((100) / 100));
      let u8 = u2.children[0];
      u8.setAtt(0, Main_$this.rect);
      u8.setAtt(1, "#EEE6DD");
      let u7 = u2.children[1];
      u7.setAtt(0, Main$this.application);
      u7.setAtt(1, "application");
      u7.setAtt(2, "#5F5C58");
      u7.refreshSubModel();
      u1.refreshChange();
      let _level = u1.getChangeLevel();
      return _level;
    };
    this.exitHandler = new Main_$this.QEDExplicitArray();
    this.emptyWidget = new this.Widget(Main$this);
    this.exit = _bindHandler(new Main_$this.QedTextButton("Exit", Main$this), (function Lambda_ (_ret) {
      if (!Main$this._isActive())
        return;
      Main_$this.qedResume(Main$this.exitHandler[0]);
    }));
    this.application = new this.Application(Main$this);
    this.qedModel = null;
  }
};
this.QED_TAG_OUT = 0;
this.QED_TAG_SIZE = 1;
this.QED_TAG_ID = 2;
this.QED_TAG_AREA_HERITABLE = 3;
this.QED_TAG_FONT = 4;
this.QED_TAG_FONT_SIZE = 5;
this.QED_TAG_SPACING = 6;
this.QED_TAG_AREA_END = 7;
this.QED_TAG_ALIGN = 8;
this.QED_TAG_EXPAND = 9;
this.QED_TAG_POS = 10;
this.QED_TAG_HERITABLE = 11;
this.QED_TAG_FILL_STYLE = 12;
this.QED_TAG_STROKE_STYLE = 13;
this.QED_TAG_LINE_WIDTH = 14;
this.QED_TAG_OPACITY = 15;
this.QED_TAG_RADIUS = 16;
this.QED_TAG_ROTATION = 17;
this.QED_TAG_END = 18;
let _spacing = 0.000000;
let _fontSize = 20;
this.refreshCount = 1;
this.autoResize = true;
this.autoInit = false;
this.windows = null;
this.MainObj = null;
this.potentialFocus = null;
this.qedFocus = new Main_$this.QEDExplicitArray();
