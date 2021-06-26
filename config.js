const nconf = require('nconf');

nconf.file({ file: 'config.json' });

window.addEventListener('load', () => {
  console.log(nconf.get());
  if (nconf.file == null){
    return;
  }
    fontConf();
    colorConf();
});

function colorConf(){
  let background = nconf.get('colors:background');
  let darkAccent = nconf.get('colors:darkAccent');
  let lightAccent = nconf.get('colors:lightAccent');
  let number = nconf.get('colors:number');
  let UItext = nconf.get('colors:UItext');
  let text = nconf.get('colors:text');

  if (background != null){ document.documentElement.style.setProperty('--background', background); }
  if (darkAccent != null){ document.documentElement.style.setProperty('--mid', darkAccent); }
  if (lightAccent != null){ document.documentElement.style.setProperty('--front', lightAccent); }
  if (number != null){ document.documentElement.style.setProperty('--number', lightAccent); }
  if (UItext != null){ document.documentElement.style.setProperty('--text', UItext); }
  if (text != null){ document.documentElement.style.setProperty('--fieldtext', text); }
}

function fontConf(){
  let font = nconf.get('font:name');
  let type = nconf.get('font:type');
  let weight = nconf.get('font:weight');
  let size = nconf.get('font:size');

  console.log("CONFIG:");

  console.log("> Size : " + size);
  if (size != undefined){
    document.documentElement.style.setProperty('--size', `${size}px`);
  }

  var prefonts = ["Roboto Mono","Roboto","Cutive Mono","JetBrains Mono","Barlow"];

  if (font != undefined && type != undefined){
    if (prefonts.includes(font)){
      link=document.createElement('link');
      link.href=`https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&display=swap`;
      link.rel='stylesheet';
      document.getElementsByTagName('head')[0].appendChild(link);
      console.log("> Font : " + font);
      console.log("> Type : " + type);
      document.documentElement.style.setProperty('--font', `"${font}", ${type}`);
      return;
    }

    console.log("> Font : " + font);
    console.log("> Type : " + type);
    document.documentElement.style.setProperty('--font', `"${font}", ${type}`);
  }

  if (weight > 900 || weight % 100 != 0){
    console.log("> Invalid value for weight");
    weight = 400;
  } else if ((font === "Barlow" || font === "Roboto") && (weight == 200 || weight == 600)){
    console.log("> Invalid weight for Barlow/Roboto");
    weight = 400;
  } else if (font === "Roboto Mono" && weight == 900){
    console.log("> Invalid weight for Roboto Mono");
    weight = 400;
  } else {
    console.log("> Weight : " + weight);
  }
  document.documentElement.style.setProperty('--weight', `${weight}`);
}
