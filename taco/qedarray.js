"use strict";
const Main_$this = this;
this.voidHandler_ = function() {
}
this.VoidHandler_ = function() {
  const VoidHandler_$this = this;
  this._refreshModel_ = function() {
    if (!VoidHandler_$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray());
      VoidHandler_$this.qedModel = new QEDExplicitArray(u1);
    }
    let u1 = VoidHandler_$this.qedModel[0];
    u1.clearChange();
    u1.setAtt(0, "");
    u1.refreshChange();
    let _level = u1.getChangeLevel();
    return _level;
  }
  this.qedModel = null;
}
this.anyHandler_ = function(value) {
}
this.intHandler_ = function(value) {
}
this.floatHandler_ = function(value) {
}
this.boolHandler_ = function(value) {
}
this.stringHandler_ = function(value) {
}
this.Yield = function() {
  const Yield$this = this;
  this.blocking__Call = null;
  this.yieldHandler = (function() {
    if (Yield$this._HandlerFn_)
      Yield$this._HandlerFn_(true);
  });
}
this.Yield_$ = function(obj) {
  this.obj = obj;
  const Yield$this = this;
  this.blocking__Call = null;
  obj.yieldHandler = (function() {
    if (Yield$this._HandlerFn_)
      Yield$this._HandlerFn_(true);
  });
}
this.process = function(obj) {
  if (obj instanceof Array) {
    let size = obj.size();

    for (let index = 0; index < size; index++)
      this.process(obj[index]);
  }
  else
    obj.yieldHandler();
}
this.println = function(str) {
  console.log(str);
}
this.post_ = function(obj, ret) {
  if (postHandler != null)
    console.log("postHandler not null");

  postHandler = [obj, ret];
}
this.post__$ = function(handler) {
  if (postHandler != null)
    console.log("postHandler not null");

  postHandler = handler;
}
this._refresh = function(obj, x, y, width, height) {
  let level = _refreshModels(obj);
//  console.log("" + refreshCount++ + "- Refresh Level: " + level);

  if (level) {
    ctx.globalAlpha = 1.0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (level >= 2)
      obj.qedModel.windows = Main_$this._refreshViews(obj);

    obj.qedModel.windows[0].paint(x, y, width, height);
  };
}
this._refreshModels = function(obj) {
  let level = obj._refreshModel_ ? obj._refreshModel_() : 0;

  if (obj.blocking__Call)
    level = max(level, _refreshModels(obj.blocking__Call))

  return level;
}
this.getBounds = function(path, index) {
  return Main_$this.qedModel.windows.size() ? Main_$this.qedModel.windows[0].getBoundsRect(path, index, 0, 0, Main_$this.qedModel.windows[0].size[0], Main_$this.qedModel.windows[0].size[1], 0, 0) : [];
}
this.executeEvents_ = function() {
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

  _refresh(Main_$this, 0, 0, canvas.width, canvas.height);
}
this.qedEqual = function(value1, value2) {
  let equal = value1 === value2;
    if (!equal && value1 instanceof Array && value2 instanceof Array) {
    equal = (value1.length == value2.length) && value1.every(function(element, index) {
        return qedEqual(element, value2[index]); 
    });
  };
  return (equal);
}
this.max = function(a, b) {
  return a > b ? a : b;
}
this.min = function(a, b) {
  return a < b ? a : b;
}
this.abs = function(a) {
  return Math.abs(a);
}
this.rand = function() {
  return Math.random();
}
this.trunc = function(n) {
  return Math.trunc(n);
}
this.clock = function() {
}
this.saveContext = function() {
  ctx.save();
  ctx.clip();;
}
this.restoreContext = function() {
  ctx.restore();
}
this.rotate = function(x, y, width, height, angle) {
  ctx.save();
  ctx.translate(x + width / 2, y + height / 2);
  ctx.rotate(angle);
}
this.drawFn = function(x, y, width, height) {
}
this.oval = function(x, y, width, height) {
  ctx.fillStyle = toColor(getAttribute(12));
  ctx.globalAlpha = "" + getAttribute(13);
  ctx.beginPath();
  ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, 2*Math.PI);
  ctx.fill();
}
this.rect = function(x, y, width, height) {
  ctx.fillStyle = toColor(getAttribute(12));
  ctx.globalAlpha = "" + getAttribute(13);
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fill();
}
this.roundRect = function(x, y, width, height) {
  ctx.fillStyle = toColor(getAttribute(12));
  ctx.globalAlpha = "" + getAttribute(13);
  let radius = getAttribute(14);/*
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
  ctx.lineTo(x + radius, y)
  ctx.fill();*/
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
ctx.fill();
}
this.getAttribute = function(index) {
  return attributeStacks[index][attributeStacks[index].length - 1];
}
this.pushAttribute = function(index, value) {
  if (attributeStacks[index] == undefined)
    attributeStacks[index] = [];

  attributeStacks[index].push(value);
}
this.pushAttribute_$ = function(index, value) {
  this.pushAttribute(index, value);
}
this.popAttribute = function(index) {
  attributeStacks[index].pop();
}
this.getTextSize = function(text) {
  ctx.font = getAttribute(5) + "px Arial";

  const textSize = ctx.measureText(text);
  const height = textSize.fontBoundingBoxAscent + textSize.fontBoundingBoxDescent;
  return [textSize.width, height];
}
this.displayText = function(text, x, y, width, height) {
  ctx.font = getAttribute(5) + "px Arial";
  ctx.fillStyle = toColor(getAttribute(12));
  ctx.globalAlpha = getAttribute(13);
  ctx.textBaseline = "top";
  ctx.fillText(text, x, y);
}
this.Timer = function(timeoutMillis) {
  this.timeoutMillis = timeoutMillis;
  const Timer$this = this;
  this.reset = function() {
  }
  this.blocking__Call = null;
  setTimeout(function() {
    if (Timer$this._HandlerFn_) {
      Timer$this._HandlerFn_(true);
      executeEvents_();
    }
  }, timeoutMillis);
}
this.Time = function(Func) {
  this.Func = Func;
  const Time$this = this;
  this.blocking__Call = null;
  console.time("Time");
  new Func(() => {
    console.timeEnd("Time");

    if (Time$this._HandlerFn_) {
      Time$this._HandlerFn_();
      executeEvents_();
    }
  });
}
this.time = function(func) {
    console.time("time");
  func();
  console.timeEnd("time");
}
this.Animation = function() {
  const Animation$this = this;
  this.blocking__Call = null;
  requestAnimationFrame((millis) => {
  if (Animation$this._HandlerFn_) {
    Animation$this._HandlerFn_(millis);
    executeEvents_();
  }
});
}
this.Sprite = function() {
  const Sprite$this = this;
  this.Animate = function() {
    const Animate$this = this;
    this.blocking__Call$ = null;
    this.blocking__Call$ = _bindHandler(new Main_$this.Animation(), (function Lambda_(_ret) {
      Animate$this.blocking__Call$ = null;
      Animate$this.millis = _ret;
      if (Sprite$this.startTime === -1)
        Sprite$this.startTime = Animate$this.millis;
      {
        Main_$this.post_(Animate$this, Animate$this.millis - Sprite$this.startTime);
        return;
      }
    }));
  }
  this.setLimit = function(l) {
    Sprite$this.limit = l;
  }
  this.Move = function() {
    const Move$this = this;
    this.blocking__Call$ = null;
      this.blocking__Call$ = new Sprite$this.Animate((function Lambda_(_ret) {
      Move$this.blocking__Call$ = null;
      Main_$this.post_(Move$this, Main_$this.min(_ret / Sprite$this.limit, 1));
    }));
  }
  this.blocking__Call = null;
  this.limit = 0;
  this.startTime = -1;
}
this.ButtonContent = function(pressed) {
  this.pressed = pressed;
  const ButtonContent$this = this;
  this._refreshModel_ = function() {
    if (!ButtonContent$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray());
      ButtonContent$this.qedModel = new QEDExplicitArray(u1);
    }
    let u1 = ButtonContent$this.qedModel[0];
    u1.clearChange();
    u1.setAtt(0, "");
    u1.refreshChange();
    let _level = u1.getChangeLevel();
    return _level;
  }
  this.blocking__Call = null;
  this.qedModel = null;
}
this.GenericButton = function(ContentFn) {
  this.ContentFn = ContentFn;
  const GenericButton$this = this;
  this._refreshModel_ = function() {
    if (!GenericButton$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(-1, (function W1$_() {
        {
          GenericButton$this.pressed[0] = true;
          _captureFocus();
        }
      })), new Main_$this.Attr_(-2, (function W2$_() {
        {
          GenericButton$this.pressed[0] = false;
          _releaseFocus();
          {
            Main_$this.post_(GenericButton$this, null);
            return;
          }
        }
      }))), new QEDExplicitArray());
      GenericButton$this.qedModel = new QEDExplicitArray(u1);
    }
    let u1 = GenericButton$this.qedModel[0];
    u1.clearChange();
    u1.setAtt(0, GenericButton$this.content);
    u1.refreshSubModel();
    u1.refreshChange();
    let _level = u1.getChangeLevel();
    return _level;
  }
  this.blocking__Call = null;
  this.pressed = new QEDExplicitArray(false);
  this.content = new this.ContentFn(this.pressed);
  this.qedModel = null;
}
this.LinkButton = function(text) {
  this.text = text;
  const LinkButton$this = this;
  this._refreshModel_ = function() {
    if (!LinkButton$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray());
      LinkButton$this.qedModel = new QEDExplicitArray(u1);
    }
    let u1 = LinkButton$this.qedModel[0];
    u1.clearChange();
    u1.setAtt(0, LinkButton$this.button);
    u1.refreshSubModel();
    u1.refreshChange();
    let _level = u1.getChangeLevel();
    return _level;
  }
  this.blocking__Call = null;
  this.button = _bindHandler(new Main_$this.GenericButton((function L_(pressed) {
    this.pressed = pressed;
    const L_$this = this;
    this._refreshModel_ = function() {
      if (!L_$this.qedModel) {
        let u1 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(13, null)), new QEDExplicitArray());
        L_$this.qedModel = new QEDExplicitArray(u1);
      }
      let u1 = L_$this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, LinkButton$this.text);
      u1.setAtt(1, L_$this.pressed[0] ? ((35) / 100) : ((100) / 100));
      u1.refreshChange();
      let _level = u1.getChangeLevel();
      return _level;
    }
    this.qedModel = null;
  })), (function Lambda_() {
    {
      Main_$this.post_(LinkButton$this, LinkButton$this.text);
      return;
    }
  }));
  this.qedModel = null;
}
this.RectButton = function(ContentFn) {
  this.ContentFn = ContentFn;
  const RectButton$this = this;
  this._refreshModel_ = function() {
    if (!RectButton$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray());
      RectButton$this.qedModel = new QEDExplicitArray(u1);
    }
    let u1 = RectButton$this.qedModel[0];
    u1.clearChange();
    u1.setAtt(0, RectButton$this.button);
    u1.refreshSubModel();
    u1.refreshChange();
    let _level = u1.getChangeLevel();
    return _level;
  }
  this.blocking__Call = null;
  this.content = new this.ContentFn();
  this.button = _bindHandler(new Main_$this.GenericButton((function L_(pressed) {
    this.pressed = pressed;
    const L_$this = this;
    this._refreshModel_ = function() {
      if (!L_$this.qedModel) {
        let u1 = new Main_$this.Directive_(0, 0, 2, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(13, null), new Main_$this.Attr_(12, null)), new QEDExplicitArray());
        let u2 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray());
        let u3 = new Main_$this.Directive_(0, 0, 2, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray(u1, u2));
        L_$this.qedModel = new QEDExplicitArray(u3);
      }
      let u1 = L_$this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, Main_$this.roundRect);
      let u3 = u1.children[0];
      u3.setAtt(0, Main_$this.rect);
      u3.setAtt(1, L_$this.pressed[0] ? ((35) / 100) : ((0) / 100));
      u3.setAtt(2, Main_$this.COLOR_BLACK);
      let u2 = u1.children[1];
      u2.setAtt(0, RectButton$this.content);
      u2.refreshSubModel();
      u1.refreshChange();
      let _level = u1.getChangeLevel();
      return _level;
    }
    this.qedModel = null;
  })), (function Lambda_() {
    {
      Main_$this.post_(RectButton$this, null);
      return;
    }
  }));
  this.qedModel = null;
}
this.TextButton = function(text) {
  this.text = text;
  const TextButton$this = this;
  this._refreshModel_ = function() {
    if (!TextButton$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray());
      TextButton$this.qedModel = new QEDExplicitArray(u1);
    }
    let u1 = TextButton$this.qedModel[0];
    u1.clearChange();
    u1.setAtt(0, TextButton$this.button);
    u1.refreshSubModel();
    u1.refreshChange();
    let _level = u1.getChangeLevel();
    return _level;
  }
  this.blocking__Call = null;
  this.button = _bindHandler(new Main_$this.RectButton((function L_() {
    const L_$this = this;
    this._refreshModel_ = function() {
      if (!L_$this.qedModel) {
        let u1 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null), new Main_$this.Attr_(9, null)), new QEDExplicitArray());
        let u2 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(12, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
        let u3 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null), new Main_$this.Attr_(9, null)), new QEDExplicitArray());
        let u4 = new Main_$this.Directive_(3, 0, -1, new QEDExplicitArray(), new QEDExplicitArray(u1, u2, u3));
        L_$this.qedModel = new QEDExplicitArray(u4);
      }
      let u1 = L_$this.qedModel[0];
      u1.clearChange();
      let u4 = u1.children[0];
      u4.setAtt(0, Main_$this.getAttribute(5) * 0.200000);
      u4.setAtt(1, ((100) / 100));
      let u3 = u1.children[1];
      u3.setAtt(0, TextButton$this.text);
      u3.setAtt(1, Main_$this.COLOR_WHITE);
      u3.setAtt(2, ((50) / 100));
      let u2 = u1.children[2];
      u2.setAtt(0, Main_$this.getAttribute(5) * 0.200000);
      u2.setAtt(1, ((100) / 100));
      u1.refreshChange();
      let _level = u1.getChangeLevel();
      return _level;
    }
    this.qedModel = null;
  })), (function Lambda_() {
    {
      Main_$this.post_(TextButton$this, TextButton$this.text);
      return;
    }
  }));
  this.qedModel = null;
}
this.QEDBaseArray_ = function() {
  this.getNumDirs = function() {
    return (0);
  }
  this.getDirs = function(childDir) {
    return (new QEDExplicitArray(0, 0));
  }
  this.size = function() {
    return (0);
  }
  this.insert = function(pos, size$) {
  }
  this.Insert = function(pos, size$) {
    this.pos = pos;
    this.size$ = size$;
    const Insert$this = this;
  }
  this.push = function() {
  }
  this.Push = function() {
    const Push$this = this;
  }
  this.pop = function() {
  }
  this.get = function(pos) {
  }
  this.set = function(pos, value) {
  }
  this.get_$ = function(index) {
  }
  this.set_$ = function(index, value) {
  }
  this._refreshModel_ = function() {
  }
  this.qedModel = null;
}
this.InitFn = function(pos) {
  this.pos = pos;
  const InitFn$this = this;
}
this.SQEDArray = function(limits, Init) {
  this.limits = limits;
  this.Init = Init;
  const SQEDArray$this = this;
  this.size = function() {
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
  this.insert = function(pos, size$) {
  }
  this.Insert = function(pos, size$) {
    this.pos = pos;
    this.size$ = size$;
    const Insert$this = this;
    this.blocking__Call$ = null;
    this.newSize = [...this.size$];
    {
      let index = SQEDArray$this.dims.length - 1;
      while(index >= 0) {
        this.newSize[index] += SQEDArray$this.dims[index];
        index--;
      }
    }
    this.blocking__Call$ = _bindHandler(new SQEDArray$this.InsertLevel(SQEDArray$this, SQEDArray$this.dims, this.pos, this.size$, this.newSize, new Array(this.size$.length).fill(0), 0), (function Lambda_() {
      Insert$this.blocking__Call$ = null;
      SQEDArray$this.dims = Insert$this.newSize;
      {
        Main_$this.post_(Insert$this, null);
        return;
      }
    }));
  }
  this.remove = function(pos, size$) {
    let newSize = [...SQEDArray$this.dims];
    {
      let index = SQEDArray$this.dims.length - 1;
      while(index >= 0) {
        newSize[index] -= size$[index];
        index--;
      }
    }
    SQEDArray$this.removeLevel(SQEDArray$this, SQEDArray$this.dims, pos, size$, newSize, new Array(size$.length).fill(0), 0);
    SQEDArray$this.dims = newSize;
    return;
  }
  this.InsertLevel = function(array, dims, pos, size$, newSize, pp, level) {
    this.array = array;
    this.dims = dims;
    this.pos = pos;
    this.size$ = size$;
    this.newSize = newSize;
    this.pp = pp;
    this.level = level;
    const InsertLevel$this = this;
    this.blocking__Call$ = null;
    new (function W27$_(i19$_) {
      this.i19$_ = i19$_;
      if (InsertLevel$this.level < SQEDArray$this.dims.length - 1) {
        {
          pp[level] = 0;
          (function while20$_() {
            if (pp[level] < pos[level]) {
              InsertLevel$this.blocking__Call$ = _bindHandler(new SQEDArray$this.InsertLevel(array[pp[level]], InsertLevel$this.dims, InsertLevel$this.pos, InsertLevel$this.size$, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1), (function Lambda_() {
                InsertLevel$this.blocking__Call$ = null;
                pp[level]++;
                while20$_();
              }));
            }
            else {
              if (InsertLevel$this.size$[InsertLevel$this.level] !== 0) {
                pp[level] = dims[level] - 1;
                while(pp[level] >= pos[level]) {
                  array[pp[level] + InsertLevel$this.size$[level]] = array[pp[level]];
                  pp[level]--;
                }
              }
              {
                pp[level] = pos[level];
                (function while22$_() {
                  if (pp[level] < pos[level] + InsertLevel$this.size$[level]) {
                    array[pp[level]] = [];
                    InsertLevel$this.blocking__Call$ = _bindHandler(new SQEDArray$this.InsertLevel(array[pp[level]], new Array(InsertLevel$this.size$.length).fill(0), new Array(InsertLevel$this.size$.length).fill(0), InsertLevel$this.newSize, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1), (function Lambda_() {
                      InsertLevel$this.blocking__Call$ = null;
                      pp[level]++;
                      while22$_();
                    }));
                  }
                  else {
                    pp[level] = pos[level] + InsertLevel$this.size$[level];
                    (function while23$_() {
                      if (pp[level] < newSize[level]) {
                        InsertLevel$this.blocking__Call$ = _bindHandler(new SQEDArray$this.InsertLevel(array[pp[level]], InsertLevel$this.dims, InsertLevel$this.pos, InsertLevel$this.size$, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1), (function Lambda_() {
                          InsertLevel$this.blocking__Call$ = null;
                          pp[level]++;
                          while23$_();
                        }));
                      }
                      else
                        i19$_();
                    })();
                  }
                })();
              }
            }
          })();
        }
      }
      else {
        if (InsertLevel$this.size$[InsertLevel$this.level] !== 0) {
          pp[level] = dims[level] - 1;
          while(pp[level] >= pos[level]) {
            array[pp[level] + InsertLevel$this.size$[level]] = array[pp[level]];
            pp[level]--;
          }
        }
        {
          pp[level] = pos[level];
          (function while25$_() {
            if (pp[level] < pos[level] + InsertLevel$this.size$[level]) {
              InsertLevel$this.blocking__Call$ = _bindHandler(new SQEDArray$this.Init(InsertLevel$this.pp), (function Lambda_(_ret) {
                InsertLevel$this.blocking__Call$ = null;
                array[pp[level]] = _ret;
                pp[level]++;
                while25$_();
              }));
            }
            else
              i19$_();
          })();
        }
      }
    })((function c26$_() {
      {
        Main_$this.post_(InsertLevel$this, null);
        return;
      }
    }));
  }
  this.removeLevel = function(array, dims, pos, size$, newSize, pp, level) {
    if (level < SQEDArray$this.dims.length - 1) {
      {
        pp[level] = dims[level] - 1;
        while(pp[level] >= pos[level] + size$[level]) {
          SQEDArray$this.removeLevel(array[pp[level]], dims, pos, size$, newSize, pp, level + 1);
          pp[level]--;
        }
      }
      if (size$[level] !== 0) {
        pp[level] = pos[level];
        while(pp[level] < newSize[level]) {
          array[pp[level]] = array[pp[level] + size$[level]];
          pp[level]++;
        }
      }
      {
        pp[level] = pos[level] - 1;
        while(pp[level] >= 0) {
          SQEDArray$this.removeLevel(array[pp[level]], dims, pos, size$, newSize, pp, level + 1);
          pp[level]--;
        }
      }
    }
    else
      if (size$[level] !== 0) {
        pp[level] = pos[level];
        while(pp[level] < newSize[level]) {
          array[pp[level]] = array[pp[level] + size$[level]];
          pp[level]++;
        }
      }
    return;
  }
  this.push = function() {
  }
  this.Push = function() {
    const Push$this = this;
    this.blocking__Call$ = null;
    this.pos = new Array(SQEDArray$this.dims.length).fill(0);
    this.size$ = new Array(SQEDArray$this.dims.length).fill(0);
    this.pos[0] = SQEDArray$this.dims[0];
    this.size$[0] = 1;
    this.blocking__Call$ = _bindHandler(new SQEDArray$this.Insert(this.pos, this.size$), (function Lambda_() {
      Push$this.blocking__Call$ = null;
      {
        Main_$this.post_(Push$this, null);
        return;
      }
    }));
  }
  this.pop = function() {
    let pos = new Array(SQEDArray$this.dims.length).fill(0);
    let size$ = new Array(SQEDArray$this.dims.length).fill(0);
    pos[0] = SQEDArray$this.dims[0] - 1;
    size$[0] = 1;
    SQEDArray$this.remove(pos, size$);
    return;
  }
  this.blocking__Call = null;
  this.dims = new Array(this.limits.length).fill(0);
  this.blocking__Call = _bindHandler(new this.Insert(new Array(this.limits.length).fill(0), this.limits), (function Lambda_() {
    SQEDArray$this.blocking__Call = null;
    {
      Main_$this.post_(SQEDArray$this, SQEDArray$this);
      return;
    }
  }));
}
this.VInitFn = function(pos) {
  this.pos = pos;
  const VInitFn$this = this;
}
this.VSQEDArray = function(limits, Init) {
  this.limits = limits;
  this.Init = Init;
  const VSQEDArray$this = this;
  this.size = function() {
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
  this.insert = function(pos, size$) {
  }
  this.Insert = function(pos, size$) {
    this.pos = pos;
    this.size$ = size$;
    const Insert$this = this;
    this.blocking__Call$ = null;
    this.newSize = [...this.size$];
    {
      let index = VSQEDArray$this.dims.length - 1;
      while(index >= 0) {
        this.newSize[index] += VSQEDArray$this.dims[index];
        index--;
      }
    }
    this.blocking__Call$ = _bindHandler(new VSQEDArray$this.InsertLevel(VSQEDArray$this.dims, this.pos, this.size$, this.newSize, new Array(this.size$.length).fill(0), 0), (function Lambda_() {
      Insert$this.blocking__Call$ = null;
      VSQEDArray$this.dims = Insert$this.newSize;
      {
        Main_$this.post_(Insert$this, null);
        return;
      }
    }));
  }
  this.InsertLevel = function(dims, pos, size$, newSize, pp, level) {
    this.dims = dims;
    this.pos = pos;
    this.size$ = size$;
    this.newSize = newSize;
    this.pp = pp;
    this.level = level;
    const InsertLevel$this = this;
    this.blocking__Call$ = null;
    new (function W37$_(i31$_) {
      this.i31$_ = i31$_;
      if (InsertLevel$this.level < VSQEDArray$this.dims.length - 1) {
        {
          pp[level] = 0;
          (function while32$_() {
            if (pp[level] < pos[level]) {
              InsertLevel$this.blocking__Call$ = _bindHandler(new VSQEDArray$this.InsertLevel(InsertLevel$this.dims, InsertLevel$this.pos, InsertLevel$this.size$, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1), (function Lambda_() {
                InsertLevel$this.blocking__Call$ = null;
                pp[level]++;
                while32$_();
              }));
            }
            else {
              pp[level] = pos[level];
              (function while33$_() {
                if (pp[level] < pos[level] + InsertLevel$this.size$[level]) {
                  array[pp[level]] = [];
                  InsertLevel$this.blocking__Call$ = _bindHandler(new VSQEDArray$this.InsertLevel(new Array(InsertLevel$this.size$.length).fill(0), new Array(InsertLevel$this.size$.length).fill(0), InsertLevel$this.newSize, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1), (function Lambda_() {
                    InsertLevel$this.blocking__Call$ = null;
                    pp[level]++;
                    while33$_();
                  }));
                }
                else {
                  pp[level] = pos[level] + InsertLevel$this.size$[level];
                  (function while34$_() {
                    if (pp[level] < newSize[level]) {
                      InsertLevel$this.blocking__Call$ = _bindHandler(new VSQEDArray$this.InsertLevel(InsertLevel$this.dims, InsertLevel$this.pos, InsertLevel$this.size$, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1), (function Lambda_() {
                        InsertLevel$this.blocking__Call$ = null;
                        pp[level]++;
                        while34$_();
                      }));
                    }
                    else
                      i31$_();
                  })();
                }
              })();
            }
          })();
        }
      }
      else {
        pp[level] = pos[level];
        (function while35$_() {
          if (pp[level] < pos[level] + InsertLevel$this.size$[level]) {
            InsertLevel$this.blocking__Call$ = _bindHandler(new VSQEDArray$this.Init(InsertLevel$this.pp), (function Lambda_() {
              InsertLevel$this.blocking__Call$ = null;
              pp[level]++;
              while35$_();
            }));
          }
          else
            i31$_();
        })();
      }
    })((function c36$_() {
      {
        Main_$this.post_(InsertLevel$this, null);
        return;
      }
    }));
  }
  this.blocking__Call = null;
  this.dims = new Array(this.limits.length).fill(0);
  this.blocking__Call = _bindHandler(new this.Insert(new Array(this.limits.length).fill(0), this.limits), (function Lambda_() {
    VSQEDArray$this.blocking__Call = null;
    {
      Main_$this.post_(VSQEDArray$this, VSQEDArray$this);
      return;
    }
  }));
}
this.sInitFn = function(pos, _HandlerFn_) {
}
this.Qui_ = function(array, dims) {
  this.array = array;
  this.dims = dims;
}
this.QEDArray = function(limits, init, dirs, Ui_) {
  this.limits = limits;
  this.init = init;
  this.dirs = dirs;
  this.Ui_ = Ui_;
  const QEDArray$this = this;
  this.getNumDirs = function() {
    return (this.limits.length);
  }
  this.getDirs = function(childDir) {
    return (QEDArray$this.dirs);
  }
  this.size = function() {
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
  this.insert = function(pos, size$) {
    let newSize = [...size$];
    {
      let index = QEDArray$this.dims.length - 1;
      while(index >= 0) {
        newSize[index] += QEDArray$this.dims[index];
        index--;
      }
    }
    QEDArray$this.insertLevel(QEDArray$this, QEDArray$this.dims, pos, size$, newSize, new Array(size$.length).fill(0), 0);
    QEDArray$this.dims = newSize;
    return;
  }
  this.remove = function(pos, size$) {
    let newSize = [...QEDArray$this.dims];
    {
      let index = QEDArray$this.dims.length - 1;
      while(index >= 0) {
        newSize[index] -= size$[index];
        index--;
      }
    }
    QEDArray$this.removeLevel(QEDArray$this, QEDArray$this.dims, pos, size$, newSize, new Array(size$.length).fill(0), 0);
    QEDArray$this.dims = newSize;
    return;
  }
  this.insertLevel = function(array, dims, pos, size$, newSize, pp, level) {
    if (level < QEDArray$this.dims.length - 1) {
      {
        pp[level] = 0;
        while(pp[level] < pos[level]) {
          QEDArray$this.insertLevel(array[pp[level]], dims, pos, size$, newSize, pp, level + 1);
          pp[level]++;
        }
      }
      if (size$[level] !== 0) {
        pp[level] = dims[level] - 1;
        while(pp[level] >= pos[level]) {
          array[pp[level] + size$[level]] = array[pp[level]];
          pp[level]--;
        }
      }
      {
        pp[level] = pos[level];
        while(pp[level] < pos[level] + size$[level]) {
          array[pp[level]] = [];
          QEDArray$this.insertLevel(array[pp[level]], new Array(size$.length).fill(0), new Array(size$.length).fill(0), newSize, newSize, pp, level + 1);
          pp[level]++;
        }
      }
      {
        pp[level] = pos[level] + size$[level];
        while(pp[level] < newSize[level]) {
          QEDArray$this.insertLevel(array[pp[level]], dims, pos, size$, newSize, pp, level + 1);
          pp[level]++;
        }
      }
    }
    else {
      if (size$[level] !== 0) {
        pp[level] = dims[level] - 1;
        while(pp[level] >= pos[level]) {
          array[pp[level] + size$[level]] = array[pp[level]];
          pp[level]--;
        }
      }
      {
        pp[level] = pos[level];
        while(pp[level] < pos[level] + size$[level]) {
          let index = pp[level];
          array[pp[level]] = QEDArray$this.init(pp, (function Lxyz_(_ret) {
            QEDArray$this._HandlerFn_(index, _ret);
          }));
          pp[level]++;
        }
      }
    }
    return;
  }
  this.removeLevel = function(array, dims, pos, size$, newSize, pp, level) {
    if (level < QEDArray$this.dims.length - 1) {
      {
        pp[level] = dims[level] - 1;
        while(pp[level] >= pos[level] + size$[level]) {
          QEDArray$this.removeLevel(array[pp[level]], dims, pos, size$, newSize, pp, level + 1);
          pp[level]--;
        }
      }
      if (size$[level] !== 0) {
        pp[level] = pos[level];
        while(pp[level] < newSize[level]) {
          array[pp[level]] = array[pp[level] + size$[level]];
          pp[level]++;
        }
      }
      {
        pp[level] = pos[level] - 1;
        while(pp[level] >= 0) {
          QEDArray$this.removeLevel(array[pp[level]], dims, pos, size$, newSize, pp, level + 1);
          pp[level]--;
        }
      }
    }
    else
      if (size$[level] !== 0) {
        pp[level] = pos[level];
        while(pp[level] < newSize[level]) {
          array[pp[level]] = array[pp[level] + size$[level]];
          pp[level]++;
        }
      }
    return;
  }
  this.push = function() {
    let pos = new Array(QEDArray$this.dims.length).fill(0);
    let size$ = new Array(QEDArray$this.dims.length).fill(0);
    pos[0] = QEDArray$this.dims[0];
    size$[0] = 1;
    QEDArray$this.insert(pos, size$);
    return;
  }
  this.Push = function() {
    const Push$this = this;
    this.blocking__Call$ = null;
    QEDArray$this.push();
    {
      Main_$this.post_(Push$this, null);
      return;
    }
  }
  this.pop = function() {
    let pos = new Array(QEDArray$this.dims.length).fill(0);
    let size$ = new Array(QEDArray$this.dims.length).fill(0);
    pos[0] = QEDArray$this.dims[0] - 1;
    size$[0] = 1;
    QEDArray$this.remove(pos, size$);
    return;
  }
  this._refreshModel_ = function() {
    let level = 0;
    {
      let index = 0;
      while(index < QEDArray$this.size()) {
        level = Main_$this.max(level, _refreshModels(QEDArray$this[index]));
        index++;
      }
    }
    return level;
  }
  this.blocking__Call = null;
  this.dims = new Array(this.limits.length).fill(0);
  this.insert(new Array(this.limits.length).fill(0), this.limits);
}
this.vInitFn = function(pos) {
}
this.VQEDArray = function(limits, init) {
  this.limits = limits;
  this.init = init;
  const VQEDArray$this = this;
  this.size = function() {
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
  this.insert = function(pos, size$) {
    let newSize = [...size$];
    {
      let index = VQEDArray$this.dims.length - 1;
      while(index >= 0) {
        newSize[index] += VQEDArray$this.dims[index];
        index--;
      }
    }
    VQEDArray$this.insertLevel(VQEDArray$this.dims, pos, size$, newSize, new Array(size$.length).fill(0), 0);
    VQEDArray$this.dims = newSize;
    return;
  }
  this.insertLevel = function(dims, pos, size$, newSize, pp, level) {
    if (level < VQEDArray$this.dims.length - 1) {
      {
        pp[level] = 0;
        while(pp[level] < pos[level]) {
          VQEDArray$this.insertLevel(dims, pos, size$, newSize, pp, level + 1);
          pp[level]++;
        }
      }
      {
        pp[level] = pos[level];
        while(pp[level] < pos[level] + size$[level]) {
          VQEDArray$this.insertLevel(new Array(size$.length).fill(0), new Array(size$.length).fill(0), newSize, newSize, pp, level + 1);
          pp[level]++;
        }
      }
      {
        pp[level] = pos[level] + size$[level];
        while(pp[level] < newSize[level]) {
          VQEDArray$this.insertLevel(dims, pos, size$, newSize, pp, level + 1);
          pp[level]++;
        }
      }
    }
    else {
      pp[level] = pos[level];
      while(pp[level] < pos[level] + size$[level]) {
        VQEDArray$this.init(pp);
        pp[level]++;
      }
    }
    return;
  }
  this.blocking__Call = null;
  this.dims = new Array(this.limits.length).fill(0);
  this.insert(new Array(this.limits.length).fill(0), this.limits);
}
this.vqedArray = function(limits, init) {
  return (new Main_$this.VQEDArray(limits, init));
}
this.resizeView = function(unit) {
}
this.getViewSize = function(viewObj) {
}
this.paintView = function(unit, viewObj, posx, posy, sizex, sizey) {
}
this.onViewEvent = function(viewObj, event, posx, posy, sizex, sizey) {
}
this.getViewElementRect = function(viewObj, path, index, posx, posy, sizex, sizey, level, dLevel) {
}
this.ViewArray_ = function(array, dirs, resizeViewFn, getViewSizeFn, paintViewFn, onViewEventFn, getViewElementRectFn) {
  this.array = array;
  this.dirs = dirs;
  this.resizeViewFn = resizeViewFn;
  this.getViewSizeFn = getViewSizeFn;
  this.paintViewFn = paintViewFn;
  this.onViewEventFn = onViewEventFn;
  this.getViewElementRectFn = getViewElementRectFn;
  const ViewArray_$this = this;
  this.paint = function(pos0, pos1, size0, size1) {
    let newPos = new QEDExplicitArray(pos0, pos1);
    let pos = new QEDExplicitArray(pos0, pos1);
    let size$ = new QEDExplicitArray(size0, size1);
    {
      let index = 0;
      while(index < ViewArray_$this.length) {
        {
          let dir = 0;
          while(dir < 2) {
            if (ViewArray_$this.dirs[dir]) {
              let relPos = index ? ViewArray_$this.posSet[index - 1][dir] + ViewArray_$this.space : 0;
              pos[dir] = newPos[dir] + relPos;
              size$[dir] = ViewArray_$this.posSet[index][dir] - relPos;
            }
            dir++;
          }
        }
        ViewArray_$this.paintViewFn(ViewArray_$this.array[index], ViewArray_$this.views[index], pos[0], pos[1], size$[0], size$[1]);
        index++;
      }
    }
  }
  this.onEvent = function(event, pos0, pos1, size0, size1) {
    let pos = new QEDExplicitArray(0, 0);
    let size$ = new QEDExplicitArray(size0, size1);
    {
      let index = ViewArray_$this.length - 1;
      while(index >= 0) {
        {
          let dir = 0;
          while(dir < 2) {
            if (ViewArray_$this.dirs[dir]) {
              pos[dir] = index ? ViewArray_$this.posSet[index - 1][dir] + ViewArray_$this.space : 0;
              size$[dir] = ViewArray_$this.posSet[index][dir] - pos[dir];
            }
            dir++;
          }
        }
        if (pos0 >= pos[0] && pos0 < pos[0] + size$[0] && pos1 >= pos[1] && pos1 < pos[1] + size$[1]) {
          pos0 -= pos[0];
          pos1 -= pos[1];
          return (ViewArray_$this.onViewEventFn(ViewArray_$this.views[index], event, pos0, pos1, size$[0], size$[1]));
        }
        index--;
      }
    }
    return (false);
  }
  this.getBoundsRect = function(path, index, pos0, pos1, size0, size1, level, dLevel) {
    let ndx = index[0];
    let relPos = ndx ? ViewArray_$this.posSet[ndx - 1][0] + ViewArray_$this.space : 0;
    let posx = pos0 + relPos;
    let posy = pos1;
    let sizex = ViewArray_$this.posSet[ndx][0] - relPos;
    let sizey = size1;
    dLevel++;
    if (level < path.size() || dLevel < index.size())
      return (ViewArray_$this.getViewElementRectFn(ViewArray_$this.views[ndx], path, index, posx, posy, sizex, sizey, level, dLevel));
    else
      return (new QEDExplicitArray(posx, posy, sizex, sizey));
  }
  this.space = getAttribute(6);
  this.length = this.array.size();
  this.views = [];
  this.posSet = [];
  this.size = new QEDExplicitArray(0, 0);
  {
    let index = 0;
    while(index < this.length) {
      this.views[index] = this.resizeViewFn(this.array[index]);
      this.posSet[index] = new QEDExplicitArray(0, 0);
      let elementSize = this.getViewSizeFn(this.views[index]);
      {
        let dir = 0;
        while(dir < 2) {
          this.posSet[index][dir] = this.dirs[dir] ? (index ? this.size[dir] + this.space : 0) + elementSize[dir] : Main_$this.max(this.size[dir], elementSize[dir]);
          this.size[dir] = this.posSet[index][dir];
          dir++;
        }
      }
      index++;
    }
  }
}
this.resizeViewObj = function(unit) {
  let value = unit;
  return (_refreshViews(value));
}
this.getViewSizeObj = function(viewObj) {
  let window = viewObj;
  return (window.size() ? window[0].size : new QEDExplicitArray(0, 0));
}
this.paintViewObj = function(unit, viewObj, posx, posy, sizex, sizey) {
  let window = viewObj;
  if (window.size())
    window[0].paint(posx, posy, sizex, sizey);
}
this.onViewEventObj = function(viewObj, event, posx, posy, sizex, sizey) {
  let window = viewObj;
  return (window.size() !== 0 && window[0].onEvent(event, new QEDExplicitArray(posx, posy), new QEDExplicitArray(sizex, sizey)));
}
this.getViewElementRectObj = function(viewObj, path, index, pos0, pos1, size0, size1, level, dLevel) {
  let window = viewObj;
  return (window.size() ? window[0].getBoundsRect(path, index, pos0, pos1, size0, size1, level, dLevel) : new QEDExplicitArray());
}
this.resizeViewString = function(unit) {
  return (Main_$this.getTextSize(unit));
}
this.getViewSizeString = function(viewObj) {
  return (viewObj);
}
this.paintViewString = function(unit, viewObj, posx, posy, sizex, sizey) {
  let size = viewObj;
  Main_$this.displayText(unit, posx, posy, sizex, sizey);
}
this.onViewEventString = function(viewObj, event, posx, posy, sizex, sizey) {
  return (true);
}
this.getViewElementRectString = function(viewObj, path, index, posx, posy, sizex, sizey, level, dLevel) {
  let size = viewObj;
  return (size);
}
this.Attr_ = function(code, value) {
  this.code = code;
  this.value = value;
}
this.Directive_ = function(direction, outNumDim, outType, atts, children) {
  this.direction = direction;
  this.outNumDim = outNumDim;
  this.outType = outType;
  this.atts = atts;
  this.children = children;
  const Directive_$this = this;
  this.clearChange = function() {
    Directive_$this.changeLevel = 0;
    {
      let index = 0;
      while(index < Directive_$this.children.size()) {
        Directive_$this.children[index].clearChange();
        index++;
      }
    }
  }
  this.refreshChange = function() {
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
  }
  this.setAtt = function(index, value) {
    let att = Directive_$this.atts[index];
    if (!Main_$this.qedEqual(value, att.value)) {
      Directive_$this.changeLevel = Main_$this.max(Directive_$this.changeLevel, att.code > 11 ? 1 : att.code > 3 ? 2 : 3);
      Directive_$this.atts[index].value = value;
    }
  }
  this.findAttr = function(code) {
    {
      let index = 0;
      while(index < Directive_$this.atts.size()) {
        if (Directive_$this.atts[index].code === code)
          return (new QEDExplicitArray(Directive_$this.atts[index]));
        index++;
      }
    }
    return (new QEDExplicitArray());
  }
  this.getChangeLevel = function() {
    return (Directive_$this.changeLevel);
  }
  this.refreshSubModel = function() {
    Directive_$this.changeLevel = Main_$this.max(Directive_$this.changeLevel, _refreshModels(Directive_$this.outAttr[0].value));
  }
  this.sizeAttr = new QEDExplicitArray();
  this.outAttr = new QEDExplicitArray();
  this.viewIndex = 0;
  this.childrenViewFlag = false;
  this.changeLevel = 0;
  {
    let ndx = 0;
    while(ndx < this.atts.size()) {
      let attr = this.atts[ndx];
      if (attr.code === 1)
        this.sizeAttr = new QEDExplicitArray(attr);
      if (attr.code === 0)
        this.outAttr = new QEDExplicitArray(attr);
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
}
this.hasAreas = function(directive) {
  return (directive.childrenViewFlag || directive.viewIndex !== 0);
}
this.isAreaHeritable = function(code) {
  return (code > 3 && code < 7);
}
this.isHeritable = function(code) {
  return (Main_$this.isAreaHeritable(code) || (code > 11 && code < 16));
}
this.Widget_ = function(directive) {
  this.directive = directive;
  const Widget_$this = this;
  this.recalcWidgets = function() {
    let subWidgets$ = function l() {
      let _d0 = Widget_$this.directive.children.size();
      return (new Main_$this.QEDArray(new QEDExplicitArray(_d0), (function l(pos, _HandlerFn_) {
        let i = pos[0];
        return (_bindHandler(new Main_$this.Widget_(Widget_$this.directive.children[i]), _HandlerFn_));
      }), new QEDExplicitArray(0, 0), Main_$this.Qui_));
    }();
    let previous = new QEDExplicitArray();
    {
      let index = 0;
      while(index < subWidgets$.size()) {
        let sub = subWidgets$[index];
        if (sub != null && sub.size && Main_$this.hasAreas(sub.directive)) {
          let previousSize = previous.size() ? previous[0].group : new QEDExplicitArray(0, 0);
          sub.group = function l() {
            let _d0 = 2;
            return (new Main_$this.QEDArray(new QEDExplicitArray(_d0), (function l(pos, _HandlerFn_) {
              let dir = pos[0];
              return ((Widget_$this.directive.direction & (1 << dir) ? previousSize[dir] + sub.size[dir] : Main_$this.max(previousSize[dir], sub.size[dir])));
            }), new QEDExplicitArray(0, 0), Main_$this.Qui_));
          }();
          previous = new QEDExplicitArray(sub);
        }
        let att = Widget_$this.directive.children[index].findAttr(9);
        if (att.size()) {
          {
            let dir = 0;
            while(dir < 2) {
              if (Widget_$this.directive.direction & (1 << dir))
                Widget_$this.expandArray[dir][Widget_$this.count] = Main_$this.getDirVar(dir, att[0].value) + (Widget_$this.count ? Widget_$this.expandArray[dir][Widget_$this.count - 1] : 0);
              dir++;
            }
          }
          Widget_$this.count++;
        }
        index++;
      }
    }
    return (subWidgets$);
  }
  this.paint = function(pos0, pos1, size0, size1) {
    {
      let ndx = 0;
      while(ndx < Widget_$this.directive.atts.size()) {
        let att = Widget_$this.directive.atts[ndx];
        if (Main_$this.isHeritable(att.code))
          if (att.code === 15) {
            Main_$this.rotate(pos0, pos1, size0, size1, att.value);
            pos0 = -size0 / 2;
            pos1 = -size1 / 2;
          }
          else
            Main_$this.pushAttribute_$(att.code, att.value);
        ndx++;
      }
    }
    let outType = Widget_$this.directive.outType;
    let subSize = Widget_$this.subWidgets.size();
    let pos = new QEDExplicitArray(pos0, pos1);
    let size$ = new QEDExplicitArray(size0, size1);
    Widget_$this.align(pos, size$);
    if (Widget_$this.directive.outAttr.size())
      if (Widget_$this.directive.outNumDim) {
        let viewArray = Widget_$this.outWidget[0];
        viewArray.paint(pos[0], pos[1], size$[0], size$[1]);
      }
      else
        if (outType === 0) {
          let window = Widget_$this.outWidget[0];
          window.paint(pos[0], pos[1], size$[0], size$[1]);
        }
        else
          if (outType === 1)
            Main_$this.displayText(Widget_$this.directive.outAttr[0].value, pos[0], pos[1], size$[0], size$[1]);
          else {
            let fn = Widget_$this.directive.outAttr[0].value;
            fn(pos[0], pos[1], size$[0], size$[1]);
          }
    if (subSize) {
      let extraSpace = Widget_$this.getExtraSpace(size$);
      if (!Widget_$this.directive.outNumDim !== 0 && outType >= 1)
        Main_$this.saveContext();
      {
        let index = 0;
        while(index < subSize) {
          let rect$ = Widget_$this.getChildArea(index, size$[0], size$[1], extraSpace);
          Widget_$this.subWidgets[index].paint(pos[0] + rect$[0], pos[1] + rect$[1], rect$[2], rect$[3]);
          index++;
        }
      }
      if (!Widget_$this.directive.outNumDim !== 0 && outType >= 1)
        Main_$this.restoreContext();
    }
    {
      let ndx = Widget_$this.directive.atts.size() - 1;
      while(ndx >= 0) {
        if (Main_$this.isHeritable(Widget_$this.directive.atts[ndx].code))
          if (Widget_$this.directive.atts[ndx].code === 15)
            Main_$this.restoreContext();
          else
            Main_$this.popAttribute(Widget_$this.directive.atts[ndx].code);
        ndx--;
      }
    }
  }
  this.onEvent = function(event, location, size) {
    let flag = false;
    let pos = new QEDExplicitArray(0, 0);
    let newSize = [...size];
    let locationFlag = true;
    Widget_$this.align(pos, newSize);
    {
      let dir = 0;
      while(locationFlag && dir < 2) {
        locationFlag = location[dir] >= pos[dir] && location[dir] < pos[dir] + newSize[dir];
        dir++;
      }
    }
    if (locationFlag) {
      {
        let dir = 0;
        while(dir < 2) {
          location[dir] -= pos[dir];
          dir++;
        }
      }
      let subSize = Widget_$this.subWidgets.size();
      if (subSize) {
        let extraSpace = Widget_$this.getExtraSpace(newSize);
        let parse = true;
        {
          let index = subSize - 1;
          while(!flag && parse && index >= 0) {
            let rect$ = Widget_$this.getChildArea(index, newSize[0], newSize[1], extraSpace);
            flag = Widget_$this.subWidgets[index].onEvent(event, new QEDExplicitArray(location[0] - rect$[0], location[1] - rect$[1]), new QEDExplicitArray(rect$[2], rect$[3]));
            if (!flag && index !== 0 && Widget_$this.directive.direction !== 0) {
              let inRect = true;
              {
                let dir = 0;
                while(inRect && dir < 2) {
                  inRect = location[dir] >= rect$[dir] && location[dir] < rect$[dir] + rect$[2 + dir];
                  dir++;
                }
              }
              parse = !inRect;
            }
            index--;
          }
        }
      }
      if (!flag && Widget_$this.directive.outAttr.size() !== 0)
        if (Widget_$this.directive.outNumDim) {
          let viewArray = Widget_$this.outWidget[0];
          flag = viewArray.onEvent(event, location[0], location[1], newSize[0], newSize[1]);
        }
        else
          if (Widget_$this.directive.outType === 0) {
            let window = Widget_$this.outWidget[0];
            flag = window.onEvent(event, location, newSize);
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
  }
  this.getBoundsRect = function(path, index, pos0, pos1, size0, size1, level, dLevel) {
    let tagName = Widget_$this.directive.findAttr(2);
    let pos = new QEDExplicitArray(pos0, pos1);
    let size$ = new QEDExplicitArray(size0, size1);
    Widget_$this.align(pos, size$);
    if (tagName.size())
      if (path[level] === tagName[0].value) {
        level++;
        if (level === path.size() && dLevel === index.size())
          return (new QEDExplicitArray(pos[0], pos[1], size$[0], size$[1]));
        else {
          if (Widget_$this.directive.outAttr.size())
            if (Widget_$this.directive.outNumDim) {
              let viewArray = Widget_$this.outWidget[0];
              return (viewArray.getBoundsRect(path, index, pos[0], pos[1], size$[0], size$[1], level, dLevel));
            }
            else
              if (Widget_$this.directive.outType === 0) {
                let window = Widget_$this.outWidget[0];
                return (window.getBoundsRect(path, index, pos[0], pos[1], size$[0], size$[1], level, dLevel));
              }
          return (new QEDExplicitArray());
        }
      }
    let subSize = Widget_$this.subWidgets.size();
    if (subSize) {
      let extraSpace = Widget_$this.getExtraSpace(size$);
      {
        let ndx = 0;
        while(ndx < subSize) {
          let rect$ = Widget_$this.getChildArea(ndx, size$[0], size$[1], extraSpace);
          let bounds = Widget_$this.subWidgets[ndx].getBoundsRect(path, index, pos[0] + rect$[0], pos[1] + rect$[1], rect$[2], rect$[3], level, dLevel);
          if (bounds.size())
            return (bounds);
          ndx++;
        }
      }
    }
    return (new QEDExplicitArray());
  }
  this.getEventIndex = function(event) {
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
  }
  this.align = function(pos, size1) {
    let alignAttr = Widget_$this.directive.findAttr(8);
    let posAttr = Widget_$this.directive.findAttr(10);
    let childSize = Widget_$this.size;
    {
      let dir = 0;
      while(dir < 2) {
        if (alignAttr.size()) {
          pos[dir] += (size1[dir] - childSize[dir]) * Main_$this.getDirVar(dir, alignAttr[0].value);
          size1[dir] = childSize[dir];
        }
        if (posAttr.size())
          pos[dir] += Main_$this.getDirVar(dir, posAttr[0].value);
        dir++;
      }
    }
  }
  this.getExtraSpace = function(totalSize) {
    let extraSpace = new QEDExplicitArray(0, 0);
    {
      let dir = 0;
      while(dir < 2) {
        if (Widget_$this.directive.direction & (1 << dir)) {
          extraSpace[dir] = totalSize[dir] - Widget_$this.size[dir];
          if (Widget_$this.directive.children.size() >= 2 && Widget_$this.count !== 0 && Widget_$this.expandArray[dir][Widget_$this.count - 1] > 1)
            extraSpace[dir] /= Widget_$this.expandArray[dir][Widget_$this.count - 1];
        }
        dir++;
      }
    }
    return (extraSpace);
  }
  this.getChildArea = function(index, size0, size1, extraSpace) {
    let rect$ = new QEDExplicitArray(0, 0, size0, size1);
    let subWidget = Widget_$this.subWidgets[index];
    let expandAttr = subWidget.directive.findAttr(9);
    {
      let dir = 0;
      while(dir < 2) {
        if ((Widget_$this.directive.direction & (1 << dir)) !== 0) {
          rect$[2 + dir] = subWidget.group[dir];
          if (index) {
            rect$[dir] = Widget_$this.subWidgets[index - 1].group[dir];
            rect$[2 + dir] -= rect$[dir];
          }
          if (expandAttr.size())
            rect$[2 + dir] += extraSpace[dir] * Main_$this.getDirVar(dir, expandAttr[0].value);
          let ndx = -1;
          {
            let count$ = 0;
            while(count$ < index) {
              if (Widget_$this.subWidgets[count$].directive.findAttr(9).size())
                ndx++;
              count$++;
            }
          }
          if (ndx >= 0)
            rect$[dir] += Widget_$this.expandArray[dir][ndx] * extraSpace[dir];
        }
        dir++;
      }
    }
    return (rect$);
  }
  this.group = new QEDExplicitArray();
  this.expandArray = function l() {
    let _d0 = 2;
    let _d1 = 32;
    return (new Main_$this.QEDArray(new QEDExplicitArray(_d0, _d1), (function l(pos, _HandlerFn_) {
      return (0);
    }), new QEDExplicitArray(0, 0), Main_$this.Qui_));
  }();
  this.count = 0;
  {
    let ndx = 0;
    while(ndx < this.directive.atts.size()) {
      if (Main_$this.isAreaHeritable(this.directive.atts[ndx].code))
        Main_$this.pushAttribute_$(this.directive.atts[ndx].code, this.directive.atts[ndx].value);
      ndx++;
    }
  }
  this.subWidgets = this.recalcWidgets();
  this.size = this.subWidgets.size() ? this.subWidgets[this.subWidgets.size() - 1].group : new QEDExplicitArray(0, 0);
  this.outWidget = new QEDExplicitArray();
  if (this.directive.sizeAttr.size())
    this.size = function l() {
      let _d0 = 2;
      return (new Main_$this.QEDArray(new QEDExplicitArray(_d0), (function l(pos, _HandlerFn_) {
        let i = pos[0];
        return (Main_$this.getDirVar(i, Widget_$this.directive.sizeAttr[0].value));
      }), new QEDExplicitArray(0, 0), Main_$this.Qui_));
    }();
  else
    if (this.directive.outType >= 0)
      if (this.directive.outNumDim) {
        if (this.directive.outType === 0) {
          let array = this.directive.outAttr[0].value;
          let viewArray = new Main_$this.ViewArray_(array, array.getDirs(this.directive.direction), Main_$this.resizeViewObj, Main_$this.getViewSizeObj, Main_$this.paintViewObj, Main_$this.onViewEventObj, Main_$this.getViewElementRectObj);
          this.outWidget = new QEDExplicitArray(viewArray);
          this.size = viewArray.size;
        }
        else
          if (this.directive.outType === 1) {
            let viewArray = new Main_$this.ViewArray_(this.directive.outAttr[0].value, new QEDExplicitArray(this.directive.direction & 1, this.directive.direction & 2 ? 1 : 0), Main_$this.resizeViewString, Main_$this.getViewSizeString, Main_$this.paintViewString, Main_$this.onViewEventString, Main_$this.getViewElementRectString);
            this.outWidget = new QEDExplicitArray(viewArray);
            this.size = viewArray.size;
          }
      }
      else
        if (this.directive.outType === 0) {
          let window = _refreshViews(this.directive.outAttr[0].value);
          this.outWidget = window;
          this.size = window.size() ? window[0].size : new QEDExplicitArray(0, 0);
        }
        else
          if (this.directive.outType === 1)
            this.size = Main_$this.getTextSize(this.directive.outAttr[0].value);
  {
    let ndx = this.directive.atts.size() - 1;
    while(ndx >= 0) {
      if (Main_$this.isAreaHeritable(this.directive.atts[ndx].code))
        Main_$this.popAttribute(this.directive.atts[ndx].code);
      ndx--;
    }
  }
}
this.QEDFocus_ = function(widget, rect$) {
  this.widget = widget;
  this.rect$ = rect$;
  const QEDFocus_$this = this;
  this.adjust = function(w, location, size) {
    QEDFocus_$this.widget = w;
    QEDFocus_$this.rect$[0] -= location[0];
    QEDFocus_$this.rect$[1] -= location[1];
    QEDFocus_$this.rect$[2] = size[0];
    QEDFocus_$this.rect$[3] = size[1];
  }
}
this._captureFocus = function() {
  Main_$this.qedFocus = new QEDExplicitArray(Main_$this.potentialFocus);
}
this._releaseFocus = function() {
  Main_$this.qedFocus = new QEDExplicitArray();
}
this.onGlobalEvent = function(event, location) {
  if (Main_$this.qedFocus.size()) {
    let eventIndex = Main_$this.qedFocus[0].widget.getEventIndex(event);
    if (eventIndex !== -1) {
      Main_$this.post__$(Main_$this.qedFocus[0].widget.directive.atts[eventIndex].value);
    }
  }
  else {
    Main_$this.potentialFocus = new Main_$this.QEDFocus_(null, new QEDExplicitArray(location[0], location[1], 0, 0));
    Main_$this.qedModel.windows[0].onEvent(event, location, [Main_$this.qedModel.windows[0].size[0], Main_$this.qedModel.windows[0].size[1]]);
  }
  if (postHandler)
    Main_$this.executeEvents_();
}
this.getDirVar = function(dir, value) {
  return value instanceof Array ? value[dir] : value;
}
this.Window_ = function(ui, dialog) {
  this.ui = ui;
  this.dialog = dialog;
  const Window_$this = this;
  this.paint = function(pos0, pos1, size0, size1) {
    {
      let index = 0;
      while(index < Window_$this.widgets.size()) {
        Window_$this.widgets[index].paint(pos0, pos1, size0, size1);
        index++;
      }
    }
    if (Window_$this.dialog.size())
      Window_$this.dialog[0].paint(pos0, pos1, size0, size1);
  }
  this.onEvent = function(event, location, size) {
    let flag = false;
    if (Window_$this.dialog.size())
      flag = Window_$this.dialog[0].onEvent(event, location, size);
    {
      let index = Window_$this.widgets.size() - 1;
      while(!flag && index >= 0) {
        flag = Window_$this.widgets[index].onEvent(event, location, size);
        index--;
      }
    }
    return (flag);
  }
  this.getBoundsRect = function(path, index, pos0, pos1, size0, size1, level, dLevel) {
    {
      let ndx = 0;
      while(ndx < Window_$this.widgets.size()) {
        let bounds = Window_$this.widgets[ndx].getBoundsRect(path, index, pos0, pos1, size0, size1, level, dLevel);
        if (bounds.size())
          return (bounds);
        ndx++;
      }
    }
    return (Window_$this.dialog.size() ? Window_$this.dialog[0].getBoundsRect(path, index, pos0, pos1, size0, size1, level, dLevel) : new QEDExplicitArray());
  }
  this.widgets = function l() {
    let _d0 = Window_$this.ui.size();
    return (new Main_$this.QEDArray(new QEDExplicitArray(_d0), (function l(pos, _HandlerFn_) {
      let i = pos[0];
      return (_bindHandler(new Main_$this.Widget_(Window_$this.ui[i]), _HandlerFn_));
    }), new QEDExplicitArray(0, 0), Main_$this.Qui_));
  }();
  this.previous = new QEDExplicitArray();
  {
    let index = 0;
    while(index < this.widgets.size()) {
      let sub = this.widgets[index];
      if (sub != null && sub.size && Main_$this.hasAreas(sub.directive)) {
        let previousSize = this.previous.size() ? this.previous[0].group : new QEDExplicitArray(0, 0);
        sub.group = function l() {
          let _d0 = 2;
          return (new Main_$this.QEDArray(new QEDExplicitArray(_d0), (function l(pos, _HandlerFn_) {
            let dir = pos[0];
            return (Main_$this.max(previousSize[dir], sub.size[dir]));
          }), new QEDExplicitArray(0, 0), Main_$this.Qui_));
        }();
        this.previous = new QEDExplicitArray(sub);
      }
      index++;
    }
  }
  this.size = this.widgets.size() ? this.widgets[this.widgets.size() - 1].group : new QEDExplicitArray(0, 0);
  if (this.dialog.size())
    this.size = function l() {
      let _d0 = 2;
      return (new Main_$this.QEDArray(new QEDExplicitArray(_d0), (function l(pos, _HandlerFn_) {
        let i = pos[0];
        return (Main_$this.max(Window_$this.size[i], Window_$this.dialog[0].size[i]));
      }), new QEDExplicitArray(0, 0), Main_$this.Qui_));
    }();
}
this._refreshViews = function(obj) {
  let dialog = obj.blocking__Call ? _refreshViews(obj.blocking__Call) : new QEDExplicitArray();
  return (obj.qedModel ? new QEDExplicitArray(new Main_$this.Window_(obj.qedModel, dialog)) : dialog);
}
this.displaySlider = function(x, y, width, height) {
  ctx.fillStyle = toColor(getAttribute(12));
  ctx.globalAlpha = getAttribute(13);
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
  ctx.lineTo(x - radius, y)
  ctx.fill();
}
this.displayTacos = function(x, y, width, height, count) {
  const scale = height / 80;
  const pos = (width - height * 1.25) / 2;

  // Scaled rectangle
  ctx.translate(x + pos, y);
  ctx.scale(scale, scale);

  function renderTaco(y) {
    ctx.save();
    ctx.fillStyle = toColor(getAttribute(12));
    ctx.globalAlpha = getAttribute(13);
    ctx.beginPath();
    ctx.arc(50, 50 + y, 50, 190/360 * 2 * Math.PI, -10/360 * 2 * Math.PI);
    ctx.fill();

    if (y < 60) {
      ctx.fillStyle = toColor(attributeStacks[12][attributeStacks[12].length - 2]);
//      ctx.globalAlpha = getAttribute(attributeStacks[13][attributeStacks[13].length - 2]);
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
this.showTwoTacos = function(x, y, width, height) {
  Main_$this.displayTacos(x, y, width, height, 2);
}
this.ObjectOverTextButton = function(drawObject, text) {
  this.drawObject = drawObject;
  this.text = text;
  const ObjectOverTextButton$this = this;
  this._refreshModel_ = function() {
    if (!ObjectOverTextButton$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray());
      ObjectOverTextButton$this.qedModel = new QEDExplicitArray(u1);
    }
    let u1 = ObjectOverTextButton$this.qedModel[0];
    u1.clearChange();
    u1.setAtt(0, ObjectOverTextButton$this.button);
    u1.refreshSubModel();
    u1.refreshChange();
    let _level = u1.getChangeLevel();
    return _level;
  }
  this.blocking__Call = null;
  this.button = _bindHandler(new Main_$this.RectButton((function L_() {
    const L_$this = this;
    this._refreshModel_ = function() {
      if (!L_$this.qedModel) {
        let u1 = new Main_$this.Directive_(0, 0, 2, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(1, null), new Main_$this.Attr_(8, null), new Main_$this.Attr_(12, null), new Main_$this.Attr_(10, null)), new QEDExplicitArray());
        let u2 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray());
        let u3 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(8, null), new Main_$this.Attr_(12, null)), new QEDExplicitArray());
        let u4 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray(u3));
        let u5 = new Main_$this.Directive_(2, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(8, null)), new QEDExplicitArray(u1, u2, u4));
        L_$this.qedModel = new QEDExplicitArray(u5);
      }
      let u1 = L_$this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, ((50) / 100));
      let u4 = u1.children[0];
      u4.setAtt(0, ObjectOverTextButton$this.drawObject);
      u4.setAtt(1, new QEDExplicitArray(240, 160));
      u4.setAtt(2, ((50) / 100));
      u4.setAtt(3, Main_$this.COLOR_WHITE);
      u4.setAtt(4, new QEDExplicitArray(0, -40));
      let u3 = u1.children[1];
      u3.setAtt(0, 10);
      let u2 = u1.children[2];
      u2.setAtt(0, new QEDExplicitArray(300, 50));
      let u5 = u2.children[0];
      u5.setAtt(0, ObjectOverTextButton$this.text);
      u5.setAtt(1, ((50) / 100));
      u5.setAtt(2, Main_$this.COLOR_WHITE);
      u1.refreshChange();
      let _level = u1.getChangeLevel();
      return _level;
    }
    this.qedModel = null;
  })), (function Lambda_() {
    {
      Main_$this.post_(ObjectOverTextButton$this, null);
      return;
    }
  }));
  this.qedModel = null;
}
this.ObjectBeforeTextButton = function(drawObject, text) {
  this.drawObject = drawObject;
  this.text = text;
  const ObjectBeforeTextButton$this = this;
  this._refreshModel_ = function() {
    if (!ObjectBeforeTextButton$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray());
      ObjectBeforeTextButton$this.qedModel = new QEDExplicitArray(u1);
    }
    let u1 = ObjectBeforeTextButton$this.qedModel[0];
    u1.clearChange();
    u1.setAtt(0, ObjectBeforeTextButton$this.button);
    u1.refreshSubModel();
    u1.refreshChange();
    let _level = u1.getChangeLevel();
    return _level;
  }
  this.blocking__Call = null;
  this.button = _bindHandler(new Main_$this.RectButton((function L_() {
    const L_$this = this;
    this._refreshModel_ = function() {
      if (!L_$this.qedModel) {
        let u1 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray());
        let u2 = new Main_$this.Directive_(0, 0, 2, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(1, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
        let u3 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray());
        let u4 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
        let u5 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray(u4));
        let u6 = new Main_$this.Directive_(1, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(8, null), new Main_$this.Attr_(12, null)), new QEDExplicitArray(u1, u2, u3, u5));
        L_$this.qedModel = new QEDExplicitArray(u6);
      }
      let u1 = L_$this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, new QEDExplicitArray(0, ((50) / 100)));
      u1.setAtt(1, Main_$this.COLOR_WHITE);
      let u5 = u1.children[0];
      u5.setAtt(0, 30);
      let u4 = u1.children[1];
      u4.setAtt(0, ObjectBeforeTextButton$this.drawObject);
      u4.setAtt(1, 60);
      u4.setAtt(2, ((50) / 100));
      let u3 = u1.children[2];
      u3.setAtt(0, 20);
      let u2 = u1.children[3];
      u2.setAtt(0, new QEDExplicitArray(200, 50));
      let u6 = u2.children[0];
      u6.setAtt(0, ObjectBeforeTextButton$this.text);
      u6.setAtt(1, new QEDExplicitArray(0, ((50) / 100)));
      u1.refreshChange();
      let _level = u1.getChangeLevel();
      return _level;
    }
    this.qedModel = null;
  })), (function Lambda_() {
    {
      Main_$this.post_(ObjectBeforeTextButton$this, null);
      return;
    }
  }));
  this.qedModel = null;
}
this.KeyButton = function(text) {
  this.text = text;
  const KeyButton$this = this;
  this._refreshModel_ = function() {
    if (!KeyButton$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray());
      let u2 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(5, null)), new QEDExplicitArray());
      KeyButton$this.qedModel = new QEDExplicitArray(u1, u2);
    }
    let u2 = KeyButton$this.qedModel[0];
    u2.clearChange();
    u2.setAtt(0, Main_$this.getAttribute(5) * 1.500000);
    u2.refreshChange();
    let _level = u2.getChangeLevel();
    let u1 = KeyButton$this.qedModel[1];
    u1.clearChange();
    u1.setAtt(0, KeyButton$this.button);
    u1.setAtt(1, (Main_$this.getAttribute(5) * (text.length > 1 ? 0.500000 : 1)));
    Main_$this.pushAttribute_$(5, u1.atts[1].value);
    u1.refreshSubModel();
    Main_$this.popAttribute(5);
    u1.refreshChange();
    _level = Main_$this.max(_level, u1.getChangeLevel());
    return _level;
  }
  this.blocking__Call = null;
  this.button = _bindHandler(new Main_$this.TextButton(this.text), (function Lambda_(_ret) {
    {
      Main_$this.post_(KeyButton$this, KeyButton$this.text);
      return;
    }
  }));
  this.qedModel = null;
}
this.NumericKeyboardWidget = function() {
  const NumericKeyboardWidget$this = this;
  this.Row = function(row) {
    this.row = row;
    const Row$this = this;
    this._refreshModel_ = function() {
      if (!Row$this.qedModel) {
        let u1 = new Main_$this.Directive_(0, 1, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
        Row$this.qedModel = new QEDExplicitArray(u1);
      }
      let u1 = Row$this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, Row$this.buttons);
      u1.setAtt(1, ((50) / 100));
      u1.refreshSubModel();
      u1.refreshChange();
      let _level = u1.getChangeLevel();
      return _level;
    }
    this.blocking__Call$ = null;
    this.buttons = _bindHandler(function l() {
      let _d0 = NumericKeyboardWidget$this.numKeyboardRows[Row$this.row].length;
      return (new Main_$this.QEDArray(new QEDExplicitArray(_d0), (function l(pos, _HandlerFn_) {
        let index = pos[0];
        return (_bindHandler(new Main_$this.KeyButton(NumericKeyboardWidget$this.numKeyboardRows[Row$this.row].charAt(index)), _HandlerFn_));
      }), new QEDExplicitArray(1, 0), Main_$this.Qui_));
    }(), (function Lambda_(_index, _ret) {
      {
        Main_$this.post_(Row$this, _ret);
        return;
      }
    }));
    this.qedModel = null;
  }
  this._refreshModel_ = function() {
    if (!NumericKeyboardWidget$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 1, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray());
      let u2 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray());
      let u3 = new Main_$this.Directive_(1, 1, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
      let u4 = new Main_$this.Directive_(2, 0, -1, new QEDExplicitArray(), new QEDExplicitArray(u1, u2, u3));
      NumericKeyboardWidget$this.qedModel = new QEDExplicitArray(u4);
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
  }
  this.blocking__Call = null;
  this.typedText = "";
  this.numKeyboardRows = new QEDExplicitArray("789", "456", "123");
  this.rows = _bindHandler(function l() {
    let _d0 = NumericKeyboardWidget$this.numKeyboardRows.size();
    return (new Main_$this.QEDArray(new QEDExplicitArray(_d0), (function l(pos, _HandlerFn_) {
      let i = pos[0];
      return (_bindHandler(new NumericKeyboardWidget$this.Row(i), _HandlerFn_));
    }), new QEDExplicitArray(0, 1), Main_$this.Qui_));
  }(), (function Lambda_(_index, _ret) {
    {
      NumericKeyboardWidget$this.typedText += _ret;
      {
        Main_$this.post_(NumericKeyboardWidget$this, NumericKeyboardWidget$this.typedText);
        return;
      }
    }
  }));
  this.lastRow = new QEDExplicitArray(_bindHandler(new Main_$this.KeyButton("Clear"), (function Lambda_(_ret) {
    {
      NumericKeyboardWidget$this.typedText = "";
      {
        Main_$this.post_(NumericKeyboardWidget$this, NumericKeyboardWidget$this.typedText);
        return;
      }
    }
  })), _bindHandler(new Main_$this.KeyButton("0"), (function Lambda_(_ret) {
    {
      NumericKeyboardWidget$this.typedText += "0";
      {
        Main_$this.post_(NumericKeyboardWidget$this, NumericKeyboardWidget$this.typedText);
        return;
      }
    }
  })), _bindHandler(new Main_$this.KeyButton("Del"), (function Lambda_(_ret) {
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
this.AlphaKeyboardWidget = function() {
  const AlphaKeyboardWidget$this = this;
  this.Row = function(row) {
    this.row = row;
    const Row$this = this;
    this._refreshModel_ = function() {
      if (!Row$this.qedModel) {
        let u1 = new Main_$this.Directive_(0, 1, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
        Row$this.qedModel = new QEDExplicitArray(u1);
      }
      let u1 = Row$this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, Row$this.buttons);
      u1.setAtt(1, ((50) / 100));
      u1.refreshSubModel();
      u1.refreshChange();
      let _level = u1.getChangeLevel();
      return _level;
    }
    this.blocking__Call$ = null;
    this.buttons = _bindHandler(function l() {
      let _d0 = AlphaKeyboardWidget$this.alphaKeyboardRows[Row$this.row].length;
      return (new Main_$this.QEDArray(new QEDExplicitArray(_d0), (function l(pos, _HandlerFn_) {
        let index = pos[0];
        return (_bindHandler(new Main_$this.KeyButton(AlphaKeyboardWidget$this.alphaKeyboardRows[Row$this.row].charAt(index)), _HandlerFn_));
      }), new QEDExplicitArray(1, 0), Main_$this.Qui_));
    }(), (function Lambda_(_index, _ret) {
      {
        Main_$this.post_(Row$this, _ret);
        return;
      }
    }));
    this.qedModel = null;
  }
  this.SpaceFunc = function() {
    const SpaceFunc$this = this;
    this._refreshModel_ = function() {
      if (!SpaceFunc$this.qedModel) {
        let u1 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray());
        SpaceFunc$this.qedModel = new QEDExplicitArray(u1);
      }
      let u1 = SpaceFunc$this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, new QEDExplicitArray(200, 1));
      u1.refreshChange();
      let _level = u1.getChangeLevel();
      return _level;
    }
    this.blocking__Call$ = null;
    this.qedModel = null;
  }
  this._refreshModel_ = function() {
    if (!AlphaKeyboardWidget$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 1, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray());
      let u2 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray());
      let u3 = new Main_$this.Directive_(1, 1, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
      let u4 = new Main_$this.Directive_(2, 0, -1, new QEDExplicitArray(), new QEDExplicitArray(u1, u2, u3));
      AlphaKeyboardWidget$this.qedModel = new QEDExplicitArray(u4);
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
  }
  this.blocking__Call = null;
  this.typedText = "";
  this.alphaKeyboardRows = new QEDExplicitArray("1234567890", "QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM");
  this.rows = _bindHandler(function l() {
    let _d0 = AlphaKeyboardWidget$this.alphaKeyboardRows.size();
    return (new Main_$this.QEDArray(new QEDExplicitArray(_d0), (function l(pos, _HandlerFn_) {
      let i = pos[0];
      return (_bindHandler(new AlphaKeyboardWidget$this.Row(i), _HandlerFn_));
    }), new QEDExplicitArray(0, 1), Main_$this.Qui_));
  }(), (function Lambda_(_index, _ret) {
    {
      AlphaKeyboardWidget$this.typedText += _ret;
      {
        Main_$this.post_(AlphaKeyboardWidget$this, AlphaKeyboardWidget$this.typedText);
        return;
      }
    }
  }));
  this.lastRow = new QEDExplicitArray(_bindHandler(new Main_$this.KeyButton("Clear"), (function Lambda_(_ret) {
    {
      AlphaKeyboardWidget$this.typedText = "";
      {
        Main_$this.post_(AlphaKeyboardWidget$this, AlphaKeyboardWidget$this.typedText);
        return;
      }
    }
  })), _bindHandler(new Main_$this.RectButton(this.SpaceFunc), (function Lambda_() {
    {
      AlphaKeyboardWidget$this.typedText += " ";
      {
        Main_$this.post_(AlphaKeyboardWidget$this, AlphaKeyboardWidget$this.typedText);
        return;
      }
    }
  })), _bindHandler(new Main_$this.KeyButton("Del"), (function Lambda_(_ret) {
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
this.SpinnerWidget = function() {
  const SpinnerWidget$this = this;
  this.Circle = function(index) {
    this.index = index;
    const Circle$this = this;
    this._refreshModel_ = function() {
      if (!Circle$this.qedModel) {
        let u1 = new Main_$this.Directive_(0, 0, 2, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(1, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
        let u2 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(15, null)), new QEDExplicitArray(u1));
        Circle$this.qedModel = new QEDExplicitArray(u2);
      }
      let u1 = Circle$this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, (SpinnerWidget$this.angle + Circle$this.index) * 2 * 3.141593 / SpinnerWidget$this.numCircles);
      let u2 = u1.children[0];
      u2.setAtt(0, Main_$this.oval);
      u2.setAtt(1, 15);
      u2.setAtt(2, new QEDExplicitArray(((100) / 100), ((50) / 100)));
      u1.refreshChange();
      let _level = u1.getChangeLevel();
      return _level;
    }
    this.blocking__Call$ = null;
    this.qedModel = null;
  }
  this._refreshModel_ = function() {
    if (!SpinnerWidget$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 1, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray());
      let u2 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray(u1));
      SpinnerWidget$this.qedModel = new QEDExplicitArray(u2);
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
  }
  this.blocking__Call = null;
  this.angle = 0;
  this.numCircles = 7;
  this.stopped = false;
  this.circles = function l() {
    let _d0 = SpinnerWidget$this.numCircles;
    return (new Main_$this.QEDArray(new QEDExplicitArray(_d0), (function l(pos, _HandlerFn_) {
      let index = pos[0];
      return (_bindHandler(new SpinnerWidget$this.Circle(index), _HandlerFn_));
    }), new QEDExplicitArray(0, 0), Main_$this.Qui_));
  }();
  (function while121$_() {
    if (!SpinnerWidget$this.stopped) {
      SpinnerWidget$this.blocking__Call = _bindHandler(new Main_$this.Animation(), (function Lambda_(_ret) {
        SpinnerWidget$this.blocking__Call = null;
        SpinnerWidget$this.angle = _ret / 2000 * 2 * 3.141593;
        while121$_();
      }));
    }
    else
      SpinnerWidget$this.qedModel = null;
  })();
}
this.LargerButton = function(text) {
  this.text = text;
  const LargerButton$this = this;
  this._refreshModel_ = function() {
    if (!LargerButton$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null), new Main_$this.Attr_(9, null)), new QEDExplicitArray());
      let u2 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray());
      LargerButton$this.qedModel = new QEDExplicitArray(u1, u2);
    }
    let u2 = LargerButton$this.qedModel[0];
    u2.clearChange();
    u2.setAtt(0, new QEDExplicitArray(0, Main_$this.getAttribute(5) * 2.500000));
    u2.setAtt(1, ((100) / 100));
    u2.refreshChange();
    let _level = u2.getChangeLevel();
    let u1 = LargerButton$this.qedModel[1];
    u1.clearChange();
    u1.setAtt(0, LargerButton$this.button);
    u1.refreshSubModel();
    u1.refreshChange();
    _level = Main_$this.max(_level, u1.getChangeLevel());
    return _level;
  }
  this.blocking__Call = null;
  this.button = _bindHandler(new Main_$this.TextButton("   " + this.text + "   "), (function Lambda_(_ret) {
    {
      Main_$this.post_(LargerButton$this, LargerButton$this.text);
      return;
    }
  }));
  this.qedModel = null;
}
this.getTimestamp = function() {
  const date = new Date();
  let minutes = date.getMinutes();
  return ((date.getHours()) + ":" + (minutes < 10 ? "0" : "") + (minutes));
}
this.formatMoney = function(amount) {
  let dollars = Math.trunc(amount);
  let cents = Math.round((amount - dollars) * 100);
  return ("$" + dollars + "." + (cents < 10 ? "0" : "") + cents);
}
this.NumTacosWidget = function() {
  const NumTacosWidget$this = this;
  this.NumButton = function(num) {
    this.num = num;
    const NumButton$this = this;
    this.showTacos = function(x, y, width, height) {
      Main_$this.displayTacos(x, y, width, height, NumButton$this.num);
    }
    this._refreshModel_ = function() {
      if (!NumButton$this.qedModel) {
        let u1 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray());
        NumButton$this.qedModel = new QEDExplicitArray(u1);
      }
      let u1 = NumButton$this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, NumButton$this.button);
      u1.refreshSubModel();
      u1.refreshChange();
      let _level = u1.getChangeLevel();
      return _level;
    }
    this.blocking__Call$ = null;
    this.button = _bindHandler(new Main_$this.RectButton((function L() {
      const L$this = this;
      this._refreshModel_ = function() {
        if (!L$this.qedModel) {
          let u1 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray());
          let u2 = new Main_$this.Directive_(0, 0, 2, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(1, null), new Main_$this.Attr_(8, null), new Main_$this.Attr_(12, null), new Main_$this.Attr_(10, null)), new QEDExplicitArray());
          let u3 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray(u2));
          let u4 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(5, null), new Main_$this.Attr_(8, null), new Main_$this.Attr_(12, null)), new QEDExplicitArray());
          let u5 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(), new QEDExplicitArray(u3, u4));
          let u6 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray());
          let u7 = new Main_$this.Directive_(2, 0, -1, new QEDExplicitArray(), new QEDExplicitArray(u1, u5, u6));
          L$this.qedModel = new QEDExplicitArray(u7);
        }
        let u1 = L$this.qedModel[0];
        u1.clearChange();
        let u4 = u1.children[0];
        u4.setAtt(0, 15);
        let u3 = u1.children[1];
        let u6 = u3.children[0];
        u6.setAtt(0, new QEDExplicitArray(175, 70));
        u6.setAtt(1, ((50) / 100));
        let u7 = u6.children[0];
        u7.setAtt(0, NumButton$this.showTacos);
        u7.setAtt(1, 70);
        u7.setAtt(2, ((50) / 100));
        u7.setAtt(3, 13686474);
        u7.setAtt(4, new QEDExplicitArray(0, -20));
        let u5 = u3.children[1];
        u5.setAtt(0, "" + NumButton$this.num);
        u5.setAtt(1, 100);
        u5.setAtt(2, ((50) / 100));
        u5.setAtt(3, Main_$this.COLOR_WHITE);
        let u2 = u1.children[2];
        u2.setAtt(0, 15);
        u1.refreshChange();
        let _level = u1.getChangeLevel();
        return _level;
      }
      this.blocking__Call$$ = null;
      this.qedModel = null;
    })), (function Lambda_() {
      {
        Main_$this.post_(NumButton$this, NumButton$this.num);
        return;
      }
    }));
    this.qedModel = null;
  }
  this._refreshModel_ = function() {
    if (!NumTacosWidget$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray());
      let u2 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
      let u3 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray());
      let u4 = new Main_$this.Directive_(0, 1, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(6, null), new Main_$this.Attr_(14, null), new Main_$this.Attr_(5, null), new Main_$this.Attr_(12, null)), new QEDExplicitArray());
      let u5 = new Main_$this.Directive_(2, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(8, null)), new QEDExplicitArray(u1, u2, u3, u4));
      NumTacosWidget$this.qedModel = new QEDExplicitArray(u5);
    }
    let u1 = NumTacosWidget$this.qedModel[0];
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
    u2.setAtt(0, NumTacosWidget$this.numTacosButtonArray);
    u2.setAtt(1, 15);
    u2.setAtt(2, 15);
    u2.setAtt(3, 15);
    u2.setAtt(4, 11647912);
    Main_$this.pushAttribute_$(5, u2.atts[3].value);
    u2.refreshSubModel();
    Main_$this.popAttribute(5);
    u1.refreshChange();
    let _level = u1.getChangeLevel();
    return _level;
  }
  this.blocking__Call = null;
  this.numTacosButtonArray = _bindHandler(function l() {
    let _d0 = 4;
    return (new Main_$this.QEDArray(new QEDExplicitArray(_d0), (function l(pos, _HandlerFn_) {
      let index = pos[0];
      return (_bindHandler(new NumTacosWidget$this.NumButton(index + 1), _HandlerFn_));
    }), new QEDExplicitArray(1, 0), Main_$this.Qui_));
  }(), (function Lambda_(_index, _ret) {
    {
      Main_$this.post_(NumTacosWidget$this, _ret);
      return;
    }
  }));
  this.qedModel = null;
}
this.RoomNumberWidget = function() {
  const RoomNumberWidget$this = this;
  this._refreshModel_ = function() {
    if (!RoomNumberWidget$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray());
      let u2 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
      let u3 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(5, null), new Main_$this.Attr_(12, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
      let u4 = new Main_$this.Directive_(0, 0, 2, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(1, null), new Main_$this.Attr_(12, null), new Main_$this.Attr_(14, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray(u3));
      let u5 = new Main_$this.Directive_(2, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(8, null), new Main_$this.Attr_(9, null)), new QEDExplicitArray(u2, u4));
      let u6 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null), new Main_$this.Attr_(9, null)), new QEDExplicitArray(u5));
      let u7 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(5, null), new Main_$this.Attr_(6, null), new Main_$this.Attr_(14, null), new Main_$this.Attr_(12, null), new Main_$this.Attr_(8, null), new Main_$this.Attr_(9, null)), new QEDExplicitArray());
      let u8 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null), new Main_$this.Attr_(9, null)), new QEDExplicitArray(u7));
      let u9 = new Main_$this.Directive_(1, 0, -1, new QEDExplicitArray(), new QEDExplicitArray(u6, u8));
      let u10 = new Main_$this.Directive_(2, 0, -1, new QEDExplicitArray(), new QEDExplicitArray(u1, u9));
      let u11 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(5, null), new Main_$this.Attr_(12, null), new Main_$this.Attr_(8, null), new Main_$this.Attr_(10, null)), new QEDExplicitArray());
      RoomNumberWidget$this.qedModel = new QEDExplicitArray(u10, u11);
    }
    let u2 = RoomNumberWidget$this.qedModel[0];
    u2.clearChange();
    let u4 = u2.children[0];
    u4.setAtt(0, 25);
    let u3 = u2.children[1];
    let u6 = u3.children[0];
    u6.setAtt(0, new QEDExplicitArray(400, 300));
    u6.setAtt(1, ((100) / 100));
    let u7 = u6.children[0];
    u7.setAtt(0, new QEDExplicitArray(((50) / 100), ((0) / 100)));
    u7.setAtt(1, ((100) / 100));
    let u9 = u7.children[0];
    u9.setAtt(0, "Type your room number");
    u9.setAtt(1, ((50) / 100));
    let u8 = u7.children[1];
    u8.setAtt(0, Main_$this.roundRect);
    u8.setAtt(1, new QEDExplicitArray(300, 40));
    u8.setAtt(2, 14537191);
    u8.setAtt(3, 20);
    u8.setAtt(4, ((0) / 100));
    let u10 = u8.children[0];
    u10.setAtt(0, RoomNumberWidget$this.phoneNumber);
    u10.setAtt(1, 30);
    u10.setAtt(2, 5788508);
    u10.setAtt(3, ((50) / 100));
    let u5 = u3.children[1];
    u5.setAtt(0, new QEDExplicitArray(400, 300));
    u5.setAtt(1, ((100) / 100));
    let u11 = u5.children[0];
    u11.setAtt(0, RoomNumberWidget$this.numericKeyboard);
    u11.setAtt(1, 40);
    u11.setAtt(2, 10);
    u11.setAtt(3, 20);
    u11.setAtt(4, 11243204);
    u11.setAtt(5, ((0) / 100));
    u11.setAtt(6, ((100) / 100));
    Main_$this.pushAttribute_$(5, u11.atts[1].value);
    u11.refreshSubModel();
    Main_$this.popAttribute(5);
    u2.refreshChange();
    let _level = u2.getChangeLevel();
    let u1 = RoomNumberWidget$this.qedModel[1];
    u1.clearChange();
    u1.setAtt(0, RoomNumberWidget$this.nextButton);
    u1.setAtt(1, 25);
    u1.setAtt(2, 10012308);
    u1.setAtt(3, ((100) / 100));
    u1.setAtt(4, -25);
    Main_$this.pushAttribute_$(5, u1.atts[1].value);
    u1.refreshSubModel();
    Main_$this.popAttribute(5);
    u1.refreshChange();
    _level = Main_$this.max(_level, u1.getChangeLevel());
    return _level;
  }
  this.blocking__Call = null;
  this.phoneNumber = "";
  this.numericKeyboard = _bindHandler(new Main_$this.NumericKeyboardWidget(), (function Lambda_(_ret) {
    (RoomNumberWidget$this.phoneNumber = _ret)
  }));
  this.nextButton = _bindHandler(new Main_$this.LargerButton("Next"), (function Lambda_(_ret) {
    {
      Main_$this.post_(RoomNumberWidget$this, RoomNumberWidget$this.phoneNumber);
      return;
    }
  }));
  this.qedModel = null;
}
this.GuestNameWidget = function() {
  const GuestNameWidget$this = this;
  this._refreshModel_ = function() {
    if (!GuestNameWidget$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray());
      let u2 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(5, null), new Main_$this.Attr_(12, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
      let u3 = new Main_$this.Directive_(0, 0, 2, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(1, null), new Main_$this.Attr_(12, null), new Main_$this.Attr_(14, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray(u2));
      let u4 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray());
      let u5 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(5, null), new Main_$this.Attr_(6, null), new Main_$this.Attr_(14, null), new Main_$this.Attr_(12, null)), new QEDExplicitArray());
      let u6 = new Main_$this.Directive_(2, 0, -1, new QEDExplicitArray(), new QEDExplicitArray(u1, u3, u4, u5));
      let u7 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(5, null), new Main_$this.Attr_(12, null), new Main_$this.Attr_(8, null), new Main_$this.Attr_(10, null)), new QEDExplicitArray());
      GuestNameWidget$this.qedModel = new QEDExplicitArray(u6, u7);
    }
    let u2 = GuestNameWidget$this.qedModel[0];
    u2.clearChange();
    let u6 = u2.children[0];
    u6.setAtt(0, 25);
    let u5 = u2.children[1];
    u5.setAtt(0, Main_$this.roundRect);
    u5.setAtt(1, new QEDExplicitArray(430, 40));
    u5.setAtt(2, 11849722);
    u5.setAtt(3, 20);
    u5.setAtt(4, ((50) / 100));
    let u7 = u5.children[0];
    u7.setAtt(0, GuestNameWidget$this.zipCode.length ? GuestNameWidget$this.zipCode : "Enter the guest's family name");
    u7.setAtt(1, 30);
    u7.setAtt(2, 8229039);
    u7.setAtt(3, ((50) / 100));
    let u4 = u2.children[2];
    u4.setAtt(0, 25);
    let u3 = u2.children[3];
    u3.setAtt(0, GuestNameWidget$this.alphaKeyboard);
    u3.setAtt(1, 30);
    u3.setAtt(2, 10);
    u3.setAtt(3, 6);
    u3.setAtt(4, 8229039);
    Main_$this.pushAttribute_$(5, u3.atts[1].value);
    u3.refreshSubModel();
    Main_$this.popAttribute(5);
    u2.refreshChange();
    let _level = u2.getChangeLevel();
    let u1 = GuestNameWidget$this.qedModel[1];
    u1.clearChange();
    u1.setAtt(0, GuestNameWidget$this.nextButton);
    u1.setAtt(1, 25);
    u1.setAtt(2, 10012308);
    u1.setAtt(3, ((100) / 100));
    u1.setAtt(4, -25);
    Main_$this.pushAttribute_$(5, u1.atts[1].value);
    u1.refreshSubModel();
    Main_$this.popAttribute(5);
    u1.refreshChange();
    _level = Main_$this.max(_level, u1.getChangeLevel());
    return _level;
  }
  this.blocking__Call = null;
  this.zipCode = "";
  this.alphaKeyboard = _bindHandler(new Main_$this.AlphaKeyboardWidget(), (function Lambda_(_ret) {
    (GuestNameWidget$this.zipCode = _ret)
  }));
  this.nextButton = _bindHandler(new Main_$this.LargerButton("Next"), (function Lambda_(_ret) {
    {
      Main_$this.post_(GuestNameWidget$this, GuestNameWidget$this.zipCode);
      return;
    }
  }));
  this.qedModel = null;
}
this.Widget = function() {
  const Widget$this = this;
  this._refreshModel_ = function() {
    if (!Widget$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray());
      Widget$this.qedModel = new QEDExplicitArray(u1);
    }
    let u1 = Widget$this.qedModel[0];
    u1.clearChange();
    u1.setAtt(0, "");
    u1.refreshChange();
    let _level = u1.getChangeLevel();
    return _level;
  }
  this.blocking__Call = null;
  this.qedModel = null;
}
this.TransactionEntry = function() {
  const TransactionEntry$this = this;
  this.getPrice = function() {
    return (Main_$this.formatMoney(TransactionEntry$this.tacoPrice));
  }
  this.getTotal = function() {
    return (Main_$this.formatMoney(TransactionEntry$this.numTacos * TransactionEntry$this.tacoPrice));
  }
  this.blocking__Call = null;
  this.numTacos = 0;
  this.tacoPrice = 3.050000;
  this.guestName = "";
  this.roomNumber = "";
}
this.SummaryWidget = function(entry) {
  this.entry = entry;
  const SummaryWidget$this = this;
  this._refreshModel_ = function() {
    if (!SummaryWidget$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 0, 2, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(9, null), new Main_$this.Attr_(12, null)), new QEDExplicitArray());
      let u2 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray());
      let u3 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray());
      let u4 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray());
      let u5 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray());
      let u6 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray());
      let u7 = new Main_$this.Directive_(2, 0, -1, new QEDExplicitArray(), new QEDExplicitArray(u2, u3, u4, u5, u6));
      let u8 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(), new QEDExplicitArray(u1, u7));
      let u9 = new Main_$this.Directive_(0, 0, 2, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(9, null), new Main_$this.Attr_(12, null)), new QEDExplicitArray());
      let u10 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
      let u11 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
      let u12 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
      let u13 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
      let u14 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
      let u15 = new Main_$this.Directive_(2, 0, -1, new QEDExplicitArray(), new QEDExplicitArray(u10, u11, u12, u13, u14));
      let u16 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(), new QEDExplicitArray(u9, u15));
      let u17 = new Main_$this.Directive_(1, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(8, null), new Main_$this.Attr_(5, null), new Main_$this.Attr_(12, null)), new QEDExplicitArray(u8, u16));
      let u18 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(5, null), new Main_$this.Attr_(12, null), new Main_$this.Attr_(8, null), new Main_$this.Attr_(10, null)), new QEDExplicitArray());
      SummaryWidget$this.qedModel = new QEDExplicitArray(u17, u18);
    }
    let u2 = SummaryWidget$this.qedModel[0];
    u2.clearChange();
    u2.setAtt(0, ((50) / 100));
    u2.setAtt(1, 30);
    u2.setAtt(2, Main_$this.COLOR_WHITE);
    Main_$this.pushAttribute_$(5, u2.atts[1].value);
    let u4 = u2.children[0];
    let u6 = u4.children[0];
    u6.setAtt(0, Main_$this.rect);
    u6.setAtt(1, ((100) / 100));
    u6.setAtt(2, 9925231);
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
    u13.setAtt(2, 11305855);
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
    u1.setAtt(2, 10012308);
    u1.setAtt(3, ((100) / 100));
    u1.setAtt(4, -25);
    Main_$this.pushAttribute_$(5, u1.atts[1].value);
    u1.refreshSubModel();
    Main_$this.popAttribute(5);
    u1.refreshChange();
    _level = Main_$this.max(_level, u1.getChangeLevel());
    return _level;
  }
  this.blocking__Call = null;
  this.nextButton = _bindHandler(new Main_$this.LargerButton("Confirm"), (function Lambda_(_ret) {
    {
      Main_$this.post_(SummaryWidget$this, null);
      return;
    }
  }));
  this.qedModel = null;
}
this.GetTransactionEntry = function(entry) {
  this.entry = entry;
  const GetTransactionEntry$this = this;
  this.Pane = function(title, widget) {
    this.title = title;
    this.widget = widget;
    const Pane$this = this;
    this._refreshModel_ = function() {
      if (!Pane$this.qedModel) {
        let u1 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null), new Main_$this.Attr_(9, null)), new QEDExplicitArray());
        let u2 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(9, null), new Main_$this.Attr_(-1, (function W3$_() {
          0;
        })), new Main_$this.Attr_(-2, (function W4$_() {
          0;
        }))), new QEDExplicitArray());
        Pane$this.qedModel = new QEDExplicitArray(u1, u2);
      }
      let u2 = Pane$this.qedModel[0];
      u2.clearChange();
      u2.setAtt(0, new QEDExplicitArray(800, 400));
      u2.setAtt(1, new QEDExplicitArray(0, ((100) / 100)));
      u2.refreshChange();
      let _level = u2.getChangeLevel();
      let u1 = Pane$this.qedModel[1];
      u1.clearChange();
      u1.setAtt(0, Pane$this.widget);
      u1.setAtt(1, ((100) / 100));
      u1.refreshSubModel();
      u1.refreshChange();
      _level = Main_$this.max(_level, u1.getChangeLevel());
      return _level;
    }
    this.blocking__Call$ = null;
    this.qedModel = null;
  }
  this.TabLabel = function(pane) {
    this.pane = pane;
    const TabLabel$this = this;
    this._refreshModel_ = function() {
      if (!TabLabel$this.qedModel) {
        let u1 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null)), new QEDExplicitArray());
        TabLabel$this.qedModel = new QEDExplicitArray(u1);
      }
      let u1 = TabLabel$this.qedModel[0];
      u1.clearChange();
      u1.setAtt(0, TabLabel$this.button);
      u1.refreshSubModel();
      u1.refreshChange();
      let _level = u1.getChangeLevel();
      return _level;
    }
    this.blocking__Call$ = null;
    this.text = "    " + (this.pane + 1) + "." + GetTransactionEntry$this.panes[this.pane].title + "    ";
    this.button = _bindHandler(new Main_$this.GenericButton((function L_(pressed) {
      this.pressed = pressed;
      const L_$this = this;
      this._refreshModel_ = function() {
        if (!L_$this.qedModel) {
          let u1 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(13, null)), new QEDExplicitArray());
          L_$this.qedModel = new QEDExplicitArray(u1);
        }
        let u1 = L_$this.qedModel[0];
        u1.clearChange();
        u1.setAtt(0, TabLabel$this.text);
        u1.setAtt(1, TabLabel$this.pane > GetTransactionEntry$this.maxIndex ? ((50) / 100) : L_$this.pressed[0] ? ((35) / 100) : ((100) / 100));
        u1.refreshChange();
        let _level = u1.getChangeLevel();
        return _level;
      }
      this.qedModel = null;
    })), (function Lambda_() {
      new (function W140$_(i138$_) {
        this.i138$_ = i138$_;
        if (TabLabel$this.pane <= GetTransactionEntry$this.maxIndex) {
          {
            Main_$this.post_(TabLabel$this, null);
            return;
          }
          i138$_();
        }
        else
          i138$_();
      })((function c139$_() {
      }));
    }));
    this.qedModel = null;
  }
  this.NextPane = function() {
    const NextPane$this = this;
    this.blocking__Call$ = null;
    this.blocking__Call$ = _bindHandler(new GetTransactionEntry$this.SetPane(GetTransactionEntry$this.paneIndex + 1), (function Lambda_() {
      NextPane$this.blocking__Call$ = null;
      {
        Main_$this.post_(NextPane$this, null);
        return;
      }
    }));
  }
  this.SetPane = function(index) {
    this.index = index;
    const SetPane$this = this;
    this.blocking__Call$ = null;
    GetTransactionEntry$this.bounds = Main_$this.getBounds(new QEDExplicitArray("application", "titles"), new QEDExplicitArray(this.index));
    GetTransactionEntry$this.paneIndex = this.index;
    GetTransactionEntry$this.maxIndex = Main_$this.max(GetTransactionEntry$this.maxIndex, GetTransactionEntry$this.paneIndex);
    {
      Main_$this.post_(SetPane$this, null);
      return;
    }
  }
  this._refreshModel_ = function() {
    if (!GetTransactionEntry$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 0, 2, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(10, null), new Main_$this.Attr_(1, null), new Main_$this.Attr_(12, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
      let u2 = new Main_$this.Directive_(0, 1, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(9, null), new Main_$this.Attr_(12, null), new Main_$this.Attr_(5, null), new Main_$this.Attr_(2, null)), new QEDExplicitArray());
      let u3 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(9, null)), new QEDExplicitArray());
      let u4 = new Main_$this.Directive_(2, 0, -1, new QEDExplicitArray(), new QEDExplicitArray(u2, u3));
      GetTransactionEntry$this.qedModel = new QEDExplicitArray(u1, u4);
    }
    let u2 = GetTransactionEntry$this.qedModel[0];
    u2.clearChange();
    u2.setAtt(0, Main_$this.displaySlider);
    u2.setAtt(1, new QEDExplicitArray(GetTransactionEntry$this.bounds[0], -1));
    u2.setAtt(2, new QEDExplicitArray(GetTransactionEntry$this.bounds[2], GetTransactionEntry$this.bounds[3] + 1));
    u2.setAtt(3, 12499120);
    u2.setAtt(4, 0);
    u2.refreshChange();
    let _level = u2.getChangeLevel();
    let u1 = GetTransactionEntry$this.qedModel[1];
    u1.clearChange();
    let u4 = u1.children[0];
    u4.setAtt(0, GetTransactionEntry$this.titles);
    u4.setAtt(1, new QEDExplicitArray(((100) / 100), 0));
    u4.setAtt(2, 7828334);
    u4.setAtt(3, 20);
    u4.setAtt(4, "titles");
    Main_$this.pushAttribute_$(5, u4.atts[3].value);
    u4.refreshSubModel();
    Main_$this.popAttribute(5);
    let u3 = u1.children[1];
    u3.setAtt(0, GetTransactionEntry$this.panes[GetTransactionEntry$this.paneIndex]);
    u3.setAtt(1, ((100) / 100));
    u3.refreshSubModel();
    u1.refreshChange();
    _level = Main_$this.max(_level, u1.getChangeLevel());
    return _level;
  }
  this.blocking__Call = null;
  this.oldIndex = 0;
  this.paneIndex = 0;
  this.maxIndex = this.paneIndex;
  this.bounds = new QEDExplicitArray(0, 0, 0, 0);
  this.triggerExit = _bindHandler(new Main_$this.Yield(), (function Lambda_(_ret) {
    {
      Main_$this.exitHandler.pop();
      {
        Main_$this.post_(GetTransactionEntry$this, false);
        return;
      }
    }
  }));
  Main_$this.exitHandler[0] = this.triggerExit;
  this.panes = new QEDExplicitArray(new this.Pane("Count", (_bindHandler(new Main_$this.NumTacosWidget(), (function Lambda_(_ret) {
    {
      GetTransactionEntry$this.entry.numTacos = _ret;
      GetTransactionEntry$this.blocking__Call = _bindHandler(new GetTransactionEntry$this.NextPane(), (function Lambda_$() {
        GetTransactionEntry$this.blocking__Call = null;
      }));
    }
  })))), new this.Pane("Room", (_bindHandler(new Main_$this.RoomNumberWidget(), (function Lambda_(_ret) {
    {
      GetTransactionEntry$this.entry.roomNumber = _ret;
      GetTransactionEntry$this.blocking__Call = _bindHandler(new GetTransactionEntry$this.NextPane(), (function Lambda_$() {
        GetTransactionEntry$this.blocking__Call = null;
      }));
    }
  })))), new this.Pane("Guest", (_bindHandler(new Main_$this.GuestNameWidget(), (function Lambda_(_ret) {
    {
      GetTransactionEntry$this.entry.guestName = _ret;
      GetTransactionEntry$this.blocking__Call = _bindHandler(new GetTransactionEntry$this.NextPane(), (function Lambda_$() {
        GetTransactionEntry$this.blocking__Call = null;
      }));
    }
  })))), new this.Pane("Summary", (_bindHandler(new Main_$this.SummaryWidget(this.entry), (function Lambda_() {
    {
      Main_$this.exitHandler.pop();
      {
        Main_$this.post_(GetTransactionEntry$this, true);
        return;
      }
    }
  })))));
  this.titles = _bindHandler(function l() {
    let _d0 = GetTransactionEntry$this.panes.size();
    return (new Main_$this.QEDArray(new QEDExplicitArray(_d0), (function l(pos, _HandlerFn_) {
      let pane = pos[0];
      return (_bindHandler((new GetTransactionEntry$this.TabLabel(pane)), _HandlerFn_));
    }), new QEDExplicitArray(1, 0), Main_$this.Qui_));
  }(), (function Lambda_(_index, _ret) {
    GetTransactionEntry$this.blocking__Call = _bindHandler(new GetTransactionEntry$this.SetPane(_index), (function Lambda_$() {
      GetTransactionEntry$this.blocking__Call = null;
    }));
  }));
  this.blocking__Call = _bindHandler(new Main_$this.Timer(1), (function Lambda_(_ret) {
    GetTransactionEntry$this.blocking__Call = null;
    GetTransactionEntry$this.blocking__Call = _bindHandler(new GetTransactionEntry$this.SetPane(0), (function Lambda_$() {
      GetTransactionEntry$this.blocking__Call = null;
      GetTransactionEntry$this.qedModel = null;
    }));
  }));
}
this.OrderTacos = function(transactionEntry) {
  this.transactionEntry = transactionEntry;
  const OrderTacos$this = this;
  this._refreshModel_ = function() {
    if (!OrderTacos$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
      let u2 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray());
      let u3 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
      let u4 = new Main_$this.Directive_(2, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(12, null), new Main_$this.Attr_(13, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray(u1, u2, u3));
      OrderTacos$this.qedModel = new QEDExplicitArray(u4);
    }
    let u1 = OrderTacos$this.qedModel[0];
    u1.clearChange();
    u1.setAtt(0, Main_$this.COLOR_BLACK);
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
  }
  this.blocking__Call = null;
  this.spinner = new Main_$this.SpinnerWidget();
  this.blocking__Call = _bindHandler(new Main_$this.Timer(5000), (function Lambda_(_ret) {
    OrderTacos$this.blocking__Call = null;
    OrderTacos$this.spinner.stopped = true;
    {
      Main_$this.post_(OrderTacos$this, true);
      return;
    }
    OrderTacos$this.qedModel = null;
  }));
}
this.DisplaySuccess = function(total) {
  this.total = total;
  const DisplaySuccess$this = this;
  this._refreshModel_ = function() {
    if (!DisplaySuccess$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
      let u2 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray());
      let u3 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
      let u4 = new Main_$this.Directive_(2, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(12, null), new Main_$this.Attr_(13, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray(u1, u2, u3));
      DisplaySuccess$this.qedModel = new QEDExplicitArray(u4);
    }
    let u1 = DisplaySuccess$this.qedModel[0];
    u1.clearChange();
    u1.setAtt(0, Main_$this.COLOR_BLACK);
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
  }
  this.blocking__Call = null;
  this.blocking__Call = _bindHandler(new Main_$this.Timer(5000), (function Lambda_(_ret) {
    DisplaySuccess$this.blocking__Call = null;
    {
      Main_$this.post_(DisplaySuccess$this, null);
      return;
    }
    DisplaySuccess$this.qedModel = null;
  }));
}
this.MainScreen = function() {
  const MainScreen$this = this;
  this._refreshModel_ = function() {
    if (!MainScreen$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray());
      let u2 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(9, null)), new QEDExplicitArray());
      let u3 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray());
      let u4 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(9, null)), new QEDExplicitArray());
      let u5 = new Main_$this.Directive_(2, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(5, null), new Main_$this.Attr_(9, null)), new QEDExplicitArray(u2, u3, u4));
      let u6 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray());
      let u7 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(5, null), new Main_$this.Attr_(9, null)), new QEDExplicitArray());
      let u8 = new Main_$this.Directive_(1, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(9, null), new Main_$this.Attr_(14, null)), new QEDExplicitArray(u5, u6, u7));
      let u9 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(1, null)), new QEDExplicitArray());
      let u10 = new Main_$this.Directive_(3, 0, -1, new QEDExplicitArray(new Main_$this.Attr_(12, null)), new QEDExplicitArray(u1, u8, u9));
      MainScreen$this.qedModel = new QEDExplicitArray(u10);
    }
    let u1 = MainScreen$this.qedModel[0];
    u1.clearChange();
    u1.setAtt(0, 8171719);
    let u4 = u1.children[0];
    u4.setAtt(0, 15);
    let u3 = u1.children[1];
    u3.setAtt(0, ((100) / 100));
    u3.setAtt(1, 10);
    let u7 = u3.children[0];
    u7.setAtt(0, 20);
    u7.setAtt(1, ((100) / 100));
    Main_$this.pushAttribute_$(5, u7.atts[0].value);
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
    Main_$this.pushAttribute_$(5, u5.atts[1].value);
    u5.refreshSubModel();
    Main_$this.popAttribute(5);
    let u2 = u1.children[2];
    u2.setAtt(0, 15);
    u1.refreshChange();
    let _level = u1.getChangeLevel();
    return _level;
  }
  this.blocking__Call = null;
  this.buyTacosButton = _bindHandler(new Main_$this.ObjectOverTextButton(Main_$this.showTwoTacos, "Order tacos!!"), (function Lambda_() {
    {
      Main_$this.post_(MainScreen$this, 1);
      return;
    }
  }));
  this.roomServiceButton = _bindHandler(new Main_$this.ObjectBeforeTextButton(Main_$this.displaySlider, "Room service"), (function Lambda_() {
    {
      Main_$this.post_(MainScreen$this, 2);
      return;
    }
  }));
  this.moreTowelsButton = _bindHandler(new Main_$this.ObjectBeforeTextButton(Main_$this.displaySlider, "Late checkout"), (function Lambda_() {
    {
      Main_$this.post_(MainScreen$this, 3);
      return;
    }
  }));
  this.qedModel = null;
}
this.Application = function() {
  const Application$this = this;
  this._refreshModel_ = function() {
    if (!Application$this.qedModel) {
      let u1 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(9, null), new Main_$this.Attr_(-1, (function W5$_() {
        0;
      })), new Main_$this.Attr_(-2, (function W6$_() {
        0;
      }))), new QEDExplicitArray());
      Application$this.qedModel = new QEDExplicitArray(u1);
    }
    let u1 = Application$this.qedModel[0];
    u1.clearChange();
    u1.setAtt(0, "");
    u1.setAtt(1, ((100) / 100));
    u1.refreshChange();
    let _level = u1.getChangeLevel();
    return _level;
  }
  this.blocking__Call = null;
  (function while146$_() {
    if (true) {
      Application$this.blocking__Call = _bindHandler(new Main_$this.MainScreen(), (function Lambda_(_ret) {
        Application$this.blocking__Call = null;
        let choice = _ret;
        new (function W156$_(i147$_) {
          this.i147$_ = i147$_;
          if (choice === 1) {
            let entry = new Main_$this.TransactionEntry();
            Application$this.blocking__Call = _bindHandler(new Main_$this.GetTransactionEntry(entry), (function Lambda_$(_ret$) {
              Application$this.blocking__Call = null;
              new (function W153$_(i148$_) {
                this.i148$_ = i148$_;
                if (_ret$) {
                  Application$this.blocking__Call = _bindHandler(new Main_$this.OrderTacos(entry), (function Lambda_$$(_ret$$) {
                    Application$this.blocking__Call = null;
                    new (function W151$_(i149$_) {
                      this.i149$_ = i149$_;
                      if (_ret$$)
                        Application$this.blocking__Call = _bindHandler(new Main_$this.DisplaySuccess(entry.getTotal()), (function Lambda_$$$() {
                          Application$this.blocking__Call = null;
                          i149$_();
                        }));
                      else {
                        {
                        }
                        i149$_();
                      }
                    })((function c150$_() {
                      i148$_();
                    }));
                  }));
                }
                else
                  i148$_();
              })((function c152$_() {
                i147$_();
              }));
            }));
          }
          else {
            if (choice === 2) {
            }
            else {
            }
            i147$_();
          }
        })((function c155$_() {
          while146$_();
        }));
      }));
    }
    else
      Application$this.qedModel = null;
  })();
}
this._refreshModel_ = function() {
  if (!Main_$this.qedModel) {
    let u1 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(5, null), new Main_$this.Attr_(12, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray());
    let u2 = new Main_$this.Directive_(0, 0, 1, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(5, null), new Main_$this.Attr_(12, null), new Main_$this.Attr_(8, null), new Main_$this.Attr_(9, null)), new QEDExplicitArray());
    let u3 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(12, null), new Main_$this.Attr_(8, null), new Main_$this.Attr_(9, null)), new QEDExplicitArray());
    let u4 = new Main_$this.Directive_(0, 0, 2, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(1, null), new Main_$this.Attr_(12, null), new Main_$this.Attr_(8, null)), new QEDExplicitArray(u1, u2, u3));
    let u5 = new Main_$this.Directive_(0, 0, 2, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(1, null), new Main_$this.Attr_(12, null)), new QEDExplicitArray());
    let u6 = new Main_$this.Directive_(0, 0, 0, new QEDExplicitArray(new Main_$this.Attr_(0, null), new Main_$this.Attr_(2, null), new Main_$this.Attr_(9, null), new Main_$this.Attr_(12, null)), new QEDExplicitArray());
    let u7 = new Main_$this.Directive_(0, 0, -1, new QEDExplicitArray(), new QEDExplicitArray(u5, u6));
    let u8 = new Main_$this.Directive_(2, 0, -1, new QEDExplicitArray(), new QEDExplicitArray(u4, u7));
    Main_$this.qedModel = new QEDExplicitArray(u8);
  }
  let u1 = Main_$this.qedModel[0];
  u1.clearChange();
  let u3 = u1.children[0];
  u3.setAtt(0, Main_$this.rect);
  u3.setAtt(1, new QEDExplicitArray(800, 60));
  u3.setAtt(2, 12499120);
  u3.setAtt(3, 0);
  let u6 = u3.children[0];
  u6.setAtt(0, Main_$this.getTimestamp());
  u6.setAtt(1, 30);
  u6.setAtt(2, 7828334);
  u6.setAtt(3, new QEDExplicitArray(((5) / 100), ((50) / 100)));
  let u5 = u3.children[1];
  u5.setAtt(0, "Taco Hotel");
  u5.setAtt(1, 35);
  u5.setAtt(2, 7828334);
  u5.setAtt(3, ((50) / 100));
  u5.setAtt(4, new QEDExplicitArray(0, ((50) / 100)));
  let u4 = u3.children[2];
  u4.setAtt(0, Main_$this.exitHandler.size() ? Main_$this.exit : Main_$this.emptyWidget);
  u4.setAtt(1, 9909571);
  u4.setAtt(2, new QEDExplicitArray(((95) / 100), ((50) / 100)));
  u4.setAtt(3, new QEDExplicitArray(0, ((50) / 100)));
  u4.refreshSubModel();
  let u2 = u1.children[1];
  let u8 = u2.children[0];
  u8.setAtt(0, Main_$this.rect);
  u8.setAtt(1, new QEDExplicitArray(800, 420));
  u8.setAtt(2, 15656669);
  let u7 = u2.children[1];
  u7.setAtt(0, Main_$this.application);
  u7.setAtt(1, "application");
  u7.setAtt(2, ((100) / 100));
  u7.setAtt(3, 6249560);
  u7.refreshSubModel();
  u1.refreshChange();
  let _level = u1.getChangeLevel();
  return _level;
}
var canvas = document.getElementById("canvas");
let postHandler = null;
let attributeStacks = [];
const ctx = canvas.getContext("2d");
function toColor(color) {return "#" + color.toString(16).padStart(6, '0');}
this.blocking__Call = null;
canvas.addEventListener("pointerdown", function(ev) {
  var rect = canvas.getBoundingClientRect();
  Main_$this.onGlobalEvent(0, [ev.clientX - rect.left, ev.clientY - rect.top]);
});
canvas.addEventListener("pointerup", function(ev) {
  var rect = canvas.getBoundingClientRect();
  Main_$this.onGlobalEvent(1, [ev.clientX - rect.left, ev.clientY - rect.top]);
});
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
};
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); };
function _bindHandler(obj, handler) {
  obj._HandlerFn_ = handler;
  return obj;
};
this.pushAttribute(5, 20);
this.pushAttribute_$(6, 0.000000);
this.pushAttribute(12, 0);
this.pushAttribute_$(13, 1.000000);
this.pushAttribute_$(14, 3.000000);
this.WIDTH = 1;
this.HEIGHT = 2;
this.OBLIQUE = 3;
this.COLOR_RED = 16711680;
this.COLOR_GREEN = 65280;
this.COLOR_YELLOW = 16776960;
this.COLOR_BLUE = 255;
this.COLOR_BLACK = 0;
this.COLOR_WHITE = 16777215;
this.refreshCount = 1;
Object.setPrototypeOf(this.QEDBaseArray_.prototype, Array.prototype);
Object.setPrototypeOf(this.SQEDArray.prototype, Array.prototype);
Object.setPrototypeOf(this.QEDArray.prototype, Array.prototype);
this.QEDExplicitArray = /*#__PURE__*/function(_Array) {
  _inherits(QEDExplicitArray, _Array);
  var _super = _createSuper(QEDExplicitArray);
  function QEDExplicitArray() {
    var _this;
    _classCallCheck(this, QEDExplicitArray);
    _this = _super.call(this);
    for (var i = 0; i < arguments.length; ++i) _this[i] = arguments[i];
    return _this;
  }
  _createClass(QEDExplicitArray, [{
    key: "getNumDirs",
    value: function getNumDirs() {
      return (1);
    }
  }]);
  _createClass(QEDExplicitArray, [{
    key: "getDirs",
    value: function getDirs(childDir) {
      return [childDir & 1, (childDir & 2) ? 1 : 0];
      return (this.length);
    }
  }]);
  _createClass(QEDExplicitArray, [{
    key: "size",
    value: function size() {
      return (this.length);
    }
  }]);
  _createClass(QEDExplicitArray, [{
    key: "_refreshModel_",
    value: function _refreshModel_() {
      let level = 0;

      for (let index = 0; index < this.length; index++)
        level = Math.max(level, Main_$this._refreshModels(this[index]));

      return level;
    }
  }]);
  return QEDExplicitArray;
}( /*#__PURE__*/_wrapNativeSuper(Array));
this.potentialFocus = null;
this.qedFocus = new QEDExplicitArray();
this.exitHandler = new QEDExplicitArray();
this.emptyWidget = new this.Widget();
this.exit = _bindHandler(new this.TextButton("Exit"), (function Lambda_(_ret) {
  Main_$this.process(Main_$this.exitHandler[0]);
}));
this.application = new this.Application();
this.qedModel = null;
Main_$this.executeEvents_();
