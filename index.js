const debug = require("debug")('trace-step');
const def = require("def-schema");
const assert = require('assert');

class TraceStep {
    constructor() {
        this.steps = [];
        this.isDone = false;
    }

    step(name) {
        def.or(String, Number, Boolean).validate(name);
        debug('step', name);
        this.steps.push(name);
    }

    match(...steps) {
        def([def.or(String, Number, Boolean)]).validate(steps);
        debug('match', ...steps);
        this.isDone = true;
        return this.__equals(this.steps, steps);
    }

    resemble(...steps) {
        def([def.or(String, Number, Boolean)]).validate(steps);
        debug('resemble', steps);
        this.isDone = true;
        return this.__equals(this.steps.sort(), steps.sort());
    }

    wrap(done) {
        def(Function).validate(done);
        debug('wrap', done.name);
        return (result)=> {
            assert(this.isDone, 'trace-step.match or trace-step.resemble had not been call before done.');
            done(result);
        };
    }
    __equals(self, target) {
        debug('__equals', self, target);
        if(target === undefined) {
            return false;
        }
        if(self.length !== target.length) {
            return false;
        }
        for(let i=0; i<self.length; i++) {
            if(self[i] !== target[i]) {
                return false;
            }
        }
        return true;
    }
}

debug('running');
module.exports = TraceStep;