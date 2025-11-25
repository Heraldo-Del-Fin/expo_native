import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
  },
  mainSection: {
    marginBottom: 20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationIcon: {
    marginRight: 8,
  },
  location: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  tempSection: {
    width: '100%',
  },
  tempMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  mainIcon: {
    marginRight: 8,
  },
  tempInfo: {
    flex: 1,
    alignItems: 'flex-start',
  },
  tempLarge: {
    fontSize: 72,
    fontWeight: '800',
    letterSpacing: -2,
    lineHeight: 80,
  },
  description: {
    fontSize: 16,
    marginTop: 4,
    marginBottom: 8,
  },
  feelsLikeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  tempSub: {
    fontSize: 14,
    marginLeft: 6,
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 12,
  },
  metricCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  metricContent: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  // Estilos para pronóstico horario
  hourlySection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  hourlyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  hourlyTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  hourlyList: {
    marginHorizontal: -12,
  },
  hourlyListContent: {
    paddingHorizontal: 12,
    paddingRight: 12,
  },
  hourCard: {
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    minWidth: 70,
    marginRight: 10,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  hourTime: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  hourIconContainer: {
    marginVertical: 6,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourTemp: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
});

