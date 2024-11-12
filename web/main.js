import { AppRegistry } from 'react-native';
import Index from '../app/index';
import { name as appName } from '../app.json';
import { render } from 'react-dom';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById('root'),
});
