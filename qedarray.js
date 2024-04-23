"use strict";
const canvas = document.getElementById("canvas");
let postHandler = null;
let attributeStacks = [];
const ctx = canvas.getContext("2d");
function toColor(color) {return "#" + color.toString(16).padStart(6, '0');}
let getAttribute = function(index) {
  return attributeStacks[index][attributeStacks[index].length - 1];
}
const Main_$this = this;
this.voidHandler_ = function() {
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
this.Yield = function(obj, _HandlerFn_) {
  this.obj = obj;
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
this.executeEvents_ = function() {
  while (postHandler != null) {
    const fn = postHandler;
  
    postHandler = null;
    fn();
  }

  _refresh();
}
this.max = function(a, b) {
  return a > b ? a : b;
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
this.oval = function(pos, size) {
  ctx.fillStyle = toColor(getAttribute(10));
  ctx.globalAlpha = "" + getAttribute(11);
  ctx.beginPath();
  ctx.ellipse((pos >> 16) + (size >> 17), (pos & 65535) + ((size & 65535) >> 1), size >> 17, (size & 65535) >> 1, 0, 0, 2*Math.PI);
  ctx.fill();;
}
this.rect = function(pos, size) {
  ctx.fillStyle = toColor(getAttribute(10));
  ctx.globalAlpha = "" + getAttribute(11);
  ctx.beginPath();
  ctx.fillRect((pos >> 16), (pos & 65535), size >> 16, size & 65535);
}
this.roundRect = function(pos, size) {
  ctx.fillStyle = toColor(getAttribute(10));
  ctx.globalAlpha = "" + getAttribute(11);
  ctx.beginPath();
  ctx.roundRect((pos >> 16), (pos & 65535), size >> 16, size & 65535, 30);
  ctx.fill();;
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
  ctx.font = getAttribute(4) + "px Arial";

  const textSize = ctx.measureText(text);
  const height = textSize.fontBoundingBoxAscent + textSize.fontBoundingBoxDescent;
  return (textSize.width << 16) | height;
}
this.displayText = function(text, pos, size) {
  let pos1 = [(pos >> 16), (pos & 0xFFFF)];
  let size1 = [(size >> 16), (size & 0xFFFF)];
  ctx.font = getAttribute(4) + "px Arial";
  ctx.fillStyle = toColor(getAttribute(10));
  ctx.globalAlpha = getAttribute(11);
  ctx.textBaseline = "top";
  ctx.fillText(text, pos1[0], pos1[1]);
}
this.Timer = function(timeoutMillis, _HandlerFn_) {
  this.timeoutMillis = timeoutMillis;
  this.reset = function() {
  }
  setTimeout(function() {
    _HandlerFn_(true);
    _refresh();
  }, timeoutMillis);
}
this.Time = function(Func, _HandlerFn_) {
  this.Func = Func;
  console.time("Time");
  new Func(() => {
    console.timeEnd("Time");
    _HandlerFn_();
  });;
}
this.time = function(func) {
    console.time("time");
  func();
  console.timeEnd("time");;
}
this.Animation = function(_HandlerFn_) {
  requestAnimationFrame((millis) => {
  _HandlerFn_(true);
  _refresh();
});;
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
      this.size$ = 0;
    }
  }
  this.setUI_ = function() {
    QEDBaseArray_$this.ui_ = new QEDBaseArray_$this.UI_();
  }
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
    this.newSize = [...this.size$];
    {
      let index = SQEDArray$this.dims.length - 1;
      while(index >= 0) {
        this.newSize[index] += SQEDArray$this.dims[index];
        index--;
      }
    }
    new SQEDArray$this.InsertLevel(SQEDArray$this, SQEDArray$this.dims, this.pos, this.size$, this.newSize, new Array(this.size$.length).fill(0), 0, (function Lambda_() {
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
    new (function W9$_(i1$_) {
      this.i1$_ = i1$_;
      if (InsertLevel$this.level < SQEDArray$this.dims.length - 1) {
        {
          pp[level] = 0;
          (function while2$_() {
            if (pp[level] < pos[level]) {
              new SQEDArray$this.InsertLevel(array[pp[level]], InsertLevel$this.dims, InsertLevel$this.pos, InsertLevel$this.size$, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1, (function Lambda_() {
                pp[level]++;
                while2$_();
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
                (function while4$_() {
                  if (pp[level] < pos[level] + InsertLevel$this.size$[level]) {
                    array[pp[level]] = [];
                    new SQEDArray$this.InsertLevel(array[pp[level]], new Array(InsertLevel$this.size$.length).fill(0), new Array(InsertLevel$this.size$.length).fill(0), InsertLevel$this.newSize, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1, (function Lambda_() {
                      pp[level]++;
                      while4$_();
                    }));
                  }
                  else {
                    pp[level] = pos[level] + InsertLevel$this.size$[level];
                    (function while5$_() {
                      if (pp[level] < newSize[level]) {
                        new SQEDArray$this.InsertLevel(array[pp[level]], InsertLevel$this.dims, InsertLevel$this.pos, InsertLevel$this.size$, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1, (function Lambda_() {
                          pp[level]++;
                          while5$_();
                        }));
                      }
                      else
                        i1$_();
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
          (function while7$_() {
            if (pp[level] < pos[level] + InsertLevel$this.size$[level]) {
              new SQEDArray$this.Init(InsertLevel$this.pp, (function Lambda_(_ret) {
                array[pp[level]] = _ret;
                pp[level]++;
                while7$_();
              }));
            }
            else
              i1$_();
          })();
        }
      }
    })((function c8$_() {
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
    this.pos = new Array(SQEDArray$this.dims.length).fill(0);
    this.size$ = new Array(SQEDArray$this.dims.length).fill(0);
    this.pos[0] = SQEDArray$this.dims[0];
    this.size$[0] = 1;
    new SQEDArray$this.Insert(this.pos, this.size$, (function Lambda_() {
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
  this.dims = new Array(this.limits.length).fill(0);
  new this.Insert(new Array(this.limits.length).fill(0), this.limits, (function Lambda_() {
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
    this.newSize = [...this.size$];
    {
      let index = VSQEDArray$this.dims.length - 1;
      while(index >= 0) {
        this.newSize[index] += VSQEDArray$this.dims[index];
        index--;
      }
    }
    new VSQEDArray$this.InsertLevel(VSQEDArray$this.dims, this.pos, this.size$, this.newSize, new Array(this.size$.length).fill(0), 0, (function Lambda_() {
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
    new (function W19$_(i13$_) {
      this.i13$_ = i13$_;
      if (InsertLevel$this.level < VSQEDArray$this.dims.length - 1) {
        {
          pp[level] = 0;
          (function while14$_() {
            if (pp[level] < pos[level]) {
              new VSQEDArray$this.InsertLevel(InsertLevel$this.dims, InsertLevel$this.pos, InsertLevel$this.size$, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1, (function Lambda_() {
                pp[level]++;
                while14$_();
              }));
            }
            else {
              pp[level] = pos[level];
              (function while15$_() {
                if (pp[level] < pos[level] + InsertLevel$this.size$[level]) {
                  array[pp[level]] = [];
                  new VSQEDArray$this.InsertLevel(new Array(InsertLevel$this.size$.length).fill(0), new Array(InsertLevel$this.size$.length).fill(0), InsertLevel$this.newSize, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1, (function Lambda_() {
                    pp[level]++;
                    while15$_();
                  }));
                }
                else {
                  pp[level] = pos[level] + InsertLevel$this.size$[level];
                  (function while16$_() {
                    if (pp[level] < newSize[level]) {
                      new VSQEDArray$this.InsertLevel(InsertLevel$this.dims, InsertLevel$this.pos, InsertLevel$this.size$, InsertLevel$this.newSize, InsertLevel$this.pp, InsertLevel$this.level + 1, (function Lambda_() {
                        pp[level]++;
                        while16$_();
                      }));
                    }
                    else
                      i13$_();
                  })();
                }
              })();
            }
          })();
        }
      }
      else {
        pp[level] = pos[level];
        (function while17$_() {
          if (pp[level] < pos[level] + InsertLevel$this.size$[level]) {
            new VSQEDArray$this.Init(InsertLevel$this.pp, (function Lambda_() {
              pp[level]++;
              while17$_();
            }));
          }
          else
            i13$_();
        })();
      }
    })((function c18$_() {
      {
        Main_$this.post_(_HandlerFn_);
        return;
      }
    }));
  }
  this.dims = new Array(this.limits.length).fill(0);
  new this.Insert(new Array(this.limits.length).fill(0), this.limits, (function Lambda_() {
    {
      Main_$this.post_((function lambda_() {
        _HandlerFn_(VSQEDArray$this);
      }));
      return;
    }
  }));
}
this.sInitFn = function(pos) {
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
          array[pp[level]] = QEDArray$this.init(pp);
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
  this.dims = new Array(this.limits.length).fill(0);
  this.insert(new Array(this.limits.length).fill(0), this.limits);
}
this.qedArray = function(limits, init, Ui_) {
  return (new Main_$this.QEDArray(limits, init, Ui_, (function Lambda_() {
  })));
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
  this.dims = new Array(this.limits.length).fill(0);
  this.insert(new Array(this.limits.length).fill(0), this.limits);
}
this.vqedArray = function(limits, init) {
  return (new Main_$this.VQEDArray(limits, init, (function Lambda_() {
  })));
}
this.Ball = function(_HandlerFn_) {
  const Ball$this = this;
  this.Vector = function(pos, delta, _HandlerFn_) {
    this.pos = pos;
    this.delta = delta;
    const Vector$this = this;
    this.move = function() {
      Vector$this.pos += Vector$this.delta;
      if (Vector$this.pos > 1 || Vector$this.pos < 0) {
        Vector$this.pos = Vector$this.delta > 0 ? 2 - Vector$this.pos : -Vector$this.pos;
        Vector$this.delta = -Vector$this.delta;
      }
    }
  }
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0, size1) {
        {
          Main_$this.pushAttribute(10, UI_$this.v2);
          let childSize0 = Layout_$this.u2;
          let posDiff0 = (size0 - childSize0) * UI_$this.v4[0];
          let size0$ = childSize0;
          let childSize1 = Layout_$this.u3;
          let posDiff1 = (size1 - childSize1) * UI_$this.v4[1];
          let size1$ = childSize1;
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
          Main_$this.oval(((pos0$ << 16) | pos1$), ((size0$ << 16) | size1$));
          Main_$this.popAttribute(10);
        }
      }
      this.onEvent = function(event, pos0, pos1, size0, size1) {
        let flag = false;
      }
      this.a1 = (UI_$this.v3 << 16) | UI_$this.v3;
      this.u2 = this.a1 >> 16;
      this.u3 = this.a1 & 65535;
      this.size$ = (this.u2 << 16) | this.u3;
    }
    this.v1 = Main_$this.oval;
    this.v2 = Ball$this.color;
    this.v3 = Ball$this.size;
    this.v4 = [Ball$this.vectors[0].pos, Ball$this.vectors[1].pos];
  }
  this.setUI_ = function() {
    Ball$this.ui_ = new Ball$this.UI_();
  }
  this.color = Main_$this.trunc(Main_$this.rand() * 16777215);
  this.size = Main_$this.rand() * 35 + 35;
  {
    let _d0 = 2;
    this.vectors = Main_$this.qedArray([_d0], (function l(pos) {
      return (new Ball$this.Vector(Main_$this.rand(), ((((Main_$this.rand() * 1) / 100)) + ((0.025000) / 100)) * (Main_$this.rand() > 0.500000 ? 1 : -1), (function Lambda_() {
      })));
    }), Main_$this.Qui_);
    (function while31$_() {
      new Main_$this.Yield(Ball$this, (function Lambda_(_ret) {
        if (_ret) {
          Ball$this.vectors[0].move();
          Ball$this.vectors[1].move();
          while31$_();
        }
      }));
    })();
  }
}
this.CounterWidget = function(_HandlerFn_) {
  const CounterWidget$this = this;
  this.Button = function(text, _HandlerFn_) {
    this.text = text;
    const Button$this = this;
    this.UI_ = function() {
      const UI_$this = this;
      this.Layout_ = function() {
        const Layout_$this = this;
        this.paint = function(pos0, pos1, size0, size1) {
          {
            {
              Main_$this.pushAttribute$_(11, UI_$this.v2);
              Main_$this.rect(((pos0 << 16) | pos1), ((size0 << 16) | size1));
              Main_$this.popAttribute(11);
            }
            {
              Main_$this.pushAttribute$_(11, UI_$this.v5);
              Main_$this.pushAttribute(4, UI_$this.v7);
              let childSize0 = Layout_$this.u4;
              let posDiff0 = (size0 - childSize0) * UI_$this.v6;
              let size0$ = childSize0;
              let childSize1 = Layout_$this.u6;
              let posDiff1 = (size1 - childSize1) * UI_$this.v6;
              let size1$ = childSize1;
              let pos0$ = pos0 + posDiff0;
              let pos1$ = pos1 + posDiff1;
              Main_$this.displayText(UI_$this.v4, ((pos0$ << 16) | pos1$), ((size0$ << 16) | size1$));
              Main_$this.popAttribute(4);
              Main_$this.popAttribute(11);
            }
          }
        }
        this.onEvent = function(event, pos0, pos1, size0, size1) {
          let flag = false;
          if ((3 & (1 << event)) !== 0) {
            flag = pos0 >= 0 && pos0 < size0 && pos1 >= 0 && pos1 < size1;
            if (flag) {
              if ((3 & (1 << event)) !== 0) {
                flag = pos0 >= 0 && pos0 < size0 && pos1 >= 0 && pos1 < size1;
                if (flag) {
                  if (event === 0) {
                    Main_$this.post_((function Lambda_() {
                      Button$this.shade = ((35) / 100);
                    }));
                  }
                  if (event === 1) {
                    Main_$this.post_((function Lambda_() {
                      {
                        Button$this.shade = ((20) / 100);
                        {
                          Main_$this.post_(_HandlerFn_);
                          return;
                        }
                      }
                    }));
                  }
                }
              }
            }
          }
        }
        this.a1 = (UI_$this.v3[0] << 16) | UI_$this.v3[1];
        Main_$this.pushAttribute(4, UI_$this.v7);
        this.a2 = Main_$this.getTextSize(UI_$this.v4);
        Main_$this.popAttribute(4);
        this.u3 = this.a1 >> 16;
        this.u4 = this.a2 >> 16;
        this.l4 = Main_$this.max(this.u3, this.u4);
        this.u5 = this.a1 & 65535;
        this.u6 = this.a2 & 65535;
        this.l6 = Main_$this.max(this.u5, this.u6);
        this.size = (this.l4 << 16) | this.l6;
      }
      this.v1 = Main_$this.rect;
      this.v2 = Button$this.shade;
      this.v3 = [40, 90];
      this.v4 = Button$this.text;
      this.v5 = ((60) / 100);
      this.v6 = ((50) / 100);
      this.v7 = 40;
    }
    this.setUI_ = function() {
      Button$this.ui_ = new Button$this.UI_();
    }
    this.shade = ((20) / 100);
  }
  this.UI_ = function() {
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0, size1) {
        {
          Main_$this.pushAttribute(10, UI_$this.v10);
          Main_$this.pushAttribute$_(11, UI_$this.v11);
          Main_$this.oval(((pos0 << 16) | pos1), ((size0 << 16) | size1));
          Main_$this.saveContext();
          {
            Main_$this.pushAttribute(10, UI_$this.v8);
            {
              let size0$ = Layout_$this.u5;
              Layout_$this.a1.paint(pos0, pos1, size0$, size1);
            }
            {
              let size0$ = Layout_$this.l7 - Layout_$this.u5;
              let posDiff0 = Layout_$this.u5;
              let pos0$ = pos0 + posDiff0;
              {
                Main_$this.pushAttribute$_(11, UI_$this.v3);
                Main_$this.pushAttribute(4, UI_$this.v5);
                let childSize0 = Layout_$this.u6;
                let posDiff0$ = (size0$ - childSize0) * UI_$this.v4;
                let size0$$ = childSize0;
                let childSize1 = Layout_$this.u10;
                let posDiff1 = (size1 - childSize1) * UI_$this.v4;
                let size1$ = childSize1;
                let pos0$$ = pos0$ + posDiff0$;
                let pos1$ = pos1 + posDiff1;
                Main_$this.displayText(UI_$this.v2, ((pos0$$ << 16) | pos1$), ((size0$$ << 16) | size1$));
                Main_$this.popAttribute(4);
                Main_$this.popAttribute(11);
              }
            }
            {
              let size0$ = Layout_$this.l8 - Layout_$this.l7;
              let posDiff0 = Layout_$this.l7;
              let pos0$ = pos0 + posDiff0;
              Layout_$this.a4.paint(pos0$, pos1, size0$, size1);
            }
            Main_$this.popAttribute(10);
          }
          Main_$this.restoreContext();
          Main_$this.popAttribute(11);
          Main_$this.popAttribute(10);
        }
      }
      this.onEvent = function(event, pos0, pos1, size0, size1) {
        let flag = false;
        if ((3 & (1 << event)) !== 0) {
          flag = pos0 >= 0 && pos0 < size0 && pos1 >= 0 && pos1 < size1;
          if (flag) {
            if ((3 & (1 << event)) !== 0) {
              flag = pos0 >= 0 && pos0 < size0 && pos1 >= 0 && pos1 < size1;
              if (flag) {
                if ((3 & (1 << event)) !== 0) {
                  flag = pos0 >= 0 && pos0 < size0 && pos1 >= 0 && pos1 < size1;
                  if (flag) {
                    if ((3 & (1 << event)) !== 0) {
                      let size0$ = Layout_$this.l8 - Layout_$this.l7;
                      let posDiff0 = Layout_$this.l7;
                      flag = pos0 >= posDiff0 && pos0 < posDiff0 + size0$ && pos1 >= 0 && pos1 < size1;
                      if (flag) {
                        pos0 = pos0 - posDiff0;
                        return (Layout_$this.a4.onEvent(event, pos0, pos1, size0$, size1));
                      }
                    }
                    if (!flag) {
                      if ((3 & (1 << event)) !== 0) {
                        let size0$ = Layout_$this.u5;
                        flag = pos0 >= 0 && pos0 < size0$ && pos1 >= 0 && pos1 < size1;
                        if (flag) {
                          return (Layout_$this.a1.onEvent(event, pos0, pos1, size0$, size1));
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
      this.a1 = new UI_$this.v1.ui_.Layout_();
      Main_$this.pushAttribute(4, UI_$this.v5);
      this.a2 = Main_$this.getTextSize(UI_$this.v2);
      Main_$this.popAttribute(4);
      this.a3 = (UI_$this.v6[0] << 16) | UI_$this.v6[1];
      this.a4 = new UI_$this.v7.ui_.Layout_();
      this.u5 = this.a1.size >> 16;
      this.u6 = this.a2 >> 16;
      this.u7 = this.a3 >> 16;
      this.l7 = this.u5 + this.u7;
      this.u8 = this.a4.size >> 16;
      this.l8 = this.l7 + this.u8;
      this.u9 = this.a1.size & 65535;
      this.u10 = this.a2 & 65535;
      this.u11 = this.a3 & 65535;
      this.l11 = Main_$this.max(this.u9, this.u11);
      this.u12 = this.a4.size & 65535;
      this.l12 = Main_$this.max(this.l11, this.u12);
      this.size = (this.l8 << 16) | this.l12;
    }
    this.v1 = CounterWidget$this.decButton;
    this.v2 = Main_$this.balls.size();
    this.v3 = ((50) / 100);
    this.v4 = ((50) / 100);
    this.v5 = 60;
    this.v6 = [120, 90];
    this.v7 = CounterWidget$this.incButton;
    this.v8 = Main_$this.COLOR_BLACK;
    this.v9 = Main_$this.oval;
    this.v10 = 16777215;
    this.v11 = ((80) / 100);
    this.v1.setUI_();
    this.v7.setUI_();
  }
  this.setUI_ = function() {
    CounterWidget$this.ui_ = new CounterWidget$this.UI_();
  }
  this.incButton = new this.Button("+", (function Lambda_() {
    new Main_$this.balls.Push();
  }));
  this.decButton = new this.Button("-", (function Lambda_() {
    if (Main_$this.balls.size() > 0)
      Main_$this.balls.pop();
  }));
}
this.UI_ = function() {
  const UI_$this = this;
  this.Layout_ = function() {
    const Layout_$this = this;
    this.paint = function(pos0, pos1, size0, size1) {
      {
        {
          Main_$this.pushAttribute(10, UI_$this.v3);
          Main_$this.rect(((pos0 << 16) | pos1), ((size0 << 16) | size1));
          Main_$this.popAttribute(10);
        }
        {
          Main_$this.pushAttribute(4, UI_$this.v5);
          Main_$this.pushAttribute(10, UI_$this.v6);
          Main_$this.pushAttribute(11, UI_$this.v7);
          let childSize0 = Layout_$this.u7;
          let posDiff0 = (size0 - childSize0) * UI_$this.v8[0];
          let size0$ = childSize0;
          let childSize1 = Layout_$this.u12;
          let posDiff1 = (size1 - childSize1) * UI_$this.v8[1];
          let size1$ = childSize1;
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
          Main_$this.displayText(UI_$this.v4, ((pos0$ << 16) | pos1$), ((size0$ << 16) | size1$));
          Main_$this.popAttribute(11);
          Main_$this.popAttribute(10);
          Main_$this.popAttribute(4);
        }
        {
          Main_$this.pushAttribute(4, UI_$this.v10);
          Main_$this.pushAttribute(10, UI_$this.v11);
          Main_$this.pushAttribute(11, UI_$this.v12);
          let childSize0 = Layout_$this.u8;
          let posDiff0 = (size0 - childSize0) * UI_$this.v13[0];
          let size0$ = childSize0;
          let childSize1 = Layout_$this.u13;
          let posDiff1 = (size1 - childSize1) * UI_$this.v13[1];
          let size1$ = childSize1;
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
          Main_$this.displayText(UI_$this.v9, ((pos0$ << 16) | pos1$), ((size0$ << 16) | size1$));
          Main_$this.popAttribute(11);
          Main_$this.popAttribute(10);
          Main_$this.popAttribute(4);
        }
        Layout_$this.a4.paint(pos0, pos1, size0, size1);
        {
          let childSize0 = Layout_$this.u10;
          let posDiff0 = (size0 - childSize0) * UI_$this.v16;
          let size0$ = childSize0;
          let childSize1 = Layout_$this.u15;
          let posDiff1 = (size1 - childSize1) * UI_$this.v16;
          let size1$ = childSize1;
          let pos0$ = pos0 + posDiff0;
          let pos1$ = pos1 + posDiff1;
          Layout_$this.a5.paint(pos0$, pos1$, size0$, size1$);
        }
      }
    }
    this.onEvent = function(event, pos0, pos1, size0, size1) {
      let flag = false;
      if ((3 & (1 << event)) !== 0) {
        flag = pos0 >= 0 && pos0 < size0 && pos1 >= 0 && pos1 < size1;
        if (flag) {
          if ((3 & (1 << event)) !== 0) {
            let childSize0 = Layout_$this.u10;
            let posDiff0 = (size0 - childSize0) * UI_$this.v16;
            let size0$ = childSize0;
            let childSize1 = Layout_$this.u15;
            let posDiff1 = (size1 - childSize1) * UI_$this.v16;
            let size1$ = childSize1;
            flag = pos0 >= posDiff0 && pos0 < posDiff0 + size0$ && pos1 >= posDiff1 && pos1 < posDiff1 + size1$;
            if (flag) {
              pos0 = pos0 - posDiff0;
              pos1 = pos1 - posDiff1;
              return (Layout_$this.a5.onEvent(event, pos0, pos1, size0$, size1$));
            }
          }
          if (!flag) {
          }
        }
      }
    }
    this.a1 = (UI_$this.v2[0] << 16) | UI_$this.v2[1];
    Main_$this.pushAttribute(4, UI_$this.v5);
    this.a2 = Main_$this.getTextSize(UI_$this.v4);
    Main_$this.popAttribute(4);
    Main_$this.pushAttribute(4, UI_$this.v10);
    this.a3 = Main_$this.getTextSize(UI_$this.v9);
    Main_$this.popAttribute(4);
    this.a4 = new UI_$this.v14.ui_.Layout_();
    this.a5 = new UI_$this.v15.ui_.Layout_();
    this.u6 = this.a1 >> 16;
    this.u7 = this.a2 >> 16;
    this.l7 = Main_$this.max(this.u6, this.u7);
    this.u8 = this.a3 >> 16;
    this.l8 = Main_$this.max(this.l7, this.u8);
    this.u9 = this.a4.size >> 16;
    this.l9 = Main_$this.max(this.l8, this.u9);
    this.u10 = this.a5.size >> 16;
    this.l10 = Main_$this.max(this.l9, this.u10);
    this.u11 = this.a1 & 65535;
    this.u12 = this.a2 & 65535;
    this.l12 = Main_$this.max(this.u11, this.u12);
    this.u13 = this.a3 & 65535;
    this.l13 = Main_$this.max(this.l12, this.u13);
    this.u14 = this.a4.size & 65535;
    this.l14 = Main_$this.max(this.l13, this.u14);
    this.u15 = this.a5.size & 65535;
    this.l15 = Main_$this.max(this.l14, this.u15);
    this.size = (this.l10 << 16) | this.l15;
  }
  this.v1 = Main_$this.rect;
  this.v2 = [800, 480];
  this.v3 = 4210752;
  this.v4 = "Bouncing";
  this.v5 = 130;
  this.v6 = 16777215;
  this.v7 = 9 / 16;
  this.v8 = [((50) / 100), ((10) / 100)];
  this.v9 = "Balls!!";
  this.v10 = 160;
  this.v11 = 16777215;
  this.v12 = 3 / 4;
  this.v13 = [((50) / 100), ((70) / 100)];
  this.v14 = Main_$this.balls;
  this.v15 = Main_$this.counter;
  this.v16 = ((95) / 100);
  this.v14.setUI_();
  this.v15.setUI_();
}
this.setUI_ = function() {
  Main_$this.ui_ = new Main_$this.UI_();
}
this.WIDTH = 1;
this.HEIGHT = 2;
this.OBLIQUE = 3;
this.COLOR_RED = 16711680;
this.COLOR_GREEN = 65280;
this.COLOR_YELLOW = 16776960;
this.COLOR_BLUE = 255;
this.COLOR_BLACK = 0;
Object.setPrototypeOf(this.QEDBaseArray_.prototype, Array.prototype);
Object.setPrototypeOf(this.SQEDArray.prototype, Array.prototype);
Object.setPrototypeOf(this.QEDArray.prototype, Array.prototype);
{
  let _d0 = 30;
  this.balls = this.qedArray([_d0], (function l(pos) {
    return (new Main_$this.Ball((function Lambda_() {
    })));
  }), (function UI_(array, dims) {
    this.array = array;
    this.dims = dims;
    const UI_$this = this;
    this.Layout_ = function() {
      const Layout_$this = this;
      this.paint = function(pos0, pos1, size0, size1) {
        {
          let index = 0;
          while(index < UI_$this.dims[0]) {
            Layout_$this.layouts[index].paint(pos0, pos1, size0, size1);
            index++;
          }
        }
      }
      this.layouts = [];
      {
        let index = 0;
        while(index < UI_$this.dims[0]) {
          this.layouts[index] = new UI_$this.array[index].ui_.Layout_();
          index++;
        }
      }
    }
    {
      let index = 0;
      while(index < this.dims[0]) {
        this.array[index].setUI_();
        index++;
      }
    }
  }));
  this.counter = new this.CounterWidget();
  (function while81$_() {
    new Main_$this.Animation((function Lambda_(_ret) {
      if (_ret) {
        Main_$this.process(Main_$this.balls);
        while81$_();
      }
    }));
  })();
}
Main_$this.pushAttribute(4, 20);
Main_$this.pushAttribute(10, 0);
Main_$this.pushAttribute(11, 1.0);
let layout_ = null;
function _refresh() {
//  if (ui_ != undefined && --postCount == 0) {
    Main_$this.setUI_();
    layout_ = new Main_$this.ui_.Layout_();
    ctx.globalAlpha = 1.0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    layout_.paint(0, 0, layout_.size >> 16, layout_.size & 65535);
//  }
}
Main_$this.executeEvents_();
canvas.addEventListener("mousedown", function(ev) {
  var rect = canvas.getBoundingClientRect();
  layout_.onEvent(0, ev.clientX - rect.left, ev.clientY - rect.top, layout_.size >> 16, layout_.size & 65535);
  Main_$this.executeEvents_();
  });
canvas.addEventListener("mouseup", function(ev) {
  var rect = canvas.getBoundingClientRect();
  layout_.onEvent(1, ev.clientX - rect.left, ev.clientY - rect.top, layout_.size >> 16, layout_.size & 65535);
  Main_$this.executeEvents_();
});
canvas.onselectstart = function () { return false; }
