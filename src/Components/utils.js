import axios from 'axios';

var layer_names = {
  tidal_islands: { n: 'tidal island [s]', e: 'ðŸï¸' },
  inland_islands: { n: 'inland island [s]', e: 'ðŸï¸' },
  coral_islands: { n: 'coral island [s]', e: 'ðŸï¸' },
  desert_islands: { n: 'desert island [s]', e: 'ðŸï¸' },
  high_islands: { n: 'high island [s]', e: 'ðŸï¸' },
  other_islands: { n: 'island[other islands]', e: 'ðŸï¸' },
  hot_springs: { n: 'hot spring [s]', e: 'ðŸ’§' },
  geysers: { n: 'geyser [s]', e: 'ðŸ’§' },
  springs_others: { n: 'spring[other springs]', e: 'ðŸ’§' },
  mountain_peaks: { n: 'mountain peak [s]', e: 'â›°ï¸' },
  volcanoes: { n: 'volcano  [es]', e: 'â›°ï¸' },
  caves: { n: 'cave [s]', e: 'â›°ï¸' },
  canyons: { n: 'canyon [s]', e: 'â›°ï¸' },
  rock_formations: { n: 'rock formation [s]', e: 'â›°ï¸' },
  crater_lakes: { n: 'crater lake [s]', e: 'ðŸŒŠ' },
  rift_lakes: { n: 'rift lake [s]', e: 'ðŸŒŠ' },
  salt_lakes: { n: 'salt lake [s]', e: 'ðŸŒŠ' },
  dry_lakes: { n: 'dry lake [s]', e: 'ðŸŒŠ' },
  reservoirs: { n: 'reservoir [s]', e: 'ðŸŒŠ' },
  rivers: { n: 'river [s]', e: 'ðŸŒŠ' },
  canals: { n: 'canal [s]', e: 'ðŸŒŠ' },
  waterfalls: { n: 'waterfall [s]', e: 'ðŸŒŠ' },
  lagoons: { n: 'lagoon [s]', e: 'ðŸŒŠ' },
  other_lakes: { n: 'lake[other lakes]', e: 'ðŸŒŠ' },
  golden_sand_beaches: { n: 'golden sand beach  [es]', e: 'ðŸ–ï¸' },
  white_sand_beaches: { n: 'white sand beach  [es]', e: 'ðŸ–ï¸' },
  black_sand_beaches: { n: 'black sand beach  [es]', e: 'ðŸ–ï¸' },
  shingle_beaches: { n: 'shingle beach  [es]', e: 'ðŸ–ï¸' },
  rocks_beaches: { n: 'rocks beach  [es]', e: 'ðŸ–ï¸' },
  urbans_beaches: { n: 'urbans beach  [es]', e: 'ðŸ–ï¸' },
  nude_beaches: { n: 'nude beach  [es]', e: 'ðŸ–ï¸' },
  other_beaches: { n: 'beach[other beaches]', e: 'ðŸ–ï¸' },
  aquatic_protected_areas: { n: 'aquatic protected area [s]', e: 'ðŸžï¸' },
  wildlife_reserves: { n: 'wildlife reserve [s]', e: 'ðŸžï¸' },
  national_parks: { n: 'national park [s]', e: 'ðŸžï¸' },
  nature_reserves_others: {
    n: 'nature reserve[other nature reserves]',
    e: 'ðŸžï¸',
  },
  natural_monuments: { n: 'natural monument [s]', e: 'ðŸžï¸' },
  other_nature_conservation_areas: {
    n: 'nature conservation area [s]',
    e: 'ðŸžï¸',
  },
  glaciers: { n: 'Glacier [s]', e: 'ðŸ”ï¸' },
  national_museums: { n: 'national museum [s]', e: 'ðŸ›ï¸' },
  local_museums: { n: 'local museum [s]', e: 'ðŸ›ï¸' },
  maritime_museums: { n: 'maritime museum [s]', e: 'ðŸ›ï¸' },
  railway_museums: { n: 'railway museum [s]', e: 'ðŸ›ï¸' },
  aviation_museums: { n: 'aviation museum [s]', e: 'ðŸ›ï¸' },
  automobile_museums: { n: 'automobile museum [s]', e: 'ðŸ›ï¸' },
  computer_museums: { n: 'computer museum [s]', e: 'ðŸ›ï¸' },
  heritage_railways: { n: 'heritage railway [s]', e: 'ðŸ›ï¸' },
  other_technology_museums: {
    n: 'technology museum[other technology museums]',
    e: 'ðŸ›ï¸',
  },
  science_museums: { n: 'science museum [s]', e: 'ðŸ›ï¸' },
  planetariums: { n: 'planetarium [s]', e: 'ðŸ›ï¸' },
  military_museums: { n: 'military museum [s]', e: 'ðŸ›ï¸' },
  history_museums: { n: 'history museum [s]', e: 'ðŸ›ï¸' },
  archaeological_museums: { n: 'archaeological museum [s]', e: 'ðŸ›ï¸' },
  biographical_museums: { n: 'biographical museum [s]', e: 'ðŸ›ï¸' },
  open_air_museums: { n: 'open-air museum [s]', e: 'ðŸ›ï¸' },
  fashion_museums: { n: 'fashion museum [s]', e: 'ðŸ›ï¸' },
  children_museums: { n: 'children museum [s]', e: 'ðŸ›ï¸' },
  historic_house_museums: { n: 'historic house museum [s]', e: 'ðŸ›ï¸' },
  art_galleries: { n: 'art gallery  [ies]', e: 'ðŸ›ï¸' },
  zoos: { n: 'zoo [s]', e: 'ðŸ›ï¸' },
  aquariums: { n: 'aquarium [s]', e: 'ðŸ›ï¸' },
  other_museums: { n: 'museum[other museums]', e: 'ðŸ›ï¸' },
  sylvan_theatres: { n: 'sylvan theatre [s]', e: 'ðŸŽ­' },
  opera_houses: { n: 'opera house [s]', e: 'ðŸŽ­' },
  music_venues: { n: 'music venue [s]', e: 'ðŸŽ­' },
  concert_halls: { n: 'concert hall [s]', e: 'ðŸŽ­' },
  puppetries: { n: 'puppetry  [ies]', e: 'ðŸŽ­' },
  children_theatres: { n: 'Ñhildren\u0027s theatre [s]', e: 'ðŸŽ­' },
  other_theatres: { n: 'theatre[other theatres]', e: 'ðŸŽ­' },
  cinemas: { n: 'movie theatre [s]', e: 'ðŸŽ­' },
  circuses: { n: 'circus  [es]', e: 'ðŸŽ­' },
  wall_painting: { n: 'wall painting', e: 'â›²' },
  squares: { n: 'street[squares and streets]', e: 'â›²' },
  installation: { n: 'installation', e: 'â›²' },
  gardens_and_parks: { n: 'park[gardens and parks]', e: 'â›²' },
  fountains: { n: 'fountain [s]', e: 'â›²' },
  sculptures: { n: 'sculpture [s]', e: 'â›²' },
  historic_districts: { n: 'historic district [s]', e: 'ðŸ›¡ï¸' },
  historic_settlements: { n: 'historic settlement [s]', e: 'ðŸ›¡ï¸' },
  fishing_villages: { n: 'fishing village [s]', e: 'ðŸ›¡ï¸' },
  battlefields: { n: 'battlefield [s]', e: 'ðŸ›¡ï¸' },
  castles: { n: 'castle [s]', e: 'ðŸ°' },
  hillforts: { n: 'hillfort [s]', e: 'ðŸ°' },
  fortified_towers: { n: 'fortified tower [s]', e: 'ðŸ°' },
  defensive_walls: { n: 'defensive wall [s]', e: 'ðŸ°' },
  bunkers: { n: 'bunker [s]', e: 'ðŸ°' },
  kremlins: { n: 'kremlin [s]', e: 'ðŸ°' },
  other_fortifications: { n: 'fortification[other fortifications]', e: 'ðŸ°' },
  milestones: { n: 'milestone [s]', e: 'ðŸ—¿' },
  monuments: { n: 'monument [s]', e: 'ðŸ—¿' },
  megaliths: { n: 'megalith [s]', e: 'ðŸº' },
  menhirs: { n: 'menhir [s]', e: 'ðŸº' },
  roman_villas: { n: 'roman villa [s]', e: 'ðŸº' },
  cave_paintings: { n: 'cave painting [s]', e: 'ðŸº' },
  settlements: { n: 'settlement [s]', e: 'ðŸº' },
  rune_stones: { n: 'rune stone [s]', e: 'ðŸº' },
  other_archaeological_sites: { n: 'archaeological site [s]', e: 'ðŸº' },
  cemeteries: { n: 'cemetery  [ies]', e: 'âš±ï¸' },
  war_graves: { n: 'war grave [s]', e: 'âš±ï¸' },
  necropolises: { n: 'necropolis  [es]', e: 'âš±ï¸' },
  dolmens: { n: 'dolmen [s]', e: 'âš±ï¸' },
  tumuluses: { n: 'tumulus  [es]', e: 'âš±ï¸' },
  mausoleums: { n: 'mausoleum [s]', e: 'âš±ï¸' },
  war_memorials: { n: 'war memorial [s]', e: 'âš±ï¸' },
  crypts: { n: 'crypt [s]', e: 'âš±ï¸' },
  other_burial_places: { n: 'burial place[other burial places]', e: 'âš±ï¸' },
  eastern_orthodox_churches: { n: 'eastern orthodox church  [es]', e: 'â›ª' },
  catholic_churches: { n: 'catholic church  [es]', e: 'â›ª' },
  other_churches: { n: 'church[other churches]', e: 'â›ª' },
  cathedrals: { n: 'cathedral [s]', e: 'ðŸ›' },
  mosques: { n: 'mosque [s]', e: 'ðŸ•Œ' },
  synagogues: { n: 'synagogue [s]', e: 'ðŸ•' },
  buddhist_temples: { n: 'buddhist temple [s]', e: 'â˜¸ï¸' },
  hindu_temples: { n: 'hindu temple [s]', e: 'ðŸ•‰ï¸' },
  egyptian_temples: { n: 'egyptian temple [s]', e: 'ðŸ›' },
  other_temples: { n: 'temple[other temples]', e: 'ðŸ›' },
  monasteries: { n: 'monastery  [ies]', e: 'ðŸ›' },
  pyramids: { n: 'pyramid [s]', e: 'ðŸ¡' },
  amphitheatres: { n: 'amphitheatre [s]', e: 'ðŸ¡' },
  triumphal_archs: { n: 'triumphal arch [s]', e: 'ðŸ¡' },
  palaces: { n: 'palace [s]', e: 'ðŸ¡' },
  manor_houses: { n: 'manor house [s]', e: 'ðŸ¡' },
  wineries: { n: 'wineries', e: 'ðŸ¡' },
  farms: { n: 'farms', e: 'ðŸ¡' },
  other_buildings_and_structures: {
    n: 'structure[buildings and structures]',
    e: 'ðŸ¡',
  },
  destroyed_objects: { n: 'destroyed object [s]', e: 'ðŸ¡' },
  skyscrapers: { n: 'Skyscraper [s]', e: 'ðŸ™ï¸' },
  moveable_bridges: { n: 'moveable bridge [s]', e: 'ðŸŒ‰' },
  stone_bridges: { n: 'stone bridge [s]', e: 'ðŸŒ‰' },
  viaducts: { n: 'viaduct [s]', e: 'ðŸŒ‰' },
  roman_bridges: { n: 'Roman bridge [s]', e: 'ðŸŒ‰' },
  footbridges: { n: 'footbridge [s]', e: 'ðŸŒ‰' },
  aqueducts: { n: 'aqueduct [s]', e: 'ðŸŒ‰' },
  suspension_bridges: { n: 'suspension bridge [s]', e: 'ðŸŒ‰' },
  other_bridges: { n: 'bridge[other bridges]', e: 'ðŸŒ‰' },
  observation_towers: { n: 'observation tower [s]', e: 'ðŸ—¼' },
  watchtowers: { n: 'watchtower [s]', e: 'ðŸ—¼' },
  water_towers: { n: 'water tower [s]', e: 'ðŸ—¼' },
  transmitter_towers: { n: 'transmitter tower [s]', e: 'ðŸ—¼' },
  clock_towers: { n: 'clock tower [s]', e: 'ðŸ—¼' },
  bell_towers: { n: 'bell tower [s]', e: 'ðŸ—¼' },
  minarets: { n: 'minaret [s]', e: 'ðŸ—¼' },
  other_towers: { n: 'tower[other towers]', e: 'ðŸ—¼' },
  lighthouses: { n: 'Lighthouse [s]', e: 'ðŸ—¼' },
  railway_stations: { n: 'Railway station [s]', e: 'ðŸ­' },
  factories: { n: 'Factory  [ies]', e: 'ðŸ­' },
  mints: { n: 'Mint [s]', e: 'ðŸ­' },
  power_stations: { n: 'Power station [s]', e: 'ðŸ­' },
  dams: { n: 'Dam [s]', e: 'ðŸ­' },
  mills: { n: 'Mill [s]', e: 'ðŸ­' },
  abandoned_railway_stations: { n: 'Abandoned railway station [s]', e: 'ðŸ­' },
  abandoned_mineshafts: { n: 'Abandoned mineshaft [s]', e: 'ðŸ­' },
  mineshafts: { n: 'Mineshaft [s]', e: 'ðŸ­' },
  other_buildings: { n: 'Building[Other buildings]', e: 'ðŸ­' },
  sundials: { n: 'Sundial [s]', e: 'ðŸ“¸' },
  view_points: { n: 'View point [s]', e: 'ðŸ“¸' },
  red_telephone_boxes: { n: 'Red telephone box  [es]', e: 'ðŸ“¸' },
  tourist_object: { n: 'tourist attraction [s]', e: 'ðŸ“¸' },
  historic_object: { n: 'historic attraction [s]', e: 'ðŸ“¸' },
  amusement_parks: { n: 'amusement park [s]', e: 'ðŸ“¸' },
  miniature_parks: { n: 'miniature park [s]', e: 'ðŸ“¸' },
  water_parks: { n: 'water park [s]', e: 'ðŸ“¸' },
  roller_coasters: { n: 'roller coaster [s]', e: 'ðŸ“¸' },
  ferris_wheels: { n: 'ferris wheel [s]', e: 'ðŸ“¸' },
  other_amusement_rides: {
    n: 'amusement ride[other amusement rides]',
    e: 'ðŸ“¸',
  },
  saunas: { n: 'sauna[s]', e: 'ðŸ“¸' },
  thermal_baths: { n: 'thermal bath [s]', e: 'ðŸ“¸' },
  open_air_baths: { n: 'open-air bath [s]', e: 'ðŸ“¸' },
  other_bathhouses: { n: 'bathhouse [s]', e: 'ðŸ“¸' },
  skiing: { n: 'skiing', e: 'ðŸ“¸' },
  cross_country_skiing: { n: 'cross country skiing', e: 'ðŸ“¸' },
  other_winter_sports: { n: 'winter sport[other winter sports]', e: 'ðŸ“¸' },
  dive_centers: { n: 'dive center [s]', e: 'ðŸ“¸' },
  dive_spots: { n: 'dive spot [s]', e: 'ðŸ“¸' },
  wrecks: { n: 'wreck [s]', e: 'ðŸ“¸' },
  climbing: { n: 'climbing', e: 'ðŸ“¸' },
  surfing: { n: 'surfing', e: 'ðŸ“¸' },
  kitesurfing: { n: 'kitesurfing', e: 'ðŸ“¸' },
  stadiums: { n: 'stadium [s]', e: 'ðŸ“¸' },
  pools: { n: 'pool [s]', e: 'ðŸ“¸' },
  strip_clubs: { n: 'strip club [s]', e: 'ðŸ“¸' },
  casino: { n: 'casino', e: 'ðŸ“¸' },
  brothels: { n: 'brothel [s]', e: 'ðŸ“¸' },
  nightclubs: { n: 'nightclub [s]', e: 'ðŸ“¸' },
  alcohol: { n: 'alcohol', e: 'ðŸ“¸' },
  adult_hotels: { n: 'love hotel [s]', e: 'ðŸ“¸' },
  erotic_shops: { n: 'erotic shop [s]', e: 'ðŸ“¸' },
  hookah: { n: 'hookah', e: 'ðŸ“¸' },
  car_rental: { n: 'Car rental', e: 'ðŸ“¸' },
  car_sharing: { n: 'Car sharing', e: 'ðŸ“¸' },
  car_wash: { n: 'Car wash', e: 'ðŸ“¸' },
  charging_station: { n: 'Charging station [s]', e: 'ðŸ“¸' },
  bicycle_rental: { n: 'Bicycle rental', e: 'ðŸ“¸' },
  boat_sharing: { n: 'Boat sharing', e: 'ðŸ“¸' },
  fuel: { n: 'Fuel', e: 'ðŸ“¸' },
  supermarkets: { n: 'Supermarket [s]', e: 'ðŸ“¸' },
  conveniences: { n: 'Convenience [s]', e: 'ðŸ“¸' },
  fish_stores: { n: 'Fish store [s]', e: 'ðŸ“¸' },
  outdoor: { n: 'Outdoor', e: 'ðŸ“¸' },
  malls: { n: 'Mall [s]', e: 'ðŸ“¸' },
  marketplaces: { n: 'Marketplace [s]', e: 'ðŸ“¸' },
  bakeries: { n: 'Bakery  [ies]', e: 'ðŸ“¸' },
  restaurants: { n: 'Restaurant [s]', e: 'ðŸ“¸' },
  cafes: { n: 'Cafe [s]', e: 'ðŸ“¸' },
  fast_food: { n: 'Fast food', e: 'ðŸ“¸' },
  food_courts: { n: 'Food court [s]', e: 'ðŸ“¸' },
  pubs: { n: 'Pub [s]', e: 'ðŸ“¸' },
  bars: { n: 'Bar [s]', e: 'ðŸ“¸' },
  biergartens: { n: 'Biergarten [s]', e: 'ðŸ“¸' },
  picnic_site: { n: 'Picnic site [s]', e: 'ðŸ“¸' },
  bank: { n: 'Bank [s]', e: 'ðŸ“¸' },
  atm: { n: 'ATM', e: 'ðŸ“¸' },
  bureau_de_change: { n: 'Bureau de change', e: 'ðŸ“¸' },
  apartments: { n: 'Apartment [s]', e: 'ðŸ“¸' },
  guest_houses: { n: 'Guest house [s]', e: 'ðŸ“¸' },
  campsites: { n: 'Campsite [s]', e: 'ðŸ“¸' },
  resorts: { n: 'Resort [s]', e: 'ðŸ“¸' },
  motels: { n: 'Motel [s]', e: 'ðŸ“¸' },
  other_hotels: { n: 'Hotel [s]', e: 'ðŸ“¸' },
  hostels: { n: 'Hostel [s]', e: 'ðŸ“¸' },
  villas_and_chalet: { n: 'Villa [Villas and chalet]', e: 'ðŸ“¸' },
  alpine_hut: { n: 'Alpine hut [s]', e: 'ðŸ“¸' },
  love_hotels: { n: 'Love hotel [s]', e: 'ðŸ“¸' },
};

