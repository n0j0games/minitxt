const electronInstaller = require('electron-winstaller');

async function install(){
  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: '/tmp/build/my-app-64',
      outputDirectory: '/tmp/build/installer64',
      authors: 'Noah Schütte',
      version: "0.0.1",
      iconUrl: "images/logo.ico",
      exe: 'minitxt.exe'
    });
    console.log('It worked!');
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }
}
