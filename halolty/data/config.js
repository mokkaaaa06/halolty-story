/* project configuration for colours, animation speed, music and testing */
const config = {
  COLOURS: {
    background: '#FFF5F8',
    primaryPink: '#F7B6C8',
    accentPink: '#E88AA8',
    button: '#F48FB1',
    text: '#4A3B44',
    goldAccent: '#E8C76A',
  },
  ANIMATION_SPEED: {
    reveal: 180,
    celebration: 2800,
  },
  MUSIC_FILENAME: 'Frank_Sinatra_-_It_Had_To_Be_You_When_Harry_Met_Sally_OST_(mp3.pm).mp3',
  TEST_MODE: false,
  TEST_START_DATE: '2026-07-07T00:59:00Z',
  RELATIONSHIP_DATE: '2026-07-07T00:59:00Z',
  DEVELOPER_SETTINGS: {
    enableLogging: false,
  },
};

function RESET_COUNTER() {
  localStorage.removeItem('relationshipStart');
  location.reload();
}
