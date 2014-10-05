var superagent = require('superagent')
var expect = require('expect.js')

describe('Perception API server', function() {

    it('retrieves strings', function(done) {
        superagent.get('http://localhost:3000/getAll')
            .end(function(e, res) {
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(typeof res.body.i18n).to.eql('object');
                expect(typeof res.body.experiment).to.eql('object');
                done();
            });
    });

    it('retrieves the translated strings in portuguese', function(done) {
        superagent.get('http://localhost:3000/getAll')
            .query({
                lang: 'portuguese'
            })
            .end(function(e, res) {
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(typeof res.body.i18n).to.eql('object');
                expect(typeof res.body.i18n.portuguese).to.eql('object');
                expect(typeof res.body.experiment).to.eql('object');
                expect(res.body.i18n.portuguese.words.brick).to.eql('tijolo');
                done();
            });
    });

    it('fails when inserting empty entries', function(done) {
        superagent.post('http://localhost:3000/insert')
            .send({
                entry: {}
            })
            .end(function(e, res) {
                expect(e).to.eql(null);
                expect(res.body.success).to.eql(false);
                done();
            });
    });

    it('succeeds when inserting expected entries', function(done) {
        superagent.post('http://localhost:3000/insert')
            .send({
                email: "test@test.com",
                language: "portuguese",
                responses: [{
                    id: "turtle",
                    hcd: true,
                    color: true,
                    correct: 'l',
                    response: 'l',
                    time: 387
                }, {
                    id: "bird",
                    hcd: true,
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

    it('gets entries from a specific user', function(done) {
        superagent.get('http://localhost:3000/get')
            .query({
                email: 'test@test.com'
            })
            .end(function(e, res) {
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(typeof res.body.success).to.eql('undefined');
                expect(res.body[0].email).to.eql('test@test.com');
                done();
            });
    });

    it('gets all results', function(done) {
        superagent.get('http://localhost:3000/results')
            .end(function(e, res) {
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(typeof res.body.responses).to.eql('object');
                expect(typeof res.body.analysis).to.eql('object');
                done();
            });
    });

    it('gets results filtered with the analysis only', function(done) {
        superagent.get('http://localhost:3000/results')
            .query({
                q: 'analysis'
            })
            .end(function(e, res) {
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(typeof res.body.responses).to.eql('undefined');
                expect(typeof res.body.analysis).to.eql('object');
                done();
            });
    });

    it('gets user speficic results', function(done) {
        superagent.get('http://localhost:3000/results')
            .query({
                email: 'test@test.com'
            })
            .end(function(e, res) {
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(typeof res.body.responses).to.eql('object');
                expect(typeof res.body.analysis).to.eql('object');
                done();
            });
    });


    it('removes entries from a specific user', function(done) {
        superagent.del('http://localhost:3000/remove')
            .send({
                email: 'test@test.com'
            })
            .end(function(e, res) {
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(res.body.success).to.eql(true);
                done();
            });
    });
});