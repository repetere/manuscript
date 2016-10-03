import capitalize from 'capitalize';
import customSettings from '../../content/config/settings.json';

export function getComponentFromRouterLocation(location) {
  let locationArray = location.split('/');
  let appName = (locationArray[ 0 ].length > 0) ? locationArray[ 0 ] : locationArray[ 1 ];
  return capitalize(appName);
} 
export function getRouteExtensionFromLocation(location) {
  let locationArray = location.split('/');
  let appName = (locationArray[ 0 ].length > 0) ? locationArray[ 0 ] : locationArray[ 1 ];
  return `/${appName}`;
} 

export function getTabFromLocation (extensions, location) {
  if (!location) {
    return customSettings.defaultExtensionRoute || 'home';
  } else if (extensions[ location ]) {
    return location.toLowerCase();
  } else {
    return customSettings.defaultExtensionRoute || 'home';
  }
}
