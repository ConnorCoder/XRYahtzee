let game = {
  players: {
    min: 1,
    max: 8,
    cur: 2,
    sel: 0,
    update: function() {
      g("playerCount").innerHTML = this.cur;
    },
    data: {}
  },
  update: function() {
    let data = game.players.data[Object.keys(game.players.data)[game.players.sel]];
    g("playerCount2").innerHTML = data.displayName;
    g("name").innerHTML = Object.keys(game.players.data)[game.players.sel];

    let keys = Object.keys(data);
    let vals = [25, 30, 40, 50];
    let upper = 0;
    let lower = 0;
    let bonus = 0;
    for(let x=1;x<keys.length;x++) {
      let v = data[keys[x]];
      let i = keys[x];
      if(typeof v === "number") {
        bonus = 100 * v;
      }else {
        if(v.t) {
          if(!isNaN(parseInt(v.v))) {
            if(x > 6) {
              lower += parseInt(v.v);
            }else {
              upper += parseInt(v.v);
            }
          }
          g(i).value = v.v;
        }else {
          g(i).checked = v.v;
          if(v.v) {
            lower += vals[x - 10];
          }
        }
      }
    }
    keys = ["yaht1","yaht2","yaht3"];
    for(let x=0;x<keys.length;x++) {
      if(data.bonus > x) {
        g(keys[x]).checked = true;
      }else {
        g(keys[x]).checked = false;
      }
    }
    lower += bonus;
    g("upper1").value = upper;
    if(upper >= 63) {
      upper+=35;
      g("bonus").checked = true;
    }else {
      g("bonus").checked = false;
    }
    g("upper").value = upper;
    g("uppert").value = upper;

    g("lowert").value = lower;
    g("total").value = upper + lower;
  },
  save: function() {
    let data = game.players.data[Object.keys(game.players.data)[game.players.sel]];
    data.displayName = g("playerCount2").innerHTML;

    let keys = Object.keys(data);
    for(let x=1;x<keys.length;x++) {
      if(typeof data[keys[x]] === "number") {
        let s = 0;
        for(let x=1;x<4;x++) {
          if(g("yaht" + x).checked) {
            s++;
          }
        }
        data[keys[x]] = s;
      }else {
        if(data[keys[x]].t) {
          data[keys[x]].v = g(keys[x]).value;
        }else {
          data[keys[x]].v = g(keys[x]).checked;
        }
      }
    }

    game.players.data[Object.keys(game.players.data)[game.players.sel]] = data;
  }
}
g("players").addEventListener("click", function(e) {
  if(e.target.tagName === "BUTTON") {
    if(e.target.className === "left") {
      game.players.cur -= 1;
      if(game.players.cur < game.players.min) {
        game.players.cur = game.players.min;
      }
    }else if(e.target.className === "right") {
      game.players.cur += 1;
      if(game.players.cur > game.players.max) {
        game.players.cur = game.players.max;
      }
    }else if(e.target.className === "sub") {
      game.players.data = {};
      g("players").style.display = "none";
      g("data").style.display = null;
      create();
    }
    game.players.update();
  }
});
function create() {
  for(let x=0;x<game.players.cur;x++) {
    let p = "Player " + (x + 1);
    game.players.data["Player " + (x + 1)] = {
      displayName: p,
      aces: {t:true,v:""},
      twos: {t:true,v:""},
      threes: {t:true,v:""},
      fours: {t:true,v:""},
      fives: {t:true,v:""},
      sixes: {t:true,v:""},
      "3ofk": {t:true,v:""},
      "4ofk": {t:true,v:""},
      chance: {t:true,v:""},
      full: {t:false,v:false},
      small: {t:false,v:false},
      large: {t:false,v:false},
      yahtzee: {t:false,v:false},
      bonus: 0
    }
  }
  g("playerChange").addEventListener("click", function(e) {
    game.save();
    if(e.target.tagName === "BUTTON") {
      if(e.target.className === "left") {
        game.players.sel--;
        if(game.players.sel < 0) {
          game.players.sel = game.players.cur - 1;
        }
        game.update();
      }else if(e.target.className === "right") {
        game.players.sel++;
        if(game.players.sel > game.players.cur - 1) {
          game.players.sel = 0;
        }
        game.update();
      }
    }
  });
  game.update();
}
function role(t) {
  let dice = [];
  for(let x=0;x<t;x++){
    dice.push(Math.floor(Math.random() * 6) + 1);
  }
  return dice;
}

function g(i) {
  return document.getElementById(i);
}
