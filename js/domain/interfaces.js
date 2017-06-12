//JS.require('JS.Class', function () {
    eaf.util.namespace('becu_org.ui');

    becu_org.ui.IDroppableViewModel = new JS.Interface([
        'dropped'
    ]);

    becu_org.ui.IDropTargetViewModel = new JS.Interface([
        'droppedOn'
    ]);

    becu_org.ui.IDeletable = new JS.Interface([
        'canDeleteNow', 'deleteNow'
    ]);

    becu_org.ui.IValidateable = new JS.Interface([
        'isValid', 'setRequirement'
    ]);

    becu_org.ui.IRequirement = new JS.Interface([
        'type', 'requiredFields', 'nonRequiredFields', 'viewModel', 'requirementMetIconUrl', 'requirementUnmetIconUrl'
    ]);
//});