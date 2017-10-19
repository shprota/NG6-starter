import angular from 'angular';
//import  './ttsClient';

let ttsModule = angular.module('tts', [])
  .run(() => {
    console.log("Tts: ", __globalTtsLogger);
  })
  .name;

export default ttsModule;
