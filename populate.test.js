var superagent = require('superagent')
var expect = require('expect.js')

describe('SPEAKASSO API server: Populate', function() {

    // it('succeeds inserting english response', function(done) {
    //     superagent.post('http://localhost:3000/insert')
    //         .send({
    //             email: "test2@test.com",
    //             language: "english",
    //             responses: [{
    //                 id: "turtle",
    //                 hcd: true,
    //                 color: true,
    //                 correct: 'l',
    //                 response: 'l',
    //                 time: 387
    //             }, {
    //                 id: "bird",
    //                 hcd: false,
    //                 color: true,
    //                 correct: 'r',
    //                 response: 'r',
    //                 time: 390
    //             }]
    //         })
    //         .end(function(e, res) {
    //             expect(e).to.eql(null);
    //             expect(typeof res.body).to.eql('object');
    //             expect(res.body.success).to.eql(true);
    //             done();
    //         });
    // });
});