var isoCountries = {
  AD: 'Andorra',
  AE: 'United Arab Emirates',
  AF: 'Afghanistan',
  AG: 'Antigua and Barbuda',
  AI: 'Anguilla',
  AL: 'Albania',
  AM: 'Armenia',
  AN: 'Netherlands Antilles',
  AO: 'Angola',
  AQ: 'Antarctica',
  AR: 'Argentina',
  AS: 'American Samoa',
  AT: 'Austria',
  AU: 'Australia',
  AW: 'Aruba',
  AX: 'Ã…land Islands',
  AZ: 'Azerbaijan',
  BA: 'Bosnia and Herzegovina',
  BB: 'Barbados',
  BD: 'Bangladesh',
  BE: 'Belgium',
  BF: 'Burkina Faso',
  BG: 'Bulgaria',
  BH: 'Bahrain',
  BI: 'Burundi',
  BJ: 'Benin',
  BL: 'Saint BarthÃ©lemy',
  BM: 'Bermuda',
  BN: 'Brunei',
  BO: 'Bolivia',
  BQ: 'Bonaire, Saint Eustatius, and Saba',
  BR: 'Brazil',
  BS: 'Bahamas',
  BT: 'Bhutan',
  BV: 'Bouvet Island',
  BW: 'Botswana',
  BY: 'Belarus',
  BZ: 'Belize',
  CA: 'Canada',
  CC: 'Cocos [Keeling] Islands',
  CD: 'Belgian Congo',
  CF: 'Central African Republic',
  CG: 'Republic of the Congo',
  CH: 'Switzerland',
  CI: 'Ivory Coast',
  CK: 'Cook Islands',
  CL: 'Chile',
  CM: 'Cameroon',
  CN: 'China',
  CO: 'Colombia',
  CR: 'Costa Rica',
  CS: 'Serbia and Montenegro',
  CU: 'Cuba',
  CV: 'Cape Verde',
  CW: 'CuraÃ§ao',
  CX: 'Christmas Island',
  CY: 'Cyprus',
  CZ: 'Czech Republic',
  DE: 'Germany',
  DJ: 'Djibouti',
  DK: 'Denmark',
  DM: 'Dominica',
  DO: 'Dominican Republic',
  DZ: 'Algeria',
  EC: 'Ecuador',
  EE: 'Estonia',
  EG: 'Egypt',
  EH: 'Western Sahara',
  ER: 'Eritrea',
  ES: 'Spain',
  ET: 'Ethiopia',
  FI: 'Finland',
  FJ: 'Fiji',
  FK: 'Falkland Islands',
  FM: 'Micronesia',
  FO: 'Faroe Islands',
  FR: 'France',
  GA: 'Gabon',
  GB: 'United Kingdom',
  GD: 'Grenada',
  GE: 'Georgia',
  GF: 'French Guiana',
  GG: 'Guernsey',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GL: 'Greenland',
  GM: 'The Gambia',
  GN: 'Guinea',
  GP: 'Guadeloupe',
  GQ: 'Equatorial Guinea',
  GR: 'Greece',
  GS: 'South Georgia and the South Sandwich Islands',
  GT: 'Guatemala',
  GU: 'Guam',
  GW: 'Guinea-Bissau',
  GY: 'Guyana',
  HK: 'Hong Kong',
  HM: 'Heard Island and McDonald Islands',
  HN: 'Honduras',
  HR: 'Croatia',
  HT: 'Haiti',
  HU: 'Hungary',
  ID: 'Indonesia',
  IE: 'Ireland',
  IL: 'Israel',
  IM: 'Isle of Man',
  IN: 'India',
  IO: 'British Indian Ocean Territory',
  IQ: 'Iraq',
  IR: 'Iran',
  IS: 'Iceland',
  IT: 'Italy',
  JE: 'Jersey',
  JM: 'Jamaica',
  JO: 'Hashemite Kingdom of Jordan',
  JP: 'Japan',
  KE: 'Kenya',
  KG: 'Kyrgyzstan',
  KH: 'Cambodia',
  KI: 'Kiribati',
  KM: 'Comoros',
  KN: 'St Kitts and Nevis',
  KP: 'North Korea',
  KR: 'Republic of Korea',
  KW: 'Kuwait',
  KY: 'Cayman Islands',
  KZ: 'Kazakhstan',
  LA: 'Laos',
  LB: 'Lebanon',
  LC: 'St Lucia',
  LI: 'Liechtenstein',
  LK: 'Sri Lanka',
  LR: 'Liberia',
  LS: 'Lesotho',
  LT: 'Republic of Lithuania',
  LU: 'Luxembourg',
  LV: 'Latvia',
  LY: 'Libya',
  MA: 'Morocco',
  MC: 'Monaco',
  MD: 'Republic of Moldova',
  ME: 'Montenegro',
  MF: 'Saint Martin',
  MG: 'Madagascar',
  MH: 'Marshall Islands',
  MK: 'Macedonia',
  ML: 'Mali',
  MM: 'Myanmar [Burma]',
  MN: 'Mongolia',
  MO: 'Macao',
  MP: 'Northern Mariana Islands',
  MQ: 'Martinique',
  MR: 'Mauritania',
  MS: 'Montserrat',
  MT: 'Malta',
  MU: 'Mauritius',
  MV: 'Maldives',
  MW: 'Malawi',
  MX: 'Mexico',
  MY: 'Malaysia',
  MZ: 'Mozambique',
  NA: 'Namibia',
  NC: 'New Caledonia',
  NE: 'Niger',
  NF: 'Norfolk Island',
  NG: 'Nigeria',
  NI: 'Nicaragua',
  NL: 'Netherlands',
  NO: 'Norway',
  NP: 'Nepal',
  NR: 'Republic of Nauru',
  NU: 'Niue',
  NZ: 'New Zealand',
  OM: 'Oman',
  PA: 'Panama',
  PE: 'Peru',
  PF: 'French Polynesia',
  PG: 'Papua New Guinea',
  PH: 'Philippines',
  PK: 'Pakistan',
  PL: 'Poland',
  PM: 'Saint Pierre and Miquelon',
  PN: 'Pitcairn Islands',
  PR: 'Puerto Rico',
  PS: 'Palestine',
  PT: 'Portugal',
  PW: 'Palau',
  PY: 'Paraguay',
  QA: 'Qatar',
  RE: 'RÃ©union',
  RO: 'Romania',
  RS: 'Serbia',
  RU: 'Russia',
  RW: 'Rwanda',
  SA: 'Saudi Arabia',
  SB: 'Solomon Islands',
  SC: 'Seychelles',
  SD: 'Sudan',
  SE: 'Sweden',
  SG: 'Singapore',
  SH: 'Saint Helena',
  SI: 'Slovenia',
  SJ: 'Svalbard and Jan Mayen',
  SK: 'Slovakia',
  SL: 'Sierra Leone',
  SM: 'San Marino',
  SN: 'Senegal',
  SO: 'Somalia',
  SR: 'Suriname',
  SS: 'Republic of South Sudan',
  ST: 'SÃ£o TomÃ© and PrÃ­ncipe',
  SV: 'El Salvador',
  SX: 'Sint Maarten',
  SY: 'Syria',
  SZ: 'Swaziland',
  TC: 'Turks and Caicos Islands',
  TD: 'Chad',
  TF: 'French Southern Territories',
  TG: 'Togo',
  TH: 'Thailand',
  TJ: 'Tajikistan',
  TK: 'Tokelau',
  TL: 'East Timor',
  TM: 'Turkmenistan',
  TN: 'Tunisia',
  TO: 'Tonga',
  TR: 'Turkey',
  TT: 'Trinidad and Tobago',
  TV: 'Tuvalu',
  TW: 'Taiwan',
  TZ: 'Tanzania',
  UA: 'Ukraine',
  UG: 'Uganda',
  UM: 'U.S. Minor Outlying Islands',
  US: 'United States of America',
  UY: 'Uruguay',
  UZ: 'Uzbekistan',
  VA: 'Vatican City',
  VC: 'St Vincent and Grenadines',
  VE: 'Venezuela',
  VG: 'British Virgin Islands',
  VI: 'U.S. Virgin Islands',
  VN: 'Vietnam',
  VU: 'Vanuatu',
  WF: 'Wallis and Futuna',
  WS: 'Samoa',
  XK: 'Republic of Kosovo',
  YE: 'Yemen',
  YT: 'Mayotte',
  ZA: 'Republic of South Africa',
  ZM: 'Zambia',
  ZW: 'Zimbabwe',
};

