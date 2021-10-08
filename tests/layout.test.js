const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    describe('head', () => {
        test('it has a title', () => {
            const head = document.querySelector('head')
            expect(head).toBeTruthy();
        });
    })
})

    describe('header', () => {
        test('header exists', () => {
            expect(document.getElementById('homeBtn')).toBeTruthy();
        })
    })

    test('it has a header tile', () => {
        let header = document.getElementById('homeBtn');
        expect(header.textContent).toContain('Home');
    })

    test('it has a header tile', () => {
        let header = document.getElementById('homeBtn');
        expect(header.textContent).toContain('Home');
    })

    test('it has jornal name', () => {
        let journalName = document.getElementById('title');
        expect(journalName.textContent).toContain('Journ-It');
    })

    test('it has a GIF button', () => {
        let btnGif = document.getElementById('gifButton')
        expect(btnGif.textContent).toContain('Search GIFs')
    })

    test('text entry has character count', () => {
        let charCount = document.getElementById('charcount')
        expect(charCount.textContent).toContain('0/300')
    })

    test('it has a submit button', () => {
        let submitButton = document.querySelector('submitButton');
        expect(submitButton).toBeFalsy();
    })