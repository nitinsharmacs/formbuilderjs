const fs = require('fs');
const {
  createHtml,
  createLabel,
  createInput,
  createImage,
  createDiv,
  createAnchor,
  createHtmlTemplate
} = require('./html.js');

const formInput = ({ label, value }) => {
  const inputLabel = createLabel({ text: label, classes: ['form-label'] });
  const input = createInput({ text: value, classes: ['form-input'] })
  return createHtml({
    tag: 'section',
    content: inputLabel + input,
    classes: ['form-details-section']
  });
};

const formLogo = ({ src, name: alt }) => {
  return createDiv({
    content: createImage({ src, alt, classes: [] }),
    classes: ['form-logo']
  });
};

const formButton = ({ label }) => {
  return createAnchor({
    content: label,
    href: '#',
    classes: ['form-btn', 'primary']
  });
};

const formHeader = (headerDetails) => {
  const formName = createHtml({
    tag: 'h1',
    content: headerDetails['form-name'],
    classes: []
  });
  const nameDiv = createDiv({ content: formName, classes: ['form-name'] });
  return createHtml({
    tag: 'header',
    content: formLogo(headerDetails['form-logo']) + nameDiv,
    classes: []
  });
};

const formInputs = (formInputs) => {
  const inputs = formInputs.map(formInputDetail => {
    return formInput(formInputDetail);
  }).join('');
  return createHtml({
    tag: 'div',
    content: inputs,
    classes: ['form-details']
  });
};

const formControls = (controls) => {
  const buttons = controls.map(control => {
    return formButton(control);
  }).join(' ');
  return createDiv({
    content: buttons,
    classes: ['form-controls']
  });
};

const createForm = (form) => {
  const header = formHeader(form['form-header']);
  const inputs = formInputs(form['form-inputs']);
  const controls = formControls(form['form-controls']);
  return createHtml({
    tag: 'div',
    content: header + inputs + controls,
    classes: ['form-body', 'form-shadow']
  });
};

const formPage = (form) => {
  const formHtml = createForm(form);
  return createHtmlTemplate({
    head: {
      title: 'Form builder',
      cssLinks: ['./css/form.css']
    },
    body: formHtml
  });
};

const main = (formFilePath) => {
  try {
    const form = JSON.parse(fs.readFileSync(formFilePath, 'utf8'));
    fs.writeFileSync('./public/index.html', formPage(form), 'utf8');
    return 'SUCCESS';
  } catch (error) {
    return 'ERROR';
  }
};

console.log(main(process.argv[2]));
