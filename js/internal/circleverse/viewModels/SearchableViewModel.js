
    eaf.util.namespace('circleverse.viewModel');

    //alert('hi');

    circleverse.viewModel.SearchableViewModel = (function () {



        return new JS.Module("circleverse.viewModel.SearchableViewModel", {

            initialize: function (object, parent, globalSettings, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
                //include: [becu_org.ui.viewModel.baseModule],
                var self = this;
                
                self.callSuper();
                //properties

                self.globalSettings = globalSettings;

                self.childViewModels.push(new circleverse.viewModel.SearchViewModel(object, parent, globalSettings, opts));

            }
            


        });
    })();