function getCountryName(countryCode) {
  if (isoCountries.hasOwnProperty(countryCode)) {
    return isoCountries[countryCode];
  } else {
    return countryCode;
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function parsePlural(label) {
  var sb_single = new Array('');
  var sb_plural = new Array('');
  var spaces = 0;
  for (var i = 0; i < label.length; i++) {
    var ch = label.charAt(i);
    if (ch !== '[') {
      sb_single.push(ch);
      sb_plural.push(ch);
      if (ch === ' ') {
        spaces++;
      } else {
        spaces = 0;
      }
    } else {
      var sb = new Array('');
      var j = i + 1;
      for (; j < label.length; j++) {
        ch = label.charAt(j);
        if (ch === ']') break;
        sb.push(ch);
      }
      var len = j - i - 1;
      i = sb_plural.length;
      sb_plural.splice(Math.max(0, i - len), len);
      sb_plural.push(sb.join(''));
      if (spaces !== 0) {
        i = sb_single.length;
        sb_single.splice(Math.max(0, i - spaces), spaces);
      }
      i = j;
    }
  }
  return {
    single: capitalizeFirstLetter(sb_single.join('')),
    plural: sb_plural.join(''),
  };
}

function getCategoryName(kinds) {
  let names = [];
  kinds.split(',').forEach(function (kind) {
    let item = layer_names[kind];
    if (item) names.push(parsePlural(item.n).single);
  });
  return names.join(', ');
}

function translateToFr(text, html) {
  const instance = axios.create({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const params = new URLSearchParams();
  params.append('text', text);
  params.append('target_lang', 'FR');
  params.append('auth_key', 'eaae3cc7-a694-0fe6-0af0-aa4c66603ffd:fx');
  console.log('test');
  instance
    .post('https://api-free.deepl.com/v2/translate', params)
    .then((response) => {
      document.getElementById('translated').innerHTML =
        response.data.translations[0].text;
    });
}

async function geocode(text) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open(
    'GET',
    `https://eu1.locationiq.com/v1/search.php?key=pk.1068016fbc83f847aece90d1538aa7dc&q=${text}&format=json&matchquality=1&postaladdress=1`,
    false,
  );
  xmlHttp.send(null);
  let json = JSON.parse(xmlHttp.responseText);
  console.log(json);
  return json.length
    ? json
        .filter((x) => x.display_name.includes('Île-de-France'))
        .sort((a, b) =>
          a.matchquality.matchcode === 'exact'
            ? -1
            : b.matchquality.matchcode === 'exact'
            ? 1
            : 0,
        )
    : json;
}

function reverseGeocode(lat, lon) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open(
    'GET',
    `http://api.positionstack.com/v1/reverse?access_key=b180ed08657c0ee40df930a551d6d543&query=${lat},${lon}`,
    false,
  );
  xmlHttp.send(null);
  let json = JSON.parse(xmlHttp.responseText);
  console.log(json);
  return json;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function getPlaces(lat, lon) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open(
    'GET',
    `https://api.opentripmap.com/0.1/en/places/radius?format=json&rate=3&radius=5000&lon=${lon}&lat=${lat}&apikey=5ae2e3f221c38a28845f05b66447f16fc3298981969822996d987309`,
    false,
  );
  xmlHttp.send(null);
  let json = JSON.parse(xmlHttp.responseText);
  return json;
}

function getMapsUrl(place, lat, lon) {
  return `https://www.google.com/maps/dir/${lat},${lon}/${place.lat},${place.lon}`;
}

const utils = {
  getCategoryName,
  translateToFr,
  geocode,
  getDistanceFromLatLonInKm,
  getPlaces,
  getMapsUrl,
  reverseGeocode,
};

export default utils;
