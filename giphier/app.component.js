const GiphierComponent = {
    templateUrl: './app.template.html',
    controller: 'GiphierController',
    controllerAs: '$ctrl'
}

angular.module('Giphier')
    .Component('GiphierComponent', GiphierComponent);