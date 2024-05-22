import '@testing-library/jest-dom';
import 'matchmedia-polyfill';
import 'matchmedia-polyfill/matchMedia.addListener';

// Optionally, you can mock matchMedia to always return true for your tests
window.matchMedia = window.matchMedia || function () {
    return {
        matches: true,
        addListener: function () { },
        removeListener: function () { }
    };
};