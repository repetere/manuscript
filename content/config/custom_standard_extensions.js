import Home from '../theme/components/Home';
import Pipelines from '../theme/components/Pipelines';
import Stats from '../theme/components/Stats';
import StatsItems from '../theme/components/Stats/items';
import StatsItemDetail from '../theme/components/Stats/itemDetail';
import Credit from '../theme/components/Credit';

exports.custom_extensions = {
  Home,
  Pipelines,
  Stats,
  Credit,
};
exports.custom_routes = {
  '/':Home,
  '/home':Home,
  '/pipelines':Pipelines,
  '/stats':Stats,
  '/stats/items':StatsItems,
  '/stats/items/:id':StatsItemDetail,
  '/credit':Credit,
};

// export default custom_extensions;