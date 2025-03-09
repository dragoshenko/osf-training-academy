server.get("EditAddress", function (req, res, next) {
    var addressForm = server.forms.getForm("address"); 
    addressForm.clear();
    
    res.render("account/editAddress", {
        addressForm: addressForm
    });
});
