JS.require('JS.Class', function () {
    eaf.util.namespace('becu_org.communication.service');

    becu_org.communication.service.ICallSpec = new JS.Interface([
        'isReady', 'add', 'necessaryRemaining', 'flush'
    ]);

    becu_org.communication.service.IServiceMethodConfig = new JS.Interface([
        'uri', 'templateId', 'templateUri', 'instanceTemplateUri', 'viewUri', 'instanceViewUri',
        'callSpec', 'name', 'id', 'businessClass', 'tracker'
    ]);

    becu_org.communication.service.ITemplateTracker = new JS.Interface([
        'types', 'instances', 'add'
    ]);
});