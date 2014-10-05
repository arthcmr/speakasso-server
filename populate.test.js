var superagent = require('superagent')
var expect = require('expect.js')

describe('Perception API server: Populate', function() {

    it('succeeds inserting portuguese response', function(done) {
        superagent.post('http://localhost:3000/insert')
            .send({
                email: "test@test.com",
                language: "portuguese",
                responses: [{
                    id: "turtle",
                    high: true,
                    color: true,
                    correct: 'l',
                    response: 'l',
                    time: 387
                }, {
                    id: "bird",
                    high: true,
                    color: false,
                    correct: 'l',
                    response: 'r',
                    time: 507
                }]
            })
            .end(function(e, res) {
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(res.body.success).to.eql(true);
                done();
            });
    });

    it('succeeds inserting english response', function(done) {
        superagent.post('http://localhost:3000/insert')
            .send({
                email: "test2@test.com",
                language: "english",
                responses: [{
                    id: "turtle",
                    high: true,
                    color: true,
                    correct: 'l',
                    response: 'l',
                    time: 387
                }, {
                    id: "bird",
                    high: true,
                    color: false,
                    correct: 'r',
                    response: 'r',
                    time: 507
                }]
            })
            .end(function(e, res) {
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(res.body.success).to.eql(true);
                done();
            });
    });
});