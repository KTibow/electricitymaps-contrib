import { hasPathDatetime, parsePath } from './pathUtils';

describe('pathUtils', () => {
  describe('parsePath', () => {
    it('should return null for empty path', () => {
      expect(parsePath('')).equals(null);
    });

    it('should parse zone path correctly', () => {
      expect(parsePath('/zone/US-CA')).to.deep.equal({
        type: 'zone',
        zoneId: 'US-CA',
      });

      expect(parsePath('/zone/US-CA/hourly')).to.deep.equal({
        type: 'zone',
        zoneId: 'US-CA',
        timeAverage: 'hourly',
      });

      expect(parsePath('/zone/US-CA/hourly/2024-10-20T08:00:00Z')).to.deep.equal({
        type: 'zone',
        zoneId: 'US-CA',
        timeAverage: 'hourly',
        datetime: '2024-10-20T08:00:00Z',
      });
    });

    it('should return null for invalid zone path', () => {
      expect(parsePath('/zone')).equals(null);
    });

    it('should parse map path correctly', () => {
      expect(parsePath('/map')).to.deep.equal({
        type: 'map',
      });

      expect(parsePath('/map/daily')).to.deep.equal({
        type: 'map',
        timeAverage: 'daily',
      });

      expect(parsePath('/map/daily/2024-10-20T08:00:00Z')).to.deep.equal({
        type: 'map',
        timeAverage: 'daily',
        datetime: '2024-10-20T08:00:00Z',
      });
    });

    it('should return null for unknown route type', () => {
      expect(parsePath('/unknown')).equals(null);
    });
  });

  describe('hasPathDatetime', () => {
    it('should return true for zone path with timeAverage', () => {
      expect(hasPathDatetime('/zone/US-CA/hourly')).equals(false);
      expect(hasPathDatetime('/map/2024-10-20T08:00:00Z')).equals(true);
      expect(hasPathDatetime('/2024-10-20T08:00:00Z')).equals(true);
      expect(hasPathDatetime('/zone/US-CA/daily/2024-10-20T08:00:00Z')).equals(true);
    });

    it('should return false for zone path without timeAverage', () => {
      expect(hasPathDatetime('/zone/US-CA')).equals(false);
    });

    it('should return false for map path', () => {
      expect(hasPathDatetime('/map/daily')).equals(false);
    });

    it('should return false for invalid path', () => {
      expect(hasPathDatetime('/invalid')).equals(false);
    });
  });
});
