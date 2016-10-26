const TraceStep = require('./index');
const assert = require("chai").assert;
const debug = require('debug')('test');


describe('test case', () => {
    it('exectly match', () => {
        let ts = new TraceStep();

        ts.step(1);
        ts.step(2);
        ts.step(1);

        assert(ts.match(1,2,1));
        assert(!ts.match(1,1,2));
    });

    it('resemble match', () => {
        let ts = new TraceStep();

        ts.step(1);
        ts.step(2);
        ts.step(1);

        assert(ts.resemble(1,1,2));
    });

    it('async', (done) => {
        let ts = new TraceStep();
        done = ts.wrap(done);
        ts.step(1);

        setTimeout(()=>{
            assert(ts.match(1));
            done();
        }, 1000);
    });

    it('async fail if not call match or resemble', (done) => {
        let ts = new TraceStep();
        let old_done = done;
        done = ts.wrap(done);
        ts.step(1);

        setTimeout(()=>{
            assert.throws(()=>{
                done();
            });
            old_done();
        }, 500);

    });
});