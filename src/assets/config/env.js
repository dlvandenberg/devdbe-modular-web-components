(function (window) {
    // Create __env if it does not exist
    window.__env = window.__env || { };

    // Set paths read by the libs (would be backend URLs)
    window.__env.halvePath = 'http://localhost:8080/halved-backend';
    window.__env.doublePath = 'http://localhost:8081/doubled-backend';
}(this));
