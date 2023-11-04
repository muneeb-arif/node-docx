var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');
const HTMLModule = require("docxtemplater-html-module");
const checkbox = ['Plan managed', 'Self-managed', 'NDIA managed', 'other'];
 
var fs = require('fs');
var path = require('path');
 
// The error object contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
function replaceErrors(key, value) {
    if (value instanceof Error) {
        return Object.getOwnPropertyNames(value).reduce(function(error, key) {
            error[key] = value[key];
            return error;
        }, {});
    }
    return value;
}
 
function errorHandler(error) {
    console.log(JSON.stringify({error: error}, replaceErrors));
 
    if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors.map(function (error) {
            return error.properties.explanation;
        }).join("\n");
        console.log('errorMessages', errorMessages);
        // errorMessages is a humanly readable message looking like this :
        // 'The tag beginning with "foobar" is unopened'
    }
    throw error;
}
 
//Load the docx file as a binary
var content = fs
    .readFileSync(path.resolve(__dirname, 'Participant_Intake_Form.docx'), 'binary');
 
var zip = new PizZip(content);
var doc;
try {
    doc = new Docxtemplater(zip, {
        modules: [new HTMLModule({})],
    })

} catch(error) {
    // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
    errorHandler(error);
}
 
//set the templateVariables
doc.setData({
    full_name: 'Xavior',
    ndis_number: 'Xavior',
    plan_date_from: 'Xavior',
    plan_date_to: 'Xavior',
    review_date: 'Xavior',
    dob: 'Xavior',
    full_name: 'Xavior',
    gender: 'Xavior',
    address: 'Xavior',
    state:  'Xavior',
    email: 'Xavior',
    phone: 'Xavior',
    contact_person: 'Xavior',
    diagnosis_concerns: 'Xavior',
    country: 'Xavior',
    years_in_australia:'Xavior',
    language_spoken: 'Xavior',
    emergency_fullname: 'Xavior',
    emergency_relationship: 'Xavior',
    emergency_home_phone: 'Xavior',
    emergency_mobile_phone: 'Xavior',
    emergency_fullname_secondary: 'Xavior',
    emergency_fullname_secondary:'Xavior',
    emergency_home_phone_secondary: 'Xavior',
    emergency_mobile_phone_secondary: 'Xavior',
    gp_clinic_name: 'Xavior',
    gp_email_address: 'Xavior',
    gp_surname: 'Xavior',
    gp_first_name: 'Xavior',
    gp_address: 'Xavior',
    gp_telephone: 'Xavior',
    gp_mobile: 'Xavior'
});
 
try {
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render({ funding_checkbox: "<b>Hello</b>, Foo !" });
}
catch (error) {
    // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
    errorHandler(error);
}
 
var buf = doc.getZip()
             .generate({type: 'nodebuffer', compression: "DEFLATE"});
 
// buf is a nodejs buffer, you can either write it to a file or do anything else with it.
fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);