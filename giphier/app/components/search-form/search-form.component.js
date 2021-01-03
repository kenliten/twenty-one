const SearchForm = {
    templateUrl: './app/components/search-form/search-form.template.html',
    controller: 'SearchFormController',
    controllerAs: '$ctrl'
}

angular.module('SearchFormModule')
    .component('searchForm', SearchForm);