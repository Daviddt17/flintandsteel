describe('SearchFilter', function() {

    var search;

    var testList = [
        {
            id: 0,
            title: "Idea One",
            author: "Test User 1",
            likes: 8
        },
        {
            id: 1,
            title: "Idea Dos",
            author: "Karl",
            likes: 200
        },
        {
            id: 3,
            title: "cAsE iNsEnSiTiVe",
            author: "Aaron Rodgers",
            likes: 13
        },
        {
            id: 4,
            title: "Broken-Spacebar<Uses:Punctuation?Instead",
            author: "Please*Fix&My%Keyboard$#@!()\'\"{}[]|\\/`~",
            likes: 1
        }
    ];

    beforeEach(module('flintAndSteel'));

    beforeEach(inject(function(_$filter_) {
        $filter = _$filter_;

        search = $filter('search');
    }));

    it('should return all results if the query is empty', function() {
        var query = undefined;
        expect(search(testList, query).length).toEqual(4);

        query = "";
        expect(search(testList, query).length).toEqual(4);
    });

    it('should return partials matches of titles by input string', function() {
        var query = "Idea";
        expect(search(testList, query).length).toEqual(2);
    });

    it('should return matches in real time', function() {
        var query = "Id";
        expect(search(testList, query).length).toEqual(2);

        query += "ea";
        expect(search(testList, query).length).toEqual(2);

        query += " One";
        expect(search(testList, query).length).toEqual(1);
    });

    it('should ignore punctuation', function() {
        var query = "BrokenSpacebarUsesPunctuationInstead";
        expect(search(testList, query).length).toEqual(1);

        query = "PleaseFixMyKeyboard";
        expect(search(testList, query).length).toEqual(1);
    });

    it('should be case-insensitive', function() {
        var query = "CaSe InSeNsItIvE";
        expect(search(testList, query).length).toEqual(1);
    });
});
