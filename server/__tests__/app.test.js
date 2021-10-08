const request  = require ('supertest')
const express = require('express')
const app = require("../app.js")
describe ('API endpoints', () => {
    let api;
    let items = {
          "siteUrl": "gihpy.com",
          "body": "new post"
          };
    let comment = {"comments": "third comment"}

    beforeAll(() => {
        api = app.listen(5000, () => 
            console.log('Test server running on port 5000')
        );
    });
    afterAll((done) => {
        console.log('Stopping server')
        api.close(done)
    });
    it ('responds to / with status 200', done => {
        request(api).get('/').expect(200,done)
    })
    it ('responds to /comment/comments with status 200', done => {
        request(api).get('/comment/comments').expect(200, done)
    })
    it('GET /, responds with json', done => {
        request(api)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
    it ('GET /comment/comments responds with json', done => {
        request(api)
        .get('/comment/comments')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })
    it ('GET /comment/:cid responds with json', done => {
        request(api)
        .get('/comment/comments')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })
    it ('responds to post / with a new entry with an ID', done => {
        request(api)
            .post('/')
            .send(items)
            .set('Accept', 'application/json')
            .expect({message: 'done'}, done)
    })
    it ('retrieves comment by ID', done => {
        request(api)
        .get('/comments/1')
        .expect( ["new comment", "2nd comment"], done)  
    })
    it ('retrieves entry by ID', done => {
        request(api)
        .get('/1')
        .expect({
            "id": 1,
            "siteUrl": "giphy.com",
            "body": "first post",
            "comments": [
              "new comment", "2nd comment"
            ]
          }, done)  
    });
});