eaf.util.namespace('circleverse.viewModel');

circleverse.viewModel.AllBusinessCentersViewModel = (function () {

    return new JS.Class("circleverse.viewModel.AllBusinessCentersViewModel", circleverse.viewModel.RussianDollCircle, {
        //include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule],


        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            //properties



            this.self = this;
            var self = this;

            //for structures so huge that each ring item is itself a solar
            //system, the solar system will be passed in
            this.businessServices = object || ko.observableArray(this.getBusinessServices());


            this.callSuper(this.businessServices, parent, globalSettings, 120);
        }
        ,

        getBusinessServices: function () {
            var busCenters = [{ id: '1', name: 'Member Solutions', subCenters:
                [
                { id: '1', name: "All NFC's and Financial Centers", description: "Sales and service of our members' deposit and loan accounts through the NFC/Lobby delivery channel", subCenters: [] }
                , { id: '1', name: "Business Development", description: "Development of partnerships with local businesses", subCenters: [] }
                , { id: '1', name: "Member Loyalty", description: "Corporate event staffing", subCenters: [] }
                , { id: '1', name: "Member Experience", description: "Managing our Net Promoter Program", subCenters: [] }
                ]
            }
, { id: '1', name: 'Lending', subCenters:
                [
                { id: '1', name: "Consumer Lending", description: "", subCenters: [] }
                , { id: '1', name: "Mortgage Lending", description: "", subCenters: [] }
                , { id: '1', name: "Indirect Lending", description: "CUDL - Vehicle Dealerships", subCenters: [] }
                , { id: '1', name: "Member Risk Model", description: "", subCenters: [] }
                ]
}
, { id: '1', name: 'Member Care', subCenters:
                [
                { id: '1', name: "Contact Center", description: "Front Line member Phone Support", subCenters: [] }
                , { id: '1', name: "Member Lending Solutions", description: "Responsible for assisting members with their consumer and mortgage loan application needs over the phone", subCenters: [] }
                , { id: '1', name: "Internal Support", description: "back office support that assists both internal and external members with deposit related items - wires/ACH, OME, IRA, Deceased, mail", subCenters: [] }
                , { id: '1', name: "Servicing Solutions", description: "back office support responsible for Loan Maintenance, Adjustments/Titles, Visa, Home Equity", subCenters: [] }
                , { id: '1', name: "ATM and Debit Care Services", description: "", subCenters: [] }
                ]
}
, { id: '1', name: 'Virtual Banking', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
, { id: '1', name: 'Security / Fraud', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
, { id: '1', name: 'Accounting', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
, { id: '1', name: 'Audit', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
, { id: '1', name: 'Facilities and Risk Management', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
, { id: '1', name: 'IT', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
, { id: '1', name: 'Legal/Compliance', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
, { id: '1', name: 'Marketing', subCenters:
                [
                { id: '1', name: "Marketing", description: "Promotions; Web site content", subCenters: [] }
                , { id: '1', name: "Community Affairs", description: "Employee Volunteer opptunities; Gift Matching; Corporate Giving; BECU Foundation", subCenters: [] }
                , { id: '1', name: "Financial Education", description: "Seminars and Workshops", subCenters: [] }
                , { id: '1', name: "Public and Media Relations", description: "", subCenters: [] }
                ]
}
, { id: '1', name: 'Portfolio Management', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
, { id: '1', name: 'Product-Delivery Channel Management', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
, { id: '1', name: 'Small Business Services', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
, { id: '1', name: 'Talent Management - Operational Performance and Development and Recruiting', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
, { id: '1', name: 'Total Rewards', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
, { id: '1', name: 'Treasury', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
//, { id: '1', name: 'Wealth Management', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
//, { id: '1', name: 'Trust Services', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
//, { id: '1', name: 'Treasury', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
//, { id: '1', name: 'Wealth Management', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
//, { id: '1', name: 'Trust Services', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
//, { id: '1', name: 'Treasury', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
//, { id: '1', name: 'Wealth Management', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
//, { id: '1', name: 'Trust Services', subCenters: [{ id: '1', name: "All", description: "channel", subCenters: []}] }
];

            return busCenters;
        }
    });
})();
