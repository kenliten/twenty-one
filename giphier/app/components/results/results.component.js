const Results = {
    templateUrl: './app/components/results/results.template.html',
    controller: 'ResultsController',
    controllerAs: '$ctrl'
}

angular.module('ResultsModule', [])
    .component('results', Results);