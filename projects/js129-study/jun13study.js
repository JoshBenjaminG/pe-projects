// ==================================================================
// PROTOTYPE PRACTICE — CONDENSED PROBLEM SET
// ==================================================================


// ------------------------------------------------------------------
// PROBLEM 1: Replacing Dog.prototype with bare literal, BEFORE new
// Concept: bare-literal replacement removes auto `constructor`
// ------------------------------------------------------------------
'use strict';

function Dog(name) { this.name = name; }

Dog.prototype = {
  bark() { console.log(`${this.name} barks.`); }
};

let dog = new Dog('Rex');

console.log(Dog.prototype.hasOwnProperty('constructor'));  // false
console.log(dog.constructor === Dog);                       // false
console.log(dog.constructor === Object);                    // true
// dog -> Dog.prototype (literal, no constructor) -> Object.prototype
// constructor lookup falls through to Object.prototype.constructor === Object


// ------------------------------------------------------------------
// PROBLEM 2: Replacing Cat.prototype AFTER new
// Concept: instance.[[Prototype]] is set at `new` time and doesn't update
// ------------------------------------------------------------------
'use strict';

function Cat(name) { this.name = name; }

let cat = new Cat('Whiskers');                       // linked to ORIGINAL Cat.prototype
Cat.prototype = { meow() { console.log(`meow`); } }; // Cat.prototype now points elsewhere

console.log(cat.constructor === Cat);                       // true
console.log(cat.constructor === Object);                    // false
console.log(Cat.prototype.hasOwnProperty('constructor'));   // false
console.log(cat instanceof Cat);                            // false
// cat's chain still has the original Cat.prototype (with auto constructor: Cat),
// but `instanceof` uses the CURRENT Cat.prototype, which is a different object


// ------------------------------------------------------------------
// PROBLEM 3: Class with constructor, prototype property, static method
// Concept: own vs. prototype property, where class methods/statics live
// ------------------------------------------------------------------
'use strict';

class Robot {
  constructor(id) {
    this.id = id;
    this.history = [];
  }
  log(action) { this.history.push(action); }
  static count() { return 'I count robots'; }
}

Robot.prototype.species = 'mechanical';

let r1 = new Robot('R1');
let r2 = new Robot('R2');
r1.log('boot');
r2.log('shutdown');

console.log(r1.history);                              // ['boot']
console.log(r2.history);                              // ['shutdown']  (separate own array per instance)
console.log(r1.species);                              // 'mechanical'  (walks chain to Robot.prototype)
console.log(r1.hasOwnProperty('species'));            // false  (lives on Robot.prototype)
console.log(r1.hasOwnProperty('history'));            // true   (set via this.history in constructor)
console.log(r1.hasOwnProperty('log'));                // false  (class methods live on Robot.prototype)
console.log(Robot.prototype.hasOwnProperty('log'));   // true
console.log(Robot.count());                           // 'I count robots'
console.log(r1.count());                              // TypeError: r1.count is not a function
// static methods live on Robot itself, NOT Robot.prototype — r1's chain never reaches them


// ------------------------------------------------------------------
// PROBLEM 4: Six-scenario `.constructor` drill
// Concept: `.constructor` is a property lookup; behavior under
//          reassignment, mutation, shadowing, and Object.create
// ------------------------------------------------------------------
'use strict';

// --- A: default ---
function Wolf(name) { this.name = name; }
let wolf = new Wolf('Grey');
console.log(wolf.constructor === Wolf);                // true
// chain walks to Wolf.prototype, finds auto constructor: Wolf

// --- B: prototype replaced with bare literal ---
function Fox(name) { this.name = name; }
Fox.prototype = { yip() {} };
let fox = new Fox('Red');
console.log(fox.constructor === Fox);                  // false
console.log(fox.constructor === Object);               // true
// constructor falls through to Object.prototype.constructor

// --- C: prototype replaced WITH constructor manually included ---
function Owl(name) { this.name = name; }
Owl.prototype = {
  constructor: Owl,
  hoot() {}
};
let owl = new Owl('Hedwig');
console.log(owl.constructor === Owl);                  // true
// constructor restored as an own property of the new prototype literal

// --- D: prototype's constructor property MUTATED after new ---
function Bear(name) { this.name = name; }
let bear = new Bear('Yogi');
Bear.prototype.constructor = Array;                    // MUTATE, not reassign
console.log(bear.constructor === Bear);                // false
console.log(bear.constructor === Array);               // true
// bear's [[Prototype]] still points at the SAME object — we just edited its
// constructor property. Mutation reaches every instance through the live link.

// --- E: shadowing on the instance ---
function Deer(name) { this.name = name; }
let deer = new Deer('Bambi');
deer.constructor = 'spooky';
console.log(deer.constructor === Deer);                // false
console.log(deer.constructor);                         // 'spooky'
// own property on deer shadows whatever's on the prototype

// --- F: Object.create ---
function Otter() {}
let otter = Object.create(Otter.prototype);
console.log(otter.constructor === Otter);              // true
// Otter.prototype was never touched; auto constructor: Otter is still there


// ------------------------------------------------------------------
// PROBLEM 5: Five-scenario `instanceof` drill
// Concept: is the CURRENT Fn.prototype in the instance's chain?
// ------------------------------------------------------------------
'use strict';

// --- A: default ---
function Wolf() {}
let w = new Wolf();
console.log(w instanceof Wolf);              // true

// --- B: reassign BEFORE new ---
function Fox() {}
Fox.prototype = { yip() {} };
let f = new Fox();
console.log(f instanceof Fox);               // true
// new used the new prototype; Fox.prototype and f.[[Prototype]] agree

// --- C: reassign AFTER new ---
function Owl() {}
let o = new Owl();
Owl.prototype = { hoot() {} };
console.log(o instanceof Owl);               // false
// o is stranded on the original prototype; current Owl.prototype is elsewhere

// --- D: Object.create ---
function Bear() {}
let b = Object.create(Bear.prototype);
console.log(b instanceof Bear);              // true
// b is linked directly to Bear.prototype

// --- E: class extends ---
class Animal {}
class Dog extends Animal {}
let rex = new Dog();
console.log(rex instanceof Dog);             // true
console.log(rex instanceof Animal);          // true
console.log(rex instanceof Object);          // true
// chain: rex -> Dog.prototype -> Animal.prototype -> Object.prototype -> null


// ==================================================================
// KEY RULES (for quick reference)
// ==================================================================
//
// 1. Every property access (obj.x) walks the [[Prototype]] chain.
// 2. `new Fn()` reads Fn.prototype AT THAT MOMENT and uses that
//    reference as the new instance's [[Prototype]] link.
// 3. REASSIGNING Fn.prototype later doesn't update existing instances.
//    They keep their reference to the original prototype object.
// 4. MUTATING Fn.prototype.someProperty IS visible to all instances,
//    because they share the link to that same object.
// 5. `.constructor` is just a property lookup — easy to break (replace
//    prototype, mutate constructor property, or shadow on instance).
// 6. `instanceof` is a chain-membership check by identity against the
//    CURRENT Fn.prototype — unaffected by mutating the prototype's
//    properties, but defeated by reassigning Fn.prototype after `new`.
// 7. Class syntax: regular methods -> Constructor.prototype.
//                  static methods -> Constructor itself.
//                  this.x = ... in constructor -> own property per instance.