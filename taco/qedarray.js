"use strict";
const canvas = document.getElementById("canvas");
let postHandler = null;
let attributeStacks = [];
const ctx = canvas.getContext("2d");
function toColor(color) {return "#" + color.toString(16).padStart(6, '0');}
let layout_ = null;
const Main_$this = this;
this.voidHandler_ = function() {
}
this.VoidHandler_ = function() {
  const VoidHandler_$this = this;
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      this.paint = function(pos0, pos1, size0$, size1$) {
        Main_$this.displayText(UI_$this.v1, pos0, pos1, size0$, size1$);
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = Main_$this.getTextSize(UI_$this.v1);
      this.u2 = this.a1[0];
      this.u3 = this.a1[1];
      this.size0 = this.u2;
      this.size1 = this.u3;
    }
    this.v1 = "";
  }
  this.ui_ = null;
  this.setUI_ = function() {
    VoidHandler_$this.ui_ = new VoidHandler_$this.UI_();
  }
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
this.Yield = function(_HandlerFn_) {
  this.blocking__Call = null;
  this.yieldHandler = (function() {
    _HandlerFn_(true);
  });
}
this.Yield$_ = function(obj, _HandlerFn_) {
  this.obj = obj;
  this.blocking__Call = null;
  obj.yieldHandler = (function() {
    _HandlerFn_(true);
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
this.post_ = function(_HandlerFn_) {
  if (postHandler != null)
    console.log("postHandler not null");

  postHandler = _HandlerFn_;
}
this.Sizer = function(_HandlerFn_) {
  this.getBoundsRect = function(path, index, x, y, width, height, level, dlevel) {
  }
  this.blocking__Call = null;
  this.size0 = 0;
  this.size1 = 0;
}
this._refresh = function(obj, x, y, width, height) {
  _setUI(obj);
  obj.ui_.layout_ = _layout(obj);
  _paint(obj.ui_.layout_, x, y, width, height);
}
this._setUI = function(obj) {
  if (obj.setUI_)
    obj.setUI_();

  if (obj.blocking__Call)
    _setUI(obj.blocking__Call);
}
this._layout = function(obj) {
  let lay = obj.ui_ ? new obj.ui_.Layout_() : null;
  let blockingCallLayout = obj.blocking__Call ? _layout(obj.blocking__Call) : null;

  if (lay) {
    lay.blockingCallLayout = blockingCallLayout;

    if (blockingCallLayout) {
      let size0 = lay.size0;
      let size1 = lay.size1;
      let blockingCallSize0 = blockingCallLayout.size0;
      let blockingCallSize1 = blockingCallLayout.size1;

      size0 = Math.max(size0, blockingCallSize0);
      size1 = Math.max(size1, blockingCallSize1);
      lay.size0 = size0;
      lay.size1 = size1;
    }
  }
  else
    lay = blockingCallLayout;

  return lay;
}
this._paint = function(layout, x, y, width, height) {
  if (layout) {
    layout.paint(x, y, width, height);

    if (layout.blockingCallLayout)
      _paint(layout.blockingCallLayout, x, y, width, height)
  };
}
this._onEvent = function(layout, event, x, y, width, height) {
  if (layout)
    if (layout.blockingCallLayout)
      return _onEvent(layout.blockingCallLayout, event, x, y, width, height);
    else
      return layout.onEvent(event, x, y, width, height);
}
this._getBoundsRect = function(layout, path, index, x, y, width, height, level, dlevel) {
  if (layout)
    if (layout.blockingCallLayout)
      return _getBoundsRect(layout.blockingCallLayout, path, index, x, y, width, height, level, dlevel);
    else
      return layout.getBoundsRect(path, index, x, y, width, height, level, dlevel);
}
this.getBounds = function(path, index) {
  return Main_$this.ui_.layout_ ? _getBoundsRect(Main_$this.ui_.layout_, path, index, 0, 0, Main_$this.ui_.layout_.size0, Main_$this.ui_.layout_.size1, 0, 0) : [0, 0, 0, 0];
}
this.executeEvents_ = function() {
  while (postHandler != null) {
    const fn = postHandler;
  
    postHandler = null;
    fn();
  }

  ctx.globalAlpha = 1.0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  _refresh(Main_$this, 0, 0, canvas.width, canvas.height);
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
this.pushAttribute$_ = function(index, value) {
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
this.Timer = function(timeoutMillis, _HandlerFn_) {
  this.timeoutMillis = timeoutMillis;
  this.reset = function() {
  }
  this.blocking__Call = null;
  setTimeout(function() {
    _HandlerFn_(true);
    executeEvents_();
  }, timeoutMillis);
}
this.Time = function(Func, _HandlerFn_) {
  this.Func = Func;
  this.blocking__Call = null;
  console.time("Time");
  new Func(() => {
    console.timeEnd("Time");
    _HandlerFn_();
    executeEvents_();
  });
}
this.time = function(func) {
    console.time("time");
  func();
  console.timeEnd("time");
}
this.Animation = function(_HandlerFn_) {
  this.blocking__Call = null;
  requestAnimationFrame((millis) => {
  _HandlerFn_(millis);
  executeEvents_();
});
}
this.Sprite = function(_HandlerFn_) {
  const Sprite$this = this;
  this.Animate = function(_HandlerFn_) {
    const Animate$this = this;
    this.blocking__Call$ = null;
    this.blocking__Call$ = new Main_$this.Animation((function Lambda_(_ret) {
      Animate$this.blocking__Call$ = null;
      Animate$this.millis = _ret;
      if (Sprite$this.startTime === -1)
        Sprite$this.startTime = Animate$this.millis;
      {
        Main_$this.post_((function lambda_() {
          _HandlerFn_(Animate$this.millis - Sprite$this.startTime);
        }));
        return;
      }
    }));
  }
  this.setLimit = function(l) {
    Sprite$this.limit = l;
  }
  this.Move = function(_HandlerFn_) {
    this.blocking__Call$ = null;
    const Move$this = this;
    this.blocking__Call$ = new Sprite$this.Animate((function Lambda_(_ret) {
      Move$this.blocking__Call$ = null;
      Main_$this.post_((function lambda_() {
        _HandlerFn_(Main_$this.min(_ret / Sprite$this.limit, 1));
      }));
    }));
  }
  this.blocking__Call = null;
  this.limit = 0;
  this.startTime = -1;
}
this.ButtonContent = function(pressed, _HandlerFn_) {
  this.pressed = pressed;
  const ButtonContent$this = this;
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      this.paint = function(pos0, pos1, size0$, size1$) {
        Main_$this.displayText(UI_$this.v1, pos0, pos1, size0$, size1$);
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = Main_$this.getTextSize(UI_$this.v1);
      this.u2 = this.a1[0];
      this.u3 = this.a1[1];
      this.size0 = this.u2;
      this.size1 = this.u3;
    }
    this.v1 = "";
  }
  this.ui_ = null;
  this.setUI_ = function() {
    ButtonContent$this.ui_ = new ButtonContent$this.UI_();
  }
  this.blocking__Call = null;
}
this.GenericButton = function(ContentFn, _HandlerFn_) {
  this.ContentFn = ContentFn;
  const GenericButton$this = this;
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0$, size1$) {
        _paint(Layout_$this.a1, pos0, pos1, size0$, size1$);
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        if ((3 & (1 << event)) !== 0) {
          flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$;
          if (flag) {
            flag = _onEvent(Layout_$this.a1, event, pos0, pos1, size0$, size1$);
            if (!flag) {
              if (event === 0) {
                flag = true;
                Main_$this.post_(UI_$this.v2);
              }
              if (event === 1) {
                flag = true;
                Main_$this.post_(UI_$this.v3);
              }
            }
          }
        }
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = _layout(UI_$this.v1);
      this.u2 = this.a1.size0;
      this.u3 = this.a1.size1;
      this.size0 = this.u2;
      this.size1 = this.u3;
    }
    this.v1 = GenericButton$this.content;
    this.v2 = (function W1$_() {
      GenericButton$this.pressed[0] = true;
    });
    this.v3 = (function W2$_() {
      {
        GenericButton$this.pressed[0] = false;
        {
          Main_$this.post_(_HandlerFn_);
          return;
        }
      }
    });
    _setUI(this.v1);
  }
  this.ui_ = null;
  this.setUI_ = function() {
    GenericButton$this.ui_ = new GenericButton$this.UI_();
  }
  this.blocking__Call = null;
  this.pressed = new QEDExplicitArray(false);
  this.content = new this.ContentFn(this.pressed, (function Lambda_() {
  }));
}
this.LinkButton = function(text, _HandlerFn_) {
  this.text = text;
  const LinkButton$this = this;
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0$, size1$) {
        _paint(Layout_$this.a1, pos0, pos1, size0$, size1$);
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        if ((3 & (1 << event)) !== 0) {
          flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$;
          if (flag) {
            flag = _onEvent(Layout_$this.a1, event, pos0, pos1, size0$, size1$);
            if (!flag) {
            }
          }
        }
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = _layout(UI_$this.v1);
      this.u2 = this.a1.size0;
      this.u3 = this.a1.size1;
      this.size0 = this.u2;
      this.size1 = this.u3;
    }
    this.v1 = LinkButton$this.button;
    _setUI(this.v1);
  }
  this.ui_ = null;
  this.setUI_ = function() {
    LinkButton$this.ui_ = new LinkButton$this.UI_();
  }
  this.blocking__Call = null;
  this.button = new Main_$this.GenericButton((function L_(pressed) {
    this.pressed = pressed;
    const L_$this = this;
    this.UI_ = function() {
      const UI_$this = this;
      this.Layout_ = function() {
        this.paint = function(pos0, pos1, size0$, size1$) {
          {
            Main_$this.pushAttribute$_(13, UI_$this.v2);
            Main_$this.displayText(UI_$this.v1, pos0, pos1, size0$, size1$);
            Main_$this.popAttribute(13);
          }
        }
        this.onEvent = function(event, pos0, pos1, size0$, size1$) {
          let flag = false;
          return (flag);
        }
        this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
          return (new QEDExplicitArray(0, 0, 0, 0));
        }
        this.a1 = Main_$this.getTextSize(UI_$this.v1);
        this.u2 = this.a1[0];
        this.u3 = this.a1[1];
        this.size0 = this.u2;
        this.size1 = this.u3;
      }
      this.v1 = LinkButton$this.text;
      this.v2 = L_$this.pressed[0] ? ((35) / 100) : ((100) / 100);
    }
    this.ui_ = null;
    this.setUI_ = function() {
      L_$this.ui_ = new L_$this.UI_();
    }
  }), (function Lambda_() {
    {
      Main_$this.post_((function lambda_() {
        _HandlerFn_(LinkButton$this.text);
      }));
      return;
    }
  }));
}
this.RectButton = function(ContentFn, _HandlerFn_) {
  this.ContentFn = ContentFn;
  const RectButton$this = this;
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0$, size1$) {
        _paint(Layout_$this.a1, pos0, pos1, size0$, size1$);
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        if ((3 & (1 << event)) !== 0) {
          flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$;
          if (flag) {
            flag = _onEvent(Layout_$this.a1, event, pos0, pos1, size0$, size1$);
            if (!flag) {
            }
          }
        }
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = _layout(UI_$this.v1);
      this.u2 = this.a1.size0;
      this.u3 = this.a1.size1;
      this.size0 = this.u2;
      this.size1 = this.u3;
    }
    this.v1 = RectButton$this.button;
    _setUI(this.v1);
  }
  this.ui_ = null;
  this.setUI_ = function() {
    RectButton$this.ui_ = new RectButton$this.UI_();
  }
  this.blocking__Call = null;
  this.content = new this.ContentFn();
  this.button = new Main_$this.GenericButton((function L_(pressed) {
    this.pressed = pressed;
    const L_$this = this;
    this.UI_ = function() {
      const UI_$this = this;
      this.Layout_ = function() {
        const Layout_$this = this;
        this.paint = function(pos0, pos1, size0$, size1$) {
          {
            UI_$this.v5(pos0, pos1, size0$, size1$);
            Main_$this.saveContext();
            {
              Main_$this.pushAttribute$_(13, UI_$this.v2);
              Main_$this.pushAttribute(12, UI_$this.v3);
              UI_$this.v1(pos0, pos1, size0$, size1$);
              Main_$this.popAttribute(12);
              Main_$this.popAttribute(13);
            }
            _paint(Layout_$this.a1, pos0, pos1, size0$, size1$);
            Main_$this.restoreContext();
          }
        }
        this.onEvent = function(event, pos0, pos1, size0$, size1$) {
          let flag = false;
          return (flag);
        }
        this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
          {
          }
          {
          }
          return (new QEDExplicitArray(0, 0, 0, 0));
        }
        this.a1 = _layout(UI_$this.v4);
        this.u2 = this.a1.size0;
        this.u3 = this.a1.size1;
        this.size0 = this.u2;
        this.size1 = this.u3;
      }
      this.v1 = Main_$this.rect;
      this.v2 = L_$this.pressed[0] ? ((35) / 100) : ((0) / 100);
      this.v3 = Main_$this.COLOR_BLACK;
      this.v4 = RectButton$this.content;
      _setUI(this.v4);
      this.v5 = Main_$this.roundRect;
    }
    this.ui_ = null;
    this.setUI_ = function() {
      L_$this.ui_ = new L_$this.UI_();
    }
  }), (function Lambda_() {
    {
      Main_$this.post_(_HandlerFn_);
      return;
    }
  }));
}
this.TextButton = function(text, _HandlerFn_) {
  this.text = text;
  const TextButton$this = this;
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0$, size1$) {
        _paint(Layout_$this.a1, pos0, pos1, size0$, size1$);
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        if ((3 & (1 << event)) !== 0) {
          flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$;
          if (flag) {
            flag = _onEvent(Layout_$this.a1, event, pos0, pos1, size0$, size1$);
            if (!flag) {
            }
          }
        }
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = _layout(UI_$this.v1);
      this.u2 = this.a1.size0;
      this.u3 = this.a1.size1;
      this.size0 = this.u2;
      this.size1 = this.u3;
    }
    this.v1 = TextButton$this.button;
    _setUI(this.v1);
  }
  this.ui_ = null;
  this.setUI_ = function() {
    TextButton$this.ui_ = new TextButton$this.UI_();
  }
  this.blocking__Call = null;
  this.button = new Main_$this.RectButton((function L_() {
    const L_$this = this;
    this.UI_ = function() {
      const UI_$this = this;
      this.Layout_ = function() {
        const Layout_$this = this;
        this.paint = function(pos0, pos1, size0$, size1$) {
          {
            let exp0 = new QEDExplicitArray(UI_$this.v2, UI_$this.v7);
            exp0[1] = exp0[1] + exp0[0];
            let extraSpace0 = size0$ - Layout_$this.l6;
            if (exp0[1] > 1)
              extraSpace0 = extraSpace0 / exp0[1];
            let exp1 = new QEDExplicitArray(UI_$this.v2, UI_$this.v7);
            exp1[1] = exp1[1] + exp1[0];
            let extraSpace1 = size1$ - Layout_$this.l9;
            if (exp1[1] > 1)
              extraSpace1 = extraSpace1 / exp1[1];
            {
              let size0$$ = Layout_$this.u4;
              size0$$ = size0$$ + extraSpace0 * UI_$this.v2;
              let size1$$ = Layout_$this.u7;
              size1$$ = size1$$ + extraSpace1 * UI_$this.v2;
            }
            {
              Main_$this.pushAttribute(12, UI_$this.v4);
              let size0$$ = Layout_$this.l5 - Layout_$this.u4;
              let posDiff0 = Layout_$this.u4;
              let childSize0 = Layout_$this.u5;
              posDiff0 += (size0$$ - childSize0) * UI_$this.v5;
              size0$$ = childSize0;
              posDiff0 += exp0[0] * extraSpace0;
              let size1$$ = Layout_$this.l8 - Layout_$this.u7;
              let posDiff1 = Layout_$this.u7;
              let childSize1 = Layout_$this.u8;
              posDiff1 += (size1$$ - childSize1) * UI_$this.v5;
              size1$$ = childSize1;
              posDiff1 += exp1[0] * extraSpace1;
              let pos0$ = pos0 + posDiff0;
              let pos1$ = pos1 + posDiff1;
              Main_$this.displayText(UI_$this.v3, pos0$, pos1$, size0$$, size1$$);
              Main_$this.popAttribute(12);
            }
            {
              let size0$$ = Layout_$this.l6 - Layout_$this.l5;
              let posDiff0 = Layout_$this.l5;
              size0$$ = size0$$ + extraSpace0 * UI_$this.v7;
              posDiff0 += exp0[0] * extraSpace0;
              let size1$$ = Layout_$this.l9 - Layout_$this.l8;
              let posDiff1 = Layout_$this.l8;
              size1$$ = size1$$ + extraSpace1 * UI_$this.v7;
              posDiff1 += exp1[0] * extraSpace1;
              let pos0$ = pos0 + posDiff0;
              let pos1$ = pos1 + posDiff1;
            }
          }
        }
        this.onEvent = function(event, pos0, pos1, size0$, size1$) {
          let flag = false;
          return (flag);
        }
        this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
          {
            let exp0 = new QEDExplicitArray(UI_$this.v2, UI_$this.v7);
            exp0[1] = exp0[1] + exp0[0];
            let extraSpace0 = size0$ - Layout_$this.l6;
            if (exp0[1] > 1)
              extraSpace0 = extraSpace0 / exp0[1];
            let exp1 = new QEDExplicitArray(UI_$this.v2, UI_$this.v7);
            exp1[1] = exp1[1] + exp1[0];
            let extraSpace1 = size1$ - Layout_$this.l9;
            if (exp1[1] > 1)
              extraSpace1 = extraSpace1 / exp1[1];
            {
              let size0$$ = Layout_$this.u4;
              size0$$ = size0$$ + extraSpace0 * UI_$this.v2;
              let size1$$ = Layout_$this.u7;
              size1$$ = size1$$ + extraSpace1 * UI_$this.v2;
            }
            {
              let size0$$ = Layout_$this.l5 - Layout_$this.u4;
              let posDiff0 = Layout_$this.u4;
              let childSize0 = Layout_$this.u5;
              posDiff0 += (size0$$ - childSize0) * UI_$this.v5;
              size0$$ = childSize0;
              posDiff0 += exp0[0] * extraSpace0;
              let size1$$ = Layout_$this.l8 - Layout_$this.u7;
              let posDiff1 = Layout_$this.u7;
              let childSize1 = Layout_$this.u8;
              posDiff1 += (size1$$ - childSize1) * UI_$this.v5;
              size1$$ = childSize1;
              posDiff1 += exp1[0] * extraSpace1;
              let pos0$ = pos0 + posDiff0;
              let pos1$ = pos1 + posDiff1;
            }
            {
              let size0$$ = Layout_$this.l6 - Layout_$this.l5;
              let posDiff0 = Layout_$this.l5;
              size0$$ = size0$$ + extraSpace0 * UI_$this.v7;
              posDiff0 += exp0[0] * extraSpace0;
              let size1$$ = Layout_$this.l9 - Layout_$this.l8;
              let posDiff1 = Layout_$this.l8;
              size1$$ = size1$$ + extraSpace1 * UI_$this.v7;
              posDiff1 += exp1[0] * extraSpace1;
              let pos0$ = pos0 + posDiff0;
              let pos1$ = pos1 + posDiff1;
            }
          }
          return (new QEDExplicitArray(0, 0, 0, 0));
        }
        this.a1 = new QEDExplicitArray(UI_$this.v1, UI_$this.v1);
        this.a2 = Main_$this.getTextSize(UI_$this.v3);
        this.a3 = new QEDExplicitArray(UI_$this.v6, UI_$this.v6);
        this.u4 = this.a1[0];
        this.u5 = this.a2[0];
        this.l5 = this.u4 + this.u5;
        this.u6 = this.a3[0];
        this.l6 = this.l5 + this.u6;
        this.u7 = this.a1[1];
        this.u8 = this.a2[1];
        this.l8 = this.u7 + this.u8;
        this.u9 = this.a3[1];
        this.l9 = this.l8 + this.u9;
        this.size0 = this.l6;
        this.size1 = this.l9;
      }
      this.v1 = Main_$this.getAttribute(5) * 0.200000;
      this.v2 = ((100) / 100);
      this.v3 = TextButton$this.text;
      this.v4 = Main_$this.COLOR_WHITE;
      this.v5 = ((50) / 100);
      this.v6 = Main_$this.getAttribute(5) * 0.200000;
      this.v7 = ((100) / 100);
    }
    this.ui_ = null;
    this.setUI_ = function() {
      L_$this.ui_ = new L_$this.UI_();
    }
  }), (function Lambda_() {
    {
      Main_$this.post_((function lambda_() {
        _HandlerFn_(TextButton$this.text);
      }));
      return;
    }
  }));
}
this.QEDBaseArray_ = function() {
  const QEDBaseArray_$this = this;
  this.size = function() {
    return (0);
  }
  this.insert = function(pos, size$) {
  }
  this.Insert = function(pos, size$, _HandlerFn_) {
    this.pos = pos;
    this.size$ = size$;
  }
  this.push = function() {
  }
  this.Push = function(_HandlerFn_) {
  }
  this.pop = function() {
  }
  this.get = function(pos) {
  }
  this.set = function(pos, value) {
  }
  this.get$_ = function(index) {
  }
  this.set$_ = function(index, value) {
  }
  this.UI_ = function() {
    this.Layout_ = function() {
      this.paint = function(pos0, pos1, size0, size1) {
      }
      this.onEvent = function(event, pos0, pos1, size0, size1) {
      }
      this.size0 = 0;
      this.size1 = 0;
    }
  }
  this.setUI_ = function() {
    QEDBaseArray_$this.ui_ = new QEDBaseArray_$this.UI_();
  }
  this.ui_ = null;
}
this.InitFn = function(pos, _HandlerFn_) {
  this.pos = pos;
}
this.SQEDArray = function(limits, Init, _HandlerFn_) {
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
  this.Insert = function(pos, size$, _HandlerFn_) {
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
    this.blocking__Call$ = new SQEDArray$this.InsertLevel(SQEDArray$this, SQEDArray$this.dims, this.pos, this.size$, this.newSize, new Array(this.size$.length).fill(0), 0, (function Lambda_() {
      Insert$this.blocking__Call$ = null;
      SQEDArray$this.dims = Insert$this.newSize;
      {
        Main_$this.post_(_HandlerFn_);
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
  this.InsertLevel = function(array, dims, pos, size$, newSize, pp, level, _HandlerFn_) {
    this.array = array;
    this.dims = dims;
    this.pos = pos;
    this.size$ = size$;
    this.newSize = newSize;
    this.pp = pp;
    this.level = level;
    const InsertLevel$this = this;
    this.blocking__Call$ = null;
    new (function W48$_(i40$_) {
      this.i40$_ = i40$_;
      if (InsertLevel$this.level < SQEDArray$this.dims.length - 1) {
        {
          pp[level] = 0;
          (function while41$_() {
            if (pp[level] < pos[level]) {
              InsertLevel$this.blocking__Call$ = new SQEDArray$this.InsertLevel(array[pp[level]], InsertLevel$this.dims, InsertLevel$this.pos, InsertLevel$this.size$, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1, (function Lambda_() {
                InsertLevel$this.blocking__Call$ = null;
                pp[level]++;
                while41$_();
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
                (function while43$_() {
                  if (pp[level] < pos[level] + InsertLevel$this.size$[level]) {
                    array[pp[level]] = [];
                    InsertLevel$this.blocking__Call$ = new SQEDArray$this.InsertLevel(array[pp[level]], new Array(InsertLevel$this.size$.length).fill(0), new Array(InsertLevel$this.size$.length).fill(0), InsertLevel$this.newSize, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1, (function Lambda_() {
                      InsertLevel$this.blocking__Call$ = null;
                      pp[level]++;
                      while43$_();
                    }));
                  }
                  else {
                    pp[level] = pos[level] + InsertLevel$this.size$[level];
                    (function while44$_() {
                      if (pp[level] < newSize[level]) {
                        InsertLevel$this.blocking__Call$ = new SQEDArray$this.InsertLevel(array[pp[level]], InsertLevel$this.dims, InsertLevel$this.pos, InsertLevel$this.size$, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1, (function Lambda_() {
                          InsertLevel$this.blocking__Call$ = null;
                          pp[level]++;
                          while44$_();
                        }));
                      }
                      else
                        i40$_();
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
          (function while46$_() {
            if (pp[level] < pos[level] + InsertLevel$this.size$[level]) {
              InsertLevel$this.blocking__Call$ = new SQEDArray$this.Init(InsertLevel$this.pp, (function Lambda_(_ret) {
                InsertLevel$this.blocking__Call$ = null;
                array[pp[level]] = _ret;
                pp[level]++;
                while46$_();
              }));
            }
            else
              i40$_();
          })();
        }
      }
    })((function c47$_() {
      {
        Main_$this.post_(_HandlerFn_);
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
  this.Push = function(_HandlerFn_) {
    this.blocking__Call$ = null;
    this.pos = new Array(SQEDArray$this.dims.length).fill(0);
    this.size$ = new Array(SQEDArray$this.dims.length).fill(0);
    this.pos[0] = SQEDArray$this.dims[0];
    this.size$[0] = 1;
    this.blocking__Call$ = new SQEDArray$this.Insert(this.pos, this.size$, (function Lambda_() {
      Push$this.blocking__Call$ = null;
      {
        Main_$this.post_(_HandlerFn_);
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
  this.blocking__Call = new this.Insert(new Array(this.limits.length).fill(0), this.limits, (function Lambda_() {
    SQEDArray$this.blocking__Call = null;
    {
      Main_$this.post_((function lambda_() {
        _HandlerFn_(SQEDArray$this);
      }));
      return;
    }
  }));
}
this.VInitFn = function(pos, _HandlerFn_) {
  this.pos = pos;
}
this.VSQEDArray = function(limits, Init, _HandlerFn_) {
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
  this.Insert = function(pos, size$, _HandlerFn_) {
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
    this.blocking__Call$ = new VSQEDArray$this.InsertLevel(VSQEDArray$this.dims, this.pos, this.size$, this.newSize, new Array(this.size$.length).fill(0), 0, (function Lambda_() {
      Insert$this.blocking__Call$ = null;
      VSQEDArray$this.dims = Insert$this.newSize;
      {
        Main_$this.post_(_HandlerFn_);
        return;
      }
    }));
  }
  this.InsertLevel = function(dims, pos, size$, newSize, pp, level, _HandlerFn_) {
    this.dims = dims;
    this.pos = pos;
    this.size$ = size$;
    this.newSize = newSize;
    this.pp = pp;
    this.level = level;
    const InsertLevel$this = this;
    this.blocking__Call$ = null;
    new (function W58$_(i52$_) {
      this.i52$_ = i52$_;
      if (InsertLevel$this.level < VSQEDArray$this.dims.length - 1) {
        {
          pp[level] = 0;
          (function while53$_() {
            if (pp[level] < pos[level]) {
              InsertLevel$this.blocking__Call$ = new VSQEDArray$this.InsertLevel(InsertLevel$this.dims, InsertLevel$this.pos, InsertLevel$this.size$, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1, (function Lambda_() {
                InsertLevel$this.blocking__Call$ = null;
                pp[level]++;
                while53$_();
              }));
            }
            else {
              pp[level] = pos[level];
              (function while54$_() {
                if (pp[level] < pos[level] + InsertLevel$this.size$[level]) {
                  array[pp[level]] = [];
                  InsertLevel$this.blocking__Call$ = new VSQEDArray$this.InsertLevel(new Array(InsertLevel$this.size$.length).fill(0), new Array(InsertLevel$this.size$.length).fill(0), InsertLevel$this.newSize, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1, (function Lambda_() {
                    InsertLevel$this.blocking__Call$ = null;
                    pp[level]++;
                    while54$_();
                  }));
                }
                else {
                  pp[level] = pos[level] + InsertLevel$this.size$[level];
                  (function while55$_() {
                    if (pp[level] < newSize[level]) {
                      InsertLevel$this.blocking__Call$ = new VSQEDArray$this.InsertLevel(InsertLevel$this.dims, InsertLevel$this.pos, InsertLevel$this.size$, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1, (function Lambda_() {
                        InsertLevel$this.blocking__Call$ = null;
                        pp[level]++;
                        while55$_();
                      }));
                    }
                    else
                      i52$_();
                  })();
                }
              })();
            }
          })();
        }
      }
      else {
        pp[level] = pos[level];
        (function while56$_() {
          if (pp[level] < pos[level] + InsertLevel$this.size$[level]) {
            InsertLevel$this.blocking__Call$ = new VSQEDArray$this.Init(InsertLevel$this.pp, (function Lambda_() {
              InsertLevel$this.blocking__Call$ = null;
              pp[level]++;
              while56$_();
            }));
          }
          else
            i52$_();
        })();
      }
    })((function c57$_() {
      {
        Main_$this.post_(_HandlerFn_);
        return;
      }
    }));
  }
  this.blocking__Call = null;
  this.dims = new Array(this.limits.length).fill(0);
  this.blocking__Call = new this.Insert(new Array(this.limits.length).fill(0), this.limits, (function Lambda_() {
    VSQEDArray$this.blocking__Call = null;
    {
      Main_$this.post_((function lambda_() {
        _HandlerFn_(VSQEDArray$this);
      }));
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
this.QEDArray = function(limits, init, Ui_, _HandlerFn_) {
  this.limits = limits;
  this.init = init;
  this.Ui_ = Ui_;
  const QEDArray$this = this;
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
            let _arrayRet = new Object();
            _arrayRet.index = index;
            _arrayRet._ret = _ret;
            _HandlerFn_(_arrayRet);
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
  this.Push = function(_HandlerFn_) {
    this.blocking__Call$ = null;
    QEDArray$this.push();
    {
      Main_$this.post_(_HandlerFn_);
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
  this.setUI_ = function() {
    QEDArray$this.ui_ = new QEDArray$this.Ui_(QEDArray$this, QEDArray$this.dims);
  }
  this.blocking__Call = null;
  this.dims = new Array(this.limits.length).fill(0);
  this.insert(new Array(this.limits.length).fill(0), this.limits);
  this.ui_ = null;
}
this.vInitFn = function(pos) {
}
this.VQEDArray = function(limits, init, _HandlerFn_) {
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
  return (new Main_$this.VQEDArray(limits, init, (function Lambda_() {
  })));
}
this.uiArray_ = function(array) {
  {
    let index = 0;
    while(index < array.size()) {
      array[index].setUI_();
      index++;
    }
  }
}
this.calcLayout = function(unit) {
}
this.getSize = function(layout) {
}
this.paintLayout = function(unit, layout, posx, posy, sizex, sizey) {
}
this.onLayoutEvent = function(layout, event, posx, posy, sizex, sizey) {
}
this.getElementRect = function(layout, path, index, posx, posy, sizex, sizey, level, dLevel) {
}
this.LayoutArray_ = function(array, calcLayoutFn, getSizeFn, paintLayoutFn, onLayoutEventFn, getElementRectFn) {
  this.array = array;
  this.calcLayoutFn = calcLayoutFn;
  this.getSizeFn = getSizeFn;
  this.paintLayoutFn = paintLayoutFn;
  this.onLayoutEventFn = onLayoutEventFn;
  this.getElementRectFn = getElementRectFn;
  const LayoutArray_$this = this;
  this.paint = function(pos0, pos1, size0, size1) {
    {
      let index = 0;
      while(index < LayoutArray_$this.length) {
        let relPos = index ? LayoutArray_$this.posSet[index - 1][0] + LayoutArray_$this.space : 0;
        let posx = pos0 + relPos;
        let posy = pos1;
        let sizex = LayoutArray_$this.posSet[index][0] - relPos;
        let sizey = size1;
        LayoutArray_$this.paintLayoutFn(LayoutArray_$this.array[index], LayoutArray_$this.layouts[index], posx, posy, sizex, sizey);
        index++;
      }
    }
  }
  this.onEvent = function(event, pos0, pos1, size0, size1) {
    {
      let index = LayoutArray_$this.length - 1;
      while(index >= 0) {
        let posx = index ? LayoutArray_$this.posSet[index - 1][0] + LayoutArray_$this.space : 0;
        let posy = 0;
        let sizex = LayoutArray_$this.posSet[index][0] - posx;
        let sizey = size1;
        if (pos0 >= posx && pos1 >= posy && pos0 < posx + sizex && pos1 < posy + sizey) {
          pos0 = pos0 - posx;
          pos1 = pos1 - posy;
          return (LayoutArray_$this.onLayoutEventFn(LayoutArray_$this.layouts[index], event, pos0, pos1, sizex, sizey));
        }
        index--;
      }
    }
    return (false);
  }
  this.getBoundsRect = function(path, index, pos0, pos1, size0, size1, level, dLevel) {
    let ndx = index[0];
    let relPos = ndx ? LayoutArray_$this.posSet[ndx - 1][0] + LayoutArray_$this.space : 0;
    let posx = pos0 + relPos;
    let posy = pos1;
    let sizex = LayoutArray_$this.posSet[ndx][0] - relPos;
    let sizey = size1;
    dLevel++;
    if (level < path.size() || dLevel < index.size())
      return (LayoutArray_$this.getElementRectFn(LayoutArray_$this.layouts[ndx], path, index, posx, posy, sizex, sizey, level, dLevel));
    else
      return (new QEDExplicitArray(posx, posy, sizex, sizey));
  }
  this.space = getAttribute(6);
  this.length = this.array.size();
  this.layouts = [];
  this.posSet = [];
  this.size0 = 0;
  this.size1 = 0;
  {
    let index = 0;
    while(index < this.length) {
      this.layouts[index] = this.calcLayoutFn(this.array[index]);
      let elementSize = this.getSizeFn(this.layouts[index]);
      this.posSet[index] = new QEDExplicitArray(this.size0 + (index ? this.space : 0) + elementSize[0], Main_$this.max(this.size1, elementSize[1]));
      this.size0 = this.posSet[index][0];
      this.size1 = this.posSet[index][1];
      index++;
    }
  }
}
this.calcLayoutObj = function(unit) {
  let value = unit;
  return (new value.ui_.Layout_());
}
this.getSizeObj = function(layout) {
  let lay = layout;
  return (new QEDExplicitArray(lay.size0, lay.size1));
}
this.paintLayoutObj = function(unit, layout, posx, posy, sizex, sizey) {
  let lay = layout;
  lay.paint(posx, posy, sizex, sizey);
}
this.onLayoutEventObj = function(layout, event, posx, posy, sizex, sizey) {
  let lay = layout;
  return (lay.onEvent(event, posx, posy, sizex, sizey));
}
this.getElementRectObj = function(layout, path, index, posx, posy, sizex, sizey, level, dLevel) {
  let lay = layout;
  return (lay.getBoundsRect(path, index, posx, posy, sizex, sizey, level, dLevel));
}
this.calcLayoutString = function(unit) {
  return (Main_$this.getTextSize(unit));
}
this.getSizeString = function(layout) {
  let size = layout;
  return (new QEDExplicitArray(size, size & 65535));
}
this.paintLayoutString = function(unit, layout, posx, posy, sizex, sizey) {
  let size = layout;
  Main_$this.displayText(unit, posx, posy, sizex, sizey);
}
this.onLayoutEventString = function(layout, event, posx, posy, sizex, sizey) {
  return (true);
}
this.getElementRectString = function(layout, path, index, posx, posy, sizex, sizey, level, dLevel) {
  let size = layout;
  return (size);
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
this.ObjectOverTextButton = function(drawObject, text, _HandlerFn_) {
  this.drawObject = drawObject;
  this.text = text;
  const ObjectOverTextButton$this = this;
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0$, size1$) {
        _paint(Layout_$this.a1, pos0, pos1, size0$, size1$);
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        if ((3 & (1 << event)) !== 0) {
          flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$;
          if (flag) {
            flag = _onEvent(Layout_$this.a1, event, pos0, pos1, size0$, size1$);
            if (!flag) {
            }
          }
        }
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = _layout(UI_$this.v1);
      this.u2 = this.a1.size0;
      this.u3 = this.a1.size1;
      this.size0 = this.u2;
      this.size1 = this.u3;
    }
    this.v1 = ObjectOverTextButton$this.button;
    _setUI(this.v1);
  }
  this.ui_ = null;
  this.setUI_ = function() {
    ObjectOverTextButton$this.ui_ = new ObjectOverTextButton$this.UI_();
  }
  this.blocking__Call = null;
  this.button = new Main_$this.RectButton((function L_() {
    const L_$this = this;
    this.UI_ = function() {
      const UI_$this = this;
      this.Layout_ = function() {
        const Layout_$this = this;
        this.paint = function(pos0, pos1, size0$, size1$) {
          {
            let childSize0 = Layout_$this.l8;
            let posDiff0 = (size0$ - childSize0) * UI_$this.v11;
            let size0$$ = childSize0;
            let childSize1 = Layout_$this.l12;
            let posDiff1 = (size1$ - childSize1) * UI_$this.v11;
            let size1$$ = childSize1;
            let pos0$ = pos0 + posDiff0;
            let pos1$ = pos1 + posDiff1;
            {
              Main_$this.pushAttribute(12, UI_$this.v4);
              let childSize0$ = Layout_$this.u5;
              let posDiff0$ = (size0$$ - childSize0$) * UI_$this.v3;
              let size0$$$ = childSize0$;
              posDiff0$ += UI_$this.v5[0];
              let size1$$$ = Layout_$this.u9;
              let childSize1$ = Layout_$this.u9;
              let posDiff1$ = (size1$$$ - childSize1$) * UI_$this.v3;
              size1$$$ = childSize1$;
              posDiff1$ += UI_$this.v5[1];
              let pos0$$ = pos0$ + posDiff0$;
              let pos1$$ = pos1$ + posDiff1$;
              UI_$this.v1(pos0$$, pos1$$, size0$$$, size1$$$);
              Main_$this.popAttribute(12);
            }
            {
              let size1$$$ = Layout_$this.l10 - Layout_$this.u9;
              let posDiff1$ = Layout_$this.u9;
              let pos1$$ = pos1$ + posDiff1$;
            }
            {
              let size1$$$ = Layout_$this.l12 - Layout_$this.l10;
              let posDiff1$ = Layout_$this.l10;
              let pos1$$ = pos1$ + posDiff1$;
              {
                Main_$this.pushAttribute(12, UI_$this.v9);
                let childSize0$ = Layout_$this.u7;
                let posDiff0$ = (size0$$ - childSize0$) * UI_$this.v8;
                let size0$$$ = childSize0$;
                let childSize1$ = Layout_$this.u11;
                let posDiff1$$ = (size1$$$ - childSize1$) * UI_$this.v8;
                let size1$$$$ = childSize1$;
                let pos0$$ = pos0$ + posDiff0$;
                let pos1$$$ = pos1$$ + posDiff1$$;
                Main_$this.displayText(UI_$this.v7, pos0$$, pos1$$$, size0$$$, size1$$$$);
                Main_$this.popAttribute(12);
              }
            }
          }
        }
        this.onEvent = function(event, pos0, pos1, size0$, size1$) {
          let flag = false;
          return (flag);
        }
        this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
          {
            let childSize0 = Layout_$this.u5;
            let posDiff0 = (size0$ - childSize0) * UI_$this.v3;
            let size0$$ = childSize0;
            posDiff0 += UI_$this.v5[0];
            let size1$$ = Layout_$this.u9;
            let childSize1 = Layout_$this.u9;
            let posDiff1 = (size1$$ - childSize1) * UI_$this.v3;
            size1$$ = childSize1;
            posDiff1 += UI_$this.v5[1];
            let pos0$ = pos0 + posDiff0;
            let pos1$ = pos1 + posDiff1;
          }
          {
            let size1$$ = Layout_$this.l10 - Layout_$this.u9;
            let posDiff1 = Layout_$this.u9;
            let pos1$ = pos1 + posDiff1;
          }
          {
            let size1$$ = Layout_$this.l12 - Layout_$this.l10;
            let posDiff1 = Layout_$this.l10;
            let pos1$ = pos1 + posDiff1;
            {
              let childSize0 = Layout_$this.u7;
              let posDiff0 = (size0$ - childSize0) * UI_$this.v8;
              let size0$$ = childSize0;
              let childSize1 = Layout_$this.u11;
              let posDiff1$ = (size1$$ - childSize1) * UI_$this.v8;
              let size1$$$ = childSize1;
              let pos0$ = pos0 + posDiff0;
              let pos1$$ = pos1$ + posDiff1$;
            }
          }
          return (new QEDExplicitArray(0, 0, 0, 0));
        }
        this.a1 = new QEDExplicitArray(UI_$this.v2[0], UI_$this.v2[1]);
        this.a2 = new QEDExplicitArray(UI_$this.v6, UI_$this.v6);
        this.a3 = Main_$this.getTextSize(UI_$this.v7);
        this.a4 = new QEDExplicitArray(UI_$this.v10[0], UI_$this.v10[1]);
        this.u5 = this.a1[0];
        this.u6 = this.a2[0];
        this.l6 = Main_$this.max(this.u5, this.u6);
        this.u7 = this.a3[0];
        this.u8 = this.a4[0];
        this.l8 = Main_$this.max(this.l6, this.u8);
        this.u9 = this.a1[1];
        this.u10 = this.a2[1];
        this.l10 = this.u9 + this.u10;
        this.u11 = this.a3[1];
        this.u12 = this.a4[1];
        this.l12 = this.l10 + this.u12;
        this.size0 = this.l8;
        this.size1 = this.l12;
      }
      this.v1 = ObjectOverTextButton$this.drawObject;
      this.v2 = new QEDExplicitArray(240, 160);
      this.v3 = ((50) / 100);
      this.v4 = Main_$this.COLOR_WHITE;
      this.v5 = new QEDExplicitArray(0, -40);
      this.v6 = 10;
      this.v7 = ObjectOverTextButton$this.text;
      this.v8 = ((50) / 100);
      this.v9 = Main_$this.COLOR_WHITE;
      this.v10 = new QEDExplicitArray(300, 50);
      this.v11 = ((50) / 100);
    }
    this.ui_ = null;
    this.setUI_ = function() {
      L_$this.ui_ = new L_$this.UI_();
    }
  }), (function Lambda_() {
    {
      Main_$this.post_(_HandlerFn_);
      return;
    }
  }));
}
this.ObjectBeforeTextButton = function(drawObject, text, _HandlerFn_) {
  this.drawObject = drawObject;
  this.text = text;
  const ObjectBeforeTextButton$this = this;
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0$, size1$) {
        _paint(Layout_$this.a1, pos0, pos1, size0$, size1$);
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        if ((3 & (1 << event)) !== 0) {
          flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$;
          if (flag) {
            flag = _onEvent(Layout_$this.a1, event, pos0, pos1, size0$, size1$);
            if (!flag) {
            }
          }
        }
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = _layout(UI_$this.v1);
      this.u2 = this.a1.size0;
      this.u3 = this.a1.size1;
      this.size0 = this.u2;
      this.size1 = this.u3;
    }
    this.v1 = ObjectBeforeTextButton$this.button;
    _setUI(this.v1);
  }
  this.ui_ = null;
  this.setUI_ = function() {
    ObjectBeforeTextButton$this.ui_ = new ObjectBeforeTextButton$this.UI_();
  }
  this.blocking__Call = null;
  this.button = new Main_$this.RectButton((function L_() {
    const L_$this = this;
    this.UI_ = function() {
      const UI_$this = this;
      this.Layout_ = function() {
        const Layout_$this = this;
        this.paint = function(pos0, pos1, size0$, size1$) {
          {
            Main_$this.pushAttribute(12, UI_$this.v10);
            let childSize0 = Layout_$this.l10;
            let posDiff0 = (size0$ - childSize0) * UI_$this.v9[0];
            let size0$$ = childSize0;
            let childSize1 = Layout_$this.l15;
            let posDiff1 = (size1$ - childSize1) * UI_$this.v9[1];
            let size1$$ = childSize1;
            let pos0$ = pos0 + posDiff0;
            let pos1$ = pos1 + posDiff1;
            let size0$$$ = Layout_$this.u6;
            {
              let size0$$$ = Layout_$this.l7 - Layout_$this.u6;
              let posDiff0$ = Layout_$this.u6;
              let childSize0$ = Layout_$this.u7;
              posDiff0$ += (size0$$$ - childSize0$) * UI_$this.v4;
              size0$$$ = childSize0$;
              let childSize1$ = Layout_$this.u12;
              let posDiff1$ = (size1$$ - childSize1$) * UI_$this.v4;
              let size1$$$ = childSize1$;
              let pos0$$ = pos0$ + posDiff0$;
              let pos1$$ = pos1$ + posDiff1$;
              UI_$this.v2(pos0$$, pos1$$, size0$$$, size1$$$);
            }
            {
              let size0$$$ = Layout_$this.l8 - Layout_$this.l7;
              let posDiff0$ = Layout_$this.l7;
              let pos0$$ = pos0$ + posDiff0$;
            }
            {
              let size0$$$ = Layout_$this.l10 - Layout_$this.l8;
              let posDiff0$ = Layout_$this.l8;
              let pos0$$ = pos0$ + posDiff0$;
              {
                let childSize0$ = Layout_$this.u9;
                let posDiff0$$ = (size0$$$ - childSize0$) * UI_$this.v7[0];
                let size0$$$$ = childSize0$;
                let childSize1$ = Layout_$this.u14;
                let posDiff1$ = (size1$$ - childSize1$) * UI_$this.v7[1];
                let size1$$$ = childSize1$;
                let pos0$$$ = pos0$$ + posDiff0$$;
                let pos1$$ = pos1$ + posDiff1$;
                Main_$this.displayText(UI_$this.v6, pos0$$$, pos1$$, size0$$$$, size1$$$);
              }
            }
            Main_$this.popAttribute(12);
          }
        }
        this.onEvent = function(event, pos0, pos1, size0$, size1$) {
          let flag = false;
          return (flag);
        }
        this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
          let size0$$ = Layout_$this.u6;
          {
            let size0$$ = Layout_$this.l7 - Layout_$this.u6;
            let posDiff0 = Layout_$this.u6;
            let childSize0 = Layout_$this.u7;
            posDiff0 += (size0$$ - childSize0) * UI_$this.v4;
            size0$$ = childSize0;
            let childSize1 = Layout_$this.u12;
            let posDiff1 = (size1$ - childSize1) * UI_$this.v4;
            let size1$$ = childSize1;
            let pos0$ = pos0 + posDiff0;
            let pos1$ = pos1 + posDiff1;
          }
          {
            let size0$$ = Layout_$this.l8 - Layout_$this.l7;
            let posDiff0 = Layout_$this.l7;
            let pos0$ = pos0 + posDiff0;
          }
          {
            let size0$$ = Layout_$this.l10 - Layout_$this.l8;
            let posDiff0 = Layout_$this.l8;
            let pos0$ = pos0 + posDiff0;
            {
              let childSize0 = Layout_$this.u9;
              let posDiff0$ = (size0$$ - childSize0) * UI_$this.v7[0];
              let size0$$$ = childSize0;
              let childSize1 = Layout_$this.u14;
              let posDiff1 = (size1$ - childSize1) * UI_$this.v7[1];
              let size1$$ = childSize1;
              let pos0$$ = pos0$ + posDiff0$;
              let pos1$ = pos1 + posDiff1;
            }
          }
          return (new QEDExplicitArray(0, 0, 0, 0));
        }
        this.a1 = new QEDExplicitArray(UI_$this.v1, UI_$this.v1);
        this.a2 = new QEDExplicitArray(UI_$this.v3, UI_$this.v3);
        this.a3 = new QEDExplicitArray(UI_$this.v5, UI_$this.v5);
        this.a4 = Main_$this.getTextSize(UI_$this.v6);
        this.a5 = new QEDExplicitArray(UI_$this.v8[0], UI_$this.v8[1]);
        this.u6 = this.a1[0];
        this.u7 = this.a2[0];
        this.l7 = this.u6 + this.u7;
        this.u8 = this.a3[0];
        this.l8 = this.l7 + this.u8;
        this.u9 = this.a4[0];
        this.u10 = this.a5[0];
        this.l10 = this.l8 + this.u10;
        this.u11 = this.a1[1];
        this.u12 = this.a2[1];
        this.l12 = Main_$this.max(this.u11, this.u12);
        this.u13 = this.a3[1];
        this.l13 = Main_$this.max(this.l12, this.u13);
        this.u14 = this.a4[1];
        this.u15 = this.a5[1];
        this.l15 = Main_$this.max(this.l13, this.u15);
        this.size0 = this.l10;
        this.size1 = this.l15;
      }
      this.v1 = 30;
      this.v2 = ObjectBeforeTextButton$this.drawObject;
      this.v3 = 60;
      this.v4 = ((50) / 100);
      this.v5 = 20;
      this.v6 = ObjectBeforeTextButton$this.text;
      this.v7 = new QEDExplicitArray(0, ((50) / 100));
      this.v8 = new QEDExplicitArray(200, 50);
      this.v9 = new QEDExplicitArray(0, ((50) / 100));
      this.v10 = Main_$this.COLOR_WHITE;
    }
    this.ui_ = null;
    this.setUI_ = function() {
      L_$this.ui_ = new L_$this.UI_();
    }
  }), (function Lambda_() {
    {
      Main_$this.post_(_HandlerFn_);
      return;
    }
  }));
}
this.KeyButton = function(text, _HandlerFn_) {
  this.text = text;
  const KeyButton$this = this;
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0$, size1$) {
        {
        }
        {
          Main_$this.pushAttribute(5, UI_$this.v3);
          _paint(Layout_$this.a2, pos0, pos1, size0$, size1$);
          Main_$this.popAttribute(5);
        }
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        if ((3 & (1 << event)) !== 0) {
          flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$;
          if (flag) {
            flag = _onEvent(Layout_$this.a2, event, pos0, pos1, size0$, size1$);
            if (!flag) {
            }
          }
        }
        if (!flag) {
        }
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = new QEDExplicitArray(UI_$this.v1, UI_$this.v1);
      Main_$this.pushAttribute(5, UI_$this.v3);
      this.a2 = _layout(UI_$this.v2);
      Main_$this.popAttribute(5);
      this.u3 = this.a1[0];
      this.u4 = this.a2.size0;
      this.l4 = Main_$this.max(this.u3, this.u4);
      this.u5 = this.a1[1];
      this.u6 = this.a2.size1;
      this.l6 = Main_$this.max(this.u5, this.u6);
      this.size0 = this.l4;
      this.size1 = this.l6;
    }
    this.v1 = Main_$this.getAttribute(5) * 1.500000;
    this.v2 = KeyButton$this.button;
    this.v3 = (Main_$this.getAttribute(5) * (text.length > 1 ? 0.500000 : 1));
    Main_$this.pushAttribute(5, this.v3);
    _setUI(this.v2);
    Main_$this.popAttribute(5);
  }
  this.ui_ = null;
  this.setUI_ = function() {
    KeyButton$this.ui_ = new KeyButton$this.UI_();
  }
  this.blocking__Call = null;
  this.button = new Main_$this.TextButton(this.text, (function Lambda_(_ret) {
    {
      Main_$this.post_((function lambda_() {
        _HandlerFn_(KeyButton$this.text);
      }));
      return;
    }
  }));
}
this.LargerButton = function(text, _HandlerFn_) {
  this.text = text;
  const LargerButton$this = this;
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0$, size1$) {
        {
        }
        _paint(Layout_$this.a2, pos0, pos1, size0$, size1$);
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        if ((3 & (1 << event)) !== 0) {
          flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$;
          if (flag) {
            flag = _onEvent(Layout_$this.a2, event, pos0, pos1, size0$, size1$);
            if (!flag) {
            }
          }
        }
        if (!flag) {
        }
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = new QEDExplicitArray(UI_$this.v1[0], UI_$this.v1[1]);
      this.a2 = _layout(UI_$this.v3);
      this.u3 = this.a1[0];
      this.u4 = this.a2.size0;
      this.l4 = Main_$this.max(this.u3, this.u4);
      this.u5 = this.a1[1];
      this.u6 = this.a2.size1;
      this.l6 = Main_$this.max(this.u5, this.u6);
      this.size0 = this.l4;
      this.size1 = this.l6;
    }
    this.v1 = new QEDExplicitArray(0, Main_$this.getAttribute(5) * 2.500000);
    this.v2 = ((100) / 100);
    this.v3 = LargerButton$this.button;
    _setUI(this.v3);
  }
  this.ui_ = null;
  this.setUI_ = function() {
    LargerButton$this.ui_ = new LargerButton$this.UI_();
  }
  this.blocking__Call = null;
  this.button = new Main_$this.TextButton("   " + this.text + "   ", (function Lambda_(_ret) {
    {
      Main_$this.post_((function lambda_() {
        _HandlerFn_(LargerButton$this.text);
      }));
      return;
    }
  }));
}
this.NumericKeyboardWidget = function(_HandlerFn_) {
  const NumericKeyboardWidget$this = this;
  this.Row = function(row, _HandlerFn_) {
    this.row = row;
    const Row$this = this;
    this.UI_ = function() {
      const UI_$this = this;
      this.Layout_ = function() {
        const Layout_$this = this;
        this.paint = function(pos0, pos1, size0$, size1$) {
          {
            let childSize0 = Layout_$this.u2;
            let posDiff0 = (size0$ - childSize0) * UI_$this.v2;
            let size0$$ = childSize0;
            let childSize1 = Layout_$this.u3;
            let posDiff1 = (size1$ - childSize1) * UI_$this.v2;
            let size1$$ = childSize1;
            let pos0$ = pos0 + posDiff0;
            let pos1$ = pos1 + posDiff1;
            _paint(Layout_$this.a1, pos0$, pos1$, size0$$, size1$$);
          }
        }
        this.onEvent = function(event, pos0, pos1, size0$, size1$) {
          let flag = false;
          if ((3 & (1 << event)) !== 0) {
            let childSize0 = Layout_$this.u2;
            let posDiff0 = (size0$ - childSize0) * UI_$this.v2;
            let size0$$ = childSize0;
            let childSize1 = Layout_$this.u3;
            let posDiff1 = (size1$ - childSize1) * UI_$this.v2;
            let size1$$ = childSize1;
            flag = pos0 >= posDiff0 && pos0 < posDiff0 + size0$$ && pos1 >= posDiff1 && pos1 < posDiff1 + size1$$;
            if (flag) {
              pos0 = pos0 - posDiff0;
              pos1 = pos1 - posDiff1;
              flag = _onEvent(Layout_$this.a1, event, pos0, pos1, size0$$, size1$$);
              if (!flag) {
              }
            }
          }
          return (flag);
        }
        this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
          return (new QEDExplicitArray(0, 0, 0, 0));
        }
        this.a1 = new Main_$this.LayoutArray_(UI_$this.v1, Main_$this.calcLayoutObj, Main_$this.getSizeObj, Main_$this.paintLayoutObj, Main_$this.onLayoutEventObj, Main_$this.getElementRectObj);
        this.u2 = this.a1.size0;
        this.u3 = this.a1.size1;
        this.size0 = this.u2;
        this.size1 = this.u3;
      }
      this.v1 = Row$this.buttons;
      this.v2 = ((50) / 100);
      Main_$this.uiArray_(this.v1);
    }
    this.ui_ = null;
    this.setUI_ = function() {
      Row$this.ui_ = new Row$this.UI_();
    }
    this.blocking__Call$ = null;
    {
      let _d0 = NumericKeyboardWidget$this.numKeyboardRows[Row$this.row].length;
      this.buttons = new Main_$this.QEDArray(new QEDExplicitArray(_d0), (function l(pos, _HandlerFn_) {
        let index = pos[0];
        return (new Main_$this.KeyButton(NumericKeyboardWidget$this.numKeyboardRows[Row$this.row].charAt(index), _HandlerFn_));
      }), Main_$this.Qui_, (function Lambda_(_ret) {
        {
          Main_$this.post_((function lambda_() {
            _HandlerFn_(_ret._ret);
          }));
          return;
        }
      }));
    }
  }
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0$, size1$) {
        {
          {
            let size1$$ = Layout_$this.u15;
            _paint(Layout_$this.a1, pos0, pos1, size0$, size1$$);
          }
          {
            let size1$$ = Layout_$this.l16 - Layout_$this.u15;
            let posDiff1 = Layout_$this.u15;
            let pos1$ = pos1 + posDiff1;
          }
          {
            let size1$$ = Layout_$this.l17 - Layout_$this.l16;
            let posDiff1 = Layout_$this.l16;
            let pos1$ = pos1 + posDiff1;
            _paint(Layout_$this.a3, pos0, pos1$, size0$, size1$$);
          }
          {
            let size1$$ = Layout_$this.l18 - Layout_$this.l17;
            let posDiff1 = Layout_$this.l17;
            let pos1$ = pos1 + posDiff1;
          }
          {
            let size1$$ = Layout_$this.l19 - Layout_$this.l18;
            let posDiff1 = Layout_$this.l18;
            let pos1$ = pos1 + posDiff1;
            _paint(Layout_$this.a5, pos0, pos1$, size0$, size1$$);
          }
          {
            let size1$$ = Layout_$this.l20 - Layout_$this.l19;
            let posDiff1 = Layout_$this.l19;
            let pos1$ = pos1 + posDiff1;
          }
          {
            let childSize0 = Layout_$this.u14;
            let posDiff0 = (size0$ - childSize0) * UI_$this.v8;
            let size0$$ = childSize0;
            let size1$$ = Layout_$this.l21 - Layout_$this.l20;
            let posDiff1 = Layout_$this.l20;
            let childSize1 = Layout_$this.u21;
            posDiff1 += (size1$$ - childSize1) * UI_$this.v8;
            size1$$ = childSize1;
            let pos0$ = pos0 + posDiff0;
            let pos1$ = pos1 + posDiff1;
            _paint(Layout_$this.a7, pos0$, pos1$, size0$$, size1$$);
          }
        }
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        if ((3 & (1 << event)) !== 0) {
          flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$;
          if (flag) {
            if ((3 & (1 << event)) !== 0) {
              let childSize0 = Layout_$this.u14;
              let posDiff0 = (size0$ - childSize0) * UI_$this.v8;
              let size0$$ = childSize0;
              let size1$$ = Layout_$this.l21 - Layout_$this.l20;
              let posDiff1 = Layout_$this.l20;
              let childSize1 = Layout_$this.u21;
              posDiff1 += (size1$$ - childSize1) * UI_$this.v8;
              size1$$ = childSize1;
              flag = pos0 >= posDiff0 && pos0 < posDiff0 + size0$$ && pos1 >= posDiff1 && pos1 < posDiff1 + size1$$;
              if (flag) {
                pos0 = pos0 - posDiff0;
                pos1 = pos1 - posDiff1;
                flag = _onEvent(Layout_$this.a7, event, pos0, pos1, size0$$, size1$$);
                if (!flag) {
                }
              }
            }
            if (!flag) {
              if ((3 & (1 << event)) !== 0) {
                let size1$$ = Layout_$this.l19 - Layout_$this.l18;
                let posDiff1 = Layout_$this.l18;
                flag = pos0 >= 0 && pos0 < size0$ && pos1 >= posDiff1 && pos1 < posDiff1 + size1$$;
                if (flag) {
                  pos1 = pos1 - posDiff1;
                  flag = _onEvent(Layout_$this.a5, event, pos0, pos1, size0$, size1$$);
                  if (!flag) {
                  }
                }
              }
              if (!flag) {
                if ((3 & (1 << event)) !== 0) {
                  let size1$$ = Layout_$this.l17 - Layout_$this.l16;
                  let posDiff1 = Layout_$this.l16;
                  flag = pos0 >= 0 && pos0 < size0$ && pos1 >= posDiff1 && pos1 < posDiff1 + size1$$;
                  if (flag) {
                    pos1 = pos1 - posDiff1;
                    flag = _onEvent(Layout_$this.a3, event, pos0, pos1, size0$, size1$$);
                    if (!flag) {
                    }
                  }
                }
                if (!flag) {
                  if ((3 & (1 << event)) !== 0) {
                    let size1$$ = Layout_$this.u15;
                    flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$$;
                    if (flag) {
                      flag = _onEvent(Layout_$this.a1, event, pos0, pos1, size0$, size1$$);
                      if (!flag) {
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        let size1$$ = Layout_$this.u15;
        {
          let size1$$ = Layout_$this.l16 - Layout_$this.u15;
          let posDiff1 = Layout_$this.u15;
          let pos1$ = pos1 + posDiff1;
        }
        {
          let size1$$ = Layout_$this.l17 - Layout_$this.l16;
          let posDiff1 = Layout_$this.l16;
          let pos1$ = pos1 + posDiff1;
        }
        {
          let size1$$ = Layout_$this.l18 - Layout_$this.l17;
          let posDiff1 = Layout_$this.l17;
          let pos1$ = pos1 + posDiff1;
        }
        {
          let size1$$ = Layout_$this.l19 - Layout_$this.l18;
          let posDiff1 = Layout_$this.l18;
          let pos1$ = pos1 + posDiff1;
        }
        {
          let size1$$ = Layout_$this.l20 - Layout_$this.l19;
          let posDiff1 = Layout_$this.l19;
          let pos1$ = pos1 + posDiff1;
        }
        {
          let childSize0 = Layout_$this.u14;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v8;
          let size0$$ = childSize0;
          let size1$$ = Layout_$this.l21 - Layout_$this.l20;
          let posDiff1 = Layout_$this.l20;
          let childSize1 = Layout_$this.u21;
          posDiff1 += (size1$$ - childSize1) * UI_$this.v8;
          size1$$ = childSize1;
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
        }
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = _layout(UI_$this.v1);
      this.a2 = new QEDExplicitArray(UI_$this.v2, UI_$this.v2);
      this.a3 = _layout(UI_$this.v3);
      this.a4 = new QEDExplicitArray(UI_$this.v4, UI_$this.v4);
      this.a5 = _layout(UI_$this.v5);
      this.a6 = new QEDExplicitArray(UI_$this.v6, UI_$this.v6);
      this.a7 = new Main_$this.LayoutArray_(UI_$this.v7, Main_$this.calcLayoutObj, Main_$this.getSizeObj, Main_$this.paintLayoutObj, Main_$this.onLayoutEventObj, Main_$this.getElementRectObj);
      this.u8 = this.a1.size0;
      this.u9 = this.a2[0];
      this.l9 = Main_$this.max(this.u8, this.u9);
      this.u10 = this.a3.size0;
      this.l10 = Main_$this.max(this.l9, this.u10);
      this.u11 = this.a4[0];
      this.l11 = Main_$this.max(this.l10, this.u11);
      this.u12 = this.a5.size0;
      this.l12 = Main_$this.max(this.l11, this.u12);
      this.u13 = this.a6[0];
      this.l13 = Main_$this.max(this.l12, this.u13);
      this.u14 = this.a7.size0;
      this.l14 = Main_$this.max(this.l13, this.u14);
      this.u15 = this.a1.size1;
      this.u16 = this.a2[1];
      this.l16 = this.u15 + this.u16;
      this.u17 = this.a3.size1;
      this.l17 = this.l16 + this.u17;
      this.u18 = this.a4[1];
      this.l18 = this.l17 + this.u18;
      this.u19 = this.a5.size1;
      this.l19 = this.l18 + this.u19;
      this.u20 = this.a6[1];
      this.l20 = this.l19 + this.u20;
      this.u21 = this.a7.size1;
      this.l21 = this.l20 + this.u21;
      this.size0 = this.l14;
      this.size1 = this.l21;
    }
    this.v1 = NumericKeyboardWidget$this.rows[0];
    _setUI(this.v1);
    this.v2 = 15;
    this.v3 = NumericKeyboardWidget$this.rows[1];
    _setUI(this.v3);
    this.v4 = 15;
    this.v5 = NumericKeyboardWidget$this.rows[2];
    _setUI(this.v5);
    this.v6 = 15;
    this.v7 = NumericKeyboardWidget$this.lastRow;
    this.v8 = ((50) / 100);
    Main_$this.uiArray_(this.v7);
  }
  this.ui_ = null;
  this.setUI_ = function() {
    NumericKeyboardWidget$this.ui_ = new NumericKeyboardWidget$this.UI_();
  }
  this.blocking__Call = null;
  this.typedText = "";
  this.numKeyboardRows = new QEDExplicitArray("789", "456", "123");
  {
    let _d0 = this.numKeyboardRows.size();
    this.rows = new Main_$this.QEDArray(new QEDExplicitArray(_d0), (function l(pos, _HandlerFn_) {
      let i = pos[0];
      return (new NumericKeyboardWidget$this.Row(i, _HandlerFn_));
    }), Main_$this.Qui_, (function Lambda_(_ret) {
      {
        NumericKeyboardWidget$this.typedText += _ret._ret;
        {
          Main_$this.post_((function lambda_() {
            _HandlerFn_(NumericKeyboardWidget$this.typedText);
          }));
          return;
        }
      }
    }));
    this.lastRow = new QEDExplicitArray(new Main_$this.KeyButton("Clear", (function Lambda_(_ret) {
      {
        NumericKeyboardWidget$this.typedText = "";
        {
          Main_$this.post_((function lambda_() {
            _HandlerFn_(NumericKeyboardWidget$this.typedText);
          }));
          return;
        }
      }
    })), new Main_$this.KeyButton("0", (function Lambda_(_ret) {
      {
        NumericKeyboardWidget$this.typedText += "0";
        {
          Main_$this.post_((function lambda_() {
            _HandlerFn_(NumericKeyboardWidget$this.typedText);
          }));
          return;
        }
      }
    })), new Main_$this.KeyButton("Del", (function Lambda_(_ret) {
      {
        NumericKeyboardWidget$this.typedText = NumericKeyboardWidget$this.typedText.slice(0, -1);
        {
          Main_$this.post_((function lambda_() {
            _HandlerFn_(NumericKeyboardWidget$this.typedText);
          }));
          return;
        }
      }
    })));
  }
}
this.AlphaKeyboardWidget = function(_HandlerFn_) {
  const AlphaKeyboardWidget$this = this;
  this.Row = function(row, _HandlerFn_) {
    this.row = row;
    const Row$this = this;
    this.UI_ = function() {
      const UI_$this = this;
      this.Layout_ = function() {
        const Layout_$this = this;
        this.paint = function(pos0, pos1, size0$, size1$) {
          {
            let childSize0 = Layout_$this.u2;
            let posDiff0 = (size0$ - childSize0) * UI_$this.v2;
            let size0$$ = childSize0;
            let childSize1 = Layout_$this.u3;
            let posDiff1 = (size1$ - childSize1) * UI_$this.v2;
            let size1$$ = childSize1;
            let pos0$ = pos0 + posDiff0;
            let pos1$ = pos1 + posDiff1;
            _paint(Layout_$this.a1, pos0$, pos1$, size0$$, size1$$);
          }
        }
        this.onEvent = function(event, pos0, pos1, size0$, size1$) {
          let flag = false;
          if ((3 & (1 << event)) !== 0) {
            let childSize0 = Layout_$this.u2;
            let posDiff0 = (size0$ - childSize0) * UI_$this.v2;
            let size0$$ = childSize0;
            let childSize1 = Layout_$this.u3;
            let posDiff1 = (size1$ - childSize1) * UI_$this.v2;
            let size1$$ = childSize1;
            flag = pos0 >= posDiff0 && pos0 < posDiff0 + size0$$ && pos1 >= posDiff1 && pos1 < posDiff1 + size1$$;
            if (flag) {
              pos0 = pos0 - posDiff0;
              pos1 = pos1 - posDiff1;
              flag = _onEvent(Layout_$this.a1, event, pos0, pos1, size0$$, size1$$);
              if (!flag) {
              }
            }
          }
          return (flag);
        }
        this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
          return (new QEDExplicitArray(0, 0, 0, 0));
        }
        this.a1 = new Main_$this.LayoutArray_(UI_$this.v1, Main_$this.calcLayoutObj, Main_$this.getSizeObj, Main_$this.paintLayoutObj, Main_$this.onLayoutEventObj, Main_$this.getElementRectObj);
        this.u2 = this.a1.size0;
        this.u3 = this.a1.size1;
        this.size0 = this.u2;
        this.size1 = this.u3;
      }
      this.v1 = Row$this.buttons;
      this.v2 = ((50) / 100);
      Main_$this.uiArray_(this.v1);
    }
    this.ui_ = null;
    this.setUI_ = function() {
      Row$this.ui_ = new Row$this.UI_();
    }
    this.blocking__Call$ = null;
    {
      let _d0 = AlphaKeyboardWidget$this.alphaKeyboardRows[Row$this.row].length;
      this.buttons = new Main_$this.QEDArray(new QEDExplicitArray(_d0), (function l(pos, _HandlerFn_) {
        let index = pos[0];
        return (new Main_$this.KeyButton(AlphaKeyboardWidget$this.alphaKeyboardRows[Row$this.row].charAt(index), _HandlerFn_));
      }), Main_$this.Qui_, (function Lambda_(_ret) {
        {
          Main_$this.post_((function lambda_() {
            _HandlerFn_(_ret._ret);
          }));
          return;
        }
      }));
    }
  }
  this.SpaceFunc = function(_HandlerFn_) {
    const SpaceFunc$this = this;
    this.UI_ = function() {
      const UI_$this = this;
      this.Layout_ = function() {
        this.paint = function(pos0, pos1, size0$, size1$) {
          {
          }
        }
        this.onEvent = function(event, pos0, pos1, size0$, size1$) {
          let flag = false;
          return (flag);
        }
        this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
          return (new QEDExplicitArray(0, 0, 0, 0));
        }
        this.a1 = new QEDExplicitArray(UI_$this.v1[0], UI_$this.v1[1]);
        this.u2 = this.a1[0];
        this.u3 = this.a1[1];
        this.size0 = this.u2;
        this.size1 = this.u3;
      }
      this.v1 = new QEDExplicitArray(200, 1);
    }
    this.ui_ = null;
    this.setUI_ = function() {
      SpaceFunc$this.ui_ = new SpaceFunc$this.UI_();
    }
    this.blocking__Call$ = null;
  }
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0$, size1$) {
        {
          {
            let size1$$ = Layout_$this.u19;
            _paint(Layout_$this.a1, pos0, pos1, size0$, size1$$);
          }
          {
            let size1$$ = Layout_$this.l20 - Layout_$this.u19;
            let posDiff1 = Layout_$this.u19;
            let pos1$ = pos1 + posDiff1;
          }
          {
            let size1$$ = Layout_$this.l21 - Layout_$this.l20;
            let posDiff1 = Layout_$this.l20;
            let pos1$ = pos1 + posDiff1;
            _paint(Layout_$this.a3, pos0, pos1$, size0$, size1$$);
          }
          {
            let size1$$ = Layout_$this.l22 - Layout_$this.l21;
            let posDiff1 = Layout_$this.l21;
            let pos1$ = pos1 + posDiff1;
          }
          {
            let size1$$ = Layout_$this.l23 - Layout_$this.l22;
            let posDiff1 = Layout_$this.l22;
            let pos1$ = pos1 + posDiff1;
            _paint(Layout_$this.a5, pos0, pos1$, size0$, size1$$);
          }
          {
            let size1$$ = Layout_$this.l24 - Layout_$this.l23;
            let posDiff1 = Layout_$this.l23;
            let pos1$ = pos1 + posDiff1;
          }
          {
            let size1$$ = Layout_$this.l25 - Layout_$this.l24;
            let posDiff1 = Layout_$this.l24;
            let pos1$ = pos1 + posDiff1;
            _paint(Layout_$this.a7, pos0, pos1$, size0$, size1$$);
          }
          {
            let size1$$ = Layout_$this.l26 - Layout_$this.l25;
            let posDiff1 = Layout_$this.l25;
            let pos1$ = pos1 + posDiff1;
          }
          {
            let childSize0 = Layout_$this.u18;
            let posDiff0 = (size0$ - childSize0) * UI_$this.v10;
            let size0$$ = childSize0;
            let size1$$ = Layout_$this.l27 - Layout_$this.l26;
            let posDiff1 = Layout_$this.l26;
            let childSize1 = Layout_$this.u27;
            posDiff1 += (size1$$ - childSize1) * UI_$this.v10;
            size1$$ = childSize1;
            let pos0$ = pos0 + posDiff0;
            let pos1$ = pos1 + posDiff1;
            _paint(Layout_$this.a9, pos0$, pos1$, size0$$, size1$$);
          }
        }
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        if ((3 & (1 << event)) !== 0) {
          flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$;
          if (flag) {
            if ((3 & (1 << event)) !== 0) {
              let childSize0 = Layout_$this.u18;
              let posDiff0 = (size0$ - childSize0) * UI_$this.v10;
              let size0$$ = childSize0;
              let size1$$ = Layout_$this.l27 - Layout_$this.l26;
              let posDiff1 = Layout_$this.l26;
              let childSize1 = Layout_$this.u27;
              posDiff1 += (size1$$ - childSize1) * UI_$this.v10;
              size1$$ = childSize1;
              flag = pos0 >= posDiff0 && pos0 < posDiff0 + size0$$ && pos1 >= posDiff1 && pos1 < posDiff1 + size1$$;
              if (flag) {
                pos0 = pos0 - posDiff0;
                pos1 = pos1 - posDiff1;
                flag = _onEvent(Layout_$this.a9, event, pos0, pos1, size0$$, size1$$);
                if (!flag) {
                }
              }
            }
            if (!flag) {
              if ((3 & (1 << event)) !== 0) {
                let size1$$ = Layout_$this.l25 - Layout_$this.l24;
                let posDiff1 = Layout_$this.l24;
                flag = pos0 >= 0 && pos0 < size0$ && pos1 >= posDiff1 && pos1 < posDiff1 + size1$$;
                if (flag) {
                  pos1 = pos1 - posDiff1;
                  flag = _onEvent(Layout_$this.a7, event, pos0, pos1, size0$, size1$$);
                  if (!flag) {
                  }
                }
              }
              if (!flag) {
                if ((3 & (1 << event)) !== 0) {
                  let size1$$ = Layout_$this.l23 - Layout_$this.l22;
                  let posDiff1 = Layout_$this.l22;
                  flag = pos0 >= 0 && pos0 < size0$ && pos1 >= posDiff1 && pos1 < posDiff1 + size1$$;
                  if (flag) {
                    pos1 = pos1 - posDiff1;
                    flag = _onEvent(Layout_$this.a5, event, pos0, pos1, size0$, size1$$);
                    if (!flag) {
                    }
                  }
                }
                if (!flag) {
                  if ((3 & (1 << event)) !== 0) {
                    let size1$$ = Layout_$this.l21 - Layout_$this.l20;
                    let posDiff1 = Layout_$this.l20;
                    flag = pos0 >= 0 && pos0 < size0$ && pos1 >= posDiff1 && pos1 < posDiff1 + size1$$;
                    if (flag) {
                      pos1 = pos1 - posDiff1;
                      flag = _onEvent(Layout_$this.a3, event, pos0, pos1, size0$, size1$$);
                      if (!flag) {
                      }
                    }
                  }
                  if (!flag) {
                    if ((3 & (1 << event)) !== 0) {
                      let size1$$ = Layout_$this.u19;
                      flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$$;
                      if (flag) {
                        flag = _onEvent(Layout_$this.a1, event, pos0, pos1, size0$, size1$$);
                        if (!flag) {
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        let size1$$ = Layout_$this.u19;
        {
          let size1$$ = Layout_$this.l20 - Layout_$this.u19;
          let posDiff1 = Layout_$this.u19;
          let pos1$ = pos1 + posDiff1;
        }
        {
          let size1$$ = Layout_$this.l21 - Layout_$this.l20;
          let posDiff1 = Layout_$this.l20;
          let pos1$ = pos1 + posDiff1;
        }
        {
          let size1$$ = Layout_$this.l22 - Layout_$this.l21;
          let posDiff1 = Layout_$this.l21;
          let pos1$ = pos1 + posDiff1;
        }
        {
          let size1$$ = Layout_$this.l23 - Layout_$this.l22;
          let posDiff1 = Layout_$this.l22;
          let pos1$ = pos1 + posDiff1;
        }
        {
          let size1$$ = Layout_$this.l24 - Layout_$this.l23;
          let posDiff1 = Layout_$this.l23;
          let pos1$ = pos1 + posDiff1;
        }
        {
          let size1$$ = Layout_$this.l25 - Layout_$this.l24;
          let posDiff1 = Layout_$this.l24;
          let pos1$ = pos1 + posDiff1;
        }
        {
          let size1$$ = Layout_$this.l26 - Layout_$this.l25;
          let posDiff1 = Layout_$this.l25;
          let pos1$ = pos1 + posDiff1;
        }
        {
          let childSize0 = Layout_$this.u18;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v10;
          let size0$$ = childSize0;
          let size1$$ = Layout_$this.l27 - Layout_$this.l26;
          let posDiff1 = Layout_$this.l26;
          let childSize1 = Layout_$this.u27;
          posDiff1 += (size1$$ - childSize1) * UI_$this.v10;
          size1$$ = childSize1;
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
        }
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = _layout(UI_$this.v1);
      this.a2 = new QEDExplicitArray(UI_$this.v2, UI_$this.v2);
      this.a3 = _layout(UI_$this.v3);
      this.a4 = new QEDExplicitArray(UI_$this.v4, UI_$this.v4);
      this.a5 = _layout(UI_$this.v5);
      this.a6 = new QEDExplicitArray(UI_$this.v6, UI_$this.v6);
      this.a7 = _layout(UI_$this.v7);
      this.a8 = new QEDExplicitArray(UI_$this.v8, UI_$this.v8);
      this.a9 = new Main_$this.LayoutArray_(UI_$this.v9, Main_$this.calcLayoutObj, Main_$this.getSizeObj, Main_$this.paintLayoutObj, Main_$this.onLayoutEventObj, Main_$this.getElementRectObj);
      this.u10 = this.a1.size0;
      this.u11 = this.a2[0];
      this.l11 = Main_$this.max(this.u10, this.u11);
      this.u12 = this.a3.size0;
      this.l12 = Main_$this.max(this.l11, this.u12);
      this.u13 = this.a4[0];
      this.l13 = Main_$this.max(this.l12, this.u13);
      this.u14 = this.a5.size0;
      this.l14 = Main_$this.max(this.l13, this.u14);
      this.u15 = this.a6[0];
      this.l15 = Main_$this.max(this.l14, this.u15);
      this.u16 = this.a7.size0;
      this.l16 = Main_$this.max(this.l15, this.u16);
      this.u17 = this.a8[0];
      this.l17 = Main_$this.max(this.l16, this.u17);
      this.u18 = this.a9.size0;
      this.l18 = Main_$this.max(this.l17, this.u18);
      this.u19 = this.a1.size1;
      this.u20 = this.a2[1];
      this.l20 = this.u19 + this.u20;
      this.u21 = this.a3.size1;
      this.l21 = this.l20 + this.u21;
      this.u22 = this.a4[1];
      this.l22 = this.l21 + this.u22;
      this.u23 = this.a5.size1;
      this.l23 = this.l22 + this.u23;
      this.u24 = this.a6[1];
      this.l24 = this.l23 + this.u24;
      this.u25 = this.a7.size1;
      this.l25 = this.l24 + this.u25;
      this.u26 = this.a8[1];
      this.l26 = this.l25 + this.u26;
      this.u27 = this.a9.size1;
      this.l27 = this.l26 + this.u27;
      this.size0 = this.l18;
      this.size1 = this.l27;
    }
    this.v1 = AlphaKeyboardWidget$this.rows[0];
    _setUI(this.v1);
    this.v2 = 10;
    this.v3 = AlphaKeyboardWidget$this.rows[1];
    _setUI(this.v3);
    this.v4 = 10;
    this.v5 = AlphaKeyboardWidget$this.rows[2];
    _setUI(this.v5);
    this.v6 = 10;
    this.v7 = AlphaKeyboardWidget$this.rows[3];
    _setUI(this.v7);
    this.v8 = 10;
    this.v9 = AlphaKeyboardWidget$this.lastRow;
    this.v10 = ((50) / 100);
    Main_$this.uiArray_(this.v9);
  }
  this.ui_ = null;
  this.setUI_ = function() {
    AlphaKeyboardWidget$this.ui_ = new AlphaKeyboardWidget$this.UI_();
  }
  this.blocking__Call = null;
  this.typedText = "";
  this.alphaKeyboardRows = new QEDExplicitArray("1234567890", "QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM");
  {
    let _d0 = this.alphaKeyboardRows.size();
    this.rows = new Main_$this.QEDArray(new QEDExplicitArray(_d0), (function l(pos, _HandlerFn_) {
      let i = pos[0];
      return (new AlphaKeyboardWidget$this.Row(i, _HandlerFn_));
    }), Main_$this.Qui_, (function Lambda_(_ret) {
      {
        AlphaKeyboardWidget$this.typedText += _ret._ret;
        {
          Main_$this.post_((function lambda_() {
            _HandlerFn_(AlphaKeyboardWidget$this.typedText);
          }));
          return;
        }
      }
    }));
    this.lastRow = new QEDExplicitArray(new Main_$this.KeyButton("Clear", (function Lambda_(_ret) {
      {
        AlphaKeyboardWidget$this.typedText = "";
        {
          Main_$this.post_((function lambda_() {
            _HandlerFn_(AlphaKeyboardWidget$this.typedText);
          }));
          return;
        }
      }
    })), new Main_$this.RectButton(this.SpaceFunc, (function Lambda_() {
      {
        AlphaKeyboardWidget$this.typedText += " ";
        {
          Main_$this.post_((function lambda_() {
            _HandlerFn_(AlphaKeyboardWidget$this.typedText);
          }));
          return;
        }
      }
    })), new Main_$this.KeyButton("Del", (function Lambda_(_ret) {
      {
        AlphaKeyboardWidget$this.typedText = AlphaKeyboardWidget$this.typedText.slice(0, -1);
        {
          Main_$this.post_((function lambda_() {
            _HandlerFn_(AlphaKeyboardWidget$this.typedText);
          }));
          return;
        }
      }
    })));
  }
}
this.SpinnerWidget = function(_HandlerFn_) {
  const SpinnerWidget$this = this;
  this.Circle = function(index, _HandlerFn_) {
    this.index = index;
    const Circle$this = this;
    this.UI_ = function() {
      const UI_$this = this;
      this.Layout_ = function() {
        const Layout_$this = this;
        this.paint = function(pos0, pos1, size0$, size1$) {
          {
            Main_$this.rotate(pos0, pos1, size0$, size1$, UI_$this.v4);
            pos0 = -size0$ / 2;
            pos1 = -size1$ / 2;
            {
              let childSize0 = Layout_$this.u2;
              let posDiff0 = (size0$ - childSize0) * UI_$this.v3[0];
              let size0$$ = childSize0;
              let childSize1 = Layout_$this.u3;
              let posDiff1 = (size1$ - childSize1) * UI_$this.v3[1];
              let size1$$ = childSize1;
              let pos0$ = pos0 + posDiff0;
              let pos1$ = pos1 + posDiff1;
              UI_$this.v1(pos0$, pos1$, size0$$, size1$$);
            }
            Main_$this.restoreContext();
          }
        }
        this.onEvent = function(event, pos0, pos1, size0$, size1$) {
          let flag = false;
          return (flag);
        }
        this.getBoundsRect = function(path, index$, pos0, pos1, size0$, size1$, level, dLevel) {
          {
            let childSize0 = Layout_$this.u2;
            let posDiff0 = (size0$ - childSize0) * UI_$this.v3[0];
            let size0$$ = childSize0;
            let childSize1 = Layout_$this.u3;
            let posDiff1 = (size1$ - childSize1) * UI_$this.v3[1];
            let size1$$ = childSize1;
            let pos0$ = pos0 + posDiff0;
            let pos1$ = pos1 + posDiff1;
          }
          return (new QEDExplicitArray(0, 0, 0, 0));
        }
        this.a1 = new QEDExplicitArray(UI_$this.v2, UI_$this.v2);
        this.u2 = this.a1[0];
        this.u3 = this.a1[1];
        this.size0 = this.u2;
        this.size1 = this.u3;
      }
      this.v1 = Main_$this.oval;
      this.v2 = 15;
      this.v3 = new QEDExplicitArray(((100) / 100), ((50) / 100));
      this.v4 = (SpinnerWidget$this.angle + Circle$this.index) * 2 * 3.141593 / SpinnerWidget$this.numCircles;
    }
    this.ui_ = null;
    this.setUI_ = function() {
      Circle$this.ui_ = new Circle$this.UI_();
    }
    this.blocking__Call$ = null;
  }
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0$, size1$) {
        {
          let childSize0 = Layout_$this.u24;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v13;
          let size0$$ = childSize0;
          let childSize1 = Layout_$this.u36;
          let posDiff1 = (size1$ - childSize1) * UI_$this.v13;
          let size1$$ = childSize1;
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
          _paint(Layout_$this.a1, pos0$, pos1$, size0$$, size1$$);
          _paint(Layout_$this.a2, pos0$, pos1$, size0$$, size1$$);
          _paint(Layout_$this.a3, pos0$, pos1$, size0$$, size1$$);
          _paint(Layout_$this.a4, pos0$, pos1$, size0$$, size1$$);
          _paint(Layout_$this.a5, pos0$, pos1$, size0$$, size1$$);
          _paint(Layout_$this.a6, pos0$, pos1$, size0$$, size1$$);
          _paint(Layout_$this.a7, pos0$, pos1$, size0$$, size1$$);
          _paint(Layout_$this.a8, pos0$, pos1$, size0$$, size1$$);
          _paint(Layout_$this.a9, pos0$, pos1$, size0$$, size1$$);
          _paint(Layout_$this.a10, pos0$, pos1$, size0$$, size1$$);
          _paint(Layout_$this.a11, pos0$, pos1$, size0$$, size1$$);
        }
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        {
        }
        {
        }
        {
        }
        {
        }
        {
        }
        {
        }
        {
        }
        {
        }
        {
        }
        {
        }
        {
        }
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = _layout(UI_$this.v1);
      this.a2 = _layout(UI_$this.v2);
      this.a3 = _layout(UI_$this.v3);
      this.a4 = _layout(UI_$this.v4);
      this.a5 = _layout(UI_$this.v5);
      this.a6 = _layout(UI_$this.v6);
      this.a7 = _layout(UI_$this.v7);
      this.a8 = _layout(UI_$this.v8);
      this.a9 = _layout(UI_$this.v9);
      this.a10 = _layout(UI_$this.v10);
      this.a11 = _layout(UI_$this.v11);
      this.a12 = new QEDExplicitArray(UI_$this.v12, UI_$this.v12);
      this.u13 = this.a1.size0;
      this.u14 = this.a2.size0;
      this.l14 = Main_$this.max(this.u13, this.u14);
      this.u15 = this.a3.size0;
      this.l15 = Main_$this.max(this.l14, this.u15);
      this.u16 = this.a4.size0;
      this.l16 = Main_$this.max(this.l15, this.u16);
      this.u17 = this.a5.size0;
      this.l17 = Main_$this.max(this.l16, this.u17);
      this.u18 = this.a6.size0;
      this.l18 = Main_$this.max(this.l17, this.u18);
      this.u19 = this.a7.size0;
      this.l19 = Main_$this.max(this.l18, this.u19);
      this.u20 = this.a8.size0;
      this.l20 = Main_$this.max(this.l19, this.u20);
      this.u21 = this.a9.size0;
      this.l21 = Main_$this.max(this.l20, this.u21);
      this.u22 = this.a10.size0;
      this.l22 = Main_$this.max(this.l21, this.u22);
      this.u23 = this.a11.size0;
      this.l23 = Main_$this.max(this.l22, this.u23);
      this.u24 = this.a12[0];
      this.u25 = this.a1.size1;
      this.u26 = this.a2.size1;
      this.l26 = Main_$this.max(this.u25, this.u26);
      this.u27 = this.a3.size1;
      this.l27 = Main_$this.max(this.l26, this.u27);
      this.u28 = this.a4.size1;
      this.l28 = Main_$this.max(this.l27, this.u28);
      this.u29 = this.a5.size1;
      this.l29 = Main_$this.max(this.l28, this.u29);
      this.u30 = this.a6.size1;
      this.l30 = Main_$this.max(this.l29, this.u30);
      this.u31 = this.a7.size1;
      this.l31 = Main_$this.max(this.l30, this.u31);
      this.u32 = this.a8.size1;
      this.l32 = Main_$this.max(this.l31, this.u32);
      this.u33 = this.a9.size1;
      this.l33 = Main_$this.max(this.l32, this.u33);
      this.u34 = this.a10.size1;
      this.l34 = Main_$this.max(this.l33, this.u34);
      this.u35 = this.a11.size1;
      this.l35 = Main_$this.max(this.l34, this.u35);
      this.u36 = this.a12[1];
      this.size0 = this.u24;
      this.size1 = this.u36;
    }
    this.v1 = SpinnerWidget$this.circles[0];
    _setUI(this.v1);
    this.v2 = SpinnerWidget$this.circles[1];
    _setUI(this.v2);
    this.v3 = SpinnerWidget$this.circles[2];
    _setUI(this.v3);
    this.v4 = SpinnerWidget$this.circles[3];
    _setUI(this.v4);
    this.v5 = SpinnerWidget$this.circles[4];
    _setUI(this.v5);
    this.v6 = SpinnerWidget$this.circles[5];
    _setUI(this.v6);
    this.v7 = SpinnerWidget$this.circles[6];
    _setUI(this.v7);
    this.v8 = SpinnerWidget$this.circles[7];
    _setUI(this.v8);
    this.v9 = SpinnerWidget$this.circles[8];
    _setUI(this.v9);
    this.v10 = SpinnerWidget$this.circles[9];
    _setUI(this.v10);
    this.v11 = SpinnerWidget$this.circles[10];
    _setUI(this.v11);
    this.v12 = 100;
    this.v13 = ((50) / 100);
  }
  this.ui_ = null;
  this.setUI_ = function() {
    SpinnerWidget$this.ui_ = new SpinnerWidget$this.UI_();
  }
  this.blocking__Call = null;
  this.angle = 0;
  this.numCircles = 11;
  this.stopped = false;
  {
    let _d0 = this.numCircles;
    this.circles = new Main_$this.QEDArray(new QEDExplicitArray(_d0), (function l(pos, _HandlerFn_) {
      let index = pos[0];
      return (new SpinnerWidget$this.Circle(index, _HandlerFn_));
    }), Main_$this.Qui_, (function Lambda_(_ret) {
    }));
    this.sprite = new Main_$this.Sprite((function Lambda_() {
    }));
    (function while179$_() {
      if (!SpinnerWidget$this.stopped) {
        SpinnerWidget$this.blocking__Call = new SpinnerWidget$this.sprite.Animate((function Lambda_(_ret) {
          SpinnerWidget$this.blocking__Call = null;
          SpinnerWidget$this.angle = _ret / 1000 * 2 * 3.141593;
          while179$_();
        }));
      }
    })();
  }
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
this.NumTacosWidget = function(_HandlerFn_) {
  const NumTacosWidget$this = this;
  this.NumButton = function(num, _HandlerFn_) {
    this.num = num;
    const NumButton$this = this;
    this.showTacos = function(x, y, width, height) {
      Main_$this.displayTacos(x, y, width, height, NumButton$this.num);
    }
    this.UI_ = function() {
      const UI_$this = this;
      this.Layout_ = function() {
        const Layout_$this = this;
        this.paint = function(pos0, pos1, size0$, size1$) {
          _paint(Layout_$this.a1, pos0, pos1, size0$, size1$);
        }
        this.onEvent = function(event, pos0, pos1, size0$, size1$) {
          let flag = false;
          if ((3 & (1 << event)) !== 0) {
            flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$;
            if (flag) {
              flag = _onEvent(Layout_$this.a1, event, pos0, pos1, size0$, size1$);
              if (!flag) {
              }
            }
          }
          return (flag);
        }
        this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
          return (new QEDExplicitArray(0, 0, 0, 0));
        }
        this.a1 = _layout(UI_$this.v1);
        this.u2 = this.a1.size0;
        this.u3 = this.a1.size1;
        this.size0 = this.u2;
        this.size1 = this.u3;
      }
      this.v1 = NumButton$this.button;
      _setUI(this.v1);
    }
    this.ui_ = null;
    this.setUI_ = function() {
      NumButton$this.ui_ = new NumButton$this.UI_();
    }
    this.blocking__Call$ = null;
    this.button = new Main_$this.RectButton((function L(_HandlerFn_) {
      const L$this = this;
      this.UI_ = function() {
        const UI_$this = this;
        this.Layout_ = function() {
          const Layout_$this = this;
          this.paint = function(pos0, pos1, size0$, size1$) {
            {
              let size1$$ = Layout_$this.u12;
              {
                let size1$$ = Layout_$this.l16 - Layout_$this.u12;
                let posDiff1 = Layout_$this.u12;
                let pos1$ = pos1 + posDiff1;
                {
                  let childSize0 = Layout_$this.u8;
                  let posDiff0 = (size0$ - childSize0) * UI_$this.v8;
                  let size0$$ = childSize0;
                  let childSize1 = Layout_$this.u14;
                  let posDiff1$ = (size1$$ - childSize1) * UI_$this.v8;
                  let size1$$$ = childSize1;
                  let pos0$ = pos0 + posDiff0;
                  let pos1$$ = pos1$ + posDiff1$;
                  {
                    Main_$this.pushAttribute(12, UI_$this.v5);
                    let childSize0$ = Layout_$this.u7;
                    let posDiff0$ = (size0$$ - childSize0$) * UI_$this.v4;
                    let size0$$$ = childSize0$;
                    posDiff0$ += UI_$this.v6[0];
                    let childSize1$ = Layout_$this.u13;
                    let posDiff1$$ = (size1$$$ - childSize1$) * UI_$this.v4;
                    let size1$$$$ = childSize1$;
                    posDiff1$$ += UI_$this.v6[1];
                    let pos0$$ = pos0$ + posDiff0$;
                    let pos1$$$ = pos1$$ + posDiff1$$;
                    UI_$this.v2(pos0$$, pos1$$$, size0$$$, size1$$$$);
                    Main_$this.popAttribute(12);
                  }
                }
                {
                  Main_$this.pushAttribute(5, UI_$this.v10);
                  Main_$this.pushAttribute(12, UI_$this.v12);
                  let childSize0 = Layout_$this.u9;
                  let posDiff0 = (size0$ - childSize0) * UI_$this.v11;
                  let size0$$ = childSize0;
                  let childSize1 = Layout_$this.u15;
                  let posDiff1$ = (size1$$ - childSize1) * UI_$this.v11;
                  let size1$$$ = childSize1;
                  let pos0$ = pos0 + posDiff0;
                  let pos1$$ = pos1$ + posDiff1$;
                  Main_$this.displayText(UI_$this.v9, pos0$, pos1$$, size0$$, size1$$$);
                  Main_$this.popAttribute(12);
                  Main_$this.popAttribute(5);
                }
              }
              {
                let size1$$ = Layout_$this.l17 - Layout_$this.l16;
                let posDiff1 = Layout_$this.l16;
                let pos1$ = pos1 + posDiff1;
              }
            }
          }
          this.onEvent = function(event, pos0, pos1, size0$, size1$) {
            let flag = false;
            return (flag);
          }
          this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
            let size1$$ = Layout_$this.u12;
            {
              let size1$$ = Layout_$this.l16 - Layout_$this.u12;
              let posDiff1 = Layout_$this.u12;
              let pos1$ = pos1 + posDiff1;
              {
                let childSize0 = Layout_$this.u8;
                let posDiff0 = (size0$ - childSize0) * UI_$this.v8;
                let size0$$ = childSize0;
                let childSize1 = Layout_$this.u14;
                let posDiff1$ = (size1$$ - childSize1) * UI_$this.v8;
                let size1$$$ = childSize1;
                let pos0$ = pos0 + posDiff0;
                let pos1$$ = pos1$ + posDiff1$;
                {
                  let childSize0$ = Layout_$this.u7;
                  let posDiff0$ = (size0$$ - childSize0$) * UI_$this.v4;
                  let size0$$$ = childSize0$;
                  posDiff0$ += UI_$this.v6[0];
                  let childSize1$ = Layout_$this.u13;
                  let posDiff1$$ = (size1$$$ - childSize1$) * UI_$this.v4;
                  let size1$$$$ = childSize1$;
                  posDiff1$$ += UI_$this.v6[1];
                  let pos0$$ = pos0$ + posDiff0$;
                  let pos1$$$ = pos1$$ + posDiff1$$;
                }
              }
              {
                let childSize0 = Layout_$this.u9;
                let posDiff0 = (size0$ - childSize0) * UI_$this.v11;
                let size0$$ = childSize0;
                let childSize1 = Layout_$this.u15;
                let posDiff1$ = (size1$$ - childSize1) * UI_$this.v11;
                let size1$$$ = childSize1;
                let pos0$ = pos0 + posDiff0;
                let pos1$$ = pos1$ + posDiff1$;
              }
            }
            {
              let size1$$ = Layout_$this.l17 - Layout_$this.l16;
              let posDiff1 = Layout_$this.l16;
              let pos1$ = pos1 + posDiff1;
            }
            return (new QEDExplicitArray(0, 0, 0, 0));
          }
          this.a1 = new QEDExplicitArray(UI_$this.v1, UI_$this.v1);
          this.a2 = new QEDExplicitArray(UI_$this.v3, UI_$this.v3);
          this.a3 = new QEDExplicitArray(UI_$this.v7[0], UI_$this.v7[1]);
          Main_$this.pushAttribute(5, UI_$this.v10);
          this.a4 = Main_$this.getTextSize(UI_$this.v9);
          Main_$this.popAttribute(5);
          this.a5 = new QEDExplicitArray(UI_$this.v13, UI_$this.v13);
          this.u6 = this.a1[0];
          this.u7 = this.a2[0];
          this.u8 = this.a3[0];
          this.u9 = this.a4[0];
          this.l9 = Main_$this.max(this.u8, this.u9);
          this.l10 = Main_$this.max(this.u6, this.l9);
          this.u11 = this.a5[0];
          this.l11 = Main_$this.max(this.l10, this.u11);
          this.u12 = this.a1[1];
          this.u13 = this.a2[1];
          this.u14 = this.a3[1];
          this.u15 = this.a4[1];
          this.l15 = Main_$this.max(this.u14, this.u15);
          this.l16 = this.u12 + this.l15;
          this.u17 = this.a5[1];
          this.l17 = this.l16 + this.u17;
          this.size0 = this.l11;
          this.size1 = this.l17;
        }
        this.v1 = 15;
        this.v2 = NumButton$this.showTacos;
        this.v3 = 70;
        this.v4 = ((50) / 100);
        this.v5 = 13686474;
        this.v6 = new QEDExplicitArray(0, -20);
        this.v7 = new QEDExplicitArray(175, 70);
        this.v8 = ((50) / 100);
        this.v9 = "" + NumButton$this.num;
        this.v10 = 100;
        this.v11 = ((50) / 100);
        this.v12 = Main_$this.COLOR_WHITE;
        this.v13 = 15;
      }
      this.ui_ = null;
      this.setUI_ = function() {
        L$this.ui_ = new L$this.UI_();
      }
      this.blocking__Call$$ = null;
    }), (function Lambda_() {
      {
        Main_$this.post_((function lambda_() {
          _HandlerFn_(NumButton$this.num);
        }));
        return;
      }
    }));
  }
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0$, size1$) {
        {
          let childSize0 = Layout_$this.l8;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v10[0];
          let size0$$ = childSize0;
          let childSize1 = Layout_$this.l12;
          let posDiff1 = (size1$ - childSize1) * UI_$this.v10[1];
          let size1$$ = childSize1;
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
          let size1$$$ = Layout_$this.u9;
          {
            let childSize0$ = Layout_$this.u6;
            let posDiff0$ = (size0$$ - childSize0$) * UI_$this.v3;
            let size0$$$ = childSize0$;
            let size1$$$ = Layout_$this.l10 - Layout_$this.u9;
            let posDiff1$ = Layout_$this.u9;
            let childSize1$ = Layout_$this.u10;
            posDiff1$ += (size1$$$ - childSize1$) * UI_$this.v3;
            size1$$$ = childSize1$;
            let pos0$$ = pos0$ + posDiff0$;
            let pos1$$ = pos1$ + posDiff1$;
            Main_$this.displayText(UI_$this.v2, pos0$$, pos1$$, size0$$$, size1$$$);
          }
          {
            let size1$$$ = Layout_$this.l11 - Layout_$this.l10;
            let posDiff1$ = Layout_$this.l10;
            let pos1$$ = pos1$ + posDiff1$;
          }
          {
            Main_$this.pushAttribute(6, UI_$this.v6);
            Main_$this.pushAttribute(14, UI_$this.v7);
            Main_$this.pushAttribute(5, UI_$this.v8);
            Main_$this.pushAttribute(12, UI_$this.v9);
            let size1$$$ = Layout_$this.l12 - Layout_$this.l11;
            let posDiff1$ = Layout_$this.l11;
            let pos1$$ = pos1$ + posDiff1$;
            _paint(Layout_$this.a4, pos0$, pos1$$, size0$$, size1$$$);
            Main_$this.popAttribute(12);
            Main_$this.popAttribute(5);
            Main_$this.popAttribute(14);
            Main_$this.popAttribute(6);
          }
        }
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        if ((3 & (1 << event)) !== 0) {
          let childSize0 = Layout_$this.l8;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v10[0];
          let size0$$ = childSize0;
          let childSize1 = Layout_$this.l12;
          let posDiff1 = (size1$ - childSize1) * UI_$this.v10[1];
          let size1$$ = childSize1;
          flag = pos0 >= posDiff0 && pos0 < posDiff0 + size0$$ && pos1 >= posDiff1 && pos1 < posDiff1 + size1$$;
          if (flag) {
            pos0 = pos0 - posDiff0;
            pos1 = pos1 - posDiff1;
            if ((3 & (1 << event)) !== 0) {
              let size1$$$ = Layout_$this.l12 - Layout_$this.l11;
              let posDiff1$ = Layout_$this.l11;
              flag = pos0 >= 0 && pos0 < size0$$ && pos1 >= posDiff1$ && pos1 < posDiff1$ + size1$$$;
              if (flag) {
                pos1 = pos1 - posDiff1$;
                flag = _onEvent(Layout_$this.a4, event, pos0, pos1, size0$$, size1$$$);
                if (!flag) {
                }
              }
            }
            if (!flag) {
            }
          }
        }
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        let size1$$ = Layout_$this.u9;
        {
          let childSize0 = Layout_$this.u6;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v3;
          let size0$$ = childSize0;
          let size1$$ = Layout_$this.l10 - Layout_$this.u9;
          let posDiff1 = Layout_$this.u9;
          let childSize1 = Layout_$this.u10;
          posDiff1 += (size1$$ - childSize1) * UI_$this.v3;
          size1$$ = childSize1;
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
        }
        {
          let size1$$ = Layout_$this.l11 - Layout_$this.l10;
          let posDiff1 = Layout_$this.l10;
          let pos1$ = pos1 + posDiff1;
        }
        {
          let size1$$ = Layout_$this.l12 - Layout_$this.l11;
          let posDiff1 = Layout_$this.l11;
          let pos1$ = pos1 + posDiff1;
        }
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = new QEDExplicitArray(UI_$this.v1, UI_$this.v1);
      this.a2 = Main_$this.getTextSize(UI_$this.v2);
      this.a3 = new QEDExplicitArray(UI_$this.v4, UI_$this.v4);
      Main_$this.pushAttribute(6, UI_$this.v6);
      Main_$this.pushAttribute(5, UI_$this.v8);
      this.a4 = new Main_$this.LayoutArray_(UI_$this.v5, Main_$this.calcLayoutObj, Main_$this.getSizeObj, Main_$this.paintLayoutObj, Main_$this.onLayoutEventObj, Main_$this.getElementRectObj);
      Main_$this.popAttribute(5);
      Main_$this.popAttribute(6);
      this.u5 = this.a1[0];
      this.u6 = this.a2[0];
      this.l6 = Main_$this.max(this.u5, this.u6);
      this.u7 = this.a3[0];
      this.l7 = Main_$this.max(this.l6, this.u7);
      this.u8 = this.a4.size0;
      this.l8 = Main_$this.max(this.l7, this.u8);
      this.u9 = this.a1[1];
      this.u10 = this.a2[1];
      this.l10 = this.u9 + this.u10;
      this.u11 = this.a3[1];
      this.l11 = this.l10 + this.u11;
      this.u12 = this.a4.size1;
      this.l12 = this.l11 + this.u12;
      this.size0 = this.l8;
      this.size1 = this.l12;
    }
    this.v1 = 50;
    this.v2 = "How many tacos do you want?";
    this.v3 = ((50) / 100);
    this.v4 = 50;
    this.v5 = NumTacosWidget$this.numTacosButtonArray;
    this.v6 = 15;
    this.v7 = 15;
    this.v8 = 15;
    this.v9 = 11647912;
    Main_$this.pushAttribute(5, this.v8);
    Main_$this.uiArray_(this.v5);
    Main_$this.popAttribute(5);
    this.v10 = new QEDExplicitArray(((50) / 100), 0);
  }
  this.ui_ = null;
  this.setUI_ = function() {
    NumTacosWidget$this.ui_ = new NumTacosWidget$this.UI_();
  }
  this.blocking__Call = null;
  {
    let _d0 = 4;
    this.numTacosButtonArray = new Main_$this.QEDArray(new QEDExplicitArray(_d0), (function l(pos, _HandlerFn_) {
      let index = pos[0];
      return (new NumTacosWidget$this.NumButton(index + 1, _HandlerFn_));
    }), Main_$this.Qui_, (function Lambda_(_ret) {
      {
        Main_$this.post_((function lambda_() {
          _HandlerFn_(_ret._ret);
        }));
        return;
      }
    }));
  }
}
this.RoomNumberWidget = function(_HandlerFn_) {
  const RoomNumberWidget$this = this;
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0$, size1$) {
        {
          let size1$$ = Layout_$this.u18;
          {
            let size1$$ = Layout_$this.l25 - Layout_$this.u18;
            let posDiff1 = Layout_$this.u18;
            let pos1$ = pos1 + posDiff1;
            {
              let exp0 = new QEDExplicitArray(UI_$this.v16, UI_$this.v25);
              exp0[1] = exp0[1] + exp0[0];
              let extraSpace0 = size0$ - Layout_$this.l15;
              if (exp0[1] > 1)
                extraSpace0 = extraSpace0 / exp0[1];
              {
                let size0$$ = Layout_$this.u13;
                size0$$ = size0$$ + extraSpace0 * UI_$this.v16;
                {
                  let childSize0 = Layout_$this.l12;
                  let posDiff0 = (size0$$ - childSize0) * UI_$this.v13[0];
                  let size0$$$ = childSize0;
                  let childSize1 = Layout_$this.l21;
                  let posDiff1$ = (size1$$ - childSize1) * UI_$this.v13[1];
                  let size1$$$ = childSize1;
                  let pos0$ = pos0 + posDiff0;
                  let pos1$$ = pos1$ + posDiff1$;
                  {
                    let childSize0$ = Layout_$this.u10;
                    let posDiff0$ = (size0$$$ - childSize0$) * UI_$this.v3;
                    let size0$$$$ = childSize0$;
                    let size1$$$$ = Layout_$this.u19;
                    let childSize1$ = Layout_$this.u19;
                    let posDiff1$$ = (size1$$$$ - childSize1$) * UI_$this.v3;
                    size1$$$$ = childSize1$;
                    let pos0$$ = pos0$ + posDiff0$;
                    let pos1$$$ = pos1$$ + posDiff1$$;
                    Main_$this.displayText(UI_$this.v2, pos0$$, pos1$$$, size0$$$$, size1$$$$);
                  }
                  {
                    Main_$this.pushAttribute(12, UI_$this.v10);
                    Main_$this.pushAttribute(14, UI_$this.v11);
                    let childSize0$ = Layout_$this.u12;
                    let posDiff0$ = (size0$$$ - childSize0$) * UI_$this.v12;
                    let size0$$$$ = childSize0$;
                    let size1$$$$ = Layout_$this.l21 - Layout_$this.u19;
                    let posDiff1$$ = Layout_$this.u19;
                    let childSize1$ = Layout_$this.u21;
                    posDiff1$$ += (size1$$$$ - childSize1$) * UI_$this.v12;
                    size1$$$$ = childSize1$;
                    let pos0$$ = pos0$ + posDiff0$;
                    let pos1$$$ = pos1$$ + posDiff1$$;
                    UI_$this.v8(pos0$$, pos1$$$, size0$$$$, size1$$$$);
                    Main_$this.saveContext();
                    {
                      Main_$this.pushAttribute(5, UI_$this.v5);
                      Main_$this.pushAttribute(12, UI_$this.v6);
                      let childSize0$$ = Layout_$this.u11;
                      let posDiff0$$ = (size0$$$$ - childSize0$$) * UI_$this.v7;
                      let size0$$$$$ = childSize0$$;
                      let childSize1$$ = Layout_$this.u20;
                      let posDiff1$$$ = (size1$$$$ - childSize1$$) * UI_$this.v7;
                      let size1$$$$$ = childSize1$$;
                      let pos0$$$ = pos0$$ + posDiff0$$;
                      let pos1$$$$ = pos1$$$ + posDiff1$$$;
                      Main_$this.displayText(UI_$this.v4, pos0$$$, pos1$$$$, size0$$$$$, size1$$$$$);
                      Main_$this.popAttribute(12);
                      Main_$this.popAttribute(5);
                    }
                    Main_$this.restoreContext();
                    Main_$this.popAttribute(14);
                    Main_$this.popAttribute(12);
                  }
                }
              }
              {
                let size0$$ = Layout_$this.l15 - Layout_$this.u13;
                let posDiff0 = Layout_$this.u13;
                size0$$ = size0$$ + extraSpace0 * UI_$this.v25;
                posDiff0 += exp0[0] * extraSpace0;
                let pos0$ = pos0 + posDiff0;
                {
                  Main_$this.pushAttribute(5, UI_$this.v18);
                  Main_$this.pushAttribute(6, UI_$this.v19);
                  Main_$this.pushAttribute(14, UI_$this.v20);
                  Main_$this.pushAttribute(12, UI_$this.v21);
                  let childSize0 = Layout_$this.u14;
                  let posDiff0$ = (size0$$ - childSize0) * UI_$this.v22;
                  let size0$$$ = childSize0;
                  let childSize1 = Layout_$this.u23;
                  let posDiff1$ = (size1$$ - childSize1) * UI_$this.v22;
                  let size1$$$ = childSize1;
                  let pos0$$ = pos0$ + posDiff0$;
                  let pos1$$ = pos1$ + posDiff1$;
                  _paint(Layout_$this.a6, pos0$$, pos1$$, size0$$$, size1$$$);
                  Main_$this.popAttribute(12);
                  Main_$this.popAttribute(14);
                  Main_$this.popAttribute(6);
                  Main_$this.popAttribute(5);
                }
              }
            }
          }
        }
        {
          Main_$this.pushAttribute(5, UI_$this.v27);
          Main_$this.pushAttribute(12, UI_$this.v28);
          let childSize0 = Layout_$this.u17;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v29;
          let size0$$ = childSize0;
          posDiff0 += UI_$this.v30;
          let childSize1 = Layout_$this.u26;
          let posDiff1 = (size1$ - childSize1) * UI_$this.v29;
          let size1$$ = childSize1;
          posDiff1 += UI_$this.v30;
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
          _paint(Layout_$this.a8, pos0$, pos1$, size0$$, size1$$);
          Main_$this.popAttribute(12);
          Main_$this.popAttribute(5);
        }
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        if ((3 & (1 << event)) !== 0) {
          let childSize0 = Layout_$this.u17;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v29;
          let size0$$ = childSize0;
          posDiff0 += UI_$this.v30;
          let childSize1 = Layout_$this.u26;
          let posDiff1 = (size1$ - childSize1) * UI_$this.v29;
          let size1$$ = childSize1;
          posDiff1 += UI_$this.v30;
          flag = pos0 >= posDiff0 && pos0 < posDiff0 + size0$$ && pos1 >= posDiff1 && pos1 < posDiff1 + size1$$;
          if (flag) {
            pos0 = pos0 - posDiff0;
            pos1 = pos1 - posDiff1;
            flag = _onEvent(Layout_$this.a8, event, pos0, pos1, size0$$, size1$$);
            if (!flag) {
            }
          }
        }
        if (!flag) {
          if ((3 & (1 << event)) !== 0) {
            flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$;
            if (flag) {
              if ((3 & (1 << event)) !== 0) {
                let size1$$ = Layout_$this.l25 - Layout_$this.u18;
                let posDiff1 = Layout_$this.u18;
                flag = pos0 >= 0 && pos0 < size0$ && pos1 >= posDiff1 && pos1 < posDiff1 + size1$$;
                if (flag) {
                  pos1 = pos1 - posDiff1;
                  {
                    let exp0 = new QEDExplicitArray(UI_$this.v16, UI_$this.v25);
                    exp0[1] = exp0[1] + exp0[0];
                    let extraSpace0 = size0$ - Layout_$this.l15;
                    if (exp0[1] > 1)
                      extraSpace0 = extraSpace0 / exp0[1];
                    if ((3 & (1 << event)) !== 0) {
                      let size0$$ = Layout_$this.l15 - Layout_$this.u13;
                      let posDiff0 = Layout_$this.u13;
                      size0$$ = size0$$ + extraSpace0 * UI_$this.v25;
                      posDiff0 += exp0[0] * extraSpace0;
                      flag = pos0 >= posDiff0 && pos0 < posDiff0 + size0$$ && pos1 >= 0 && pos1 < size1$$;
                      if (flag) {
                        pos0 = pos0 - posDiff0;
                        if ((3 & (1 << event)) !== 0) {
                          let childSize0 = Layout_$this.u14;
                          let posDiff0$ = (size0$$ - childSize0) * UI_$this.v22;
                          let size0$$$ = childSize0;
                          let childSize1 = Layout_$this.u23;
                          let posDiff1$ = (size1$$ - childSize1) * UI_$this.v22;
                          let size1$$$ = childSize1;
                          flag = pos0 >= posDiff0$ && pos0 < posDiff0$ + size0$$$ && pos1 >= posDiff1$ && pos1 < posDiff1$ + size1$$$;
                          if (flag) {
                            pos0 = pos0 - posDiff0$;
                            pos1 = pos1 - posDiff1$;
                            flag = _onEvent(Layout_$this.a6, event, pos0, pos1, size0$$$, size1$$$);
                            if (!flag) {
                            }
                          }
                        }
                      }
                    }
                    if (!flag) {
                    }
                  }
                }
              }
              if (!flag) {
              }
            }
          }
        }
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        let size1$$ = Layout_$this.u18;
        {
          let size1$$ = Layout_$this.l25 - Layout_$this.u18;
          let posDiff1 = Layout_$this.u18;
          let pos1$ = pos1 + posDiff1;
          {
            let exp0 = new QEDExplicitArray(UI_$this.v16, UI_$this.v25);
            exp0[1] = exp0[1] + exp0[0];
            let extraSpace0 = size0$ - Layout_$this.l15;
            if (exp0[1] > 1)
              extraSpace0 = extraSpace0 / exp0[1];
            {
              let size0$$ = Layout_$this.u13;
              size0$$ = size0$$ + extraSpace0 * UI_$this.v16;
              {
                let childSize0 = Layout_$this.l12;
                let posDiff0 = (size0$$ - childSize0) * UI_$this.v13[0];
                let size0$$$ = childSize0;
                let childSize1 = Layout_$this.l21;
                let posDiff1$ = (size1$$ - childSize1) * UI_$this.v13[1];
                let size1$$$ = childSize1;
                let pos0$ = pos0 + posDiff0;
                let pos1$$ = pos1$ + posDiff1$;
                {
                  let childSize0$ = Layout_$this.u10;
                  let posDiff0$ = (size0$$$ - childSize0$) * UI_$this.v3;
                  let size0$$$$ = childSize0$;
                  let size1$$$$ = Layout_$this.u19;
                  let childSize1$ = Layout_$this.u19;
                  let posDiff1$$ = (size1$$$$ - childSize1$) * UI_$this.v3;
                  size1$$$$ = childSize1$;
                  let pos0$$ = pos0$ + posDiff0$;
                  let pos1$$$ = pos1$$ + posDiff1$$;
                }
                {
                  let childSize0$ = Layout_$this.u12;
                  let posDiff0$ = (size0$$$ - childSize0$) * UI_$this.v12;
                  let size0$$$$ = childSize0$;
                  let size1$$$$ = Layout_$this.l21 - Layout_$this.u19;
                  let posDiff1$$ = Layout_$this.u19;
                  let childSize1$ = Layout_$this.u21;
                  posDiff1$$ += (size1$$$$ - childSize1$) * UI_$this.v12;
                  size1$$$$ = childSize1$;
                  let pos0$$ = pos0$ + posDiff0$;
                  let pos1$$$ = pos1$$ + posDiff1$$;
                  {
                    let childSize0$$ = Layout_$this.u11;
                    let posDiff0$$ = (size0$$$$ - childSize0$$) * UI_$this.v7;
                    let size0$$$$$ = childSize0$$;
                    let childSize1$$ = Layout_$this.u20;
                    let posDiff1$$$ = (size1$$$$ - childSize1$$) * UI_$this.v7;
                    let size1$$$$$ = childSize1$$;
                    let pos0$$$ = pos0$$ + posDiff0$$;
                    let pos1$$$$ = pos1$$$ + posDiff1$$$;
                  }
                }
              }
            }
            {
              let size0$$ = Layout_$this.l15 - Layout_$this.u13;
              let posDiff0 = Layout_$this.u13;
              size0$$ = size0$$ + extraSpace0 * UI_$this.v25;
              posDiff0 += exp0[0] * extraSpace0;
              let pos0$ = pos0 + posDiff0;
              {
                let childSize0 = Layout_$this.u14;
                let posDiff0$ = (size0$$ - childSize0) * UI_$this.v22;
                let size0$$$ = childSize0;
                let childSize1 = Layout_$this.u23;
                let posDiff1$ = (size1$$ - childSize1) * UI_$this.v22;
                let size1$$$ = childSize1;
                let pos0$$ = pos0$ + posDiff0$;
                let pos1$$ = pos1$ + posDiff1$;
              }
            }
          }
        }
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = new QEDExplicitArray(UI_$this.v1, UI_$this.v1);
      this.a2 = Main_$this.getTextSize(UI_$this.v2);
      Main_$this.pushAttribute(5, UI_$this.v5);
      this.a3 = Main_$this.getTextSize(UI_$this.v4);
      Main_$this.popAttribute(5);
      this.a4 = new QEDExplicitArray(UI_$this.v9[0], UI_$this.v9[1]);
      this.a5 = new QEDExplicitArray(UI_$this.v15[0], UI_$this.v15[1]);
      Main_$this.pushAttribute(5, UI_$this.v18);
      Main_$this.pushAttribute(6, UI_$this.v19);
      this.a6 = _layout(UI_$this.v17);
      Main_$this.popAttribute(6);
      Main_$this.popAttribute(5);
      this.a7 = new QEDExplicitArray(UI_$this.v24[0], UI_$this.v24[1]);
      Main_$this.pushAttribute(5, UI_$this.v27);
      this.a8 = _layout(UI_$this.v26);
      Main_$this.popAttribute(5);
      this.u9 = this.a1[0];
      this.u10 = this.a2[0];
      this.u11 = this.a3[0];
      this.u12 = this.a4[0];
      this.l12 = Main_$this.max(this.u10, this.u12);
      this.u13 = this.a5[0];
      this.u14 = this.a6.size0;
      this.u15 = this.a7[0];
      this.l15 = this.u13 + this.u15;
      this.l16 = Main_$this.max(this.u9, this.l15);
      this.u17 = this.a8.size0;
      this.l17 = Main_$this.max(this.l16, this.u17);
      this.u18 = this.a1[1];
      this.u19 = this.a2[1];
      this.u20 = this.a3[1];
      this.u21 = this.a4[1];
      this.l21 = this.u19 + this.u21;
      this.u22 = this.a5[1];
      this.u23 = this.a6.size1;
      this.u24 = this.a7[1];
      this.l24 = Main_$this.max(this.u22, this.u24);
      this.l25 = this.u18 + this.l24;
      this.u26 = this.a8.size1;
      this.l26 = Main_$this.max(this.l25, this.u26);
      this.size0 = this.l17;
      this.size1 = this.l26;
    }
    this.v1 = 25;
    this.v2 = "Type your room number";
    this.v3 = ((50) / 100);
    this.v4 = RoomNumberWidget$this.phoneNumber;
    this.v5 = 30;
    this.v6 = 5788508;
    this.v7 = ((50) / 100);
    this.v8 = Main_$this.roundRect;
    this.v9 = new QEDExplicitArray(300, 40);
    this.v10 = 14537191;
    this.v11 = 20;
    this.v12 = ((0) / 100);
    this.v13 = new QEDExplicitArray(((50) / 100), ((0) / 100));
    this.v14 = ((100) / 100);
    this.v15 = new QEDExplicitArray(400, 300);
    this.v16 = ((100) / 100);
    this.v17 = RoomNumberWidget$this.numericKeyboard;
    this.v18 = 40;
    this.v19 = 10;
    this.v20 = 20;
    this.v21 = 11243204;
    this.v22 = ((0) / 100);
    this.v23 = ((100) / 100);
    Main_$this.pushAttribute(5, this.v18);
    _setUI(this.v17);
    Main_$this.popAttribute(5);
    this.v24 = new QEDExplicitArray(400, 300);
    this.v25 = ((100) / 100);
    this.v26 = RoomNumberWidget$this.nextButton;
    this.v27 = 25;
    this.v28 = 10012308;
    this.v29 = ((100) / 100);
    this.v30 = -25;
    Main_$this.pushAttribute(5, this.v27);
    _setUI(this.v26);
    Main_$this.popAttribute(5);
  }
  this.ui_ = null;
  this.setUI_ = function() {
    RoomNumberWidget$this.ui_ = new RoomNumberWidget$this.UI_();
  }
  this.blocking__Call = null;
  this.phoneNumber = "";
  this.numericKeyboard = new Main_$this.NumericKeyboardWidget((function Lambda_(_ret) {
    (RoomNumberWidget$this.phoneNumber = _ret)
  }));
  this.nextButton = new Main_$this.LargerButton("Next", (function Lambda_(_ret) {
    {
      Main_$this.post_((function lambda_() {
        _HandlerFn_(RoomNumberWidget$this.phoneNumber);
      }));
      return;
    }
  }));
}
this.GuestNameWidget = function(_HandlerFn_) {
  const GuestNameWidget$this = this;
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0$, size1$) {
        {
          let size1$$ = Layout_$this.u13;
          {
            Main_$this.pushAttribute(12, UI_$this.v8);
            Main_$this.pushAttribute(14, UI_$this.v9);
            let childSize0 = Layout_$this.u9;
            let posDiff0 = (size0$ - childSize0) * UI_$this.v10;
            let size0$$ = childSize0;
            let size1$$ = Layout_$this.l15 - Layout_$this.u13;
            let posDiff1 = Layout_$this.u13;
            let childSize1 = Layout_$this.u15;
            posDiff1 += (size1$$ - childSize1) * UI_$this.v10;
            size1$$ = childSize1;
            let pos0$ = pos0 + posDiff0;
            let pos1$ = pos1 + posDiff1;
            UI_$this.v6(pos0$, pos1$, size0$$, size1$$);
            Main_$this.saveContext();
            {
              Main_$this.pushAttribute(5, UI_$this.v3);
              Main_$this.pushAttribute(12, UI_$this.v4);
              let childSize0$ = Layout_$this.u8;
              let posDiff0$ = (size0$$ - childSize0$) * UI_$this.v5;
              let size0$$$ = childSize0$;
              let childSize1$ = Layout_$this.u14;
              let posDiff1$ = (size1$$ - childSize1$) * UI_$this.v5;
              let size1$$$ = childSize1$;
              let pos0$$ = pos0$ + posDiff0$;
              let pos1$$ = pos1$ + posDiff1$;
              Main_$this.displayText(UI_$this.v2, pos0$$, pos1$$, size0$$$, size1$$$);
              Main_$this.popAttribute(12);
              Main_$this.popAttribute(5);
            }
            Main_$this.restoreContext();
            Main_$this.popAttribute(14);
            Main_$this.popAttribute(12);
          }
          {
            let size1$$ = Layout_$this.l16 - Layout_$this.l15;
            let posDiff1 = Layout_$this.l15;
            let pos1$ = pos1 + posDiff1;
          }
          {
            Main_$this.pushAttribute(5, UI_$this.v13);
            Main_$this.pushAttribute(6, UI_$this.v14);
            Main_$this.pushAttribute(14, UI_$this.v15);
            Main_$this.pushAttribute(12, UI_$this.v16);
            let size1$$ = Layout_$this.l17 - Layout_$this.l16;
            let posDiff1 = Layout_$this.l16;
            let pos1$ = pos1 + posDiff1;
            _paint(Layout_$this.a5, pos0, pos1$, size0$, size1$$);
            Main_$this.popAttribute(12);
            Main_$this.popAttribute(14);
            Main_$this.popAttribute(6);
            Main_$this.popAttribute(5);
          }
        }
        {
          Main_$this.pushAttribute(5, UI_$this.v18);
          Main_$this.pushAttribute(12, UI_$this.v19);
          let childSize0 = Layout_$this.u12;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v20;
          let size0$$ = childSize0;
          posDiff0 += UI_$this.v21;
          let childSize1 = Layout_$this.u18;
          let posDiff1 = (size1$ - childSize1) * UI_$this.v20;
          let size1$$ = childSize1;
          posDiff1 += UI_$this.v21;
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
          _paint(Layout_$this.a6, pos0$, pos1$, size0$$, size1$$);
          Main_$this.popAttribute(12);
          Main_$this.popAttribute(5);
        }
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        if ((3 & (1 << event)) !== 0) {
          let childSize0 = Layout_$this.u12;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v20;
          let size0$$ = childSize0;
          posDiff0 += UI_$this.v21;
          let childSize1 = Layout_$this.u18;
          let posDiff1 = (size1$ - childSize1) * UI_$this.v20;
          let size1$$ = childSize1;
          posDiff1 += UI_$this.v21;
          flag = pos0 >= posDiff0 && pos0 < posDiff0 + size0$$ && pos1 >= posDiff1 && pos1 < posDiff1 + size1$$;
          if (flag) {
            pos0 = pos0 - posDiff0;
            pos1 = pos1 - posDiff1;
            flag = _onEvent(Layout_$this.a6, event, pos0, pos1, size0$$, size1$$);
            if (!flag) {
            }
          }
        }
        if (!flag) {
          if ((3 & (1 << event)) !== 0) {
            flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$;
            if (flag) {
              if ((3 & (1 << event)) !== 0) {
                let size1$$ = Layout_$this.l17 - Layout_$this.l16;
                let posDiff1 = Layout_$this.l16;
                flag = pos0 >= 0 && pos0 < size0$ && pos1 >= posDiff1 && pos1 < posDiff1 + size1$$;
                if (flag) {
                  pos1 = pos1 - posDiff1;
                  flag = _onEvent(Layout_$this.a5, event, pos0, pos1, size0$, size1$$);
                  if (!flag) {
                  }
                }
              }
              if (!flag) {
              }
            }
          }
        }
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        let size1$$ = Layout_$this.u13;
        {
          let childSize0 = Layout_$this.u9;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v10;
          let size0$$ = childSize0;
          let size1$$ = Layout_$this.l15 - Layout_$this.u13;
          let posDiff1 = Layout_$this.u13;
          let childSize1 = Layout_$this.u15;
          posDiff1 += (size1$$ - childSize1) * UI_$this.v10;
          size1$$ = childSize1;
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
          {
            let childSize0$ = Layout_$this.u8;
            let posDiff0$ = (size0$$ - childSize0$) * UI_$this.v5;
            let size0$$$ = childSize0$;
            let childSize1$ = Layout_$this.u14;
            let posDiff1$ = (size1$$ - childSize1$) * UI_$this.v5;
            let size1$$$ = childSize1$;
            let pos0$$ = pos0$ + posDiff0$;
            let pos1$$ = pos1$ + posDiff1$;
          }
        }
        {
          let size1$$ = Layout_$this.l16 - Layout_$this.l15;
          let posDiff1 = Layout_$this.l15;
          let pos1$ = pos1 + posDiff1;
        }
        {
          let size1$$ = Layout_$this.l17 - Layout_$this.l16;
          let posDiff1 = Layout_$this.l16;
          let pos1$ = pos1 + posDiff1;
        }
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = new QEDExplicitArray(UI_$this.v1, UI_$this.v1);
      Main_$this.pushAttribute(5, UI_$this.v3);
      this.a2 = Main_$this.getTextSize(UI_$this.v2);
      Main_$this.popAttribute(5);
      this.a3 = new QEDExplicitArray(UI_$this.v7[0], UI_$this.v7[1]);
      this.a4 = new QEDExplicitArray(UI_$this.v11, UI_$this.v11);
      Main_$this.pushAttribute(5, UI_$this.v13);
      Main_$this.pushAttribute(6, UI_$this.v14);
      this.a5 = _layout(UI_$this.v12);
      Main_$this.popAttribute(6);
      Main_$this.popAttribute(5);
      Main_$this.pushAttribute(5, UI_$this.v18);
      this.a6 = _layout(UI_$this.v17);
      Main_$this.popAttribute(5);
      this.u7 = this.a1[0];
      this.u8 = this.a2[0];
      this.u9 = this.a3[0];
      this.l9 = Main_$this.max(this.u7, this.u9);
      this.u10 = this.a4[0];
      this.l10 = Main_$this.max(this.l9, this.u10);
      this.u11 = this.a5.size0;
      this.l11 = Main_$this.max(this.l10, this.u11);
      this.u12 = this.a6.size0;
      this.l12 = Main_$this.max(this.l11, this.u12);
      this.u13 = this.a1[1];
      this.u14 = this.a2[1];
      this.u15 = this.a3[1];
      this.l15 = this.u13 + this.u15;
      this.u16 = this.a4[1];
      this.l16 = this.l15 + this.u16;
      this.u17 = this.a5.size1;
      this.l17 = this.l16 + this.u17;
      this.u18 = this.a6.size1;
      this.l18 = Main_$this.max(this.l17, this.u18);
      this.size0 = this.l12;
      this.size1 = this.l18;
    }
    this.v1 = 25;
    this.v2 = GuestNameWidget$this.zipCode.length ? GuestNameWidget$this.zipCode : "Enter the family guest name";
    this.v3 = 30;
    this.v4 = 8229039;
    this.v5 = ((50) / 100);
    this.v6 = Main_$this.roundRect;
    this.v7 = new QEDExplicitArray(400, 40);
    this.v8 = 11849722;
    this.v9 = 20;
    this.v10 = ((50) / 100);
    this.v11 = 25;
    this.v12 = GuestNameWidget$this.alphaKeyboard;
    this.v13 = 30;
    this.v14 = 10;
    this.v15 = 6;
    this.v16 = 8229039;
    Main_$this.pushAttribute(5, this.v13);
    _setUI(this.v12);
    Main_$this.popAttribute(5);
    this.v17 = GuestNameWidget$this.nextButton;
    this.v18 = 25;
    this.v19 = 10012308;
    this.v20 = ((100) / 100);
    this.v21 = -25;
    Main_$this.pushAttribute(5, this.v18);
    _setUI(this.v17);
    Main_$this.popAttribute(5);
  }
  this.ui_ = null;
  this.setUI_ = function() {
    GuestNameWidget$this.ui_ = new GuestNameWidget$this.UI_();
  }
  this.blocking__Call = null;
  this.zipCode = "";
  this.alphaKeyboard = new Main_$this.AlphaKeyboardWidget((function Lambda_(_ret) {
    (GuestNameWidget$this.zipCode = _ret)
  }));
  this.nextButton = new Main_$this.LargerButton("Next", (function Lambda_(_ret) {
    {
      Main_$this.post_((function lambda_() {
        _HandlerFn_(GuestNameWidget$this.zipCode);
      }));
      return;
    }
  }));
}
this.Widget = function(_HandlerFn_) {
  const Widget$this = this;
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      this.paint = function(pos0, pos1, size0$, size1$) {
        Main_$this.displayText(UI_$this.v1, pos0, pos1, size0$, size1$);
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = Main_$this.getTextSize(UI_$this.v1);
      this.u2 = this.a1[0];
      this.u3 = this.a1[1];
      this.size0 = this.u2;
      this.size1 = this.u3;
    }
    this.v1 = "";
  }
  this.ui_ = null;
  this.setUI_ = function() {
    Widget$this.ui_ = new Widget$this.UI_();
  }
  this.blocking__Call = null;
}
this.TransactionEntry = function(_HandlerFn_) {
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
this.SummaryWidget = function(entry, _HandlerFn_) {
  this.entry = entry;
  const SummaryWidget$this = this;
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0$, size1$) {
        {
          Main_$this.pushAttribute(5, UI_$this.v23);
          Main_$this.pushAttribute(12, UI_$this.v24);
          let childSize0 = Layout_$this.l22;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v22;
          let size0$$ = childSize0;
          let childSize1 = Layout_$this.l34;
          let posDiff1 = (size1$ - childSize1) * UI_$this.v22;
          let size1$$ = childSize1;
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
          {
            let size0$$$ = Layout_$this.l16;
            {
              Main_$this.pushAttribute(12, UI_$this.v3);
              UI_$this.v1(pos0$, pos1$, size0$$$, size1$$);
              Main_$this.popAttribute(12);
            }
            {
              {
                let size1$$$ = Layout_$this.u24;
                Main_$this.displayText(UI_$this.v4, pos0$, pos1$, size0$$$, size1$$$);
              }
              {
                let size1$$$ = Layout_$this.l25 - Layout_$this.u24;
                let posDiff1$ = Layout_$this.u24;
                let pos1$$ = pos1$ + posDiff1$;
                Main_$this.displayText(UI_$this.v5, pos0$, pos1$$, size0$$$, size1$$$);
              }
              {
                let size1$$$ = Layout_$this.l26 - Layout_$this.l25;
                let posDiff1$ = Layout_$this.l25;
                let pos1$$ = pos1$ + posDiff1$;
                Main_$this.displayText(UI_$this.v6, pos0$, pos1$$, size0$$$, size1$$$);
              }
              {
                let size1$$$ = Layout_$this.l27 - Layout_$this.l26;
                let posDiff1$ = Layout_$this.l26;
                let pos1$$ = pos1$ + posDiff1$;
                Main_$this.displayText(UI_$this.v7, pos0$, pos1$$, size0$$$, size1$$$);
              }
              {
                let size1$$$ = Layout_$this.l28 - Layout_$this.l27;
                let posDiff1$ = Layout_$this.l27;
                let pos1$$ = pos1$ + posDiff1$;
                Main_$this.displayText(UI_$this.v8, pos0$, pos1$$, size0$$$, size1$$$);
              }
            }
          }
          {
            let size0$$$ = Layout_$this.l22 - Layout_$this.l16;
            let posDiff0$ = Layout_$this.l16;
            let pos0$$ = pos0$ + posDiff0$;
            {
              Main_$this.pushAttribute(12, UI_$this.v11);
              UI_$this.v9(pos0$$, pos1$, size0$$$, size1$$);
              Main_$this.popAttribute(12);
            }
            {
              {
                let childSize0$ = Layout_$this.u17;
                let posDiff0$$ = (size0$$$ - childSize0$) * UI_$this.v13;
                let size0$$$$ = childSize0$;
                let size1$$$ = Layout_$this.u29;
                let childSize1$ = Layout_$this.u29;
                let posDiff1$ = (size1$$$ - childSize1$) * UI_$this.v13;
                size1$$$ = childSize1$;
                let pos0$$$ = pos0$$ + posDiff0$$;
                let pos1$$ = pos1$ + posDiff1$;
                Main_$this.displayText(UI_$this.v12, pos0$$$, pos1$$, size0$$$$, size1$$$);
              }
              {
                let childSize0$ = Layout_$this.u18;
                let posDiff0$$ = (size0$$$ - childSize0$) * UI_$this.v15;
                let size0$$$$ = childSize0$;
                let size1$$$ = Layout_$this.l30 - Layout_$this.u29;
                let posDiff1$ = Layout_$this.u29;
                let childSize1$ = Layout_$this.u30;
                posDiff1$ += (size1$$$ - childSize1$) * UI_$this.v15;
                size1$$$ = childSize1$;
                let pos0$$$ = pos0$$ + posDiff0$$;
                let pos1$$ = pos1$ + posDiff1$;
                Main_$this.displayText(UI_$this.v14, pos0$$$, pos1$$, size0$$$$, size1$$$);
              }
              {
                let childSize0$ = Layout_$this.u19;
                let posDiff0$$ = (size0$$$ - childSize0$) * UI_$this.v17;
                let size0$$$$ = childSize0$;
                let size1$$$ = Layout_$this.l31 - Layout_$this.l30;
                let posDiff1$ = Layout_$this.l30;
                let childSize1$ = Layout_$this.u31;
                posDiff1$ += (size1$$$ - childSize1$) * UI_$this.v17;
                size1$$$ = childSize1$;
                let pos0$$$ = pos0$$ + posDiff0$$;
                let pos1$$ = pos1$ + posDiff1$;
                Main_$this.displayText(UI_$this.v16, pos0$$$, pos1$$, size0$$$$, size1$$$);
              }
              {
                let childSize0$ = Layout_$this.u20;
                let posDiff0$$ = (size0$$$ - childSize0$) * UI_$this.v19;
                let size0$$$$ = childSize0$;
                let size1$$$ = Layout_$this.l32 - Layout_$this.l31;
                let posDiff1$ = Layout_$this.l31;
                let childSize1$ = Layout_$this.u32;
                posDiff1$ += (size1$$$ - childSize1$) * UI_$this.v19;
                size1$$$ = childSize1$;
                let pos0$$$ = pos0$$ + posDiff0$$;
                let pos1$$ = pos1$ + posDiff1$;
                Main_$this.displayText(UI_$this.v18, pos0$$$, pos1$$, size0$$$$, size1$$$);
              }
              {
                let childSize0$ = Layout_$this.u21;
                let posDiff0$$ = (size0$$$ - childSize0$) * UI_$this.v21;
                let size0$$$$ = childSize0$;
                let size1$$$ = Layout_$this.l33 - Layout_$this.l32;
                let posDiff1$ = Layout_$this.l32;
                let childSize1$ = Layout_$this.u33;
                posDiff1$ += (size1$$$ - childSize1$) * UI_$this.v21;
                size1$$$ = childSize1$;
                let pos0$$$ = pos0$$ + posDiff0$$;
                let pos1$$ = pos1$ + posDiff1$;
                Main_$this.displayText(UI_$this.v20, pos0$$$, pos1$$, size0$$$$, size1$$$);
              }
            }
          }
          Main_$this.popAttribute(12);
          Main_$this.popAttribute(5);
        }
        {
          Main_$this.pushAttribute(5, UI_$this.v26);
          Main_$this.pushAttribute(12, UI_$this.v27);
          let childSize0 = Layout_$this.u23;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v28;
          let size0$$ = childSize0;
          posDiff0 += UI_$this.v29[0];
          let childSize1 = Layout_$this.u35;
          let posDiff1 = (size1$ - childSize1) * UI_$this.v28;
          let size1$$ = childSize1;
          posDiff1 += UI_$this.v29[1];
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
          _paint(Layout_$this.a11, pos0$, pos1$, size0$$, size1$$);
          Main_$this.popAttribute(12);
          Main_$this.popAttribute(5);
        }
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        if ((3 & (1 << event)) !== 0) {
          let childSize0 = Layout_$this.u23;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v28;
          let size0$$ = childSize0;
          posDiff0 += UI_$this.v29[0];
          let childSize1 = Layout_$this.u35;
          let posDiff1 = (size1$ - childSize1) * UI_$this.v28;
          let size1$$ = childSize1;
          posDiff1 += UI_$this.v29[1];
          flag = pos0 >= posDiff0 && pos0 < posDiff0 + size0$$ && pos1 >= posDiff1 && pos1 < posDiff1 + size1$$;
          if (flag) {
            pos0 = pos0 - posDiff0;
            pos1 = pos1 - posDiff1;
            flag = _onEvent(Layout_$this.a11, event, pos0, pos1, size0$$, size1$$);
            if (!flag) {
            }
          }
        }
        if (!flag) {
        }
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        {
          let size0$$ = Layout_$this.l16;
          {
          }
          {
            let size1$$ = Layout_$this.u24;
            {
              let size1$$ = Layout_$this.l25 - Layout_$this.u24;
              let posDiff1 = Layout_$this.u24;
              let pos1$ = pos1 + posDiff1;
            }
            {
              let size1$$ = Layout_$this.l26 - Layout_$this.l25;
              let posDiff1 = Layout_$this.l25;
              let pos1$ = pos1 + posDiff1;
            }
            {
              let size1$$ = Layout_$this.l27 - Layout_$this.l26;
              let posDiff1 = Layout_$this.l26;
              let pos1$ = pos1 + posDiff1;
            }
            {
              let size1$$ = Layout_$this.l28 - Layout_$this.l27;
              let posDiff1 = Layout_$this.l27;
              let pos1$ = pos1 + posDiff1;
            }
          }
        }
        {
          let size0$$ = Layout_$this.l22 - Layout_$this.l16;
          let posDiff0 = Layout_$this.l16;
          let pos0$ = pos0 + posDiff0;
          {
          }
          {
            {
              let childSize0 = Layout_$this.u17;
              let posDiff0$ = (size0$$ - childSize0) * UI_$this.v13;
              let size0$$$ = childSize0;
              let size1$$ = Layout_$this.u29;
              let childSize1 = Layout_$this.u29;
              let posDiff1 = (size1$$ - childSize1) * UI_$this.v13;
              size1$$ = childSize1;
              let pos0$$ = pos0$ + posDiff0$;
              let pos1$ = pos1 + posDiff1;
            }
            {
              let childSize0 = Layout_$this.u18;
              let posDiff0$ = (size0$$ - childSize0) * UI_$this.v15;
              let size0$$$ = childSize0;
              let size1$$ = Layout_$this.l30 - Layout_$this.u29;
              let posDiff1 = Layout_$this.u29;
              let childSize1 = Layout_$this.u30;
              posDiff1 += (size1$$ - childSize1) * UI_$this.v15;
              size1$$ = childSize1;
              let pos0$$ = pos0$ + posDiff0$;
              let pos1$ = pos1 + posDiff1;
            }
            {
              let childSize0 = Layout_$this.u19;
              let posDiff0$ = (size0$$ - childSize0) * UI_$this.v17;
              let size0$$$ = childSize0;
              let size1$$ = Layout_$this.l31 - Layout_$this.l30;
              let posDiff1 = Layout_$this.l30;
              let childSize1 = Layout_$this.u31;
              posDiff1 += (size1$$ - childSize1) * UI_$this.v17;
              size1$$ = childSize1;
              let pos0$$ = pos0$ + posDiff0$;
              let pos1$ = pos1 + posDiff1;
            }
            {
              let childSize0 = Layout_$this.u20;
              let posDiff0$ = (size0$$ - childSize0) * UI_$this.v19;
              let size0$$$ = childSize0;
              let size1$$ = Layout_$this.l32 - Layout_$this.l31;
              let posDiff1 = Layout_$this.l31;
              let childSize1 = Layout_$this.u32;
              posDiff1 += (size1$$ - childSize1) * UI_$this.v19;
              size1$$ = childSize1;
              let pos0$$ = pos0$ + posDiff0$;
              let pos1$ = pos1 + posDiff1;
            }
            {
              let childSize0 = Layout_$this.u21;
              let posDiff0$ = (size0$$ - childSize0) * UI_$this.v21;
              let size0$$$ = childSize0;
              let size1$$ = Layout_$this.l33 - Layout_$this.l32;
              let posDiff1 = Layout_$this.l32;
              let childSize1 = Layout_$this.u33;
              posDiff1 += (size1$$ - childSize1) * UI_$this.v21;
              size1$$ = childSize1;
              let pos0$$ = pos0$ + posDiff0$;
              let pos1$ = pos1 + posDiff1;
            }
          }
        }
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      Main_$this.pushAttribute(5, UI_$this.v23);
      this.a1 = Main_$this.getTextSize(UI_$this.v4);
      this.a2 = Main_$this.getTextSize(UI_$this.v5);
      this.a3 = Main_$this.getTextSize(UI_$this.v6);
      this.a4 = Main_$this.getTextSize(UI_$this.v7);
      this.a5 = Main_$this.getTextSize(UI_$this.v8);
      this.a6 = Main_$this.getTextSize(UI_$this.v12);
      this.a7 = Main_$this.getTextSize(UI_$this.v14);
      this.a8 = Main_$this.getTextSize(UI_$this.v16);
      this.a9 = Main_$this.getTextSize(UI_$this.v18);
      this.a10 = Main_$this.getTextSize(UI_$this.v20);
      Main_$this.popAttribute(5);
      Main_$this.pushAttribute(5, UI_$this.v26);
      this.a11 = _layout(UI_$this.v25);
      Main_$this.popAttribute(5);
      this.u12 = this.a1[0];
      this.u13 = this.a2[0];
      this.l13 = Main_$this.max(this.u12, this.u13);
      this.u14 = this.a3[0];
      this.l14 = Main_$this.max(this.l13, this.u14);
      this.u15 = this.a4[0];
      this.l15 = Main_$this.max(this.l14, this.u15);
      this.u16 = this.a5[0];
      this.l16 = Main_$this.max(this.l15, this.u16);
      this.u17 = this.a6[0];
      this.u18 = this.a7[0];
      this.l18 = Main_$this.max(this.u17, this.u18);
      this.u19 = this.a8[0];
      this.l19 = Main_$this.max(this.l18, this.u19);
      this.u20 = this.a9[0];
      this.l20 = Main_$this.max(this.l19, this.u20);
      this.u21 = this.a10[0];
      this.l21 = Main_$this.max(this.l20, this.u21);
      this.l22 = this.l16 + this.l21;
      this.u23 = this.a11.size0;
      this.l23 = Main_$this.max(this.l22, this.u23);
      this.u24 = this.a1[1];
      this.u25 = this.a2[1];
      this.l25 = this.u24 + this.u25;
      this.u26 = this.a3[1];
      this.l26 = this.l25 + this.u26;
      this.u27 = this.a4[1];
      this.l27 = this.l26 + this.u27;
      this.u28 = this.a5[1];
      this.l28 = this.l27 + this.u28;
      this.u29 = this.a6[1];
      this.u30 = this.a7[1];
      this.l30 = this.u29 + this.u30;
      this.u31 = this.a8[1];
      this.l31 = this.l30 + this.u31;
      this.u32 = this.a9[1];
      this.l32 = this.l31 + this.u32;
      this.u33 = this.a10[1];
      this.l33 = this.l32 + this.u33;
      this.l34 = Main_$this.max(this.l28, this.l33);
      this.u35 = this.a11.size1;
      this.l35 = Main_$this.max(this.l34, this.u35);
      this.size0 = this.l23;
      this.size1 = this.l35;
    }
    this.v1 = Main_$this.rect;
    this.v2 = ((100) / 100);
    this.v3 = 9925231;
    this.v4 = "Number of tacos: ";
    this.v5 = "Guest: ";
    this.v6 = "Room: ";
    this.v7 = "Taco price: ";
    this.v8 = "Total Price: ";
    this.v9 = Main_$this.rect;
    this.v10 = ((100) / 100);
    this.v11 = 11305855;
    this.v12 = SummaryWidget$this.entry.numTacos;
    this.v13 = ((100) / 100);
    this.v14 = SummaryWidget$this.entry.guestName;
    this.v15 = ((100) / 100);
    this.v16 = SummaryWidget$this.entry.roomNumber;
    this.v17 = ((100) / 100);
    this.v18 = SummaryWidget$this.entry.getPrice();
    this.v19 = ((100) / 100);
    this.v20 = SummaryWidget$this.entry.getTotal();
    this.v21 = ((100) / 100);
    this.v22 = ((50) / 100);
    this.v23 = 30;
    this.v24 = Main_$this.COLOR_WHITE;
    this.v25 = SummaryWidget$this.nextButton;
    this.v26 = 25;
    this.v27 = 10012308;
    this.v28 = ((100) / 100);
    this.v29 = new QEDExplicitArray(-25, -25);
    Main_$this.pushAttribute(5, this.v26);
    _setUI(this.v25);
    Main_$this.popAttribute(5);
  }
  this.ui_ = null;
  this.setUI_ = function() {
    SummaryWidget$this.ui_ = new SummaryWidget$this.UI_();
  }
  this.blocking__Call = null;
  this.nextButton = new Main_$this.LargerButton("Confirm", (function Lambda_(_ret) {
    {
      Main_$this.post_(_HandlerFn_);
      return;
    }
  }));
}
this.GetTransactionEntry = function(entry, _HandlerFn_) {
  this.entry = entry;
  const GetTransactionEntry$this = this;
  this.Pane = function(title, widget, _HandlerFn_) {
    this.title = title;
    this.widget = widget;
    const Pane$this = this;
    this.UI_ = function() {
      const UI_$this = this;
      this.Layout_ = function() {
        const Layout_$this = this;
        this.paint = function(pos0, pos1, size0$, size1$) {
          {
          }
          _paint(Layout_$this.a2, pos0, pos1, size0$, size1$);
        }
        this.onEvent = function(event, pos0, pos1, size0$, size1$) {
          let flag = false;
          if ((3 & (1 << event)) !== 0) {
            flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$;
            if (flag) {
              flag = _onEvent(Layout_$this.a2, event, pos0, pos1, size0$, size1$);
              if (!flag) {
                if (event === 0) {
                  flag = true;
                  Main_$this.post_(UI_$this.v5);
                }
                if (event === 1) {
                  flag = true;
                  Main_$this.post_(UI_$this.v6);
                }
              }
            }
          }
          if (!flag) {
          }
          return (flag);
        }
        this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
          return (new QEDExplicitArray(0, 0, 0, 0));
        }
        this.a1 = new QEDExplicitArray(UI_$this.v1[0], UI_$this.v1[1]);
        this.a2 = _layout(UI_$this.v3);
        this.u3 = this.a1[0];
        this.u4 = this.a2.size0;
        this.l4 = Main_$this.max(this.u3, this.u4);
        this.u5 = this.a1[1];
        this.u6 = this.a2.size1;
        this.l6 = Main_$this.max(this.u5, this.u6);
        this.size0 = this.l4;
        this.size1 = this.l6;
      }
      this.v1 = new QEDExplicitArray(800, 400);
      this.v2 = new QEDExplicitArray(0, ((100) / 100));
      this.v3 = Pane$this.widget;
      this.v4 = ((100) / 100);
      this.v5 = (function W3$_() {
        0;
      });
      this.v6 = (function W4$_() {
        0;
      });
      _setUI(this.v3);
    }
    this.ui_ = null;
    this.setUI_ = function() {
      Pane$this.ui_ = new Pane$this.UI_();
    }
    this.blocking__Call$ = null;
  }
  this.TabLabel = function(pane, _HandlerFn_) {
    this.pane = pane;
    const TabLabel$this = this;
    this.UI_ = function() {
      const UI_$this = this;
      this.Layout_ = function() {
        const Layout_$this = this;
        this.paint = function(pos0, pos1, size0$, size1$) {
          _paint(Layout_$this.a1, pos0, pos1, size0$, size1$);
        }
        this.onEvent = function(event, pos0, pos1, size0$, size1$) {
          let flag = false;
          if ((3 & (1 << event)) !== 0) {
            flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$;
            if (flag) {
              flag = _onEvent(Layout_$this.a1, event, pos0, pos1, size0$, size1$);
              if (!flag) {
              }
            }
          }
          return (flag);
        }
        this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
          return (new QEDExplicitArray(0, 0, 0, 0));
        }
        this.a1 = _layout(UI_$this.v1);
        this.u2 = this.a1.size0;
        this.u3 = this.a1.size1;
        this.size0 = this.u2;
        this.size1 = this.u3;
      }
      this.v1 = TabLabel$this.button;
      _setUI(this.v1);
    }
    this.ui_ = null;
    this.setUI_ = function() {
      TabLabel$this.ui_ = new TabLabel$this.UI_();
    }
    this.blocking__Call$ = null;
    this.text = "    " + (this.pane + 1) + "." + GetTransactionEntry$this.panes[this.pane].title + "    ";
    this.button = new Main_$this.GenericButton((function L_(pressed) {
      this.pressed = pressed;
      const L_$this = this;
      this.UI_ = function() {
        const UI_$this = this;
        this.Layout_ = function() {
          this.paint = function(pos0, pos1, size0$, size1$) {
            {
              Main_$this.pushAttribute$_(13, UI_$this.v2);
              Main_$this.displayText(UI_$this.v1, pos0, pos1, size0$, size1$);
              Main_$this.popAttribute(13);
            }
          }
          this.onEvent = function(event, pos0, pos1, size0$, size1$) {
            let flag = false;
            return (flag);
          }
          this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
            return (new QEDExplicitArray(0, 0, 0, 0));
          }
          this.a1 = Main_$this.getTextSize(UI_$this.v1);
          this.u2 = this.a1[0];
          this.u3 = this.a1[1];
          this.size0 = this.u2;
          this.size1 = this.u3;
        }
        this.v1 = TabLabel$this.text;
        this.v2 = TabLabel$this.pane > GetTransactionEntry$this.maxIndex ? ((50) / 100) : L_$this.pressed[0] ? ((35) / 100) : ((100) / 100);
      }
      this.ui_ = null;
      this.setUI_ = function() {
        L_$this.ui_ = new L_$this.UI_();
      }
    }), (function Lambda_() {
      new (function W279$_(i277$_) {
        this.i277$_ = i277$_;
        if (TabLabel$this.pane <= GetTransactionEntry$this.maxIndex) {
          {
            Main_$this.post_(_HandlerFn_);
            return;
          }
          i277$_();
        }
        else
          i277$_();
      })((function c278$_() {
      }));
    }));
  }
  this.NextPane = function(_HandlerFn_) {
    this.blocking__Call$ = null;
    const NextPane$this = this;
    this.blocking__Call$ = new GetTransactionEntry$this.SetPane(GetTransactionEntry$this.paneIndex + 1, (function Lambda_() {
      NextPane$this.blocking__Call$ = null;
      {
        Main_$this.post_(_HandlerFn_);
        return;
      }
    }));
  }
  this.SetPane = function(index, _HandlerFn_) {
    this.index = index;
    const SetPane$this = this;
    this.calcPos = function(a, b, progress) {
      return (a + (b - a) * progress);
    }
    this.blocking__Call$ = null;
    this.newBounds = Main_$this.getBounds(new QEDExplicitArray("application", "titles"), new QEDExplicitArray(this.index));
    if (GetTransactionEntry$this.paneIndex === this.index) {
      GetTransactionEntry$this.bounds = this.newBounds;
      {
        Main_$this.post_(_HandlerFn_);
        return;
      }
    }
    GetTransactionEntry$this.paneOpacity = 0;
    GetTransactionEntry$this.paneIndex = this.index;
    this.elapsedTime = 0;
    this.oldBounds = [...GetTransactionEntry$this.bounds];
    this.sprite = new Main_$this.Sprite((function Lambda_() {
    }));
    this.sprite.setLimit(150);
    (function while281$_() {
      if (GetTransactionEntry$this.paneOpacity < 1) {
        SetPane$this.blocking__Call$ = new SetPane$this.sprite.Move((function Lambda_(_ret) {
          SetPane$this.blocking__Call$ = null;
          GetTransactionEntry$this.paneOpacity = _ret;
          GetTransactionEntry$this.bounds[0] = SetPane$this.calcPos(SetPane$this.oldBounds[0], SetPane$this.newBounds[0], GetTransactionEntry$this.paneOpacity);
          GetTransactionEntry$this.bounds[2] = SetPane$this.calcPos(SetPane$this.oldBounds[2], SetPane$this.newBounds[2], GetTransactionEntry$this.paneOpacity);
          GetTransactionEntry$this.bounds[3] = SetPane$this.newBounds[3];
          while281$_();
        }));
      }
      else {
        GetTransactionEntry$this.maxIndex = Main_$this.max(GetTransactionEntry$this.maxIndex, GetTransactionEntry$this.paneIndex);
        GetTransactionEntry$this.oldIndex = GetTransactionEntry$this.paneIndex;
        {
          Main_$this.post_(_HandlerFn_);
          return;
        }
      }
    })();
  }
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0$, size1$) {
        {
          Main_$this.pushAttribute(12, UI_$this.v4);
          let childSize0 = Layout_$this.u5;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v5;
          let size0$$ = childSize0;
          posDiff0 += UI_$this.v2[0];
          let childSize1 = Layout_$this.u11;
          let posDiff1 = (size1$ - childSize1) * UI_$this.v5;
          let size1$$ = childSize1;
          posDiff1 += UI_$this.v2[1];
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
          UI_$this.v1(pos0$, pos1$, size0$$, size1$$);
          Main_$this.popAttribute(12);
        }
        {
          let exp1 = new QEDExplicitArray(UI_$this.v7[1]);
          let extraSpace1 = size1$ - Layout_$this.l15;
          if (exp1[0] > 1)
            extraSpace1 = extraSpace1 / exp1[0];
          {
            Main_$this.pushAttribute(12, UI_$this.v8);
            Main_$this.pushAttribute(5, UI_$this.v9);
            let size1$$ = Layout_$this.u12;
            size1$$ = size1$$ + extraSpace1 * UI_$this.v7[1];
            _paint(Layout_$this.a2, pos0, pos1, size0$, size1$$);
            Main_$this.popAttribute(5);
            Main_$this.popAttribute(12);
          }
          {
            let size1$$ = Layout_$this.l15 - Layout_$this.u12;
            let posDiff1 = Layout_$this.u12;
            posDiff1 += exp1[0] * extraSpace1;
            let pos1$ = pos1 + posDiff1;
            {
              Main_$this.pushAttribute(13, UI_$this.v12);
              _paint(Layout_$this.a3, pos0, pos1$, size0$, size1$$);
              Main_$this.popAttribute(13);
            }
            {
              Main_$this.pushAttribute(13, UI_$this.v15);
              _paint(Layout_$this.a4, pos0, pos1$, size0$, size1$$);
              Main_$this.popAttribute(13);
            }
          }
        }
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        if ((3 & (1 << event)) !== 0) {
          flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$;
          if (flag) {
            {
              let exp1 = new QEDExplicitArray(UI_$this.v7[1]);
              let extraSpace1 = size1$ - Layout_$this.l15;
              if (exp1[0] > 1)
                extraSpace1 = extraSpace1 / exp1[0];
              if ((3 & (1 << event)) !== 0) {
                let size1$$ = Layout_$this.l15 - Layout_$this.u12;
                let posDiff1 = Layout_$this.u12;
                posDiff1 += exp1[0] * extraSpace1;
                flag = pos0 >= 0 && pos0 < size0$ && pos1 >= posDiff1 && pos1 < posDiff1 + size1$$;
                if (flag) {
                  pos1 = pos1 - posDiff1;
                  if ((3 & (1 << event)) !== 0) {
                    flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$$;
                    if (flag) {
                      flag = _onEvent(Layout_$this.a4, event, pos0, pos1, size0$, size1$$);
                      if (!flag) {
                      }
                    }
                  }
                  if (!flag) {
                    if ((3 & (1 << event)) !== 0) {
                      flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$$;
                      if (flag) {
                        flag = _onEvent(Layout_$this.a3, event, pos0, pos1, size0$, size1$$);
                        if (!flag) {
                        }
                      }
                    }
                  }
                }
              }
              if (!flag) {
                if ((3 & (1 << event)) !== 0) {
                  let size1$$ = Layout_$this.u12;
                  size1$$ = size1$$ + extraSpace1 * UI_$this.v7[1];
                  flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$$;
                  if (flag) {
                    flag = _onEvent(Layout_$this.a2, event, pos0, pos1, size0$, size1$$);
                    if (!flag) {
                    }
                  }
                }
              }
            }
          }
        }
        if (!flag) {
        }
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        {
          let exp1 = new QEDExplicitArray(UI_$this.v7[1]);
          let extraSpace1 = size1$ - Layout_$this.l15;
          if (exp1[0] > 1)
            extraSpace1 = extraSpace1 / exp1[0];
          {
            let size1$$ = Layout_$this.u12;
            size1$$ = size1$$ + extraSpace1 * UI_$this.v7[1];
            if (path[level] === UI_$this.v10) {
              level++;
              if (level === path.size() && dLevel === index.size())
                return (new QEDExplicitArray(pos0, pos1, size0$, size1$$));
              else
                return (_getBoundsRect(Layout_$this.a2, path, index, pos0, pos1, size0$, size1$$, level, dLevel));
            }
          }
          {
            let size1$$ = Layout_$this.l15 - Layout_$this.u12;
            let posDiff1 = Layout_$this.u12;
            posDiff1 += exp1[0] * extraSpace1;
            let pos1$ = pos1 + posDiff1;
            {
            }
            {
            }
          }
        }
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = new QEDExplicitArray(UI_$this.v3[0], UI_$this.v3[1]);
      Main_$this.pushAttribute(5, UI_$this.v9);
      this.a2 = new Main_$this.LayoutArray_(UI_$this.v6, Main_$this.calcLayoutObj, Main_$this.getSizeObj, Main_$this.paintLayoutObj, Main_$this.onLayoutEventObj, Main_$this.getElementRectObj);
      Main_$this.popAttribute(5);
      this.a3 = _layout(UI_$this.v11);
      this.a4 = _layout(UI_$this.v14);
      this.u5 = this.a1[0];
      this.u6 = this.a2.size0;
      this.u7 = this.a3.size0;
      this.u8 = this.a4.size0;
      this.l8 = Main_$this.max(this.u7, this.u8);
      this.l9 = Main_$this.max(this.u6, this.l8);
      this.l10 = Main_$this.max(this.u5, this.l9);
      this.u11 = this.a1[1];
      this.u12 = this.a2.size1;
      this.u13 = this.a3.size1;
      this.u14 = this.a4.size1;
      this.l14 = Main_$this.max(this.u13, this.u14);
      this.l15 = this.u12 + this.l14;
      this.l16 = Main_$this.max(this.u11, this.l15);
      this.size0 = this.l10;
      this.size1 = this.l16;
    }
    this.v1 = Main_$this.displaySlider;
    this.v2 = new QEDExplicitArray(GetTransactionEntry$this.bounds[0], -1);
    this.v3 = new QEDExplicitArray(GetTransactionEntry$this.bounds[2], GetTransactionEntry$this.bounds[3] + 1);
    this.v4 = 12499120;
    this.v5 = 0;
    this.v6 = GetTransactionEntry$this.titles;
    this.v7 = new QEDExplicitArray(((100) / 100), 0);
    this.v8 = 7828334;
    this.v9 = 20;
    this.v10 = "titles";
    Main_$this.pushAttribute(5, this.v9);
    Main_$this.uiArray_(this.v6);
    Main_$this.popAttribute(5);
    this.v11 = GetTransactionEntry$this.oldIndex !== GetTransactionEntry$this.paneIndex ? GetTransactionEntry$this.panes[GetTransactionEntry$this.oldIndex] : Main_$this.emptyWidget;
    this.v12 = 1 - GetTransactionEntry$this.paneOpacity;
    this.v13 = ((100) / 100);
    _setUI(this.v11);
    this.v14 = GetTransactionEntry$this.panes[GetTransactionEntry$this.paneIndex];
    this.v15 = GetTransactionEntry$this.paneOpacity;
    this.v16 = ((100) / 100);
    _setUI(this.v14);
  }
  this.ui_ = null;
  this.setUI_ = function() {
    GetTransactionEntry$this.ui_ = new GetTransactionEntry$this.UI_();
  }
  this.blocking__Call = null;
  this.oldIndex = 0;
  this.paneIndex = 0;
  this.maxIndex = this.paneIndex;
  this.paneOpacity = 1;
  this.bounds = new QEDExplicitArray(0, 0, 0, 0);
  this.triggerExit = new Main_$this.Yield((function Lambda_(_ret) {
    {
      Main_$this.exitHandler.pop();
      {
        Main_$this.post_((function lambda_() {
          _HandlerFn_(false);
        }));
        return;
      }
    }
  }));
  Main_$this.exitHandler[0] = this.triggerExit;
  this.panes = new QEDExplicitArray(new this.Pane("Count", (new Main_$this.NumTacosWidget((function Lambda_(_ret) {
    {
      GetTransactionEntry$this.entry.numTacos = _ret;
      GetTransactionEntry$this.blocking__Call = new GetTransactionEntry$this.NextPane((function Lambda_$() {
        GetTransactionEntry$this.blocking__Call = null;
      }));
    }
  }))), (function Lambda_() {
  })), new this.Pane("Room", (new Main_$this.RoomNumberWidget((function Lambda_(_ret) {
    {
      GetTransactionEntry$this.entry.roomNumber = _ret;
      GetTransactionEntry$this.blocking__Call = new GetTransactionEntry$this.NextPane((function Lambda_$() {
        GetTransactionEntry$this.blocking__Call = null;
      }));
    }
  }))), (function Lambda_() {
  })), new this.Pane("Guest", (new Main_$this.GuestNameWidget((function Lambda_(_ret) {
    {
      GetTransactionEntry$this.entry.guestName = _ret;
      GetTransactionEntry$this.blocking__Call = new GetTransactionEntry$this.NextPane((function Lambda_$() {
        GetTransactionEntry$this.blocking__Call = null;
      }));
    }
  }))), (function Lambda_() {
  })), new this.Pane("Summary", (new Main_$this.SummaryWidget(this.entry, (function Lambda_() {
    {
      Main_$this.exitHandler.pop();
      {
        Main_$this.post_((function lambda_() {
          _HandlerFn_(true);
        }));
        return;
      }
    }
  }))), (function Lambda_() {
  })));
  {
    let _d0 = this.panes.size();
    this.titles = new Main_$this.QEDArray(new QEDExplicitArray(_d0), (function l(pos, _HandlerFn_) {
      let pane = pos[0];
      return ((new GetTransactionEntry$this.TabLabel(pane, _HandlerFn_)));
    }), Main_$this.Qui_, (function Lambda_(_ret) {
      GetTransactionEntry$this.blocking__Call = new GetTransactionEntry$this.SetPane(_ret.index, (function Lambda_$() {
        GetTransactionEntry$this.blocking__Call = null;
      }));
    }));
    this.blocking__Call = new Main_$this.Timer(1, (function Lambda_(_ret) {
      GetTransactionEntry$this.blocking__Call = null;
      GetTransactionEntry$this.blocking__Call = new GetTransactionEntry$this.SetPane(0, (function Lambda_$() {
        GetTransactionEntry$this.blocking__Call = null;
      }));
    }));
  }
}
this.OrderTacos = function(transactionEntry, _HandlerFn_) {
  this.transactionEntry = transactionEntry;
  const OrderTacos$this = this;
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0$, size1$) {
        {
          Main_$this.pushAttribute(12, UI_$this.v6);
          Main_$this.pushAttribute$_(13, UI_$this.v7);
          let childSize0 = Layout_$this.l6;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v8;
          let size0$$ = childSize0;
          let childSize1 = Layout_$this.l9;
          let posDiff1 = (size1$ - childSize1) * UI_$this.v8;
          let size1$$ = childSize1;
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
          {
            let childSize0$ = Layout_$this.u4;
            let posDiff0$ = (size0$$ - childSize0$) * UI_$this.v2;
            let size0$$$ = childSize0$;
            let size1$$$ = Layout_$this.u7;
            let childSize1$ = Layout_$this.u7;
            let posDiff1$ = (size1$$$ - childSize1$) * UI_$this.v2;
            size1$$$ = childSize1$;
            let pos0$$ = pos0$ + posDiff0$;
            let pos1$$ = pos1$ + posDiff1$;
            _paint(Layout_$this.a1, pos0$$, pos1$$, size0$$$, size1$$$);
          }
          {
            let size1$$$ = Layout_$this.l8 - Layout_$this.u7;
            let posDiff1$ = Layout_$this.u7;
            let pos1$$ = pos1$ + posDiff1$;
          }
          {
            let childSize0$ = Layout_$this.u6;
            let posDiff0$ = (size0$$ - childSize0$) * UI_$this.v5;
            let size0$$$ = childSize0$;
            let size1$$$ = Layout_$this.l9 - Layout_$this.l8;
            let posDiff1$ = Layout_$this.l8;
            let childSize1$ = Layout_$this.u9;
            posDiff1$ += (size1$$$ - childSize1$) * UI_$this.v5;
            size1$$$ = childSize1$;
            let pos0$$ = pos0$ + posDiff0$;
            let pos1$$ = pos1$ + posDiff1$;
            Main_$this.displayText(UI_$this.v4, pos0$$, pos1$$, size0$$$, size1$$$);
          }
          Main_$this.popAttribute(13);
          Main_$this.popAttribute(12);
        }
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        {
          let childSize0 = Layout_$this.u4;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v2;
          let size0$$ = childSize0;
          let size1$$ = Layout_$this.u7;
          let childSize1 = Layout_$this.u7;
          let posDiff1 = (size1$$ - childSize1) * UI_$this.v2;
          size1$$ = childSize1;
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
        }
        {
          let size1$$ = Layout_$this.l8 - Layout_$this.u7;
          let posDiff1 = Layout_$this.u7;
          let pos1$ = pos1 + posDiff1;
        }
        {
          let childSize0 = Layout_$this.u6;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v5;
          let size0$$ = childSize0;
          let size1$$ = Layout_$this.l9 - Layout_$this.l8;
          let posDiff1 = Layout_$this.l8;
          let childSize1 = Layout_$this.u9;
          posDiff1 += (size1$$ - childSize1) * UI_$this.v5;
          size1$$ = childSize1;
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
        }
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = _layout(UI_$this.v1);
      this.a2 = new QEDExplicitArray(UI_$this.v3, UI_$this.v3);
      this.a3 = Main_$this.getTextSize(UI_$this.v4);
      this.u4 = this.a1.size0;
      this.u5 = this.a2[0];
      this.l5 = Main_$this.max(this.u4, this.u5);
      this.u6 = this.a3[0];
      this.l6 = Main_$this.max(this.l5, this.u6);
      this.u7 = this.a1.size1;
      this.u8 = this.a2[1];
      this.l8 = this.u7 + this.u8;
      this.u9 = this.a3[1];
      this.l9 = this.l8 + this.u9;
      this.size0 = this.l6;
      this.size1 = this.l9;
    }
    this.v1 = OrderTacos$this.spinner;
    this.v2 = ((50) / 100);
    _setUI(this.v1);
    this.v3 = 25;
    this.v4 = "Ordering tacos... please wait.";
    this.v5 = ((50) / 100);
    this.v6 = Main_$this.COLOR_BLACK;
    this.v7 = ((60) / 100);
    this.v8 = ((50) / 100);
  }
  this.ui_ = null;
  this.setUI_ = function() {
    OrderTacos$this.ui_ = new OrderTacos$this.UI_();
  }
  this.blocking__Call = null;
  this.spinner = new Main_$this.SpinnerWidget((function Lambda_() {
  }));
  this.blocking__Call = new Main_$this.Timer(5000, (function Lambda_(_ret) {
    OrderTacos$this.blocking__Call = null;
    OrderTacos$this.spinner.stopped = true;
    {
      Main_$this.post_((function lambda_() {
        _HandlerFn_(true);
      }));
      return;
    }
  }));
}
this.DisplaySuccess = function(total, _HandlerFn_) {
  this.total = total;
  const DisplaySuccess$this = this;
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0$, size1$) {
        {
          Main_$this.pushAttribute(12, UI_$this.v6);
          Main_$this.pushAttribute$_(13, UI_$this.v7);
          let childSize0 = Layout_$this.l6;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v8;
          let size0$$ = childSize0;
          let childSize1 = Layout_$this.l9;
          let posDiff1 = (size1$ - childSize1) * UI_$this.v8;
          let size1$$ = childSize1;
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
          {
            let childSize0$ = Layout_$this.u4;
            let posDiff0$ = (size0$$ - childSize0$) * UI_$this.v2;
            let size0$$$ = childSize0$;
            let size1$$$ = Layout_$this.u7;
            let childSize1$ = Layout_$this.u7;
            let posDiff1$ = (size1$$$ - childSize1$) * UI_$this.v2;
            size1$$$ = childSize1$;
            let pos0$$ = pos0$ + posDiff0$;
            let pos1$$ = pos1$ + posDiff1$;
            Main_$this.displayText(UI_$this.v1, pos0$$, pos1$$, size0$$$, size1$$$);
          }
          {
            let size1$$$ = Layout_$this.l8 - Layout_$this.u7;
            let posDiff1$ = Layout_$this.u7;
            let pos1$$ = pos1$ + posDiff1$;
          }
          {
            let childSize0$ = Layout_$this.u6;
            let posDiff0$ = (size0$$ - childSize0$) * UI_$this.v5;
            let size0$$$ = childSize0$;
            let size1$$$ = Layout_$this.l9 - Layout_$this.l8;
            let posDiff1$ = Layout_$this.l8;
            let childSize1$ = Layout_$this.u9;
            posDiff1$ += (size1$$$ - childSize1$) * UI_$this.v5;
            size1$$$ = childSize1$;
            let pos0$$ = pos0$ + posDiff0$;
            let pos1$$ = pos1$ + posDiff1$;
            Main_$this.displayText(UI_$this.v4, pos0$$, pos1$$, size0$$$, size1$$$);
          }
          Main_$this.popAttribute(13);
          Main_$this.popAttribute(12);
        }
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        {
          let childSize0 = Layout_$this.u4;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v2;
          let size0$$ = childSize0;
          let size1$$ = Layout_$this.u7;
          let childSize1 = Layout_$this.u7;
          let posDiff1 = (size1$$ - childSize1) * UI_$this.v2;
          size1$$ = childSize1;
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
        }
        {
          let size1$$ = Layout_$this.l8 - Layout_$this.u7;
          let posDiff1 = Layout_$this.u7;
          let pos1$ = pos1 + posDiff1;
        }
        {
          let childSize0 = Layout_$this.u6;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v5;
          let size0$$ = childSize0;
          let size1$$ = Layout_$this.l9 - Layout_$this.l8;
          let posDiff1 = Layout_$this.l8;
          let childSize1 = Layout_$this.u9;
          posDiff1 += (size1$$ - childSize1) * UI_$this.v5;
          size1$$ = childSize1;
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
        }
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = Main_$this.getTextSize(UI_$this.v1);
      this.a2 = new QEDExplicitArray(UI_$this.v3, UI_$this.v3);
      this.a3 = Main_$this.getTextSize(UI_$this.v4);
      this.u4 = this.a1[0];
      this.u5 = this.a2[0];
      this.l5 = Main_$this.max(this.u4, this.u5);
      this.u6 = this.a3[0];
      this.l6 = Main_$this.max(this.l5, this.u6);
      this.u7 = this.a1[1];
      this.u8 = this.a2[1];
      this.l8 = this.u7 + this.u8;
      this.u9 = this.a3[1];
      this.l9 = this.l8 + this.u9;
      this.size0 = this.l6;
      this.size1 = this.l9;
    }
    this.v1 = "A total of " + DisplaySuccess$this.total + " has been added to your hotel invoice.";
    this.v2 = ((50) / 100);
    this.v3 = 25;
    this.v4 = "Thank you for choosing the Taco Hotel for your stay.";
    this.v5 = ((50) / 100);
    this.v6 = Main_$this.COLOR_BLACK;
    this.v7 = ((60) / 100);
    this.v8 = ((50) / 100);
  }
  this.ui_ = null;
  this.setUI_ = function() {
    DisplaySuccess$this.ui_ = new DisplaySuccess$this.UI_();
  }
  this.blocking__Call = null;
  this.blocking__Call = new Main_$this.Timer(5000, (function Lambda_(_ret) {
    DisplaySuccess$this.blocking__Call = null;
    {
      Main_$this.post_(_HandlerFn_);
      return;
    }
  }));
}
this.MainScreen = function(_HandlerFn_) {
  const MainScreen$this = this;
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0$, size1$) {
        {
          Main_$this.pushAttribute(12, UI_$this.v16);
          {
            let exp0 = new QEDExplicitArray(UI_$this.v13);
            let extraSpace0 = size0$ - Layout_$this.l15;
            if (exp0[0] > 1)
              extraSpace0 = extraSpace0 / exp0[0];
            let exp1 = new QEDExplicitArray(UI_$this.v13);
            let extraSpace1 = size1$ - Layout_$this.l23;
            if (exp1[0] > 1)
              extraSpace1 = extraSpace1 / exp1[0];
            {
              let size0$$ = Layout_$this.u8;
              let size1$$ = Layout_$this.u16;
            }
            {
              Main_$this.pushAttribute(14, UI_$this.v14);
              let size0$$ = Layout_$this.l14 - Layout_$this.u8;
              let posDiff0 = Layout_$this.u8;
              size0$$ = size0$$ + extraSpace0 * UI_$this.v13;
              let size1$$ = Layout_$this.l22 - Layout_$this.u16;
              let posDiff1 = Layout_$this.u16;
              size1$$ = size1$$ + extraSpace1 * UI_$this.v13;
              let pos0$ = pos0 + posDiff0;
              let pos1$ = pos1 + posDiff1;
              {
                let exp0$ = new QEDExplicitArray(UI_$this.v8, UI_$this.v12);
                exp0$[1] = exp0$[1] + exp0$[0];
                let extraSpace0$ = size0$$ - Layout_$this.l13;
                if (exp0$[1] > 1)
                  extraSpace0$ = extraSpace0$ / exp0$[1];
                {
                  Main_$this.pushAttribute(5, UI_$this.v7);
                  let size0$$$ = Layout_$this.l11;
                  size0$$$ = size0$$$ + extraSpace0$ * UI_$this.v8;
                  {
                    let exp1$ = new QEDExplicitArray(UI_$this.v3, UI_$this.v6);
                    exp1$[1] = exp1$[1] + exp1$[0];
                    let extraSpace1$ = size1$$ - Layout_$this.l19;
                    if (exp1$[1] > 1)
                      extraSpace1$ = extraSpace1$ / exp1$[1];
                    {
                      let size1$$$ = Layout_$this.u17;
                      size1$$$ = size1$$$ + extraSpace1$ * UI_$this.v3;
                      _paint(Layout_$this.a2, pos0$, pos1$, size0$$$, size1$$$);
                    }
                    {
                      let size1$$$ = Layout_$this.l18 - Layout_$this.u17;
                      let posDiff1$ = Layout_$this.u17;
                      posDiff1$ += exp1$[0] * extraSpace1$;
                      let pos1$$ = pos1$ + posDiff1$;
                    }
                    {
                      let size1$$$ = Layout_$this.l19 - Layout_$this.l18;
                      let posDiff1$ = Layout_$this.l18;
                      size1$$$ = size1$$$ + extraSpace1$ * UI_$this.v6;
                      posDiff1$ += exp1$[0] * extraSpace1$;
                      let pos1$$ = pos1$ + posDiff1$;
                      _paint(Layout_$this.a4, pos0$, pos1$$, size0$$$, size1$$$);
                    }
                  }
                  Main_$this.popAttribute(5);
                }
                {
                  let size0$$$ = Layout_$this.l12 - Layout_$this.l11;
                  let posDiff0$ = Layout_$this.l11;
                  posDiff0$ += exp0$[0] * extraSpace0$;
                  let pos0$$ = pos0$ + posDiff0$;
                }
                {
                  Main_$this.pushAttribute(5, UI_$this.v11);
                  let size0$$$ = Layout_$this.l13 - Layout_$this.l12;
                  let posDiff0$ = Layout_$this.l12;
                  size0$$$ = size0$$$ + extraSpace0$ * UI_$this.v12;
                  posDiff0$ += exp0$[0] * extraSpace0$;
                  let pos0$$ = pos0$ + posDiff0$;
                  _paint(Layout_$this.a6, pos0$$, pos1$, size0$$$, size1$$);
                  Main_$this.popAttribute(5);
                }
              }
              Main_$this.popAttribute(14);
            }
            {
              let size0$$ = Layout_$this.l15 - Layout_$this.l14;
              let posDiff0 = Layout_$this.l14;
              posDiff0 += exp0[0] * extraSpace0;
              let size1$$ = Layout_$this.l23 - Layout_$this.l22;
              let posDiff1 = Layout_$this.l22;
              posDiff1 += exp1[0] * extraSpace1;
              let pos0$ = pos0 + posDiff0;
              let pos1$ = pos1 + posDiff1;
            }
          }
          Main_$this.popAttribute(12);
        }
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        if ((3 & (1 << event)) !== 0) {
          flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$;
          if (flag) {
            {
              let exp0 = new QEDExplicitArray(UI_$this.v13);
              let extraSpace0 = size0$ - Layout_$this.l15;
              if (exp0[0] > 1)
                extraSpace0 = extraSpace0 / exp0[0];
              let exp1 = new QEDExplicitArray(UI_$this.v13);
              let extraSpace1 = size1$ - Layout_$this.l23;
              if (exp1[0] > 1)
                extraSpace1 = extraSpace1 / exp1[0];
              if ((3 & (1 << event)) !== 0) {
                let size0$$ = Layout_$this.l14 - Layout_$this.u8;
                let posDiff0 = Layout_$this.u8;
                size0$$ = size0$$ + extraSpace0 * UI_$this.v13;
                let size1$$ = Layout_$this.l22 - Layout_$this.u16;
                let posDiff1 = Layout_$this.u16;
                size1$$ = size1$$ + extraSpace1 * UI_$this.v13;
                flag = pos0 >= posDiff0 && pos0 < posDiff0 + size0$$ && pos1 >= posDiff1 && pos1 < posDiff1 + size1$$;
                if (flag) {
                  pos0 = pos0 - posDiff0;
                  pos1 = pos1 - posDiff1;
                  {
                    let exp0$ = new QEDExplicitArray(UI_$this.v8, UI_$this.v12);
                    exp0$[1] = exp0$[1] + exp0$[0];
                    let extraSpace0$ = size0$$ - Layout_$this.l13;
                    if (exp0$[1] > 1)
                      extraSpace0$ = extraSpace0$ / exp0$[1];
                    if ((3 & (1 << event)) !== 0) {
                      let size0$$$ = Layout_$this.l13 - Layout_$this.l12;
                      let posDiff0$ = Layout_$this.l12;
                      size0$$$ = size0$$$ + extraSpace0$ * UI_$this.v12;
                      posDiff0$ += exp0$[0] * extraSpace0$;
                      flag = pos0 >= posDiff0$ && pos0 < posDiff0$ + size0$$$ && pos1 >= 0 && pos1 < size1$$;
                      if (flag) {
                        pos0 = pos0 - posDiff0$;
                        flag = _onEvent(Layout_$this.a6, event, pos0, pos1, size0$$$, size1$$);
                        if (!flag) {
                        }
                      }
                    }
                    if (!flag) {
                      if ((3 & (1 << event)) !== 0) {
                        let size0$$$ = Layout_$this.l11;
                        size0$$$ = size0$$$ + extraSpace0$ * UI_$this.v8;
                        flag = pos0 >= 0 && pos0 < size0$$$ && pos1 >= 0 && pos1 < size1$$;
                        if (flag) {
                          {
                            let exp1$ = new QEDExplicitArray(UI_$this.v3, UI_$this.v6);
                            exp1$[1] = exp1$[1] + exp1$[0];
                            let extraSpace1$ = size1$$ - Layout_$this.l19;
                            if (exp1$[1] > 1)
                              extraSpace1$ = extraSpace1$ / exp1$[1];
                            if ((3 & (1 << event)) !== 0) {
                              let size1$$$ = Layout_$this.l19 - Layout_$this.l18;
                              let posDiff1$ = Layout_$this.l18;
                              size1$$$ = size1$$$ + extraSpace1$ * UI_$this.v6;
                              posDiff1$ += exp1$[0] * extraSpace1$;
                              flag = pos0 >= 0 && pos0 < size0$$$ && pos1 >= posDiff1$ && pos1 < posDiff1$ + size1$$$;
                              if (flag) {
                                pos1 = pos1 - posDiff1$;
                                flag = _onEvent(Layout_$this.a4, event, pos0, pos1, size0$$$, size1$$$);
                                if (!flag) {
                                }
                              }
                            }
                            if (!flag) {
                              if ((3 & (1 << event)) !== 0) {
                                let size1$$$ = Layout_$this.u17;
                                size1$$$ = size1$$$ + extraSpace1$ * UI_$this.v3;
                                flag = pos0 >= 0 && pos0 < size0$$$ && pos1 >= 0 && pos1 < size1$$$;
                                if (flag) {
                                  flag = _onEvent(Layout_$this.a2, event, pos0, pos1, size0$$$, size1$$$);
                                  if (!flag) {
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              if (!flag) {
              }
            }
          }
        }
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        {
          let exp0 = new QEDExplicitArray(UI_$this.v13);
          let extraSpace0 = size0$ - Layout_$this.l15;
          if (exp0[0] > 1)
            extraSpace0 = extraSpace0 / exp0[0];
          let exp1 = new QEDExplicitArray(UI_$this.v13);
          let extraSpace1 = size1$ - Layout_$this.l23;
          if (exp1[0] > 1)
            extraSpace1 = extraSpace1 / exp1[0];
          {
            let size0$$ = Layout_$this.u8;
            let size1$$ = Layout_$this.u16;
          }
          {
            let size0$$ = Layout_$this.l14 - Layout_$this.u8;
            let posDiff0 = Layout_$this.u8;
            size0$$ = size0$$ + extraSpace0 * UI_$this.v13;
            let size1$$ = Layout_$this.l22 - Layout_$this.u16;
            let posDiff1 = Layout_$this.u16;
            size1$$ = size1$$ + extraSpace1 * UI_$this.v13;
            let pos0$ = pos0 + posDiff0;
            let pos1$ = pos1 + posDiff1;
            {
              let exp0$ = new QEDExplicitArray(UI_$this.v8, UI_$this.v12);
              exp0$[1] = exp0$[1] + exp0$[0];
              let extraSpace0$ = size0$$ - Layout_$this.l13;
              if (exp0$[1] > 1)
                extraSpace0$ = extraSpace0$ / exp0$[1];
              {
                let size0$$$ = Layout_$this.l11;
                size0$$$ = size0$$$ + extraSpace0$ * UI_$this.v8;
                {
                  let exp1$ = new QEDExplicitArray(UI_$this.v3, UI_$this.v6);
                  exp1$[1] = exp1$[1] + exp1$[0];
                  let extraSpace1$ = size1$$ - Layout_$this.l19;
                  if (exp1$[1] > 1)
                    extraSpace1$ = extraSpace1$ / exp1$[1];
                  {
                    let size1$$$ = Layout_$this.u17;
                    size1$$$ = size1$$$ + extraSpace1$ * UI_$this.v3;
                  }
                  {
                    let size1$$$ = Layout_$this.l18 - Layout_$this.u17;
                    let posDiff1$ = Layout_$this.u17;
                    posDiff1$ += exp1$[0] * extraSpace1$;
                    let pos1$$ = pos1$ + posDiff1$;
                  }
                  {
                    let size1$$$ = Layout_$this.l19 - Layout_$this.l18;
                    let posDiff1$ = Layout_$this.l18;
                    size1$$$ = size1$$$ + extraSpace1$ * UI_$this.v6;
                    posDiff1$ += exp1$[0] * extraSpace1$;
                    let pos1$$ = pos1$ + posDiff1$;
                  }
                }
              }
              {
                let size0$$$ = Layout_$this.l12 - Layout_$this.l11;
                let posDiff0$ = Layout_$this.l11;
                posDiff0$ += exp0$[0] * extraSpace0$;
                let pos0$$ = pos0$ + posDiff0$;
              }
              {
                let size0$$$ = Layout_$this.l13 - Layout_$this.l12;
                let posDiff0$ = Layout_$this.l12;
                size0$$$ = size0$$$ + extraSpace0$ * UI_$this.v12;
                posDiff0$ += exp0$[0] * extraSpace0$;
                let pos0$$ = pos0$ + posDiff0$;
              }
            }
          }
          {
            let size0$$ = Layout_$this.l15 - Layout_$this.l14;
            let posDiff0 = Layout_$this.l14;
            posDiff0 += exp0[0] * extraSpace0;
            let size1$$ = Layout_$this.l23 - Layout_$this.l22;
            let posDiff1 = Layout_$this.l22;
            posDiff1 += exp1[0] * extraSpace1;
            let pos0$ = pos0 + posDiff0;
            let pos1$ = pos1 + posDiff1;
          }
        }
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = new QEDExplicitArray(UI_$this.v1, UI_$this.v1);
      Main_$this.pushAttribute(5, UI_$this.v7);
      this.a2 = _layout(UI_$this.v2);
      this.a3 = new QEDExplicitArray(UI_$this.v4, UI_$this.v4);
      this.a4 = _layout(UI_$this.v5);
      Main_$this.popAttribute(5);
      this.a5 = new QEDExplicitArray(UI_$this.v9, UI_$this.v9);
      Main_$this.pushAttribute(5, UI_$this.v11);
      this.a6 = _layout(UI_$this.v10);
      Main_$this.popAttribute(5);
      this.a7 = new QEDExplicitArray(UI_$this.v15, UI_$this.v15);
      this.u8 = this.a1[0];
      this.u9 = this.a2.size0;
      this.u10 = this.a3[0];
      this.l10 = Main_$this.max(this.u9, this.u10);
      this.u11 = this.a4.size0;
      this.l11 = Main_$this.max(this.l10, this.u11);
      this.u12 = this.a5[0];
      this.l12 = this.l11 + this.u12;
      this.u13 = this.a6.size0;
      this.l13 = this.l12 + this.u13;
      this.l14 = this.u8 + this.l13;
      this.u15 = this.a7[0];
      this.l15 = this.l14 + this.u15;
      this.u16 = this.a1[1];
      this.u17 = this.a2.size1;
      this.u18 = this.a3[1];
      this.l18 = this.u17 + this.u18;
      this.u19 = this.a4.size1;
      this.l19 = this.l18 + this.u19;
      this.u20 = this.a5[1];
      this.l20 = Main_$this.max(this.l19, this.u20);
      this.u21 = this.a6.size1;
      this.l21 = Main_$this.max(this.l20, this.u21);
      this.l22 = this.u16 + this.l21;
      this.u23 = this.a7[1];
      this.l23 = this.l22 + this.u23;
      this.size0 = this.l15;
      this.size1 = this.l23;
    }
    this.v1 = 15;
    this.v2 = MainScreen$this.roomServiceButton;
    this.v3 = ((100) / 100);
    _setUI(this.v2);
    this.v4 = 15;
    this.v5 = MainScreen$this.moreTowelsButton;
    this.v6 = ((100) / 100);
    _setUI(this.v5);
    this.v7 = 20;
    this.v8 = ((100) / 100);
    this.v9 = 15;
    this.v10 = MainScreen$this.buyTacosButton;
    this.v11 = 30;
    this.v12 = ((100) / 100);
    Main_$this.pushAttribute(5, this.v11);
    _setUI(this.v10);
    Main_$this.popAttribute(5);
    this.v13 = ((100) / 100);
    this.v14 = 10;
    this.v15 = 15;
    this.v16 = 8171719;
  }
  this.ui_ = null;
  this.setUI_ = function() {
    MainScreen$this.ui_ = new MainScreen$this.UI_();
  }
  this.blocking__Call = null;
  this.buyTacosButton = new Main_$this.ObjectOverTextButton(Main_$this.showTwoTacos, "Order tacos!!", (function Lambda_() {
    {
      Main_$this.post_((function lambda_() {
        _HandlerFn_(1);
      }));
      return;
    }
  }));
  this.roomServiceButton = new Main_$this.ObjectBeforeTextButton(Main_$this.displaySlider, "Room service", (function Lambda_() {
    {
      Main_$this.post_((function lambda_() {
        _HandlerFn_(2);
      }));
      return;
    }
  }));
  this.moreTowelsButton = new Main_$this.ObjectBeforeTextButton(Main_$this.displaySlider, "More towels", (function Lambda_() {
    {
      Main_$this.post_((function lambda_() {
        _HandlerFn_(3);
      }));
      return;
    }
  }));
}
this.Application = function(_HandlerFn_) {
  const Application$this = this;
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      this.paint = function(pos0, pos1, size0$, size1$) {
        Main_$this.displayText(UI_$this.v1, pos0, pos1, size0$, size1$);
      }
      this.onEvent = function(event, pos0, pos1, size0$, size1$) {
        let flag = false;
        if ((3 & (1 << event)) !== 0) {
          flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$;
          if (flag) {
            if (event === 0) {
              flag = true;
              Main_$this.post_(UI_$this.v3);
            }
            if (event === 1) {
              flag = true;
              Main_$this.post_(UI_$this.v4);
            }
          }
        }
        return (flag);
      }
      this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
        return (new QEDExplicitArray(0, 0, 0, 0));
      }
      this.a1 = Main_$this.getTextSize(UI_$this.v1);
      this.u2 = this.a1[0];
      this.u3 = this.a1[1];
      this.size0 = this.u2;
      this.size1 = this.u3;
    }
    this.v1 = "";
    this.v2 = ((100) / 100);
    this.v3 = (function W5$_() {
      0;
    });
    this.v4 = (function W6$_() {
      0;
    });
  }
  this.ui_ = null;
  this.setUI_ = function() {
    Application$this.ui_ = new Application$this.UI_();
  }
  this.blocking__Call = null;
  (function while375$_() {
    if (true) {
      Application$this.blocking__Call = new Main_$this.MainScreen((function Lambda_(_ret) {
        Application$this.blocking__Call = null;
        let choice = _ret;
        new (function W385$_(i376$_) {
          this.i376$_ = i376$_;
          if (choice === 1) {
            let entry = new Main_$this.TransactionEntry((function Lambda_$() {
            }));
            Application$this.blocking__Call = new Main_$this.GetTransactionEntry(entry, (function Lambda_$(_ret$) {
              Application$this.blocking__Call = null;
              new (function W382$_(i377$_) {
                this.i377$_ = i377$_;
                if (_ret$) {
                  Application$this.blocking__Call = new Main_$this.OrderTacos(entry, (function Lambda_$$(_ret$$) {
                    Application$this.blocking__Call = null;
                    new (function W380$_(i378$_) {
                      this.i378$_ = i378$_;
                      if (_ret$$)
                        Application$this.blocking__Call = new Main_$this.DisplaySuccess(entry.getTotal(), (function Lambda_$$$() {
                          Application$this.blocking__Call = null;
                          i378$_();
                        }));
                      else {
                        {
                        }
                        i378$_();
                      }
                    })((function c379$_() {
                      i377$_();
                    }));
                  }));
                }
                else
                  i377$_();
              })((function c381$_() {
                i376$_();
              }));
            }));
          }
          else {
            if (choice === 2) {
            }
            else {
            }
            i376$_();
          }
        })((function c384$_() {
          while375$_();
        }));
      }));
    }
  })();
}
this.UI_ = function() {
  const UI_$this = this;
  this.Layout_ = function() {
    const Layout_$this = this;
    this.paint = function(pos0, pos1, size0$, size1$) {
      {
        {
          Main_$this.pushAttribute(12, UI_$this.v16);
          let childSize0 = Layout_$this.u10;
          let posDiff0 = (size0$ - childSize0) * UI_$this.v17;
          let size0$$ = childSize0;
          let size1$$ = Layout_$this.u17;
          let childSize1 = Layout_$this.u17;
          let posDiff1 = (size1$$ - childSize1) * UI_$this.v17;
          size1$$ = childSize1;
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
          UI_$this.v14(pos0$, pos1$, size0$$, size1$$);
          Main_$this.saveContext();
          {
            Main_$this.pushAttribute(5, UI_$this.v2);
            Main_$this.pushAttribute(12, UI_$this.v3);
            let childSize0$ = Layout_$this.u7;
            let posDiff0$ = (size0$$ - childSize0$) * UI_$this.v4[0];
            let size0$$$ = childSize0$;
            let childSize1$ = Layout_$this.u14;
            let posDiff1$ = (size1$$ - childSize1$) * UI_$this.v4[1];
            let size1$$$ = childSize1$;
            let pos0$$ = pos0$ + posDiff0$;
            let pos1$$ = pos1$ + posDiff1$;
            Main_$this.displayText(UI_$this.v1, pos0$$, pos1$$, size0$$$, size1$$$);
            Main_$this.popAttribute(12);
            Main_$this.popAttribute(5);
          }
          {
            Main_$this.pushAttribute(5, UI_$this.v6);
            Main_$this.pushAttribute(12, UI_$this.v7);
            let childSize0$ = Layout_$this.u8;
            let posDiff0$ = (size0$$ - childSize0$) * UI_$this.v8;
            let size0$$$ = childSize0$;
            let childSize1$ = Layout_$this.u15;
            let posDiff1$ = (size1$$ - childSize1$) * UI_$this.v8;
            let size1$$$ = childSize1$;
            let pos0$$ = pos0$ + posDiff0$;
            let pos1$$ = pos1$ + posDiff1$;
            Main_$this.displayText(UI_$this.v5, pos0$$, pos1$$, size0$$$, size1$$$);
            Main_$this.popAttribute(12);
            Main_$this.popAttribute(5);
          }
          {
            Main_$this.pushAttribute(12, UI_$this.v11);
            let childSize0$ = Layout_$this.u9;
            let posDiff0$ = (size0$$ - childSize0$) * UI_$this.v12[0];
            let size0$$$ = childSize0$;
            let childSize1$ = Layout_$this.u16;
            let posDiff1$ = (size1$$ - childSize1$) * UI_$this.v12[1];
            let size1$$$ = childSize1$;
            let pos0$$ = pos0$ + posDiff0$;
            let pos1$$ = pos1$ + posDiff1$;
            _paint(Layout_$this.a3, pos0$$, pos1$$, size0$$$, size1$$$);
            Main_$this.popAttribute(12);
          }
          Main_$this.restoreContext();
          Main_$this.popAttribute(12);
        }
        {
          let size1$$ = Layout_$this.l20 - Layout_$this.u17;
          let posDiff1 = Layout_$this.u17;
          let pos1$ = pos1 + posDiff1;
          {
            Main_$this.pushAttribute(12, UI_$this.v20);
            UI_$this.v18(pos0, pos1$, size0$, size1$$);
            Main_$this.popAttribute(12);
          }
          {
            Main_$this.pushAttribute(12, UI_$this.v24);
            _paint(Layout_$this.a6, pos0, pos1$, size0$, size1$$);
            Main_$this.popAttribute(12);
          }
        }
      }
    }
    this.onEvent = function(event, pos0, pos1, size0$, size1$) {
      let flag = false;
      if ((3 & (1 << event)) !== 0) {
        flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$;
        if (flag) {
          if ((3 & (1 << event)) !== 0) {
            let size1$$ = Layout_$this.l20 - Layout_$this.u17;
            let posDiff1 = Layout_$this.u17;
            flag = pos0 >= 0 && pos0 < size0$ && pos1 >= posDiff1 && pos1 < posDiff1 + size1$$;
            if (flag) {
              pos1 = pos1 - posDiff1;
              if ((3 & (1 << event)) !== 0) {
                flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1$$;
                if (flag) {
                  flag = _onEvent(Layout_$this.a6, event, pos0, pos1, size0$, size1$$);
                  if (!flag) {
                  }
                }
              }
              if (!flag) {
              }
            }
          }
          if (!flag) {
            if ((3 & (1 << event)) !== 0) {
              let childSize0 = Layout_$this.u10;
              let posDiff0 = (size0$ - childSize0) * UI_$this.v17;
              let size0$$ = childSize0;
              let size1$$ = Layout_$this.u17;
              let childSize1 = Layout_$this.u17;
              let posDiff1 = (size1$$ - childSize1) * UI_$this.v17;
              size1$$ = childSize1;
              flag = pos0 >= posDiff0 && pos0 < posDiff0 + size0$$ && pos1 >= posDiff1 && pos1 < posDiff1 + size1$$;
              if (flag) {
                pos0 = pos0 - posDiff0;
                pos1 = pos1 - posDiff1;
                if ((3 & (1 << event)) !== 0) {
                  let childSize0$ = Layout_$this.u9;
                  let posDiff0$ = (size0$$ - childSize0$) * UI_$this.v12[0];
                  let size0$$$ = childSize0$;
                  let childSize1$ = Layout_$this.u16;
                  let posDiff1$ = (size1$$ - childSize1$) * UI_$this.v12[1];
                  let size1$$$ = childSize1$;
                  flag = pos0 >= posDiff0$ && pos0 < posDiff0$ + size0$$$ && pos1 >= posDiff1$ && pos1 < posDiff1$ + size1$$$;
                  if (flag) {
                    pos0 = pos0 - posDiff0$;
                    pos1 = pos1 - posDiff1$;
                    flag = _onEvent(Layout_$this.a3, event, pos0, pos1, size0$$$, size1$$$);
                    if (!flag) {
                    }
                  }
                }
                if (!flag) {
                }
                if (!flag) {
                }
              }
            }
          }
        }
      }
      return (flag);
    }
    this.getBoundsRect = function(path, index, pos0, pos1, size0$, size1$, level, dLevel) {
      {
        let childSize0 = Layout_$this.u10;
        let posDiff0 = (size0$ - childSize0) * UI_$this.v17;
        let size0$$ = childSize0;
        let size1$$ = Layout_$this.u17;
        let childSize1 = Layout_$this.u17;
        let posDiff1 = (size1$$ - childSize1) * UI_$this.v17;
        size1$$ = childSize1;
        let pos0$ = pos0 + posDiff0;
        let pos1$ = pos1 + posDiff1;
        {
          let childSize0$ = Layout_$this.u7;
          let posDiff0$ = (size0$$ - childSize0$) * UI_$this.v4[0];
          let size0$$$ = childSize0$;
          let childSize1$ = Layout_$this.u14;
          let posDiff1$ = (size1$$ - childSize1$) * UI_$this.v4[1];
          let size1$$$ = childSize1$;
          let pos0$$ = pos0$ + posDiff0$;
          let pos1$$ = pos1$ + posDiff1$;
        }
        {
          let childSize0$ = Layout_$this.u8;
          let posDiff0$ = (size0$$ - childSize0$) * UI_$this.v8;
          let size0$$$ = childSize0$;
          let childSize1$ = Layout_$this.u15;
          let posDiff1$ = (size1$$ - childSize1$) * UI_$this.v8;
          let size1$$$ = childSize1$;
          let pos0$$ = pos0$ + posDiff0$;
          let pos1$$ = pos1$ + posDiff1$;
        }
        {
          let childSize0$ = Layout_$this.u9;
          let posDiff0$ = (size0$$ - childSize0$) * UI_$this.v12[0];
          let size0$$$ = childSize0$;
          let childSize1$ = Layout_$this.u16;
          let posDiff1$ = (size1$$ - childSize1$) * UI_$this.v12[1];
          let size1$$$ = childSize1$;
          let pos0$$ = pos0$ + posDiff0$;
          let pos1$$ = pos1$ + posDiff1$;
        }
      }
      {
        let size1$$ = Layout_$this.l20 - Layout_$this.u17;
        let posDiff1 = Layout_$this.u17;
        let pos1$ = pos1 + posDiff1;
        {
        }
        if (path[level] === UI_$this.v22) {
          level++;
          if (level === path.size() && dLevel === index.size())
            return (new QEDExplicitArray(pos0, pos1$, size0$, size1$$));
          else
            return (_getBoundsRect(Layout_$this.a6, path, index, pos0, pos1$, size0$, size1$$, level, dLevel));
        }
      }
      return (new QEDExplicitArray(0, 0, 0, 0));
    }
    Main_$this.pushAttribute(5, UI_$this.v2);
    this.a1 = Main_$this.getTextSize(UI_$this.v1);
    Main_$this.popAttribute(5);
    Main_$this.pushAttribute(5, UI_$this.v6);
    this.a2 = Main_$this.getTextSize(UI_$this.v5);
    Main_$this.popAttribute(5);
    this.a3 = _layout(UI_$this.v10);
    this.a4 = new QEDExplicitArray(UI_$this.v15[0], UI_$this.v15[1]);
    this.a5 = new QEDExplicitArray(UI_$this.v19[0], UI_$this.v19[1]);
    this.a6 = _layout(UI_$this.v21);
    this.u7 = this.a1[0];
    this.u8 = this.a2[0];
    this.l8 = Main_$this.max(this.u7, this.u8);
    this.u9 = this.a3.size0;
    this.l9 = Main_$this.max(this.l8, this.u9);
    this.u10 = this.a4[0];
    this.u11 = this.a5[0];
    this.u12 = this.a6.size0;
    this.l12 = Main_$this.max(this.u11, this.u12);
    this.l13 = Main_$this.max(this.u10, this.l12);
    this.u14 = this.a1[1];
    this.u15 = this.a2[1];
    this.l15 = Main_$this.max(this.u14, this.u15);
    this.u16 = this.a3.size1;
    this.l16 = Main_$this.max(this.l15, this.u16);
    this.u17 = this.a4[1];
    this.u18 = this.a5[1];
    this.u19 = this.a6.size1;
    this.l19 = Main_$this.max(this.u18, this.u19);
    this.l20 = this.u17 + this.l19;
    this.size0 = this.l13;
    this.size1 = this.l20;
  }
  this.v1 = Main_$this.getTimestamp();
  this.v2 = 30;
  this.v3 = 7828334;
  this.v4 = new QEDExplicitArray(((5) / 100), ((50) / 100));
  this.v5 = "Taco Hotel";
  this.v6 = 35;
  this.v7 = 7828334;
  this.v8 = ((50) / 100);
  this.v9 = new QEDExplicitArray(0, ((50) / 100));
  this.v10 = Main_$this.exitHandler.size() ? Main_$this.exit : Main_$this.emptyWidget;
  this.v11 = 9909571;
  this.v12 = new QEDExplicitArray(((95) / 100), ((50) / 100));
  this.v13 = new QEDExplicitArray(0, ((50) / 100));
  _setUI(this.v10);
  this.v14 = Main_$this.rect;
  this.v15 = new QEDExplicitArray(800, 60);
  this.v16 = 12499120;
  this.v17 = 0;
  this.v18 = Main_$this.rect;
  this.v19 = new QEDExplicitArray(800, 420);
  this.v20 = 15656669;
  this.v21 = Main_$this.application;
  this.v22 = "application";
  this.v23 = ((100) / 100);
  this.v24 = 6249560;
  _setUI(this.v21);
}
this.ui_ = null;
this.setUI_ = function() {
  Main_$this.ui_ = new Main_$this.UI_();
}
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
this.pushAttribute(5, 20);
this.pushAttribute$_(6, 0.000000);
this.pushAttribute(12, 0);
this.pushAttribute$_(13, 1.000000);
this.pushAttribute$_(14, 3.000000);
this.WIDTH = 1;
this.HEIGHT = 2;
this.OBLIQUE = 3;
this.COLOR_RED = 16711680;
this.COLOR_GREEN = 65280;
this.COLOR_YELLOW = 16776960;
this.COLOR_BLUE = 255;
this.COLOR_BLACK = 0;
this.COLOR_WHITE = 16777215;
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
    key: "size",
    value: function size() {
      return (this.length);
    }
  }]);
  return QEDExplicitArray;
}( /*#__PURE__*/_wrapNativeSuper(Array));
this.exitHandler = new QEDExplicitArray();
this.emptyWidget = new this.Widget((function Lambda_(_ret) {
}));
this.exit = new this.TextButton("Exit", (function Lambda_(_ret) {
  Main_$this.process(Main_$this.exitHandler[0]);
}));
this.application = new this.Application((function Lambda_() {
}));
this.blocking__Call = null;
Main_$this.executeEvents_();
canvas.addEventListener("mousedown", function(ev) {
  var rect = canvas.getBoundingClientRect();
  _onEvent(Main_$this.ui_.layout_, 0, ev.clientX - rect.left, ev.clientY - rect.top, Main_$this.ui_.layout_.size0, Main_$this.ui_.layout_.size1);
  Main_$this.executeEvents_();
  });
canvas.addEventListener("mouseup", function(ev) {
  var rect = canvas.getBoundingClientRect();
  _onEvent(Main_$this.ui_.layout_, 1, ev.clientX - rect.left, ev.clientY - rect.top, Main_$this.ui_.layout_.size0, Main_$this.ui_.layout_.size1);
  Main_$this.executeEvents_();
});
canvas.onselectstart = function () { return false; }
