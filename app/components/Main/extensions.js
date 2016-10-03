import Apps from '../../extensions/Apps';
import Home from '../../extensions/Home';
import More from '../../extensions/More';
import Notifications from '../../extensions/Notifications';
import Profile from '../../extensions/Profile';
import Settings from '../../extensions/Settings';
import Login from '../../extensions/Login';
import { custom_standard_extensions, custom_routes, } from '../../../content/config/custom_standard_extensions';
import { scene,  } from 'scene-router'



let AppRoutesComponents = Object.assign({
  '/':Home,
  '/home':Home,
  '/apps':Apps,
  '/more':More,
  '/profile':Profile,
  '/notifications':Notifications,
  '/settings':Settings,
  '/login':Login,
}, custom_routes);

let AppRoutes = {};
Object.keys(AppRoutesComponents).forEach((key) => {
  AppRoutes[ key ] = scene({ path: key, })(AppRoutesComponents[ key ]);
});

exports.AppRoutes = AppRoutes;
exports.AppExtensions = Object.assign({
  Apps,
  Home,
  More,
  Notifications,
  Profile,
  Settings,
  Login,
}, custom_standard_extensions);